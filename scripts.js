/* LHFF — Smooth UX scripts
   Stagger fade-in, scroll progress bar, NAVID FAB, year stamp, newsletter
*/

// Stagger fade-in observer
(() => {
  const els = document.querySelectorAll(".fade-in");
  if (!("IntersectionObserver" in window) || !els.length) {
    els.forEach(el => el.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        // honor data-delay if explicitly set, else apply position-based stagger
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });
  els.forEach(el => io.observe(el));
})();

// Auto-stagger sibling reveals inside grids without manual delays
(() => {
  const groups = document.querySelectorAll(
    ".pillar-tiles, .program-spread, .built-grid, .cta-tiles, .ecosystem"
  );
  groups.forEach((group) => {
    const kids = Array.from(group.children);
    kids.forEach((kid, i) => {
      kid.style.transition = "opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1)";
      kid.style.transitionDelay = `${Math.min(i * 80, 400)}ms`;
      kid.style.opacity = "0";
      kid.style.transform = "translateY(16px)";
    });
    if (!("IntersectionObserver" in window)) {
      kids.forEach(k => { k.style.opacity = "1"; k.style.transform = "none"; });
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          kids.forEach(k => { k.style.opacity = "1"; k.style.transform = "none"; });
          io.disconnect();
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    io.observe(group);
  });
})();

// Scroll progress bar (top of page)
(() => {
  const bar = document.createElement("div");
  bar.className = "scroll-progress";
  document.body.appendChild(bar);
  let ticking = false;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    bar.style.width = `${pct}%`;
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
  update();
})();

// Year stamp
(() => {
  const y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();

// NAVID FAB is wired further below in the NAVID Chat Modal block.

// ─── Mobile nav drawer ─────────────────────────────────────
// Combines left + right nav menus into a single mobile drawer.
// Toggle opens/closes; clicking any link or pressing Esc closes.
(() => {
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav__toggle");
  if (!nav || !toggle) return;

  // Build the drawer with cloned links (so original nav remains for desktop)
  const drawer = document.createElement("div");
  drawer.className = "nav__drawer";
  drawer.hidden = true;

  const close = () => {
    nav.classList.remove("is-open");
    drawer.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "☰"; // hamburger
    toggle.setAttribute("aria-label", "Open menu");
    document.body.style.overflow = "";
  };
  const open = () => {
    nav.classList.add("is-open");
    drawer.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    toggle.textContent = "✕"; // close (x)
    toggle.setAttribute("aria-label", "Close menu");
    document.body.style.overflow = "hidden";
  };

  // Clone every .nav__link into the drawer, preserving order
  nav.querySelectorAll(".nav__menu-left .nav__link, .nav__menu-right .nav__link").forEach(a => {
    const clone = a.cloneNode(true);
    clone.classList.add("nav__drawer-link");
    clone.classList.remove("nav__link");
    clone.addEventListener("click", () => {
      // small delay so anchor scroll fires before drawer closes
      setTimeout(close, 50);
    });
    drawer.appendChild(clone);
  });

  nav.appendChild(drawer);

  toggle.addEventListener("click", () => {
    nav.classList.contains("is-open") ? close() : open();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) close();
  });
})();

// ─── Contact form (visitor leaves details, Foundation comes back) ──
// Stores locally for now (no backend wired). Replaces the placeholder alert.
(() => {
  const form = document.getElementById("lhffContactForm");
  if (!form) return;
  const thanks = document.getElementById("lhffContactThanks");
  const STORAGE_KEY = "lhff:contact:submissions";

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const entry = {
      name: (data.get("name") || "").toString().trim(),
      organisation: (data.get("organisation") || "").toString().trim(),
      email: (data.get("email") || "").toString().trim(),
      phone: (data.get("phone") || "").toString().trim(),
      reason: (data.get("reason") || "").toString().trim(),
      message: (data.get("message") || "").toString().trim(),
      submittedAt: new Date().toISOString(),
    };
    if (!entry.name || !entry.email || !entry.reason || !entry.message) return;

    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      existing.push(entry);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    } catch (err) { /* localStorage may be unavailable; fail silently */ }

    // Hide all form controls, show thanks
    form.querySelectorAll("label, button").forEach(el => el.style.display = "none");
    if (thanks) thanks.hidden = false;
  });
})();

