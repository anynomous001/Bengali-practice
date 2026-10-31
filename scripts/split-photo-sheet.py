"""Cuts a contact sheet (4 columns x 3 rows) into the kids' lesson photos.

Usage:  python3 scripts/split-photo-sheet.py <sheet-image> animals|fruits

Row by row, left to right, the cells must be in the order printed below. Each cell is cropped to 4:3,
resized to 800 x 600 and saved as public/kids/photo/<topic>-<id>.webp.
"""
import sys
from pathlib import Path
from PIL import Image

ORDER = {
    "animals": ["dog", "cat", "cow", "elephant", "tiger", "bird", "fish", "monkey", "horse", "owl", "frog", "snake"],
    "fruits": ["mango", "banana", "apple", "orange", "jackfruit", "lychee", "guava", "papaya", "watermelon", "coconut", "grapes", "pineapple"],
}
COLS, ROWS, W, H = 4, 3, 800, 600

def main() -> None:
    if len(sys.argv) != 3 or sys.argv[2] not in ORDER:
        sys.exit(__doc__)
    sheet = Image.open(sys.argv[1]).convert("RGB")
    topic = sys.argv[2]
    out = Path(__file__).resolve().parent.parent / "public" / "kids" / "photo"
    out.mkdir(parents=True, exist_ok=True)
    cw, ch = sheet.width / COLS, sheet.height / ROWS
    for i, name in enumerate(ORDER[topic]):
        r, c = divmod(i, COLS)
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
