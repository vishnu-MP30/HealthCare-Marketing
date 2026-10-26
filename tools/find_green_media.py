import os
import glob
from PIL import Image

media_dir = r"C:\Users\ACER\.gemini\antigravity-ide\brain\1c9c6028-6aee-480a-802f-cca682a168c6\.tempmediaStorage"

for f in sorted(glob.glob(os.path.join(media_dir, "*.*")), key=os.path.getmtime, reverse=True):
    # check images modified on 2026-10-23
    mtime = os.path.getmtime(f)
    try:
        im = Image.open(f)
        # Check aspect ratio ~16:9 and large dimensions (e.g. 1920 or >1000)
        w, h = im.size
        # let's sample the top-center color to see if it's green (~ #0F5A3E or #0A3D2B)
        rgb = im.convert('RGB')
        pixel = rgb.getpixel((w // 2, 50))
        # green pixel has g > r and g > b
        r, g, b = pixel
        if g > r + 20 and g > b + 10:
            print(f"GREEN IMAGE: {os.path.basename(f)}, size=({w}, {h}), top_color=({r},{g},{b}), mtime={mtime}")
    except Exception as e:
        pass
