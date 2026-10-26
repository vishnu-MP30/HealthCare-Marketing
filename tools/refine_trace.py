import xml.etree.ElementTree as ET
import re

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
    
    # 1. Skip background
    if b > 240 or len(d) < 40:
        continue
        
    # Filter out corner specks at bottom right (x > 370 and y > 310 in transform)
    if transform:
        m = re.search(r'translate\(([\d\.]+),\s*([\d\.]+)\)', transform)
        if m:
            tx = float(m.group(1))
            ty = float(m.group(2))
            if tx > 370 and ty > 310:
                print(f"Skipping edge speck at ({tx}, {ty})")
                continue

    count += 1

    # 2. Recolor
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

    jsx_parts = [f'd="{d}"', f'fill="{new_fill}"']
    if transform:
        jsx_parts.append(f'transform="{transform}"')
    if opacity != "1":
        jsx_parts.append(f'opacity="{opacity}"')
    jsx_output.append(f'            <path {" ".join(jsx_parts)} />')

    html_parts = [f'd="{d}"', f'fill="{new_fill}"']
    if transform:
        html_parts.append(f'transform="{transform}"')
    if opacity != "1":
        html_parts.append(f'opacity="{opacity}"')
    html_output.append(f'        <path {" ".join(html_parts)} />')

print(f"Total refined paths: {count}")

with open("tools/reference/figure_jsx_refined.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(jsx_output))

with open("tools/reference/figure_html_refined.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(html_output))
