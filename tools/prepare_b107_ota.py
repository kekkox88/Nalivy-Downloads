#!/usr/bin/env python3
"""Generate a B107 OTA candidate from published assets and locally verified APKs.
No authentication, no release creation, no repository writes.
"""
import argparse
import hashlib
import json
import pathlib
import urllib.parse
import urllib.request

REPO = "kekkox88/Nalivy-Downloads"
PREFIX = "Nalivy-Simply-Free-5.0.0-B107-RC-"
ASSETS = {"arm64-v8a": PREFIX + "ARM64.apk",
          "armeabi-v7a": PREFIX + "ARMv7a.apk",
          "universal": PREFIX + "TV.apk"}
NOTES = [
    "Simply Comfort — Un’esperienza più naturale e personale.",
    "Simply Intelligence — Un’intelligenza discreta, facoltativa e al tuo servizio.",
    "Aura Eclipse & Nuvola — Un motore audio ulteriormente affinato.",
    "Simply Life — Nuove attenzioni per musica, podcast e ascolto quotidiano.",
    "A voi scoprire il nuovo mondo. Pure music. Simply."
]

def digest(stream, limit=None):
    h = hashlib.sha256()
    size = 0
    while True:
        chunk = stream.read(1024 * 1024)
        if not chunk:
            break
        size += len(chunk)
        if limit is not None and size > limit:
            raise ValueError("Asset exceeded expected size")
        h.update(chunk)
    return h.hexdigest(), size

def generate(release, directory, download):
    if release.get("draft") or not release.get("prerelease") or not release.get("published_at"):
        raise ValueError("Expected an actually published B107 prerelease")
    tag = release["tag_name"]
    if tag != "v5.0.0-b107-rc1":
        raise ValueError("Unexpected B107 release tag")
    prefix = f"https://github.com/{REPO}/releases/download/{urllib.parse.quote(tag, safe='')}/"
    page = f"https://github.com/{REPO}/releases/tag/{urllib.parse.quote(tag, safe='')}"
    if release.get("html_url") != page:
        raise ValueError("Unexpected release URL")
    assets = release["assets"]
    names = [a["name"] for a in assets]
    if len(set(names)) != len(names):
        raise ValueError("Duplicate assets")
    if "SHA256SUMS.txt" not in names or not any("Corresponding-Source" in n and n.endswith(".zip") for n in names):
        raise ValueError("Missing checksum or corresponding source asset")
    if set(n for n in names if n.lower().endswith(".apk")) != set(ASSETS.values()):
        raise ValueError("Expected exactly the three B107 RC APKs")
    for asset in assets:
        if asset["name"] == "SHA256SUMS.txt" or "Corresponding-Source" in asset["name"] and asset["name"].endswith(".zip"):
            if asset.get("state") != "uploaded" or not isinstance(asset.get("size"), int) or asset["size"] <= 0 or asset.get("browser_download_url") != prefix + asset["name"]:
                raise ValueError("Missing or incomplete verification asset: " + asset["name"])
    results = []
    for abi, name in ASSETS.items():
        asset = next(a for a in assets if a["name"] == name)
        url = asset["browser_download_url"]
        if url != prefix + name or asset.get("state") != "uploaded":
            raise ValueError("Unexpected asset URL/state: " + name)
        with (directory / name).open("rb") as f:
            sha, size = digest(f)
        if not 1000000 < size <= 256 * 1024 * 1024 or asset["size"] != size:
            raise ValueError("Size mismatch: " + name)
        if asset.get("digest") and asset["digest"] != "sha256:" + sha:
            raise ValueError("GitHub digest mismatch: " + name)
        with download(url) as f:
            actual = digest(f, size)
        if actual != (sha, size):
            raise ValueError("Published bytes mismatch: " + name)
        results.append({"abi": abi, "url": url, "sha256": sha, "sizeBytes": size})
    sums = next(a for a in assets if a["name"] == "SHA256SUMS.txt")
    if sums["browser_download_url"] != prefix + "SHA256SUMS.txt" or sums.get("state") != "uploaded":
        raise ValueError("Unexpected checksum asset")
    with download(sums["browser_download_url"]) as f:
        raw = f.read(65537)
    if len(raw) > 65536:
        raise ValueError("Checksum list too large")
    records = {}
    for line in raw.decode("utf-8").splitlines():
        parts = line.split(maxsplit=1)
        if len(parts) == 2:
            name = parts[1].lstrip("*")
            if name in records:
                raise ValueError("Duplicate checksum entry: " + name)
            records[name] = parts[0].lower()
    for a in results:
        name = a["url"].rsplit("/", 1)[1]
        if records.get(name) != a["sha256"]:
            raise ValueError("Published checksum mismatch: " + name)
    return {"schema": 1, "channel": "rc", "status": "published",
            "versionName": "5.0.0", "versionCode": 107,
            "packageName": "com.kekkox88.nalivy.expressive",
            "publishedAt": release["published_at"], "releasePage": page,
            "apks": results, "changelog": NOTES}

def download(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Nalivy-B107-OTA-staging"})
    return urllib.request.urlopen(req, timeout=60)

def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--apk-dir", type=pathlib.Path, required=True)
    p.add_argument("--tag", default="v5.0.0-b107-rc1")
    p.add_argument("--output", type=pathlib.Path, required=True)
    args = p.parse_args()
    if args.tag != "v5.0.0-b107-rc1":
        p.error("This generator is pinned to the proposed B107 tag")
    if args.output.name == "stable.json":
        p.error("Write a candidate file, not the active feed")
    url = f"https://api.github.com/repos/{REPO}/releases/tags/{args.tag}"
    with download(url) as response:
        release = json.loads(response.read(1024 * 1024))
    if release.get("tag_name") != args.tag:
        raise ValueError("Unexpected release tag")
    data = generate(release, args.apk_dir, download)
    with args.output.open("x", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print("OTA candidate written; manual review and publication still required:", args.output)

if __name__ == "__main__":
    main()
