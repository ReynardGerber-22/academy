import { X, Mail, Phone, Clock, MessageCircle } from "lucide-react";

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
      className={`fixed inset-y-0 right-0 z-50 h-screen w-full overflow-y-auto border-l bg-background p-6 shadow-lg transition-transform duration-300 ease-in-out sm:max-w-sm ${
        open ? "translate-x-0" : "pointer-events-none translate-x-full"
      }`}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        <X className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Close</span>
      </button>
      <div className="flex flex-col space-y-2 text-center sm:text-left">
        <h2
          id="radix-_R_taqH1_"
          className="text-lg font-semibold text-foreground"
        >
          Student support
        </h2>
        <p id="radix-_R_taqH2_" className="text-sm text-muted-foreground">
          Need help with enrolment, access or course content? Reach out and
          we'll get back to you within one working day.
        </p>
      </div>
      <div className="mt-8 space-y-4">
        <a
          href="mailto:hello@fiscusacademy.example"
          className="flex items-start gap-4 rounded-md border p-4 transition-colors hover:bg-accent"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-secondary text-brand">
            <Mail className="h-4.5 w-4.5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-medium text-foreground">Email us</p>
            <p className="text-sm text-muted-foreground">
              hello@fiscusacademy.example
            </p>
          </div>
        </a>
        <a
          href="tel:+442079460123"
          className="flex items-start gap-4 rounded-md border p-4 transition-colors hover:bg-accent"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-secondary text-brand">
            <Phone className="h-4.5 w-4.5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-medium text-foreground">Call us</p>
            <p className="text-sm text-muted-foreground">+44 20 7946 0123</p>
          </div>
        </a>
        <div className="flex items-start gap-4 rounded-md border p-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-secondary text-brand">
            <Clock className="h-4.5 w-4.5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-medium text-foreground">Office hours</p>
            <p className="text-sm text-muted-foreground">
              Mon – Fri, 08:00 – 17:00 SAST
            </p>
          </div>
        </div>
        <a
          href="mailto:tutors@fiscusacademy.example"
          className="flex items-start gap-4 rounded-md border p-4 transition-colors hover:bg-accent"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-secondary text-brand">
            <MessageCircle className="h-4.5 w-4.5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-medium text-foreground">Tutor support</p>
            <p className="text-sm text-muted-foreground">
              tutors@fiscusacademy.example
            </p>
          </div>
        </a>
        <hr className="my-8" />
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            Not enrolled?
          </h2>
          <p className="text-sm text-muted-foreground">
            Find out more and enrol on Academy:
          </p>
          <a
            href="/register"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Enrol on Academy
          </a>
        </section>
      </div>
    </aside>
  );
};
