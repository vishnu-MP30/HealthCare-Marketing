import os
from PIL import Image

out_dir = r"c:\Users\ACER\Downloads\Marketing_web\public\testimonials"

doc_img = Image.open(r"c:\Users\ACER\Downloads\Marketing_web\public\spec-health.jpg")
# In spec-health.jpg: face of female doctor on the left: size is 1200x800 approx
w, h = doc_img.size
face1 = doc_img.crop((int(w * 0.28), int(h * 0.2), int(w * 0.44), int(h * 0.44)))
face1.resize((96, 96), Image.Resampling.LANCZOS).save(os.path.join(out_dir, "avatar-elena.png"), "PNG")

fam_img = Image.open(r"c:\Users\ACER\Downloads\Marketing_web\public\fam-midlife.jpg")
w, h = fam_img.size
face2 = fam_img.crop((int(w * 0.25), int(h * 0.3), int(w * 0.5), int(h * 0.55)))
face2.resize((96, 96), Image.Resampling.LANCZOS).save(os.path.join(out_dir, "avatar-david.png"), "PNG")

print("Added avatar-elena.png and avatar-david.png")
