# Website editing

This is the existing static GitHub Pages site at https://maiqueslab.org/. Pages use shared styles.css, site.js and i18n.js. network.html and resources.html also use explore.js. No build step or API keys are required.

## New sections
- Network: verified initial connections in network.html; the matching source catalogue is data/network.json. Keep cards, categories, city markers and the catalogue aligned when editing. City locations are approximate. Institutional tissue-bank infrastructure is distinguished from a direct lab collaboration.
- For everyone: plain-language research, patient/public involvement and outreach enquiries in for-everyone.html.
- Resources: public datasets, lab-data access enquiries, methods and a starter reading collection in resources.html. The matching source catalogue is data/resources.json. Keep both files aligned. Add real lab releases and protocols when available; do not create download links before assets exist.

## Languages
English is authored in the HTML. Spanish, Catalan, French and German dictionaries are in i18n/. translation-source.json records English strings and their page/context. Exact trimmed English text is the dictionary key: update all four dictionaries after changing prose. Elements marked data-no-translate retain names, official titles and citable paper titles. Translation covers text and selected accessibility/metadata attributes. Visitors can choose their language in the header; the choice persists locally. A supported browser language is offered without automatic country detection.

## Local check
Serve this folder with a static HTTP server, for example python -m http.server 8765 --bind 127.0.0.1. Test navigation, translations, city/category filters, paper search and mobile widths before publishing. Check source URLs when adding scientific resources. The map uses public-domain Natural Earth geometry, attributed in images/ASSETS.md.

## Mobile app
See MOBILE-APP.md for the installable companion and current limitations. app.html saves drafts on the device; no protected inbox or automatic publishing is connected. Keep the service worker network-first so visitors see current website publications.
