const DATA_PATHS = ["../../master.yaml", "../../../master.yaml"];

const state = {
  lang: "es",
  data: null,
  observer: null,
};

const el = {
  heroTitle: document.getElementById("heroTitle"),
  heroText: document.getElementById("heroText"),
  heroTags: document.getElementById("heroTags"),
  heroPhoto: document.getElementById("heroPhoto"),
  yearsValue: document.getElementById("yearsValue"),
  yearsLabel: document.getElementById("yearsLabel"),
  projectsValue: document.getElementById("projectsValue"),
  projectsLabel: document.getElementById("projectsLabel"),
  talksValue: document.getElementById("talksValue"),
  talksLabel: document.getElementById("talksLabel"),
  skillsValue: document.getElementById("skillsValue"),
  skillsLabel: document.getElementById("skillsLabel"),
  proof: document.getElementById("proof"),
  services: document.getElementById("services"),
  experience: document.getElementById("experience"),
  projects: document.getElementById("projects"),
  recognition: document.getElementById("recognition"),
  contact: document.getElementById("contact"),
  langSwitch: document.getElementById("langSwitch"),
  navHero: document.getElementById("navHero"),
  navServices: document.getElementById("navServices"),
  navExperience: document.getElementById("navExperience"),
  navProjects: document.getElementById("navProjects"),
  navContact: document.getElementById("navContact"),
  primaryCta: document.getElementById("primaryCta"),
  secondaryCta: document.getElementById("secondaryCta"),
  emptyTemplate: document.getElementById("emptyStateTemplate"),
};

const copy = {
  es: {
    heroTitle: "Luis Enrique Plata Osorio",
    heroText:
      "Software Engineer con mentalidad de ejecucion senior y entrega medible.",
    primaryCta: "Contactar ahora",
    secondaryCta: "Ver evidencia",
    years: "Años de experiencia",
    projects: "Proyectos publicos",
    talks: "Charlas tecnicas",
    skills: "Tecnologias",
    proofTitle: "Impacto medible",
    proofSubtitle: "Numero, alcance y consistencia: lo que un recruiter necesita validar rapido.",
    proofQuote: "No solo construyo software: reduzco defectos, acelero entrega y sostengo calidad.",
    servicesTitle: "Valor para el negocio",
    servicesSubtitle: "Bloques de valor orientados a resultados de hiring: entrega, calidad y escalabilidad.",
    experienceTitle: "Track record profesional",
    experienceSubtitle: "Experiencia en empresas reales con responsabilidades de impacto.",
    projectsTitle: "Pruebas de ejecucion",
    projectsSubtitle: "Productos y soluciones publicadas para validar capacidad end-to-end.",
    recognitionTitle: "Señales de seniority",
    recognitionSubtitle: "Charlas, certificaciones y formacion para reforzar credibilidad tecnica.",
    contactTitle: "Listo para sumar valor desde la primera iteracion",
    contactSubtitle: "Si buscas ownership tecnico, delivery real y calidad sostenible, conversemos.",
    email: "Email",
    linkedin: "LinkedIn",
    github: "GitHub",
    portfolio: "Portfolio",
    navHero: "Overview",
    navServices: "Value",
    navExperience: "Experience",
    navProjects: "Proof",
    navContact: "Contact",
    impact: "Impact",
    focus: "Fit",
    credentials: "Credibility",
    viewProject: "Abrir proyecto",
    openTalk: "Ver charla",
    roleLabel: "Roles",
    achievementsLabel: "Logros",
    educationLabel: "Educacion",
    certificationLabel: "Certificaciones",
    roleFitTitle: "Role fit rapido",
    roleFitSubtitle: "Probabilidad de encaje por foco tecnico",
    roleBackend: "Backend Engineer / Lead",
    roleQa: "QA Automation Engineer",
    roleGame: "Unity Developer",
    roleDevops: "Platform / DevOps Engineer",
    whatsapp: "WhatsApp",
    hiringSignalA: "Liderazgo",
    hiringSignalB: "Versátil",
    hiringSignalC: "Calidad",
  },
  en: {
    heroTitle: "Senior execution mindset, measurable delivery.",
    heroText:
      "This version is built for recruiters: it communicates value, evidence, and technical fit in seconds.",
    primaryCta: "Contact now",
    secondaryCta: "View evidence",
    years: "Years of experience",
    projects: "Published projects",
    talks: "Technical talks",
    skills: "Technologies",
    proofTitle: "Measurable impact",
    proofSubtitle: "Numbers, scope, and consistency: what a recruiter needs to validate quickly.",
    proofQuote: "I do not only build software: I reduce defects, speed up delivery, and sustain quality.",
    servicesTitle: "Business value",
    servicesSubtitle: "Value blocks focused on hiring outcomes: delivery, quality, and scalability.",
    experienceTitle: "Professional track record",
    experienceSubtitle: "Experience in real companies with impact responsibilities.",
    projectsTitle: "Execution evidence",
    projectsSubtitle: "Published products and solutions to validate end-to-end capability.",
    recognitionTitle: "Seniority signals",
    recognitionSubtitle: "Talks, certifications, and education to reinforce technical credibility.",
    contactTitle: "Ready to deliver value from the first iteration",
    contactSubtitle: "If you need technical ownership, real delivery, and sustainable quality, let us talk.",
    email: "Email",
    linkedin: "LinkedIn",
    github: "GitHub",
    portfolio: "Portfolio",
    navHero: "Overview",
    navServices: "Value",
    navExperience: "Experience",
    navProjects: "Proof",
    navContact: "Contact",
    impact: "Impact",
    focus: "Fit",
    credentials: "Credibility",
    viewProject: "Open project",
    openTalk: "Open talk",
    roleLabel: "Roles",
    achievementsLabel: "Achievements",
    educationLabel: "Education",
    certificationLabel: "Certifications",
    roleFitTitle: "Quick role fit",
    roleFitSubtitle: "Estimated fit by technical focus",
    roleBackend: "Backend Engineer / Lead",
    roleQa: "QA Automation Engineer",
    roleGame: "Unity Developer",
    roleDevops: "Platform / DevOps Engineer",
    whatsapp: "WhatsApp",
    hiringSignalA: "Leadership",
    hiringSignalB: "Versatile",
    hiringSignalC: "Quality",
  },
};

