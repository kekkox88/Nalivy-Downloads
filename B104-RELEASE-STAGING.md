# Nalivy Simply Free 4.1.0 · Build 104 — release candidate (staging)

**Superata dalla B105 come candidato pubblico; non pubblicata.** Titolo e note da usare soltanto dopo collaudo, verifica licenze e firma.

## Novità / What's new

- 🌘 Aura Eclipse — Neptune Recovery: affinamento del matching, sessioni e diagnostica delle sorgenti; disponibilità dipendente dai servizi. / Refined matching, sessions and source diagnostics; availability depends on providers.
- ☁️ Nuvola Adaptive — profili e fallback preservati. / Preserved profile priorities and fallback.
- 🎨 Simply Your Way — Home personalizzabile, interruttori playlist indipendenti, pin, ordinamento, backup delle preferenze e opzioni del player. / Custom Home, independent playlist toggles, pins, ordering, preference backup and player options.
- 🪶 Smart Saver Feather Edition — palette leggere, riuso, lifecycle grafico, osservatori condivisi, cache incrementale. / Lightweight palettes, reuse, UI lifecycle, shared observers and incremental cache. Risparmi reali da misurare / Actual savings require device measurements.
- 🐯 Tigro · 🐳 Whale · 🐦 Colibrì.

**Pure music. Simply.**

## Checklist bloccante

- [ ] Tre run approvate, medesimo checkout, package com.kekkox88.nalivy.expressive, versionCode 104, versionName 4.1.0; firma ufficiale, ABI, R8, test e controlli CI.
- [ ] Test aggiornamento in-place da B103, senza disinstallare, e collaudo ARM64 / ARMv7a / TV.
- [ ] Audit licenze e sorgente corrispondente a B104; escludere credenziali e dati privati da APK e archivio.
- [ ] Pubblicare prerelease `v4.1.0-b104-rc1` con tutti i tre APK, SHA256SUMS.txt e archivio Corresponding-Source.
- [ ] Generare e verificare il candidato OTA con `tools/prepare_b104_ota.py` nel repo di sviluppo. Attivare `docs/updates/stable.json` solo dopo verifica dei byte pubblicati.
- [ ] Verificare Pages, selezione ABI, aggiornamento B103 → B104 e assenza di proposta B104 → B104.

Nomi: `Nalivy-Simply-Free-4.1.0-B104-RC-ARM64.apk`, `Nalivy-Simply-Free-4.1.0-B104-RC-ARMv7a.apk`, `Nalivy-Simply-Free-4.1.0-B104-RC-TV.apk`.
