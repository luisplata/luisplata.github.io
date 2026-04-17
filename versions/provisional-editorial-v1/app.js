const DATA_PATHS = ["./master.yaml", "../../master.yaml"];

const state = {
  lang: "es",
  data: null,
  observer: null,
};

const el = {
  hero: document.getElementById("hero"),
  heroEyebrow: document.getElementById("heroEyebrow"),
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
  emptyTemplate: document.getElementById("emptyStateTemplate"),
};

const copy = {
  es: {
    heroEyebrow: "Atlas técnico 2026",
    heroTitle: "Una carta de navegación, no una landing genérica.",
    heroText:
      "Convertí master.yaml en un dossier visual: más contraste, más carácter y una lectura que prioriza señales, no relleno.",
    primaryCta: "Abrir contacto",
    secondaryCta: "Explorar atlas",
    years: "Años de experiencia",
    projects: "Proyectos publicados",
    talks: "Charlas",
    skills: "Tecnologías",
    proofTitle: "Mapa de señales",
    proofSubtitle: "Organicé los datos para que el primer golpe visual muestre alcance, trayectoria y foco.",
    proofQuote: "Backend como eje, QA como control y Unity como extensión del producto.",
    servicesTitle: "Capacidades mapeadas",
    servicesSubtitle: "Se leen como bloques de una ficha técnica, no como una lista plana de servicios.",
    experienceTitle: "Ruta profesional",
    experienceSubtitle: "Una línea de tiempo breve con empresas, períodos y los puntos más fuertes.",
    projectsTitle: "Obras seleccionadas",
    projectsSubtitle: "Tus proyectos publicados refuerzan versatilidad y profundidad técnica.",
    recognitionTitle: "Credenciales y ecos",
    recognitionSubtitle: "Material suficiente para mostrar autoridad sin convertir la página en un archivo largo.",
    contactTitle: "Si querés una versión más comercial, la base ya está lista",
    contactSubtitle: "Después podemos mover esta misma estructura a otra estética o dejarla como principal.",
    email: "Email",
    linkedin: "LinkedIn",
    github: "GitHub",
    portfolio: "Portfolio",
    navHero: "Inicio",
    navServices: "Servicios",
    navExperience: "Experiencia",
    navProjects: "Proyectos",
    navContact: "Contacto",
    impact: "Impacto",
    focus: "Foco",
    credentials: "Credenciales",
    viewProject: "Abrir proyecto",
    openTalk: "Ver charla",
    roleLabel: "Roles",
    achievementsLabel: "Logros",
    educationLabel: "Educación",
    certificationLabel: "Certificaciones",
  },
  en: {
    heroEyebrow: "Technical atlas 2026",
    heroTitle: "A navigation chart, not a generic landing.",
    heroText:
      "I turned master.yaml into a visual dossier: more contrast, more character, and a reading order that prioritizes signals over filler.",
    primaryCta: "Open contact",
    secondaryCta: "Explore atlas",
    years: "Years of experience",
    projects: "Published projects",
    talks: "Talks",
    skills: "Technologies",
    proofTitle: "Signal map",
    proofSubtitle: "I arranged the data so the first glance shows scope, track record, and focus.",
    proofQuote: "Backend as the core, QA as control, Unity as a product extension.",
    servicesTitle: "Mapped capabilities",
    servicesSubtitle: "They read like technical dossier blocks, not a flat service list.",
    experienceTitle: "Professional route",
    experienceSubtitle: "A short timeline with companies, periods, and the strongest points.",
    projectsTitle: "Selected works",
    projectsSubtitle: "Your published projects reinforce versatility and technical depth.",
    recognitionTitle: "Credentials and echoes",
    recognitionSubtitle: "Enough material to show authority without turning the page into an archive dump.",
    contactTitle: "If you want a more commercial version, the base is ready",
    contactSubtitle: "We can later move this same structure to another aesthetic or keep it as the main one.",
    email: "Email",
    linkedin: "LinkedIn",
    github: "GitHub",
    portfolio: "Portfolio",
    navHero: "Home",
    navServices: "Services",
    navExperience: "Experience",
    navProjects: "Projects",
    navContact: "Contact",
    impact: "Impact",
    focus: "Focus",
    credentials: "Credentials",
    viewProject: "Open project",
    openTalk: "Open talk",
    roleLabel: "Roles",
    achievementsLabel: "Achievements",
    educationLabel: "Education",
    certificationLabel: "Certifications",
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
    mail: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4.5 6.75A2.25 2.25 0 0 1 6.75 4.5h10.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25H6.75a2.25 2.25 0 0 1-2.25-2.25V6.75Zm2.07-.75 5.43 4.18 5.43-4.18H6.57Zm11.13 1.83-5.19 4a1.5 1.5 0 0 1-1.82 0l-5.19-4v9.42h12.2V7.83Z" fill="currentColor"/>
      </svg>`,
    linkedin: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M6.94 6.5A1.94 1.94 0 1 1 3.06 6.5a1.94 1.94 0 0 1 3.88 0ZM3.5 8.75h3v11h-3v-11Zm6.5 0h2.88v1.51h.04c.4-.74 1.4-1.51 2.88-1.51 3.08 0 3.64 2.03 3.64 4.67v6.33h-3v-5.61c0-1.34-.02-3.07-1.87-3.07-1.88 0-2.17 1.47-2.17 2.97v5.71h-3v-11Z" fill="currentColor"/>
      </svg>`,
    github: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 2.5a9.5 9.5 0 0 0-3 18.53c.47.09.64-.2.64-.45v-1.57c-2.62.57-3.17-1.13-3.17-1.13-.43-1.1-1.05-1.39-1.05-1.39-.86-.59.07-.58.07-.58.95.07 1.45.98 1.45.98.84 1.44 2.2 1.02 2.73.78.08-.62.33-1.02.6-1.25-2.1-.24-4.31-1.05-4.31-4.67 0-1.03.37-1.87.98-2.53-.1-.24-.43-1.2.09-2.5 0 0 .8-.25 2.62.97a9.13 9.13 0 0 1 4.77 0c1.82-1.22 2.62-.97 2.62-.97.52 1.3.19 2.26.09 2.5.61.66.98 1.5.98 2.53 0 3.63-2.21 4.43-4.32 4.67.34.29.64.86.64 1.73v2.57c0 .25.17.55.65.45A9.5 9.5 0 0 0 12 2.5Z" fill="currentColor"/>
      </svg>`,
    portfolio: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 2.5A9.5 9.5 0 1 0 21.5 12 9.51 9.51 0 0 0 12 2.5Zm6.75 8h-2.97a15.1 15.1 0 0 0-1.2-4.04 7.55 7.55 0 0 1 4.17 4.04ZM12 4.7c.75 1 1.45 2.42 1.9 4.38h-3.8c.45-1.96 1.15-3.38 1.9-4.38ZM4.93 14.1a7.42 7.42 0 0 1 0-4.2h3.11c-.1.68-.16 1.38-.16 2.1s.06 1.42.16 2.1H4.93Zm.99 1.5h2.97a15.1 15.1 0 0 0 1.2 4.04 7.55 7.55 0 0 1-4.17-4.04Zm2.97-7H5.92a7.55 7.55 0 0 1 4.17-4.04 15.1 15.1 0 0 0-1.2 4.04ZM12 19.3c-.75-1-1.45-2.42-1.9-4.38h3.8c-.45 1.96-1.15 3.38-1.9 4.38Zm2.06-5.88h-4.12c-.11-.68-.19-1.38-.19-2.1s.08-1.42.19-2.1h4.12c.11.68.19 1.38.19 2.1s-.08 1.42-.19 2.1Zm.42 5.2a15.1 15.1 0 0 0 1.2-4.04h2.97a7.55 7.55 0 0 1-4.17 4.04Zm2.44-5.54c.1-.68.16-1.38.16-2.1s-.06-1.42-.16-2.1h3.11a7.42 7.42 0 0 1 0 4.2h-3.11Z" fill="currentColor"/>
      </svg>`
  };

  return icons[kind] || "";
}

