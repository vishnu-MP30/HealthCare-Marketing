import xml.etree.ElementTree as ET

tree = ET.parse("tools/reference/figure_raw_trace.svg")
root = tree.getroot()
print(f"Tag: {root.tag}, attrib: {root.attrib}")
