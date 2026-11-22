# Setup GitHub · Nalivy-Downloads

## Creazione repository pubblico (soltanto dopo aver deciso di pubblicare la pagina)

1. Su GitHub aprire **New repository**, owner `kekkox88`, nome **`Nalivy-Downloads`**.
2. Impostare **Public** per consentire download e GitHub Pages pubblici. Non importare il repository privato di sviluppo.
3. Caricare i file del presente pacchetto sul branch `main` mantenendo esattamente le cartelle. È preferibile inizializzare senza file aggiuntivi, per evitare conflitti durante l'upload.
4. Aprire **Settings → Pages → Build and deployment**.
5. Scegliere **Deploy from a branch**, branch **`main`**, cartella **`/docs`**, quindi salvare.
6. L'indirizzo previsto, dopo la pubblicazione di GitHub Pages, è `https://kekkox88.github.io/Nalivy-Downloads/`.
7. Verificare da una finestra anonima che immagine, CSS, JS e collegamenti siano accessibili senza autenticazione.
8. Non pubblicare APK finché licenze, sorgenti, firma e gate di release non sono stati approvati.

## Come si aggiorna il download sul sito

Il sito interroga l'endpoint pubblico `https://api.github.com/repos/kekkox88/Nalivy-Downloads/releases?per_page=30`: nessun token necessario. La ricerca considera la **più recente release pubblicata, non draft, con APK** fra le ultime 30 (incluse le RC pubblicate come prerelease). Le RC mostrano il badge **RC · PREVIEW** e non vengono presentate come stabili. Se non esistono release stabili, mostra lo stato "In preparazione".

## Distinzione tra sito, APK e update in-app

- **GitHub Pages:** presentazione e download delle release pubblicate.
- **GitHub Releases:** hosting di APK firmati e SHA-256.
- **`docs/updates/stable.json`:** placeholder per un futuro update checker integrato nell'app; non viene letto automaticamente dall'app corrente e non si sincronizza da solo.
- **CircleCI:** continua a compilare dal repository privato, senza pubblicazione automatica.

## Avvertenze

- Non rendere pubblico il repository privato di sviluppo né usare un mirror del progetto completo.
- Non aggiungere file `.apk` al repository; usa gli asset delle Releases.
- Il file `.gitignore` offre soltanto una protezione di base: verificare manualmente il contenuto prima del commit.
- La pagina pubblica **non implica** la pubblicazione di build di sviluppo della Neptune Project Community.

## Pubblicazione da Windows (Git Bash) dopo creazione del repository

Estrarre lo ZIP, aprire Git Bash nella cartella `Nalivy-Downloads` e usare:

```bash
git init
git branch -M main
git add README.md .gitignore docs/ SETUP-GITHUB.md RELEASE-CHECKLIST.md SOURCE-COMPLIANCE.md
git commit -m "site: launch Nalivy Simply downloads landing page"
git remote add origin https://github.com/kekkox88/Nalivy-Downloads.git
git push -u origin main
```

L'accesso a GitHub può richiedere credenziali tramite il gestore Git o autorizzazione via browser. **Non inserire token nel codice del sito**. GitHub Pages richiede poi l'attivazione descritta sopra.

Le immagini delle mascotte sono incorporate come WebP ottimizzati in `docs/assets/` e il sito non utilizza risorse esterne di tracking.
