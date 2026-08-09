#!/usr/bin/env python3
"""Generate PNG favicon fallbacks from the UniSWAP logo JPG."""
from PIL import Image
import os

src = "/home/z/my-project/upload/UniSWAP_Logo_800x800.jpg"
out_dir = "/home/z/my-project/public"

img = Image.open(src).convert("RGBA")
print(f"Source: {img.size}")

# apple-touch-icon.png (180x180) — for iOS home screen
apple = img.resize((180, 180), Image.LANCZOS)
apple.save(f"{out_dir}/apple-touch-icon.png", "PNG")
print(f"Saved apple-touch-icon.png: {apple.size}")

# favicon-32x32.png — standard browser tab size
f32 = img.resize((32, 32), Image.LANCZOS)
f32.save(f"{out_dir}/favicon-32x32.png", "PNG")
print(f"Saved favicon-32x32.png: {f32.size}")

# favicon-16x16.png — legacy small size
f16 = img.resize((16, 16), Image.LANCZOS)
f16.save(f"{out_dir}/favicon-16x16.png", "PNG")
print(f"Saved favicon-16x16.png: {f16.size}")

print("Done.")
