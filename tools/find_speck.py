import xml.etree.ElementTree as ET

tree = ET.parse("tools/reference/figure_cleaned.svg")
root = tree.getroot()

paths = root.findall(".//{http://www.w3.org/2000/svg}path")
if not paths:
    paths = root.findall(".//path")

for i, p in enumerate(paths):
    fill = p.attrib.get("fill", "")
    op = p.attrib.get("opacity", "1")
    d = p.attrib.get("d", "")
    tr = p.attrib.get("transform", "")
    print(f"Index {i:02d}: fill={fill}, op={op}, tr={tr}, len={len(d)}")
