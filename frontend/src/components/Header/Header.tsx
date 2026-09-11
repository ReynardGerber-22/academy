type HeaderProps = {
  onSupportClick: () => void;
  supportOpen: boolean;
};

export const Header = ({ onSupportClick, supportOpen }: HeaderProps) => {
  return (
      <header
        className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur"
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="gradient-brand flex h-8 w-8 items-center justify-center rounded-sm">
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
                className="lucide lucide-scale h-4.5 w-4.5 text-brand-foreground"
                aria-hidden="true"
              >
                <path d="M12 3v18"></path>
                <path d="m19 8 3 8a5 5 0 0 1-6 0zV7"></path>
                <path d="M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1"></path>
                <path d="m5 8 3 8a5 5 0 0 1-6 0zV7"></path>
                <path d="M7 21h10"></path>
              </svg>
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">
              Tolley<span className="text-brand"> Academy</span>
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a
              className="transition-colors hover:text-brand"
              href="/my-learning"
            >
              My Learning
            </a>
            <a
              className="transition-colors hover:text-brand"
              href="/my-progress"
            >
              My Progress
            </a>
            <a className="transition-colors hover:text-brand" href="/forums">
              Student Forums
            </a>
            <a
              className="transition-colors hover:text-brand"
              href="/free-content"
            >
              Free Content
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <button
              className="items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs hidden sm:inline-flex"
              type="button"
              onClick={onSupportClick}
              aria-haspopup="dialog"
              aria-expanded={supportOpen}
              data-state={supportOpen ? "open" : "closed"}
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
                className="lucide lucide-headset mr-1.5 h-4 w-4"
                aria-hidden="true"
              >
                <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"></path>
                <path d="M21 16v2a4 4 0 0 1-4 4h-5"></path>
              </svg>
              Support
            </button>
            <button className="items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs hidden sm:inline-flex">
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
                className="lucide lucide-log-in mr-1.5 h-4 w-4"
                aria-hidden="true"
              >
                <path d="m10 17 5-5-5-5"></path>
                <path d="M15 12H3"></path>
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
              </svg>
              Log in
            </button>
            <a
              href="https://www.tolley.co.uk/"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 rounded-md px-3 text-xs"
            >
              Enrol
            </a>
          </div>
        </div>
      </header>
  );
};
