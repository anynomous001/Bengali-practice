/** The Bengali Practice mark: the letter বা ("ba"), the start of বাংলা. Outlined, so it never depends on a font. */
export default function Logo({ className = "mark" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" role="img" aria-label="Bengali Practice">
      <defs>
        <linearGradient id="bp-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ec4a64" /><stop offset="1" stopColor="#a81d35" /></linearGradient>
        <linearGradient id="bp-s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".18" /><stop offset=".5" stopColor="#fff" stopOpacity="0" /></linearGradient>
      </defs>
      <rect width="512" height="512" rx="115" fill="url(#bp-g)" />
      <rect width="512" height="512" rx="115" fill="url(#bp-s)" />
      <g transform="translate(114.8 376.4) scale(0.3551)" fill="#fff">
        <path d="M457 24 388 -19Q352 -74 304 -112Q255 -150 196 -173Q137 -196 67 -204L12 -351Q69 -388 130 -419Q190 -450 254 -475Q318 -500 386 -518L376 -471V-550H7L-35 -622H538L581 -550H466V22ZM376 -81V-422L393 -387Q353 -375 310 -358Q268 -340 226 -318Q185 -297 150 -274L142 -297Q186 -286 232 -262Q278 -238 319 -198Q360 -159 390 -102ZM708 35 626 -1V-455Q620 -492 604 -521Q588 -550 558 -550H553L511 -622H547Q573 -622 592 -608Q611 -595 624 -567Q637 -539 644 -496L634 -493Q630 -528 628 -564Q626 -601 626 -616V-710L633 -713L701 -677L708 -622H788L830 -550H715V33Z" />
      </g>
    </svg>
  );
}
