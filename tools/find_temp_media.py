import os
import glob
from PIL import Image

media_dir = r"C:\Users\ACER\.gemini\antigravity-ide\brain\1c9c6028-6aee-480a-802f-cca682a168c6\.tempmediaStorage"

for f in sorted(glob.glob(os.path.join(media_dir, "*.*")), key=os.path.getmtime, reverse=True)[:30]:
    try:
        im = Image.open(f)
        print(f"{os.path.basename(f)}: size={im.size}, mtime={os.path.getmtime(f)}")
    except Exception as e:
        pass
