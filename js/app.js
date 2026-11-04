/* ==========================================================================
   秋天的旅行 · v2 engine
   ========================================================================== */
(function () {
  "use strict";

  const DECK = window.DECK;
  if (!DECK) return;
  const slides = DECK.slides;
  const IMAGES = DECK.images;
  const TOTAL = slides.length;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const pad2 = (n) => String(n).padStart(2, "0");
  const esc = (v) => String(v == null ? "" : v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const ACCENT = {
    "序": "#d2a04a",
    "台湾": "#8aa28b",
    "黑龙江": "#d2a04a",
    "西安": "#b77a45",
    "尾声": "#d2a04a"
  };

  const deckEl = $("#deck");
  const loader = $("#loader");
  const loadFill = $("#loadFill");
  const progressFill = $("#progressFill");
  const dotsWrap = $("#chapterDots");
  const overview = $("#overview");
  const overviewGrid = $("#overviewGrid");
  const help = $("#help");
  const creditsList = $("#creditsList");
  const veil = $("#veil");
  const toastEl = $("#toast");

  let current = 0;
  let locked = false;
  let lockTimer = 0;
  let idleTimer = 0;
  let openOverlayName = null;
  let lastFocus = null;
  let overlayCloseTimer = 0;
  let wheelAccum = 0;
  let wheelLast = 0;
  let wheelLockedUntil = 0;
  let suppressClickUntil = 0;
  let hasStarted = false;
  let isShot = new URLSearchParams(location.search).has("shot");
  if (isShot) document.documentElement.classList.add("is-shot");
  let slideEls = [];

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  /* ----------------------------------------------------------------------
     Render helpers
     ---------------------------------------------------------------------- */
  function media(key, alt, opts = {}) {
    const im = IMAGES[key];
    if (!im) return `<figure class="media media--missing ${opts.cls || ""}" aria-hidden="true"></figure>`;
    const src = esc(im.src);
    const fallback = esc(im.fallback || im.src.replace(/\.webp$/i, ".jpg"));
    const lqip = im.lqip ? `<div class="media__ph" style="background-image:url('${im.lqip}')"></div>` : `<div class="media__ph"></div>`;
    return `<figure class="media ${opts.cls || ""}" ${opts.reveal ? `data-reveal="${opts.reveal}"` : ""} aria-hidden="true">
      ${lqip}
      <img src="${src}" alt="${esc(alt || "")}" loading="eager" decoding="async"
        onerror="this.onerror=null;this.src='${fallback}';this.addEventListener('error',function(){this.closest('.media')&&this.closest('.media').classList.add('is-missing')},{once:true})">
    </figure>`;
  }

  function chars(text, delay = 0, cls = "") {
    const arr = Array.from(String(text || ""));
    return `<span class="chars ${cls}" style="--d:${delay}ms" aria-label="${esc(text)}">${arr.map((ch, i) =>
      `<span class="ch" style="--ci:${i}" aria-hidden="true">${esc(ch)}</span>`
    ).join("")}</span>`;
  }

  function maskLines(lines, delay = 0) {
    return (lines || []).map((line, i) =>
      `<span class="line"><span style="--d:${delay + i * 110}ms">${esc(line)}</span></span>`
    ).join("");
  }

  function scenePlate(s, cls = "") {
    if (!s.scene) return "";
    return `<div class="scene-plate ${cls}" aria-label="${esc(s.scene.place)}">
      <span class="scene-plate__place">${esc(s.scene.place)}</span>
    </div>`;
  }

  function wrapSlide(s, inner, opts = {}) {
    const tone = opts.tone || "dark";
    const transition = opts.transition || "push";
    const title = s.title || s.quote || "秋天的旅行";
    return `<section class="slide slide--${s.type} ${opts.cls || ""}"
      id="slide-${s.n}" data-id="${esc(s.id)}" data-type="${s.type}" data-tone="${tone}"
      data-transition="${transition}" data-chapter="${esc(s.chapter)}" data-title="${esc(title)}"
      data-thumb="${esc(opts.thumb || "")}" aria-roledescription="slide"
      aria-label="${s.n} / ${TOTAL}：${esc(title)}">
      ${inner}
    </section>`;
  }

  function chapterIndices() {
    return slides.map((s, i) => (s.type === "chapter" ? i : -1)).filter((i) => i >= 0);
  }

  /* ----------------------------------------------------------------------
     Slide renderers
     ---------------------------------------------------------------------- */
  const render = {
    cover(s) {
      const inner = `
        ${media(s.imageKey, s.alt, { reveal: "up" })}
        <div class="scrim scrim--cover"></div>
        <div class="cover">
          <div class="cover__content">
            <h1 class="cover__title">${chars(s.title, 220)}</h1>
            <p class="cover__sub">${maskLines(s.lines, 720)}</p>
          </div>
          <div class="cover__cue" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M12 4v14M6 12l6 6 6-6"/></svg>
            <i></i>
          </div>
          <div class="frame"></div>
        </div>`;
      return wrapSlide(s, inner, { tone: "dark", transition: "fade", thumb: s.imageKey });
    },

    thesis(s) {
      const chapters = chapterIndices();
      const panels = (s.imageKeys || []).map((key, i) => `
        <button class="thesis-panel" type="button" data-goto="${chapters[i] != null ? chapters[i] : 0}" aria-label="${esc(s.lines[i])}">
          ${media(key, (s.alt && s.alt[i]) || "", { reveal: "up" })}
          <span class="thesis-panel__label">${esc(s.lines[i])}</span>
        </button>`).join("");
      const inner = `
        <div class="thesis">
          <div class="thesis__copy">
            <h2 class="display thesis__title">${chars(s.title.slice(0, 3), 180)}<br>${chars(s.title.slice(3), 300)}</h2>
            <p class="body-copy thesis__body reveal" style="--d:520ms">${esc(s.body)}</p>
          </div>
          <div class="thesis__panels">${panels}</div>
          <div class="frame"></div>
        </div>`;
      return wrapSlide(s, inner, { tone: "light", transition: "curtain", thumb: s.imageKeys[0] });
    },

    route(s) {
      const first = s.choices[0];
      const choices = s.choices.map((c, i) => `
        <button class="route-choice ${i === 0 ? "is-on" : ""}" type="button" data-choice="${i}"
          data-line="${esc(c.line)}" data-key="${esc(c.imageKey)}" data-alt="${esc(c.alt || "")}" aria-label="${esc(c.label)}">
          <span class="name">${esc(c.label)}</span>
        </button>`).join("");
      const inner = `
        <div class="route-bgs"><div class="route-photo">${media(first.imageKey, first.alt, {})}</div></div>
        <div class="scrim scrim--route"></div>
        <div class="route-content">
          <h2 class="display route-title">${chars(s.title, 160)}</h2>
          <p class="body-copy route-body reveal" style="--d:480ms">${esc(s.body)}</p>
        </div>
        <p class="route-prompt">${esc(s.prompt)}</p>
        <p class="route-response">${esc(first.line)}</p>
        <div class="route-choices">${choices}</div>
        <div class="frame"></div>`;
      return wrapSlide(s, inner, { tone: "dark", transition: "fade", thumb: first.imageKey });
    },


    guess(s) {
      const choices = s.choices.map((c, i) => `
        <button class="guess-choice" type="button" data-guess="${i}" data-correct="${c.correct ? 1 : 0}"
          data-line="${esc(c.line)}" aria-label="${esc(c.label)}">
          <span class="guess-choice__name">${esc(c.label)}</span>
        </button>`).join("");
      const timeline = (s.timeline || []).map((t) => `
        <div class="guess-timeline__item">
          <span class="guess-timeline__month">${esc(t.month)}</span>
          <span class="guess-timeline__place">${esc(t.place)}</span>
        </div>`).join("");
      const inner = `
        ${media(s.imageKey, s.alt, {})}
        <div class="scrim scrim--route"></div>
        <div class="guess">
          <div class="guess__copy">
            <h2 class="display guess-title">${chars(s.title, 160)}</h2>
          </div>
          <div class="guess-timeline">${timeline}</div>
          <p class="guess-why">${esc(s.why || "")}</p>
          <p class="guess-response"></p>
          <div class="guess-choices">${choices}</div>
          <button class="guess-go" type="button" data-goto="3">按时间出发</button>
          <div class="frame"></div>
        </div>`;
      return wrapSlide(s, inner, { tone: "dark", transition: "zoom", thumb: s.imageKey });
    },

    ticket(s) {
      const variants = (s.variants || []).map((v, i) => `
        <div class="ticket__variant ${i === 0 ? "is-on" : ""}" data-variant="${i}">
          ${media(v.imageKey, v.alt, {})}
          <div class="scrim scrim--hero"></div>
          <div class="ticket__tagline display">${chars(v.tagline, 180)}</div>
          <div class="ticket__card">
            <div class="ticket__head">
              <span class="ticket__brand">秋日航班</span>
              <span class="ticket__type">登机牌</span>
            </div>
            <div class="ticket__route">
              <span class="ticket__from">你</span>
              <span class="ticket__plane" aria-hidden="true">✈</span>
              <span class="ticket__to">${esc(v.to)}</span>
            </div>
            <div class="ticket__meta">
              <div class="ticket__field"><span class="ticket__label">日期</span><span class="ticket__value">${esc(v.date)}</span></div>
              <div class="ticket__field"><span class="ticket__label">航班</span><span class="ticket__value">${esc(v.flight)}</span></div>
              <div class="ticket__field"><span class="ticket__label">登机口</span><span class="ticket__value">${esc(v.gate)}</span></div>
              <div class="ticket__field"><span class="ticket__label">座位</span><span class="ticket__value">${esc(v.seat)}</span></div>
            </div>
            <div class="ticket__seam" aria-hidden="true"></div>
            <div class="ticket__stub">
              <span class="ticket__place">${esc(v.place)}</span>
              <span class="ticket__datelabel">${esc(v.dateLabel)}</span>
              <p class="ticket__body">${esc(v.body)}</p>
              <div class="ticket__days">${(v.days || []).map((d) => `<span>${esc(d)}</span>`).join("")}</div>
              <div class="ticket__actions">
                <button type="button" data-goto="17">换一张</button>
                <button type="button" data-goto="19">出发</button>
              </div>
            </div>
            <div class="ticket__barcode" aria-hidden="true"></div>
          </div>
        </div>`).join("");
      const inner = `
        <div class="ticket">${variants}<div class="frame"></div></div>`;
      return wrapSlide(s, inner, { tone: "dark", transition: "zoom", thumb: (s.variants[0] || {}).imageKey || "" });
    },

    quiz(s) {
      const letters = ["A", "B", "C", "D"];
      const opts = s.options.map((o, i) => `
        <button class="quiz-option" type="button" data-quiz="${i}" data-correct="${i === s.correct ? 1 : 0}">
          <span class="quiz-option__letter">${letters[i]}</span>
          <span class="quiz-option__text">${esc(o)}</span>
        </button>`).join("");
      const inner = `
        <div class="quiz">
          <span class="quiz-mark" aria-hidden="true">?</span>
          <h2 class="display quiz-question">${chars(s.question, 160)}</h2>
          <div class="quiz-options">${opts}</div>
          <p class="quiz-explain">${esc(s.explain)}</p>
          <div class="frame"></div>
        </div>`;
      return wrapSlide(s, inner, { tone: "light", transition: "curtain" });
    },
    chapter(s) {
      const isRight = s.lines[1] === "西安";
      const inner = `
        ${media(s.imageKey, s.alt, { reveal: "circle" })}
        <div class="chapter ${isRight ? "is-right" : ""}">
          <div class="scrim scrim--chapter"></div>
          <div class="chapter-number" aria-hidden="true">${esc(s.lines[0])}</div>
          <div class="chapter-region" aria-hidden="true">${esc(s.lines[1])}</div>
          <div class="chapter-copy">
            <h2 class="display chapter-title">${chars(s.title, 220)}</h2>
            <p class="body-copy chapter-body reveal" style="--d:620ms">${esc(s.body)}</p>
          </div>
          <div class="frame"></div>
        </div>`;
      return wrapSlide(s, inner, { tone: "dark", transition: "circle", thumb: s.imageKey });
    },

    hero(s) {
      const heading = s.quote
        ? `<blockquote class="quote hero-quote">${chars(s.quote, 200)}</blockquote>`
        : `<h2 class="display hero-title">${chars(s.title, 200)}</h2>`;
      const inner = `
        ${media(s.imageKey, s.alt, { reveal: "up" })}
        <div class="scrim scrim--hero"></div>
        ${scenePlate(s)}
        <div class="hero-copy">
          ${heading}
          ${s.body ? `<p class="body-copy hero-body reveal" style="--d:660ms">${esc(s.body)}</p>` : ""}
        </div>
        <div class="frame"></div>`;
      return wrapSlide(s, inner, { tone: "dark", transition: "push", thumb: s.imageKey });
    },

    split(s) {
      const imageRight = ["taiwan-cypress", "xian-persimmon"].includes(s.id);
      const light = imageRight;
      const t = s.title || "";
      let titleHtml;
      if (t.includes("，")) {
        const parts = t.split("，");
        titleHtml = chars(parts[0] + "，", 180) + "<br>" + chars(parts.slice(1).join("，"), 300);
      } else if (Array.from(t).length >= 6) {
        titleHtml = chars(Array.from(t).slice(0, 3).join(""), 180) + "<br>" + chars(Array.from(t).slice(3).join(""), 300);
      } else {
        titleHtml = chars(t, 180);
      }
      const inner = `
        <div class="split-media">${media(s.imageKey, s.alt, { reveal: imageRight ? "right" : "left" })}</div>
        <div class="split-panel">
          ${scenePlate(s, "scene-plate--panel")}
          <h2 class="display split-title">${titleHtml}</h2>
          <p class="body-copy split-body reveal" style="--d:520ms">${esc(s.body)}</p>
        </div>
        <div class="frame"></div>`;
      return wrapSlide(s, inner, {
        tone: light ? "light" : "dark",
        transition: "push",
        cls: imageRight ? "is-reverse" : "",
        thumb: s.imageKey
      });
    },

    fog(s) {
      const responses = (s.responses || []).map((r, i) => `<p class="fog-response" data-i="${i}">${esc(r)}</p>`).join("");
      const inner = `
        ${media(s.imageKey, s.alt, {})}
        <div class="scrim scrim--bottom"></div>
        <canvas class="fog-canvas" aria-label="在画面上移动手指或鼠标，拨开雾"></canvas>
        ${scenePlate(s)}
        <p class="fog-prompt">${esc(s.prompt)}</p>
        <div class="fog-responses">${responses}</div>
        <div class="fog-cursor" aria-hidden="true"></div>
        <div class="frame"></div>`;
      return wrapSlide(s, inner, { tone: "dark", transition: "fade", thumb: s.imageKey });
    },

    snow(s) {
      const inner = `
        <div class="snow-base">${media(s.imageKeys[0], s.alt[0], {})}</div>
        <div class="snow-top">${media(s.imageKeys[1], s.alt[1], {})}</div>
        <div class="scrim scrim--bottom"></div>
        <div class="snow-frost" aria-hidden="true"></div>
        <canvas class="snow-canvas" aria-hidden="true"></canvas>
        <input class="snow-range" type="range" min="0" max="100" value="45" step="1" aria-label="拖动比较秋天与第一场雪">
        <div class="snow-handle" aria-hidden="true"></div>
        <p class="snow-prompt">${esc(s.prompt)}</p>
        ${scenePlate(s, "scene-plate--right")}
        <button class="snow-play" type="button" data-action="snow-play">${esc(s.autoLabel || "看它入冬")}</button>
        <div class="snow-responses">${(s.responses || []).map((r, i) =>
          `<p class="snow-response" data-i="${i}">${esc(r)}</p>`).join("")}</div>
        <div class="frame"></div>`;
      return wrapSlide(s, inner, { tone: "dark", transition: "fade", thumb: s.imageKeys[0] });
    },

    vote(s) {
      let voteTitle = chars(s.title, 160);
      if ((s.title || "").includes("，")) {
        const p = s.title.split("，");
        voteTitle = chars(p[0] + "，", 160) + "<br>" + chars(p.slice(1).join("，"), 280);
      }
      const panels = s.choices.map((c, i) => `
        <button class="vote-panel" type="button" data-choice="${i}" data-line="${esc(c.line)}" aria-label="${esc(c.label)}">
          ${media(c.imageKey, c.alt, {})}
          <span class="vote-panel__label">${esc(c.label)}</span>
        </button>`).join("");
      const inner = `
        <div class="vote-head">
          <h2 class="display vote-title">${voteTitle}</h2>
        </div>
        <div class="vote-panels">${panels}</div>
        <div class="frame"></div>`;
      return wrapSlide(s, inner, { tone: "light", transition: "curtain", thumb: s.choices[0].imageKey });
    },

    end(s) {
      const board = (s.lines || []).map((t) => `
        <div class="end-board__item">
          <span class="end-board__month">${esc(t.month)}</span>
          <span class="end-board__place">${esc(t.place)}</span>
        </div>`).join("");
      const inner = `
        ${media(s.imageKey, s.alt, { reveal: "up" })}
        <div class="scrim scrim--hero"></div>
        <div class="end-copy">
          <h2 class="display end-title">${chars(s.title, 180)}</h2>
          <div class="end-board reveal" style="--d:620ms">${board}</div>
          <p class="end-cta reveal" style="--d:780ms">${esc(s.prompt)}</p>
          <button class="end-replay" type="button" data-action="restart" aria-label="重新看一遍">
            <span class="ring" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3M4 4v5h5"/></svg></span>
          </button>
        </div>
        <span class="end-mark" aria-hidden="true">秋</span>
        <div class="frame"></div>`;
      return wrapSlide(s, inner, { tone: "dark", transition: "zoom", thumb: s.imageKey });
    }

  };

  function renderSlide(s) {
    const fn = render[s.type];
    if (!fn) return "";
    return fn(s);
  }

  /* ----------------------------------------------------------------------
     Boot
     ---------------------------------------------------------------------- */
  deckEl.innerHTML = slides.map(renderSlide).join("");
  slideEls = $$(".slide", deckEl);
  slideEls.forEach((el) => {
    el.classList.add("is-future");
    el.setAttribute("aria-hidden", "true");
    el.setAttribute("inert", "");
  });

  function initialIndex() {
    const raw = parseInt((location.hash || "").replace(/[^\d]/g, ""), 10);
    if (!Number.isFinite(raw)) return 0;
    return Math.min(TOTAL, Math.max(1, raw)) - 1;
  }
  current = initialIndex();

  function setProgress(index) {
    progressFill.style.width = `${((index + 1) / TOTAL) * 100}%`;
  }

  function chapterOf(s) { return s.chapter || "序"; }

  function updateChrome(index) {
    const s = slides[index];
    const light = ["thesis", "vote", "quiz"].includes(s.type) || ["taiwan-cypress", "xian-persimmon"].includes(s.id);
    document.body.dataset.tone = light ? "light" : "dark";
    document.body.dataset.chapter = chapterOf(s);
    document.documentElement.style.setProperty("--accent", ACCENT[chapterOf(s)] || "#d2a04a");
    setProgress(index);
    const chapters = chapterIndices();
    $$(".chapter-dot", dotsWrap).forEach((dot, i) => {
      const idx = chapters[i];
      const active = idx === index || (i === 0 && index < chapters[0]);
      dot.classList.toggle("is-on", active);
    });
    document.body.classList.toggle("is-interactive", ["guess", "quiz", "ticket", "fog", "snow", "vote"].includes(s.type));
  }

  function applySlideState(index) {
    slideEls.forEach((el, i) => {
      const active = i === index;
      el.classList.toggle("is-active", active);
      el.classList.toggle("is-past", i < index);
      el.classList.toggle("is-future", i > index);
      if (!active) el.classList.remove("is-shown");
      el.setAttribute("aria-hidden", active ? "false" : "true");
      if (active) el.removeAttribute("inert");
      else el.setAttribute("inert", "");
    });
    void deckEl.offsetWidth;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (slideEls[index]) slideEls[index].classList.add("is-shown");
        activateInteractive(index);
      });
    });
    updateChrome(index);
  }

  function primeSlide(index) {
    const slide = slideEls[index];
    if (!slide) return;
    slide.querySelectorAll("img").forEach((img) => {
      img.loading = "eager";
      if (!img.complete && img.decode) img.decode().catch(() => {});
    });
  }

  function goTo(index, opts = {}) {
    if (index < 0 || index >= TOTAL) return false;
    if (index === current) return false;
    if (!opts.force && locked) return false;
    if (!opts.force && openOverlayName) return false;

    deactivateInteractive(current);
    const from = current;
    current = index;
    primeSlide(index);
    applySlideState(index);
    wake();

    if (slides[index].type === "chapter") sweepVeil();

    locked = true;
    clearTimeout(lockTimer);
    lockTimer = window.setTimeout(() => { locked = false; }, reducedMotion ? 80 : 1250);
    wheelLockedUntil = performance.now() + 1400;
    wheelAccum = 0;
    history.replaceState(null, "", `#${index + 1}`);
    return from !== index;
  }

  function next() { return goTo(current + 1); }
  function prev() { return goTo(current - 1); }
  function home() { return goTo(0, { force: true }); }
  function end() { return goTo(TOTAL - 1, { force: true }); }

  function sweepVeil() {
    if (reducedMotion) return;
    veil.classList.remove("is-sweeping");
    void veil.offsetWidth;
    veil.style.background = getComputedStyle(document.documentElement).getPropertyValue("--accent") || "#d2a04a";
    veil.classList.add("is-sweeping");
    window.setTimeout(() => veil.classList.remove("is-sweeping"), 1400);
  }

  /* ----------------------------------------------------------------------
     Interactive slides
     ---------------------------------------------------------------------- */
  const state = {
    route: { el: null, index: 0 },
    guess: { el: null, solved: false },
    quiz: { el: null, solved: false },
    ticket: { el: null, variant: 0 },
    fog: { el: null, canvas: null, ctx: null, cleared: false, responses: [], prompt: null, cursor: null },
    snow: { el: null, input: null, responses: [], value: 45, canvas: null, ctx: null, flakes: [], started: false, playing: false },
    vote: { el: null, selected: -1 }
  };

  function activateInteractive(index) {
    const s = slides[index];
    if (!s) return;
    if (s.type === "guess") resetGuess(slideEls[index]);
    if (s.type === "quiz") resetQuiz(slideEls[index]);
    if (s.type === "ticket") {
      state.ticket.el = slideEls[index];
      setTicket(state.ticket.variant);
    }
    if (s.type === "fog") resetFog(slideEls[index]);
    if (s.type === "snow") resetSnow(slideEls[index]);
    if (s.type === "vote") resetVote(slideEls[index]);
  }

  function deactivateInteractive(index) {
    const s = slides[index];
    if (!s) return;
    if (s.type === "fog" && state.fog.cursor) state.fog.cursor.classList.remove("is-on");
    if (s.type === "snow" && state.snow.input) state.snow.input.blur();
  }

  function resetRoute(el) {
    if (!el) return;
    state.route.el = el;
    const response = $(".route-response", el);
    selectRoute(0, true);
    if (response) response.classList.add("is-on");
  }

  function selectRoute(i, silent) {
    const el = state.route.el;
    if (!el) return;
    const buttons = $$(".route-choice", el);
    const btn = buttons[i];
    if (!btn) return;
    const photo = $(".route-photo", el);
    const img = photo && photo.querySelector("img");
    const response = $(".route-response", el);
    const key = btn.dataset.key;
    const im = IMAGES[key];
    buttons.forEach((b) => b.classList.toggle("is-on", b === btn));
    if (response) {
      response.classList.remove("is-on");
      window.setTimeout(() => {
        response.textContent = btn.dataset.line || "";
        response.classList.add("is-on");
      }, silent ? 0 : 240);
    }
    if (img && im) {
      if (photo) photo.classList.add("is-switching");
      window.setTimeout(() => {
        img.src = im.src;
        img.alt = btn.dataset.alt || "";
        if (photo) photo.classList.remove("is-switching");
      }, silent ? 0 : 220);
    }
    state.route.index = i;
  }

  function resetGuess(el) {
    if (!el) return;
    state.guess.el = el;
    state.guess.solved = false;
    el.classList.remove("is-solved");
    $$(".guess-choice", el).forEach((b) => b.classList.remove("is-correct", "is-wrong", "is-dim"));
    const r = $(".guess-response", el);
    if (r) { r.textContent = ""; r.classList.remove("is-on"); }
  }

  function selectGuess(i) {
    const el = state.guess.el;
    if (!el) return;
    const buttons = $$(".guess-choice", el);
    const btn = buttons[i];
    if (!btn) return;
    const response = $(".guess-response", el);
    const correct = btn.dataset.correct === "1";
    if (response) {
      response.textContent = btn.dataset.line || "";
      response.classList.add("is-on");
    }
    if (correct) {
      state.guess.solved = true;
      el.classList.add("is-solved");
      buttons.forEach((b) => {
        b.classList.toggle("is-correct", b === btn);
        b.classList.toggle("is-dim", b !== btn);
      });
    } else {
      btn.classList.add("is-wrong");
      window.setTimeout(() => btn.classList.remove("is-wrong"), 700);
    }
  }

  function resetQuiz(el) {
    if (!el) return;
    state.quiz.el = el;
    state.quiz.solved = false;
    el.classList.remove("is-solved");
    $$(".quiz-option", el).forEach((b) => b.classList.remove("is-correct", "is-wrong", "is-dim"));
    const ex = $(".quiz-explain", el);
    if (ex) ex.classList.remove("is-on");
  }

  function selectQuiz(i) {
    const el = state.quiz.el;
    if (!el) return;
    const buttons = $$(".quiz-option", el);
    const btn = buttons[i];
    if (!btn) return;
    const correct = btn.dataset.correct === "1";
    if (correct) {
      state.quiz.solved = true;
      el.classList.add("is-solved");
      buttons.forEach((b) => {
        b.classList.toggle("is-correct", b === btn);
        b.classList.toggle("is-dim", b !== btn);
      });
      const ex = $(".quiz-explain", el);
      if (ex) ex.classList.add("is-on");
    } else {
      btn.classList.add("is-wrong");
      buttons.forEach((b) => { if (b !== btn) b.classList.remove("is-correct"); });
      window.setTimeout(() => btn.classList.remove("is-wrong"), 700);
    }
  }

  function resetFog(el) {
    if (!el) return;
    const canvas = $(".fog-canvas", el);
    if (!canvas) return;
    state.fog.el = el;
    state.fog.canvas = canvas;
    state.fog.responses = $$(".fog-response", el);
    state.fog.prompt = $(".fog-prompt", el);
    state.fog.cursor = $(".fog-cursor", el);
    state.fog.responses.forEach((r) => r.classList.remove("is-on"));
    if (state.fog.prompt) state.fog.prompt.classList.remove("is-off");
    const ctx = canvas.getContext("2d");
    state.fog.ctx = ctx;
    resizeFog();
    drawFog();
    state.fog.cleared = false;
  }

  function resizeFog() {
    const canvas = state.fog.canvas;
    if (!canvas) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas._dpr = dpr;
    canvas._w = w;
    canvas._h = h;
  }

  function drawFog() {
    const canvas = state.fog.canvas, ctx = state.fog.ctx;
    if (!canvas || !ctx) return;
    const w = canvas.width, h = canvas.height;
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, w, h);
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "rgba(220,225,216,.92)");
    g.addColorStop(.45, "rgba(201,210,204,.9)");
    g.addColorStop(1, "rgba(225,228,219,.94)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 22; i++) {
      const x = (i * 137.5) % w;
      const y = (i * 229.3) % h;
      const r = (0.08 + ((i * 13) % 10) / 60) * Math.min(w, h);
      const rg = ctx.createRadialGradient(x, y, 0, x, y, r);
      rg.addColorStop(0, "rgba(239,242,236,.5)");
      rg.addColorStop(1, "rgba(239,242,236,0)");
      ctx.fillStyle = rg;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function eraseFog(x, y) {
    const canvas = state.fog.canvas, ctx = state.fog.ctx;
    if (!canvas || !ctx) return;
    const dpr = canvas._dpr || 1;
    ctx.globalCompositeOperation = "destination-out";
    const radius = Math.min(canvas._w, canvas._h) * 0.11;
    const grad = ctx.createRadialGradient(x * dpr, y * dpr, 0, x * dpr, y * dpr, radius * dpr);
    grad.addColorStop(0, "rgba(0,0,0,1)");
    grad.addColorStop(.65, "rgba(0,0,0,.85)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x * dpr, y * dpr, radius * dpr, 0, Math.PI * 2);
    ctx.fill();
    if (!state.fog.cleared) {
      state.fog.cleared = true;
      if (state.fog.prompt) state.fog.prompt.classList.add("is-off");
    }
    scheduleFogCheck();
  }

  let fogCheckTimer = 0;
  function scheduleFogCheck() {
    clearTimeout(fogCheckTimer);
    fogCheckTimer = window.setTimeout(checkFog, 160);
  }

  function checkFog() {
    const canvas = state.fog.canvas, ctx = state.fog.ctx;
    if (!canvas || !ctx) return;
    const sw = 48, sh = 32;
    const off = document.createElement("canvas");
    off.width = sw; off.height = sh;
    const octx = off.getContext("2d");
    octx.drawImage(canvas, 0, 0, sw, sh);
    let data;
    try { data = octx.getImageData(0, 0, sw, sh).data; } catch (e) { return; }
    let clear = 0;
    for (let i = 3; i < data.length; i += 4) if (data[i] < 70) clear++;
    const ratio = clear / (sw * sh);
    const thresholds = [0.03, 0.10, 0.20];
    state.fog.responses.forEach((r, i) => { if (ratio >= thresholds[i]) r.classList.add("is-on"); });
  }

  function fogFallback() {
    if (!state.fog.el || !state.fog.canvas) return;
    const next = state.fog.responses.find((r) => !r.classList.contains("is-on"));
    if (next) next.classList.add("is-on");
    state.fog.responses.forEach((r) => r.classList.add("is-on"));
    if (state.fog.prompt) state.fog.prompt.classList.add("is-off");
    const c = state.fog.canvas, ctx = state.fog.ctx;
    if (ctx && c) {
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fillRect(0, 0, c.width, c.height);
    }
  }

  function resetSnow(el) {
    if (!el) return;
    state.snow.el = el;
    state.snow.input = $(".snow-range", el);
    state.snow.responses = $$(".snow-response", el);
    if (state.snow.input && !state.snow.input._bound) {
      state.snow.input._bound = true;
      state.snow.input.addEventListener("input", () => updateSnow(Number(state.snow.input.value)));
    }
    state.snow.value = 45;
    if (state.snow.input) state.snow.input.value = 45;
    initSnowCanvas(el);
    updateSnow(45);
  }

  function updateSnow(value) {
    const el = state.snow.el;
    if (!el) return;
    state.snow.value = value;
    el.style.setProperty("--snow-p", `${value}%`);
    el.style.setProperty("--snow-t", (value / 100).toFixed(3));
    const i = value < 34 ? 0 : value < 74 ? 1 : 2;
    state.snow.responses.forEach((r, n) => r.classList.toggle("is-on", n === i));
  }

  function initSnowCanvas(el) {
    const canvas = $(".snow-canvas", el);
    if (!canvas) return;
    state.snow.canvas = canvas;
    state.snow.ctx = canvas.getContext("2d");
    resizeSnowCanvas();
    if (!state.snow.started) {
      state.snow.started = true;
      requestAnimationFrame(snowLoop);
    }
  }

  function resizeSnowCanvas() {
    const canvas = state.snow.canvas;
    if (!canvas) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas._dpr = dpr;
    canvas._w = w;
    canvas._h = h;
    const count = w < 900 ? 42 : 88;
    state.snow.flakes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.8 + Math.random() * 2.1,
      vx: -0.25 - Math.random() * 0.55,
      vy: 0.35 + Math.random() * 0.9,
      a: 0.2 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2
    }));
  }

  function snowLoop(now) {
    requestAnimationFrame(snowLoop);
    if (!state.snow.canvas || slides[current].type !== "snow") return;
    const canvas = state.snow.canvas;
    const ctx = state.snow.ctx;
    if (!ctx || !canvas._w) return;
    const dpr = canvas._dpr || 1;
    const w = canvas._w, h = canvas._h;
    const t = state.snow.value / 100;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    for (const f of state.snow.flakes) {
      f.x += f.vx * (0.35 + t * 0.9) + Math.sin(now / 1900 + f.phase) * 0.12;
      f.y += f.vy * (0.35 + t * 1.5);
      if (f.y > h + 8) { f.y = -8; f.x = Math.random() * w; }
      if (f.x < -8) { f.x = w + 8; }
      const warm = 1 - t;
      const r = Math.round(212 + 28 * t);
      const g = Math.round(160 + 75 * t);
      const b = Math.round(74 + 160 * t);
      ctx.fillStyle = `rgba(${r},${g},${b},${f.a * (0.25 + t * 0.75)})`;
      ctx.beginPath();
      ctx.ellipse(f.x, f.y, f.r * (1.4 + warm * 1.2), f.r * (0.65 + t * 0.5), now / 2400 + f.phase, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function playSnow() {
    if (slides[current].type !== "snow" || !state.snow.input || state.snow.playing) return;
    state.snow.playing = true;
    const input = state.snow.input;
    const start = 8;
    const dur = 5200;
    input.value = start;
    updateSnow(start);
    const t0 = performance.now();
    const step = (now) => {
      const k = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      const value = start + (100 - start) * eased;
      input.value = value;
      updateSnow(value);
      if (k < 1) requestAnimationFrame(step);
      else { state.snow.playing = false; input.value = 100; updateSnow(100); }
    };
    requestAnimationFrame(step);
  }

  function resetVote(el) {
    if (!el) return;
    state.vote.el = el;
    state.vote.selected = -1;
    $$(".vote-panel", el).forEach((p) => p.classList.remove("is-on", "is-dim"));
    const r = $(".vote-response", el);
    if (r) { r.textContent = ""; r.classList.remove("is-on"); }
  }

  function selectVote(i) {
    const el = state.vote.el;
    if (!el) return;
    const panels = $$(".vote-panel", el);
    const panel = panels[i];
    if (!panel) return;
    state.vote.selected = i;
    panels.forEach((p, n) => {
      p.classList.toggle("is-on", n === i);
      p.classList.toggle("is-dim", n !== i);
    });
    openTicket(i);
  }

  function setTicket(i) {
    const el = state.ticket.el || $(".slide--ticket");
    if (!el) return;
    const variants = $$(".ticket__variant", el);
    if (!variants.length) return;
    const index = Math.max(0, Math.min(variants.length - 1, i));
    state.ticket.variant = index;
    variants.forEach((v, n) => v.classList.toggle("is-on", n === index));
  }

  function openTicket(i) {
    const index = slides.findIndex((x) => x.type === "ticket");
    if (index < 0) return;
    setTicket(i);
    goTo(index, { force: true });
  }

  /* ----------------------------------------------------------------------
     Preloader
     ---------------------------------------------------------------------- */
  const keys = Object.keys(IMAGES);
  const held = [];
  let loaded = 0;
  let booted = false;
  const bootStart = performance.now();

  function preload() {
    keys.forEach((key) => {
      const im = IMAGES[key];
      if (!im) { loaded++; return; }
      const img = new Image();
      held.push(img);
      const settle = () => {
        loaded++;
        loadFill.style.width = `${Math.round((loaded / keys.length) * 100)}%`;
        if (loaded >= keys.length) window.setTimeout(finish, 320);
      };
      img.onload = settle;
      img.onerror = settle;
      img.src = im.src;
    });
  }

  function finish() {
    if (booted) return;
    booted = true;
    const delay = isShot ? 0 : Math.max(0, 1300 - (performance.now() - bootStart));
    window.setTimeout(() => {
      loader.classList.add("is-done");
      document.body.classList.remove("is-booting");
      document.body.classList.add("is-ready");
      hasStarted = true;
      applySlideState(current);
      primeSlide(current);
      history.replaceState(null, "", `#${current + 1}`);
      window.setTimeout(() => { if (!openOverlayName) startIdle(); }, 1700);
    }, delay);
  }

  buildDots();
  buildOverview();
  buildCredits();

  if (isShot) finish();
  else { preload(); window.setTimeout(finish, 8000); }
  window.addEventListener("resize", () => {
    if (slides[current].type === "fog") { resizeFog(); drawFog(); }
    if (slides[current].type === "snow") resizeSnowCanvas();
  });

  /* ----------------------------------------------------------------------
     Chrome
     ---------------------------------------------------------------------- */
  function buildDots() {
    dotsWrap.innerHTML = chapterIndices().map((idx, i) => {
      const s = slides[idx];
      return `<button class="chapter-dot" type="button" data-chapter-jump="${idx}" aria-label="跳到${esc(s.lines[1])}"></button>`;
    }).join("");
    dotsWrap.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-chapter-jump]");
      if (btn) goTo(Number(btn.dataset.chapterJump), { force: true });
    });
  }

  function startIdle() {
    clearTimeout(idleTimer);
    if (openOverlayName || !hasStarted) return;
    idleTimer = window.setTimeout(() => {
      if (!openOverlayName && hasStarted) document.body.classList.add("is-idle");
    }, 3600);
  }
  function wake() {
    document.body.classList.remove("is-idle");
    startIdle();
  }
  function toast(text) {
    toastEl.textContent = text;
    toastEl.classList.add("is-on");
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(() => toastEl.classList.remove("is-on"), 2200);
  }
  function toggleFullscreen() {
    const el = document.documentElement;
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      const req = el.requestFullscreen || el.webkitRequestFullscreen;
      if (!req) return toast("当前浏览器不支持全屏");
      req.call(el).catch(() => toast("无法进入全屏"));
    } else {
      const exit = document.exitFullscreen || document.webkitExitFullscreen;
      if (exit) exit.call(document);
    }
  }

  /* ----------------------------------------------------------------------
     Overlays
     ---------------------------------------------------------------------- */
  function buildOverview() {
    overviewGrid.innerHTML = slides.map((s, i) => {
      const title = s.type === "quiz" ? s.question
        : s.type === "ticket" ? "秋日机票"
        : s.type === "fog" ? "把雾推开"
        : s.type === "snow" ? "第一场雪"
        : s.title || s.quote || s.prompt || "秋天的旅行";
      const key = slideEls[i] && slideEls[i].dataset.thumb;
      const im = key ? IMAGES[key] : null;
      return `<button class="ov-card" type="button" data-goto="${i}" style="--i:${i}" aria-label="${esc(title)}">
        <span class="ov-card__thumb">
          ${im ? `<img src="${esc(im.src)}" alt="" loading="lazy">` : `<span class="ov-card__pattern"></span>`}
          <span class="ov-card__shade"></span>
          <span class="ov-card__title">${esc(title)}</span>
        </span>
      </button>`;
    }).join("");
  }

  function buildCredits() {
    const credits = DECK.credits || [];
    if (!credits.length) {
      creditsList.innerHTML = `<p class="help__intro">图片授权信息正在整理。</p>`;
      return;
    }
    creditsList.innerHTML = credits.map((c) => {
      const title = c.title || c.id || "Untitled";
      const artist = c.artist || "Wikimedia Commons";
      const license = c.license || "";
      const url = c.source_url || c.license_url || "";
      return `<div class="credit">
        <span class="credit__title">${esc(title)}</span>
        <span class="credit__meta">${esc(artist)}<br>${url ? `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(license || "来源")}</a>` : esc(license)}</span>
      </div>`;
    }).join("");
  }

  function focusables(root) {
    return $$('a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])', root).filter((el) => el.offsetParent !== null);
  }
  function setBackgroundInert(on) {
    ["#deck", ".hud", ".edge"].forEach((sel) => $$(sel).forEach((el) => {
      if (on) el.setAttribute("inert", ""); else el.removeAttribute("inert");
    }));
  }
  function openOverlay(name) {
    const el = name === "overview" ? overview : help;
    if (!el) return;
    clearTimeout(overlayCloseTimer);
    openOverlayName = name;
    lastFocus = document.activeElement;
    document.body.classList.add("is-overlay");
    document.body.classList.remove("is-idle");
    setBackgroundInert(true);
    el.hidden = false;
    requestAnimationFrame(() => el.classList.add("is-open"));
    const close = $(".overlay__close", el);
    if (close) setTimeout(() => close.focus({ preventScroll: true }), 60);
    if (name === "overview") buildOverview();
  }
  function closeOverlay() {
    if (!openOverlayName) return;
    const name = openOverlayName;
    const el = name === "overview" ? overview : help;
    openOverlayName = null;
    el.classList.remove("is-open");
    document.body.classList.remove("is-overlay");
    setBackgroundInert(false);
    overlayCloseTimer = window.setTimeout(() => {
      el.hidden = true;
      if (name === "help") {
        $$(".help__tab", help).forEach((t, i) => {
          t.classList.toggle("is-active", i === 0);
          t.setAttribute("aria-selected", i === 0 ? "true" : "false");
        });
        $$(".help__panel", help).forEach((p, i) => {
          p.classList.toggle("is-active", i === 0);
          p.hidden = i !== 0;
        });
      }
    }, 420);
    if (lastFocus && lastFocus.focus) setTimeout(() => lastFocus.focus({ preventScroll: true }), 80);
    startIdle();
  }
  function switchHelp(tab) {
    const which = tab.dataset.tab;
    $$(".help__tab", help).forEach((t) => {
      const on = t === tab;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
    });
    $$(".help__panel", help).forEach((p) => {
      const on = p.id === (which === "keys" ? "helpKeys" : "helpCredits");
      p.classList.toggle("is-active", on);
      p.hidden = !on;
    });
  }

  /* ----------------------------------------------------------------------
     Input
     ---------------------------------------------------------------------- */
  document.addEventListener("click", (event) => {
    const goto = event.target.closest("[data-goto]");
    if (goto) {
      event.preventDefault();
      const idx = Number(goto.dataset.goto);
      closeOverlay();
      setTimeout(() => goTo(idx, { force: true }), 80);
      return;
    }
    const choice = event.target.closest(".guess-choice, .quiz-option, .route-choice, .vote-panel");
    if (choice) {
      if (choice.classList.contains("guess-choice")) selectGuess(Number(choice.dataset.guess));
      else if (choice.classList.contains("quiz-option")) selectQuiz(Number(choice.dataset.quiz));
      else if (choice.classList.contains("route-choice")) selectRoute(Number(choice.dataset.choice));
      else selectVote(Number(choice.dataset.choice));
      return;
    }
    const actionEl = event.target.closest("[data-action]");
    if (!actionEl) return;
    const action = actionEl.dataset.action;
    if (openOverlayName) {
      if (action === "close") { event.preventDefault(); closeOverlay(); }
      if (action === "restart") { event.preventDefault(); closeOverlay(); setTimeout(() => goTo(0, { force: true }), 120); }
      return;
    }
    if (action === "next") { event.preventDefault(); next(); }
    else if (action === "prev") { event.preventDefault(); prev(); }
    else if (action === "overview") { event.preventDefault(); openOverlay("overview"); }
    else if (action === "help") { event.preventDefault(); openOverlay("help"); }
    else if (action === "fullscreen") { event.preventDefault(); toggleFullscreen(); }
    else if (action === "close") { event.preventDefault(); closeOverlay(); }
    else if (action === "restart") { event.preventDefault(); closeOverlay(); setTimeout(() => goTo(0, { force: true }), 0); }
    else if (action === "snow-play") { event.preventDefault(); playSnow(); }
  });

  overview.addEventListener("click", (e) => { if (e.target === overview) closeOverlay(); });
  help.addEventListener("click", (e) => { if (e.target === help) closeOverlay(); });
  $$(".help__tab", help).forEach((tab) => tab.addEventListener("click", () => switchHelp(tab)));

  document.addEventListener("keydown", (event) => {
    const key = event.key;
    const meta = event.metaKey || event.ctrlKey || event.altKey;
    if (openOverlayName) {
      if (key === "Escape" || key === "?" || key.toLowerCase() === "g") { event.preventDefault(); closeOverlay(); return; }
      if (key === "Tab") {
        const root = openOverlayName === "overview" ? overview : help;
        const list = focusables(root);
        if (!list.length) return;
        const first = list[0], last = list[list.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
      return;
    }
    if (meta) return;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) return;

    const type = slides[current].type;
    if ((type === "guess" || type === "quiz" || type === "vote") && /^[1-3]$/.test(key)) {
      event.preventDefault();
      if (type === "guess") selectGuess(Number(key) - 1);
      else if (type === "quiz") selectQuiz(Number(key) - 1);
      else selectVote(Number(key) - 1);
      wake();
      return;
    }
    if (type === "fog" && (key === "Enter" || key === " ")) {
      event.preventDefault();
      fogFallback();
      wake();
      return;
    }

    switch (key) {
      case "ArrowRight": case "ArrowDown": case "PageDown": case " ":
        event.preventDefault(); next(); break;
      case "ArrowLeft": case "ArrowUp": case "PageUp":
        event.preventDefault(); prev(); break;
      case "Home": event.preventDefault(); home(); break;
      case "End": event.preventDefault(); end(); break;
      case "f": case "F": event.preventDefault(); toggleFullscreen(); break;
      case "g": case "G": event.preventDefault(); openOverlay("overview"); break;
      case "r": case "R": event.preventDefault(); goTo(0, { force: true }); break;
      case "?": case "/": event.preventDefault(); openOverlay("help"); break;
      default: break;
    }
    wake();
  });

  window.addEventListener("wheel", (event) => {
    if (openOverlayName || !hasStarted) return;
    event.preventDefault();
    const now = performance.now();
    if (now < wheelLockedUntil) return;
    if (now - wheelLast > 240) wheelAccum = 0;
    wheelLast = now;
    if (!event.deltaY) return;
    wheelAccum += event.deltaY;
    if (Math.abs(wheelAccum) < 42) return;
    const dir = wheelAccum > 0 ? 1 : -1;
    wheelAccum = 0;
    if (dir > 0) next(); else prev();
    wheelLockedUntil = now + 1250;
    wake();
  }, { passive: false });

  let touchX = 0, touchY = 0, touchTime = 0;
  document.addEventListener("touchstart", (e) => {
    if (openOverlayName || e.touches.length !== 1) return;
    touchX = e.touches[0].clientX; touchY = e.touches[0].clientY; touchTime = Date.now();
  }, { passive: true });
  document.addEventListener("touchend", (e) => {
    if (openOverlayName || !touchTime) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchX, dy = t.clientY - touchY, dt = Date.now() - touchTime;
    touchTime = 0;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.2 || dt > 900) return;
    suppressClickUntil = Date.now() + 600;
    if (dx < 0) next(); else prev();
  }, { passive: true });
  document.addEventListener("click", (e) => {
    if (Date.now() < suppressClickUntil && e.target.closest(".edge")) { e.preventDefault(); e.stopPropagation(); }
  }, true);

  document.addEventListener("pointermove", (e) => {
    wake();
    if (slides[current].type === "fog") {
      const cursor = state.fog.cursor;
      if (cursor) {
        cursor.classList.add("is-on");
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
      }
    }
  }, { passive: true });
  document.addEventListener("pointerdown", wake, { passive: true });

  document.addEventListener("pointerdown", (e) => {
    if (slides[current].type !== "fog") return;
    const canvas = e.target.closest(".fog-canvas");
    if (!canvas) return;
    if (canvas.setPointerCapture) canvas.setPointerCapture(e.pointerId);
    const r = canvas.getBoundingClientRect();
    eraseFog(e.clientX - r.left, e.clientY - r.top);
  });
  document.addEventListener("pointermove", (e) => {
    if (slides[current].type !== "fog") return;
    if (e.buttons !== 1 && e.pointerType !== "touch") return;
    const canvas = e.target.closest(".fog-canvas");
    if (!canvas) return;
    const r = canvas.getBoundingClientRect();
    eraseFog(e.clientX - r.left, e.clientY - r.top);
  });
  document.addEventListener("pointerup", () => {
    if (slides[current].type === "fog" && state.fog.cursor) state.fog.cursor.classList.remove("is-on");
  });

  /* ambient canvas */
  (function particles() {
    if (reducedMotion) return;
    const canvas = $("#ambient");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let dpr = Math.min(2, window.devicePixelRatio || 1);
    let w = 0, h = 0;
    const items = [];
    function resize() {
      w = window.innerWidth; h = window.innerHeight;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      items.length = 0;
      const count = Math.max(14, Math.round(w / 110));
      for (let i = 0; i < count; i++) {
        items.push({
          x: Math.random() * w, y: Math.random() * h,
          r: 0.6 + Math.random() * 1.8,
          vx: -0.08 - Math.random() * 0.18, vy: 0.08 + Math.random() * 0.2,
          a: 0.05 + Math.random() * 0.14, phase: Math.random() * Math.PI * 2
        });
      }
    }
    function frame(t) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#d2a04a";
      ctx.fillStyle = accent;
      for (const p of items) {
        p.x += p.vx + Math.sin(t / 2600 + p.phase) * 0.08;
        p.y += p.vy;
        if (p.y > h + 10) p.y = -10;
        if (p.x < -10) p.x = w + 10;
        ctx.globalAlpha = p.a;
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.r * 2.4, p.r, t / 1800 + p.phase, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(frame);
    }
    resize();
    window.addEventListener("resize", resize);
    requestAnimationFrame(frame);
  })();

  window.__deck = { goTo, next, prev, get index() { return current; }, get total() { return TOTAL; } };
})();
