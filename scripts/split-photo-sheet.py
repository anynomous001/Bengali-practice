"""Cuts a contact sheet (4 columns x 3 rows) into the kids' lesson photos.

It finds the 12 objects on the white background and centers each one on a white 4:3 picture, so a hoof or a paw that
reaches into the next cell is not cut off. If it cannot find exactly 12 objects it falls back to cutting an even grid.

Usage:  python3 scripts/split-photo-sheet.py <sheet-image> animals|fruits|family

Row by row, left to right, the cells must be in the order printed below. Each cell is cropped to 4:3,
resized to 800 x 600 and saved as public/kids/photo/<topic>-<id>.webp.
"""
import sys
from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage

ORDER = {
    "animals": ["dog", "cat", "cow", "elephant", "tiger", "bird", "fish", "monkey", "horse", "owl", "frog", "snake"],
    "family": ["mother", "father", "grandmother", "grandfather", "elder-brother", "elder-sister", "brother", "sister", "baby", "uncle", "aunt", "family"],
    "fruits": ["mango", "banana", "apple", "orange", "jackfruit", "lychee", "guava", "papaya", "watermelon", "coconut", "grapes", "pineapple"],
}
COLS, ROWS, W, H = 4, 3, 800, 600

def find_objects(sheet: Image.Image):
    """Bounding boxes of the 12 objects, ordered row by row then left to right, or None."""
    a = np.asarray(sheet).astype(int)
    scale = sheet.width / 1680
    for thr in (232, 215):
        for it in (6, 4, 3, 8, 10, 2):
            mask = ndimage.binary_dilation(a.min(axis=2) < thr, iterations=max(1, round(it * scale)))
            lab, n = ndimage.label(mask)
            if n < 12:
                continue
            sizes = ndimage.sum(mask, lab, range(1, n + 1))
            big = [i + 1 for i, z in enumerate(sizes) if z > 8000 * scale * scale]
            if len(big) != 12:
                continue
            boxes = []
            for k in big:
                ys, xs = np.where(lab == k)
                boxes.append((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))
            boxes.sort(key=lambda b: (b[1] + b[3]) / 2)
            rows = [sorted(boxes[r * 4:(r + 1) * 4], key=lambda b: (b[0] + b[2]) / 2) for r in range(3)]
            return [b for row in rows for b in row]
    return None

def place(img: Image.Image) -> Image.Image:
    """Center the object on a white 4:3 canvas with some air around it."""
    canvas = Image.new("RGB", (W, H), "white")
    box_w, box_h = W * 0.86, H * 0.86
    k = min(box_w / img.width, box_h / img.height)
    img = img.resize((max(1, round(img.width * k)), max(1, round(img.height * k))), Image.LANCZOS)
    canvas.paste(img, ((W - img.width) // 2, (H - img.height) // 2))
    return canvas

def main() -> None:
    if len(sys.argv) != 3 or sys.argv[2] not in ORDER:
        sys.exit(__doc__)
    sheet = Image.open(sys.argv[1]).convert("RGB")
    topic = sys.argv[2]
    out = Path(__file__).resolve().parent.parent / "public" / "kids" / "photo"
    out.mkdir(parents=True, exist_ok=True)
    boxes = find_objects(sheet)
    print("found 12 objects" if boxes else "could not find 12 objects, cutting an even grid")
    cw, ch = sheet.width / COLS, sheet.height / ROWS
    for i, name in enumerate(ORDER[topic]):
        r, c = divmod(i, COLS)
        if boxes:
            x0, y0, x1, y1 = boxes[i]
            place(sheet.crop((x0, y0, x1, y1))).save(out / f"{topic}-{name}.webp", "WEBP", quality=88)
            print("saved", f"{topic}-{name}.webp")
            continue
        cell = sheet.crop((round(c * cw), round(r * ch), round((c + 1) * cw), round((r + 1) * ch)))
        # crop to 4:3 around the centre
        want = 4 / 3
        if cell.width / cell.height > want:
            nw = round(cell.height * want); x = (cell.width - nw) // 2; cell = cell.crop((x, 0, x + nw, cell.height))
        else:
            nh = round(cell.width / want); y = (cell.height - nh) // 2; cell = cell.crop((0, y, cell.width, y + nh))
        cell.resize((W, H), Image.LANCZOS).save(out / f"{topic}-{name}.webp", "WEBP", quality=88)
        print("saved", f"{topic}-{name}.webp")

if __name__ == "__main__":
    main()
