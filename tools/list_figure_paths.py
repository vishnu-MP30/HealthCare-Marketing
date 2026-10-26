import xml.etree.ElementTree as ET

tree = ET.parse("tools/reference/figure_cleaned.svg")
root = tree.getroot()

paths = root.findall(".//{http://www.w3.org/2000/svg}path")
if not paths:
    paths = root.findall(".//path")

print(f"Path count: {len(paths)}")

# Let's inspect each path's bounding box and color
for i, p in enumerate(paths):
    fill = p.attrib.get("fill", "")
    op = p.attrib.get("opacity", "1")
    d = p.attrib.get("d", "")
    print(f"P{i:02d} | fill={fill} | op={op} | d_len={len(d)} | start={d[:40]}")
