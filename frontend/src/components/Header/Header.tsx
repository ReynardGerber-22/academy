import { Link } from "react-router";
import { Scale, Headset, LogIn } from "lucide-react";

type HeaderProps = {
  onSupportClick: () => void;
  supportOpen: boolean;
};

export const Header = ({ onSupportClick, supportOpen }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="gradient-brand flex h-8 w-8 items-center justify-center rounded-sm">
            <Scale
              className="h-4.5 w-4.5 text-brand-foreground"
              aria-hidden="true"
            />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Academy
          </span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <Link
            className="transition-colors hover:text-brand"
            to="/my-learning"
          >
            My Learning
          </Link>
          <Link
            className="transition-colors hover:text-brand"
            to="/my-progress"
          >
            My Progress
          </Link>
          <Link className="transition-colors hover:text-brand" to="/forums">
            Student Forums
          </Link>
          <a
            className="transition-colors hover:text-brand"
            href="/free-content"
          >
            Free Content
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <button
            className="items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs hidden sm:inline-flex"
            type="button"
            onClick={onSupportClick}
            aria-haspopup="dialog"
            aria-expanded={supportOpen}
            data-state={supportOpen ? "open" : "closed"}
          >
            <Headset className="mr-1.5 h-4 w-4" aria-hidden="true" />
            Support
          </button>
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs"
          >
            <LogIn className="mr-1.5 h-4 w-4" aria-hidden="true" />
            Log in
          </Link>
          <a
            href="/"
            className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 rounded-md px-3 text-xs"
          >
            Enrol
          </a>
        </div>
      </div>
    </header>
  );
};
