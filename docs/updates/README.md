# Manifest pubblico aggiornamenti Nalivy

`stable.json` resta volutamente in stato **`not_published`** finché non esiste una GitHub Release approvata con APK, SHA-256 e sorgente corrispondente. Il nome del file rimane `stable.json` per compatibilità: il campo `channel` identifica **`rc`** oppure **`stable`**.

Nalivy 3.5.0 Build 100 usa questo feed via HTTPS dall'app, senza account GitHub e senza controlli continui in background. Il controllo automatico avviene al massimo una volta ogni 24 ore **quando si apre la schermata Aggiornamenti**, oppure manualmente tramite pulsante.

## Schema richiesto dall'APK B100

Questo è un **esempio**, da NON caricare come aggiornamento reale:

```json
{
  "schema": 1,
  "channel": "rc",
  "status": "published",
  "versionName": "3.5.1",
  "versionCode": 101,
  "packageName": "com.kekkox88.nalivy.expressive",
  "publishedAt": "2026-12-01T12:00:00Z",
  "releasePage": "https://github.com/kekkox88/Nalivy-Downloads/releases/tag/v3.5.1-rc1",
  "apks": [
    {
      "abi": "arm64-v8a",
      "url": "https://github.com/kekkox88/Nalivy-Downloads/releases/download/v3.5.1-rc1/Nalivy-3.5.1-ARM64.apk",
      "sha256": "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
      "sizeBytes": 12345678
    },
    {
      "abi": "armeabi-v7a",
      "url": "https://github.com/kekkox88/Nalivy-Downloads/releases/download/v3.5.1-rc1/Nalivy-3.5.1-ARMv7a.apk",
      "sha256": "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
      "sizeBytes": 12345678
    },
    {
      "abi": "universal",
      "url": "https://github.com/kekkox88/Nalivy-Downloads/releases/download/v3.5.1-rc1/Nalivy-3.5.1-TV.apk",
      "sha256": "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
      "sizeBytes": 12345678
    }
  ],
  "changelog": ["Novità reali della release"]
}
```

**I valori d'esempio non sono APK autentici né checksum validati.** Mai inserirli nel manifest attivo.

## Pubblicazione

1. Terminare prima la verifica delle licenze e la fornitura del sorgente corrispondente all'APK.
2. Pubblicare manualmente una release GitHub con APK approvati e verificati, `SHA256SUMS.txt`, source archive richiesto e note di rilascio. Per una Release Candidate attivare **Pre-release**.
3. Recuperare per ciascuno degli APK pubblicati **URL esatto**, **SHA-256 reale** e **dimensione reale in byte**.
4. Solo dopo la pubblicazione, sostituire il placeholder `stable.json` con i valori effettivi della versione. Il `versionCode` deve essere maggiore di quello installato per mostrare un aggiornamento.
5. Pubblicare e controllare da un dispositivo reale. La firma dell'APK scaricato deve coincidere con quella ufficiale Nalivy e con quella installata; Android richiederà il consenso esplicito all'installazione.

I tre APK B100 sono la **baseline** dell'updater: se nel manifest è indicata la stessa Build 100, il checker non proporrà di reinstallarla. Il primo aggiornamento in-app richiederà normalmente un `versionCode` successivo, per esempio 101.

Il checker non disinstalla l'app e non gestisce aggiornamenti silenziosi. La pagina GitHub Pages usa invece l'API Releases per mostrare anche gli APK correnti, separatamente dal manifest.

## B105 — candidato pubblico in preparazione

La B104 resta una baseline intermedia non pubblicata. Il candidato pubblico è 4.1.1/105, tag `v4.1.1-b105-rc1`. Usare i tre APK RC prodotti dal checkout B105 verificato, non il laboratorio SOLO. Lo script privato `tools/prepare_b105_ota.py` confronta gli APK locali con quelli pubblicati e SHA256SUMS prima di generare il manifest candidato. Non attivare il feed prima dell'approvazione. L'aggiornamento da B100/B103/B104 è possibile solo con updater presente, firma/package e ABI compatibili. La B105 non offre se stessa.

## B107 — Ragnarök (staging)

La B106 pubblicata resta attiva durante la preparazione della 5.0.0/107. Vedere `B107-RELEASE-STAGING.md` nella radice e `tools/prepare_b107_ota.py`. Non sostituire il feed prima del gate completo e dell'approvazione.
