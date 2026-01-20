// Portfolio behavior:
// - Theme toggle (dark/light)
// - Language toggle (EN/KH)
// - Cursor glow follow
// - Smooth scroll with header offset
// - Mobile menu toggle
// - Scroll progress bar
// - Reveal on scroll
// - Copy email
// - Matrix background

const I18N = {
  en: {
    "nav.menu": "Menu",
    "nav.home": "Home",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.thesis": "Thesis",
    "nav.uat": "UAT",
    "nav.contact": "Contact",

    "theme.dark": "Dark",
    "theme.light": "Light",

    "hero.kicker": "IT Year 4 • UAT • Thesis in progress",
    "hero.lead":
      "IT student &amp; UAT engineer in training. I test real enterprise systems and build core logic for my thesis: <strong>Domestic Logistic Management System – Cambodia</strong>.",
    "hero.lead2":
      "I care about clean code, reliable systems, and giving users a smooth experience — from login to the last delivery drop.",
    "hero.btnProjects": "View Projects",
    "hero.btnCv": "Download CV (TODO)",
    "hero.meta1": "Based in Cambodia",
    "hero.meta2": "Backend + Testing",
    "hero.meta3": "Open to internships",

    "profile.role": "IT Student • UAT • Junior Backend",
    "profile.desc":
      "Testing billing/HR systems &amp; building logistics tracking for my thesis.",

    "skills.title": "Skills",
    "projects.title": "Featured Projects",
    "thesis.title": "Thesis: Domestic Logistic Management System",
    "uat.title": "UAT Experience",
    "contact.title": "Contact",

    "contact.copy": "📋 Copy email",
    "contact.backTop": "Back to top",

    "footer.tag": "IT Student &amp; UAT",
    "footer.built": "Built with HTML/CSS/JS",
  },
  km: {
    "nav.menu": "ម៉ឺនុយ",
    "nav.home": "ទំព័រដើម",
    "nav.skills": "ជំនាញ",
    "nav.projects": "គម្រោង",
    "nav.thesis": "ស្រាវជ្រាវ",
    "nav.uat": "UAT",
    "nav.contact": "ទំនាក់ទំនង",

    "theme.dark": "ងងឹត",
    "theme.light": "ភ្លឺ",

    "hero.kicker": "ឆ្នាំទី 4 IT • UAT • កំពុងធ្វើកិច្ចការស្រាវជ្រាវ",
    "hero.lead":
      "និស្សិត IT និងធ្វើការជា UAT។ ខ្ញុំបានទៅសាកល្បងប្រព័ន្ធក្រុមហ៊ុនពិតជាក់ស្តែង និងចាប់ផ្តើមសរសេរ core logic សម្រាប់កិច្ចការស្រាវជ្រាវរបស់ខ្ញុំ៖ <strong>Domestic Logistic Management System – Cambodia</strong>។",
    "hero.lead2":
      "ខ្ញុំផ្តោតទៅលើ រចនាសម្ព័ន្ធរបស់កូដ, ប្រព័ន្ធដែលអាចទុកចិត្តបាន និងបទពិសោធន៍របស់អ្នកប្រើរលូនល្អ — ចាប់ពីពេលចូលប្រើប្រាស់រហូត ដល់ការដឹកជញ្ជូនចុងក្រោយ។",
    "hero.btnProjects": "មើលគម្រោង",
    "hero.btnCv": "ទាញយក ប្រវត្តិរូប (TODO)",
    "hero.meta1": "នៅក្នុង ព្រះរាជាណាចក្រកម្ពុជា",
    "hero.meta2": "Backend + Testing",
    "hero.meta3": "បើកទទួល ការងារហាត់ការ",

    "profile.role": "និស្សិត IT • UAT • Backend (ចាប់ផ្តើម)",
    "profile.desc":
      "ធ្វើតេស្តប្រព័ន្ធ Billing/HR និងបង្កើត logistics tracking សម្រាប់កិច្ចការស្រាវជ្រាវ។",

    "skills.title": "ជំនាញ",
    "projects.title": "គម្រោងសំខាន់ៗ",
    "thesis.title": "កិច្ចការស្រាវជ្រាវ៖ ប្រព័ន្ធគ្រប់គ្រងដឹកជញ្ជូនក្នុងស្រុក",
    "uat.title": "បទពិសោធន៍ UAT",
    "contact.title": "ទំនាក់ទំនង",

    "contact.copy": "📋 ចម្លងអ៊ីមែល",
    "contact.backTop": "ត្រឡប់ទៅលើ",

    "footer.tag": "និស្សិត IT &amp; UAT",
    "footer.built": "បង្កើតដោយភាសា HTML/CSS/JS",
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const header = document.querySelector(".header");
  const themeToggle = document.querySelector("#themeToggle");
  const themeLabel = document.querySelector("#themeLabel");
  const langToggle = document.querySelector("#langToggle");
  const langLabel = document.querySelector("#langLabel");
  const toTop = document.querySelector("#toTop");
  const emailBtn = document.querySelector("#copyEmail");
  const emailText = document.querySelector("#emailText");
  const year = document.getElementById("year");

  const menuToggle = document.getElementById("menuToggle");
  const navlinks = document.getElementById("navlinks");

  // Year
  if (year) year.textContent = String(new Date().getFullYear());

  // Language
  let lang = localStorage.getItem("lang") || "en";
  if (!I18N[lang]) lang = "en";

  function applyI18n() {
    const dict = I18N[lang] || I18N.en;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const val = dict[key];
      if (typeof val === "string") el.innerHTML = val;
    });
    if (langLabel) langLabel.textContent = lang === "km" ? "ខ្មែរ" : "English";
    updateThemeLabel();
  }

  langToggle?.addEventListener("click", () => {
    lang = lang === "en" ? "km" : "en";
    localStorage.setItem("lang", lang);
    applyI18n();
  });

  // Theme
  const storedTheme = localStorage.getItem("theme");
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  setTheme(storedTheme || (prefersDark ? "dark" : "light"));

  function setTheme(mode) {
    root.setAttribute("data-theme", mode);
    localStorage.setItem("theme", mode);
    updateThemeLabel();
  }

  function updateThemeLabel() {
    if (!themeLabel) return;
    const mode = root.getAttribute("data-theme") || "dark";
    const dict = I18N[lang] || I18N.en;
    themeLabel.textContent =
      mode === "dark" ? dict["theme.dark"] : dict["theme.light"];
  }

  themeToggle?.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "dark";
    setTheme(current === "dark" ? "light" : "dark");
  });

  // Apply i18n once at start
  applyI18n();

  // Mobile menu
  function closeMenu() {
    if (!navlinks || !menuToggle) return;
    navlinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  menuToggle?.addEventListener("click", () => {
    if (!navlinks) return;
    const isOpen = navlinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navlinks || !menuToggle) return;
    const t = e.target;
    if (!(t instanceof Element)) return;
    if (!navlinks.classList.contains("open")) return;
    if (navlinks.contains(t) || menuToggle.contains(t)) return;
    closeMenu();
  });

  // Cursor glow
  function setGlow(x, y) {
    root.style.setProperty("--mx", x + "px");
    root.style.setProperty("--my", y + "px");
  }
  window.addEventListener("pointermove", (e) => setGlow(e.clientX, e.clientY), {
    passive: true,
  });

  // Smooth anchor scroll with header offset
  function scrollToId(id) {
    const target = document.getElementById(id);
    if (!target) return;

    const headerH = header?.offsetHeight || 0;
    const y =
      target.getBoundingClientRect().top + window.pageYOffset - headerH - 12;

    window.scrollTo({ top: y, behavior: "smooth" });
  }

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href") || "";
      const id = href.slice(1);
      if (!id) return;

      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      closeMenu();
      history.pushState(null, "", "#" + id);
      setActiveNav(id);
      scrollToId(id);
    });
  });

  // Header active tab (scroll-spy)
  const navAnchors = Array.from(
    document.querySelectorAll(".navlinks a[href^='#']"),
  );
  const sectionIds = navAnchors
    .map((a) => (a.getAttribute("href") || "").slice(1))
    .filter(Boolean);

  function setActiveNav(id) {
    navAnchors.forEach((a) => {
      const aid = (a.getAttribute("href") || "").slice(1);
      const isActive = aid === id;
      a.classList.toggle("active", isActive);
      if (isActive) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }
  function updateActiveNav() {
    const headerH = header?.offsetHeight || 0;

    const sections = Array.from(document.querySelectorAll("main section[id]"));
    if (!sections.length) return;

    // If user is near the bottom of the page, force the last section active
    // (important when the last section is shorter than the viewport).
    const scrollBottom = window.scrollY + window.innerHeight;
    const docH = document.documentElement.scrollHeight;
    if (docH - scrollBottom < 6) {
      setActiveNav(sections[sections.length - 1].id);
      return;
    }

    // Probe point just under the sticky header
    const probeY = headerH + 48;

    let current = sections[0].id;
    for (const sec of sections) {
      const r = sec.getBoundingClientRect();

      // If the probe line is inside this section, it's the active one
      if (r.top <= probeY && r.bottom > probeY) {
        current = sec.id;
        break;
      }

      // Fallback: keep the last section we've already passed
      if (r.top <= probeY) current = sec.id;
    }

    setActiveNav(current);
  }

  // Throttle scroll-spy
  let spyTicking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (spyTicking) return;
      spyTicking = true;
      requestAnimationFrame(() => {
        updateActiveNav();
        spyTicking = false;
      });
    },
    { passive: true },
  );

  // If opened with a hash, align it with offset after layout
  if (location.hash && location.hash.length > 1) {
    const id = location.hash.slice(1);
    setTimeout(() => scrollToId(id), 90);
    setTimeout(() => setActiveNav(id), 90);
  }

  // Initial active state
  setTimeout(() => {
    const initial = (location.hash || "#home").slice(1);
    setActiveNav(initial || "home");
    updateActiveNav();
  }, 140);

  // Scrollbar + back-to-top
  window.addEventListener("scroll", () => {
    const s = window.scrollY;
    const h = document.body.scrollHeight - window.innerHeight;
    const pct = h > 0 ? (s / h) * 100 : 0;
    root.style.setProperty("--scroll", pct + "%");

    if (toTop) {
      if (s > 320) toTop.classList.add("show");
      else toTop.classList.remove("show");
    }
  });

  toTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Reveal
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 },
    );
    reveals.forEach((el) => obs.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  // Copy email
  if (emailBtn && emailText) {
    const email = emailText.textContent.trim();
    emailBtn.addEventListener("click", async () => {
      if (!email) return;
      try {
        await navigator.clipboard.writeText(email);
        const old = emailBtn.textContent;
        emailBtn.textContent = lang === "km" ? "បានចម្លង ✅" : "Copied ✅";
        setTimeout(() => (emailBtn.textContent = old), 1200);
      } catch {
        window.prompt(lang === "km" ? "ចម្លងអ៊ីមែល:" : "Copy email:", email);
      }
    });
  }

  // Matrix
  initMatrix();
});

