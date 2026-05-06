(function () {
  const data = window.STUDY_DATA;
  if (!data) {
    return;
  }

  const STORAGE_KEY = "aiml-study-studio-progress-v1";
  const VIEW_TITLES = {
    dashboard: "Dashboard",
    reader: "Deep Reader",
    exams: "Exam Simulator",
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
    companionTab: "orientation",
    companionOpen: false,
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
  const exams = Array.isArray(data.exams) ? data.exams : [];
  const examMap = Object.fromEntries(exams.map((exam) => [exam.id, exam]));
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
    examId: exams[0]?.id || null,
    examQuestionIndex: 0,
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
      companionTab: progress.uiPrefs?.companionTab || DEFAULT_UI_PREFS.companionTab,
      companionOpen: progress.uiPrefs?.companionOpen ?? DEFAULT_UI_PREFS.companionOpen,
      sectionQuery: "",
      copyStatus: "",
      notesStatus: "",
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
      if (hashState.exam && examMap[hashState.exam]) {
        state.examId = hashState.exam;
        const examQuestionIndex = examMap[hashState.exam].questions.findIndex((question) => question.id === hashState.question);
        state.examQuestionIndex = examQuestionIndex >= 0 ? examQuestionIndex : 0;
      }
    } else {
      const lastLocation = progress.lastLocation;
      if (lastLocation && chapterMap[lastLocation.topic]) {
        state.topic = lastLocation.topic;
        state.section = lastLocation.section || chapterMap[lastLocation.topic].sections[0]?.id || null;
        state.view = lastLocation.view || "dashboard";
        if (lastLocation.examId && examMap[lastLocation.examId]) {
          state.examId = lastLocation.examId;
          state.examQuestionIndex = Math.max(0, Math.min(lastLocation.examQuestionIndex || 0, examMap[lastLocation.examId].questions.length - 1));
        }
      }
    }
    if (!examMap[state.examId] && exams[0]) {
      state.examId = exams[0].id;
      state.examQuestionIndex = 0;
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
        return {
          studiedSections: {},
          quizConfidence: {},
          readerNotes: { chapters: {}, sections: {} },
          examAttempts: {},
          lastLocation: null,
          uiPrefs: { ...DEFAULT_UI_PREFS },
        };
      }
      const parsed = JSON.parse(raw);
      return {
        studiedSections: parsed.studiedSections || {},
        quizConfidence: parsed.quizConfidence || {},
        readerNotes: {
          chapters: parsed.readerNotes?.chapters || {},
          sections: parsed.readerNotes?.sections || {},
        },
        examAttempts: parsed.examAttempts || {},
        lastLocation: parsed.lastLocation || null,
        uiPrefs: { ...DEFAULT_UI_PREFS, ...(parsed.uiPrefs || {}) },
      };
    } catch (_error) {
      return {
        studiedSections: {},
        quizConfidence: {},
        readerNotes: { chapters: {}, sections: {} },
        examAttempts: {},
        lastLocation: null,
        uiPrefs: { ...DEFAULT_UI_PREFS },
      };
    }
  }

  function saveProgress() {
    const snapshot = {
      studiedSections: progress.studiedSections,
      quizConfidence: progress.quizConfidence,
      readerNotes: progress.readerNotes,
      examAttempts: progress.examAttempts,
      lastLocation: {
        view: state.view,
        topic: state.topic,
        section: state.section,
        examId: state.examId,
        examQuestionIndex: state.examQuestionIndex,
      },
      uiPrefs: {
        readerScale: state.ui.readerScale,
        focusMode: state.ui.focusMode,
        companionTab: state.ui.companionTab,
        companionOpen: state.ui.companionOpen,
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
      exam: params.get("exam") || null,
      question: params.get("question") || null,
    };
  }

  function syncLocationHash() {
    const params = new URLSearchParams();
    params.set("view", state.view);
    params.set("topic", state.topic);
    if (state.section) {
      params.set("section", state.section);
    }
    if (state.view === "exams" && state.examId) {
      params.set("exam", state.examId);
      const exam = examMap[state.examId];
      const currentQuestion = exam?.questions?.[state.examQuestionIndex];
      if (currentQuestion) {
        params.set("question", currentQuestion.id);
      }
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
      if (state.view === "exams" && !isTypingTarget) {
        const exam = examMap[state.examId];
        const record = getExamRecord(state.examId);
        const question = exam?.questions?.[state.examQuestionIndex];
        if (!exam || !question) {
          return;
        }
        if (event.key === "ArrowRight" && state.examQuestionIndex < exam.questions.length - 1) {
          event.preventDefault();
          state.examQuestionIndex += 1;
          render();
          return;
        }
        if (event.key === "ArrowLeft" && state.examQuestionIndex > 0) {
          event.preventDefault();
          state.examQuestionIndex -= 1;
          render();
          return;
        }
        if (!record.submittedAt && /^[1-5]$/.test(event.key)) {
          const optionIndex = Number(event.key) - 1;
          const option = question.options[optionIndex];
          if (option) {
            event.preventDefault();
            setExamAnswer(state.examId, question.id, option.id);
            render();
          }
        }
      }
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
      if (state.view === "reader") {
        updateReaderPaneLayout();
      }
    });

    window.addEventListener("keydown", handleGlobalKeydown);
  }

  function setView(view) {
    state.view = view;
    if (view === "reader" && !state.section) {
      state.section = chapterMap[state.topic].sections[0]?.id || null;
    }
    if (view === "exams" && !examMap[state.examId] && exams[0]) {
      state.examId = exams[0].id;
      state.examQuestionIndex = 0;
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
    if (state.view === "exams") {
      const exam = examMap[state.examId] || exams[0];
      const record = getExamRecord(exam?.id);
      const stats = getExamStats(exam, record);
      els.heroStrip.classList.add("hero-strip-compact");
      els.heroStrip.innerHTML = exam ? `
        <article class="reader-summary-strip">
          <div class="reader-summary-block">
            <p class="eyebrow">Selected exam</p>
            <strong>${escapeHtml(exam.title)}</strong>
            <p>${escapeHtml(exam.description)}</p>
          </div>
          <div class="reader-summary-block">
            <p class="eyebrow">Answered</p>
            <strong>${stats.answered}/${stats.total}</strong>
            <p>${stats.unanswered} questions still unanswered in this attempt.</p>
          </div>
          <div class="reader-summary-block">
            <p class="eyebrow">Status</p>
            <strong>${record.submittedAt ? `${stats.percent}%` : "In progress"}</strong>
            <p>${record.submittedAt ? `${stats.correct} correct after submission.` : `Suggested time: ${exam.durationMinutes} minutes.`}</p>
          </div>
          <div class="reader-summary-block">
            <p class="eyebrow">Coverage</p>
            <strong>${stats.topicCount} topics</strong>
            <p>Every exam mixes all course topics from unsupervised learning through generative AI.</p>
          </div>
        </article>
      ` : "";
      return;
    }
    if (state.view === "reader") {
      const currentSection = sectionMap.get(state.section)?.section || chapter.sections[0];
      els.heroStrip.classList.add("hero-strip-compact");
      els.heroStrip.innerHTML = `
        <article class="reader-summary-strip">
          <div class="reader-summary-block">
            <p class="eyebrow">Current chapter</p>
            <strong>${escapeHtml(chapter.shortTitle)}</strong>
            <p>${escapeHtml(chapter.summary)}</p>
          </div>
          <div class="reader-summary-block">
            <p class="eyebrow">Coverage</p>
            <strong>${studiedText}</strong>
            <p>${overall.percent}% of all deep-reader sections marked studied.</p>
          </div>
          <div class="reader-summary-block">
            <p class="eyebrow">Practice</p>
            <strong>${strongText}</strong>
            <p>${quizStats.pending} prompts still need a confidence mark.</p>
          </div>
          <div class="reader-summary-block">
            <p class="eyebrow">Current section</p>
            <strong>${escapeHtml(stripSectionNumber(currentSection.title))}</strong>
            <p>${currentSection.readMinutes} min read, ${currentSection.wordCount} words.</p>
          </div>
        </article>
      `;
      return;
    }
    els.heroStrip.classList.remove("hero-strip-compact");
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
      case "exams":
        renderExams();
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
            <button class="secondary-button" data-dashboard-action="exams">Take Full Exam</button>
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
        <p class="eyebrow">Exam Mode</p>
        <h3 class="panel-title" style="margin-top:0.2rem;">Three Full Mixed Finals</h3>
        <div class="topic-card-grid" style="margin-top:1rem;">
          ${exams.map((exam) => {
            const examRecord = getExamRecord(exam.id);
            const examStats = getExamStats(exam, examRecord);
            return `
              <article class="card topic-card">
                <div class="chip-row">
                  <span class="chip">${exam.questions.length} questions</span>
                  <span class="chip">${exam.durationMinutes} min</span>
                  <span class="chip">${examRecord.submittedAt ? `${examStats.percent}% last score` : `${examStats.answered}/${examStats.total} answered`}</span>
                </div>
                <h4 style="margin-top:0.9rem;">${escapeHtml(exam.title)}</h4>
                <p>${escapeHtml(exam.description)}</p>
                <div class="action-row" style="margin-top:1rem;">
                  <button class="secondary-button" data-open-exam="${exam.id}">Open Exam</button>
                </div>
              </article>
            `;
          }).join("")}
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

    els.viewRoot.querySelectorAll("[data-open-exam]").forEach((button) => {
      button.addEventListener("click", () => {
        state.examId = button.dataset.openExam;
        state.examQuestionIndex = 0;
        setView("exams");
      });
    });
  }

  function stripSectionNumber(title) {
    return (title || "").replace(/^\d+(?:\.\d+)*\s*/, "").trim();
  }

  function lowerFirst(text) {
    if (!text) {
      return "";
    }
    return text.charAt(0).toLowerCase() + text.slice(1);
  }

  function sentenceSplit(text) {
    return (text || "")
      .replace(/\s+/g, " ")
      .split(/(?<=[.!?])\s+/)
      .map((sentence) => sentence.trim())
      .filter(Boolean);
  }

  function extractSectionParagraphs(section) {
    const fragment = document.createElement("div");
    fragment.innerHTML = section.html || "";
    const paragraphs = Array.from(fragment.querySelectorAll("p"))
      .map((node) => node.textContent.replace(/\s+/g, " ").trim())
      .filter(Boolean);
    return paragraphs.length ? paragraphs : [section.searchText].filter(Boolean);
  }

  function extractSectionHeadings(section) {
    const fragment = document.createElement("div");
    fragment.innerHTML = section.html || "";
    return Array.from(fragment.querySelectorAll("h4, h5")).map((node, index) => ({
      id: `reader-heading-${index + 1}`,
      level: node.tagName.toLowerCase(),
      title: node.textContent.replace(/\s+/g, " ").trim(),
    }));
  }

  function tokenizeForMatch(text) {
    return (text || "")
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((token) => token && token.length > 2 && !["the", "and", "for", "with", "that", "this", "from", "into", "why", "what"].includes(token));
  }

  function keywordScore(sourceText, candidateText) {
    const sourceTokens = new Set(tokenizeForMatch(sourceText));
    const candidateTokens = tokenizeForMatch(candidateText);
    if (!sourceTokens.size || !candidateTokens.length) {
      return 0;
    }
    let score = 0;
    candidateTokens.forEach((token) => {
      if (sourceTokens.has(token)) {
        score += 1;
      }
    });
    return score;
  }

  function pickRelevantItems(sectionTitle, sectionText, items, getText, limit = 2) {
    const scored = items
      .map((item, index) => ({
        item,
        index,
        score: keywordScore(`${sectionTitle} ${sectionText}`, getText(item)),
      }))
      .sort((left, right) => {
        if (right.score !== left.score) {
          return right.score - left.score;
        }
        return left.index - right.index;
      });

    const positive = scored.filter((entry) => entry.score > 0).slice(0, limit).map((entry) => entry.item);
    if (positive.length) {
      return positive;
    }
    return items.slice(0, limit);
  }

  function buildSectionToolkit(chapter, currentSection, prevSection, nextSection, sectionIndex) {
    const concept = stripSectionNumber(currentSection.title);
    const paragraphs = extractSectionParagraphs(currentSection);
    const sentences = sentenceSplit(paragraphs.join(" "));
    const headings = extractSectionHeadings(currentSection);
    const bestGoal = pickRelevantItems(currentSection.title, currentSection.searchText, chapter.goals, (item) => item, 1)[0] || chapter.goals[0];
    const bestTrap = pickRelevantItems(currentSection.title, currentSection.searchText, chapter.traps, (item) => item, 1)[0] || chapter.traps[0];
    const relatedEquations = pickRelevantItems(
      currentSection.title,
      currentSection.searchText,
      chapter.equationNotebook || [],
      (item) => `${item.label} ${item.meaning} ${item.intuition}`,
      2,
    );
    const relatedExamples = pickRelevantItems(
      currentSection.title,
      currentSection.searchText,
      chapter.workedExamples || [],
      (item) => `${item.title} ${item.searchText}`,
      2,
    );
    const chapterComparisons = data.compareDecks.filter((item) => item.topic === chapter.slug);
    const relatedComparisons = pickRelevantItems(
      currentSection.title,
      currentSection.searchText,
      chapterComparisons,
      (item) => `${item.prompt} ${item.answer}`,
      2,
    );
    const starterQuestion = pickRelevantItems(currentSection.title, currentSection.searchText, chapter.starterQuestions, (item) => item, 1)[0];

    const openingSentence = sentences[0] || `${concept} is an important idea in ${chapter.shortTitle}.`;
    const followUpSentence = sentences[1] || paragraphs[1] || "";
    const explanationParagraphs = [
      `In slow, plain language, this section says that ${lowerFirst(openingSentence.replace(/[.!?]+$/, ""))}.`,
      followUpSentence
        ? `The next thing to notice is that ${lowerFirst(followUpSentence.replace(/[.!?]+$/, ""))}.`
        : `Inside this chapter, the real point is ${lowerFirst(bestGoal.replace(/[.!?]+$/, ""))}.`,
      nextSection
        ? `This section matters because it helps you walk from ${stripSectionNumber(prevSection?.title || chapter.title).toLowerCase()} toward ${stripSectionNumber(nextSection.title).toLowerCase()} without losing the underlying idea.`
        : `This section matters because it helps turn the chapter from a list of terms into an organized mental model you can explain under exam pressure.`,
    ];

    const whyItMatters = nextSection
      ? `If this section stays fuzzy, the jump into ${stripSectionNumber(nextSection.title)} gets harder because the course expects you to carry this idea forward, not relearn it from scratch.`
      : `This section is part of the chapter wrap-up logic. It is where you make sure the topic now feels organized rather than scattered.`;

    const connectionLine = prevSection && nextSection
      ? `You just came from ${stripSectionNumber(prevSection.title)} and this section points directly into ${stripSectionNumber(nextSection.title)}.`
      : prevSection
        ? `This section closes a chain that was built from ${stripSectionNumber(prevSection.title)} earlier in the chapter.`
        : nextSection
          ? `This is the chapter entry point, so it is doing foundational work before ${stripSectionNumber(nextSection.title)} adds more detail.`
          : `This section stands on its own as a compact chapter checkpoint.`;

    const recallQuestions = [
      `What problem is ${concept.toLowerCase()} trying to solve, and what would break if we removed it?`,
      starterQuestion || `How would you explain ${concept.toLowerCase()} to someone who only remembers the chapter title?`,
      nextSection
        ? `How does ${concept.toLowerCase()} prepare you for ${stripSectionNumber(nextSection.title).toLowerCase()}?`
        : `How does ${concept.toLowerCase()} fit into the chapter as a whole rather than as an isolated fact?`,
    ];

    return {
      concept,
      explanationParagraphs,
      whyItMatters,
      commonConfusion: bestTrap,
      connectionLine,
      recallQuestions,
      headings,
      relatedEquations,
      relatedExamples,
      relatedComparisons,
      sectionNumberLabel: `Section ${sectionIndex + 1} of ${chapter.sections.length}`,
    };
  }

  function getChapterNote(topic) {
    return progress.readerNotes?.chapters?.[topic] || "";
  }

  function getSectionNote(sectionId) {
    return progress.readerNotes?.sections?.[sectionId] || "";
  }

  function saveReaderNote(scope, key, value) {
    if (!progress.readerNotes) {
      progress.readerNotes = { chapters: {}, sections: {} };
    }
    progress.readerNotes[scope][key] = value;
    saveProgress();
  }

  function renderCompanionContent(chapter, currentSection, sectionToolkit) {
    if (state.ui.companionTab === "orientation") {
      return `
        <div class="companion-stack">
          <section class="companion-card">
            <p class="eyebrow">Chapter Orientation</p>
            <h4>Big-Picture Context</h4>
            <div class="reader-copy compact-copy">${chapter.introHtml}</div>
          </section>
          <section class="companion-card">
            <h4>Plain-English Map</h4>
            <div class="reader-copy compact-copy">${chapter.plainEnglishHtml}</div>
          </section>
          <section class="companion-card">
            <h4>Mental Model</h4>
            <div class="reader-copy compact-copy">${chapter.mentalModelHtml}</div>
          </section>
          <section class="companion-card">
            <h4>Bridge Forward</h4>
            <div class="reader-copy compact-copy">${chapter.bridgeForwardHtml}</div>
          </section>
        </div>
      `;
    }

    if (state.ui.companionTab === "notebook") {
      return `
        <div class="companion-stack">
          <section class="companion-card">
            <p class="eyebrow">Section-First Notebook</p>
            <h4>Most Relevant Equations</h4>
            <div class="companion-card-grid">
              ${sectionToolkit.relatedEquations.map((equation) => `
                <article class="equation-card compact-card">
                  <h5>${escapeHtml(equation.label)}</h5>
                  <div class="equation-tex">\\[${equation.latex}\\]</div>
                  <p><strong>Meaning:</strong> ${escapeHtml(equation.meaning)}</p>
                </article>
              `).join("")}
            </div>
          </section>
          <section class="companion-card">
            <h4>Full Chapter Equation Notebook</h4>
            <div class="companion-stack dense-stack">
              ${chapter.equationNotebook.map((equation) => `
                <article class="equation-card compact-card">
                  <h5>${escapeHtml(equation.label)}</h5>
                  <div class="equation-tex">\\[${equation.latex}\\]</div>
                  <p><strong>Meaning:</strong> ${escapeHtml(equation.meaning)}</p>
                  <p><strong>Intuition:</strong> ${escapeHtml(equation.intuition)}</p>
                </article>
              `).join("")}
            </div>
          </section>
        </div>
      `;
    }

    if (state.ui.companionTab === "examples") {
      return `
        <div class="companion-stack">
          <section class="companion-card">
            <p class="eyebrow">Worked Examples</p>
            <h4>Examples Closest To This Section</h4>
            <div class="companion-stack dense-stack">
              ${sectionToolkit.relatedExamples.map((example) => `
                <article class="worked-card compact-card">
                  <h5>${escapeHtml(example.title)}</h5>
                  <div class="reader-copy compact-copy">
                    <p><strong>Scenario</strong></p>
                    ${example.scenarioHtml}
                    <p><strong>Walkthrough</strong></p>
                    ${example.walkthroughHtml}
                  </div>
                </article>
              `).join("")}
            </div>
          </section>
          <section class="companion-card">
            <h4>Comparison Prompts</h4>
            <div class="companion-stack dense-stack">
              ${sectionToolkit.relatedComparisons.map((item) => `
                <article class="mini-panel compact-card">
                  <h5>${escapeHtml(item.prompt)}</h5>
                  <p class="subtle">${escapeHtml(item.answer)}</p>
                </article>
              `).join("")}
            </div>
          </section>
        </div>
      `;
    }

    if (state.ui.companionTab === "mastery") {
      return `
        <div class="companion-stack">
          <section class="companion-card">
            <p class="eyebrow">Mastery</p>
            <h4>What To Understand</h4>
            <ul class="md-list">
              ${chapter.goals.map((goal) => `<li>${escapeHtml(goal)}</li>`).join("")}
            </ul>
          </section>
          <section class="companion-card">
            <h4>Common Exam Traps</h4>
            <ul class="md-list">
              ${chapter.traps.map((trap) => `<li>${escapeHtml(trap)}</li>`).join("")}
            </ul>
          </section>
          <section class="companion-card">
            <h4>Mastery Checklist</h4>
            <ul class="md-list">
              ${chapter.masteryChecklist.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
            </ul>
          </section>
          <section class="companion-card">
            <h4>Warm-Up Questions</h4>
            <ul class="md-list">
              ${chapter.starterQuestions.map((question) => `<li>${escapeHtml(question)}</li>`).join("")}
            </ul>
          </section>
        </div>
      `;
    }

    return `
      <div class="companion-stack">
        <section class="companion-card">
          <p class="eyebrow">Notebook</p>
          <h4>Chapter Notes</h4>
          <label class="sidebar-field">
            <span>Saved in this browser for ${escapeHtml(chapter.shortTitle)}</span>
            <textarea id="chapter-note-input" class="notes-input" placeholder="Write your own chapter summary, confusions, mnemonics, or formula reminders here.">${escapeHtml(getChapterNote(chapter.slug))}</textarea>
          </label>
        </section>
        <section class="companion-card">
          <h4>Section Notes</h4>
          <label class="sidebar-field">
            <span>Saved for ${escapeHtml(stripSectionNumber(currentSection.title))}</span>
            <textarea id="section-note-input" class="notes-input" placeholder="Capture what finally made this section click for you, plus anything you still need to revisit.">${escapeHtml(getSectionNote(currentSection.id))}</textarea>
          </label>
          <p class="reader-shortcut-note">Notes autosave locally as you type, so you can build your own exam-ready notebook over time.</p>
        </section>
      </div>
    `;
  }

  function updateReaderPaneLayout() {
    window.requestAnimationFrame(() => {
      const layout = document.getElementById("reader-layout");
      if (!layout) {
        return;
      }
      if (window.innerWidth <= MOBILE_SIDEBAR_BREAKPOINT || state.ui.focusMode) {
        layout.style.removeProperty("--reader-sticky-top");
        layout.style.removeProperty("--reader-sidebar-height");
        return;
      }
      const stickyTop = 18;
      const availableHeight = Math.max(360, window.innerHeight - stickyTop - 18);
      layout.style.setProperty("--reader-sticky-top", `${stickyTop}px`);
      layout.style.setProperty("--reader-sidebar-height", `${availableHeight}px`);
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
    const sectionToolkit = buildSectionToolkit(chapter, currentSection, prevSection, nextSection, sectionIndex);
    const sectionHero = currentSection.figureSrc
      ? `
        <figure class="md-figure section-hero">
          <img src="${escapeHtml(currentSection.figureSrc)}" alt="${escapeHtml(currentSection.figureAlt || currentSection.title)}" loading="lazy" />
          <figcaption>Section visual for ${escapeHtml(currentSection.title)}</figcaption>
        </figure>
      `
      : "";

    els.viewRoot.innerHTML = `
      <section class="reader-layout" id="reader-layout">
        <aside class="reader-sidebar" id="reader-sidebar-pane">
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

        <article class="reader-content" id="reader-content-pane">
          <div class="reader-header">
            <div>
              <p class="eyebrow">Current Section</p>
              <h3>${escapeHtml(currentSection.title)}</h3>
              <div class="reader-meta">
                <span class="meta-pill">${sectionToolkit.sectionNumberLabel}</span>
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

          <section class="lesson-panel">
            <p class="eyebrow">Section Lesson</p>
            <h3 class="panel-title" style="margin-top:0.2rem;">Unique Lesson Content</h3>
            <p class="subtle section-lesson-note">The main lesson stays here in full reading flow. Chapter-wide support material is tucked into the collapsed chapter companion below so the repeated guidance does not crowd the section itself.</p>
            <div class="reader-copy">
              ${sectionHero}
              ${currentSection.html}
            </div>
          </section>

          <section class="panel section-toolkit-panel">
            <p class="eyebrow">Deep Understanding Layer</p>
            <h3 class="panel-title" style="margin-top:0.2rem;">Linear Study Notes</h3>
            <div class="study-doc">
              <section class="study-doc-block">
                <h4>Section In One Breath</h4>
                <div class="reader-copy compact-copy">
                  ${sectionToolkit.explanationParagraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
                </div>
              </section>
              <section class="study-doc-block">
                <h4>What To Keep In View</h4>
                <p>${escapeHtml(sectionToolkit.whyItMatters)}</p>
                <p class="subtle">${escapeHtml(sectionToolkit.connectionLine)}</p>
              </section>
              <section class="study-doc-block">
                <h4>Reading Roadmap</h4>
                ${sectionToolkit.headings.length ? `
                  <div class="outline-list linear-outline-list">
                    ${sectionToolkit.headings.map((heading) => `
                      <button class="outline-link ${heading.level === "h5" ? "is-subheading" : ""}" data-scroll-heading="${heading.id}">
                        ${escapeHtml(heading.title)}
                      </button>
                    `).join("")}
                  </div>
                ` : `<p class="subtle">This section reads as one continuous explanation, so focus on how the idea develops from the opening statement to the final consequence.</p>`}
              </section>
              <section class="study-doc-block">
                <h4>Self-Check Prompts</h4>
                <p class="subtle">Use these only after you have read the section once without peeking. If you cannot answer them cleanly, reread the nearest heading block rather than restarting the entire chapter.</p>
                <ul class="md-list">
                  ${sectionToolkit.recallQuestions.map((question) => `<li>${escapeHtml(question)}</li>`).join("")}
                </ul>
              </section>
            </div>
          </section>

          <section class="panel chapter-companion-dock ${state.ui.companionOpen ? "is-open" : "is-collapsed"}" id="chapter-companion-dock">
            <div class="companion-header">
              <div>
                <p class="eyebrow">Chapter Companion</p>
                <h3 class="section-title" style="margin-top:0.2rem;">Persistent Study Desk</h3>
                <p class="subtle small">Orientation, notebook, worked examples, mastery checks, and notes live here. It stays collapsed by default so the main reading flow remains cleaner.</p>
              </div>
              <button class="tiny-button" id="companion-toggle-button" aria-expanded="${state.ui.companionOpen ? "true" : "false"}">
                ${state.ui.companionOpen ? "Collapse Companion" : "Open Companion"}
              </button>
            </div>
            ${state.ui.companionOpen ? `
              <div class="companion-tab-row" role="tablist" aria-label="Chapter companion tabs">
                ${[
                  ["orientation", "Orientation"],
                  ["notebook", "Notebook"],
                  ["examples", "Examples"],
                  ["mastery", "Mastery"],
                  ["notes", "My Notes"],
                ].map(([value, label]) => `
                  <button class="companion-tab ${state.ui.companionTab === value ? "is-active" : ""}" data-companion-tab="${value}" role="tab" aria-selected="${state.ui.companionTab === value ? "true" : "false"}">
                    ${label}
                  </button>
                `).join("")}
              </div>
              <div class="companion-body">
                ${renderCompanionContent(chapter, currentSection, sectionToolkit)}
              </div>
            ` : `
              <p class="companion-collapsed-copy">Open this when you want chapter orientation, equation notebooks, worked examples, mastery checklists, or a place to write notes without interrupting the section narrative.</p>
            `}
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

    document.getElementById("companion-toggle-button")?.addEventListener("click", () => {
      state.ui.companionOpen = !state.ui.companionOpen;
      render();
    });

    els.viewRoot.querySelectorAll("[data-companion-tab]").forEach((button) => {
      button.addEventListener("click", () => {
        state.ui.companionTab = button.dataset.companionTab;
        state.ui.companionOpen = true;
        render();
      });
    });

    document.getElementById("copy-section-link-button")?.addEventListener("click", async () => {
      await copyCurrentSectionLink();
    });

    document.getElementById("chapter-note-input")?.addEventListener("input", (event) => {
      saveReaderNote("chapters", chapter.slug, event.target.value);
    });

    document.getElementById("section-note-input")?.addEventListener("input", (event) => {
      saveReaderNote("sections", currentSection.id, event.target.value);
    });

    const readerCopy = els.viewRoot.querySelector(".reader-copy");
    if (readerCopy) {
      Array.from(readerCopy.querySelectorAll("h4, h5")).forEach((heading, index) => {
        if (sectionToolkit.headings[index]) {
          heading.id = sectionToolkit.headings[index].id;
        }
      });
    }

    els.viewRoot.querySelectorAll("[data-scroll-heading]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = document.getElementById(button.dataset.scrollHeading);
        if (!target) {
          return;
        }
        const targetTop = window.scrollY + target.getBoundingClientRect().top - 18;
        window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
      });
    });

    updateReaderPaneLayout();
  }

  function renderExams() {
    if (!exams.length) {
      els.viewRoot.innerHTML = `<section class="panel" style="padding:1.2rem;"><div class="empty-state">No exam sets are loaded yet.</div></section>`;
      return;
    }

    const exam = examMap[state.examId] || exams[0];
    state.examId = exam.id;
    const record = getExamRecord(exam.id);
    const stats = getExamStats(exam, record);
    if (state.examQuestionIndex >= exam.questions.length) {
      state.examQuestionIndex = 0;
    }
    const currentQuestion = exam.questions[state.examQuestionIndex] || exam.questions[0];
    const currentAnswer = record.answers[currentQuestion.id] || null;
    const topicBreakdown = getExamTopicBreakdown(exam, record);
    const unansweredIndex = exam.questions.findIndex((question) => !record.answers[question.id]);
    const currentExplanation = record.submittedAt
      ? `<div class="exam-explanation ${currentAnswer === currentQuestion.answer ? "is-correct" : "is-wrong"}">
          <p class="eyebrow">${currentAnswer === currentQuestion.answer ? "Correct" : "Review"}</p>
          <h4>${currentAnswer === currentQuestion.answer ? "Why this answer works" : `Correct answer: ${currentQuestion.answer}`}</h4>
          <p>${escapeHtml(currentQuestion.explanation)}</p>
        </div>`
      : "";

    els.viewRoot.innerHTML = `
      <section class="panel exam-selector-panel">
        <div class="section-title-row">
          <p class="eyebrow">Full Mixed Finals</p>
          <h3 class="panel-title" style="margin-top:0.2rem;">Three Comprehensive Exam Sets</h3>
          <p class="subtle">Each set spans unsupervised learning through generative AI. Use them as full-length mixed practice, not as tiny topic drills.</p>
        </div>
        <div class="exam-selector-grid">
          ${exams.map((item) => {
            const itemRecord = getExamRecord(item.id);
            const itemStats = getExamStats(item, itemRecord);
            const latestAttempt = itemRecord.attempts?.[itemRecord.attempts.length - 1] || null;
            return `
              <button class="exam-set-card ${item.id === exam.id ? "is-active" : ""}" data-exam-id="${item.id}">
                <p class="eyebrow">Set ${escapeHtml(item.label || item.title.replace(/^.*Set\s+/i, ""))}</p>
                <h4>${escapeHtml(item.title)}</h4>
                <p>${escapeHtml(item.description)}</p>
                <div class="chip-row">
                  <span class="chip">${item.questions.length} questions</span>
                  <span class="chip">${item.durationMinutes} min</span>
                  <span class="chip">${itemRecord.submittedAt ? `${itemStats.percent}% last score` : `${itemStats.answered}/${itemStats.total} answered`}</span>
                </div>
                ${latestAttempt ? `<p class="subtle small">Latest completed attempt: ${latestAttempt.correct}/${latestAttempt.total} correct.</p>` : `<p class="subtle small">Not submitted yet. You can leave and come back; answers persist locally.</p>`}
              </button>
            `;
          }).join("")}
        </div>
      </section>

      <section class="exam-layout">
        <aside class="exam-sidebar panel">
          <div class="exam-sidebar-block">
            <p class="eyebrow">Exam status</p>
            <h3 class="section-title" style="margin-top:0.2rem;">${escapeHtml(exam.title)}</h3>
            <p class="subtle">${escapeHtml(exam.description)}</p>
            <div class="reader-meta">
              <span class="meta-pill">${exam.questions.length} questions</span>
              <span class="meta-pill">${exam.durationMinutes} min</span>
              <span class="meta-pill">${record.submittedAt ? "Submitted" : "In progress"}</span>
            </div>
          </div>

          <div class="exam-sidebar-block">
            <div class="sidebar-title-row">
              <strong>Progress</strong>
              <span>${stats.answered}/${stats.total}</span>
            </div>
            <div class="topic-meter"><span style="width:${stats.answeredPercent}%"></span></div>
            <p class="subtle small">${stats.unanswered} unanswered. ${record.submittedAt ? `${stats.correct} correct, ${stats.total - stats.correct} incorrect.` : "Keyboard: 1-5 to choose an option, arrows to move."}</p>
          </div>

          <div class="exam-sidebar-block">
            <div class="sidebar-title-row">
              <strong>Question palette</strong>
              <span>${state.examQuestionIndex + 1}/${stats.total}</span>
            </div>
            <div class="exam-question-palette">
              ${exam.questions.map((question, index) => {
                const answer = record.answers[question.id];
                const isCorrect = answer && answer === question.answer;
                const isWrong = answer && answer !== question.answer;
                return `
                  <button class="exam-palette-button ${index === state.examQuestionIndex ? "is-current" : ""} ${answer ? "is-answered" : ""} ${record.submittedAt && isCorrect ? "is-correct" : ""} ${record.submittedAt && isWrong ? "is-wrong" : ""}" data-exam-question-index="${index}">
                    ${index + 1}
                  </button>
                `;
              }).join("")}
            </div>
            ${unansweredIndex >= 0 ? `<button class="tiny-button" id="jump-unanswered-button" style="margin-top:0.8rem;">Jump To Next Unanswered</button>` : ""}
          </div>

          <div class="exam-sidebar-block">
            <div class="sidebar-title-row">
              <strong>Coverage</strong>
              <span>${topicBreakdown.length} topics</span>
            </div>
            <div class="exam-topic-list">
              ${topicBreakdown.map((topic) => `
                <article class="mini-panel exam-topic-item">
                  <h4>${escapeHtml(getTopicLabel(topic.topic))}</h4>
                  <p class="subtle">${topic.total} questions${record.submittedAt ? `, ${topic.correct} correct` : ""}</p>
                </article>
              `).join("")}
            </div>
          </div>
        </aside>

        <article class="exam-main">
          ${record.submittedAt ? `
            <section class="panel exam-score-panel">
              <p class="eyebrow">Submitted Result</p>
              <h3 class="panel-title" style="margin-top:0.2rem;">${stats.correct}/${stats.total} Correct (${stats.percent}%)</h3>
              <div class="exam-score-grid">
                ${topicBreakdown.map((topic) => `
                  <article class="metric-box exam-score-box">
                    <strong>${topic.correct}/${topic.total}</strong>
                    <span>${escapeHtml(getTopicLabel(topic.topic))}</span>
                  </article>
                `).join("")}
              </div>
            </section>
          ` : ""}

          <section class="panel exam-question-panel">
            <div class="reader-header">
              <div>
                <p class="eyebrow">Question ${state.examQuestionIndex + 1} of ${exam.questions.length}</p>
                <h3>${escapeHtml(currentQuestion.prompt)}</h3>
                <div class="reader-meta">
                  <span class="meta-pill">${escapeHtml(getTopicLabel(currentQuestion.topic))}</span>
                  <span class="meta-pill">${escapeHtml(currentQuestion.difficulty)}</span>
                  <span class="meta-pill">${escapeHtml(currentQuestion.focus)}</span>
                </div>
              </div>
              <div class="action-row">
                ${state.examQuestionIndex > 0 ? `<button class="secondary-button" id="exam-prev-button">Previous</button>` : ""}
                ${state.examQuestionIndex < exam.questions.length - 1 ? `<button class="secondary-button" id="exam-next-button">Next</button>` : ""}
              </div>
            </div>

            <div class="exam-options">
              ${currentQuestion.options.map((option, optionIndex) => {
                const isSelected = currentAnswer === option.id;
                const isCorrect = option.id === currentQuestion.answer;
                const classes = [
                  "exam-option",
                  isSelected ? "is-selected" : "",
                  record.submittedAt && isCorrect ? "is-correct" : "",
                  record.submittedAt && isSelected && !isCorrect ? "is-wrong" : "",
                ].filter(Boolean).join(" ");
                return `
                  <button class="${classes}" data-exam-option="${option.id}" ${record.submittedAt ? "disabled" : ""}>
                    <span class="exam-option-letter">${option.id}</span>
                    <span class="exam-option-copy">${escapeHtml(option.text)}</span>
                    <span class="exam-option-index">${optionIndex + 1}</span>
                  </button>
                `;
              }).join("")}
            </div>

            ${currentExplanation}

            <div class="exam-footer-actions">
              ${!record.submittedAt ? `
                <button class="primary-button" id="submit-exam-button">${stats.unanswered ? `Submit With ${stats.unanswered} Unanswered` : "Submit Exam"}</button>
                <button class="secondary-button" id="reset-exam-button">Clear Attempt</button>
              ` : `
                <button class="primary-button" id="retake-exam-button">Retake This Exam</button>
                <button class="secondary-button" id="reset-exam-button">Clear Saved Answers</button>
              `}
            </div>
          </section>

          <section class="panel exam-guidance-panel">
            <p class="eyebrow">How To Use The Result</p>
            <div class="exam-guidance-grid">
              <article class="study-card">
                <h4>If you score low on a topic</h4>
                <p>Go back to Reader for that chapter, then redo only the missed exam questions. Use the section graphics, equation panels, and companion notebook to rebuild understanding before memorizing answers.</p>
              </article>
              <article class="study-card">
                <h4>If you miss conceptual questions</h4>
                <p>Explain the mechanism out loud in plain language first. Then connect it back to the formula, architecture, or pipeline that the question depends on.</p>
              </article>
              <article class="study-card">
                <h4>If you miss comparative questions</h4>
                <p>Build a contrast table: what each method assumes, what problem it solves, what can go wrong, and what metric or behavior you would inspect in practice.</p>
              </article>
            </div>
          </section>
        </article>
      </section>
    `;

    els.viewRoot.querySelectorAll("[data-exam-id]").forEach((button) => {
      button.addEventListener("click", () => {
        state.examId = button.dataset.examId;
        state.examQuestionIndex = 0;
        render();
      });
    });

    els.viewRoot.querySelectorAll("[data-exam-question-index]").forEach((button) => {
      button.addEventListener("click", () => {
        state.examQuestionIndex = Number(button.dataset.examQuestionIndex);
        render();
      });
    });

    document.getElementById("jump-unanswered-button")?.addEventListener("click", () => {
      if (unansweredIndex >= 0) {
        state.examQuestionIndex = unansweredIndex;
        render();
      }
    });

    document.getElementById("exam-prev-button")?.addEventListener("click", () => {
      state.examQuestionIndex = Math.max(0, state.examQuestionIndex - 1);
      render();
    });

    document.getElementById("exam-next-button")?.addEventListener("click", () => {
      state.examQuestionIndex = Math.min(exam.questions.length - 1, state.examQuestionIndex + 1);
      render();
    });

    els.viewRoot.querySelectorAll("[data-exam-option]").forEach((button) => {
      button.addEventListener("click", () => {
        if (record.submittedAt) {
          return;
        }
        setExamAnswer(exam.id, currentQuestion.id, button.dataset.examOption);
        render();
      });
    });

    document.getElementById("submit-exam-button")?.addEventListener("click", () => {
      if (!stats.answered) {
        state.ui.copyStatus = "Choose at least one answer before submitting.";
        render();
        return;
      }
      if (stats.unanswered && !window.confirm(`This attempt still has ${stats.unanswered} unanswered question(s). Submit anyway?`)) {
        return;
      }
      submitExam(exam.id);
      render();
    });

    document.getElementById("reset-exam-button")?.addEventListener("click", () => {
      const message = record.submittedAt
        ? "Clear the saved answers for this exam? Your past score history will stay."
        : "Clear the current in-progress answers for this exam?";
      if (!window.confirm(message)) {
        return;
      }
      resetExamAttempt(exam.id);
      render();
    });

    document.getElementById("retake-exam-button")?.addEventListener("click", () => {
      if (!window.confirm("Start a fresh attempt for this exam? Your previous score will stay in the local history.")) {
        return;
      }
      resetExamAttempt(exam.id);
      render();
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

  function getExamRecord(examId) {
    if (!examId) {
      return { answers: {}, submittedAt: null, attempts: [] };
    }
    if (!progress.examAttempts[examId]) {
      progress.examAttempts[examId] = {
        answers: {},
        submittedAt: null,
        attempts: [],
      };
    }
    return progress.examAttempts[examId];
  }

  function setExamAnswer(examId, questionId, optionId) {
    const record = getExamRecord(examId);
    if (record.submittedAt) {
      return;
    }
    record.answers[questionId] = optionId;
    saveProgress();
  }

  function gradeExam(exam, answers) {
    const byTopic = {};
    let correct = 0;
    let answered = 0;
    exam.questions.forEach((question) => {
      const userAnswer = answers[question.id];
      const topicRecord = byTopic[question.topic] || { topic: question.topic, total: 0, correct: 0, answered: 0 };
      topicRecord.total += 1;
      if (userAnswer) {
        answered += 1;
        topicRecord.answered += 1;
        if (userAnswer === question.answer) {
          correct += 1;
          topicRecord.correct += 1;
        }
      }
      byTopic[question.topic] = topicRecord;
    });
    const total = exam.questions.length;
    return {
      correct,
      total,
      answered,
      unanswered: total - answered,
      answeredPercent: total ? Math.round((answered / total) * 100) : 0,
      percent: total ? Math.round((correct / total) * 100) : 0,
      byTopic,
      topicCount: Object.keys(byTopic).length,
    };
  }

  function getExamStats(exam, record = getExamRecord(exam?.id)) {
    if (!exam) {
      return { correct: 0, total: 0, answered: 0, unanswered: 0, percent: 0, answeredPercent: 0, byTopic: {}, topicCount: 0 };
    }
    if (record.submittedAt && record.lastResult) {
      return {
        ...record.lastResult,
        answered: Object.keys(record.answers || {}).length,
        unanswered: exam.questions.length - Object.keys(record.answers || {}).length,
        answeredPercent: exam.questions.length ? Math.round((Object.keys(record.answers || {}).length / exam.questions.length) * 100) : 0,
        topicCount: Object.keys(record.lastResult.byTopic || {}).length,
      };
    }
    return gradeExam(exam, record.answers || {});
  }

  function getExamTopicBreakdown(exam, record) {
    const stats = getExamStats(exam, record);
    return data.chapters
      .map((chapter) => stats.byTopic[chapter.slug])
      .filter(Boolean);
  }

  function submitExam(examId) {
    const exam = examMap[examId];
    if (!exam) {
      return;
    }
    const record = getExamRecord(examId);
    const result = gradeExam(exam, record.answers || {});
    const submittedAt = new Date().toISOString();
    record.submittedAt = submittedAt;
    record.lastResult = result;
    record.attempts = [...(record.attempts || []), {
      submittedAt,
      correct: result.correct,
      total: result.total,
      percent: result.percent,
      byTopic: result.byTopic,
    }];
    saveProgress();
  }

  function resetExamAttempt(examId) {
    const record = getExamRecord(examId);
    progress.examAttempts[examId] = {
      answers: {},
      submittedAt: null,
      attempts: record.attempts || [],
      lastResult: null,
    };
    saveProgress();
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
    if (target.view === "exams" && target.exam && examMap[target.exam]) {
      if (target.topic && chapterMap[target.topic]) {
        state.topic = target.topic;
      }
      state.examId = target.exam;
      const exam = examMap[target.exam];
      const targetIndex = exam.questions.findIndex((question) => question.id === target.question);
      state.examQuestionIndex = targetIndex >= 0 ? targetIndex : 0;
      setView("exams");
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
