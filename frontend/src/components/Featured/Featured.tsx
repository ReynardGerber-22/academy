export const Featured = () => {
  return (
    <section id="approach" className="mx-auto max-w-6xl px-5 py-16 md:py-20">
      <h2 className="rule-brand text-3xl font-semibold md:text-4xl">
        How the teaching works
      </h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border bg-card text-card-foreground shadow border-border shadow-card">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="font-semibold tracking-tight font-display text-xl">
              Statute-first teaching
            </div>
          </div>
          <div className="p-6 pt-0 text-muted-foreground">
            Every module starts in the legislation itself, then works outward to
            commentary and practice notes.
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow border-border shadow-card">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="font-semibold tracking-tight font-display text-xl">
              Case law you can cite
            </div>
          </div>
          <div className="p-6 pt-0 text-muted-foreground">
            Annotated judgments with the ratio isolated, so you know exactly
            what to quote in an exam answer.
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow border-border shadow-card">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="font-semibold tracking-tight font-display text-xl">
              Exam-shaped practice
            </div>
          </div>
          <div className="p-6 pt-0 text-muted-foreground">
            Timed problem questions with model answers and marker commentary
            after every unit.
          </div>
        </div>
      </div>
    </section>
  );
};
