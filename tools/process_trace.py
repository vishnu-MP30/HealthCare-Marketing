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

cleaned_paths = []

for i, p in enumerate(paths):
    fill = p.attrib.get("fill", "")
    d = p.attrib.get("d", "")
    if not fill or not d:
        continue
    
    rgb = hex_to_rgb(fill)
    b = brightness(rgb)
    
    # 1. Skip background (near white / very light background shapes)
    if b > 240:
        continue
    
    # Skip tiny specks (d length < 40)
    if len(d) < 40:
        continue

    # 2. Recolor according to user's palette:
    # darkest outline/hair -> #0F6B47
    # main strokes/head -> #1E8A5E
    # leaves -> #2E9E6F and #6FC59A
    # soft body fill -> #DDF2E5 at 70% opacity
    
    opacity = "1"
    if b < 100:
        # Darkest outline / hair
        new_fill = "#0F6B47"
    elif b < 125:
        # Main strokes / head
        new_fill = "#1E8A5E"
    elif b < 165:
        # Leaves / wave transitions
        new_fill = "#2E9E6F"
    elif b < 205:
        # Light leaves / highlights
        new_fill = "#6FC59A"
    else:
        # Soft body fill: #DDF2E5 at 70% opacity
        new_fill = "#DDF2E5"
        opacity = "0.75"

    p.attrib["fill"] = new_fill
    if opacity != "1":
        p.attrib["opacity"] = opacity
    else:
        p.attrib.pop("opacity", None)
        
    cleaned_paths.append(p)

print(f"Cleaned paths count: {len(cleaned_paths)}")

# Build output SVG
out_svg = ET.Element("svg", {
    "xmlns": "http://www.w3.org/2000/svg",
    "viewBox": "0 0 450 355",
    "width": "450",
    "height": "355"
})

g = ET.SubElement(out_svg, "g", {"id": "figure-traced"})
for p in cleaned_paths:
    g.append(p)

out_tree = ET.ElementTree(out_svg)
out_tree.write("tools/reference/figure_cleaned.svg", encoding="utf-8", xml_declaration=True)
print("Saved tools/reference/figure_cleaned.svg")