function getSafeMailto(email) {
  return email ? `mailto:${email}` : "#contact";
}

function sectionHeader(title, subtitle, chips = []) {
  const chipMarkup = chips.length
    ? `<div class="chip-row">${chips.map((chip) => `<span class="meta-pill">${escapeHtml(chip)}</span>`).join("")}</div>`
    : "";

  return `
    <div class="section-header reveal">
      <div>
        <h2 class="section-title">${escapeHtml(title)}</h2>
        <p class="section-subtitle">${escapeHtml(subtitle)}</p>
      </div>
      ${chipMarkup}
    </div>`;
}

function asList(items, maxItems) {
  const values = Array.isArray(items) ? items.slice(0, maxItems ?? items.length) : [];
  if (!values.length) return "";

  return `<ul class="list">${values.map((item) => `<li>${escapeHtml(t(item))}</li>`).join("")}</ul>`;
}

function computeYearsExperience(experience) {
  const years = (experience || [])
    .flatMap((item) => [item?.period?.es, item?.period?.en, typeof item?.period === "string" ? item.period : ""])
    .filter(Boolean)
    .flatMap((value) => value.match(/(19|20)\d{2}/g) || [])
    .map(Number);

  if (!years.length) return 0;

  const currentYear = new Date().getFullYear();
  return Math.max(1, currentYear - Math.min(...years) + 1);
}

