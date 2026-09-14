import { ArrowRight } from "lucide-react";
import hero from "../../assets/Hero.jpg";

export const Hero = () => {
  return (
    <section className="border-b bg-sand">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:py-24 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div>
          <div className="inline-flex items-center border px-2.5 py-0.5 text-xs transition-colors border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-5 rounded-sm font-medium uppercase tracking-wider">
            For students of taxation
          </div>
          <h1 className="text-4xl leading-[1.08] font-semibold text-foreground md:text-6xl">
            Learn tax the way it is{" "}
            <span className="text-brand">actually practised</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Tolley Academy allows students to access all study materials online,
            on a PC, laptop, tablet or mobile, 24 hours a day. Students can
            study whenever and wherever it suits them, making the best use of
            their time and to have the best chance of exam success. Use this
            service to keep tabs on your learning, check exam dates and
            locations, take online tests and more.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://www.tolley.co.uk/exam-training"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-md px-8 shadow-brand"
            >
              Enrol
              <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="https://www.tolley.co.uk/exam-training"
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 rounded-md px-8"
            >
              Read More
            </a>
          </div>
          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t pt-6">
            <div>
              <dt className="font-display text-2xl font-semibold text-brand">
                34
              </dt>
              <dd className="text-sm text-muted-foreground">Modules</dd>
            </div>
            <div>
              <dt className="font-display text-2xl font-semibold text-brand">
                600+
              </dt>
              <dd className="text-sm text-muted-foreground">
                Practice questions
              </dd>
            </div>
            <div>
              <dt className="font-display text-2xl font-semibold text-brand">
                180
              </dt>
              <dd className="text-sm text-muted-foreground">Annotated cases</dd>
            </div>
          </dl>
        </div>
        <div className="relative">
          <div className="gradient-brand absolute -top-4 -left-4 hidden h-24 w-24 rounded-sm lg:block"></div>
          <img
            src={hero}
            alt="Tax legislation, notes and a calculator on a study desk"
            width="1600"
            height="1000"
            className="relative w-full rounded-md object-cover shadow-card"
          />
        </div>
      </div>
    </section>
  );
};
