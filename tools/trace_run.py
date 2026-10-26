import vtracer
from PIL import Image

# 1. Let's crop exactly the figure area:
# In care-reference.png (1024x576):
# The figure occupies x: 0 to 440, y: 100 to 450
img = Image.open("tools/reference/care-reference.png")
# Let's crop with a bit of margin:
crop_box = (0, 95, 450, 450)
fig_img = img.crop(crop_box)
fig_img.save("tools/reference/figure_for_trace.png")

# 2. Run vtracer with the exact parameters given by the user:
vtracer.convert_image_to_svg_py(
    "tools/reference/figure_for_trace.png",
    "tools/reference/figure_raw_trace.svg",
    colormode="color",
    hierarchical="stacked",
    mode="spline",
    filter_speckle=6,
    color_precision=5,
    layer_difference=24,
    corner_threshold=60,
    length_threshold=4,
    splice_threshold=45,
    path_precision=2
)

print("vtracer trace complete!")
