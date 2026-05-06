(function () {
  const data = window.STUDY_DATA;
  if (!data) {
    return;
  }

  const STORAGE_KEY = "aiml-study-studio-progress-v1";
  const VIEW_TITLES = {
    dashboard: "Dashboard",
    reader: "Deep Reader",
    practice: "Practice Arena",
    cram: "Cram Review",
    flashcards: "Flashcards",
    lab: "Concept Lab",
    glossary: "Glossary",
    search: "Search",
  };
  const DEFAULT_UI_PREFS = {
    readerScale: "comfortable",
    focusMode: false,
  };
  const MOBILE_SIDEBAR_BREAKPOINT = 1180;

  const PRACTICE_ALIASES = {
    "all": data.chapters.map((chapter) => chapter.slug),
    "convolutional-networks": ["convolutional-networks", "neural-networks-foundations"],
  };

  const FLASHCARD_ALIASES = {
    "all": data.chapters.map((chapter) => chapter.slug),
    "convolutional-networks": ["convolutional-networks", "neural-networks-foundations"],
  };

  const els = {
    heroStrip: document.getElementById("hero-strip"),
    currentViewTitle: document.getElementById("current-view-title"),
    viewRoot: document.getElementById("view-root"),
    topicNav: document.getElementById("topic-nav"),
    progressPill: document.getElementById("progress-pill"),
    randomQuestionButton: document.getElementById("random-question-button"),
    resumeButton: document.getElementById("resume-button"),
    sidebar: document.getElementById("site-sidebar"),
    sidebarToggleButton: document.getElementById("sidebar-toggle-button"),
    sidebarOverlay: document.getElementById("sidebar-overlay"),
    modeLinks: Array.from(document.querySelectorAll(".mode-link")),
  };

  const chapterMap = Object.fromEntries(data.chapters.map((chapter) => [chapter.slug, chapter]));
  const sectionMap = new Map();
  data.chapters.forEach((chapter) => {
    chapter.sections.forEach((section) => sectionMap.set(section.id, { chapter, section }));
  });

  const quizItemMap = new Map();
  data.workbook.topicSets.forEach((topicSet) => {
    topicSet.items.forEach((item) => quizItemMap.set(item.id, { ...item, topic: topicSet.topic, setTitle: topicSet.title }));
  });

  const progress = loadProgress();
  const state = {
    view: "dashboard",
    topic: data.chapters[0].slug,
    section: data.chapters[0].sections[0]?.id || null,
    practiceTopic: "all",
    practiceIndex: 0,
    practiceOrder: [],
    revealAnswer: false,
    flashTopic: "all",
    flashIndex: 0,
    flashOrder: [],
    flashReveal: false,
    glossaryTopic: "all",
    glossaryQuery: "",
    searchQuery: "",
    cramQuery: "",
    lab: {
      kmeansStep: 0,
      rankingRelevant: [1, 0, 1, 0, 0, 1, 0, 0],
      rankingK: 5,
    },
    ui: {
      sidebarOpen: false,
      readerScale: progress.uiPrefs?.readerScale || DEFAULT_UI_PREFS.readerScale,
      focusMode: progress.uiPrefs?.focusMode || DEFAULT_UI_PREFS.focusMode,
      sectionQuery: "",
      copyStatus: "",
    },
  };

  initialize();

  function queueMathTypeset(targets = [els.heroStrip, els.viewRoot]) {
    const nodes = (Array.isArray(targets) ? targets : [targets]).filter(Boolean);
    const attempt = () => {
      if (!window.MathJax || !window.MathJax.typesetPromise) {
        window.setTimeout(() => queueMathTypeset(nodes), 120);
        return;
      }
      if (typeof window.MathJax.typesetClear === "function") {
        window.MathJax.typesetClear(nodes);
      }
      window.MathJax.typesetPromise(nodes).catch(() => {});
    };
    window.requestAnimationFrame(attempt);
  }

  function initialize() {
    const hashState = readHashState();
    if (hashState.topic && chapterMap[hashState.topic]) {
      state.topic = hashState.topic;
      state.section = hashState.section || chapterMap[hashState.topic].sections[0]?.id || null;
      state.view = hashState.view || "reader";
    } else {
      const lastLocation = progress.lastLocation;
      if (lastLocation && chapterMap[lastLocation.topic]) {
        state.topic = lastLocation.topic;
        state.section = lastLocation.section || chapterMap[lastLocation.topic].sections[0]?.id || null;
        state.view = lastLocation.view || "dashboard";
      }
    }
    resetPracticeOrder();
    resetFlashcards();
    bindStaticEvents();
    render();
  }

  function loadProgress() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return { studiedSections: {}, quizConfidence: {}, lastLocation: null, uiPrefs: { ...DEFAULT_UI_PREFS } };
      }
      const parsed = JSON.parse(raw);
      return {
        studiedSections: parsed.studiedSections || {},
        quizConfidence: parsed.quizConfidence || {},
        lastLocation: parsed.lastLocation || null,
        uiPrefs: { ...DEFAULT_UI_PREFS, ...(parsed.uiPrefs || {}) },
      };
    } catch (_error) {
      return { studiedSections: {}, quizConfidence: {}, lastLocation: null, uiPrefs: { ...DEFAULT_UI_PREFS } };
    }
  }

  function saveProgress() {
    const snapshot = {
      studiedSections: progress.studiedSections,
      quizConfidence: progress.quizConfidence,
      lastLocation: {
        view: state.view,
        topic: state.topic,
        section: state.section,
      },
      uiPrefs: {
        readerScale: state.ui.readerScale,
        focusMode: state.ui.focusMode,
      },
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  }

  function readHashState() {
    const raw = window.location.hash.replace(/^#/, "");
    if (!raw) {
      return {};
    }
    const params = new URLSearchParams(raw);
    return {
      view: params.get("view") || null,
      topic: params.get("topic") || null,
      section: params.get("section") || null,
    };
  }

  function syncLocationHash() {
    const params = new URLSearchParams();
    params.set("view", state.view);
    params.set("topic", state.topic);
    if (state.section) {
      params.set("section", state.section);
    }
    const nextHash = `#${params.toString()}`;
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}${nextHash}`);
    }
  }

  function applyShellState() {
    const sidebarOpen = Boolean(state.ui.sidebarOpen && window.innerWidth <= MOBILE_SIDEBAR_BREAKPOINT);
    document.body.classList.toggle("sidebar-open", sidebarOpen);
    document.body.classList.toggle("reader-focus-mode", Boolean(state.ui.focusMode && state.view === "reader"));
    document.body.classList.toggle("reader-scale-compact", state.ui.readerScale === "compact");
    document.body.classList.toggle("reader-scale-large", state.ui.readerScale === "large");
    els.sidebarOverlay?.classList.toggle("hidden", !sidebarOpen);
    if (els.sidebarToggleButton) {
      els.sidebarToggleButton.setAttribute("aria-expanded", sidebarOpen ? "true" : "false");
      els.sidebarToggleButton.textContent = sidebarOpen ? "Close Menu" : "Study Menu";
    }
  }

  function handleGlobalKeydown(event) {
    const target = event.target;
    const tagName = target?.tagName ? target.tagName.toLowerCase() : "";
    const isTypingTarget = target?.isContentEditable || ["input", "textarea", "select"].includes(tagName);

    if (event.key === "Escape" && state.ui.sidebarOpen) {
      state.ui.sidebarOpen = false;
      applyShellState();
      saveProgress();
      return;
    }

    if (state.view !== "reader" || isTypingTarget) {
      return;
    }

    const chapter = chapterMap[state.topic];
    const currentSection = sectionMap.get(state.section)?.section || chapter.sections[0];
    const sectionIndex = chapter.sections.findIndex((section) => section.id === currentSection?.id);

    if (event.key === "ArrowRight" && sectionIndex < chapter.sections.length - 1) {
      event.preventDefault();
      state.section = chapter.sections[sectionIndex + 1].id;
      render();
      return;
    }

    if (event.key === "ArrowLeft" && sectionIndex > 0) {
      event.preventDefault();
      state.section = chapter.sections[sectionIndex - 1].id;
      render();
      return;
    }

    if (event.key === "/") {
      const sectionFilter = document.getElementById("section-filter-input");
      if (sectionFilter) {
        event.preventDefault();
        sectionFilter.focus();
        sectionFilter.select?.();
      }
    }
  }

  function bindStaticEvents() {
    els.modeLinks.forEach((button) => {
      button.addEventListener("click", () => {
        setView(button.dataset.view);
      });
    });

    els.randomQuestionButton.addEventListener("click", () => {
      state.practiceTopic = "all";
      resetPracticeOrder(true);
      setView("practice");
    });

    els.resumeButton.addEventListener("click", () => {
      const lastLocation = progress.lastLocation;
      if (lastLocation && chapterMap[lastLocation.topic]) {
        state.topic = lastLocation.topic;
        state.section = lastLocation.section || chapterMap[lastLocation.topic].sections[0]?.id || null;
        setView(lastLocation.view || "reader");
      } else {
        setView("reader");
      }
    });

    els.sidebarToggleButton?.addEventListener("click", () => {
      state.ui.sidebarOpen = !state.ui.sidebarOpen;
      applyShellState();
      saveProgress();
    });

    els.sidebarOverlay?.addEventListener("click", () => {
      if (!state.ui.sidebarOpen) {
        return;
      }
      state.ui.sidebarOpen = false;
      applyShellState();
      saveProgress();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > MOBILE_SIDEBAR_BREAKPOINT && state.ui.sidebarOpen) {
        state.ui.sidebarOpen = false;
        applyShellState();
      }
    });

    window.addEventListener("keydown", handleGlobalKeydown);
  }

  function setView(view) {
    state.view = view;
    if (view === "reader" && !state.section) {
      state.section = chapterMap[state.topic].sections[0]?.id || null;
    }
    state.ui.copyStatus = "";
    if (window.innerWidth <= MOBILE_SIDEBAR_BREAKPOINT) {
      state.ui.sidebarOpen = false;
    }
    saveProgress();
    render();
  }

  function render() {
    applyShellState();
    els.currentViewTitle.textContent = VIEW_TITLES[state.view] || "Study";
    renderHeroStrip();
    renderTopicNav();
    renderModeNav();
    renderMainView();
    updateProgressPill();
    queueMathTypeset();
    saveProgress();
    syncLocationHash();
  }

  function renderModeNav() {
    els.modeLinks.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.view === state.view);
    });
  }

  function renderHeroStrip() {
    const overall = getOverallProgress();
    const chapter = chapterMap[state.topic];
    const quizStats = getQuizStats();
    const studiedText = `${overall.studiedSections}/${overall.totalSections}`;
    const strongText = `${quizStats.strong}/${quizStats.total}`;
    els.heroStrip.innerHTML = `
      <article class="hero-card">
        <p class="eyebrow">Coverage</p>
        <strong>${studiedText}</strong>
        <h3>Sections Studied</h3>
        <p>${overall.percent}% of the long-form lesson sections are marked as studied. Use this as a rough reading tracker, not as proof of mastery.</p>
      </article>
      <article class="hero-card">
        <p class="eyebrow">Practice</p>
        <strong>${strongText}</strong>
        <h3>Questions Marked Strong</h3>
        <p>${quizStats.pending} practice prompts still have no confidence mark. If this number is high, switch to Practice before rereading too much.</p>
      </article>
      <article class="hero-card">
        <p class="eyebrow">Current Focus</p>
        <strong>${escapeHtml(chapter.shortTitle)}</strong>
        <h3>${escapeHtml(chapter.badge)}</h3>
        <p>${escapeHtml(chapter.summary)}</p>
      </article>
    `;
  }

  function renderTopicNav() {
    els.topicNav.innerHTML = data.chapters.map((chapter) => {
      const studied = chapter.sections.filter((section) => progress.studiedSections[section.id]).length;
      const percent = chapter.sections.length ? Math.round((studied / chapter.sections.length) * 100) : 0;
      return `
        <button class="topic-button ${chapter.slug === state.topic ? "is-active" : ""}" data-topic="${chapter.slug}">
          <div class="topic-button-title">
            <span>${escapeHtml(chapter.shortTitle)}</span>
            <span>${escapeHtml(chapter.badge)}</span>
          </div>
          <div class="topic-button-copy">${escapeHtml(chapter.summary)}</div>
          <div class="topic-meter"><span style="width:${percent}%"></span></div>
        </button>
      `;
    }).join("");

    els.topicNav.querySelectorAll(".topic-button").forEach((button) => {
      button.addEventListener("click", () => {
        const chapter = chapterMap[button.dataset.topic];
        state.topic = chapter.slug;
        state.section = chapter.sections[0]?.id || null;
        state.ui.sectionQuery = "";
        setView("reader");
      });
    });
  }

  function updateProgressPill() {
    const overall = getOverallProgress();
    els.progressPill.textContent = `${overall.percent}% studied`;
  }

  function renderMainView() {
    switch (state.view) {
      case "dashboard":
        renderDashboard();
        break;
      case "reader":
        renderReader();
        break;
      case "practice":
        renderPractice();
        break;
      case "cram":
        renderCram();
        break;
      case "flashcards":
        renderFlashcards();
        break;
      case "lab":
        renderLab();
        break;
      case "glossary":
        renderGlossary();
        break;
      case "search":
        renderSearch();
        break;
      default:
        renderDashboard();
        break;
    }
  }

  function renderDashboard() {
    const totalMinutes = data.chapters.reduce((sum, chapter) => sum + chapter.readMinutes, 0);
    const totalWords = data.chapters.reduce((sum, chapter) => sum + chapter.wordCount, 0);
    const overall = getOverallProgress();
    const focusChapter = chapterMap[state.topic];
    els.viewRoot.innerHTML = `
      <section class="dashboard-hero">
        <div>
          <p class="eyebrow">Start Here</p>
          <h3>Move from slow understanding to fast recall, instead of just rereading until things look familiar.</h3>
          <p>
            This site is built from your expanded final-exam study pack. Use Reader for depth, Practice for retrieval, Flashcards for repetition, and Concept Lab when formulas or mechanisms feel abstract.
          </p>
          <div class="action-row" style="margin-top:1rem;">
            <button class="primary-button" data-dashboard-action="reader">Open Deep Reader</button>
            <button class="secondary-button" data-dashboard-action="practice">Start Practice</button>
            <button class="secondary-button" data-dashboard-action="lab">Use Concept Lab</button>
          </div>
        </div>
        <div class="card">
          <p class="eyebrow">Study Footprint</p>
          <div class="metrics-grid" style="margin-top:0.9rem;">
            <div class="metric-box"><strong>${data.chapters.length}</strong><span>core chapters</span></div>
            <div class="metric-box"><strong>${totalMinutes}</strong><span>read minutes</span></div>
            <div class="metric-box"><strong>${Math.round(totalWords / 1000)}k</strong><span>approx words</span></div>
            <div class="metric-box"><strong>${overall.percent}%</strong><span>studied</span></div>
          </div>
        </div>
      </section>

      <section class="panel" style="padding:1.3rem;">
        <div class="section-title-row">
          <p class="eyebrow">Roadmap</p>
          <h3 class="panel-title" style="margin-top:0.2rem;">How To Study In A Way That Actually Changes Recall</h3>
        </div>
        <div class="dashboard-grid" style="margin-top:1rem;">
          ${data.studyPath.map((step) => `
            <article class="roadmap-card">
              <h4>${escapeHtml(step.title)}</h4>
              <p class="subtle">${escapeHtml(step.description)}</p>
              <ul class="md-list">
                ${step.actions.map((action) => `<li>${escapeHtml(action)}</li>`).join("")}
              </ul>
            </article>
          `).join("")}
        </div>
      </section>

      <section class="panel" style="padding:1.3rem;">
        <p class="eyebrow">Current Topic Clarity Pack</p>
        <h3 class="panel-title" style="margin-top:0.2rem;">Understand ${escapeHtml(focusChapter.shortTitle)} Before You Memorize It</h3>
        <div class="dashboard-grid" style="margin-top:1rem;">
          <article class="roadmap-card">
            <h4>Plain-English map</h4>
            <div class="reader-copy">${focusChapter.plainEnglishHtml}</div>
          </article>
          <article class="roadmap-card">
            <h4>Mental model</h4>
            <div class="reader-copy">${focusChapter.mentalModelHtml}</div>
          </article>
          <article class="roadmap-card">
            <h4>Equation anchor</h4>
            <div class="equation-tex">\\[${focusChapter.equationNotebook[0].latex}\\]</div>
            <p class="subtle">${escapeHtml(focusChapter.equationNotebook[0].meaning)}</p>
          </article>
        </div>
      </section>

      <section class="panel" style="padding:1.3rem;">
        <p class="eyebrow">Topic Map</p>
        <h3 class="panel-title" style="margin-top:0.2rem;">Chapter Atlas</h3>
        <div class="topic-card-grid" style="margin-top:1rem;">
          ${data.chapters.map((chapter) => {
            const studied = chapter.sections.filter((section) => progress.studiedSections[section.id]).length;
            return `
              <article class="card topic-card">
                <div class="chip-row">
                  <span class="chip">${escapeHtml(chapter.badge)}</span>
                  <span class="chip">${chapter.readMinutes} min</span>
                  <span class="chip">${studied}/${chapter.sections.length} studied</span>
                </div>
                <h4 style="margin-top:0.9rem;">${escapeHtml(chapter.title)}</h4>
                <p>${escapeHtml(chapter.summary)}</p>
                <div class="pill-row">
                  ${chapter.goals.slice(0, 3).map((goal) => `<span class="meta-pill">${escapeHtml(goal)}</span>`).join("")}
                </div>
                <div class="action-row" style="margin-top:1rem;">
                  <button class="secondary-button" data-open-reader="${chapter.slug}">Read</button>
                  <button class="secondary-button" data-open-practice="${chapter.slug}">Practice</button>
                </div>
              </article>
            `;
          }).join("")}
        </div>
      </section>

      <section class="panel" style="padding:1.3rem;">
        <p class="eyebrow">Exam Comparisons</p>
        <h3 class="panel-title" style="margin-top:0.2rem;">High-Value Contrast Cards</h3>
        <div class="practice-grid" style="margin-top:1rem;">
          ${data.compareDecks.map((item) => `
            <article class="essay-card">
              <h4>${escapeHtml(item.prompt)}</h4>
              <p class="subtle">${escapeHtml(item.answer)}</p>
            </article>
          `).join("")}
        </div>
      </section>
    `;

    els.viewRoot.querySelectorAll("[data-dashboard-action]").forEach((button) => {
      button.addEventListener("click", () => {
        setView(button.dataset.dashboardAction);
      });
    });

    els.viewRoot.querySelectorAll("[data-open-reader]").forEach((button) => {
      button.addEventListener("click", () => {
        const chapter = chapterMap[button.dataset.openReader];
        state.topic = chapter.slug;
        state.section = chapter.sections[0]?.id || null;
        state.ui.sectionQuery = "";
        setView("reader");
      });
    });

    els.viewRoot.querySelectorAll("[data-open-practice]").forEach((button) => {
      button.addEventListener("click", () => {
        state.practiceTopic = button.dataset.openPractice;
        resetPracticeOrder();
        setView("practice");
      });
    });
  }

  function renderReader() {
    const chapter = chapterMap[state.topic];
    const currentSection = sectionMap.get(state.section)?.section || chapter.sections[0];
    state.section = currentSection?.id || null;
    const sectionIndex = chapter.sections.findIndex((section) => section.id === currentSection.id);
    const prevSection = chapter.sections[sectionIndex - 1] || null;
    const nextSection = chapter.sections[sectionIndex + 1] || null;
    const studied = Boolean(progress.studiedSections[currentSection.id]);
    const studiedCount = chapter.sections.filter((section) => progress.studiedSections[section.id]).length;
    const chapterProgressPercent = chapter.sections.length ? Math.round((studiedCount / chapter.sections.length) * 100) : 0;
    const sectionFilterQuery = state.ui.sectionQuery.trim().toLowerCase();
    const visibleSections = chapter.sections.filter((section) =>
      !sectionFilterQuery || section.title.toLowerCase().includes(sectionFilterQuery),
    );
    const nextUnstudied = chapter.sections.find((section) => !progress.studiedSections[section.id]) || null;
    const chapterOrientationHtml = chapter.introHtml.replace(/<figure class="md-figure[\s\S]*?<\/figure>/g, "");
    const sectionHero = currentSection.figureSrc
      ? `
        <figure class="md-figure section-hero">
          <img src="${escapeHtml(currentSection.figureSrc)}" alt="${escapeHtml(currentSection.figureAlt || currentSection.title)}" loading="lazy" />
          <figcaption>Section visual for ${escapeHtml(currentSection.title)}</figcaption>
        </figure>
      `
      : "";

    els.viewRoot.innerHTML = `
      <section class="reader-layout">
        <aside class="reader-sidebar">
          <p class="eyebrow">${escapeHtml(chapter.badge)}</p>
          <h3 class="section-title" style="margin-top:0.2rem;">${escapeHtml(chapter.title)}</h3>
          <p class="subtle small">${escapeHtml(chapter.summary)}</p>
          <div class="reader-meta">
            <span class="meta-pill">${chapter.readMinutes} min</span>
            <span class="meta-pill">${chapter.wordCount} words</span>
            <span class="meta-pill">${chapter.sectionCount} sections</span>
          </div>
          <div class="chapter-progress-panel">
            <div class="sidebar-title-row">
              <strong>Chapter progress</strong>
              <span>${studiedCount}/${chapter.sections.length}</span>
            </div>
            <div class="topic-meter"><span style="width:${chapterProgressPercent}%"></span></div>
          </div>
          <div class="reader-sidebar-tools">
            <label class="sidebar-field">
              <span>Filter sections</span>
              <input id="section-filter-input" class="input" type="text" placeholder="Type / to jump here" value="${escapeAttribute(state.ui.sectionQuery)}">
            </label>
            ${nextUnstudied ? `<button class="tiny-button" id="next-unstudied-button">Jump To Next Unstudied</button>` : ""}
          </div>
          <div class="section-list">
            ${visibleSections.length ? visibleSections.map((section) => `
              <button class="section-jump ${section.id === currentSection.id ? "is-active" : ""}" data-section-id="${section.id}">
                <strong>${escapeHtml(section.title)}</strong>
                <div class="small subtle" style="margin-top:0.25rem;">${section.readMinutes} min ${progress.studiedSections[section.id] ? "- studied" : ""}</div>
              </button>
            `).join("") : `<div class="empty-state">No sections matched that filter.</div>`}
          </div>
        </aside>

        <article class="reader-content">
          <div class="reader-header">
            <div>
              <p class="eyebrow">Current Section</p>
              <h3>${escapeHtml(currentSection.title)}</h3>
              <div class="reader-meta">
                <span class="meta-pill">Section ${sectionIndex + 1} of ${chapter.sections.length}</span>
                <span class="meta-pill">${currentSection.readMinutes} min</span>
                <span class="meta-pill">${currentSection.wordCount} words</span>
                <span class="meta-pill">${studied ? "Studied" : "Not marked yet"}</span>
              </div>
            </div>
            <div class="action-row">
              <button class="secondary-button" id="toggle-studied-button">${studied ? "Mark Unstudied" : "Mark Studied"}</button>
              ${prevSection ? `<button class="secondary-button" id="prev-section-button">Previous</button>` : ""}
              ${nextSection ? `<button class="secondary-button" id="next-section-button">Next</button>` : ""}
            </div>
          </div>

          <section class="reader-utility-bar">
            <div class="reader-control-group">
              <span class="reader-control-label">Reading size</span>
              <div class="segmented-control" role="group" aria-label="Reading size">
                <button class="segment-button ${state.ui.readerScale === "compact" ? "is-active" : ""}" data-reader-scale="compact">Compact</button>
                <button class="segment-button ${state.ui.readerScale === "comfortable" ? "is-active" : ""}" data-reader-scale="comfortable">Comfortable</button>
                <button class="segment-button ${state.ui.readerScale === "large" ? "is-active" : ""}" data-reader-scale="large">Large</button>
              </div>
            </div>
            <div class="reader-control-actions">
              <button class="tiny-button ${state.ui.focusMode ? "is-active" : ""}" id="focus-mode-button">${state.ui.focusMode ? "Exit Focus Mode" : "Focus Mode"}</button>
              <button class="tiny-button" id="copy-section-link-button">Copy Section Link</button>
            </div>
            <p class="reader-shortcut-note">Use <strong>&larr;</strong> and <strong>&rarr;</strong> to move between sections, and press <strong>/</strong> to jump to the section filter.</p>
          </section>

          ${state.ui.copyStatus ? `<p class="reader-status-note">${escapeHtml(state.ui.copyStatus)}</p>` : ""}

          <div class="reader-copy">
            ${sectionHero}
            <div class="mini-panel" style="margin-bottom:1rem;">
              <h4>Chapter orientation and big-picture context</h4>
              ${chapterOrientationHtml}
            </div>
            ${currentSection.html}
          </div>

          <section class="panel" style="padding:1rem; margin-top:1rem;">
            <p class="eyebrow">Understanding Layer</p>
            <h3 class="panel-title" style="margin-top:0.2rem;">Plain-English Map And Mental Model</h3>
            <div class="dashboard-grid" style="margin-top:1rem;">
              <article class="roadmap-card">
                <h4>Plain-English map</h4>
                <div class="reader-copy">${chapter.plainEnglishHtml}</div>
              </article>
              <article class="roadmap-card">
                <h4>Mental model</h4>
                <div class="reader-copy">${chapter.mentalModelHtml}</div>
              </article>
              <article class="roadmap-card">
                <h4>Bridge forward</h4>
                <div class="reader-copy">${chapter.bridgeForwardHtml}</div>
              </article>
            </div>
          </section>

          <section class="panel" style="padding:1rem; margin-top:1rem;">
            <p class="eyebrow">Equation Notebook</p>
            <h3 class="panel-title" style="margin-top:0.2rem;">Key Equations With Meaning</h3>
            <div class="equation-grid" style="margin-top:1rem;">
              ${chapter.equationNotebook.map((equation) => `
                <article class="equation-card">
                  <h4>${escapeHtml(equation.label)}</h4>
                  <div class="equation-tex">\\[${equation.latex}\\]</div>
                  <p><strong>Meaning:</strong> ${escapeHtml(equation.meaning)}</p>
                  <p><strong>Intuition:</strong> ${escapeHtml(equation.intuition)}</p>
                </article>
              `).join("")}
            </div>
          </section>

          <section class="panel" style="padding:1rem; margin-top:1rem;">
            <p class="eyebrow">Worked Examples</p>
            <h3 class="panel-title" style="margin-top:0.2rem;">How To Reason Through The Topic</h3>
            <div class="worked-grid" style="margin-top:1rem;">
              ${chapter.workedExamples.map((example) => `
                <article class="worked-card">
                  <h4>${escapeHtml(example.title)}</h4>
                  <div class="reader-copy">
                    <p><strong>Scenario</strong></p>
                    ${example.scenarioHtml}
                    <p><strong>Walkthrough</strong></p>
                    ${example.walkthroughHtml}
                  </div>
                </article>
              `).join("")}
            </div>
          </section>

          <div class="reader-bottom-grid">
            <section class="mini-panel">
              <h4>What to understand</h4>
              <ul>
                ${chapter.goals.map((goal) => `<li>${escapeHtml(goal)}</li>`).join("")}
              </ul>
            </section>
            <section class="mini-panel">
              <h4>Common exam traps</h4>
              <ul>
                ${chapter.traps.map((trap) => `<li>${escapeHtml(trap)}</li>`).join("")}
              </ul>
            </section>
            <section class="mini-panel">
              <h4>Mastery checklist</h4>
              <ul>
                ${chapter.masteryChecklist.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
              </ul>
            </section>
          </div>

          <section class="panel" style="padding:1rem; margin-top:1rem;">
            <p class="eyebrow">Self-check</p>
            <h3 class="panel-title" style="margin-top:0.2rem;">Warm-up questions for this topic</h3>
            <ul class="md-list" style="margin-top:0.8rem;">
              ${chapter.starterQuestions.map((question) => `<li>${escapeHtml(question)}</li>`).join("")}
            </ul>
          </section>
        </article>
      </section>
    `;

    els.viewRoot.querySelectorAll("[data-section-id]").forEach((button) => {
      button.addEventListener("click", () => {
        state.section = button.dataset.sectionId;
        render();
      });
    });

    document.getElementById("section-filter-input")?.addEventListener("input", (event) => {
      state.ui.sectionQuery = event.target.value;
      render();
    });

    const nextUnstudiedButton = document.getElementById("next-unstudied-button");
    if (nextUnstudiedButton && nextUnstudied) {
      nextUnstudiedButton.addEventListener("click", () => {
        state.section = nextUnstudied.id;
        render();
      });
    }

    const toggleButton = document.getElementById("toggle-studied-button");
    if (toggleButton) {
      toggleButton.addEventListener("click", () => {
        toggleStudiedSection(currentSection.id);
        render();
      });
    }

    const prevButton = document.getElementById("prev-section-button");
    if (prevButton && prevSection) {
      prevButton.addEventListener("click", () => {
        state.section = prevSection.id;
        render();
      });
    }

    const nextButton = document.getElementById("next-section-button");
    if (nextButton && nextSection) {
      nextButton.addEventListener("click", () => {
        state.section = nextSection.id;
        render();
      });
    }

    els.viewRoot.querySelectorAll("[data-reader-scale]").forEach((button) => {
      button.addEventListener("click", () => {
        state.ui.readerScale = button.dataset.readerScale;
        render();
      });
    });

    document.getElementById("focus-mode-button")?.addEventListener("click", () => {
      state.ui.focusMode = !state.ui.focusMode;
      render();
    });

    document.getElementById("copy-section-link-button")?.addEventListener("click", async () => {
      await copyCurrentSectionLink();
    });
  }

  function renderPractice() {
    const pool = getPracticePool(state.practiceTopic);
    ensurePracticeOrder(pool);
    const currentQuestion = getCurrentPracticeQuestion(pool);
    const stats = getQuizStats();
    const supportChapter = currentQuestion ? chapterMap[currentQuestion.topic] || chapterMap[state.topic] : chapterMap[state.topic];
    const neuralNote = state.practiceTopic === "convolutional-networks"
      ? `<p class="footer-note">The workbook grouped the neural-network questions together, so this filter also pulls in the shared neural-networks practice set.</p>`
      : "";

    els.viewRoot.innerHTML = `
      <section class="panel" style="padding:1rem;">
        <div class="practice-toolbar">
          <select id="practice-topic-select" class="select">
            <option value="all">All topics</option>
            ${data.chapters.map((chapter) => `<option value="${chapter.slug}" ${state.practiceTopic === chapter.slug ? "selected" : ""}>${escapeHtml(chapter.shortTitle)}</option>`).join("")}
          </select>
          <button id="shuffle-practice-button" class="secondary-button">Shuffle Questions</button>
          <button id="reveal-answer-button" class="secondary-button">${state.revealAnswer ? "Hide Answer" : "Reveal Answer"}</button>
          <div class="toolbar-spacer"></div>
          <span class="meta-pill">${pool.length} questions</span>
        </div>
        ${neuralNote}
      </section>

      <section class="practice-layout">
        <article class="quiz-card">
          ${currentQuestion ? `
            <div class="question-counter">Question ${state.practiceIndex + 1} of ${pool.length}</div>
            <h3>${escapeHtml(currentQuestion.setTitle)}</h3>
            <p class="question-text">${escapeHtml(currentQuestion.prompt)}</p>
            <div class="action-row">
              <button class="answer-button" id="practice-prev-button">Previous</button>
              <button class="answer-button" id="practice-next-button">Next</button>
            </div>
            <div class="answer-block ${state.revealAnswer ? "" : "is-hidden"}" id="practice-answer-block">
              <strong>Short answer check</strong>
              <p style="margin:0.7rem 0 0;">${escapeHtml(currentQuestion.answer || "Try answering this aloud in your own words before moving on.")}</p>
            </div>
          ` : `
            <div class="empty-state">No practice questions matched this filter.</div>
          `}
        </article>

        <aside class="result-card">
          <h4>Confidence Tracker</h4>
          <p class="subtle">After you reveal the answer, mark how solid your recall felt.</p>
          ${currentQuestion ? `
            <div class="confidence-grid" style="margin-top:1rem;">
              ${renderConfidenceButton(currentQuestion.id, "missed", "I missed this")}
              ${renderConfidenceButton(currentQuestion.id, "shaky", "I was shaky")}
              ${renderConfidenceButton(currentQuestion.id, "strong", "I knew it")}
            </div>
          ` : ""}
          <div class="mini-panel" style="margin-top:1rem;">
            <h4>Topic anchor</h4>
            <p class="eyebrow" style="margin-bottom:0.5rem;">${escapeHtml(supportChapter.badge)}</p>
            <div class="reader-copy">${supportChapter.plainEnglishHtml}</div>
          </div>
          <div class="metrics-grid" style="margin-top:1rem;">
            <div class="metric-box"><strong>${stats.strong}</strong><span>strong</span></div>
            <div class="metric-box"><strong>${stats.shaky}</strong><span>shaky</span></div>
            <div class="metric-box"><strong>${stats.missed}</strong><span>missed</span></div>
            <div class="metric-box"><strong>${stats.pending}</strong><span>pending</span></div>
          </div>
          <div class="mini-panel" style="margin-top:1rem;">
            <h4>Mixed essay prompts</h4>
            <ul>
              ${data.workbook.mixedEssay.map((prompt) => `<li>${escapeHtml(prompt)}</li>`).join("")}
            </ul>
          </div>
        </aside>
      </section>
    `;

    document.getElementById("practice-topic-select")?.addEventListener("change", (event) => {
      state.practiceTopic = event.target.value;
      state.practiceIndex = 0;
      state.revealAnswer = false;
      resetPracticeOrder();
      render();
    });

    document.getElementById("shuffle-practice-button")?.addEventListener("click", () => {
      resetPracticeOrder(true);
      state.revealAnswer = false;
      render();
    });

    document.getElementById("reveal-answer-button")?.addEventListener("click", () => {
      state.revealAnswer = !state.revealAnswer;
      render();
    });

    document.getElementById("practice-prev-button")?.addEventListener("click", () => {
      state.practiceIndex = (state.practiceIndex - 1 + pool.length) % pool.length;
      state.revealAnswer = false;
      render();
    });

    document.getElementById("practice-next-button")?.addEventListener("click", () => {
      state.practiceIndex = (state.practiceIndex + 1) % pool.length;
      state.revealAnswer = false;
      render();
    });

    els.viewRoot.querySelectorAll("[data-confidence-value]").forEach((button) => {
      button.addEventListener("click", () => {
        const questionId = button.dataset.questionId;
        progress.quizConfidence[questionId] = button.dataset.confidenceValue;
        saveProgress();
        render();
      });
    });
  }

  function renderCram() {
    els.viewRoot.innerHTML = `
      <section class="panel" style="padding:1.3rem;">
        <p class="eyebrow">Last 24-48 Hours</p>
        <h3 class="panel-title" style="margin-top:0.2rem;">Fast Review Without Pretending It Replaces Deep Study</h3>
        <p class="subtle">Use this view after you already worked through the long chapters and at least some retrieval practice. It is designed to refresh structure, not to teach everything from zero.</p>
      </section>

      <section class="practice-grid">
        ${data.cramCards.map((card) => `
          <article class="card">
            <h4>${escapeHtml(card.title)}</h4>
            <div class="reader-copy" style="margin-top:0.8rem;">${card.html}</div>
          </article>
        `).join("")}
      </section>
    `;
  }

  function renderFlashcards() {
    const pool = getFlashcardPool(state.flashTopic);
    ensureFlashOrder(pool);
    const card = getCurrentFlashcard(pool);

    els.viewRoot.innerHTML = `
      <section class="panel" style="padding:1rem;">
        <div class="flashcard-toolbar">
          <select id="flash-topic-select" class="select">
            <option value="all">All topics</option>
            ${data.chapters.map((chapter) => `<option value="${chapter.slug}" ${state.flashTopic === chapter.slug ? "selected" : ""}>${escapeHtml(chapter.shortTitle)}</option>`).join("")}
          </select>
          <button id="flash-shuffle-button" class="secondary-button">Shuffle Deck</button>
          <button id="flash-reveal-button" class="secondary-button">${state.flashReveal ? "Hide Back" : "Reveal Back"}</button>
          <div class="toolbar-spacer"></div>
          <span class="meta-pill">${pool.length} cards</span>
        </div>
      </section>

      <section class="flashcard-stage">
        ${card ? `
          <div class="flashcard">
            <div class="flashcard-front">
              <span class="flashcard-label">Front</span>
              <p>${escapeHtml(card.front)}</p>
            </div>
            <div class="flashcard-back ${state.flashReveal ? "" : "is-hidden"}" style="margin-top:1.1rem;">
              <span class="flashcard-label">Back</span>
              <p>${escapeHtml(card.back)}</p>
            </div>
          </div>
          <div class="action-row">
            <button id="flash-prev-button" class="answer-button">Previous</button>
            <button id="flash-next-button" class="answer-button">Next</button>
            <span class="meta-pill">${state.flashIndex + 1} / ${pool.length}</span>
            <span class="meta-pill">${escapeHtml(card.kind)}</span>
          </div>
        ` : `<div class="empty-state">No flashcards matched this filter.</div>`}
      </section>
    `;

    document.getElementById("flash-topic-select")?.addEventListener("change", (event) => {
      state.flashTopic = event.target.value;
      state.flashIndex = 0;
      state.flashReveal = false;
      resetFlashcards();
      render();
    });

    document.getElementById("flash-shuffle-button")?.addEventListener("click", () => {
      resetFlashcards(true);
      state.flashReveal = false;
      render();
    });

    document.getElementById("flash-reveal-button")?.addEventListener("click", () => {
      state.flashReveal = !state.flashReveal;
      render();
    });

    document.getElementById("flash-prev-button")?.addEventListener("click", () => {
      state.flashIndex = (state.flashIndex - 1 + pool.length) % pool.length;
      state.flashReveal = false;
      render();
    });

    document.getElementById("flash-next-button")?.addEventListener("click", () => {
      state.flashIndex = (state.flashIndex + 1) % pool.length;
      state.flashReveal = false;
      render();
    });
  }

  function renderLab() {
    els.viewRoot.innerHTML = `
      <section class="panel" style="padding:1.3rem;">
        <p class="eyebrow">Interactive Intuition</p>
        <h3 class="panel-title" style="margin-top:0.2rem;">Use These Mini Tools When A Formula Feels Abstract</h3>
        <p class="subtle">The goal here is not to simulate the whole field. It is to give you handles: shape changes, weighting, ranking metrics, and iterative updates you can inspect directly.</p>
      </section>

      <section class="lab-grid">
        <article class="lab-card">
          <p class="eyebrow">Unsupervised</p>
          <h3>K-means Stepper</h3>
          <p>Watch a small dataset go through initialize, assign, and recompute steps. The point is to see why cluster assignments and centroids chase each other until they stabilize.</p>
          <div class="canvas-wrap">
            <canvas id="kmeans-canvas" width="560" height="340"></canvas>
          </div>
          <div class="action-row" style="margin-top:1rem;">
            <button id="kmeans-step-button" class="secondary-button">Next Step</button>
            <button id="kmeans-reset-button" class="secondary-button">Reset</button>
          </div>
          <div id="kmeans-caption" class="lab-result"></div>
        </article>

        <article class="lab-card">
          <p class="eyebrow">Neural Foundations</p>
          <h3>Dense Layer Parameter Counter</h3>
          <p>Use this when parameter counting feels mechanical. Seeing the formula update with the numbers helps lock it in.</p>
          <div class="field-grid">
            <div class="field">
              <label for="dense-inputs">Input units</label>
              <input id="dense-inputs" type="number" min="1" value="75">
            </div>
            <div class="field">
              <label for="dense-outputs">Output units</label>
              <input id="dense-outputs" type="number" min="1" value="200">
            </div>
          </div>
          <div id="dense-result" class="lab-result"></div>
        </article>

        <article class="lab-card">
          <p class="eyebrow">CNNs</p>
          <h3>Convolution Output Calculator</h3>
          <p>Play with size, padding, stride, dilation, and filter size until the output-shape formula feels natural instead of memorized.</p>
          <div class="field-grid">
            <div class="field">
              <label for="conv-n">Input size n</label>
              <input id="conv-n" type="number" min="1" value="32">
            </div>
            <div class="field">
              <label for="conv-f">Filter size f</label>
              <input id="conv-f" type="number" min="1" value="3">
            </div>
            <div class="field">
              <label for="conv-p">Padding p</label>
              <input id="conv-p" type="number" min="0" value="1">
            </div>
            <div class="field">
              <label for="conv-s">Stride s</label>
              <input id="conv-s" type="number" min="1" value="1">
            </div>
            <div class="field">
              <label for="conv-d">Dilation d</label>
              <input id="conv-d" type="number" min="1" value="1">
            </div>
          </div>
          <div id="conv-result" class="lab-result"></div>
        </article>

        <article class="lab-card">
          <p class="eyebrow">Recommendation</p>
          <h3>Ranking Metrics Explorer</h3>
          <p>Toggle which positions are relevant and see how Precision@K, Recall@K, Hit Rate, MRR, and nDCG respond. This helps explain why ranking metrics care about order.</p>
          <div class="action-row" id="ranking-buttons"></div>
          <div class="field-grid">
            <div class="field">
              <label for="ranking-k">Top-K cutoff</label>
              <input id="ranking-k" type="number" min="1" max="8" value="${state.lab.rankingK}">
            </div>
          </div>
          <div id="ranking-result" class="lab-result"></div>
        </article>

        <article class="lab-card">
          <p class="eyebrow">Sequence Models</p>
          <h3>Attention Weight Sandbox</h3>
          <p>Adjust the raw compatibility scores and see how softmax turns them into weights. Then watch how those weights combine the value vectors into one output.</p>
          <div class="range-row">
            <label for="score-a">Score A</label>
            <input id="score-a" class="range-input" type="range" min="-3" max="6" value="4" step="0.1">
            <output id="score-a-output">4.0</output>
          </div>
          <div class="range-row">
            <label for="score-b">Score B</label>
            <input id="score-b" class="range-input" type="range" min="-3" max="6" value="1.5" step="0.1">
            <output id="score-b-output">1.5</output>
          </div>
          <div class="range-row">
            <label for="score-c">Score C</label>
            <input id="score-c" class="range-input" type="range" min="-3" max="6" value="0.5" step="0.1">
            <output id="score-c-output">0.5</output>
          </div>
          <div id="attention-result" class="lab-result"></div>
        </article>

        <article class="lab-card">
          <p class="eyebrow">Generative AI</p>
          <h3>Decoding Sandbox</h3>
          <p>Change logits, temperature, top-k, and top-p. This makes it easier to see how one model can behave conservative or creative depending on decoding choices.</p>
          <div class="field-grid">
            <div class="field">
              <label for="logit-a">Logit A</label>
              <input id="logit-a" type="number" value="3">
            </div>
            <div class="field">
              <label for="logit-b">Logit B</label>
              <input id="logit-b" type="number" value="2.1">
            </div>
            <div class="field">
              <label for="logit-c">Logit C</label>
              <input id="logit-c" type="number" value="1">
            </div>
            <div class="field">
              <label for="logit-d">Logit D</label>
              <input id="logit-d" type="number" value="0.3">
            </div>
            <div class="field">
              <label for="decode-temp">Temperature</label>
              <input id="decode-temp" type="number" min="0.1" step="0.1" value="1.0">
            </div>
            <div class="field">
              <label for="decode-top-k">Top-k</label>
              <input id="decode-top-k" type="number" min="1" max="4" value="3">
            </div>
            <div class="field">
              <label for="decode-top-p">Top-p</label>
              <input id="decode-top-p" type="number" min="0.1" max="1" step="0.05" value="0.85">
            </div>
          </div>
          <div id="decode-result" class="lab-result"></div>
        </article>
      </section>
    `;

    bindLabInteractions();
  }

  function renderGlossary() {
    const filtered = data.glossary.filter((item) => {
      const matchesTopic = state.glossaryTopic === "all" || item.topic === state.glossaryTopic;
      const needle = state.glossaryQuery.trim().toLowerCase();
      const haystack = `${item.term} ${item.definition}`.toLowerCase();
      const matchesQuery = !needle || haystack.includes(needle);
      return matchesTopic && matchesQuery;
    });

    els.viewRoot.innerHTML = `
      <section class="panel" style="padding:1rem;">
        <div class="glossary-toolbar">
          <select id="glossary-topic-select" class="select">
            <option value="all">All topics</option>
            ${data.chapters.map((chapter) => `<option value="${chapter.slug}" ${state.glossaryTopic === chapter.slug ? "selected" : ""}>${escapeHtml(chapter.shortTitle)}</option>`).join("")}
          </select>
          <input id="glossary-query-input" class="input" type="text" placeholder="Search terms or definitions" value="${escapeAttribute(state.glossaryQuery)}">
          <span class="meta-pill">${filtered.length} terms</span>
        </div>
      </section>

      <section class="glossary-grid">
        ${filtered.length ? filtered.map((item) => `
          <article class="glossary-card">
            <p class="eyebrow">${escapeHtml(getTopicLabel(item.topic))}</p>
            <h4 style="margin-top:0.25rem;">${escapeHtml(item.term)}</h4>
            <p>${escapeHtml(item.definition)}</p>
          </article>
        `).join("") : `<div class="empty-state">No glossary items matched that filter.</div>`}
      </section>
    `;

    document.getElementById("glossary-topic-select")?.addEventListener("change", (event) => {
      state.glossaryTopic = event.target.value;
      render();
    });

    document.getElementById("glossary-query-input")?.addEventListener("input", (event) => {
      state.glossaryQuery = event.target.value;
      render();
    });
  }

  function renderSearch() {
    const query = state.searchQuery.trim().toLowerCase();
    const results = query
      ? data.searchIndex
          .filter((record) => `${record.title} ${record.body}`.toLowerCase().includes(query))
          .slice(0, 24)
      : [];

    els.viewRoot.innerHTML = `
      <section class="panel" style="padding:1rem;">
        <div class="search-toolbar">
          <input id="search-query-input" class="input" type="text" placeholder="Search topics, formulas, questions, and glossary terms" value="${escapeAttribute(state.searchQuery)}">
          <span class="meta-pill">${results.length} results</span>
        </div>
      </section>

      <section class="search-grid">
        ${query ? (results.length ? results.map((record) => `
          <article class="search-card">
            <p class="eyebrow">${escapeHtml(record.kind)} - ${escapeHtml(getTopicLabel(record.topic))}</p>
            <h4 style="margin-top:0.25rem;">${escapeHtml(record.title)}</h4>
            <p>${escapeHtml(makeSnippet(record.body, query))}</p>
            <button class="tiny-button" data-open-target='${escapeAttribute(JSON.stringify(record.target))}'>Open result</button>
          </article>
        `).join("") : `<div class="empty-state">No results found. Try a simpler term or a method name.</div>`) : `<div class="empty-state">Search across the long-form chapters, cram cards, workbook questions, and glossary.</div>`}
      </section>
    `;

    document.getElementById("search-query-input")?.addEventListener("input", (event) => {
      state.searchQuery = event.target.value;
      render();
    });

    els.viewRoot.querySelectorAll("[data-open-target]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = JSON.parse(button.dataset.openTarget);
        navigateFromTarget(target);
      });
    });
  }

  function renderConfidenceButton(questionId, value, label) {
    const active = progress.quizConfidence[questionId] === value;
    return `
      <button class="confidence-button ${active ? "is-active" : ""}" data-question-id="${questionId}" data-confidence-value="${value}">
        ${escapeHtml(label)}
      </button>
    `;
  }

  function getPracticePool(topic) {
    const aliases = PRACTICE_ALIASES[topic] || [topic];
    return data.workbook.topicSets
      .filter((topicSet) => aliases.includes(topicSet.topic))
      .flatMap((topicSet) => topicSet.items.map((item) => ({ ...item, setTitle: topicSet.title, topic: topicSet.topic })));
  }

  function resetPracticeOrder(shuffle = false) {
    const pool = getPracticePool(state.practiceTopic);
    state.practiceOrder = pool.map((item) => item.id);
    if (shuffle) {
      shuffleArray(state.practiceOrder);
    }
    state.practiceIndex = 0;
  }

  function ensurePracticeOrder(pool) {
    const poolIds = pool.map((item) => item.id);
    const hasSamePool = state.practiceOrder.length === poolIds.length && state.practiceOrder.every((id) => poolIds.includes(id));
    if (!hasSamePool) {
      state.practiceOrder = poolIds;
      state.practiceIndex = 0;
    }
    if (state.practiceIndex >= pool.length) {
      state.practiceIndex = 0;
    }
  }

  function getCurrentPracticeQuestion(pool) {
    if (!pool.length) {
      return null;
    }
    const id = state.practiceOrder[state.practiceIndex];
    return pool.find((item) => item.id === id) || pool[0];
  }

  function getFlashcardPool(topic) {
    const aliases = FLASHCARD_ALIASES[topic] || [topic];
    return data.flashcards.filter((card) => aliases.includes(card.topic));
  }

  function resetFlashcards(shuffle = false) {
    const pool = getFlashcardPool(state.flashTopic);
    state.flashOrder = pool.map((_card, index) => index);
    if (shuffle) {
      shuffleArray(state.flashOrder);
    }
    state.flashIndex = 0;
  }

  function ensureFlashOrder(pool) {
    if (state.flashOrder.length !== pool.length) {
      state.flashOrder = pool.map((_card, index) => index);
      state.flashIndex = 0;
    }
    if (state.flashIndex >= pool.length) {
      state.flashIndex = 0;
    }
  }

  function getCurrentFlashcard(pool) {
    if (!pool.length) {
      return null;
    }
    return pool[state.flashOrder[state.flashIndex]] || pool[0];
  }

  function getQuizStats() {
    const allQuestionIds = data.workbook.topicSets.flatMap((topicSet) => topicSet.items.map((item) => item.id));
    let strong = 0;
    let shaky = 0;
    let missed = 0;
    allQuestionIds.forEach((id) => {
      const mark = progress.quizConfidence[id];
      if (mark === "strong") strong += 1;
      if (mark === "shaky") shaky += 1;
      if (mark === "missed") missed += 1;
    });
    const total = allQuestionIds.length;
    return {
      strong,
      shaky,
      missed,
      total,
      pending: total - strong - shaky - missed,
    };
  }

  function getOverallProgress() {
    const totalSections = data.chapters.reduce((sum, chapter) => sum + chapter.sections.length, 0);
    const studiedSections = Object.keys(progress.studiedSections).length;
    return {
      studiedSections,
      totalSections,
      percent: totalSections ? Math.round((studiedSections / totalSections) * 100) : 0,
    };
  }

  function toggleStudiedSection(sectionId) {
    if (progress.studiedSections[sectionId]) {
      delete progress.studiedSections[sectionId];
    } else {
      progress.studiedSections[sectionId] = true;
    }
    saveProgress();
  }

  function navigateFromTarget(target) {
    if (!target) {
      return;
    }
    if (target.topic && chapterMap[target.topic]) {
      state.topic = target.topic;
      state.section = target.section || chapterMap[target.topic].sections[0]?.id || null;
      state.ui.sectionQuery = "";
    }
    if (target.view === "practice" && target.topic) {
      state.practiceTopic = target.topic;
      resetPracticeOrder();
      const pool = getPracticePool(target.topic);
      const targetIndex = pool.findIndex((item) => item.id === target.question);
      if (targetIndex >= 0) {
        state.practiceIndex = targetIndex;
      }
      state.revealAnswer = false;
    }
    if (target.view === "glossary" && target.term) {
      state.glossaryQuery = target.term;
    }
    if (target.view === "cram" && target.title) {
      state.cramQuery = target.title;
    }
    setView(target.view || "reader");
  }

  function getCurrentSectionUrl() {
    const params = new URLSearchParams();
    params.set("view", "reader");
    params.set("topic", state.topic);
    if (state.section) {
      params.set("section", state.section);
    }
    return `${window.location.origin}${window.location.pathname}${window.location.search}#${params.toString()}`;
  }

  async function copyCurrentSectionLink() {
    const value = getCurrentSectionUrl();
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = value;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
      }
      state.ui.copyStatus = "Section link copied to clipboard.";
    } catch (_error) {
      state.ui.copyStatus = "Copy failed here, but the URL hash is updated so you can copy it from the address bar.";
    }
    render();
    window.setTimeout(() => {
      state.ui.copyStatus = "";
      if (state.view === "reader") {
        render();
      }
    }, 2200);
  }

  function bindLabInteractions() {
    const kmeansStates = computeKMeansStates();
    renderKMeansState(kmeansStates[state.lab.kmeansStep % kmeansStates.length]);

    document.getElementById("kmeans-step-button")?.addEventListener("click", () => {
      state.lab.kmeansStep = (state.lab.kmeansStep + 1) % kmeansStates.length;
      renderKMeansState(kmeansStates[state.lab.kmeansStep]);
    });

    document.getElementById("kmeans-reset-button")?.addEventListener("click", () => {
      state.lab.kmeansStep = 0;
      renderKMeansState(kmeansStates[0]);
    });

    ["dense-inputs", "dense-outputs"].forEach((id) => {
      document.getElementById(id)?.addEventListener("input", updateDenseResult);
    });
    updateDenseResult();

    ["conv-n", "conv-f", "conv-p", "conv-s", "conv-d"].forEach((id) => {
      document.getElementById(id)?.addEventListener("input", updateConvResult);
    });
    updateConvResult();

    renderRankingButtons();
    document.getElementById("ranking-k")?.addEventListener("input", (event) => {
      state.lab.rankingK = clamp(parseInt(event.target.value, 10) || 1, 1, 8);
      updateRankingResult();
    });
    updateRankingResult();

    ["score-a", "score-b", "score-c"].forEach((id) => {
      document.getElementById(id)?.addEventListener("input", updateAttentionResult);
    });
    updateAttentionResult();

    ["logit-a", "logit-b", "logit-c", "logit-d", "decode-temp", "decode-top-k", "decode-top-p"].forEach((id) => {
      document.getElementById(id)?.addEventListener("input", updateDecodeResult);
    });
    updateDecodeResult();
  }

  function renderKMeansState(stateSnapshot) {
    const canvas = document.getElementById("kmeans-canvas");
    const caption = document.getElementById("kmeans-caption");
    if (!canvas || !caption) {
      return;
    }
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#f8f4ec";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const points = stateSnapshot.points;
    const centroids = stateSnapshot.centroids;
    const padding = 30;
    const xValues = points.map((point) => point.x);
    const yValues = points.map((point) => point.y);
    const xMin = Math.min(...xValues) - 1;
    const xMax = Math.max(...xValues) + 1;
    const yMin = Math.min(...yValues) - 1;
    const yMax = Math.max(...yValues) + 1;

    const toCanvas = (point) => {
      const x = padding + ((point.x - xMin) / (xMax - xMin)) * (canvas.width - padding * 2);
      const y = canvas.height - padding - ((point.y - yMin) / (yMax - yMin)) * (canvas.height - padding * 2);
      return { x, y };
    };

    ctx.strokeStyle = "rgba(17, 51, 71, 0.16)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 5; i += 1) {
      const x = padding + (i / 4) * (canvas.width - padding * 2);
      const y = padding + (i / 4) * (canvas.height - padding * 2);
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, canvas.height - padding);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
      ctx.stroke();
    }

    points.forEach((point, index) => {
      const pos = toCanvas(point);
      const color = point.cluster === 0 ? "#c46732" : point.cluster === 1 ? "#2d8f89" : "#465560";
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.arc(pos.x, pos.y, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#16222a";
      ctx.font = "12px IBM Plex Sans";
      ctx.fillText(String(index + 1), pos.x + 10, pos.y - 10);
    });

    centroids.forEach((centroid, index) => {
      const pos = toCanvas(centroid);
      ctx.save();
      ctx.translate(pos.x, pos.y);
      ctx.strokeStyle = index === 0 ? "#8d4218" : "#1f6863";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-12, -12);
      ctx.lineTo(12, 12);
      ctx.moveTo(12, -12);
      ctx.lineTo(-12, 12);
      ctx.stroke();
      ctx.restore();
    });

    caption.innerHTML = `
      <strong>${escapeHtml(stateSnapshot.label)}</strong>
      <p style="margin:0.6rem 0 0;">${escapeHtml(stateSnapshot.explanation)}</p>
    `;
  }

  function computeKMeansStates() {
    const basePoints = [
      { x: 1.0, y: 2.0 },
      { x: 1.2, y: 4.2 },
      { x: 1.0, y: 0.4 },
      { x: 8.8, y: 2.0 },
      { x: 9.5, y: 4.4 },
      { x: 8.7, y: 0.5 },
    ];
    let centroids = [
      { x: 1.0, y: 4.2 },
      { x: 8.7, y: 0.5 },
    ];

    const states = [
      {
        label: "Initialization",
        explanation: "K-means starts with guessed centroids. Good initialization matters because the algorithm can fall into different local solutions.",
        points: basePoints.map((point) => ({ ...point, cluster: null })),
        centroids: centroids.map((point) => ({ ...point })),
      },
    ];

    for (let iteration = 0; iteration < 3; iteration += 1) {
      const assigned = basePoints.map((point) => {
        const distances = centroids.map((centroid) => squaredDistance(point, centroid));
        const cluster = distances[0] <= distances[1] ? 0 : 1;
        return { ...point, cluster };
      });

      states.push({
        label: `Assignment step ${iteration + 1}`,
        explanation: "Each point is assigned to the nearest centroid under squared Euclidean distance.",
        points: assigned,
        centroids: centroids.map((point) => ({ ...point })),
      });

      centroids = [0, 1].map((clusterId) => {
        const clusterPoints = assigned.filter((point) => point.cluster === clusterId);
        return {
          x: clusterPoints.reduce((sum, point) => sum + point.x, 0) / clusterPoints.length,
          y: clusterPoints.reduce((sum, point) => sum + point.y, 0) / clusterPoints.length,
        };
      });

      states.push({
        label: `Centroid update ${iteration + 1}`,
        explanation: "Each centroid moves to the mean of the points currently assigned to its cluster.",
        points: assigned,
        centroids: centroids.map((point) => ({ ...point })),
      });
    }

    states.push({
      label: "Converged intuition",
      explanation: "Once assignments stop changing, the algorithm has reached a local optimum for this initialization.",
      points: basePoints.map((point) => {
        const distances = centroids.map((centroid) => squaredDistance(point, centroid));
        return { ...point, cluster: distances[0] <= distances[1] ? 0 : 1 };
      }),
      centroids: centroids.map((point) => ({ ...point })),
    });

    return states;
  }

  function updateDenseResult() {
    const inputs = Math.max(1, parseInt(document.getElementById("dense-inputs")?.value || "1", 10));
    const outputs = Math.max(1, parseInt(document.getElementById("dense-outputs")?.value || "1", 10));
    const weights = inputs * outputs;
    const biases = outputs;
    const total = weights + biases;
    const result = document.getElementById("dense-result");
    if (result) {
      result.innerHTML = `
        <strong>Total parameters: ${total.toLocaleString()}</strong>
        <p style="margin:0.6rem 0 0;">\\(\\text{weights} = ${inputs} \\times ${outputs} = ${weights.toLocaleString()}\\)<br>\\(\\text{biases} = ${biases.toLocaleString()}\\)<br>\\(\\text{total} = ${weights.toLocaleString()} + ${biases.toLocaleString()} = ${total.toLocaleString()}\\)</p>
      `;
      queueMathTypeset(result);
    }
  }

  function updateConvResult() {
    const n = Math.max(1, parseFloat(document.getElementById("conv-n")?.value || "1"));
    const f = Math.max(1, parseFloat(document.getElementById("conv-f")?.value || "1"));
    const p = Math.max(0, parseFloat(document.getElementById("conv-p")?.value || "0"));
    const s = Math.max(1, parseFloat(document.getElementById("conv-s")?.value || "1"));
    const d = Math.max(1, parseFloat(document.getElementById("conv-d")?.value || "1"));
    const output = Math.floor((n + 2 * p - d * (f - 1) - 1) / s) + 1;
    const result = document.getElementById("conv-result");
    if (result) {
      result.innerHTML = `
        <strong>Output size: ${output}</strong>
        <p style="margin:0.6rem 0 0;">\\[\\left\\lfloor \\frac{n + 2p - d(f - 1) - 1}{s} \\right\\rfloor + 1\\]<br>With your values: \\(\\left\\lfloor \\frac{${n} + 2(${p}) - ${d}(${f} - 1) - 1}{${s}} \\right\\rfloor + 1 = ${output}\\)</p>
      `;
      queueMathTypeset(result);
    }
  }

  function renderRankingButtons() {
    const wrap = document.getElementById("ranking-buttons");
    if (!wrap) {
      return;
    }
    wrap.innerHTML = state.lab.rankingRelevant.map((value, index) => `
      <button class="tiny-button" data-rank-index="${index}" style="${value ? "background:rgba(45,143,137,0.14);" : ""}">
        Pos ${index + 1}: ${value ? "Relevant" : "Not relevant"}
      </button>
    `).join("");

    wrap.querySelectorAll("[data-rank-index]").forEach((button) => {
      button.addEventListener("click", () => {
        const index = parseInt(button.dataset.rankIndex, 10);
        state.lab.rankingRelevant[index] = state.lab.rankingRelevant[index] ? 0 : 1;
        renderRankingButtons();
        updateRankingResult();
      });
    });
  }

  function updateRankingResult() {
    const k = clamp(state.lab.rankingK, 1, state.lab.rankingRelevant.length);
    const relevant = state.lab.rankingRelevant;
    const topK = relevant.slice(0, k);
    const relevantTotal = relevant.reduce((sum, value) => sum + value, 0);
    const relevantInTopK = topK.reduce((sum, value) => sum + value, 0);
    const precision = relevantInTopK / k;
    const recall = relevantTotal ? relevantInTopK / relevantTotal : 0;
    const hitRate = topK.some(Boolean) ? 1 : 0;
    const firstRelevantIndex = relevant.findIndex(Boolean);
    const mrr = firstRelevantIndex >= 0 ? 1 / (firstRelevantIndex + 1) : 0;
    const dcg = topK.reduce((sum, value, index) => sum + (value ? 1 / Math.log2(index + 2) : 0), 0);
    const idealRelevant = Array.from({ length: Math.min(relevantTotal, k) }, () => 1);
    const idcg = idealRelevant.reduce((sum, value, index) => sum + (value ? 1 / Math.log2(index + 2) : 0), 0);
    const ndcg = idcg ? dcg / idcg : 0;
    const result = document.getElementById("ranking-result");
    if (result) {
      result.innerHTML = `
        <strong>Metrics at K = ${k}</strong>
        <p style="margin:0.6rem 0 0;">
          \\(\\mathrm{Precision@K} = ${precision.toFixed(2)}\\)<br>
          \\(\\mathrm{Recall@K} = ${recall.toFixed(2)}\\)<br>
          \\(\\mathrm{Hit\\ Rate} = ${hitRate.toFixed(2)}\\)<br>
          \\(\\mathrm{MRR} = ${mrr.toFixed(2)}\\)<br>
          \\(\\mathrm{nDCG} = ${ndcg.toFixed(2)}\\)
        </p>
      `;
      queueMathTypeset(result);
    }
  }

  function updateAttentionResult() {
    const scores = ["a", "b", "c"].map((suffix) => parseFloat(document.getElementById(`score-${suffix}`)?.value || "0"));
    ["a", "b", "c"].forEach((suffix, index) => {
      const output = document.getElementById(`score-${suffix}-output`);
      if (output) {
        output.textContent = scores[index].toFixed(1);
      }
    });

    const weights = softmax(scores);
    const values = [2, 7, -1];
    const weightedSum = values.reduce((sum, value, index) => sum + value * weights[index], 0);
    const result = document.getElementById("attention-result");
    if (result) {
      result.innerHTML = `
        <strong>Softmax weights</strong>
        <p style="margin:0.6rem 0 0;">
          \\(w_A = ${weights[0].toFixed(3)}\\)<br>
          \\(w_B = ${weights[1].toFixed(3)}\\)<br>
          \\(w_C = ${weights[2].toFixed(3)}\\)<br><br>
          If the value vector list is \\([2, 7, -1]\\), then the weighted output is \\(${weightedSum.toFixed(3)}\\).
        </p>
      `;
      queueMathTypeset(result);
    }
  }

  function updateDecodeResult() {
    const logits = [
      parseFloat(document.getElementById("logit-a")?.value || "0"),
      parseFloat(document.getElementById("logit-b")?.value || "0"),
      parseFloat(document.getElementById("logit-c")?.value || "0"),
      parseFloat(document.getElementById("logit-d")?.value || "0"),
    ];
    const labels = ["A", "B", "C", "D"];
    const temperature = Math.max(0.1, parseFloat(document.getElementById("decode-temp")?.value || "1"));
    const topK = clamp(parseInt(document.getElementById("decode-top-k")?.value || "1", 10), 1, 4);
    const topP = clamp(parseFloat(document.getElementById("decode-top-p")?.value || "1"), 0.1, 1);

    const scaled = logits.map((value) => value / temperature);
    const probs = softmax(scaled);
    const ranked = labels.map((label, index) => ({ label, prob: probs[index] })).sort((a, b) => b.prob - a.prob);
    const topKSet = ranked.slice(0, topK).map((item) => item.label);
    let cumulative = 0;
    const topPSet = [];
    for (const item of ranked) {
      cumulative += item.prob;
      topPSet.push(item.label);
      if (cumulative >= topP) {
        break;
      }
    }

    const result = document.getElementById("decode-result");
    if (result) {
      result.innerHTML = `
        <strong>Temperature-scaled probabilities</strong>
        <p style="margin:0.6rem 0 0;">
          ${ranked.map((item) => `\\(p(${item.label}) = ${item.prob.toFixed(3)}\\)`).join("<br>")}
        </p>
        <p style="margin:0.8rem 0 0;">
          \\(\\text{top-k}\\) keeps: ${topKSet.join(", ")}<br>
          \\(\\text{top-p}\\) keeps: ${topPSet.join(", ")}
        </p>
      `;
      queueMathTypeset(result);
    }
  }

  function softmax(values) {
    const max = Math.max(...values);
    const exps = values.map((value) => Math.exp(value - max));
    const sum = exps.reduce((acc, value) => acc + value, 0);
    return exps.map((value) => value / sum);
  }

  function squaredDistance(a, b) {
    return (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function makeSnippet(body, query) {
    const text = body.replace(/\s+/g, " ").trim();
    const index = text.toLowerCase().indexOf(query);
    if (index < 0) {
      return text.slice(0, 180) + (text.length > 180 ? "..." : "");
    }
    const start = Math.max(0, index - 70);
    const end = Math.min(text.length, index + 120);
    const prefix = start > 0 ? "..." : "";
    const suffix = end < text.length ? "..." : "";
    return prefix + text.slice(start, end) + suffix;
  }

  function getTopicLabel(topic) {
    const chapter = chapterMap[topic];
    return chapter ? chapter.shortTitle : topic === "mixed" ? "Mixed" : "All topics";
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeAttribute(value) {
    return escapeHtml(value).replace(/`/g, "&#96;");
  }
})();
