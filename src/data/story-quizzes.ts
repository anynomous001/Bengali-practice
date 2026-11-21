// Quiz questions for every story. These replace the quiz written inside each story file (stories.ts, stories-reader.ts,
// devotional-stories.ts). They ask about details, order and reasons that only someone who read the story would know,
// and the wrong options come from the story itself, so they cannot be guessed by common sense.
// Written for this app: the teacher may review the questions.
import type { StoryQuestion } from "./stories";

// The right answer is written second in most lists below, so each list is shuffled once, the same way every time
// (seeded by the question), so the right answer does not always sit in the same place.
function seeded(text: string) {
  let h = 2166136261;
  for (const c of text) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return () => { h = Math.imul(h ^ (h >>> 15), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; };
}
const q = (question: string, options: string[], answer: number): StoryQuestion => {
  const rand = seeded(question);
  const order = options.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
  return { q: question, options: order.map((i) => options[i]), answer: order.indexOf(answer) };
};

export const STORY_QUIZZES: Record<string, StoryQuestion[]> = {
  "thirsty-crow": [
    q("What was the crow doing before he found the pot?", ["Resting in a tree", "Wandering around looking for water", "Chasing other birds", "Flying home"], 1),
    q("What was wrong with the water in the pot?", ["It was dirty", "There was only a little, and it was far down", "The pot was nearly full but sealed", "It was too hot to drink"], 1),
    q("What did the crow do right after he found his beak could not touch the water?", ["He tried to tip the pot over", "He thought for a moment", "He called for help", "He flew to a river"], 1),
    q("How did the crow put the stones into the pot?", ["All at once, in a pile", "One by one", "He pushed in one big stone", "He asked other crows to drop them"], 1),
    q("Which order is right?", ["Found the pot, dropped stones, tried to drink, thought", "Found the pot, tried to drink, thought, dropped stones", "Thought, found the pot, dropped stones, tried to drink", "Tried to drink, found the pot, dropped stones, thought"], 1),
    q("Why were stones a good idea for the crow?", ["Stones make water cool", "Many small stones were lying nearby", "A farmer had left them there", "The pot was made of stone"], 1),
  ],
  "fox-grapes": [
    q("Where did the fox go to look for food?", ["Into a village", "Into a garden", "To the riverbank", "Into a farmer's barn"], 1),
    q("How were the grapes described?", ["Green and small", "Ripe and juicy", "Dry and old", "Fenced off"], 1),
    q("What did the fox do after the first jump failed?", ["He gave up at once", "He jumped again", "He looked for a stick", "He asked another animal"], 1),
    q("What made the fox tired?", ["A long walk through the forest", "Trying many times", "The hot sun", "Running from a dog"], 1),
    q("What did the fox say about the grapes as he left?", ["They were too high, but he would come back", "They must be sour, and he would not eat them", "They were rotten and the garden was unsafe", "They were sweet, but not for him"], 1),
    q("Why did the fox call the grapes sour?", ["He had tasted one", "He could not reach them and wanted to feel better", "A bird told him", "They were not ripe"], 1),
  ],
  "hare-tortoise": [
    q("What did the hare used to do to the tortoise?", ["Race him every day", "Laugh at him", "Carry him across the forest", "Ignore him"], 1),
    q("Who suggested the race?", ["The hare", "The tortoise", "A passing fox", "Both of them together"], 1),
    q("How did the hare answer?", ["He refused", "He laughed and said, \"Okay!\"", "He asked for a prize", "He got angry"], 1),
    q("When did the hare decide to sleep?", ["After he went very far ahead in one run", "When it began to rain", "Halfway, when he was hungry", "When the tortoise fell behind and cried"], 0),
    q("What was the tortoise doing while the hare slept?", ["Sleeping too", "Going home", "Moving forward without stopping", "Taking a shortcut"], 2),
    q("What did the hare find when he woke up?", ["The tortoise asleep beside him", "The tortoise was still far behind", "The tortoise had already won", "The race had been cancelled"], 2),
  ],
  "ant-grasshopper": [
    q("Where did the grasshopper sing and dance?", ["On a tree", "In the field", "By the river", "In the ants' home"], 1),
    q("What did the ants do with the food they collected?", ["Ate it straight away", "Stored it at home", "Shared it with the grasshopper", "Sold it"], 1),
    q("What did the grasshopper say to the ants?", ["\"Teach me how to store food\"", "\"Why so much work? Come, let's sing!\"", "\"Winter is coming\"", "\"Please give me food\""], 1),
    q("What did the ants warn him about?", ["Winter was coming, and then there would be no food to find", "A storm was coming", "Hunters were in the field", "The field would soon be burnt"], 0),
    q("How did the grasshopper feel in winter?", ["Only hungry", "Very hungry and very cold", "Sick and tired", "Happy and warm"], 1),
    q("How did the ants answer when he asked for food?", ["They refused and sent him away", "They reminded him he had been singing, but gave him a little food", "They gave him all their food", "They said they had none left"], 1),
  ],
  "lion-mouse": [
    q("What was the lion doing when the mouse ran over him?", ["Hunting", "Sleeping under a tree", "Drinking at the river", "Roaring at other animals"], 1),
    q("What did the lion do when he woke up?", ["Laughed at once", "Got very angry and caught the mouse", "Ran away", "Went back to sleep"], 1),
    q("What did the mouse promise while begging for mercy?", ["To bring the lion food", "To help the lion one day", "To leave the forest", "To never come back"], 1),
    q("How did the lion react to that promise?", ["He believed it", "He burst out laughing, because the mouse was so small", "He got angrier", "He ate the mouse"], 1),
    q("What brought the mouse running to the lion?", ["He saw the hunter", "He heard the lion's loud roar", "The lion called his name", "A bird told him"], 1),
    q("What did the mouse use to free the lion?", ["A knife", "His teeth", "His tail", "A stick"], 1),
  ],
  "monkey-crocodile": [
    q("How did the monkey and the crocodile become friends?", ["They raced each other", "The monkey gave the crocodile many jamuns", "The crocodile saved the monkey", "They met at the crocodile's house"], 1),
    q("What did the crocodile take home for his wife?", ["Some fish", "Some jamuns", "The monkey", "Some mangoes"], 1),
    q("How did the crocodile feel about his wife's wish?", ["Glad", "Very sad, but he listened to her", "Angry, and he refused", "He did not care"], 1),
    q("How did the crocodile get the monkey to come with him?", ["He said the wife wanted to meet him", "He invited him home and offered to carry him on his back", "He tricked him with a new fruit", "He pushed him into the river"], 1),
    q("What excuse did the monkey give in the middle of the river?", ["He felt sick", "He said he had left his heart on the tree", "He said he could not swim", "He said he was afraid of the wife"], 1),
    q("What did the monkey do the moment they reached the bank?", ["Thanked the crocodile", "Leapt up into the tree and laughed", "Gave the crocodile more jamuns", "Went home with the crocodile"], 1),
  ],
  "blue-jackal": [
    q("What made the jackal run into the tub of dye?", ["He wanted a bath", "The dogs of the town chased him", "A hunter chased him", "He slipped while drinking"], 1),
    q("How did the animals first react to the blue jackal?", ["They attacked him", "They were amazed, as they had never seen a blue creature", "They knew at once he was a jackal", "They laughed"], 1),
    q("What did the jackal tell them?", ["That he was lost", "That he was a king sent by God and they must obey him", "That he was a new kind of dog", "That a magician had changed him"], 1),
    q("Why did everyone accept him as king?", ["They liked him", "They were scared", "They were tired of the old king", "He gave them food"], 1),
    q("How did the blue jackal treat the other jackals?", ["He made them his ministers", "He kept them far away", "He shared the forest with them", "He drove them out"], 1),
    q("What gave him away?", ["His colour faded", "Hearing jackals call from far away, he could not hold back and howled", "A dog followed him in", "Another jackal told the animals"], 1),
  ],
  "day-at-the-park": [
    q("What did Emma take with her before she left for the park?", ["A hat and an umbrella", "Her shoes and her jacket", "Her bag and a book", "A ball and a kite"], 1),
    q("What did Emma notice after she sat down under the tree?", ["Ducks in the pond", "The sun shining and the birds singing", "A dog running past", "Dark clouds"], 1),
    q("Which order is right?", ["Pond, tree, swings, home", "Tree, children on swings, pond with ducks, home", "Swings, pond, tree, home", "Pond, swings, tree, home"], 1),
    q("What did the ducks do when Emma threw bread?", ["Flew away", "Quacked and swam over to her", "Ignored it", "Took bread from her hand"], 1),
    q("What made Emma decide it was time to go home?", ["She was tired", "It started to get dark", "It began to rain", "Her mother called her"], 1),
    q("What did the family do after Emma told them about her day?", ["Watched a film", "Sat together and had dinner", "Went for a walk", "Went to bed"], 1),
  ],
  "the-lost-cat": [
    q("What colour are Milo's eyes?", ["Yellow", "Green", "Blue", "Brown"], 1),
    q("Which places did Lena check inside the house?", ["The kitchen, the living room and her bedroom", "The garage, the kitchen and the garden", "Her bedroom and the garage", "The bathroom and the kitchen"], 0),
    q("What did Lena do when nobody answered her call?", ["Waited for Milo to come", "Went outside to look for him", "Asked a neighbor", "Went to bed"], 1),
    q("What led Lena to Milo?", ["Footprints in the garden", "A soft meow from a bush", "Milo's bell", "A neighbor's call"], 1),
    q("How did Milo look when Lena found him?", ["Happy", "Scared", "Hungry", "Angry"], 1),
    q("What did Milo do after he got his treat?", ["Fell asleep", "Purred and rubbed against Lena's leg", "Ran back outside", "Hid under the bed"], 1),
  ],
  "a-new-friend": [
    q("What was Tom eating at lunch?", ["Soup", "A sandwich", "Rice", "Fruit"], 1),
    q("Where was Tom sitting when Jack came up?", ["With a group of boys", "Alone at a table", "On the playground", "In the library"], 1),
    q("What did Jack ask Tom?", ["\"What's your name?\"", "\"May I sit with you?\"", "\"Do you play soccer?\"", "\"Are you new here?\""], 1),
    q("What did Tom and Jack find out they had in common?", ["The same teacher", "They both like soccer", "The same birthday", "They live nearby"], 1),
    q("What did they talk about?", ["Homework", "Their favorite teams and players", "Their families", "The school lunch"], 1),
    q("What did Jack invite Tom to do?", ["Eat lunch again tomorrow", "Play soccer after school", "Come to his house", "Join the school team"], 1),
  ],
  "trip-to-the-grocery-store": [
    q("Which items were on Sara's list?", ["Milk, bread, eggs and apples", "Milk, bread, cheese and apples", "Milk, rice, eggs and oranges", "Bread, eggs, butter and apples"], 0),
    q("About how long did Sara walk to the store?", ["Five minutes", "Ten minutes", "Fifteen minutes", "Twenty minutes"], 1),
    q("Which item did Sara pick up last?", ["The apples", "The milk", "The bread", "The eggs"], 3),
    q("Where did Sara get the bread?", ["The dairy section", "The bakery section", "The fruit section", "The checkout"], 1),
    q("What did Sara say when the cashier asked how she was?", ["\"I am fine, thank you.\"", "\"I am in a hurry.\"", "\"I am tired.\"", "\"Very well, and you?\""], 0),
    q("What did Sara do after she got home?", ["Cooked dinner", "Put the groceries away and made a cup of tea", "Called a friend", "Went to bed"], 1),
  ],
  "a-rainy-day": [
    q("What was Ben's favorite book about?", ["Cars", "Animals", "Space", "Sports"], 1),
    q("Which animals does Ben love especially?", ["Horses and rabbits", "Dogs and cats", "Birds and fish", "Lions and tigers"], 1),
    q("Where did Ben sit to read?", ["On his bed", "On the couch", "At the kitchen table", "On the floor"], 1),
    q("How did the sound of the rain make Ben feel?", ["Sleepy", "Cozy and calm", "Sad", "Excited"], 1),
    q("Who called Ben for lunch?", ["His father", "His mother", "His sister", "His grandmother"], 1),
    q("What did Ben put on when the rain stopped?", ["His raincoat and hat", "His rain boots and jacket", "His shoes and scarf", "His hat and gloves"], 1),
  ],
  "the-birthday-party": [
    q("What did Anna's friends bring?", ["Cake and candles", "Gifts and balloons", "Games and music", "Cards and flowers"], 1),
    q("Where was the cake?", ["In the kitchen", "On the table in the living room", "In the garden", "On the porch"], 1),
    q("How many candles were on the cake, and who lit them?", ["Eight, her mother", "Eight, her father", "Seven, her mother", "Nine, Anna herself"], 0),
    q("Which games did they play?", ["Tag and hide-and-seek", "Musical chairs and pin the tail on the donkey", "Hopscotch and puzzles", "Treasure hunt and charades"], 1),
    q("Which gifts did Anna get?", ["A doll, a puzzle game and a book", "A bicycle, a doll and a book", "A teddy bear, a puzzle and a ball", "A doll, a puzzle game and a bag"], 0),
    q("What did Anna do at the end of the party?", ["Cleaned up", "Thanked her friends for the gifts and for coming", "Went to bed early", "Called her grandparents"], 1),
  ],
  "the-lost-hat": [
    q("When does James wear his blue hat?", ["Only on sunny days", "Every day, sunny or rainy", "Only to school", "Only on weekends"], 1),
    q("Whom did James ask about the hat, and what did she suggest?", ["His mother; to look in the living room", "His sister; to look outside", "His mother; to look in the garden", "His father; to look in the kitchen"], 0),
    q("Which places did James search inside the house?", ["Under the couch, behind the TV and in the kitchen", "The attic, the garage and the kitchen", "Under his bed and in the bathroom", "Behind the door and in the kitchen"], 0),
    q("What did James do when he wanted to give up the search in the garden?", ["Went back inside", "Saw something blue in the grass", "Asked his mother to help", "Sat down and cried"], 1),
    q("What did James do right after he found the hat?", ["Put it on and ran inside to tell his mother", "Hid it in his room", "Washed it", "Went on playing"], 0),
    q("What did James's mother say when he told her?", ["\"I am happy that you found it, James!\"", "\"Next time, keep it in your room.\"", "\"I knew it was in the garden.\"", "\"Now you can wear it to school.\""], 0),
  ],
  "the-picnic": [
    q("What did the family pack in the basket?", ["Sandwiches, fruit and drinks", "Rice, fish and juice", "Cake, tea and biscuits", "Fruit and bread only"], 0),
    q("How did the family get to the park?", ["They walked", "They drove", "They took a bus", "They cycled"], 1),
    q("Who found a spot under a tree and spread the blanket?", ["Lily", "Lily's father", "Lily's mother", "Lily's brother"], 1),
    q("What did Lily and her brother do while the parents set up?", ["Ate the sandwiches", "Played, running around", "Fed the ducks", "Picked flowers"], 1),
    q("What did the family see on their walk around the lake?", ["Ducks swimming", "Fish jumping", "Boats", "Frogs"], 0),
    q("What did Lily give her mother on the way back, and what did her mother say?", ["Flowers; \"Thank you, Lily. These are very pretty!\"", "A sandwich; \"Thank you, Lily. This is delicious!\"", "Flowers; \"Put them back, Lily.\"", "A feather; \"Thank you, Lily. This is lovely!\""], 0),
  ],
  "a-new-pet": [
    q("How did Emily get her kitten?", ["She bought it", "Her parents gave it to her as a gift", "She found it in the garden", "A friend gave it to her"], 1),
    q("Why did she name the kitten Whiskers?", ["He was playful", "He has long whiskers", "He was grey", "He loved to run"], 1),
    q("What does Whiskers like to chase at home?", ["A ball wrapped in yarn", "A toy mouse", "His own tail", "Butterflies"], 0),
    q("Where does Whiskers sometimes hide?", ["Under the bed", "Behind the couch", "In a box", "In the garden"], 0),
    q("What does Emily do every morning?", ["Takes him to the garden", "Gives him food and fresh water", "Gives him a bath", "Plays with him for an hour"], 1),
    q("Why does Emily keep an eye on Whiskers in the garden?", ["So that he does not get lost", "So that he does not eat the flowers", "So that he does not fight", "So that he does not climb a tree"], 0),
  ],
  "a-fishing-trip": [
    q("What did Tim and his father pack in the car?", ["Only the fishing gear", "A picnic and all the fishing gear", "A tent and a picnic", "Fishing gear and a camera"], 1),
    q("What did Tim's father teach him?", ["How to clean a fish", "How to put bait on the hook and throw the pole into the water", "How to row a boat", "How to cook the fish"], 1),
    q("How did Tim know he had a fish?", ["The line went quiet", "He felt a tug on his line", "He saw the fish jump", "His father shouted"], 1),
    q("Where did they put the first fish?", ["In a bucket", "In the car", "Back in the lake", "On the grass"], 0),
    q("How many fish did Tim catch altogether?", ["One", "Two", "Three", "Four"], 2),
    q("What did they talk about during the picnic?", ["Their favorite fishing spots", "School", "The next holiday", "Cooking the fish"], 0),
  ],
  "dev-rp1": [
    q("রাধিকার দাদার নাম কী? (What was his elder brother's name?)", ["জগবন্ধু", "বীরেশ্বর", "রামদাস", "গোপাল"], 1),
    q("রাধিকার কোন কাজটা ভালো লাগত না? (Which task did he not like?)", ["গান গাওয়া", "লেখা", "হরিনাম করা", "খেলা"], 1),
    q("সকালে আর সন্ধ্যায় সে কী করে? (What does he do in the morning and in the evening?)", ["সকালে হরিনাম, সন্ধ্যায় অক্ষর", "সকালে অক্ষর শেখে, সন্ধ্যায় হরিনাম করে", "সকালে খেলে, সন্ধ্যায় পড়ে", "সকালে ঘুমায়, সন্ধ্যায় লেখে"], 1),
    q("এবার সে মন দিয়ে লিখল কেন? (Why did he write attentively this time?)", ["দাদা বকেছিলেন", "দাদা তার জন্য একটা গান লিখে দিয়েছিলেন", "দাদা শ্লেট কিনে দিয়েছিলেন", "মা পাশে বসেছিলেন"], 1),
    q("এভাবে সে কী শিখল? (What did he learn this way?)", ["যুক্তাক্ষর", "গান", "অঙ্ক", "ছবি আঁকা"], 0),
  ],
  "dev-rp2": [
    q("কুকুরটা কেমন অবস্থায় রাধিকার কাছে এল? (In what state did the dog come to him?)", ["ভয়ে", "খিদেয়", "আহত হয়ে", "রাগে"], 0),
    q("কে কুকুরটাকে মারতে চেয়েছিল? (Who wanted to kill the dog?)", ["একজন সাধু", "একটা লোক", "একটি ছেলে", "বাড়ির মালিক"], 1),
    q("রাধিকা লোকটাকে কী বললেন? (What did Rādhikā say to the man?)", ["কুকুরটাকে বিক্রি করো", "কুকুরটাকে মেরো না, আমাকে ভিক্ষা দাও", "কুকুরটাকে বাড়ি নিয়ে যাও", "কুকুরটাকে ভয় দেখাও"], 1),
    q("রাধিকা লোকটাকে কী দিতে চাইলেন? (What did he offer the man?)", ["টাকা", "খাবার আর জল", "একটা পাখি", "একটা খাঁচা"], 1),
    q("লোকটার কী হল? (What happened to the man?)", ["সে রেগে গেল", "সে অবাক হল, আর কখনো কুকুর মারেনি", "সে ভয় পেয়ে পালাল", "সে টাকা চাইল"], 1),
  ],
  "dev-rp3": [
    q("মেয়েটি যখন ডাকল তখন বাবাজীর অবস্থা কেমন ছিল? (How was Bābājī when the girl called?)", ["খুব খুশি", "ক্লান্ত আর তেষ্টা পেয়েছে", "খিদে আর ঘুম পেয়েছে", "রেগে গেছেন"], 1),
    q("মেয়েটি কী বলে ডাকল? (What did the girl say?)", ["বাবা, আমাদের বাড়িতে মধুকরী নিন", "বাবা, একটু জল খান", "বাবা, আমার সঙ্গে চলুন", "বাবা, আমাকে একটা গান শেখান"], 0),
    q("ঘরের ভিতর থেকে কী ভেসে এল? (What drifted out from inside?)", ["গোপালের গান", "কীর্তনের করতাল", "মন্ত্রপাঠ", "বাঁশির সুর"], 0),
    q("মধুকরী পাওয়ার আগে বাবাজী কী করলেন? (What did Bābājī do before receiving madhukarī?)", ["মন দিয়ে গান শুনলেন", "বসে বিশ্রাম নিলেন", "জল চাইলেন", "মেয়েটিকে আশীর্বাদ করলেন"], 0),
    q("তিনি মধুকরী কীভাবে নিলেন? (How did he receive it?)", ["ঝোলায় ভরে", "দু'হাত পেতে", "দূর থেকে", "মুখ ফিরিয়ে"], 1),
  ],
  "dev-rp4": [
    q("কে বাবাজীকে মধুকরীতে পাঠালেন? (Who sent Bābājī for madhukarī?)", ["মহিলা", "জগবন্ধু", "বীরেশ্বর", "একজন সাধু"], 1),
    q("ঠোঙায় কোনটা ছিল না? (Which was NOT in the bag?)", ["প্যাঁড়া", "ক্ষীর", "লুচি", "রসগোল্লা"], 3),
    q("প্রসাদ পাওয়ার আগে জগবন্ধু কী করলেন? (What did Jagabandhu do first?)", ["প্রসাদকে প্রণাম করলেন", "সবটা খেয়ে ফেললেন", "সবাইকে ভাগ করে দিলেন", "প্রসাদ রেখে দিলেন"], 0),
    q("তিনি কতটুকু প্রসাদ মুখে দিলেন? (How much did he put in his mouth?)", ["অর্ধেক", "এক কণা", "সবটুকু", "এক টুকরো লুচি"], 1),
    q("বাকি প্রসাদ নিয়ে কী করতে বললেন? (What did he say to do with the rest?)", ["যমুনায় ভাসিয়ে দাও", "আশ্রমে নিয়ে যাও", "গরুকে খাওয়াও", "পরে খাব"], 0),
  ],
  "dev-rp5": [
    q("ভোরে হাঁটতে হাঁটতে বাবাজী কী করেন? (What does Bābājī do while walking at dawn?)", ["জপ করেন", "কীর্তন গান", "চুপ করে থাকেন", "মালা গাঁথেন"], 1),
    q("বাবাজী হঠাৎ থামলেন কেন? (Why did he suddenly stop?)", ["একজন তাঁকে ডাকল", "কুকুরটা হঠাৎ ডেকে উঠল", "বৃষ্টি নামল", "তিনি ক্লান্ত হলেন"], 1),
    q("থেমে তিনি কী দেখলেন? (What did he see when he stopped?)", ["একটা খোলা দরজা", "একটা মন্দির", "একটা নদী", "একটা গাছ"], 0),
    q("সাধুর ডান হাতে কী ছিল? (What was in the sādhu's right hand?)", ["করতাল", "জপমালা", "একটা বই", "লাঠি"], 1),
    q("সাধু একবার তাকাতেই বাবাজীর মনে কী হল? (What arose in Bābājī's heart?)", ["প্রণাম করার ইচ্ছে", "ভয়", "রাগ", "ফিরে যাওয়ার তাড়া"], 0),
  ],
  "dev-rp6": [
    q("গুরু কী শিখিয়েছিলেন? (What had the guru taught?)", ["হাতিকে ভয় করতে হয়", "নারায়ণ সবার মধ্যে আছেন", "শুধু গুরুর কথা শুনতে হয়", "বনে থাকাই ভালো"], 1),
    q("পাগলা হাতি এলে মাহুত কী বলল? (What did the mahout shout?)", ["থামো! থামো!", "পালাও! পালাও!", "এসো! এসো!", "বসে পড়ো!"], 1),
    q("এক শিষ্য কেন পালাল না? (Why did one disciple not run?)", ["সে ভয় পায়নি", "সে ভাবল হাতিও নারায়ণ", "সে ঘুমিয়ে ছিল", "সে মাহুতকে বিশ্বাস করেনি"], 1),
    q("হাতি তাকে কী করল? (What did the elephant do to him?)", ["পিঠে তুলে নিল", "শুঁড়ে তুলে ছুড়ে ফেলল", "পা দিয়ে মাড়াল", "ছেড়ে দিয়ে চলে গেল"], 1),
    q("গুরু হেসে কী বললেন? (What did the guru say with a smile?)", ["তুমি খুব সাহসী", "মাহুত-নারায়ণের কথাও শুনতে হয়", "হাতিকে প্রণাম করো", "কাল আবার চেষ্টা করো"], 1),
  ],
  "dev-rp7": [
    q("দাসী মনিবের কাদের দেখাশোনা করে? (Whom does she look after?)", ["তার নিজের ছেলেমেয়েদের", "মনিবের ছেলেমেয়েদের", "মনিবের গরুদের", "অতিথিদের"], 1),
    q("কাজ করতে করতে সে মুখে কী বলে? (What does she say while working?)", ["আমার রাম, আমার হরি", "আমার বাড়ি, আমার গ্রাম", "আমার মনিব, আমার ছেলে", "জয় নিতাই"], 0),
    q("তার মন কোথায় থাকে? (Where is her mind?)", ["মনিবের বাড়িতে", "নিজের গ্রামের বাড়িতে", "মন্দিরে", "বাজারে"], 1),
    q("ঠাকুর কীভাবে সংসারে থাকতে বলেন? (How does Ṭhākur say to live in the world?)", ["সব ছেড়ে বনে যাও", "সব কাজ করো, কিন্তু মন ঈশ্বরে রাখো", "শুধু কাজ করো", "কাউকে বিশ্বাস কোরো না"], 1),
    q("কাঁঠাল ভাঙার আগে হাতে তেল মাখলে কী হয়? (What does oil on the hands do?)", ["আঠা হাতে লাগে না", "কাঁঠাল পাকে", "কাঁঠাল মিষ্টি হয়", "হাত নরম হয়"], 0),
  ],
  "dev-rp8": [
    q("কীসের জন্য মানুষ বেশি কাঁদে? (What do people cry for most?)", ["পরিবারের জন্য", "টাকার জন্য", "খাবারের জন্য", "ঘুমের জন্য"], 1),
    q("ঠাকুর কোন প্রশ্নটা করেন? (Which question does Ṭhākur ask?)", ["কে তোমাকে ডাকবে?", "ঈশ্বরের জন্য কে কাঁদে?", "কে টাকা দেবে?", "কে পরিবারকে দেখবে?"], 1),
    q("তাঁকে কীভাবে ডাকতে বলেন? (How does he say to call Him?)", ["জোরে চেঁচিয়ে", "সমস্ত মন দিয়ে", "চুপ করে", "রোজ একবার"], 1),
    q("কী হলে তাঁকে পাওয়া যায়? (When can He be found?)", ["ব্যাকুল হয়ে ডাকলে", "অনেক টাকা দান করলে", "বনে গেলে", "সারা রাত জাগলে"], 0),
  ],
};
