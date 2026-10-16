# Mobile app and private update inbox

Install https://maiqueslab.org/app.html from your browser's Add to Home Screen/Install menu. The existing website logo and colours are preserved. The app saves note drafts on the device and opens a prefilled issue in mAIqPath/maiqueslab-updates, which was verified PRIVATE and writable on 16 October 2026. GitHub handles sign-in, photos and actual submission. No GitHub token or private API response is embedded in public client code.

## Workflow
Write a rough note, choose a section and Publish when ready or Show me first, then Send to private inbox. On the GitHub page attach photos and submit. Long notes use a manual paste fallback instead of an oversized URL; offline notes stay saved until connected. Drafts are not marked sent just because the link opened. Clear a draft when finished. Copy/share to ChatGPT remains available as an alternative.

A ChatGPT automation named Update lab website is enabled hourly in Europe/London. It reads PROCESSING.md from the private inbox, processes only owner-authored requests, preserves private drafts until explicit approval, updates website translations and records actual results privately. Routine additions marked Publish when ready may be published directly after checks. No Outlook connection is used. Schedule creation proves configuration, not a completed cloud run.

## Photos
Photos are attached on GitHub, not uploaded from the public app page. Access to real private GitHub attachment downloads has not been tested; an inaccessible attachment leaves the request open for an asset upload. Files in the private repository assets/ folder can be fetched through the GitHub connector. Never silently omit a requested photo.

## Verification
The private inbox setup request was created, fetched, given a status comment, closed and read back. Script and URL-generation checks cover encoded notes, publishing preference, long-note and offline fallbacks. Browser/device interaction and the first scheduled execution remain separate checks. Website pages use network-first fetching; app shell can work offline. No cached version of other research pages is served as if live.
