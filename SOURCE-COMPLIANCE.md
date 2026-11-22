# Source compliance · rilascio Nalivy

> Documento operativo da verificare prima di ogni pubblicazione di APK. Non è una consulenza legale.

Il repository privato di sviluppo **può rimanere privato**. La distribuzione di un APK, tuttavia, deve rispettare le licenze del software che vi è incluso, indipendentemente dal fatto che lo sviluppo avvenga in un repository privato.

## Evidenze già rilevate

- Il repository privato di sviluppo contiene un file `LICENSE` con il testo della **GNU GPL versione 3**.
- Alcuni file di lyrics, tra cui `ImmersiveLyricsPanel.kt` e `SweptLyricLine.kt`, attribuiscono codice adattato a BitChord, **GPL-3.0-or-later**.
- Queste evidenze **non sostituiscono** un audit dell'intera catena di licenze, del lavoro combinato e delle condizioni applicabili alle singole dipendenze.

## Prima di rendere disponibili APK pubblici

1. Identificare tutte le parti GPL e le altre dipendenze, con relative licenze e obblighi di avviso.
2. Stabilire esattamente il **Corresponding Source** da fornire per l'APK distribuito, inclusi script di costruzione e informazioni necessarie a generarlo, secondo le licenze applicabili.
3. Preparare un archivio sorgente della stessa revisione distribuita, senza password, token, sessioni, cookie, credenziali Vault o chiavi di firma. Non sostituire questo requisito con la sola pubblicazione di un binario.
4. Aggiungere licenze, copyright e avvisi richiesti, preservando le attribuzioni esistenti.
5. Fornire un meccanismo di accesso al sorgente compatibile con la licenza e con la modalità di distribuzione scelta. Valutare eventuali obblighi relativi ai dispositivi coperti da GPLv3 quando applicabili.
6. Verificare eventuali autorizzazioni alternative per componenti non distribuibili come parte del lavoro combinato.
7. Effettuare la verifica finale di conformità **prima** della prima GitHub Release pubblica. Documentarne l'esito.

Il presente repository non deve includere credenziali e non deve mai essere configurato per sincronizzare automaticamente l'intero repository privato.

## Stato

**PENDING — audit licenze e modalità di fornitura del sorgente corrispondente.**

## Supplemento attribuzioni B100 — 22 novembre 2026

Una verifica successiva alla pubblicazione della release ha rilevato avvisi
runtime mancanti in `THIRD_PARTY_NOTICES.txt` per NewPipe Extractor,
Rhino, jsoup, AndroidX Media3 e Ktor. I dettagli e i testi completi
delle relative licenze sono ora consultabili nella pagina pubblica
[Licenze open source B100](https://kekkox88.github.io/Nalivy-Downloads/legal/third-party-notices.html).

**Distinzione importante:** gli APK originali e l'archivio del sorgente
corrispondente già distribuiti non vengono modificati o sostituiti in modo
invisibile. Questa è un'integrazione documentale separata. I testi
aggiunti nei sorgenti di sviluppo entreranno nell'APK soltanto
in una release successiva, compilata, firmata e verificata.

Questo elenco mirato **non completa** l'audit delle dipendenze transitive,
dei NOTICE Apache, del software vendorizzato e dei vincoli di
redistribuzione. La revisione generale indicata sopra rimane aperta.
