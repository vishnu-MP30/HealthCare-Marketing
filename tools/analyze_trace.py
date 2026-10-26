import xml.etree.ElementTree as ET
import os

svg_path = "tools/reference/figure_raw_trace.svg"
size = os.path.getsize(svg_path)
print(f"File size: {size / 1024:.1f} KB")

tree = ET.parse(svg_path)
root = tree.getroot()

# Find all path elements
paths = root.findall(".//{http://www.w3.org/2000/svg}path")
if not paths:
    paths = root.findall(".//path")

print(f"Total path elements: {len(paths)}")

# Check distinct fill colors
fills = {}
for p in paths:
    fill = p.attrib.get("fill", "none")
    fills[fill] = fills.get(fill, 0) + 1

print("Colors in trace:")
for c, count in sorted(fills.items(), key=lambda x: -x[1]):
    print(f"  {c}: {count} paths")
