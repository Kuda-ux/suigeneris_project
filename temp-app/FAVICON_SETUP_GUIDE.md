# 🎨 Favicon Setup Guide - Sui Generis Logo

## 📋 Quick Fix (Easiest Method)

### Option 1: Use Online Favicon Generator (Recommended)

1. **Go to:** https://realfavicongenerator.net/
2. **Upload your logo:** `public/logo.svg`
3. **Configure:**
   - iOS: Use your logo
   - Android: Use your logo
   - Windows: Use your logo with red background (#dc2626)
   - macOS Safari: Use your logo
4. **Click "Generate your Favicons and HTML code"**
5. **Download the package**
6. **Extract all files to:** `temp-app/public/`
7. **Replace the favicon links in** `src/app/layout.tsx` with the generated code

---

## Option 2: Manual Creation (If you have image editor)

### Files Needed:

Create these files from your `logo.svg`:

1. **favicon.ico** (16x16, 32x32, 48x48 combined)
2. **favicon-16x16.png** (16x16 pixels)
3. **favicon-32x32.png** (32x32 pixels)
4. **apple-touch-icon.png** (180x180 pixels)
5. **android-chrome-192x192.png** (192x192 pixels)
6. **android-chrome-512x512.png** (512x512 pixels)

### Tools You Can Use:

- **Photoshop/GIMP:** Open logo.svg, resize, export
- **Inkscape:** Open logo.svg, export to different sizes
- **Online:** https://favicon.io/favicon-converter/

---

## Option 3: Quick Temporary Fix (Use SVG directly)

I'll update your layout to use the logo.svg directly as favicon for now.

---

## 🎯 Current Issue:

Your site is using Vercel's default favicon because the favicon files referenced in `layout.tsx` don't exist:
- `/favicon.ico` ❌
- `/favicon-32x32.png` ❌
- `/favicon-16x16.png` ❌
- `/apple-touch-icon.png` ❌

---

## ✅ What You Have:

- ✅ `public/logo.svg` - Your Sui Generis logo

---

## 🚀 I'll implement Option 3 now (temporary fix)

This will use your SVG logo as the favicon until you generate proper favicon files.
