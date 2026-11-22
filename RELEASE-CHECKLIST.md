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
4. Inserire release notes, architetture supportate e SHA-256. Non marcare come stable una DEV o un pre-release.
5. Pubblicare la release manualmente. La pagina GitHub Pages rileverà l'ultima release stabile tramite l'API GitHub.
6. Quando verrà integrato un update checker **in-app**, compilare il manifest `docs/updates/stable.json` con dati verificati (versione, code, firma/package coerenti, URL, SHA-256, changelog) e pubblicare l'aggiornamento al sito. Il manifest placeholder attuale **non è attivo** come servizio di aggiornamento in-app.

**Mai disinstallare automaticamente l'app. Mai avviare un APK installer senza consenso esplicito dell'utente.**
