import LoginForm from "./LoginForm";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <main className="page narrow">
      <a href="/" className="back">← Home</a>
      <h1>Sign in</h1>
      {error && <p className="msg bad">That sign-in link has expired or was already used. Request a new one.</p>}
      <p className="muted">Enter the email I enrolled you with. We&apos;ll send you a one-time link.</p>
      <LoginForm />
    </main>
  );
}
