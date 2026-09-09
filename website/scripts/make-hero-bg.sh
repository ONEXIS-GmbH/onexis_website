#!/usr/bin/env bash
# Leitet die Hero-Hintergrundbilder aus dem Original ab:
#   ./scripts/make-hero-bg.sh ~/Downloads/Background_2_kurve.jpg
#
# Kein Build-Schritt: das Bild ändert sich selten, und die Ableitungen sind
# eingecheckt, damit der Deploy ohne ImageMagick auskommt. Das Original (24 MB)
# gehört NICHT ins Repo.
set -euo pipefail

SRC="${1:?Pfad zum Originalbild angeben}"
cd "$(dirname "$0")/.."
OUT=public/assets

# Das Foto wird im Hero mittlerweile ohne Overlay/Tint gezeigt (plain,
# full-bleed) — die Kompression muss also für sich stehen. method=6 =
# langsamste, beste WebP-Kompression (einmaliger Lauf).
magick "$SRC" -strip -resize 2800x -quality 82 -define webp:method=6 "$OUT/hero-bg-2800.webp"
magick "$SRC" -strip -resize 1800x -quality 84 -define webp:method=6 "$OUT/hero-bg-1800.webp"
magick "$SRC" -strip -resize 1200x -quality 86 -define webp:method=6 "$OUT/hero-bg-1200.webp"

# Fallback für Browser ohne WebP.
magick "$SRC" -strip -resize 1800x -quality 85 -interlace Plane "$OUT/hero-bg-1800.jpg"

ls -lh "$OUT"/hero-bg-*
