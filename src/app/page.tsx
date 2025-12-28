import Link from "next/link";
import AuthForm from "./componets/AuthForm";

const features = [
  {
    title: "Track shared expenses",
    description:
      "Log group expenses and see who paid what at a glance, with totals updated in real time.",
  },
  {
    title: "Split fairly",
    description:
      "Split by equal shares or custom amounts so everyone knows exactly what they owe.",
  },
  {
    title: "Settle up fast",
    description:
      "Generate a clean settlement plan and close the loop in just a few taps.",
  },
];

const steps = [
  {
    title: "Create a group",
    description: "Start a trip, home, or project group and invite your friends.",
  },
  {
    title: "Add expenses",
    description: "Capture receipts and assign who paid and who benefited.",
  },
  {
    title: "Send settlement",
    description: "Review the summary and settle balances instantly.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
          <div className="text-lg font-semibold tracking-wide">ShareKharch</div>
          <Link
            href="#get-started"
            className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
          >
            Get started
          </Link>
        </div>
      </header>

      <main>
        <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-16 pt-16 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">
              Split expenses together
            </p>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
              The easiest way to manage shared expenses and settle up faster.
            </h1>
            <p className="text-lg text-slate-300">
              ShareKharch helps roommates, trips, and teams log expenses, split
              fairly, and settle balances without spreadsheets.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="#get-started"
                className="rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-emerald-300"
              >
                Start sharing now
              </Link>
              {/* <Link
                href="/inviteFriends"
                className="text-sm font-semibold text-white/80 transition hover:text-white"
              >
                Invite friends
              </Link> */}
            </div>
          </div>
          <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-emerald-500/10">
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-4">
                <p className="text-sm font-semibold text-emerald-300">This month</p>
                <p className="text-2xl font-bold text-white">₹18,750</p>
                <p className="text-xs text-slate-400">Across 12 shared expenses</p>
              </div>
              <div className="space-y-3 rounded-2xl border border-white/10 bg-slate-950/80 p-4 text-sm">
                <div className="flex items-center justify-between text-slate-200">
                  <span>Rent</span>
                  <span className="font-semibold text-white">₹12,000</span>
                </div>
                <div className="flex items-center justify-between text-slate-200">
                  <span>Groceries</span>
                  <span className="font-semibold text-white">₹4,250</span>
                </div>
                <div className="flex items-center justify-between text-slate-200">
                  <span>Utilities</span>
                  <span className="font-semibold text-white">₹2,500</span>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-emerald-400/40 bg-emerald-400/10 p-4 text-sm">
                <span className="text-emerald-200">You are owed</span>
                <span className="text-lg font-semibold text-emerald-100">₹1,320</span>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-slate-950/70 py-16">
          <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-white/10 bg-slate-900/70 p-6"
              >
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 text-sm text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-bold text-white">Simple steps to do it right</h2>
            <p className="mt-3 text-slate-300">
              A clean workflow for every project: create a group, add expenses,
              and settle with clarity.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-6"
              >
                <p className="text-sm font-semibold text-emerald-300">
                  Step {index + 1}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="get-started"
          className="border-t border-white/10 bg-gradient-to-b from-slate-950 to-slate-900 py-16"
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl space-y-4">
              <h2 className="text-3xl font-bold text-white">
                Ready to share expenses with confidence?
              </h2>
              <p className="text-slate-300">
                Create your free account, invite your group, and keep every
                shared cost organized in one place.
              </p>
            </div>
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white p-6 text-slate-900 shadow-xl">
              <h3 className="text-lg font-semibold">Create your account</h3>
              <p className="mt-2 text-sm text-slate-600">
                Sign up in minutes and start splitting instantly.
              </p>
              <div className="mt-6">
                <AuthForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