function initMatrix() {
  const canvas = document.getElementById("matrix");
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext("2d");
  let width, height, columns, drops, speeds;

  // Higher density: smaller font + tighter columns + varied speeds
  const fontSize = 10;
  const colW = 10;
  const rowH = 12;
  const chars =
    "01<>[]{}$#@%+=-*/ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    columns = Math.max(10, Math.floor(width / colW));
    drops = Array.from(
      { length: columns },
      () => Math.random() * (height / rowH),
    );
    speeds = Array.from({ length: columns }, () => 0.75 + Math.random() * 1.75);
  }

  resize();
  window.addEventListener("resize", resize);

  function draw() {
    const theme = document.documentElement.getAttribute("data-theme") || "dark";

    // Slightly less fade = longer trails (more "capacity")
    ctx.fillStyle =
      theme === "light" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.045)";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle =
      theme === "light" ? "rgba(34,197,94,0.68)" : "rgba(34,197,94,0.95)";
    ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      const x = i * colW;
      const y = drops[i] * rowH;
      ctx.fillText(text, x, y);

      // Extra glyph sometimes to increase density
      if (Math.random() > 0.45) {
        const t2 = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(t2, x, y - rowH);

        // Occasionally add a third glyph to make the rain feel more dense
        if (Math.random() > 0.85) {
          const t3 = chars.charAt(Math.floor(Math.random() * chars.length));
          ctx.fillText(t3, x, y - rowH * 2);
        }
      }

      if (y > height && Math.random() > 0.92) {
        drops[i] = 0;
        speeds[i] = 0.75 + Math.random() * 1.75;
      }
      drops[i] += speeds[i];
    }

    requestAnimationFrame(draw);
  }

  draw();
}
