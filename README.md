# Bengali Alphabet Practice

A small, dependency-free web app for learning the Bengali alphabet.

- **Learn** – tap any vowel, consonant or special sign to see its sound, an example word, and hear it (browser speech synthesis; needs a `bn-BD` voice installed).
- **Quiz** – letter → word, word → first letter, and listening quizzes, scoped to all letters, a group, or your weak letters.
- **Progress** – tracked in `localStorage`; a letter counts as mastered after 3+ correct answers with more right than wrong.

## Run

Open `index.html` in a browser, or serve the folder: `python3 -m http.server`.
