import os
import shutil
from PIL import Image

src = r"C:\Users\ACER\.gemini\antigravity-ide\brain\1c9c6028-6aee-480a-802f-cca682a168c6\.user_uploaded\media_1792838232081.png"
dest_dir = r"c:\Users\ACER\Downloads\Marketing_web\public\footer"
os.makedirs(dest_dir, exist_ok=True)
dest = os.path.join(dest_dir, "footer-bg.png")

shutil.copyfile(src, dest)
im = Image.open(dest)
print(f"Copied to {dest}, size={im.size}, mode={im.mode}")
