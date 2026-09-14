export const Footer = () => {
  return (
    <footer className="bg-ink py-12 text-ink-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg font-semibold">Academy</p>
          <p className="mt-1 text-sm opacity-70">
            Tax education for students, built on the statute and the case law.
          </p>
        </div>
        <p className="text-sm opacity-60">©2026 Academy</p>
      </div>
    </footer>
  );
};