// Newsletter
(() => {
  const form = document.querySelector(".footer__newsletter");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector("input");
    const btn = form.querySelector("button");
    if (input && input.value && btn) {
      const original = btn.textContent;
      btn.textContent = "Thanks";
      input.value = "";
      setTimeout(() => { btn.textContent = original; }, 2500);
    }
  });
})();

// Email capture modal
(() => {
  const modal = document.getElementById("emailModal");
  if (!modal) return;
  const STORAGE_KEY = "lhff:email-modal:v1";
  const form = document.getElementById("emailModalForm");
  const thanksNote = document.getElementById("emailModalThanks");

  const dismiss = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    try { localStorage.setItem(STORAGE_KEY, "dismissed"); } catch (e) {}
  };

  const open = () => {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  };

  // Skip if already dismissed or subscribed this session/persisted
  let stored = null;
  try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) {}
  if (stored) return;

  // Show after a small delay so it doesn't feel intrusive
  setTimeout(open, 1800);

  // Dismiss handlers
  modal.querySelectorAll("[data-dismiss-modal]").forEach(el => {
    el.addEventListener("click", dismiss);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) dismiss();
  });

  // Form submit (frontend only — no backend wiring yet)
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    const email = (data.get("email") || "").toString().trim();
    if (!name || !email || !/^\S+@\S+\.\S+$/.test(email)) {
      const firstInvalid = form.querySelector("input:invalid") || form.querySelector("input");
      firstInvalid?.focus();
      return;
    }
    // Store locally; backend wiring later
    try {
      localStorage.setItem(STORAGE_KEY, "subscribed");
      localStorage.setItem(STORAGE_KEY + ":data", JSON.stringify({ name, email, at: Date.now() }));
    } catch (e) {}
    if (thanksNote) thanksNote.hidden = false;
    setTimeout(() => { dismiss(); }, 1600);
  });
})();

// Smooth-scroll for in-page anchor links
(() => {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 24;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
})();

/* ============================================================
   NAVID — Foundation AI companion
   ============================================================
   System prompt is held server-side at /api/navid (Wesley wires
   that to OpenAI / Anthropic / Claude when ready). Until then,
   the client falls back to a rule-based responder that holds the
   tone and structure from the Lovable framework.

   API contract (when wired):
     POST /api/navid
     { user: {name, role, status}, history: [...], message: "..." }
     ↓
     { reply: "..." }
   ============================================================ */
