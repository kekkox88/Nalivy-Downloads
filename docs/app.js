'use strict';
// The public site lists the newest manually published release with APK, marking an RC explicitly.
// Drafts and developer builds are not exposed by this page.
// No private repository access, credentials, tracking, or APK is embedded here.
const OWNER = 'kekkox88';
const REPOSITORY = 'Nalivy-Downloads';
const RELEASES = `https://github.com/${OWNER}/${REPOSITORY}/releases`;
const LATEST = `https://api.github.com/repos/${OWNER}/${REPOSITORY}/releases?per_page=30`;
const byId = id => document.getElementById(id);
const state = byId('release-state');
const nameEl = byId('release-name');
const meta = byId('release-meta');
const message = byId('release-message');
const files = byId('download-files');
const notes = byId('release-notes');
const notesText = byId('release-notes-text');
const heroDownload = byId('hero-download');
const releasePage = byId('release-page');
const releaseChannel = byId('release-channel');
const checksumLink = byId('checksum-link');
function setState(text) { state.textContent = text; }
function fallback(text, detail) {
  setState(text);
  nameEl.textContent = 'Nalivy Simply Free';
  meta.textContent = detail || 'Le release saranno visibili qui appena pubblicate.';
  message.textContent = 'Le anteprime e le build DEV restano riservate alla Neptune Project Community.';
  files.hidden = true;
  notes.hidden = true;
  checksumLink.hidden = true;
  releaseChannel.textContent = 'IN PREPARAZIONE';
}
function addApk(asset) {
  const a = document.createElement('a');
  a.className = 'download-file';
  a.href = asset.browser_download_url;
  a.rel = 'noopener noreferrer';
  a.target = '_blank';
  const top = document.createElement('strong');
  top.textContent = `↓ ${asset.name}`;
  const caption = document.createElement('span');
  const sizeMiB = Number.isFinite(asset.size) && asset.size > 0 ? ` · ${(asset.size / (1024 * 1024)).toFixed(1)} MiB` : '';
  caption.textContent = `Scarica APK${sizeMiB}`;
  a.append(top, caption);
  files.append(a);
}
async function renderRelease() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(LATEST, {
      headers: {'Accept': 'application/vnd.github+json'},
      signal: controller.signal,
      cache: 'no-store'
    });
    if (!response.ok) throw new Error(`GitHub API HTTP ${response.status}`);
    const published = await response.json();
    if (!Array.isArray(published)) throw new Error('Unexpected releases response');
    const hasTrustedDownload = asset => asset && typeof asset.name === 'string' &&
      /\.apk$/i.test(asset.name) && !/(?:^|[-_.])(?:dev|solo)(?:$|[-_.])/i.test(asset.name) &&
      typeof asset.browser_download_url === 'string' &&
      asset.browser_download_url.startsWith(`https://github.com/${OWNER}/${REPOSITORY}/releases/download/`);
    // Keep the last complete public release visible until all three new targets are present.
    const completeRelease = release => {
      const prefix = {'v4.1.0-b104-rc1':'Nalivy-Simply-Free-4.1.0-B104-RC-',
                      'v4.1.1-b105-rc1':'Nalivy-Simply-Free-4.1.1-B105-RC-',
                      'v4.1.2-b106-rc1':'Nalivy-Simply-Free-4.1.2-B106-RC-'}[release.tag_name];
      if (!prefix) return true;
      const base = RELEASES + '/download/' + release.tag_name + '/';
      const uploaded = a => a && a.state === 'uploaded' &&
        Number.isSafeInteger(a.size) && a.size > 0 && a.browser_download_url === base + a.name;
      const apk = release.assets.filter(a => /\.apk$/i.test(a.name || ''));
      return apk.length === 3 && new Set(apk.map(a => a.name)).size === 3 &&
        ['ARM64.apk','ARMv7a.apk','TV.apk'].every(suffix =>
          apk.some(a => uploaded(a) && hasTrustedDownload(a) && a.name === prefix + suffix && a.size > 1000000)) &&
        release.assets.some(a => uploaded(a) && a.name === 'SHA256SUMS.txt') &&
        release.assets.some(a => uploaded(a) && /Corresponding-Source.*\.zip$/.test(a.name || ''));
    };
    const releasesWithApk = published
      .filter(x => x && x.draft !== true && x.published_at &&
        !/(?:^|[-_.])(?:dev|solo)(?:$|[-_.])/i.test(x.tag_name || '') &&
        Array.isArray(x.assets) && x.assets.some(hasTrustedDownload) &&
        completeRelease(x))
      .sort((a, b) => Date.parse(b.published_at || b.created_at || '') - Date.parse(a.published_at || a.created_at || ''));
    const release = releasesWithApk[0];
    if (!release) {
      fallback('In preparazione', 'Nessuna release approvata con APK pubblicata al momento.');
      return;
    }
    const apk = release.assets.filter(hasTrustedDownload);
    const isRc = release.prerelease === true ||
      /(?:^|[-_.])(?:rc\d*|beta|preview|pre)(?:$|[-_.])/i.test(release.tag_name || '');
    setState(isRc ? 'Release Candidate (RC) disponibile' : 'Release stabile disponibile');
    releaseChannel.textContent = isRc ? 'RC · PREVIEW' : 'STABLE';
    nameEl.textContent = release.name || release.tag_name || 'Nalivy Simply Free';
    const date = release.published_at ? new Date(release.published_at) : null;
    const dateString = date && !Number.isNaN(date.getTime()) ? date.toLocaleDateString('it-IT', {year: 'numeric', month: 'long', day: 'numeric'}) : '';
    meta.textContent = [release.tag_name, dateString].filter(Boolean).join(' · ');
    message.textContent = isRc
      ? 'Versione RC di anteprima: scegli l’APK compatibile e leggi le limitazioni indicate nelle note. Non disinstallare l’app per aggiornare.'
      : 'Scegli l’APK compatibile con il tuo dispositivo. Non disinstallare Nalivy per aggiornare.';
    files.replaceChildren();
    apk.forEach(addApk);
    files.hidden = false;
    if (typeof release.body === 'string' && release.body.trim()) {
      notesText.textContent = release.body.trim();
      notes.hidden = false;
    } else {
      notes.hidden = true;
    }
    releasePage.href = typeof release.html_url === 'string' && release.html_url.startsWith(`${RELEASES}/tag/`) ? release.html_url : RELEASES;
    const checksums = release.assets.find(x => /^(SHA256SUMS\.txt|checksums\.sha256|sha256sums)$/i.test(x.name || '') && typeof x.browser_download_url === 'string' && x.browser_download_url.startsWith(`https://github.com/${OWNER}/${REPOSITORY}/releases/download/`));
    checksumLink.hidden = !checksums;
    if (checksums) checksumLink.href = checksums.browser_download_url;
    const arm64 = apk.find(x => /arm64|aarch64|armv8/i.test(x.name)) || apk[0];
    heroDownload.href = arm64.browser_download_url;
    heroDownload.textContent = `↓ Scarica ${/arm64|aarch64|armv8/i.test(arm64.name) ? 'ARM64' : 'APK'}`;
    heroDownload.removeAttribute('aria-disabled');
    heroDownload.removeAttribute('tabindex');
    heroDownload.classList.remove('is-disabled');
  } catch (e) {
    fallback('Verifica temporaneamente non disponibile', 'Consulta GitHub Releases per controllare gli aggiornamenti.');
  } finally {
    clearTimeout(timeout);
  }
}
async function renderOtaStatus() {
  const target = byId('ota-status');
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch('./updates/stable.json', {cache:'no-store', signal:controller.signal});
    if (!response.ok) throw new Error('Feed unavailable');
    const feed = await response.json();
    if (feed.schema !== 1) throw new Error('Unknown schema');
    if (feed.status === 'not_published') {
      target.textContent = 'OTA non ancora attivo. Usa la sezione download per le release pubblicate.';
      return;
    }
    if (feed.status !== 'published' || !Number.isSafeInteger(feed.versionCode) ||
        feed.versionCode <= 0 || !/^\d+\.\d+\.\d+(?:[-.][A-Za-z0-9.-]+)?$/.test(feed.versionName || '') ||
        !['rc','stable'].includes(feed.channel) || feed.packageName !== 'com.kekkox88.nalivy.expressive' ||
        typeof feed.releasePage !== 'string' || !feed.releasePage.startsWith(RELEASES + '/tag/') ||
        !Array.isArray(feed.apks) || feed.apks.length === 0 ||
        !feed.apks.every(a => ['arm64-v8a','armeabi-v7a','universal'].includes(a.abi) &&
          typeof a.url === 'string' && a.url.startsWith(RELEASES + '/download/') &&
          a.url.endsWith('.apk') && /^[a-f0-9]{64}$/i.test(a.sha256 || '') &&
          Number.isSafeInteger(a.sizeBytes) && a.sizeBytes > 0 && a.sizeBytes <= 256 * 1024 * 1024) ||
        new Set(feed.apks.map(a => a.abi)).size !== feed.apks.length)
      throw new Error('Invalid feed');
    target.textContent = 'OTA pubblicato: ' + feed.versionName + ' · Build ' + feed.versionCode +
      (feed.channel === 'rc' ? ' (RC)' : '') + '. Disponibile per installazioni precedenti compatibili.';
  } catch (_) {
    target.textContent = 'Stato OTA temporaneamente non verificabile. Controlla dall’app.';
  } finally { clearTimeout(timeout); }
}
renderRelease();
renderOtaStatus();
