import os
from PIL import Image

ref1 = Image.open(r"C:\Users\ACER\.gemini\antigravity-ide\brain\1c9c6028-6aee-480a-802f-cca682a168c6\.user_uploaded\media_1792832802760.png")
ref2 = Image.open(r"C:\Users\ACER\.gemini\antigravity-ide\brain\1c9c6028-6aee-480a-802f-cca682a168c6\.user_uploaded\media_1792832802775.png")
out_dir = r"c:\Users\ACER\Downloads\Marketing_web\public\testimonials"

# In ref1 (1024, 359):
# Card 1 is roughly x: 360 to 615, y: 75 to 260
# Avatar 1 (Malissa) is around bottom right of Card 1: x ~ 550, y ~ 205, diameter ~ 45
# Card 2 is roughly x: 635 to 890, y: 75 to 260
# Avatar 2 (Karen) is around bottom right of Card 2: x ~ 825, y ~ 205, diameter ~ 45

# Let's locate precisely by searching for non-white circular area in the lower right of card 1 & card 2
def find_circle_center(img, x_min, x_max, y_min, y_max):
    rgb = img.convert('RGB')
    best_dark = 255
    best_x, best_y = (x_min + x_max) // 2, (y_min + y_max) // 2
    points = []
    for y in range(y_min, y_max):
        for x in range(x_min, x_max):
            r, g, b = rgb.getpixel((x, y))
            # not white or near-white background
            if r < 240 or g < 240 or b < 240:
                points.append((x, y))
    if points:
        xs = [p[0] for p in points]
        ys = [p[1] for p in points]
        return min(xs), max(xs), min(ys), max(ys)
    return x_min, x_max, y_min, y_max

print("Ref1 Card1 avatar bounds:", find_circle_center(ref1, 530, 600, 180, 260))
print("Ref1 Card2 avatar bounds:", find_circle_center(ref1, 800, 875, 180, 260))
print("Ref2 Card1 avatar bounds:", find_circle_center(ref2, 530, 600, 180, 260))
print("Ref2 Card2 avatar bounds:", find_circle_center(ref2, 800, 875, 180, 260))
