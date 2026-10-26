from PIL import Image
import numpy as np

img = Image.open("tools/reference/care-reference.png").convert("RGB")
arr = np.array(img)
h, w, _ = arr.shape
print(f"Image shape: {h}x{w}")

# Top-left region: x from 0 to 500, y from 0 to 500
# Find pixels where green is dominant and not white (e.g. brightness < 250)
gray = np.mean(arr, axis=2)
mask = (gray < 245)

# Bounding box of the figure in left region (x < 500, y < 450)
ys, xs = np.where(mask[:, :500])
print(f"Figure bounds in left region: x from {xs.min()} to {xs.max()}, y from {ys.min()} to {ys.max()}")

# Let's crop from y: max(0, ys.min() - 10) to ys.max() + 20, x: 0 to xs.max() + 20
ymin = max(0, int(ys.min()) - 10)
ymax = min(h, int(ys.max()) + 20)
xmin = 0
xmax = min(w, int(xs.max()) + 40)

print(f"Optimal crop box: ({xmin}, {ymin}, {xmax}, {ymax})")
crop = img.crop((xmin, ymin, xmax, ymax))
crop.save("tools/reference/figure_exact_crop.png")
print("Saved figure_exact_crop.png")
