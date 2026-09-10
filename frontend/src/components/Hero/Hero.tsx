import hero from "../../assets/Hero.jpg";

export const Hero = () => {
    return (
        <section className="border-b border-border bg-sand" data-tsd-source="/src/routes/index.tsx:147:9">
            <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:py-24 lg:grid-cols-[1.05fr_1fr] lg:items-center">
                <div>
                    <div className="inline-flex items-center border px-2.5 py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-5 rounded-sm font-medium uppercase tracking-wider"
                    >For students of taxation</div>
                    <h1 className="text-4xl leading-[1.08] font-semibold text-foreground md:text-6xl">Learn tax the way it is <span className="text-brand">actually practised</span>
                    </h1>
                    <p className="mt-5 max-w-xl text-lg text-muted-foreground">Structured courses in income tax, VAT, corporate and international tax — grounded in the statute, illustrated by case law, and drilled with exam-style problems.</p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 rounded-md px-8 shadow-brand"
                        >Browse the curriculum
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-right ml-1 h-4 w-4" aria-hidden="true">
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path></svg>
                        </button>
                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 rounded-md px-8">Take a sample lesson</button>
                    </div>
                    <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-6">
                        <div>
                            <dt className="font-display text-2xl font-semibold text-brand">34</dt>
                            <dd className="text-sm text-muted-foreground">Modules</dd>
                        </div>
                        <div><dt className="font-display text-2xl font-semibold text-brand">600+</dt>
                            <dd className="text-sm text-muted-foreground">Practice questions</dd>
                        </div><div>
                            <dt className="font-display text-2xl font-semibold text-brand">180</dt>
                            <dd className="text-sm text-muted-foreground">Annotated cases</dd>
                        </div>
                    </dl>
                </div>
                <div className="relative">
                    <div className="gradient-brand absolute -top-4 -left-4 hidden h-24 w-24 rounded-sm lg:block">
                    </div>
                    <img src={hero} alt="Tax legislation, notes and a calculator on a study desk" width="1600" height="1000" className="relative w-full rounded-md object-cover shadow-card" />
                </div>
            </div>
        </section>
    )
}