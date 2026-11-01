"""Cuts a contact sheet (a grid of cells) into the kids' lesson photos.

It finds the 12 objects on the white background and centers each one on a white 4:3 picture, so a hoof or a paw that
reaches into the next cell is not cut off. If it cannot find exactly 12 objects it falls back to cutting an even grid.

Usage:  python3 scripts/split-photo-sheet.py <sheet-image> animals|fruits|family|seasons|body

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
    "body": ["matha", "chul", "chokh", "nak", "kan", "_ear-right", "mukh", "gola", "hat", "pet", "hantu", "pa"],  # no shoulders cell: kandh keeps the figure until a photo is added
    "seasons": ["summer", "monsoon", "autumn", "late-autumn", "winter", "spring"],
    "family": ["mother", "father", "grandmother", "grandfather", "elder-brother", "elder-sister", "brother", "sister", "baby", "uncle", "aunt", "family"],
    "fruits": ["mango", "banana", "apple", "orange", "jackfruit", "lychee", "guava", "papaya", "watermelon", "coconut", "grapes", "pineapple"],
}
W, H = 800, 600
# columns x rows of each sheet. "scenes" are landscape photos that fill their cell, so they are cut as an even grid.
LAYOUT = {"animals": (4, 3), "fruits": (4, 3), "family": (4, 3), "seasons": (3, 2), "body": (4, 3)}
SCENES = {"seasons", "family", "body"}

def find_objects(sheet: Image.Image, count: int = 12, cols: int = 4):
    """Bounding boxes of the 12 objects, ordered row by row then left to right, or None."""
    a = np.asarray(sheet).astype(int)
    scale = sheet.width / 1680
    for thr in (232, 215):
        for it in (6, 4, 3, 8, 10, 2):
            mask = ndimage.binary_dilation(a.min(axis=2) < thr, iterations=max(1, round(it * scale)))
            lab, n = ndimage.label(mask)
            if n < count:
                continue
            sizes = ndimage.sum(mask, lab, range(1, n + 1))
            big = [i + 1 for i, z in enumerate(sizes) if z > 8000 * scale * scale]
            if len(big) != count:
                continue
            boxes = []
            for k in big:
                ys, xs = np.where(lab == k)
                boxes.append((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))
            boxes.sort(key=lambda b: (b[1] + b[3]) / 2)
            rows = [sorted(boxes[r * cols:(r + 1) * cols], key=lambda b: (b[0] + b[2]) / 2) for r in range(count // cols)]
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
    COLS, ROWS = LAYOUT[topic]
    boxes = None if topic in SCENES else find_objects(sheet, COLS * ROWS, COLS)
    print(f"found {COLS * ROWS} objects" if boxes else "cutting an even grid")
    cw, ch = sheet.width / COLS, sheet.height / ROWS
    for i, name in enumerate(ORDER[topic]):
        if name.startswith("_"):  # a cell we do not use
            continue
        r, c = divmod(i, COLS)
        if boxes:
            x0, y0, x1, y1 = boxes[i]
            place(sheet.crop((x0, y0, x1, y1))).save(out / f"{topic}-{name}.webp", "WEBP", quality=88)
            print("saved", f"{topic}-{name}.webp")
            continue
        m = 0.008 if topic in SCENES else 0  # trim the sheet's grid lines off scene photos
        cell = sheet.crop((round((c + m) * cw), round((r + m) * ch), round((c + 1 - m) * cw), round((r + 1 - m) * ch)))
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
