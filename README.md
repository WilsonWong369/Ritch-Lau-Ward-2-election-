# Re-Elect Ritch Lau — Ward 2 Markham 2026

Bilingual (English / Traditional Chinese) campaign website for Ritch Lau, Ward 2 Markham Councillor.

## Files

```
index.html      Page content and structure
style.css       All styling (colours, fonts, layout, responsive rules)
script.js       Interactivity (language toggle, timeline, neighbourhood map, nav, form)
images/         Local image assets referenced by index.html
  campaign-launch-aug2026.jpg
README.md       This file
```

**Keep all of these files and the `images/` folder together in the same directory.** `index.html` links to `style.css`, `script.js`, and `images/campaign-launch-aug2026.jpg` using relative paths — if any of them get separated (e.g. you only upload `index.html` on its own), those pieces will break (missing styles, missing interactivity, or a broken-image icon).

## Deploying

Upload the entire folder (all files + the `images` subfolder, preserving that structure) to your web host via FTP/SFTP or your host's file manager. No build step, server, or database is required — it's a static site.

## Editing content

Everything is in plain HTML/CSS/JS, no templating system:

- **Text**: Each piece of bilingual text is two `<span>` elements side by side — one with class `lang-en`, one with class `lang-zh`. Edit the English inside `lang-en` and the Chinese inside `lang-zh`.
- **Language toggle**: Handled by `script.js` and CSS rules keyed on `body[data-lang="en"]` / `body[data-lang="zh"]`. No changes needed unless you add new bilingual content — just follow the same `lang-en` / `lang-zh` span pattern.
- **Community Engagement timeline** (`#timeline`): Each entry is a `<button class="hz-node" data-target="tl-X">` in the timeline track, paired with a `<article class="hz-panel" id="tl-X">` in the panels list below it. To add an entry, copy an existing node/panel pair, give both a new matching `tl-` id, and place the node button and panel article in the order you want them to appear.
- **Ward 2 Neighbourhoods map** (`#neighbourhoods`): The clickable map tiles are in `.ward-map`, and their detail content (about + concerns) is pulled live from the matching `.hood-card` in the accordion list further down — edit the `.hood-card__body` content there to change what shows on the map.
- **Images**: Add new files to `images/` and reference them as `images/filename.jpg` in `index.html`.

## Notes

- Election Day: October 26, 2026.
- The hero section's "2026 Priorities" card and timeline are meant to be living content — update them as the campaign progresses (new endorsements, events, milestones) rather than treating them as fixed at launch.
- Contact form (`#contact`) is front-end only in `script.js` — wire it up to a real backend, Formspree, or mailto handler before relying on it to capture submissions.