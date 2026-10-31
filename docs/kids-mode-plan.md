# Kids: recommended approach (replaces the "kid mode" idea below)

**Decision: do not build a separate kid interface or a kid mode.** Keep one app. Add pictures everywhere they help, add one "Kids" section to the sidebar, and tag existing lessons that suit children. This gets about 90 percent of the value for a fraction of the work, and nothing is duplicated.

## Why
- A second curriculum means every word, lesson and audio file exists twice, and every fix is made twice.
- Most of what makes content "for kids" is pictures, games and stars, not a different layout. Those help adults too: a picture of a body part or a color teaches a grown-up learner just as well.
- Young children are guided by a parent or by you in the lesson, so they do not need a locked-down interface of their own.
- Grammar, reading, writing and the path system already work. Kids do not need a grammar section at all, so it is simply not part of the kid path.

## What we build instead
1. **Pictures in the main vocabulary.** Add a picture to words that can be pictured (colors, body, animals, food, family, home, clothes, nature, numbers, days). A "Pictures" switch beside Romanized and English turns them on or off. Adult learners get them too. New topics fill the gaps adults and kids both need: full colors, days and months, fruits and vegetables, shapes, opposites, seasons.
2. **One new sidebar item: "Kids" (ছোটদের).** It holds only things that exist for children: the picture games (tap what you hear, body figure, color hunt, count with me), rhymes, picture-book fables, little sentences, and the star chart. Nothing else in the app changes.
3. **A "Kids" tag on existing lessons** that work for children: the alphabet, numbers, the listening activities, vocabulary topics with pictures. The tag shows in the course lists and on the My path steps, in the same style as the New tag.
4. **A "My child" goal in My path.** A parent or teacher picks it and gets a kid-ordered path through the existing and new lessons (Hello, Colors, Numbers, Body, Family, Animals, Days, then letters). Grammar and devotional content are simply not in it. The path and goal system already supports this, so no new machinery is needed.
5. **Stars and a parent view**, last: a star per finished game, a sticker every 5 stars, and a weekly summary of what the child practiced.

## Build order
1. Picture support in vocabulary (data field, the Pictures switch, the picture word row) and the first picture topics: Colors, Body, Numbers, Family, Animals.
2. The "Kids" sidebar item with the picture card pages and the "Tap what you hear" game.
3. The "My child" goal and the Kids tag.
4. Days, months, seasons, food, home, clothes, nature, shapes, opposites.
5. Body figure, color hunt, count with me.
6. Stars, stickers, parent view.
7. Rhymes, picture-book fables, little sentences.

## What is already built that this reuses
The picture cards, the Twemoji pictures and credit, the six starter topics and the check script from the earlier work stay. The sidebar restyle and the separate kid-mode switch are removed in step 2, because there is no kid mode any more.

---

# Earlier idea (kept for reference): kid mode as a content swap

## What kid mode is
One switch ("Kid mode"). The app looks the same: the same sidebar, the same page layouts, the same course pages, lesson pages, progress and sign-in. Nothing about the shell is restyled.

What changes is the **content**. With kid mode on, the same sidebar sections (Reading, Speaking, Listening, Vocabulary, Grammar, Writing, My path, Progress) open **kid content** instead of the adult curriculum, and everything is picture-first. With kid mode off, nothing changes for anyone.

The earlier restyle of the sidebar and the separate `/learn/kids` area are dropped. The sidebar hide button, the outline hide button and the switch itself stay.

## How it works in the code
- The curriculum already has Courses, Modules and Lessons (`src/data/curriculum.ts`). Kid mode gets its **own set of the same shape** (`src/data/kids-curriculum.ts`): the same course ids (reading, speaking, listening, vocabulary, grammar, writing), with different modules and lessons inside.
- The existing pages (`/learn/vocabulary`, `/learn/reading`, and so on) read a flag from the `bp_kid` cookie and use the kid set when it is on. The URLs, the lesson frame, the progress bar, the stepper and the complete button are all reused.
- Kid lesson ids are prefixed (`k-vocabulary/colours`) so kid progress is counted separately and never mixes with the adult course.
- **Left out in kid mode:** all devotional modules, role plays for adults, the clinical and Bangladesh goals, the grammar tense system, exams on adult topics, and "My path" goals. My path shows a simple kid path instead (see below).
- **Pictures:** Twemoji SVGs (free for commercial use, credit line in the footer). The body figure is our own SVG drawing. No cartoons from websites, no known characters.
- **Same picture card for everything:** big picture, then English, romanized, Bengali. Tap to hear it, tap again for slow. The existing "English meanings" and "Romanized" switches already hide English or romanization on it.

## Kid content, by section

Each topic is a full set, not six words. Every word has a picture, audio (normal and slow) and appears in the games.

