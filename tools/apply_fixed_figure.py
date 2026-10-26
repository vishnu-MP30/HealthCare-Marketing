with open("tools/reference/figure_jsx_fixed.txt", "r", encoding="utf-8") as f:
    figure_jsx = f.read()

with open("tools/reference/figure_html_fixed.txt", "r", encoding="utf-8") as f:
    figure_html = f.read()

# Update CalmDrawingSection.tsx
with open("components/CalmDrawingSection.tsx", "r", encoding="utf-8") as f:
    content = f.read()

start_marker = '<g id="figure" className="anim-figure">\n'
end_marker = '\n          </g>\n        </svg>\n      </div>'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    new_content = content[:start_idx + len(start_marker)] + figure_jsx + content[end_idx:]
    with open("components/CalmDrawingSection.tsx", "w", encoding="utf-8") as f:
        f.write(new_content)
    print("Updated components/CalmDrawingSection.tsx with fixed transforms!")
else:
    print(f"Markers not found in CalmDrawingSection.tsx: start={start_idx}, end={end_idx}")

# Update HTML files
for html_path in ["public/calm-drawing/index.html", "calm-drawing/index.html"]:
    with open(html_path, "r", encoding="utf-8") as f:
        html_content = f.read()
    h_start = '<g id="figure" class="anim-figure">\n'
    h_end = '\n        </g>\n      </svg>\n    </div>'
    h_start_idx = html_content.find(h_start)
    h_end_idx = html_content.find(h_end)
    if h_start_idx != -1 and h_end_idx != -1:
        new_html = html_content[:h_start_idx + len(h_start)] + figure_html + html_content[h_end_idx:]
        with open(html_path, "w", encoding="utf-8") as f:
            f.write(new_html)
        print(f"Updated {html_path} with fixed transforms!")
    else:
        print(f"Markers not found in {html_path}: start={h_start_idx}, end={h_end_idx}")
