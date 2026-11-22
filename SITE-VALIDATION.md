# Verifiche sito Nalivy-Downloads

- Responsive: verificati viewport 320px, 390px e 1440px; nessun overflow orizzontale.
- Artworks: tutte e tre le immagini WebP reali caricate e renderizzate nel riquadro Community.
- Sezione Releases: simulati 404 (nessuna release) e una release con APK ARM64, checksum e changelog.
- `node --check docs/app.js`: PASS.
- Percorsi relativi CSS, JS e immagini: PASS su struttura locale.
- Preview rendering: eseguita su HTML/CSS/JS equivalenti incorporati nella pagina di prova, poiché il browser del container blocca la navigazione locale.
- Pubblicazione GitHub Pages e accesso reale a GitHub Releases: NON ANCORA TESTATI; repository ancora da creare.
- Nessun APK e nessun sorgente privato incorporati nel pacchetto.

Non sostituisce test della pubblicazione reale, verifica delle licenze o validazione di un APK.
