import Icon from "./Icon";

export default function LessonStatus({ done, size = 20 }: { done: boolean; size?: number }) {
  return <span className={"status" + (done ? " done" : "")} role="img" aria-label={done ? "Completed" : "Not completed"}><Icon name={done ? "done" : "circle"} size={size} /></span>;
}
