# AI/ML Final Deep Study Studio

This folder contains a standalone interactive study site for the final-exam scope from unsupervised learning through generative AI.

## Main file

- `index.html`

Open `index.html` directly in a browser, or serve the folder locally if you want a more normal browser workflow.

## What is inside

- `index.html`: app shell
- `styles.css`: layout and visual design
- `app.js`: reader, practice, flashcards, search, and concept-lab behavior
- `content-data.js`: generated content bundle used by the site
- `build_site_data.py`: rebuilds `content-data.js` from the markdown study documents
- `figures/`: generated chapter diagrams used by the reader content

## Regenerate content

If the chapter markdown files change, rebuild the content bundle with:

```powershell
python .\build_study_figures.py
python .\interactive_study_site\build_site_data.py
```

## Study modes

- `Dashboard`: roadmap and topic atlas
- `Reader`: long-form section-by-section lessons
- `Practice`: workbook questions with answer reveal and confidence tracking
- `Cram`: compact review cards
- `Flashcards`: glossary, comparison, and workbook recall cards
- `Concept Lab`: small interactive demos and calculators
- `Glossary`: term lookup
- `Search`: cross-topic search
