# Kira Kira's website

https://xuaan33.github.io/kirakira-site/ — what the app does, with a shelf you can try, and
its privacy policy (`privacy.html`, the URL both app stores list). Plain HTML, CSS and one
small script (`shelf.js`), served by GitHub Pages from `main`.

- **Screens** (`shots/`) are drawn by the app itself, in both themes: `make shots` in the app
  repo writes them to `build/shots/`, then `cwebp -q 85 -resize 780 0` makes each phone
  screen here (the scan screen at full size, as the top section shows it larger). Online
  prices and sellers on them are examples, and the page says so.
- **Fonts** are Manrope and Unbounded (SIL Open Font License 1.1, licences in `fonts/`),
  subset to Latin as WOFF2, so the pages load no one else's files.
- **`og-image.png`** is the link preview, 1200 × 630.
