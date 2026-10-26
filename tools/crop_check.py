import os
from PIL import Image

ref_path = "tools/reference/care-reference.png"
img = Image.open(ref_path)
print(f"Original image size: {img.size}")

# Let's inspect coordinates
# User suggested: about x 0 to 580, y 190 to 700
# Let's check where the sprig is: the sprig is near the mother's arm on the right
# Let's crop x: 0 to 620, y: 180 to 720 to make sure nothing is clipped
crop_box = (0, 180, 620, 720)
crop_img = img.crop(crop_box)
crop_img.save("tools/reference/figure_crop.png")
print(f"Cropped image saved, size: {crop_img.size}")
