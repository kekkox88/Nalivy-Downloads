# Release checklist · Nalivy Simply Free

Le GitHub Releases pubbliche sono intenzionalmente **manuali**. Nessun push sul repository di sviluppo deve produrre una release pubblica.

## Gate prima della pubblicazione

- [ ] Verifica licenze e sorgenti corrispondenti completata (`SOURCE-COMPLIANCE.md`).
- [ ] Long-run test sul dispositivo reale eseguiti o limitazioni documentate.
- [ ] APK costruito dal commit approvato, non da una HEAD implicita.
- [ ] App ID esatto, `versionCode` e `versionName` verificati nel binario.
- [ ] Firma verificata; certificato coerente con gli aggiornamenti delle release precedenti.
- [ ] ABI e compatibilità Android confermate (ARM64, ARMv7a, Android TV solo se effettivamente testate).
- [ ] Riproduzione, podcast, download, Android Auto e installazione sopra la release precedente verificati negli scenari pertinenti.
- [ ] Nessun segreto, token, credenziale, URL autenticato o log privato incorporato.
- [ ] SHA-256 degli APK calcolato e allegato in `SHA256SUMS.txt`.
- [ ] Note di versione e possibili limitazioni redatte senza claim non verificati.
- [ ] Approvazione esplicita della pubblicazione.

## Pubblicazione manuale

1. Aprire **GitHub → Nalivy-Downloads → Releases → Draft a new release**.
2. Creare un tag semantico relativo alla build approvata, per esempio `v3.0.2-b80` **solo se quella build è effettivamente stata approvata per essere pubblicata**.
3. Caricare esclusivamente APK firmati e approvati, checksum e documenti sorgente/avvisi richiesti.
4. Inserire release notes, architetture supportate, SHA-256 e il link al **Corresponding Source** della stessa revisione quando richiesto. Una RC va marcata **Pre-release**; le DEV non devono essere pubblicate come release approvate.
5. Pubblicare la release manualmente. La pagina GitHub Pages rileverà la più recente release approvata con APK (anche RC), mostrandone il canale **RC · PREVIEW** oppure **STABLE**.
6. Per **Nalivy 3.5.0 Build 100 e successive**, aggiornare **solo dopo aver pubblicato gli APK reali** il manifest `docs/updates/stable.json`, con `status: "published"`, `channel: "rc"` o `"stable"`, package ufficiale, `versionName`, `versionCode`, releasePage, URL HTTPS di ciascun APK, `abi` (`arm64-v8a`, `armeabi-v7a`, `universal` per TV), SHA-256 e **`sizeBytes` esatti**. Seguire `docs/updates/README.md`; non usare dati fittizi. Prima della pubblicazione il manifest resta `not_published`.

**Mai disinstallare automaticamente l'app. Mai avviare un APK installer senza consenso esplicito dell'utente.**