(() => {
  const root = document.getElementById("navidChat");
  if (!root) return;

  const STORAGE_USER = "lhff:navid:user";
  const STORAGE_MSGS = "lhff:navid:messages";

  const intake = root.querySelector("#navidIntake");
  const intakeForm = root.querySelector("#navidIntakeForm");
  const body = root.querySelector("#navidChatBody");
  const composer = root.querySelector("#navidComposer");
  const input = root.querySelector("#navidInput");
  const starters = root.querySelector("#navidStarters");
  const resetBtn = root.querySelector("#navidReset");

  const loadUser = () => {
    try { return JSON.parse(localStorage.getItem(STORAGE_USER) || "null"); }
    catch (e) { return null; }
  };
  const saveUser = (u) => {
    try { localStorage.setItem(STORAGE_USER, JSON.stringify(u)); } catch (e) {}
  };
  const loadMessages = () => {
    try { return JSON.parse(localStorage.getItem(STORAGE_MSGS) || "[]"); }
    catch (e) { return []; }
  };
  const saveMessages = (m) => {
    try { localStorage.setItem(STORAGE_MSGS, JSON.stringify(m)); } catch (e) {}
  };

  let user = loadUser();
  let messages = loadMessages();

  // ─── Open / close ─────────────────────────────────────────
  const open = () => {
    root.classList.add("is-open");
    root.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-modal-open");
    // Re-check gate on every open. A previously-stored non-allowed user
    // should hit the gate again — they don't get grandfathered in.
    if (user) {
      const allowed = user.status === "booked" || user.status === "alumni";
      if (allowed) {
        showChat();
      } else {
        showGate(user);
      }
    } else {
      showIntake();
    }
    setTimeout(() => {
      const t = (user && (user.status === "booked" || user.status === "alumni"))
        ? input
        : intakeForm.querySelector("input[name='name']");
      t?.focus();
    }, 60);
  };

  const close = () => {
    root.classList.remove("is-open");
    root.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-modal-open");
  };

  document.querySelectorAll("[data-navid-open], [data-navid-close]").forEach(el => {
    if (el.matches("[data-navid-close]")) {
      el.addEventListener("click", close);
    } else {
      el.addEventListener("click", (e) => { e.preventDefault(); open(); });
    }
  });

  root.addEventListener("click", (e) => {
    if (e.target === root) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && root.classList.contains("is-open")) close();
  });

  // ─── Render ───────────────────────────────────────────────
  const showIntake = () => {
    intake.hidden = false;
    composer.hidden = true;
    starters.hidden = true;
    resetBtn.hidden = true;
  };

  const showChat = () => {
    intake.hidden = true;
    composer.hidden = false;
    resetBtn.hidden = false;
    renderMessages();
    if (messages.length === 0) {
      // Greet new user, show starters — calibrated to their status
      const firstName = (user.name || "").split(" ")[0] || "friend";
      const status = user.status || "curious";
      const greetings = {
        curious: `Hi ${firstName}, I'm Navid. I sit alongside the Foundation as a kind of companion. Ask me anything, or just say what's on your mind today.`,
        considering: `Hi ${firstName}, I'm Navid. Whether you end up at one of our retreats or not, I'm here to think out loud with you. How are you arriving today?`,
        booked: `Hi ${firstName}, I'm Navid — your companion through the retreat journey. How are you arriving today?`,
        alumni: `Hi ${firstName}, welcome back. It's good to hear from you. How have things been settling since the retreat?`,
        other: `Hi ${firstName}, I'm Navid. Tell me what brought you here today.`,
      };
      pushMessage("navid", greetings[status] || greetings.curious);
      starters.hidden = false;
    } else {
      starters.hidden = true;
    }
  };

  const renderMessages = () => {
    // Clear everything except intake
    [...body.children].forEach(c => { if (c !== intake) c.remove(); });
    messages.forEach(m => body.appendChild(buildBubble(m.role, m.content)));
    body.scrollTop = body.scrollHeight;
  };

  const buildBubble = (role, content) => {
    const wrap = document.createElement("div");
    wrap.className = `navid-msg navid-msg--${role}`;
    const av = document.createElement("div");
    av.className = `navid-msg__avatar navid-msg__avatar--${role}`;
    av.textContent = role === "navid" ? "N" : (user?.name?.[0]?.toUpperCase() || "Y");
    const bubble = document.createElement("div");
    bubble.className = "navid-msg__bubble";
    // Simple markdown: paragraphs + bullets
    bubble.innerHTML = formatContent(content);
    wrap.appendChild(av);
    wrap.appendChild(bubble);
    return wrap;
  };

  const escapeHtml = (s) => s.replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

  const formatContent = (text) => {
    const safe = escapeHtml(text);
    // Bullet list if lines start with "- "
    const lines = safe.split("\n");
    let html = "";
    let inList = false;
    for (const line of lines) {
      if (/^\s*[-•]\s+/.test(line)) {
        if (!inList) { html += "<ul>"; inList = true; }
        html += `<li>${line.replace(/^\s*[-•]\s+/, "")}</li>`;
      } else {
        if (inList) { html += "</ul>"; inList = false; }
        if (line.trim()) html += `<p>${line}</p>`;
      }
    }
    if (inList) html += "</ul>";
    return html || `<p>${safe}</p>`;
  };

  const pushMessage = (role, content) => {
    messages.push({ role, content, at: Date.now() });
    saveMessages(messages);
    body.appendChild(buildBubble(role, content));
    body.scrollTop = body.scrollHeight;
  };

  const showTyping = () => {
    const wrap = document.createElement("div");
    wrap.className = "navid-typing";
    wrap.id = "navidTyping";
    wrap.innerHTML = `
      <div class="navid-msg__avatar navid-msg__avatar--navid">N</div>
      <div class="navid-typing__bubble">
        <span class="navid-typing__dot"></span>
        <span class="navid-typing__dot"></span>
        <span class="navid-typing__dot"></span>
      </div>`;
    body.appendChild(wrap);
    body.scrollTop = body.scrollHeight;
  };
  const hideTyping = () => {
    document.getElementById("navidTyping")?.remove();
  };

  // ─── Intake submit ────────────────────────────────────────
  // GATING: NAVID is only available to booked retreat guests + Foundation members (alumni).
  // Curious / considering / other → shown a gate panel directing them to apply or contact us.
  intakeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(intakeForm);
    const u = {
      name: (data.get("name") || "").toString().trim(),
      role: (data.get("role") || "").toString().trim(),
      status: (data.get("status") || "curious").toString(),
      createdAt: Date.now(),
    };
    if (!u.name) {
      intakeForm.querySelector("input[name='name']").focus();
      return;
    }

    const allowed = u.status === "booked" || u.status === "alumni";
    if (!allowed) {
      showGate(u);
      return;
    }

    user = u;
    saveUser(user);
    showChat();
  });

  // ─── Gate panel for non-members ───────────────────────────
  function showGate(u) {
    intake.hidden = true;
    // Clear any prior content
    [...body.children].forEach(c => { if (c !== intake) c.remove(); });

    const gate = document.createElement("div");
    gate.className = "navid-chat__gate";
    const firstName = (u.name || "").split(" ")[0];
    const greet = firstName ? `Hi ${firstName}.` : "Hi.";
    gate.innerHTML = `
      <div class="navid-chat__gate-inner">
        <span class="navid-chat__gate-label">Members &amp; retreat guests only</span>
        <h3 class="navid-chat__gate-title">${greet}<br/>NAVID is part of the <em>retreat experience</em>.</h3>
        <p class="navid-chat__gate-body">NAVID is currently available to people attending a retreat or active Foundation members. If you'd like to attend a retreat or join the Foundation, the doors below open the right path.</p>
        <div class="navid-chat__gate-actions">
          <a class="btn btn--purple" href="get-involved.html#apply">Apply for a retreat</a>
          <a class="btn btn--ghost-dark" href="contact.html">Send us a message</a>
        </div>
        <button type="button" class="navid-chat__gate-back" id="navidGateBack">← Choose a different status</button>
      </div>
    `;
    body.appendChild(gate);
    const back = gate.querySelector("#navidGateBack");
    if (back) back.addEventListener("click", () => {
      gate.remove();
      intake.hidden = false;
      intakeForm.querySelector("input[name='name']").focus();
    });
  }

  // ─── Send message ─────────────────────────────────────────
  const send = async (text) => {
    const t = text.trim();
    if (!t) return;
    // Count user messages BEFORE we push the new one — gives us the index of this incoming message
    const userMsgIndex = messages.filter(m => m.role === "user").length;
    pushMessage("user", t);

    // Progressive intake: capture key context into the user profile as the conversation deepens
    user.profile = user.profile || {};
    if (userMsgIndex === 0 && !user.profile.arrival) user.profile.arrival = t;
    if (userMsgIndex === 1 && !user.profile.reason) user.profile.reason = t;
    if (userMsgIndex === 4 && !user.profile.experience) user.profile.experience = t;
    saveUser(user);

    starters.hidden = true;
    input.value = "";
    autoSize();
    showTyping();
    try {
      const reply = await getReply(t, userMsgIndex);
      hideTyping();
      pushMessage("navid", reply);
    } catch (err) {
      hideTyping();
      pushMessage("navid", "Something on my end went quiet for a moment. Could you say that again?");
    }
  };

  composer.addEventListener("submit", (e) => {
    e.preventDefault();
    send(input.value);
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input.value);
    }
  });

  const autoSize = () => {
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 120) + "px";
  };
  input.addEventListener("input", autoSize);

  // Starter chips
  starters.querySelectorAll("[data-navid-starter]").forEach(btn => {
    btn.addEventListener("click", () => send(btn.textContent));
  });

  // Reset
  resetBtn.addEventListener("click", () => {
    if (!confirm("Clear our conversation? Your name and details will stay.")) return;
    messages = [];
    saveMessages(messages);
    showChat();
  });

  // ─── Get reply (API first, then fallback) ─────────────────
  const getReply = async (message, userMsgIndex = 0) => {
    // Try API endpoint (Wesley wires this up later)
    try {
      const res = await fetch("/api/navid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, history: messages.slice(-12), message }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.reply) return data.reply;
      }
    } catch (e) {
      // No backend yet — fall through to local responder
    }
    // Slight delay so the typing indicator reads naturally
    await new Promise(r => setTimeout(r, 700 + Math.random() * 600));
    let reply = localResponder(message);

    // Progressive intake: weave a soft deepening question into Navid's reply at strategic moments.
    // Only appends if the response doesn't already end with a question (to avoid stacking).
    const needsDeepening = (idx) => idx === 0 || idx === 3;
    const endsWithQuestion = /\?\s*$/.test(reply.trim());
    if (needsDeepening(userMsgIndex)) {
      const followUps = {
        0: [
          "Before we go further, what's bringing you here today?",
          "Tell me, what brought you to the Foundation in the first place?",
          "What's the bigger thing on your mind right now?",
        ],
        3: [
          "Something I'd love to know: have you sat with anything spiritual or contemplative before, or is this new ground for you?",
          "Quick one. Have you done any of this kind of inner work before, or is this all new?",
          "Curious: what's your experience been with practices like meditation or breathwork?",
        ],
      };
      const pick = followUps[userMsgIndex];
      const q = pick[Math.floor(Math.random() * pick.length)];
      // If Navid already ended in a question, replace it with the deepening one to keep the reply tight.
      if (endsWithQuestion) {
        reply = reply.replace(/[^.!?]+\?\s*$/, "").trim() + " " + q;
      } else {
        reply = reply + "\n\n" + q;
      }
    }

    return reply;
  };

  // ─── Local rule-based responder ───────────────────────────
  // Lightweight pattern matcher that holds Navid's tone:
  // 2-4 sentences, ends with a soft question, nature/wisdom metaphors.
  // Uses user.profile + status to calibrate responses for retreat or non-retreat visitors.
  function localResponder(text) {
    const t = text.toLowerCase();
    const name = (user?.name || "").split(" ")[0];
    const namePart = name ? `${name}, ` : "";
    const profile = user?.profile || {};
    const role = (user?.role || "").toLowerCase();
    const status = user?.status || "curious";

    // Audience flags — drives whether retreat language is used
    const isRetreatAudience = status === "booked" || status === "considering";
    const isAlumni = status === "alumni";

    // Calibration helpers
    const isBeginner = /(new|first|never|don'?t|haven'?t|nothing)/i.test(profile.experience || "");
    const isExperienced = /(years|practice|deep|trained|teacher|already|been doing)/i.test(profile.experience || "");

    // Light reference to what we already know about them — used selectively
    const reasonRef = profile.reason && profile.reason.length < 90
      ? ` Given what you shared earlier, that fits.`
      : "";

    // Difficult emotions — empathy first, no journey assumption
    if (/(anxious|anxiety|nervous|scared|afraid|fear|panic)/.test(t)) {
      const opts = [
        `${namePart}anxiety often shows up loudest when something matters. What part of it feels heaviest right now?`,
        `Heard.${reasonRef} Fear is usually pointing at something that matters to you. What's the story underneath it?`,
        `Take a slow breath with me. Four in, hold seven, eight out. Try it once and tell me what you notice in your body.`,
      ];
      // Leader-tailored option (works for any visitor, not just retreat)
      if (/(founder|ceo|exec|leader|lead\b|director|owner|build|run)/.test(role)) {
        opts.push(`${namePart}people who carry teams often carry anxiety alone because they don't have a place to put it down. This is one of those places. What's underneath it for you?`);
      }
      // Retreat-specific only if relevant
      if (isRetreatAudience) {
        opts.push(`Fear before a journey like this is a sign you're taking it seriously. What's the story underneath?`);
      }
      return pickOne(opts);
    }
    if (/(sad|grief|lonely|alone|empty|depressed|down)/.test(t)) {
      return pickOne([
        `${namePart}that sounds heavy. Whatever's there is allowed to be there. What's it asking from you right now?`,
        `I'm here. Sometimes sadness is grief that hasn't been named yet. What feels closest to the surface?`,
      ]);
    }
    if (/(angry|frustrated|annoyed|rage)/.test(t)) {
      return `Anger is information. It's usually pointing at something we care about that feels violated. Want to look at what's underneath it together?`;
    }

    // ── Specific life topics (run BEFORE generic emotion matchers like stuck/lost) ──
    // Grief / loss — runs FIRST so "grandfather passed away" doesn't get caught by family matcher
    if (/(died|passed away|funeral|grief|grieving|\bloss\b|lost (my|him|her|them|someone|a))/.test(t)) {
      return `${namePart}I'm sorry for the loss. Grief moves at its own pace and rarely the one we want. What's been hardest to feel?`;
    }
    // Relationships
    if (/(partner|husband|wife|girlfriend|boyfriend|spouse|relationship|breakup|broke up|divorce|left me|cheated)/.test(t)) {
      return `${namePart}I'm sorry. Relationships are where most of our growth shows up, and where most of our wounds do too. What's the part of it that's loudest for you right now?`;
    }
    // Family — word boundaries so "grandfather" / "grandmother" don't false-trigger
    if (/(\bfamily\b|\bmother\b|\bfather\b|\bmom\b|\bdad\b|\bparents?\b|\bsister\b|\bbrother\b|\bkids\b|\bchild(ren)?\b)/.test(t)) {
      return `Family is layered. Old dynamics, current ones, all running at once. What's the part you'd most like to put down?`;
    }
    // Work overwhelm
    if (/(deadline|pressure|workload|overwhelmed|too much|can'?t cope|swamped)/.test(t)) {
      return `${namePart}overwhelm is usually a signal that the boundary needs to move, not that you need to push harder. What's one thing on your plate that isn't actually yours to hold?`;
    }
    // Difficult work people / conversations
    if (/(\bboss\b|\bmanager\b|\bcolleague\b|\bcoworker\b|team conflict|difficult conversation|\bhr issue\b)/.test(t)) {
      return `Hard work conversations are mostly hard because of what they activate inside us, not because of the other person. What's the conversation you've been avoiding, and what would you say if it cost you nothing?`;
    }
    // Imposter / self-doubt
    if (/(imposter|not enough|not good enough|fake it|fraud|don'?t deserve|self.?doubt|second.?guess)/.test(t)) {
      return `${namePart}imposter feelings tend to peak when you're growing into something bigger than your old story of yourself. The story is the outdated thing, not you. What's the new story trying to form?`;
    }
    // Big decisions / transitions
    if (/(should i|big decision|deciding|career change|leave my job|\bquit\b|moving country|new chapter|career pivot)/.test(t)) {
      return `Big decisions usually already know the answer. The work is accepting the answer the body has been pointing toward. What does your gut keep coming back to?`;
    }

    // Generic stuck / lost — runs only if no specific topic matched
    if (/(stuck|lost|don'?t know|confused|uncertain)/.test(t)) {
      return `${namePart}stuck is honest. It usually means a part of you is ready to move and another part isn't sure where.${reasonRef} What would honest look like for you in this moment?`;
    }
    if (/(burn(ed)?\s?out|exhausted|tired|drained)/.test(t)) {
      const leaderTouch = /(founder|ceo|exec|leader|director|owner|build|company|team)/.test(role + " " + (profile.reason || ""))
        ? ` The work doesn't pause, but you can.`
        : "";
      return `${namePart}burnout is the body asking for the boundary the mind didn't set.${leaderTouch} What's one thing you've been carrying that isn't yours to hold?`;
    }

    // Schedule — calibrated to whether they're attending or curious
    if (/(schedule|day|days|monday|tuesday|wednesday|thursday|friday|sunday|six.?day|6.?day|what.?s on)/.test(t)) {
      if (isRetreatAudience || isAlumni) {
        return `The retreat is six days. Sunday is arrival, purpose and spiritual alignment. Monday is emotional intelligence and the first ceremony. Tuesday is leadership and the second ceremony. Wednesday goes deeper, with the third ceremony. Thursday is practical application and the fire circle. Friday is closing and departure. Anything in particular drawing your attention?`;
      }
      return `Our retreats run six days at the villa in Cape Town. Day one is arrival and intentions. Days two through four are the deeper work, with three ceremonies woven in. Day five is integration and a fire circle. Day six is closing. What's drawing you to ask about the structure?`;
    }

    // Ceremony preparation — handle non-attendees gently, calibrate for experience
    if (/(prepare|preparation|ceremony|plant medicine|medicine)/.test(t)) {
      if (!isRetreatAudience && !isAlumni) {
        return `If you're not at a retreat, ceremony isn't really something I'd guide you toward. It's a contained, supported experience for a reason. That said, the preparation work that happens before ceremony is useful for anyone: slowing down, eating lighter, sitting quietly, paying attention to what you're carrying. What's drawing you to ask?`;
      }
      if (isBeginner) {
        return `${namePart}if this is new ground for you, the most useful preparation is the simplest one. Slow down. Eat lighter than usual this week. Sleep more. Sit quietly with yourself for ten minutes a day, even if it feels strange. The rest happens at the villa. What feels most uncertain about it for you?`;
      }
      if (isExperienced) {
        return `You've walked into rooms like this before, so you know the work. Preparation here is less about technique and more about intention. What are you carrying in that you're hoping to put down?`;
      }
      return `Preparation begins long before you arrive. It starts in stillness. Eat lighter, sleep more, sit quietly with yourself this week. The medicine opens the door. What you bring to it shapes what walks through. Have you had time to slow down at all this week?`;
    }

    // Emotional intelligence
    if (/(emotional intelligence|\bei\b|self.?aware|self.?regulat|empathy|social skills)/.test(t)) {
      return `Emotional intelligence is the ability to recognise what you're feeling, manage it without it managing you, and stay connected to people in the process. Five parts: self-awareness, self-regulation, motivation, empathy, social skills. Which one feels most relevant for you right now?`;
    }

    // Amygdala / reactivity
    if (/(amygdala|hijack|react|trigger|impulse|short fuse)/.test(t)) {
      return `When the amygdala takes over, the thinking brain goes offline. The fix is small and physical: a long, slow exhale. Try four in, seven hold, eight out, twice through. What usually triggers that hijack for you?`;
    }

    // Integration — calibrate for retreat alumni vs general
    if (/(integrat|after retreat|come home|process)/.test(t)) {
      if (isAlumni || isRetreatAudience) {
        return `Integration is where the real work lives. The ceremony opens the door. Integration walks you through it. Slow mornings, journaling, breathwork, walks, conversations like this one. What's been hardest to come back to?`;
      }
      return `Integration is the word for the part where the lesson actually becomes the life. It works for anything intense, not just retreats. A hard conversation, a loss, a decision. What are you trying to integrate right now?`;
    }

    // Breathwork / meditation — works for anyone
    if (/(breath|breathwork|breathe|meditat|mindful|present)/.test(t)) {
      return `One I lean on most: 4-7-8. Inhale through the nose for four, hold for seven, exhale through the mouth for eight. Three rounds resets the nervous system. Want to try it together right now?`;
    }
    if (/(yoga|movement|body)/.test(t)) {
      const yogaIntro = (isRetreatAudience || isAlumni)
        ? `Mornings on retreat begin with yoga at One Flow in Cape Town. The body needs to be in the room before the mind can settle.`
        : `The body needs to be in the room before the mind can really settle. Movement is one of the fastest ways to shift state.`;
      return `${yogaIntro} How does your body feel today, on a scale of stuck to open?`;
    }

    // (relationship / family / work / imposter / decisions / grief moved up — see specific life topics block)

    // Purpose
    if (/(purpose|meaning|calling|why am i)/.test(t)) {
      return `Purpose has three layers we work with: personal, what you love and value. Professional, how the work aligns. Spiritual, the deeper why. Which layer feels least settled for you right now?`;
    }

    // Leadership
    if (/(leader|leadership|team|company|founder|exec)/.test(t)) {
      return `Conscious leadership starts inside. Authenticity, empathy, vision, integrity. The team always feels what the leader hasn't dealt with. What's something you've been avoiding in yourself that's leaking into the work?`;
    }

    // Journaling / reflection
    if (/(journal|writ|reflect|write)/.test(t)) {
      return `Journaling is one of the simplest tools that works. No format, no audience, no editing. Just put what's true on the page. What's one thing you'd write down right now if no one would ever read it?`;
    }

    // Greetings / how are you
    if (/^(hi|hey|hello|good (morning|afternoon|evening))\b/.test(t) || /how are you/.test(t)) {
      return `Hi${name ? ` ${name}` : ""}. I'm here. How are you arriving today?`;
    }
    if (/(thank you|thanks|appreciate)/.test(t)) {
      return `Of course. I'm glad you're here. What else is on your mind?`;
    }
    if (/(who are you|what are you|are you ai|are you a bot)/.test(t)) {
      return `I'm Navid. A companion built for this journey, trained on the Foundation's work. Think of me as a quiet presence between sessions. What brought you here today?`;
    }

    // Default
    return pickOne([
      `Tell me a little more about that. What's underneath it for you?`,
      `${namePart}stay with that for a moment. What does it remind you of?`,
      `Heard you. What part of that feels most alive right now?`,
      `Slow down with that for a beat. What's the deeper truth in there?`,
    ]);
  }

  function pickOne(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  // ─── Wire NAVID FAB ──────────────────────────────────────
  const fab = document.querySelector(".navid-fab");
  if (fab) {
    fab.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      open();
    }, true);
  }

  // Wire any links to navid.html so they open the chat instead
  document.querySelectorAll('a[href$="navid.html"], a[href*="navid.html#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      open();
    });
  });

  // Wire the chat-mock visual on the home page (click anywhere on it)
  const chatMock = document.querySelector(".chat-mock");
  if (chatMock) {
    chatMock.style.cursor = "pointer";
    chatMock.addEventListener("click", () => open());
  }
})();

