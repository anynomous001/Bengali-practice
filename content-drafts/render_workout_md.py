import json
R = json.load(open("content-drafts/tense-workout.json"))
def c(x): return f"{x['bn']} _({x['ro']})_"
o = ["# Tense workout: answer key (for your review)\n",
     "This is every round and every item of the **Tense workout**, with the model answer. Please check the Bengali and romanization as a teacher. I built it from your worksheet, but the **answers are mine**: where your worksheet had a student's answer I have corrected it, and where Bengali allows more than one answer I list the alternative.\n",
     "## What I changed from the worksheet answers\n",
     "- **Simple past vs past perfect:** several worksheet answers used the past perfect (giyechilo, kheyechile, korechile) where the cue said simply *past*. In Bengali the simple past is গেল / খেলে / করলে; the past perfect (গিয়েছিল…) means 'had gone', an earlier event. The key uses the simple past for 'past' cues.\n- **'Has been doing' / 'had been doing':** Bengali has no separate form. The key uses the ordinary present (or present continuous) or past continuous plus ধরে (for) or থেকে (since). There is a new lesson on this in Grammar → Tenses.\n- **Fill the blank 4:** 'Yesterday I talked' is the simple past বললাম, not the past continuous বলছিলাম.\n- **'Fix the mistake' round:** in your worksheet, 7 of the 8 sentences are already correct. I made it a *Check the sentence* round where most are right and one needs fixing.\n- **Typos:** aganikal → agamikal, bachar → bochhor, jachhile → jachchhile.\n",
     "## Please check\n",
     "- Whether you accept *both* করলে and করেছিলে after গতকাল (the key uses করলে and notes the other).\n- The romanization of ছ as **chh** (jachchhi, korchhilam), to match the rest of the app.\n- Sentences in 'Translate' that use idioms (হয়ে যাবে for 'will have been living').\n"]
for n, r in enumerate(R, 1):
    o.append(f"\n---\n\n## Round {n}: {r['title']}  _({'auto-checked' if r['mode']=='check' else 'write, then check'})_\n")
    o.append(r["intro"] + "\n")
    for k, it in enumerate(r["items"], 1):
        o.append(f"{k}. **{it['q']}**")
        if it["sentence"]: o.append(f"   - Sentence: {c(it['sentence'])}")
        if it["kind"] == "choose":
            for j, op in enumerate(it["options"]): o.append(f"   - {'✔' if j == it['answer'] else '✗'} {c(op)}")
        else:
            o.append(f"   - **Model answer:** {c(it['answer'])}")
            if it["also"]: o.append(f"   - Also fine: {it['also']}")
        o.append(f"   - _Why:_ {it['why']}")
open("content-drafts/tense-workout.md", "w").write("\n".join(o))
print(len("\n".join(o)), "chars")