function countSkills(skills) {
  const values = Object.values(skills || {}).flatMap((items) => (Array.isArray(items) ? items : []));
  return new Set(values).size;
}

function setActiveLangLabels() {
  if (el.navHero) el.navHero.textContent = tx("navHero");
  if (el.navServices) el.navServices.textContent = tx("navServices");
  if (el.navExperience) el.navExperience.textContent = tx("navExperience");
  if (el.navProjects) el.navProjects.textContent = tx("navProjects");
  if (el.navContact) el.navContact.textContent = tx("navContact");

  if (el.heroEyebrow) el.heroEyebrow.textContent = tx("heroEyebrow");
  if (el.heroTitle) el.heroTitle.textContent = tx("heroTitle");
  if (el.heroText) el.heroText.textContent = tx("heroText");
  const primaryCta = document.getElementById("primaryCta");
  const secondaryCta = document.getElementById("secondaryCta");
  if (primaryCta) primaryCta.textContent = tx("primaryCta");
  if (secondaryCta) secondaryCta.textContent = tx("secondaryCta");

  if (el.yearsLabel) el.yearsLabel.textContent = tx("years");
  if (el.projectsLabel) el.projectsLabel.textContent = tx("projects");
  if (el.talksLabel) el.talksLabel.textContent = tx("talks");
  if (el.skillsLabel) el.skillsLabel.textContent = tx("skills");
}

