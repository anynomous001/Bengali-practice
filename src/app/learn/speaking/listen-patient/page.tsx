import { requireAccess } from "@/lib/access";
import { PATIENT_LINES } from "@/data/listening-clinical";
import PatientListening from "../../PatientListening";
import LessonFrame from "../../LessonFrame";

export default async function Page() {
  await requireAccess();
  return (
    <LessonFrame lessonId="speaking/listen-patient">
      <h1>Understand your patient</h1>
      <PatientListening lines={PATIENT_LINES} />
    </LessonFrame>
  );
}
