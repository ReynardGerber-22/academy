export const Header = () => {
    return (
        <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
                <a href="#top" className="flex items-center gap-2.5">
                    <span className="gradient-brand flex h-8 w-8 items-center justify-center rounded-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-scale h-4.5 w-4.5 text-brand-foreground" aria-hidden="true" data-tsd-source="/src/routes/index.tsx:125:15">
                            <path d="M12 3v18"></path>
                            <path d="m19 8 3 8a5 5 0 0 1-6 0zV7"></path>
                            <path d="M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1"></path>
                            <path d="m5 8 3 8a5 5 0 0 1-6 0zV7"></path>
                            <path d="M7 21h10"></path></svg>
                    </span>
                    <span className="font-display text-lg font-semibold tracking-tight">Tolley <span className="text-brand">Academy</span>
                    </span>
                </a>
                <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
                    <a className="transition-colors hover:text-brand" href="/learning">My learning</a>
                    <a className="transition-colors hover:text-brand" href="/progress">My Progress</a>
                    <a className="transition-colors hover:text-brand" href="/forums">Student Forums</a>
                    <a className="transition-colors hover:text-brand" href="/free-content">Free Content</a>
                </nav>
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 rounded-md px-3 text-xs">Support</button>
            </div>
        </header>
    )
}