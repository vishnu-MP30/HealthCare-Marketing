import xml.etree.ElementTree as ET
import re

tree = ET.parse("tools/reference/figure_raw_trace.svg")
root = tree.getroot()

paths = root.findall(".//{http://www.w3.org/2000/svg}path")
if not paths:
    paths = root.findall(".//path")

print(f"Total paths: {len(paths)}")

def hex_to_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def brightness(rgb):
    return (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000

for i, p in enumerate(paths):
    fill = p.attrib.get("fill", "")
    d = p.attrib.get("d", "")
    rgb = hex_to_rgb(fill)
    b = brightness(rgb)
    print(f"Path {i:02d}: fill={fill}, brightness={b:.1f}, d_len={len(d)}")
