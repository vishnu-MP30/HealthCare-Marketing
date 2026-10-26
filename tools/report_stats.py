import os

with open("tools/reference/figure_jsx_refined.txt", "r", encoding="utf-8") as f:
    lines = [l for l in f.readlines() if l.strip()]

print(f"Final figure path count: {len(lines)} paths")
print(f"figure_jsx_refined size: {os.path.getsize('tools/reference/figure_jsx_refined.txt') / 1024:.2f} KB")
print(f"CalmDrawingSection.tsx size: {os.path.getsize('components/CalmDrawingSection.tsx') / 1024:.2f} KB")
print(f"public/calm-drawing/index.html size: {os.path.getsize('public/calm-drawing/index.html') / 1024:.2f} KB")
