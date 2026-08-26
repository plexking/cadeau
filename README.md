# Do You Love Me? 💕

A handmade-feeling interactive love-letter website: a playful yes/no
question, a gift selection with three gifts (a memories scrapbook, a
YouTube video, and a final letter), pastel scrapbook aesthetic. Pure
HTML/CSS/JS, no build step, no dependencies.

## How to run it

Just open `index.html` in a browser. That's it, no server, no
`npm install`, no build.

(If you want to host it, any static host works, Netlify, GitHub
Pages, Vercel static, etc. Point a QR code at the deployed URL.)

## User flow

```
Love question → (playful NO escalation, NO vanishes, YES fills the screen) → YES
  → Celebration → Gift selection
      → Gift 1 → Memories scrapbook → Back
      → Gift 2 → YouTube video → Back
      → Gift 3 → Final letter
```

## Where to personalize things

| What | File |
|---|---|
| Headline text, gift labels, video title, memories title | `data/config.js` |
| Your YouTube video | `data/config.js` → `siteConfig.video.youtubeId` (just the ID from the URL, e.g. `dQw4w9WgXcQ`) |
| Memory photos (paths, rotation, layout slot) | `data/memories.js` |
| Final letter text | `data/letter.js` |
| Your actual photos | `assets/memories/photo-1.svg` … replace with `.jpg`/`.png` and update `data/memories.js` |
| Character illustration | `assets/animation.gif` (neutral pose), `assets/animation1.gif` (hugging heart) |
| Colors | CSS variables at the top of `styles/theme.css` (`--bg-pink`, `--pink-main`, `--pink-dark`, `--green-yes`, `--red-no`) |
| Per-gift background tint | `.screen[data-screen="gift1"\|"music"\|"letter"]` in `styles/theme.css` |
| Fonts | `<link>` tags in `index.html` (currently Quicksand + Caveat via Google Fonts) |

## What's still a placeholder

- `assets/memories/photo-1.svg` through `photo-5.svg`, pastel
  placeholder cards. Swap for real photos (any image format works,
  just update the `src` in `data/memories.js`).
- `siteConfig.video.youtubeId` in `data/config.js`, currently a
  placeholder video ID, swap for your own.
- `assets/animation.gif` / `animation1.gif`, simple placeholder
  animated character (gentle bob + blink / heart-hug pulse). Replace
  with your own animated GIFs if you have real artwork; keep the
  same two filenames (or update the paths in `styles/theme.css`) and
  the same two states (neutral / hugging heart) so both screens stay
  consistent.

## Structure

```
index.html            entry point, all screen markup
styles/theme.css       all styling (theme variables at the top)
scripts/app.js         screen router + all interaction logic
data/config.js         headline text, video info, gift labels
data/memories.js       memory photo list
data/letter.js         final letter content
assets/                character art, placeholder photos
```

## Notes on the NO button

Clicking NO doesn't block anything, it's always clickable while
visible. Each click escalates: the heading changes, YES grows, NO
shrinks and wiggles a bit. After enough clicks, NO collapses out of
the layout entirely and YES becomes large and centered, no dead
end, just a nudge.

## Notes on the video (Gift 2)

The YouTube video is lazy-loaded: the iframe's `src` is only set
once you actually open Gift 2, and cleared again when you hit BACK,
so it doesn't keep loading or playing in the background.
