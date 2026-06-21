type CtaSweepLabelProps = {
  children: React.ReactNode;
};

/**
 * Renders button label text twice: the resting copy (inherits the button's
 * own bg/text colors) plus an inverted-color copy revealed via a clip-path
 * wipe on hover. Clip-path (not scaleX) keeps the revealed text undistorted
 * as it sweeps in from the left edge and recedes back to it on hover-out.
 * Parent button needs: group relative isolate overflow-hidden.
 */
export function CtaSweepLabel({ children }: CtaSweepLabelProps) {
  return (
    <>
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="absolute inset-0 z-20 flex items-center justify-center bg-white text-accent [clip-path:inset(0_100%_0_0)] transition-[clip-path] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:[clip-path:inset(0_0%_0_0)]"
      >
        {children}
      </span>
    </>
  );
}
