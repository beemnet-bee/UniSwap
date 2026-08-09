#!/usr/bin/env python3
"""Generate PNG favicon fallbacks with the UniSWAP gradient from the gradient SVG."""
import cairosvg
from PIL import Image
import io
import os

src_svg = "/home/z/my-project/public/uniswap-icon-gradient.svg"
out_dir = "/home/z/my-project/public"

# Render SVG to high-res PNG with transparency
png_data = cairosvg.svg2png(url=src_svg, output_width=512, output_height=512)
img = Image.open(io.BytesIO(png_data)).convert("RGBA")
print(f"Rendered gradient icon: {img.size}")

# apple-touch-icon.png (180x180) — for iOS home screen (no transparency, white bg)
apple = img.resize((180, 180), Image.LANCZOS)
# Composite onto white background for iOS
apple_bg = Image.new("RGBA", apple.size, (255, 255, 255, 255))
apple_bg = Image.alpha_composite(apple_bg, apple)
apple_bg.convert("RGB").save(f"{out_dir}/apple-touch-icon.png", "PNG")
print(f"Saved apple-touch-icon.png: {apple_bg.size}")

# favicon-32x32.png — standard browser tab size (with transparency)
f32 = img.resize((32, 32), Image.LANCZOS)
f32.save(f"{out_dir}/favicon-32x32.png", "PNG")
print(f"Saved favicon-32x32.png: {f32.size}")

# favicon-16x16.png — legacy small size (with transparency)
f16 = img.resize((16, 16), Image.LANCZOS)
f16.save(f"{out_dir}/favicon-16x16.png", "PNG")
print(f"Saved favicon-16x16.png: {f16.size}")

print("Done.")
