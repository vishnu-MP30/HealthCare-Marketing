import os
import glob
from PIL import Image

media_dir = r"C:\Users\ACER\.gemini\antigravity-ide\brain\1c9c6028-6aee-480a-802f-cca682a168c6\.tempmediaStorage"

for f in glob.glob(os.path.join(media_dir, "*.*")):
    mtime = os.path.getmtime(f)
    # files created around 15:30 to 15:55 on 23-10-2026
    # 1792750000 approx
    if 1792740000 <= mtime <= 1792753000:
        try:
            im = Image.open(f)
            print(f"{os.path.basename(f)}: size={im.size}, mtime={mtime}")
        except Exception:
            pass
