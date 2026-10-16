# Mobile app

Install https://maiqueslab.org/app.html from your browser's Add to Home Screen/Install menu. The website retains its original logo and colours; install icons use the existing AI favicon monogram.

Available: standalone launch; quick links; device-local note drafts, section, link and publishing preference; photo previews; native system sharing where supported; clipboard fallback; text export; five interface languages. Photos stay in the current page session only. A completed share menu is not proof that the receiving app sent the update.

Network-first website pages avoid stale publications. Offline use provides the app shell and an explicit offline notice for other pages. The service worker intercepts only same-origin GET requests and caches only listed public app assets; it never uploads drafts.

Pending: no protected admin area, hosted private inbox, automatic hand-off or scheduled publishing is connected. Outlook read access returned USER_NOT_LOGGED_IN on 16 October 2026. No automation was created. Local build tools failed provisioning, so no server application was deployed. Do not describe the public app page as a protected private inbox.

Once the owner connects Outlook, verify the account and read access before creating an automation. Use owner-originated, uniquely prefixed submissions only. Preserve Publish when ready versus Show me first. Check duplicate request IDs, handle photos without exposing private material in the public repository, update translations, validate changes, and verify deployment. Store no private email contents in public processing logs. A hosted private inbox with upload storage is still an option when build access is restored.

Validation: script syntax; draft save/restore/clear; publishing preference in copied text; share preserves draft; empty-note rejection; network-first navigation; offline app/fallback; non-GET and cross-origin bypass; all new strings present in four translation dictionaries; PNG install icon decoded visually. Browser layout and device installation could not be checked in the unavailable local runtime.
