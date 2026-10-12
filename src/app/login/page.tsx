import AuthFrame from "../AuthFrame";
import LoginForm from "./LoginForm";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <AuthFrame>
      <p className="eyebrow">Student sign in</p>
      <h1>Welcome back</h1>
      {error && <p className="msg bad">That sign-in link has expired or was already used. Request a new one.</p>}
      <p className="muted">Enter the email your teacher enrolled you with. We&apos;ll send you a one-time sign-in link: no password to remember.</p>
      <LoginForm />
    </AuthFrame>
  );
}
