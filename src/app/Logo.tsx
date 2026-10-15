/** The Bengali Practice mark. */
export default function Logo({ className = "mark" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={className} src="/logo.png" width={40} height={40} alt="Bengali Practice" />
  );
}
