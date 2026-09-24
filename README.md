# Kira Kira's website

https://xuaan33.github.io/kirakira-site/ — what the app does, with a shelf you can try, and
its privacy policy (`privacy.html`, the URL both app stores list). Plain HTML, CSS and one
small script (`shelf.js`), served by GitHub Pages from `main`.

- **Screens** (`shots/`) are drawn by the app itself, in both themes: in the app repo,
  `flutter test test_shots/shots_test.dart --flavor prod` writes them to `build/shots/`.
  Online prices and sellers on them are examples, and the page says so.
- **Fonts** are Manrope and Unbounded (SIL Open Font License 1.1, licences in `fonts/`),
  subset to Latin as WOFF2, so the pages load no one else's files.
- **`og-image.png`** is the link preview, 1200 × 630.
