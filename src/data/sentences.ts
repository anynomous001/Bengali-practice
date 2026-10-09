export type Sentence = { id: string; bn: string; rom: string; en: string };

// Simple everyday sentences. Replace or extend with your own classroom sentences.
export const SENTENCES: Sentence[] = [
  { id: "1", bn: "আমি ভাত খাই", rom: "ami bhat khai", en: "I eat rice" },
  { id: "2", bn: "আমি বাজারে যাই", rom: "ami bajare jai", en: "I go to the market" },
  { id: "3", bn: "আমি জল চাই", rom: "ami jol chai", en: "I want water" },
  { id: "4", bn: "আমি ভালো আছি", rom: "ami bhalo achhi", en: "I am well" },
  { id: "5", bn: "আপনি কেমন আছেন?", rom: "apni kemon achhen?", en: "How are you?" },
  { id: "6", bn: "এটা কত টাকা?", rom: "eta koto taka?", en: "How much is this?" },
  { id: "7", bn: "ডান দিকে যান", rom: "dan dike jan", en: "Go to the right" },
  { id: "8", bn: "সোজা যান", rom: "shoja jan", en: "Go straight" },
  { id: "9", bn: "আমার নাম নীল", rom: "amar nam neel", en: "My name is Neel" },
  { id: "10", bn: "আপনার নাম কী?", rom: "apnar nam ki?", en: "What is your name?" },
];
