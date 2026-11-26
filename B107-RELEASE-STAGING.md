# Nalivy Simply Free 5.0.0 · B107 — Ragnarök (staging)
 
**Non pubblicata.** Questa preparazione non autorizza la release, non contiene checksum inventati e non modifica il feed attivo B106. Non pubblicare APK parziali. Tag proposto: `v5.0.0-b107-rc1`; titolo: **Nalivy 5.0.0 — Ragnarök · RC**.

## Note di rilascio / Release notes

Dal sibilo dell'Eclissi, un nuovo mondo.

- Simply Comfort — Un’esperienza più naturale e personale.
- Simply Intelligence — Un’intelligenza discreta, facoltativa e al tuo servizio.
- Aura Eclipse & Nuvola — Un motore audio ulteriormente affinato.
- Simply Life — Nuove attenzioni per musica, podcast e ascolto quotidiano.

Non vi sveleremo tutto. **A voi scoprire il nuovo mondo.**

Pure music. Simply.

English:
- Simply Comfort — A more natural, personal experience.
- Simply Intelligence — Discreet, optional intelligence at your service.
- Aura Eclipse & Nuvola — Further refined audio engine.
- Simply Life — New touches for music, podcasts and everyday listening.

Discover the new world for yourselves. Pure music. Simply.

## Gate di pubblicazione

- [ ] Preflight ARM64, ARMv7a e TV, lint, JVM, R8 e build RC firmate dallo stesso commit approvato (non congelare un HEAD prima del termine delle correzioni).
- [ ] Firma identica alla B106; package `com.kekkox88.nalivy.expressive`; versionName 5.0.0 e versionCode 107; ABI corretta e TV universal.
- [ ] Aggiornamento in-place da B106, riproduzione, podcast, Android Auto e TV; documentare limitazioni reali.
- [ ] Audit licenze e Corresponding Source della revisione esatta, senza credenziali o dati privati.
- [ ] Preparare una GitHub Release in draft, marcarla prerelease e caricare:
  - `Nalivy-Simply-Free-5.0.0-B107-RC-ARM64.apk`
  - `Nalivy-Simply-Free-5.0.0-B107-RC-ARMv7a.apk`
  - `Nalivy-Simply-Free-5.0.0-B107-RC-TV.apk`
  - `SHA256SUMS.txt`
  - archivio `Corresponding-Source*.zip`
- [ ] Approvazione esplicita. Integrare il guard del sito prima della pubblicazione; preservare `docs/updates/stable.json` B106 fino alla verifica finale.
- [ ] Pubblicare la release completa; generare il candidato con `python3 tools/prepare_b107_ota.py --apk-dir /path/to/verified-apks --output b107-candidate.json`. Il generatore richiede prerelease pubblicata, confronto dei byte locali/remoti, SHA-256, dimensioni e asset di verifica. Non firma APK e non verifica il certificato: il gate binario rimane obbligatorio.
- [ ] Solo dopo verifica manuale, sostituire il feed attivo con il candidato, in commit separato. Verificare sito, B106 → B107, scelta ABI, B107 → B107 (nessuna proposta).
- [ ] Conservare i binari B106 e il commit del feed precedente. In caso di errore ripristinare il feed B106 e ritirare la release B107 dalla visibilità pubblica se necessario. Un dispositivo già aggiornato non può essere riportato a B106 tramite un normale OTA.

Nessun claim di disponibilità universale delle fonti o risparmio misurato; la release resta RC.
