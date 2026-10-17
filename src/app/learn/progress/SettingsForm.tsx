"use client";

import { useActionState } from "react";
import Toast from "../../Toast";
import { GOALS } from "@/lib/points";
import { saveSettings } from "./actions";

type S = { goal: number; name: string | null; showBoard: boolean; remind: boolean };

export default function SettingsForm({ settings }: { settings: S }) {
  const [state, action, pending] = useActionState(saveSettings, undefined);
  return (
    <form action={action} className="stack card-static settings-form">
      <fieldset>
        <legend>Daily goal</legend>
        <div className="goal-opts">
          {GOALS.map((g) => (
            <label key={g.id} className="choice"><input type="radio" name="goal" value={g.id} defaultChecked={settings.goal === g.id} /><span><b>{g.label}</b><i className="pts">{g.id} points a day</i><small>{g.blurb}</small></span></label>
          ))}
        </div>
      </fieldset>
      <label className="field">Display name on the class board
        <input name="name" defaultValue={settings.name ?? ""} maxLength={24} placeholder="Leave empty to appear as “Student”" autoComplete="nickname" />
      </label>
      <label className="check"><input type="checkbox" name="showBoard" defaultChecked={settings.showBoard} /> Show me on the class leaderboard</label>
      <label className="check"><input type="checkbox" name="remind" defaultChecked={settings.remind} /> Email me a reminder in the evening if I have not practised yet</label>
      <button className="btn" disabled={pending}>{pending ? "Saving…" : "Save"}</button>
      {state && <Toast key={state.n} message={state.message} kind={state.ok ? "good" : "bad"} />}
    </form>
  );
}
