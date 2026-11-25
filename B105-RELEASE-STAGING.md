# Nalivy Simply Free 4.1.1 · Build 105 — release candidate (staging)

**Non ancora pubblicata.** B104 resta una baseline intermedia; B105 è il candidato pubblico cumulativo. Titolo e note da usare soltanto dopo collaudo, verifica licenze e firma.

## Novità / What's new

- 🌘 Aura Eclipse — Neptune Recovery: affinamento del matching, sessioni e diagnostica delle sorgenti; disponibilità dipendente dai servizi. / Refined matching, sessions and source diagnostics; availability depends on providers.
- ☁️ Nuvola Adaptive — profili e fallback preservati. / Preserved profile priorities and fallback.
- 🎨 Simply Your Way — Home personalizzabile, interruttori playlist indipendenti, pin, ordinamento, backup delle preferenze e opzioni del player. / Custom Home, independent playlist toggles, pins, ordering, preference backup and player options.
- 🪶 Smart Saver Feather Edition — palette leggere, riuso, lifecycle grafico, osservatori condivisi, cache incrementale. / Lightweight palettes, reuse, UI lifecycle, shared observers and incremental cache. Risparmi reali da misurare / Actual savings require device measurements.
- 📊 Simply Insights — riepilogo locale prioritario, periodi adattivi e gestione delle classifiche Spotify indisponibili; recupero remoto non garantito. / Local-first recap, adaptive period selectors and graceful handling of unavailable Spotify rankings; remote ranking retrieval is not guaranteed.
- 📌 Libreria — puntine compatte per playlist e album, più spazio ai titoli; interfaccia TV dedicata. / Compact playlist and album pins, more room for titles; dedicated TV interface.
- 🐯 Tigro · 🐳 Whale · 🐦 Colibrì.

**Pure music. Simply.**

## Checklist bloccante

- [ ] Tre run approvate, checkout `249989be4cf6ce0102776df573f604dce9e4a175` o successivo verificato, package com.kekkox88.nalivy.expressive, versionCode 105, versionName 4.1.1; firma ufficiale, ABI, R8, test e controlli CI.
- [ ] Test aggiornamento in-place da B103, senza disinstallare, e collaudo ARM64 / ARMv7a / TV.
- [ ] Audit licenze e sorgente corrispondente a B105; escludere credenziali e dati privati da APK e archivio.
- [ ] Pubblicare prerelease `v4.1.1-b105-rc1` con tutti i tre APK, SHA256SUMS.txt e archivio Corresponding-Source.
- [ ] Generare e verificare il candidato OTA con `tools/prepare_b105_ota.py` nel repo di sviluppo. Attivare `docs/updates/stable.json` solo dopo verifica dei byte pubblicati.
- [ ] Verificare Pages, selezione ABI, aggiornamento B103 → B105 e assenza di proposta B105 → B105.

Nomi: `Nalivy-Simply-Free-4.1.1-B105-RC-ARM64.apk`, `Nalivy-Simply-Free-4.1.1-B105-RC-ARMv7a.apk`, `Nalivy-Simply-Free-4.1.1-B105-RC-TV.apk`.
