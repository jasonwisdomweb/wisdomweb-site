# WisdomWeb Assets

## Folder structure

```
assets/
├── images/
│   ├── hero-character.png     — 3D child character for hero section (id="hero-character")
│   ├── ctp-character.png      — 3D child character for CTP section (id="ctp-character")
│   └── og-image.png           — Open Graph social preview image (1200×630)
│
└── icons/
    ├── favicon.ico            — Browser favicon
    ├── apple-touch-icon.png   — iOS home screen icon (180×180)
    └── favicon-32.png         — 32×32 PNG favicon
```

## Image guidelines

- **hero-character / ctp-character**: transparent-background PNG, 800×1000px minimum, 3D rendered child character
- Replace the `.char-placeholder` divs in `index.html` with `<img>` tags pointing to these paths once assets are ready
- The placeholder boxes use `id="hero-character"` and `id="ctp-character"` as specified
