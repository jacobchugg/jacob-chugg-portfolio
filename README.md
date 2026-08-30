# Jacob Chugg — Portfolio Site

A static HTML/CSS/vanilla-JS multi-page site. No build step, no dependencies —
just upload the folder as-is.

## Hosting

This is a plain static site, so it works on GitHub Pages, Netlify, Vercel, or
any basic web host. A few notes depending on where you deploy:

- **Netlify / Vercel / custom domain root:** works as-is.
- **GitHub Pages user site (`username.github.io`):** works as-is.
- **GitHub Pages project site (`username.github.io/repo-name`):** the site
  uses relative paths throughout, so it will work either way, but update the
  `BASE_URL` value in `build_common.py`-generated canonical/OG tags if you
  rebuild anything (search each HTML `<head>` for `jacobchugg.com` and swap
  in your real domain once you have one — this only affects social-preview
  links and canonical tags, not the working site).

## Updating content later

Every page was generated from small Python scripts (not included in this
export) that assemble shared header/footer/nav markup so all pages stay
consistent. If you come back later and want to regenerate a page rather than
hand-editing HTML, keep that in mind — but hand-editing the HTML directly is
also perfectly fine for small tweaks (it's just plain semantic HTML/CSS).

### Adding the finished putter photos (highest priority update)

Open `projects/putter.html` and find the section with the id
`Manufacturing & Validation` (search for "Machining & final photography").
Replace the `.placeholder-card` block with a `.photo-grid` of `<img>` tags,
following the same pattern used in `projects/pipsqueak.html`. Once you have a
finished beauty shot of the assembled putter, consider swapping it in as the
new `.cs-hero-media` image at the top of the page (currently the CAD render)
so the real hardware becomes the lead image, per the original plan.

### Adding video of the putter in use

Follow the same pattern as `projects/robot.html`'s `.video-row` /
`.video-card` markup — compress any new video with something like:

```
ffmpeg -i input.mov -vf "scale=960:-2,fps=24" -c:v libx264 -preset slow -crf 28 \
  -c:a aac -b:a 96k -movflags +faststart assets/video/putter-demo.mp4
```

and generate a poster frame the same way the robot videos' posters were made.

## Structure

```
index.html              Home
projects.html           Case-study index
gallery.html            CAD & Design Gallery
about.html
resume.html
contact.html
projects/
  putter.html
  combustion-box.html
  robot.html
  pipsqueak.html
css/style.css           Single shared stylesheet (design system + all pages)
js/main.js               Nav, scroll-reveal, lightbox, video click-to-play
assets/img/…             Optimized WebP images, organized by project
assets/video/…           Compressed MP4s + poster frames (robot demo clips)
assets/pdf/…             Full resume PDF
favicon.svg
```