function buildHero() {
  const personal = state.data?.personal || {};
  const experience = state.data?.experience || [];
  const projects = state.data?.projects || [];
  const talks = state.data?.talks || [];
  const skills = state.data?.skills || {};

  const years = computeYearsExperience(experience);
  const skillCount = countSkills(skills);
  const summaryTags = [
    skills.backend?.length ? `Backend ${skills.backend.length}` : null,
    skills.qa?.length ? `QA ${skills.qa.length}` : null,
    skills.gamedev?.length ? `Unity ${skills.gamedev.length}` : null,
    skills.devops?.length ? `DevOps ${skills.devops.length}` : null,
  ].filter(Boolean);

  el.heroTags.innerHTML = summaryTags
    .map((tag) => `<span class="chip"><strong>•</strong> ${escapeHtml(tag)}</span>`)
    .join("");

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
  const skills = state.data?.skills || {};
  const techs = countSkills(skills);
  const years = computeYearsExperience(experience);
  const companies = experience.slice(0, 5).map((item) => item.company).filter(Boolean);

  el.proof.innerHTML = `
    ${sectionHeader(tx("proofTitle"), tx("proofSubtitle"), [tx("impact"), tx("focus")])}
    <div class="proof-grid">
      <article class="metric-card reveal"><span class="metric-value">${escapeHtml(String(years))}+</span><span class="metric-label">${escapeHtml(tx("years"))}</span></article>
      <article class="metric-card reveal"><span class="metric-value">${escapeHtml(String((state.data?.projects || []).length))}</span><span class="metric-label">${escapeHtml(tx("projects"))}</span></article>
      <article class="metric-card reveal"><span class="metric-value">${escapeHtml(String((state.data?.talks || []).length))}</span><span class="metric-label">${escapeHtml(tx("talks"))}</span></article>
      <article class="metric-card reveal"><span class="metric-value">${escapeHtml(String(techs))}+</span><span class="metric-label">${escapeHtml(tx("skills"))}</span></article>
    </div>
    <div class="metric-panel reveal">
      <p>${escapeHtml(tx("proofQuote"))}</p>
      <div class="chip-row" style="margin-top: 0.8rem;">${companies.map((company) => `<span class="badge">${escapeHtml(company)}</span>`).join("")}</div>
    </div>`;
}

function buildServices() {
  const services = state.data?.Rservices?.[state.lang] || [];

  if (!services.length) {
    el.services.innerHTML = "";
    insertEmpty(el.services);
    return;
  }

  const cards = services.slice(0, 6).map((service, index) => {
    const palette = ["#f2b46d", "#7ce3d0", "#9cafff", "#ffd7a0", "#c8c1ff", "#96e6b3"][index % 6];

    return `
      <article class="card service-card reveal" style="border-top: 3px solid ${palette};">
        <h3>${escapeHtml(service.title || "")}</h3>
        ${asList(service.items || [], 5)}
      </article>`;
  });

  el.services.innerHTML = `
    ${sectionHeader(tx("servicesTitle"), tx("servicesSubtitle"), [tx("focus")])}
    <div class="card-grid">${cards.join("")}</div>`;
}

