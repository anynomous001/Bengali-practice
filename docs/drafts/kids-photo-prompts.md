# Fastest way: two contact sheets (2 images instead of 24)

Ask the image generator for ONE image with a 4 x 3 grid, then send it to me here. I cut it into the 12 files with `scripts/split-photo-sheet.py`, so you do not have to save or rename anything.

## Body parts sheet (12 close-ups, 4 columns x 3 rows)
Realistic close-up photographs arranged in a perfect grid of 4 columns and 3 rows, 12 equal cells, no borders, no text, no labels, plain white background. Each cell is a close-up of one part of a smiling child, fully clothed, seen from the front, in soft natural light. Row 1: the face and head, the hair, both eyes, the nose. Row 2: both ears, a smiling mouth, the neck, both shoulders in a t-shirt. Row 3: an open hand, the tummy in a t-shirt, both knees in shorts, a foot in a sneaker. 16:9 landscape image.
If the tool refuses, say "a person" in place of "a smiling child", or generate the twelve one at a time.
Files: `body-<id>.webp` (matha, chul, chokh, nak, kan, mukh, gola, kandh, hat, pet, hantu, pa). Run `python3 scripts/split-photo-sheet.py <sheet> body`. Until the photos exist, the lessons keep the child figure with a glowing ring.

## Seasons sheet (6 photos, 3 columns x 2 rows)
Six realistic landscape photographs arranged in a grid of 3 columns and 2 rows, 6 equal cells, no borders, no text, no labels, no people. The Bengal countryside in each of the six seasons. Row 1: summer, hot and dry with a bright sun and a mango tree full of ripe mangoes; monsoon, heavy rain over green paddy fields under dark clouds; autumn, white kash flowers swaying in a field under a blue sky with white clouds. Row 2: late autumn, golden ripe paddy fields at harvest in soft evening light; winter, a misty morning with fog over a field and date palm trees; spring, a tree covered in red palash flowers against a clear sky. 16:9 landscape image.
Files: `seasons-<id>.webp` (summer, monsoon, autumn, late-autumn, winter, spring). Run `python3 scripts/split-photo-sheet.py <sheet> seasons`.

## Family sheet
Realistic photographs arranged in a perfect grid of 4 columns and 3 rows, 12 equal cells, each cell showing one friendly South Asian (Bengali) person centered on a plain white background with no borders, no text and no labels. Head and shoulders to waist, smiling, looking at the camera, natural light, sharp focus. Row 1: a mother (woman about 35 in a saree), a father (man about 40 in a shirt), a grandmother (elderly woman in a white saree with a red border), a grandfather (elderly man with gray hair and a kurta). Row 2: an elder brother (teenage boy about 16), an elder sister (teenage girl about 16), a younger brother (boy about 7), a younger sister (girl about 6). Row 3: a baby, an uncle (man about 35 with a moustache), an aunt (woman about 32 in a salwar kameez), a family of five standing together (mother, father, grandmother, a boy and a girl). 16:9 landscape image.

## Animals sheet
Realistic photographs arranged in a perfect grid of 4 columns and 3 rows, 12 equal cells, each cell showing one animal centered on a plain white background with no borders, no text and no labels. Row 1: dog, cat, cow, elephant. Row 2: tiger, a small bird, goldfish, monkey. Row 3: horse, owl, green frog, a harmless green snake. Soft natural light, sharp focus, true-to-life colors. 16:9 landscape image.

## Fruits sheet
Realistic photographs arranged in a perfect grid of 4 columns and 3 rows, 12 equal cells, each cell showing one fruit centered on a plain white background with no borders, no text and no labels. Row 1: mango, banana, red apple, orange. Row 2: jackfruit, lychee, guava, papaya. Row 3: watermelon (a slice), coconut, grapes, pineapple. Soft natural light, sharp focus, true-to-life colors. 16:9 landscape image.

If a cell comes out wrong, ask the tool to redo that one animal or fruit on its own and send it with the name.

---

# Real photos for the kids' lessons

Drop a file in `public/kids/photo/` named `<topic>-<id>.webp` (or send it to me and I will add it). The lesson, the quiz and (for animals) the Mystery Wizard game pick it up on their own, with no code change. Until a photo exists, Animals and Fruits show only the words that have one, and Colours show a colour swatch. Numbers use plain dots until a mango photo exists, then they count real mangoes.

Format: 4:3 landscape, about 800 x 600, WebP (PNG or JPG is fine, I convert it). No text, no logos, no people, nothing else in the frame.

## Prompt (change the part in brackets)
Realistic photograph of a single [SUBJECT], centered, plain white background, soft natural light, sharp focus, true-to-life colors, no text, no watermark, no hands, no other objects. 4:3 landscape.

## Animals (`animals-<id>.webp`)
dog, cat, cow, elephant, tiger, bird, fish, monkey, horse, owl, frog, snake
Prompt subject examples: "friendly brown dog sitting", "house cat", "cow standing", "elephant standing side-on", "Bengal tiger", "a small colorful bird on a branch" (a plain background is fine), "orange goldfish", "monkey sitting", "brown horse standing", "owl", "green frog", "a harmless green snake coiled". A dragon cannot be photographed, so the Mystery Wizard now uses an elephant.

## Family (`family-<id>.webp`)
mother, father, grandmother, grandfather, elder-brother, elder-sister, brother, sister, baby, uncle, aunt, family

## Fruits (`fruits-<id>.webp`)
mango, banana, apple, orange, jackfruit, lychee, guava, papaya, watermelon, coconut, grapes, pineapple
(`fruits-mango.webp` is also used to count: the Numbers lesson shows 1 to 10 real mangoes.)

## Colours, optional (`colours-<id>.webp`)
lal red apple, nil blue toy ball, holud yellow banana, sobuj green leaf, shada white cotton ball, kalo black crayon, komola orange fruit, golapi pink flower, beguni purple grapes, badami brown teddy bear, dhushor grey pebble, akashi sky-blue kite.
