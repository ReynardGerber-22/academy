type SupportProps = {
  open: boolean;
  onClose: () => void;
};

export const Support = ({ open, onClose }: SupportProps) => {
  return (
    <aside
      id="radix-_R_taq_"
      data-state={open ? "open" : "closed"}
      aria-hidden={!open}
      aria-labelledby="radix-_R_taqH1_"
      inert={!open}
      className={`fixed inset-y-0 right-0 z-50 box-border h-screen w-full max-w-none overflow-y-auto border-l bg-background p-6 shadow-lg transition-transform duration-300 ease-in-out sm:max-w-sm ${
        open ? "translate-x-0" : "pointer-events-none translate-x-full"
      }`}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-x h-4 w-4"
          aria-hidden="true"
        >
          <path d="M18 6 6 18"></path>
          <path d="m6 6 12 12"></path>
        </svg>
        <span className="sr-only">Close</span>
      </button>
      <div
        className="flex flex-col space-y-2 text-center sm:text-left"
      >
        <h2
          id="radix-_R_taqH1_"
          className="text-lg font-semibold text-foreground"
        >
          Student support
        </h2>
        <p
          id="radix-_R_taqH2_"
          className="text-sm text-muted-foreground"
        >
          Need help with enrolment, access or course content? Reach out and
          we'll get back to you within one working day.
        </p>
      </div>
      <div
        className="mt-8 space-y-4"
      >
        <a
          href="mailto:hello@fiscusacademy.example"
          className="flex items-start gap-4 rounded-md border border-border p-4 transition-colors hover:bg-accent"
        >
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-secondary text-brand"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-mail h-4.5 w-4.5"
              aria-hidden="true"
            >
              <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
              <rect x="2" y="4" width="20" height="16" rx="2"></rect>
            </svg>
          </span>
          <div>
            <p
              className="font-medium text-foreground"
            >
              Email us
            </p>
            <p
              className="text-sm text-muted-foreground"
            >
              examtraining@lexisnexis.co.uk
            </p>
          </div>
        </a>
        <a
          href="tel:+27123456789"
          className="flex items-start gap-4 rounded-md border border-border p-4 transition-colors hover:bg-accent"
        >
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-secondary text-brand"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-phone h-4.5 w-4.5"
              aria-hidden="true"
            >
              <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>
            </svg>
          </span>
          <div>
            <p
              className="font-medium text-foreground"
            >
              Call us
            </p>
            <p
              className="text-sm text-muted-foreground"
            >
              +44 203 3644 500 
            </p>
          </div>
        </a>
        <div
          className="flex items-start gap-4 rounded-md border border-border p-4"
        >
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-secondary text-brand"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-clock h-4.5 w-4.5"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 6v6l4 2"></path>
            </svg>
          </span>
          <div>
            <p
              className="font-medium text-foreground"
            >
              Office hours
            </p>
            <p
              className="text-sm text-muted-foreground"
            >
              Mon – Fri, 08:00 – 17:00 SAST
            </p>
          </div>
        </div>
        <a
          href="mailto:technicalqueries@lexisnexis.co.uk"
          className="flex items-start gap-4 rounded-md border border-border p-4 transition-colors hover:bg-accent"
        >
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-secondary text-brand"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-message-circle h-4.5 w-4.5"
              aria-hidden="true"
            >
              <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path>
            </svg>
          </span>
          <div>
            <p
              className="font-medium text-foreground"
            >
              Tutor support
            </p>
            <p
              className="text-sm text-muted-foreground"
            >
              technicalqueries@lexisnexis.co.uk
            </p>
          </div>
        </a>
        <hr className="my-8 border-border" />
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            Not enrolled?
          </h2>
          <p className="text-sm text-muted-foreground">
            Find out more and enrol on Tolley Academy:
          </p>
          <a
            href="https://www.tolley.co.uk/exam-training"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Enrol on Tolley Academy
          </a>
        </section>
      </div>
    </aside>
  );
};
