import os
from PIL import Image

ref1 = Image.open(r"C:\Users\ACER\.gemini\antigravity-ide\brain\1c9c6028-6aee-480a-802f-cca682a168c6\.user_uploaded\media_1792832802760.png")
ref2 = Image.open(r"C:\Users\ACER\.gemini\antigravity-ide\brain\1c9c6028-6aee-480a-802f-cca682a168c6\.user_uploaded\media_1792832802775.png")
out_dir = r"c:\Users\ACER\Downloads\Marketing_web\public\testimonials"
os.makedirs(out_dir, exist_ok=True)

# Crop with a slight margin so the circle is clean
def crop_square(img, box, out_name):
    x1, y1, x2, y2 = box
    w = x2 - x1
    h = y2 - y1
    side = max(w, h)
    cx = (x1 + x2) // 2
    cy = (y1 + y2) // 2
    half = side // 2
    cropped = img.crop((cx - half, cy - half, cx + half, cy + half))
    # resize nicely to 96x96 for crisp retina display
    resized = cropped.resize((96, 96), Image.Resampling.LANCZOS)
    out_path = os.path.join(out_dir, out_name)
    resized.save(out_path, "PNG")
    print(f"Saved {out_path} {resized.size}")

crop_square(ref1, (550, 204, 593, 247), "avatar-malissa.png")
crop_square(ref1, (825, 204, 867, 247), "avatar-karen.png")
crop_square(ref2, (549, 197, 591, 237), "avatar-thomas.png")
crop_square(ref2, (822, 195, 865, 237), "avatar-naomi.png")