function buildExperience() {
  const experience = state.data?.experience || [];

  if (!experience.length) {
    el.experience.innerHTML = "";
    insertEmpty(el.experience);
    return;
  }

  const cards = experience.slice(0, 6).map((item) => {
    const achievements = item?.achievements?.[state.lang] || [];
    const roles = Array.isArray(item.roles) ? item.roles : [];

    return `
      <article class="card experience-card reveal">
        <div class="timeline-head">
          <div>
            <h3>${escapeHtml(item.company || "")}</h3>
            <p class="timeline-meta">${escapeHtml(t(item.period))}</p>
          </div>
          <span class="timeline-year">${escapeHtml(roles.join(" · ") || tx("roleLabel"))}</span>
        </div>
        <div class="role-row">
          ${roles.map((role) => `<span class="role">${escapeHtml(role)}</span>`).join("")}
        </div>
        ${achievements.length ? `<ul class="step-list">${achievements.slice(0, 3).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : ""}
      </article>`;
  });

  el.experience.innerHTML = `
    ${sectionHeader(tx("experienceTitle"), tx("experienceSubtitle"), [tx("roleLabel"), tx("achievementsLabel")])}
    <div class="experience-grid">${cards.join("")}</div>`;
}

function buildProjects() {
  const projects = Array.isArray(state.data?.projects) ? state.data.projects : [];

  if (!projects.length) {
    el.projects.innerHTML = "";
    insertEmpty(el.projects);
    return;
  }

  const cards = projects.map((project) => {
    const link = project.link ? `<a class="project-link" href="${escapeHtml(project.link)}" target="_blank" rel="noopener noreferrer">${escapeHtml(tx("viewProject"))}</a>` : "";

    return `
      <article class="card project-card reveal">
        <span class="tag">${escapeHtml(t(project.type))}</span>
        <h3>${escapeHtml(t(project.name))}</h3>
        <p>${escapeHtml(t(project.description))}</p>
        ${asList(project.technologies || [], 5)}
        ${link}
      </article>`;
  });

  el.projects.innerHTML = `
    ${sectionHeader(tx("projectsTitle"), tx("projectsSubtitle"), [tx("impact")])}
    <div class="card-grid">${cards.join("")}</div>`;
}

function buildRecognition() {
  const talks = Array.isArray(state.data?.talks) ? state.data.talks : [];
  const certifications = Array.isArray(state.data?.certifications) ? state.data.certifications : [];
  const education = Array.isArray(state.data?.education) ? state.data.education : [];

  const talkCards = talks.slice(0, 4).map((talk) => `
    <article class="card recognition-card reveal">
      <span class="tag">${escapeHtml(talk.event || "Talk")}</span>
      <h3>${escapeHtml(t(talk.title))}</h3>
      <p>${escapeHtml(talk.date || "")}</p>
      ${talk.link ? `<a class="project-link" href="${escapeHtml(talk.link)}" target="_blank" rel="noopener noreferrer">${escapeHtml(tx("openTalk"))}</a>` : ""}
    </article>`);

  const credentialCards = [
    `
      <article class="card recognition-card reveal">
        <h3>${escapeHtml(tx("certificationLabel"))}</h3>
        <ul class="recognition-list">
          ${certifications.slice(0, 4).map((cert) => `<li>${escapeHtml(cert.name || "")} · ${escapeHtml(cert.issuer || "")}${cert.date ? ` · ${escapeHtml(cert.date)}` : ""}</li>`).join("") || "<li>-</li>"}
        </ul>
      </article>`,
    `
      <article class="card recognition-card reveal">
        <h3>${escapeHtml(tx("educationLabel"))}</h3>
        <ul class="recognition-list">
          ${education.slice(0, 4).map((item) => `<li>${escapeHtml(t(item.name))}${item.year ? ` · ${escapeHtml(item.year)}` : ""}</li>`).join("") || "<li>-</li>"}
        </ul>
      </article>`
  ];

  el.recognition.innerHTML = `
    ${sectionHeader(tx("recognitionTitle"), tx("recognitionSubtitle"), [tx("credentials")])}
    <div class="recognition-grid">
      ${talkCards.join("")}
      ${credentialCards.join("")}
    </div>`;
}

function buildContact() {
  const personal = state.data?.personal || {};
  const links = state.data?.links || {};

  const actions = [
    personal.email ? `<a class="button button-primary" href="${escapeHtml(getSafeMailto(personal.email))}">${iconMarkup("mail")}<span>${escapeHtml(tx("email"))}</span></a>` : "",
    links.linkedin ? `<a class="button button-secondary" href="${escapeHtml(links.linkedin)}" target="_blank" rel="noopener noreferrer">${iconMarkup("linkedin")}<span>${escapeHtml(tx("linkedin"))}</span></a>` : "",
    links.github ? `<a class="button button-secondary" href="${escapeHtml(links.github)}" target="_blank" rel="noopener noreferrer">${iconMarkup("github")}<span>${escapeHtml(tx("github"))}</span></a>` : "",
    links.portfolio ? `<a class="button button-secondary" href="${escapeHtml(links.portfolio)}" target="_blank" rel="noopener noreferrer">${iconMarkup("portfolio")}<span>${escapeHtml(tx("portfolio"))}</span></a>` : "",
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
    { threshold: 0.14 }
  );

  document.querySelectorAll(".reveal").forEach((element) => state.observer.observe(element));
}

function renderAll() {
  setActiveLangLabels();
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
      // Try next path.
    }
  }

  throw new Error("No se pudo cargar master.yaml");
}

async function init() {
  try {
    state.data = await fetchYamlData();
    setupEvents();
    renderAll();
  } catch (error) {
    insertEmpty(el.hero);
    [el.proof, el.services, el.experience, el.projects, el.recognition, el.contact].forEach((container) => {
      container.innerHTML = "";
    });

    el.proof.innerHTML = `<article class="card empty-card reveal"><h3>${escapeHtml(error.message)}</h3></article>`;
  }
}

init();