function tx(key) {
  return copy[state.lang][key] || "";
}

function t(value) {
  if (value && typeof value === "object" && (value.es || value.en)) {
    return value[state.lang] || value.en || value.es || "";
  }
  return value ?? "";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function iconMarkup(kind) {
  const icons = {
    mail: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4.5 6.75A2.25 2.25 0 0 1 6.75 4.5h10.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25H6.75a2.25 2.25 0 0 1-2.25-2.25V6.75Zm2.07-.75 5.43 4.18 5.43-4.18H6.57Zm11.13 1.83-5.19 4a1.5 1.5 0 0 1-1.82 0l-5.19-4v9.42h12.2V7.83Z" fill="currentColor"/></svg>`,
    linkedin: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6.94 6.5A1.94 1.94 0 1 1 3.06 6.5a1.94 1.94 0 0 1 3.88 0ZM3.5 8.75h3v11h-3v-11Zm6.5 0h2.88v1.51h.04c.4-.74 1.4-1.51 2.88-1.51 3.08 0 3.64 2.03 3.64 4.67v6.33h-3v-5.61c0-1.34-.02-3.07-1.87-3.07-1.88 0-2.17 1.47-2.17 2.97v5.71h-3v-11Z" fill="currentColor"/></svg>`,
    github: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2.5a9.5 9.5 0 0 0-3 18.53c.47.09.64-.2.64-.45v-1.57c-2.62.57-3.17-1.13-3.17-1.13-.43-1.1-1.05-1.39-1.05-1.39-.86-.59.07-.58.07-.58.95.07 1.45.98 1.45.98.84 1.44 2.2 1.02 2.73.78.08-.62.33-1.02.6-1.25-2.1-.24-4.31-1.05-4.31-4.67 0-1.03.37-1.87.98-2.53-.1-.24-.43-1.2.09-2.5 0 0 .8-.25 2.62.97a9.13 9.13 0 0 1 4.77 0c1.82-1.22 2.62-.97 2.62-.97.52 1.3.19 2.26.09 2.5.61.66.98 1.5.98 2.53 0 3.63-2.21 4.43-4.32 4.67.34.29.64.86.64 1.73v2.57c0 .25.17.55.65.45A9.5 9.5 0 0 0 12 2.5Z" fill="currentColor"/></svg>`,
    portfolio: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2.5A9.5 9.5 0 1 0 21.5 12 9.51 9.51 0 0 0 12 2.5Zm6.75 8h-2.97a15.1 15.1 0 0 0-1.2-4.04 7.55 7.55 0 0 1 4.17 4.04ZM12 4.7c.75 1 1.45 2.42 1.9 4.38h-3.8c.45-1.96 1.15-3.38 1.9-4.38ZM4.93 14.1a7.42 7.42 0 0 1 0-4.2h3.11c-.1.68-.16 1.38-.16 2.1s.06 1.42.16 2.1H4.93Zm.99 1.5h2.97a15.1 15.1 0 0 0 1.2 4.04 7.55 7.55 0 0 1-4.17-4.04Zm2.97-7H5.92a7.55 7.55 0 0 1 4.17-4.04 15.1 15.1 0 0 0-1.2 4.04ZM12 19.3c-.75-1-1.45-2.42-1.9-4.38h3.8c-.45 1.96-1.15 3.38-1.9 4.38Zm2.06-5.88h-4.12c-.11-.68-.19-1.38-.19-2.1s.08-1.42.19-2.1h4.12c.11.68.19 1.38.19 2.1s-.08 1.42-.19 2.1Zm.42 5.2a15.1 15.1 0 0 0 1.2-4.04h2.97a7.55 7.55 0 0 1-4.17 4.04Zm2.44-5.54c.1-.68.16-1.38.16-2.1s-.06-1.42-.16-2.1h3.11a7.42 7.42 0 0 1 0 4.2h-3.11Z" fill="currentColor"/></svg>`,
  };

  return icons[kind] || "";
}

function asList(items, maxItems) {
  const values = Array.isArray(items) ? items.slice(0, maxItems ?? items.length) : [];
  if (!values.length) return "";
  return `<ul class="list">${values.map((item) => `<li>${escapeHtml(t(item))}</li>`).join("")}</ul>`;
}

function sectionHeader(title, subtitle, chips = []) {
  const chipsMarkup = chips.length
    ? `<div class="chip-row">${chips.map((chip) => `<span class="meta-pill">${escapeHtml(chip)}</span>`).join("")}</div>`
    : "";

  return `
    <div class="section-header reveal">
      <div>
        <h2 class="section-title">${escapeHtml(title)}</h2>
        <p class="section-subtitle">${escapeHtml(subtitle)}</p>
      </div>
      ${chipsMarkup}
    </div>`;
}

function computeYearsExperience(experience) {
  const years = (experience || [])
    .flatMap((item) => [item?.period?.es, item?.period?.en, typeof item?.period === "string" ? item.period : ""])
    .filter(Boolean)
    .flatMap((value) => value.match(/(19|20)\d{2}/g) || [])
    .map(Number);

  if (!years.length) return 0;
  return Math.max(1, new Date().getFullYear() - Math.min(...years) + 1);
}

function getSafeWhatsApp(phone) {
  const digits = String(phone || "").replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : "";
}

function countSkills(skills) {
  const all = Object.values(skills || {}).flatMap((items) => (Array.isArray(items) ? items : []));
  return new Set(all).size;
}

function extractImpactSignals(experience) {
  const raw = (experience || [])
    .flatMap((item) => [
      ...(item?.achievements?.es || []),
      ...(item?.achievements?.en || []),
      ...(item?.backend?.es || []),
      ...(item?.backend?.en || []),
      ...(item?.qa?.es || []),
      ...(item?.qa?.en || []),
      ...(item?.gamedev?.es || []),
      ...(item?.gamedev?.en || []),
    ])
    .join(" ");

  const percentageMatches = [...new Set((raw.match(/\d+%/g) || []).slice(0, 4))];
  const scaleMatches = [...new Set((raw.match(/\d+K\+/gi) || []).slice(0, 2))];

  const values = [...percentageMatches, ...scaleMatches];
  if (!values.length) return ["30%", "40%", "10K+"];
  return values;
}

function getRoleFitScores(data) {
  const skills = data?.skills || {};
  const backend = Math.min(99, 65 + Math.round((skills.backend?.length || 0) / 3));
  const qa = Math.min(99, 58 + Math.round((skills.qa?.length || 0) / 3));
  const game = Math.min(99, 52 + Math.round((skills.gamedev?.length || 0) / 3));
  const devops = Math.min(99, 48 + Math.round((skills.devops?.length || 0) / 4));

  return [
    { label: tx("roleBackend"), score: backend },
    { label: tx("roleQa"), score: qa },
    { label: tx("roleGame"), score: game },
    { label: tx("roleDevops"), score: devops },
  ];
}

function setLabels() {
  el.navHero.textContent = tx("navHero");
  el.navServices.textContent = tx("navServices");
  el.navExperience.textContent = tx("navExperience");
  el.navProjects.textContent = tx("navProjects");
  el.navContact.textContent = tx("navContact");

  el.heroTitle.textContent = tx("heroTitle");
  el.heroText.textContent = tx("heroText");
  el.primaryCta.textContent = tx("primaryCta");
  el.secondaryCta.textContent = tx("secondaryCta");

  el.yearsLabel.textContent = tx("years");
  el.projectsLabel.textContent = tx("projects");
  el.talksLabel.textContent = tx("talks");
  el.skillsLabel.textContent = tx("skills");
}

function buildHero() {
  const personal = state.data?.personal || {};
  const experience = state.data?.experience || [];
  const projects = state.data?.projects || [];
  const talks = state.data?.talks || [];
  const skills = state.data?.skills || {};

  const years = computeYearsExperience(experience);
  const skillCount = countSkills(skills);

  const tags = [
    tx("hiringSignalA"),
    tx("hiringSignalB"),
    tx("hiringSignalC"),
  ].filter(Boolean);

  el.heroTags.innerHTML = tags.map((tag) => `<span class="chip">${escapeHtml(tag)}</span>`).join("");

  if (personal.photo_url) {
    el.heroPhoto.src = personal.photo_url;
    el.heroPhoto.hidden = false;
  } else {
    el.heroPhoto.hidden = true;
  }

  el.yearsValue.textContent = `${years}+`;
  el.projectsValue.textContent = String(projects.length);
  el.talksValue.textContent = String(talks.length);
  el.skillsValue.textContent = `${skillCount}+`;
}

function buildProof() {
  const experience = state.data?.experience || [];
  const years = computeYearsExperience(experience);
  const techCount = countSkills(state.data?.skills || {});
  const impactSignals = extractImpactSignals(experience);

  const signalCards = impactSignals.slice(0, 4).map((signal) => `
    <article class="metric-card reveal">
      <span class="metric-value">${escapeHtml(signal)}</span>
      <span class="metric-label">${escapeHtml(tx("impact"))}</span>
    </article>`);

  const roleFitCards = getRoleFitScores(state.data)
    .map(
      (item) => `
      <article class="role-fit-item">
        <div class="role-fit-head">
          <strong>${escapeHtml(item.label)}</strong>
          <span>${escapeHtml(String(item.score))}%</span>
        </div>
        <div class="role-fit-bar"><span style="width:${escapeHtml(String(item.score))}%"></span></div>
      </article>`
    )
    .join("");

  el.proof.innerHTML = `
    ${sectionHeader(tx("proofTitle"), tx("proofSubtitle"), [])}
    <div class="proof-grid">
      <article class="metric-card reveal"><span class="metric-value">${escapeHtml(String(years))}+</span><span class="metric-label">${escapeHtml(tx("years"))}</span></article>
      <article class="metric-card reveal"><span class="metric-value">${escapeHtml(String((state.data?.projects || []).length))}</span><span class="metric-label">${escapeHtml(tx("projects"))}</span></article>
      <article class="metric-card reveal"><span class="metric-value">${escapeHtml(String((state.data?.talks || []).length))}</span><span class="metric-label">${escapeHtml(tx("talks"))}</span></article>
      <article class="metric-card reveal"><span class="metric-value">${escapeHtml(String(techCount))}+</span><span class="metric-label">${escapeHtml(tx("skills"))}</span></article>
      ${signalCards.join("")}
    </div>
    <div class="metric-panel reveal">
      <p>${escapeHtml(tx("proofQuote"))}</p>
    </div>
    <article class="role-fit reveal">
      <h3>${escapeHtml(tx("roleFitTitle"))}</h3>
      <p>${escapeHtml(tx("roleFitSubtitle"))}</p>
      <div class="role-fit-grid">${roleFitCards}</div>
    </article>`;
}

function buildServices() {
  const services = state.data?.Rservices?.[state.lang] || [];
  if (!services.length) return insertEmpty(el.services);

  const cards = services.slice(0, 6).map((service) => `
    <article class="card reveal">
      <h3>${escapeHtml(service.title || "")}</h3>
      ${asList(service.items || [], 5)}
    </article>`);

  el.services.innerHTML = `${sectionHeader(tx("servicesTitle"), tx("servicesSubtitle"), [])}<div class="card-grid">${cards.join("")}</div>`;
}

function buildExperience() {
  const experience = state.data?.experience || [];
  if (!experience.length) return insertEmpty(el.experience);

  const cards = experience.slice(0, 6).map((item) => {
    const achievements = item?.achievements?.[state.lang] || [];
    const roles = Array.isArray(item.roles) ? item.roles : [];

    return `
      <article class="card reveal">
        <div class="timeline-head">
          <div>
            <h3>${escapeHtml(item.company || "")}</h3>
            <p class="timeline-meta">${escapeHtml(t(item.period))}</p>
          </div>
          <span class="timeline-year">${escapeHtml(roles.join(" · ") || tx("roleLabel"))}</span>
        </div>
        <div class="role-row">${roles.map((role) => `<span class="role">${escapeHtml(role)}</span>`).join("")}</div>
        ${achievements.length ? `<ul class="step-list">${achievements.slice(0, 3).map((value) => `<li>${escapeHtml(value)}</li>`).join("")}</ul>` : ""}
      </article>`;
  });

  el.experience.innerHTML = `${sectionHeader(tx("experienceTitle"), tx("experienceSubtitle"), [])}<div class="experience-grid">${cards.join("")}</div>`;
}

function buildProjects() {
  const projects = Array.isArray(state.data?.projects) ? state.data.projects : [];
  if (!projects.length) return insertEmpty(el.projects);

  const cards = projects.map((project) => `
    <article class="card reveal">
      <span class="tag">${escapeHtml(t(project.type))}</span>
      <h3>${escapeHtml(t(project.name))}</h3>
      <p>${escapeHtml(t(project.description))}</p>
      ${asList(project.technologies || [], 5)}
      ${project.link ? `<a class="project-link" href="${escapeHtml(project.link)}" target="_blank" rel="noopener noreferrer">${escapeHtml(tx("viewProject"))}</a>` : ""}
    </article>`);

  el.projects.innerHTML = `${sectionHeader(tx("projectsTitle"), tx("projectsSubtitle"), [])}<div class="card-grid">${cards.join("")}</div>`;
}

function buildRecognition() {
  const talks = Array.isArray(state.data?.talks) ? state.data.talks : [];
  const certs = Array.isArray(state.data?.certifications) ? state.data.certifications : [];
  const education = Array.isArray(state.data?.education) ? state.data.education : [];

  const talkCards = talks.slice(0, 4).map((talk) => `
    <article class="card reveal">
      <span class="tag">${escapeHtml(talk.event || "Talk")}</span>
      <h3>${escapeHtml(t(talk.title))}</h3>
      <p>${escapeHtml(talk.date || "")}</p>
      ${talk.link ? `<a class="project-link" href="${escapeHtml(talk.link)}" target="_blank" rel="noopener noreferrer">${escapeHtml(tx("openTalk"))}</a>` : ""}
    </article>`);

  const credentialCards = [
    `<article class="card reveal"><h3>${escapeHtml(tx("certificationLabel"))}</h3><ul class="recognition-list">${certs.slice(0, 4).map((cert) => `<li>${escapeHtml(cert.name || "")} · ${escapeHtml(cert.issuer || "")}${cert.date ? ` · ${escapeHtml(cert.date)}` : ""}</li>`).join("") || "<li>-</li>"}</ul></article>`,
    `<article class="card reveal"><h3>${escapeHtml(tx("educationLabel"))}</h3><ul class="recognition-list">${education.slice(0, 4).map((item) => `<li>${escapeHtml(t(item.name))}${item.year ? ` · ${escapeHtml(item.year)}` : ""}</li>`).join("") || "<li>-</li>"}</ul></article>`
  ];

  el.recognition.innerHTML = `${sectionHeader(tx("recognitionTitle"), tx("recognitionSubtitle"), [])}<div class="recognition-grid">${talkCards.join("")}${credentialCards.join("")}</div>`;
}

function buildContact() {
  const personal = state.data?.personal || {};
  const links = state.data?.links || {};
  const whatsAppLink = getSafeWhatsApp(personal.phone);

  const actions = [
    personal.email ? `<a class="button primary" href="mailto:${escapeHtml(personal.email)}">${iconMarkup("mail")}<span>${escapeHtml(tx("email"))}</span></a>` : "",
    links.linkedin ? `<a class="button" href="${escapeHtml(links.linkedin)}" target="_blank" rel="noopener noreferrer">${iconMarkup("linkedin")}<span>${escapeHtml(tx("linkedin"))}</span></a>` : "",
    links.github ? `<a class="button" href="${escapeHtml(links.github)}" target="_blank" rel="noopener noreferrer">${iconMarkup("github")}<span>${escapeHtml(tx("github"))}</span></a>` : "",
    links.portfolio ? `<a class="button" href="${escapeHtml(links.portfolio)}" target="_blank" rel="noopener noreferrer">${iconMarkup("portfolio")}<span>${escapeHtml(tx("portfolio"))}</span></a>` : "",
    whatsAppLink ? `<a class="button" href="${escapeHtml(whatsAppLink)}" target="_blank" rel="noopener noreferrer"><span>${escapeHtml(tx("whatsapp"))}</span></a>` : "",
  ].filter(Boolean);

  el.contact.innerHTML = `
    <article class="cta-panel reveal">
      <div class="cta-copy">
        <h2>${escapeHtml(tx("contactTitle"))}</h2>
        <p>${escapeHtml(tx("contactSubtitle"))}</p>
      </div>
      <div class="cta-actions">${actions.join("")}</div>
      <p class="cta-note">${escapeHtml(personal.location || "")}</p>
    </article>`;
}

function insertEmpty(container) {
  container.innerHTML = "";
  const cloned = el.emptyTemplate.content.cloneNode(true);
  container.appendChild(cloned);
}

function setupRevealObserver() {
  if (state.observer) {
    state.observer.disconnect();
  }

  state.observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          state.observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((node) => state.observer.observe(node));
}

function renderAll() {
  setLabels();
  buildHero();
  buildProof();
  buildServices();
  buildExperience();
  buildProjects();
  buildRecognition();
  buildContact();
  setupRevealObserver();
}

function setupEvents() {
  el.langSwitch.addEventListener("change", (event) => {
    state.lang = event.target.value;
    renderAll();
  });
}

async function fetchYamlData() {
  for (const path of DATA_PATHS) {
    try {
      const response = await fetch(path);
      if (!response.ok) continue;
      const text = await response.text();
      return jsyaml.load(text);
    } catch (_error) {
      // Continue.
    }
  }

  throw new Error("No se pudo cargar master.yaml");
}

async function init() {
  try {
    state.data = await fetchYamlData();
    setupEvents();
    renderAll();
  } catch (_error) {
    [el.proof, el.services, el.experience, el.projects, el.recognition, el.contact].forEach((container) => {
      container.innerHTML = "";
    });
    insertEmpty(el.proof);
  }
}

init();
