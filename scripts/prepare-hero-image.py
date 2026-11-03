import os
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

def main():
    os.makedirs("public/hero", exist_ok=True)
    os.makedirs("scratch", exist_ok=True)

    # 1. Load raw and rembg images
    raw_img = Image.open("public/hero/raw-stethoscope.png").convert("RGBA")
    raw_arr = np.array(raw_img, dtype=np.float32)
    H, W = raw_arr.shape[:2]

    rembg_img = Image.open("scratch/rembg_test.png").convert("RGBA")
    rembg_arr = np.array(rembg_img, dtype=np.float32)
    hardware_alpha = rembg_arr[..., 3] / 255.0

    # 2. Perfect Cross SDF definition
    # In raw image coordinates:
    # patch starts at y=215, x=435, and in patch center is at (72.5, 70.0)
    # Therefore, in raw coordinates: cx = 435 + 72.5 = 507.5, cy = 215 + 70.0 = 285.0
    cx = 507.5
    cy = 285.0

    Y, X = np.ogrid[:H, :W]

    def sd_box(px, py, b, r):
        dx = np.abs(px) - (b[0] - r)
        dy = np.abs(py) - (b[1] - r)
        mc = np.sqrt(np.maximum(dx, 0.0)**2 + np.maximum(dy, 0.0)**2) - r
        return mc + np.minimum(np.maximum(dx, dy), 0.0)

    d_v = sd_box(X - cx, Y - cy, (26.5, 65.5), 11.0)
    d_h = sd_box(X - cx, Y - cy, (65.5, 26.5), 11.0)
    d_cross = np.minimum(d_v, d_h)

    # 3. Cross Alpha: Crisp core + Organic 38px radial glow
    # Core has 1px smooth antialiasing
    core_alpha = np.clip(0.5 - d_cross, 0.0, 1.0)

    # Glow extends out to 38px
    MAX_GLOW = 38.0
    t_glow = np.clip(d_cross / MAX_GLOW, 0.0, 1.0)
    glow_curve = (1.0 - t_glow) ** 1.8
    glow_alpha = np.where(d_cross > 0, glow_curve * 0.72, 0.0)

    cross_alpha = np.maximum(core_alpha, glow_alpha)

    # 4. Seamlessly Combine Hardware and Cross
    combined_alpha = np.maximum(hardware_alpha, cross_alpha)
    combined_alpha = np.clip(combined_alpha, 0.0, 1.0)

    # 5. Build Final Output RGB
    out_arr = np.zeros_like(raw_arr)

    # Base RGB from rembg (hardware)
    for c in range(3):
        out_arr[..., c] = rembg_arr[..., c]

    # For cross core: take the authentic luminous 3D cross from raw_arr
    is_core = (core_alpha > 0.1)
    for c in range(3):
        out_arr[is_core, c] = raw_arr[is_core, c]

    # For pure glow: bright vibrant emerald/mint glow (RGB: 120, 245, 140)
    is_pure_glow = (d_cross > 0) & (d_cross <= MAX_GLOW) & (~is_core)
    glow_rgb = [120.0, 245.0, 140.0]
    for c in range(3):
        out_arr[is_pure_glow, c] = np.where(
            hardware_alpha[is_pure_glow] > 0.1,
            rembg_arr[is_pure_glow, c],
            glow_rgb[c]
        )

    out_arr[..., 3] = combined_alpha * 255.0
    # Clean zeros
    out_arr[combined_alpha < 0.005, :3] = 0.0

    # 6. Crop to bounding box plus 24px padding
    solid_y, solid_x = np.where(combined_alpha > 0.02)
    pad = 24
    y0 = max(0, int(solid_y.min()) - pad)
    y1 = min(H, int(solid_y.max()) + pad + 1)
    x0 = max(0, int(solid_x.min()) - pad)
    x1 = min(W, int(solid_x.max()) + pad + 1)

    cropped_arr = out_arr[y0:y1, x0:x1]
    cropped_img = Image.fromarray(cropped_arr.astype(np.uint8))

    crop_w = x1 - x0
    crop_h = y1 - y0
    print(f"Original size: {W}x{H}, Cropped bounding box: {crop_w}x{crop_h}")

    # Cross center in cropped image
    rel_cx = (cx - x0) / crop_w
    rel_cy = (cy - y0) / crop_h
    print(f"Cross position in cropped image: x={rel_cx:.4f}, y={rel_cy:.4f}")

    # Export clean master PNG and WebP
    cropped_img.save("public/hero/stethoscope-clean.png", "PNG")
    cropped_img.save("public/hero/stethoscope-clean.webp", "WEBP", quality=95)

    aspect = crop_h / crop_w
    img_900 = cropped_img.resize((900, int(900 * aspect)), Image.Resampling.LANCZOS)
    img_900.save("public/hero/stethoscope-clean-900.webp", "WEBP", quality=92)

    img_1600 = cropped_img.resize((1600, int(1600 * aspect)), Image.Resampling.LANCZOS)
    img_1600.save("public/hero/stethoscope-clean-1600.webp", "WEBP", quality=95)

    # 7. Verify composites on #D7EBDC, #F4FAF5, and #FFFFFF
    def composite_on_color(fg_img, hex_color):
        h = hex_color.lstrip('#')
        rgb = tuple(int(h[i:i+2], 16) for i in (0, 2, 4))
        bg = Image.new("RGBA", fg_img.size, rgb + (255,))
        bg.paste(fg_img, (0, 0), fg_img)
        return bg

    composite_on_color(cropped_img, "#D7EBDC").save("scratch/comp_mint.png")
    composite_on_color(cropped_img, "#F4FAF5").save("scratch/comp_light.png")
    composite_on_color(cropped_img, "#FFFFFF").save("scratch/comp_white.png")

    print("Composites saved to scratch/comp_mint.png, scratch/comp_light.png, scratch/comp_white.png")

if __name__ == "__main__":
    main()
