#!/usr/bin/env python3
"""Split the team composite image into 3 individual headshots."""
from PIL import Image
import os

src = "/home/z/my-project/upload/pasted_image_1786219436821.png"
out_dir = "/home/z/my-project/public/team"
os.makedirs(out_dir, exist_ok=True)

img = Image.open(src)
w, h = img.size
print(f"Source image: {w}x{h}")

# 3 people side by side — split into 3 equal columns
third = w // 3
members = ["suong-tran", "suneha-shelke", "nikhil-shelke"]

for i, name in enumerate(members):
    left = i * third
    right = (i + 1) * third if i < 2 else w
    crop = img.crop((left, 0, right, h))
    out_path = f"{out_dir}/{name}.png"
    crop.save(out_path, "PNG")
    print(f"Saved {out_path}: {crop.size}")

print("Done.")
