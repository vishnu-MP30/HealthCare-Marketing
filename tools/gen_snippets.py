import xml.etree.ElementTree as ET

tree = ET.parse("tools/reference/figure_cleaned.svg")
root = tree.getroot()

paths = root.findall(".//{http://www.w3.org/2000/svg}path")
if not paths:
    paths = root.findall(".//path")

jsx_output = []
html_output = []

for i, p in enumerate(paths):
    fill = p.attrib.get("fill", "")
    op = p.attrib.get("opacity", "")
    d = p.attrib.get("d", "")
    
    # JSX
    jsx_attrs = [f'd="{d}"', f'fill="{fill}"']
    if op and op != "1":
        jsx_attrs.append(f'opacity="{op}"')
    jsx_output.append(f'          <path {" ".join(jsx_attrs)} />')

    # HTML
    html_attrs = [f'd="{d}"', f'fill="{fill}"']
    if op and op != "1":
        html_attrs.append(f'opacity="{op}"')
    html_output.append(f'        <path {" ".join(html_attrs)} />')

with open("tools/reference/figure_jsx.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(jsx_output))

with open("tools/reference/figure_html.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(html_output))

print(f"Generated JSX ({len(jsx_output)} paths) and HTML snippets successfully!")
