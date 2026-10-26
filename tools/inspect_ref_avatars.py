from PIL import Image

ref1 = Image.open(r"C:\Users\ACER\.gemini\antigravity-ide\brain\1c9c6028-6aee-480a-802f-cca682a168c6\.user_uploaded\media_1792832802760.png")
ref2 = Image.open(r"C:\Users\ACER\.gemini\antigravity-ide\brain\1c9c6028-6aee-480a-802f-cca682a168c6\.user_uploaded\media_1792832802775.png")

print(f"Ref1 size: {ref1.size}")
print(f"Ref2 size: {ref2.size}")
