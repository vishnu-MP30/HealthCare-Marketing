import xml.etree.ElementTree as ET

def hex_to_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def brightness(rgb):
    return (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000

tree = ET.parse("tools/reference/figure_raw_trace.svg")
root = tree.getroot()

paths = root.findall(".//{http://www.w3.org/2000/svg}path")
if not paths:
    paths = root.findall(".//path")

jsx_output = []
html_output = []
count = 0

for i, p in enumerate(paths):
    fill = p.attrib.get("fill", "")
    d = p.attrib.get("d", "")
    transform = p.attrib.get("transform", "")
    if not fill or not d:
        continue
    
    rgb = hex_to_rgb(fill)
    b = brightness(rgb)
    
    # 1. Skip background (path 00 or near-white canvas background)
    if b > 240:
        continue
    if len(d) < 40:
        continue

    count += 1

    # 2. Recolor according to user's palette:
    opacity = "1"
    if b < 100:
        new_fill = "#0F6B47"
    elif b < 125:
        new_fill = "#1E8A5E"
    elif b < 165:
        new_fill = "#2E9E6F"
    elif b < 205:
        new_fill = "#6FC59A"
    else:
        new_fill = "#DDF2E5"
        opacity = "0.75"

    # Build JSX
    jsx_parts = [f'd="{d}"', f'fill="{new_fill}"']
    if transform:
        jsx_parts.append(f'transform="{transform}"')
    if opacity != "1":
        jsx_parts.append(f'opacity="{opacity}"')
    jsx_output.append(f'            <path {" ".join(jsx_parts)} />')

    # Build HTML
    html_parts = [f'd="{d}"', f'fill="{new_fill}"']
    if transform:
        html_parts.append(f'transform="{transform}"')
    if opacity != "1":
        html_parts.append(f'opacity="{opacity}"')
    html_output.append(f'        <path {" ".join(html_parts)} />')

print(f"Processed {count} paths with transform attributes preserved!")

with open("tools/reference/figure_jsx_fixed.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(jsx_output))

with open("tools/reference/figure_html_fixed.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(html_output))

# Also update figure_cleaned.svg
out_svg = ET.Element("svg", {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 450 355",
    "width": "450",
    "height": "355"
})
g = ET.SubElement(out_svg, "g", {"id": "figure-traced"})
for p in paths:
    fill = p.attrib.get("fill", "")
    d = p.attrib.get("d", "")
    transform = p.attrib.get("transform", "")
    if not fill or not d:
        continue
    rgb = hex_to_rgb(fill)
    b = brightness(rgb)
    if b > 240 or len(d) < 40:
        continue
    new_el = ET.SubElement(g, "path", {"d": d, "fill": "#0F6B47" if b < 100 else "#1E8A5E" if b < 125 else "#2E9E6F" if b < 165 else "#6FC59A" if b < 205 else "#DDF2E5"})
    if transform:
        new_el.attrib["transform"] = transform
    if b >= 205:
        new_el.attrib["opacity"] = "0.75"

out_tree = ET.ElementTree(out_svg)
out_tree.write("tools/reference/figure_cleaned.svg", encoding="utf-8", xml_declaration=True)
print("Updated figure_cleaned.svg with transform!")
