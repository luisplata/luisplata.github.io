const DATA_PATHS = ["./master.yaml", "../../master.yaml"];

const state = {
    lang: "es",
    data: null,
};

const el = {
    hero: document.getElementById("heroContent"),
    proof: document.getElementById("proof"),
    services: document.getElementById("services"),
    projects: document.getElementById("projects"),
    process: document.getElementById("process"),
    cta: document.getElementById("cta"),
    langSwitch: document.getElementById("langSwitch"),
    navServices: document.getElementById("navServices"),
    navProof: document.getElementById("navProof"),
    navProjects: document.getElementById("navProjects"),
    navContact: document.getElementById("navContact"),
    emptyTemplate: document.getElementById("emptyStateTemplate"),
};

const copy = {
    es: {
        heroEyebrow: "Software Developer",
        heroTitle: "Construyo productos digitales de alto impacto, de la arquitectura a produccion.",
        heroSubtitle:
            "Especialista en backend escalable como foco principal, desarrollo Unity como segunda especialidad y automatizacion integral de pruebas y procesos.",
        primaryCta: "Agendar una reunión",
        secondaryCta: "Ver proyectos",
        proofTitle: "Resultados y trayectoria",
        proofSubtitle: "Ejecucion tecnica con prioridad en backend, expansion a Unity y automatizacion transversal para acelerar operaciones.",
        years: "Años de experiencia",
        projects: "Proyectos publicados",
        talks: "Charlas y workshops",
        stack: "Tecnologías de trabajo",
        servicesTitle: "Servicios",
        servicesSubtitle: "Implementacion profesional para equipos que necesitan ownership tecnico, velocidad y calidad sostenida.",
        projectsTitle: "Proyectos destacados",
        projectsSubtitle: "Casos seleccionados en backend, experiencias interactivas con Unity y automatizacion aplicada.",
        processTitle: "Cómo trabajo",
        processSubtitle: "Proceso claro, con responsabilidad end-to-end y foco en objetivos de negocio.",
        ctaTitle: "¿Listo para escalar tu producto?",
        ctaSubtitle: "Si necesitas alguien que construya y entregue, conversemos y definimos el siguiente paso.",
        writeMail: "Email",
        viewLinkedIn: "Ver LinkedIn",
        navServices: "Servicios",
        navProof: "Resultados",
        navProjects: "Proyectos",
        navContact: "Contacto",
        step1Title: "01. Discovery",
        step1Text: "Defino objetivos, restricciones y alcance para ejecutar con precision.",
        step2Title: "02. Arquitectura",
        step2Text: "Diseño arquitectura backend robusta y decisiones tecnicas alineadas al negocio.",
        step3Title: "03. Implementación",
        step3Text: "Implemento entregables funcionales en iteraciones cortas con visibilidad continua.",
        step4Title: "04. Automatizacion y entrega",
        step4Text: "Automatizo pruebas y procesos operativos para liberar con confianza y continuidad.",
    },
    en: {
        heroEyebrow: "Backend • Unity • Automation",
        heroTitle: "I build high-impact digital products, from architecture to production.",
        heroSubtitle:
            "You hire me to execute: scalable backend as the core focus, Unity development as the second specialty, and end-to-end automation for testing and business processes.",
        primaryCta: "Book a meeting",
        secondaryCta: "View projects",
        proofTitle: "Results and track record",
        proofSubtitle: "Technical execution led by backend engineering, expanded with Unity delivery and cross-functional automation.",
        years: "Years of experience",
        projects: "Published projects",
        talks: "Talks and workshops",
        stack: "Technologies used",
        servicesTitle: "Services",
        servicesSubtitle: "Professional implementation for teams that need technical ownership, speed, and sustained quality.",
        projectsTitle: "Featured projects",
        projectsSubtitle: "Selected cases across backend systems, Unity interactive products, and applied automation.",
        processTitle: "How I work",
        processSubtitle: "A clear end-to-end process aligned with business outcomes.",
        ctaTitle: "Ready to scale your product?",
        ctaSubtitle: "If you need someone who builds and ships, let us define the next concrete step.",
        writeMail: "Email",
        viewLinkedIn: "Open LinkedIn",
        navServices: "Services",
        navProof: "Results",
        navProjects: "Projects",
        navContact: "Contact",
        step1Title: "01. Discovery",
        step1Text: "I define goals, constraints, and scope to execute with precision.",
        step2Title: "02. Architecture",
        step2Text: "I design robust backend architecture with business-aligned technical decisions.",
        step3Title: "03. Implementation",
        step3Text: "I deliver functional increments in short iterations with continuous visibility.",
        step4Title: "04. Automation and delivery",
        step4Text: "I automate testing and operational processes to ship with confidence and continuity.",
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

function asList(items, maxItems) {
    const values = Array.isArray(items) ? items.slice(0, maxItems ?? items.length) : [];
    if (!values.length) return "";
    return `<ul class="list">${values.map((item) => `<li>${escapeHtml(t(item))}</li>`).join("")}</ul>`;
}

function sectionHeader(title, subtitle) {
    return `<h2 class="section-title fade-in">${escapeHtml(title)}</h2><p class="section-subtitle fade-in">${escapeHtml(subtitle)}</p>`;
}

function collectYearsFromPeriod(period) {
    const raw = [period?.es, period?.en, typeof period === "string" ? period : ""].filter(Boolean).join(" ");
    const matches = raw.match(/(19|20)\d{2}/g) || [];
    return matches.map((value) => Number(value));
}

function computeYearsExperience(experience) {
    const years = (experience || []).flatMap((item) => collectYearsFromPeriod(item.period));
    if (!years.length) return 0;
    const minYear = Math.min(...years);
    const currentYear = new Date().getFullYear();
    return Math.max(1, currentYear - minYear + 1);
}

function uniqueTechCount(skills) {
    const values = Object.values(skills || {}).flatMap((items) => (Array.isArray(items) ? items : []));
    return new Set(values).size;
}

function getSafeWhatsApp(phone) {
    const digits = String(phone || "").replace(/\D/g, "");
    if (!digits) return "#cta";
    return `https://wa.me/${digits}`;
}

function iconMarkup(kind) {
    const icons = {
                mail: `
                        <svg class="button__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                            <path d="M4.5 6.75A2.25 2.25 0 0 1 6.75 4.5h10.5A2.25 2.25 0 0 1 19.5 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H6.75a2.25 2.25 0 0 1-2.25-2.25V6.75Zm2.07-.75 5.43 4.18 5.43-4.18H6.57Zm11.13 1.83-5.19 4a1.5 1.5 0 0 1-1.82 0l-5.19-4v9.42h12.2V7.83Z" fill="currentColor"/>
                        </svg>`,
        linkedin: `
            <svg class="button__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M6.94 6.5A1.94 1.94 0 1 1 3.06 6.5a1.94 1.94 0 0 1 3.88 0ZM3.5 8.75h3v11h-3v-11Zm6.5 0h2.88v1.51h.04c.4-.74 1.4-1.51 2.88-1.51 3.08 0 3.64 2.03 3.64 4.67v6.33h-3v-5.61c0-1.34-.02-3.07-1.87-3.07-1.88 0-2.17 1.47-2.17 2.97v5.71h-3v-11Z" fill="currentColor"/>
            </svg>`,
        github: `
            <svg class="button__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M12 2.5a9.5 9.5 0 0 0-3 18.53c.47.09.64-.2.64-.45v-1.57c-2.62.57-3.17-1.13-3.17-1.13-.43-1.1-1.05-1.39-1.05-1.39-.86-.59.07-.58.07-.58.95.07 1.45.98 1.45.98.84 1.44 2.2 1.02 2.73.78.08-.62.33-1.02.6-1.25-2.1-.24-4.31-1.05-4.31-4.67 0-1.03.37-1.87.98-2.53-.1-.24-.43-1.2.09-2.5 0 0 .8-.25 2.62.97a9.13 9.13 0 0 1 4.77 0c1.82-1.22 2.62-.97 2.62-.97.52 1.3.19 2.26.09 2.5.61.66.98 1.5.98 2.53 0 3.63-2.21 4.43-4.32 4.67.34.29.64.86.64 1.73v2.57c0 .25.17.55.65.45A9.5 9.5 0 0 0 12 2.5Z" fill="currentColor"/>
            </svg>`,
        portfolio: `
            <svg class="button__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M12 2.5A9.5 9.5 0 1 0 21.5 12 9.51 9.51 0 0 0 12 2.5Zm6.75 8h-2.97a15.1 15.1 0 0 0-1.2-4.04 7.55 7.55 0 0 1 4.17 4.04ZM12 4.7c.75 1 1.45 2.42 1.9 4.38h-3.8c.45-1.96 1.15-3.38 1.9-4.38ZM4.93 14.1a7.42 7.42 0 0 1 0-4.2h3.11c-.1.68-.16 1.38-.16 2.1s.06 1.42.16 2.1H4.93Zm.99 1.5h2.97a15.1 15.1 0 0 0 1.2 4.04 7.55 7.55 0 0 1-4.17-4.04Zm2.97-7H5.92a7.55 7.55 0 0 1 4.17-4.04 15.1 15.1 0 0 0-1.2 4.04ZM12 19.3c-.75-1-1.45-2.42-1.9-4.38h3.8c-.45 1.96-1.15 3.38-1.9 4.38Zm2.06-5.88h-4.12c-.11-.68-.19-1.38-.19-2.1s.08-1.42.19-2.1h4.12c.11.68.19 1.38.19 2.1s-.08 1.42-.19 2.1Zm.42 5.2a15.1 15.1 0 0 0 1.2-4.04h2.97a7.55 7.55 0 0 1-4.17 4.04Zm2.44-5.54c.1-.68.16-1.38.16-2.1s-.06-1.42-.16-2.1h3.11a7.42 7.42 0 0 1 0 4.2h-3.11Z" fill="currentColor"/>
            </svg>`
    };

    return icons[kind] || "";
}

function renderLinkButton(href, label, iconType, options = {}) {
    if (!href) return "";
    const target = options.target === false ? "" : ` target="${escapeHtml(options.target || "_blank")}"`;
    const rel = options.rel === false ? "" : ` rel="${escapeHtml(options.rel || "noopener noreferrer")}"`;
    return `<a class="button button--with-icon" href="${escapeHtml(href)}"${target}${rel}>${iconMarkup(iconType)}<span>${escapeHtml(label)}</span></a>`;
}

function renderHero() {
    const personal = state.data?.personal || {};

    el.hero.innerHTML = `
    <div class="hero-grid fade-in">
      <div>
        <p class="eyebrow">${escapeHtml(tx("heroEyebrow"))}</p>
        <h1>${escapeHtml(tx("heroTitle"))}</h1>
        <p class="subtitle">${escapeHtml(tx("heroSubtitle"))}</p>
        <div class="hero-cta">
          <a class="button primary" href="${escapeHtml(getSafeWhatsApp(personal.phone))}" target="_blank" rel="noopener noreferrer">${escapeHtml(tx("primaryCta"))}</a>
          <a class="button" href="#projects">${escapeHtml(tx("secondaryCta"))}</a>
        </div>
      </div>
      ${personal.photo_url ? `<img class="hero-photo" src="${escapeHtml(personal.photo_url)}" alt="${escapeHtml(personal.name || "Profile")}" />` : ""}
    </div>
  `;
}

function renderNav() {
    if (el.navServices) el.navServices.textContent = tx("navServices");
    if (el.navProof) el.navProof.textContent = tx("navProof");
    if (el.navProjects) el.navProjects.textContent = tx("navProjects");
    if (el.navContact) el.navContact.textContent = tx("navContact");
}

function renderProof() {
    const experience = state.data?.experience || [];
    const projects = state.data?.projects || [];
    const talks = state.data?.talks || [];
    const skills = state.data?.skills || {};

    const years = computeYearsExperience(experience);
    const techs = uniqueTechCount(skills);
    const companyNames = experience.slice(0, 6).map((item) => item.company).filter(Boolean);

    el.proof.innerHTML = `${sectionHeader(tx("proofTitle"), tx("proofSubtitle"))}
    <div class="card-grid">
      <article class="card fade-in">
        <h3 class="kpi">${escapeHtml(String(years))}+</h3>
        <p>${escapeHtml(tx("years"))}</p>
      </article>
      <article class="card fade-in">
        <h3 class="kpi">${escapeHtml(String(projects.length))}</h3>
        <p>${escapeHtml(tx("projects"))}</p>
      </article>
      <article class="card fade-in">
        <h3 class="kpi">${escapeHtml(String(talks.length))}</h3>
        <p>${escapeHtml(tx("talks"))}</p>
      </article>
      <article class="card fade-in">
        <h3 class="kpi">${escapeHtml(String(techs))}+</h3>
        <p>${escapeHtml(tx("stack"))}</p>
      </article>
    </div>
    <div class="trust-strip fade-in">
      ${companyNames.map((name) => `<span class="trust-chip">${escapeHtml(name)}</span>`).join("")}
    </div>`;
}

function renderServices() {
    const services = state.data?.Rservices?.[state.lang] || [];
    if (!services.length) {
        return insertEmpty(el.services);
    }

    const cards = services
        .slice(0, 6)
        .map(
            (service) => `
      <article class="card fade-in">
        <h3>${escapeHtml(service.title || "")}</h3>
        ${asList(service.items || [], 4)}
      </article>`
        )
        .join("");

    el.services.innerHTML = `${sectionHeader(tx("servicesTitle"), tx("servicesSubtitle"))}<div class="card-grid">${cards}</div>`;
}

function renderProjects() {
    const projects = Array.isArray(state.data?.projects) ? state.data.projects : [];
    if (!projects.length) {
        return insertEmpty(el.projects);
    }

    const cards = projects
        .map(
            (project) => `
      <article class="card fade-in">
        <h3>${escapeHtml(t(project.name))}</h3>
        <p>${escapeHtml(t(project.description))}</p>
        ${asList(project.technologies || [], 5)}
                ${project.link ? `<div class="project-cta"><a class="button" href="${escapeHtml(project.link)}" target="_blank" rel="noopener noreferrer">Ver proyecto.</a></div>` : ""}
      </article>`
        )
        .join("");

    el.projects.innerHTML = `${sectionHeader(tx("projectsTitle"), tx("projectsSubtitle"))}<div class="card-grid">${cards}</div>`;
}

function renderProcess() {
    el.process.innerHTML = `${sectionHeader(tx("processTitle"), tx("processSubtitle"))}
    <div class="process-grid fade-in">
      <article class="step"><strong>${escapeHtml(tx("step1Title"))}</strong><p>${escapeHtml(tx("step1Text"))}</p></article>
      <article class="step"><strong>${escapeHtml(tx("step2Title"))}</strong><p>${escapeHtml(tx("step2Text"))}</p></article>
      <article class="step"><strong>${escapeHtml(tx("step3Title"))}</strong><p>${escapeHtml(tx("step3Text"))}</p></article>
      <article class="step"><strong>${escapeHtml(tx("step4Title"))}</strong><p>${escapeHtml(tx("step4Text"))}</p></article>
    </div>`;
}

function renderCta() {
    const personal = state.data?.personal || {};
    const links = state.data?.links || {};

    el.cta.innerHTML = `
    <article class="cta-panel fade-in">
      <h2>${escapeHtml(tx("ctaTitle"))}</h2>
      <p class="subtitle">${escapeHtml(tx("ctaSubtitle"))}</p>
      <div class="cta-actions">
                ${personal.email ? renderLinkButton(`mailto:${personal.email}`, tx("writeMail"), "mail", { target: false, rel: false }) : ""}
                ${renderLinkButton(links.linkedin, tx("viewLinkedIn"), "linkedin")}
                ${renderLinkButton(links.github, "GitHub", "github")}
                ${renderLinkButton(links.portfolio, "Portfolio", "portfolio")}
      </div>
    </article>`;
}

function insertEmpty(container) {
    container.innerHTML = "";
    const cloned = el.emptyTemplate.content.cloneNode(true);
    container.appendChild(cloned);
}

function renderAll() {
    renderNav();
    renderHero();
    renderProof();
    renderServices();
    renderProjects();
    renderProcess();
    renderCta();
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
            var jsonData = jsyaml.load(text);
            // console.log("Datos cargados desde:", path, jsonData);
            return jsonData;
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
        el.proof.innerHTML = "";
        el.services.innerHTML = "";
        el.projects.innerHTML = "";
        el.process.innerHTML = "";
        el.cta.innerHTML = `<article class="card empty"><h3>${escapeHtml(error.message)}</h3></article>`;
    }
}

init();