// Application / Booking modal — single modal, three variants
(() => {
  const modal = document.getElementById("appModal");
  if (!modal) return;
  const form = document.getElementById("appModalForm");
  const thanks = document.getElementById("appModalThanks");
  const titleEl = document.getElementById("appModalTitle");
  const subEl = document.getElementById("appModalSub");
  const chapterEl = document.getElementById("appModalChapter");
  const formType = document.getElementById("appModalFormType");
  const messageLabel = document.getElementById("appModalMessageLabel");

  const variants = {
    retreat: {
      chapter: "Retreat application",
      title: "Apply for the next retreat",
      sub: "Tell us a little about you and what is bringing you to this work. We will follow up with availability and the next steps.",
      messageLabel: "Why this, why now?",
    },
    creator: {
      chapter: "Creative Studios",
      title: "Apply as a creator",
      sub: "Studio One is open to emerging creators in exchange for one piece of co-produced work per quarter. Tell us about you and what you would like to make.",
      messageLabel: "What you would like to make with us",
    },
    school: {
      chapter: "Bring it to a school",
      title: "Bring the curriculum to your school",
      sub: "Tell us about your school and we will be in touch with how integration works.",
      messageLabel: "About your school and what you are looking for",
    },
    corporate: {
      chapter: "Corporate retreat",
      title: "Commission a retreat",
      sub: "Tell us about your team and the moment you are in. We design every corporate retreat from scratch.",
      messageLabel: "About your team and what you want to work on",
    },
    general: {
      chapter: "Get in touch",
      title: "Tell us about you",
      sub: "Short and honest is better than long and polished. We read every message and reply personally.",
      messageLabel: "What you would like to discuss",
    },
  };

  const setVariant = (key) => {
    const v = variants[key] || variants.general;
    chapterEl.textContent = v.chapter;
    titleEl.textContent = v.title;
    subEl.textContent = v.sub;
    messageLabel.textContent = v.messageLabel;
    formType.value = key;
    // Show/hide context-specific fields
    modal.querySelectorAll("[data-form-context]").forEach(el => {
      const ctx = el.getAttribute("data-form-context");
      el.style.display = (ctx === key) ? "" : "none";
    });
  };

  const open = (key) => {
    setVariant(key);
    if (thanks) thanks.hidden = true;
    if (form) form.hidden = false;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-modal-open");
    setTimeout(() => modal.querySelector("input[name='name']")?.focus(), 50);
  };

  const close = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-modal-open");
  };

  // Wire up triggers (data-open-modal="retreat" etc.)
  document.querySelectorAll("[data-open-modal]").forEach(el => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      open(el.getAttribute("data-open-modal") || "general");
    });
  });

  // Close handlers
  modal.querySelectorAll("[data-close-modal]").forEach(el => {
    el.addEventListener("click", close);
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) close();
  });

  // Form submit — store locally, show thanks
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((v, k) => { obj[k] = v; });
    if (!obj.name || !obj.email || !/^\S+@\S+\.\S+$/.test(obj.email) || !obj.message) {
      const firstInvalid = form.querySelector("input:invalid, textarea:invalid") || form.querySelector("input");
      firstInvalid?.focus();
      return;
    }
    obj.at = Date.now();
    try {
      const KEY = "lhff:applications";
      const existing = JSON.parse(localStorage.getItem(KEY) || "[]");
      existing.push(obj);
      localStorage.setItem(KEY, JSON.stringify(existing));
    } catch (e) {}
    if (form) form.hidden = true;
    if (thanks) thanks.hidden = false;
    setTimeout(close, 2400);
  });
})();
