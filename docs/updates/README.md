# Public update manifest

`stable.json` è un **placeholder intenzionale** finché non esiste una release pubblica conforme e approvata.

Quando una release stabile viene distribuita, il file può essere aggiornato manualmente. Il futuro update checker in-app dovrà usare HTTPS, confrontare `versionCode`, verificare package, firma e hash SHA-256, e chiedere all'utente il consenso per l'installazione.

Il sito `index.html` non usa questo placeholder: legge direttamente l'ultima release stabile dalla GitHub REST API pubblica, quindi non mostra versioni inventate.

Un esempio di schema *non pubblicabile come versione reale* è:

```json
{
  "schema": 1,
  "channel": "stable",
  "status": "published",
  "versionName": "x.y.z",
  "versionCode": 123,
  "packageName": "il.package.approvato",
  "publishedAt": "YYYY-MM-DDTHH:mm:ssZ",
  "releasePage": "https://github.com/OWNER/REPO/releases/tag/TAG",
  "apks": [{"abi": "arm64-v8a", "url": "https://github.com/OWNER/REPO/releases/download/TAG/NAME.apk", "sha256": "64-hex-characters"}],
  "changelog": ["Note verificate"]
}
```

Non pubblicare dati fittizi nel manifest attivo. Non inserire credenziali di GitHub.
