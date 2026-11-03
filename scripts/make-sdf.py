import numpy as np
from PIL import Image
from scipy import ndimage as ndi

img = Image.open("public/hero/stethoscope-clean.png").convert("RGBA")
inside = np.asarray(img)[..., 3] > 235            # solid object pixels
dist = ndi.distance_transform_edt(~inside)         # px outside the object, 0 inside
MAXD = 300.0                                       # texture px mapped to 1.0
sdf = ndi.gaussian_filter(np.clip(dist / MAXD, 0, 1), 2.0)
Image.fromarray((sdf * 255).astype(np.uint8)).save("public/hero/stethoscope-sdf.png")
print("size", img.size, "MAXD", MAXD)             # keep these two numbers in the component config