### Vocabulary (the heart of kid mode)
| Group | Topics | Words |
|---|---|---|
| Basics | Hello and goodbye, Please and thank you, Yes and no, Feelings (happy, sad, angry, sleepy, hungry) | about 30 |
| Colors | All the colors: red, blue, yellow, green, orange, pink, purple, brown, black, white, grey, golden | 12 |
| Numbers | 1 to 20, then tens to 100 | 30 |
| Time | Days of the week (7), months, Bengali seasons (the six ritu), morning, noon, evening, night, today, tomorrow, yesterday | about 35 |
| Body | Head, hair, eye, ear, nose, mouth, teeth, tongue, neck, shoulder, arm, hand, finger, tummy, back, leg, knee, foot, toe | about 20 |
| Family | Mother, father, brother, sister, grandparents on both sides, uncle, aunt, cousin, baby, friend, teacher | about 18 |
| Animals | Pets, farm animals, wild animals (tiger, elephant, deer, monkey), birds, sea and insects | about 40 |
| Food | Fruits (mango, banana, jackfruit, lychee and others), vegetables, rice, dal, fish, sweets (roshogolla, sondesh), drinks, meals | about 45 |
| Home | Rooms, bed, chair, door, window, lamp, fan, cup, plate, spoon | about 25 |
| Clothes | Shirt, frock, shoes, cap, bag, and the sari and dhuti for festival days | about 12 |
| Nature and weather | Sun, moon, star, sky, cloud, rain, river, tree, flower, hill, sea; hot, cold | about 25 |
| Shapes | Circle, square, triangle, star, heart | 6 |
| Going places | Bus, car, boat, train, rickshaw, school, market, park | about 15 |
| Action words | Run, jump, eat, drink, sleep, sit, stand, clap, sing, dance, read, write | about 20 |
| Opposites | Big and small, hot and cold, up and down, fast and slow, and more | about 20 |

Roughly 350 picture words in all. These come from the grown-up vocabulary wherever the word already exists; the rest are written new, checked by Pritam, and added to the vocabulary data as a "kids" group so they have audio like every other word.

### Reading
- **Letters with pictures:** each vowel and consonant with a picture word (ক for কলা, the banana). This is the existing alphabet, shown big, one letter at a time, with the existing tracing practice.
- **Numbers and calendar:** the existing numbers pages are good, so they are reused, with pictures added.
- **Picture books:** the existing fables (Thirsty Crow and the others) as one picture and one short sentence per page. Later.

### Speaking
- **Say it aloud:** the card for every topic. Hear it, say it, tap to compare.
- **Sing and say:** short rhymes with pictures and audio (later).
- Role plays for children: at school, with grandma, at the market with mother. A later step.

### Listening
- **Tap what you hear** (the app says a word, pick the picture of three). Works for every topic.
- **Body figure (Simon Says):** our own cartoon child; the app says মাথা and the child taps the head.
- **Color hunt:** the app says লাল! and the child taps the red balloon.
- **Count with me:** tap the mangoes while hearing এক, দুই, তিন; then "how many?"

### Writing
- Tracing the vowels, then consonants, then numbers 1 to 10, using the existing tracing tool at a bigger size. No full words yet.

### Grammar
- Replaced in kid mode by a short **"Little sentences"** section: "This is a ___", "I like ___", "My name is ___", "I have ___". Four or five patterns with pictures. No tenses, no case names.

### My path, progress and stars
- A simple kid path: Hello, Colors, Numbers, Body, Family, Animals, Days, and so on.
- No percentages for the child. Stars on each topic, a sticker after every 5 stars.
- A **parent view** on My progress (what the child practised this week, for lesson recaps). The first step that needs a database table (`kid_stars`).

## Build order (each step usable by a child as soon as it ships)
1. **Switch plumbing.** Kid mode cookie, a kid set of the curriculum, the sidebar sections opening kid content, devotional and adult-only parts hidden. Remove the sidebar restyle and the separate `/learn/kids` area. Ship with three topics (Colors, Body, Numbers) so the whole thing can be seen end to end.
2. **Vocabulary, part 1:** Colors, Numbers 1 to 20, Days and months, Body, Family, Animals. Full word lists with pictures and audio.
3. **Tap what you hear** across all topics.
4. **Vocabulary, part 2:** Food, Home, Clothes, Nature, Shapes, Places, Actions, Opposites.
5. **Body figure, Color hunt, Count with me.**
6. **Reading and Writing for kids:** letters with pictures, tracing.
7. **Stars, stickers and the parent view.**
8. **Rhymes, picture-book fables, little sentences, and kid role plays.**

## Decisions I need from you
1. **Order:** is the build order above right, or do you want a different first topic for the first lesson with a child?
2. **Age:** are these children about 4 to 7? That decides how much romanized text we show (a 4-year-old does not read it) and whether to start the alphabet.
3. **Words I'm unsure of:** I will draft all kid vocabulary, and you check the Bengali before it goes live, as with the clinical words. The Kolkata-versus-Bangladesh forms (for example জল or পানি for water) should follow your usage.
4. **Audio voice:** the current voice is a man's (shubh). For children, would you like the female voice (ishita) for kid content?
