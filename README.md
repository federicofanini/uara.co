# why uara exists

**need a website? hire a broke founder.**

hi 👋 i’m federico. i blew all my money on my medtech startup.  
now i build **clean websites** on a flat monthly subscription.  
fast, simple, funny. revenue is public. (yes, even when it’s €0).

👉 [uara.co](https://uara.co)

---

## 💡 what is this?

a productized dev service, open-sourced because:

- transparency is the brand (code is public too)
- good dev karma (steal my setup, make your own clone)
- also… i can’t afford to gatekeep anyway

---

## ⚡ features

- flat monthly fee (netflix vibes, but i actually ship)
- unlimited requests (1 active at a time — i’m one human, not aws)
- 2–3 day turnaround per task
- full code ownership (repo in _your_ org)
- live transparency page (see how broke i am in real time)

---

## 🛠 tech stack

this repo is basically a startup starter kit:

- [Next.js (App Router)](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Prisma](https://www.prisma.io/)
- [Supabase](https://supabase.com/) (postgres + rls)
- [Stripe Billing](https://stripe.com/) (subscriptions + portal)
- [Resend](https://resend.com/) (emails)
- [Trigger.dev](https://trigger.dev/) (background jobs/webhooks)
- [Vercel](https://vercel.com/) (hosting)

aka: all the buzzwords your indie hacker friends love.

---

## ⚙️ setup

clone + install:

```bash
git clone https://github.com/federicofanini/uara.co
cd uara
bun i
bun dev
```

---

## 🔐 security bits

- stripe webhook signature verification
- supabase row level security (multi-tenant isolation)
- server actions + zod validation
- signed urls for file uploads
- no shady hacks (just memes)

---

## 🤝 contributing

this repo is public for transparency + learning.

PRs are welcome if:

- ✅ you keep the funny tone
- ✅ you improve DX (cleaner code, better perf)
- ❌ you don’t turn this into enterprise bloatware

open an issue, roast my code, or drop a meme.

---

## 📜 license

MIT — use it, remix it, clone it.
if you launch your own version, pls credit uara.co.
(founder karma is real ✨)

---

## 👉 see full transparency →

🌍 links

- site → [uara.co](https://uara.co)
- twitter/x → [@FedericoFan](https://x.com/FedericoFan)
- linkedin → [federico fanini](https://www.linkedin.com/in/federico-fanini/?originalSubdomain=it)

tl;dr: i’m broke, i build websites, and i overshare.
fork, star ⭐, or subscribe if you want me less broke.
