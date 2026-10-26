import os
import glob
from PIL import Image

media_dir = r"C:\Users\ACER\.gemini\antigravity-ide\brain\1c9c6028-6aee-480a-802f-cca682a168c6\.tempmediaStorage"
brain_dir = r"C:\Users\ACER\.gemini\antigravity-ide\brain\1c9c6028-6aee-480a-802f-cca682a168c6"
reads_dir = r"c:\Users\ACER\Downloads\Marketing_web\public\reads"

print("--- Brain Dir Images ---")
for f in glob.glob(os.path.join(brain_dir, "*.jpg")) + glob.glob(os.path.join(brain_dir, "*.png")):
    size = os.path.getsize(f)
    print(f"{os.path.basename(f)}: {size} bytes")

print("\n--- Public Reads Dir ---")
for f in glob.glob(os.path.join(reads_dir, "*.*")):
    size = os.path.getsize(f)
    print(f"{os.path.basename(f)}: {size} bytes")
