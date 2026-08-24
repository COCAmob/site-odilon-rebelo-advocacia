"use client";

import { useEffect, useId, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { BrandImage } from "./brand-image";
import { articleCategories, articleHref, articles, brand, primaryServices, serviceHref, services, whatsappLink, type Article } from "./site-data";

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const themeStorageKey = "odilon-rebelo-theme";

function subscribeToTheme(onChange: () => void) {
  window.addEventListener("odilon-theme-change", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("odilon-theme-change", onChange);
    window.removeEventListener("storage", onChange);
  };
}

function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribeToTheme, () => document.documentElement.dataset.theme === "dark", () => false);

  function toggleTheme() {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", nextTheme === "dark" ? "#111512" : "#fcfbf8");
    try { localStorage.setItem(themeStorageKey, nextTheme); } catch { /* Private browsing can disable storage. */ }
    window.dispatchEvent(new Event("odilon-theme-change"));
  }

  return (
    <button aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"} aria-pressed={isDark} className="theme-toggle" onClick={toggleTheme} title={isDark ? "Ativar tema claro" : "Ativar tema escuro"} type="button">
      <svg aria-hidden="true" className="theme-icon theme-icon-moon" fill="none" height="19" viewBox="0 0 24 24" width="19"><path d="M20.3 15.35A8.4 8.4 0 0 1 8.65 3.7a8.4 8.4 0 1 0 11.65 11.65Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.65" /></svg>
      <svg aria-hidden="true" className="theme-icon theme-icon-sun" fill="none" height="19" viewBox="0 0 24 24" width="19"><circle cx="12" cy="12" r="3.7" stroke="currentColor" strokeWidth="1.65" /><path d="M12 2.6v2.05m0 14.7v2.05M4.64 4.64l1.45 1.45m11.82 11.82 1.45 1.45M2.6 12h2.05m14.7 0h2.05M4.64 19.36l1.45-1.45M17.91 6.09l1.45-1.45" stroke="currentColor" strokeLinecap="round" strokeWidth="1.65" /></svg>
      <span className="theme-toggle-label">{isDark ? "Claro" : "Escuro"}</span>
    </button>
  );
}

export function HeaderNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className="desktop-nav" aria-label="Navegação principal">
        <Link href="/advogado-odilon-rebelo/">O advogado</Link>
        <details className="services-dropdown">
          <summary>
            Áreas de atuação
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="m5 8 5 5 5-5" stroke="currentColor" strokeWidth="1.5" /></svg>
          </summary>
          <div className="dropdown-panel">
            {primaryServices.map((service) => <Link href={serviceHref(service)} key={service.slug}><span>{service.shortTitle}</span><ArrowIcon /></Link>)}
            <Link className="dropdown-all" href="/atuacao/">Conhecer todas as áreas <ArrowIcon /></Link>
          </div>
        </details>
        <Link href="/blog/">Conteúdos</Link>
        <Link href="/contato/">Contato</Link>
      </nav>
      <div className="header-actions">
        <ThemeToggle />
        <a className="button button-dark header-cta" href={whatsappLink()} target="_blank" rel="noopener noreferrer">Agendar consulta <ArrowIcon /></a>
        <button aria-label={isOpen ? "Fechar menu principal" : "Abrir menu principal"} aria-expanded={isOpen} aria-controls="menu-mobile" className="menu-toggle" onClick={() => setIsOpen(!isOpen)} type="button"><span /><span /></button>
      </div>
      <div className={`mobile-menu${isOpen ? " mobile-menu-open" : ""}`} id="menu-mobile">
        <nav aria-label="Navegação mobile">
          <Link href="/" onClick={closeMenu}>Início</Link>
          <Link href="/advogado-odilon-rebelo/" onClick={closeMenu}>O advogado</Link>
          <Link href="/atuacao/" onClick={closeMenu}>Áreas de atuação</Link>
          {primaryServices.map((service) => <Link className="mobile-service-link" href={serviceHref(service)} key={service.slug} onClick={closeMenu}>{service.shortTitle}</Link>)}
          <Link href="/blog/" onClick={closeMenu}>Conteúdos jurídicos</Link>
          <Link href="/simulador-distrato-imobiliario/" onClick={closeMenu}>Simulador de distrato</Link>
          <Link href="/contato/" onClick={closeMenu}>Contato</Link>
        </nav>
        <a className="button button-accent mobile-menu-cta" href={whatsappLink()}>Conversar pelo WhatsApp <ArrowIcon /></a>
      </div>
    </>
  );
}

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const formId = useId();
  const [message, setMessage] = useState("");
  const [submission, setSubmission] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [fallbackMessage, setFallbackMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const formData = new FormData(form);
    const name = String(formData.get("nome") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("whatsapp") || "").trim();
    const subject = String(formData.get("motivo") || "").trim();
    const urgency = String(formData.get("urgencia") || "").trim();
    const details = String(formData.get("mensagem") || "").trim();
    const text = ["Olá! Gostaria de solicitar uma consulta jurídica.", `Nome: ${name}`, `E-mail: ${email}`, `WhatsApp: ${phone}`, `Área: ${subject}`, urgency ? `Prazo desejado: ${urgency}` : "", details ? `Mensagem: ${details}` : ""].filter(Boolean).join("\n");
    const payload = Object.fromEntries(formData.entries());
    setFallbackMessage(text);
    setSubmission("sending");
    setMessage("Enviando sua solicitação com segurança...");

    try {
      const response = await fetch(brand.contactEndpoint, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ acao: "consulta", url_pagina: window.location.href, ...payload }),
      });
      if (!response.ok) throw new Error("Não foi possível concluir o envio.");
      const result = await response.json() as { status?: string; result?: string; mensagem?: string };
      if (!["sucesso", "success"].includes(result.status || result.result || "")) {
        throw new Error(result.mensagem || "Não foi possível concluir o envio.");
      }
      form.reset();
      setSubmission("success");
      setMessage("Solicitação enviada. O escritório recebeu seus dados e entrará em contato.");
    } catch {
      setSubmission("error");
      setMessage("O envio não foi concluído. Você pode encaminhar a mesma mensagem diretamente pelo WhatsApp.");
    }
  }

  function formatPhone(event: React.FormEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const digits = input.value.replace(/\D/g, "").slice(0, 11);
    const area = digits.slice(0, 2);
    const local = digits.slice(2);
    const breakpoint = local.length > 8 ? 5 : 4;
    input.value = area ? `(${area}${area.length === 2 ? ") " : ""}${local.slice(0, breakpoint)}${local.length > breakpoint ? `-${local.slice(breakpoint)}` : ""}` : "";
  }

  return (
    <form className={`contact-form${compact ? " contact-form-compact" : ""}`} onSubmit={handleSubmit}>
      <div className="form-field"><label htmlFor={`${formId}-name`}>Nome completo</label><input autoComplete="name" id={`${formId}-name`} name="nome" placeholder="Como podemos chamar você?" required /></div>
      <div className="form-field-row">
        <div className="form-field"><label htmlFor={`${formId}-email`}>E-mail</label><input autoComplete="email" id={`${formId}-email`} name="email" placeholder="voce@email.com" required type="email" /></div>
        <div className="form-field"><label htmlFor={`${formId}-phone`}>WhatsApp</label><input autoComplete="tel" id={`${formId}-phone`} inputMode="tel" maxLength={15} minLength={14} name="whatsapp" onInput={formatPhone} placeholder="(47) 99999-9999" required type="tel" /></div>
      </div>
      <div className="form-field"><label htmlFor={`${formId}-subject`}>Como podemos ajudar?</label><select defaultValue="" id={`${formId}-subject`} name="motivo" required><option disabled value="">Selecione uma área de atuação</option>{services.map((service) => <option key={service.slug} value={service.shortTitle}>{service.shortTitle}</option>)}</select></div>
      {!compact && <><div className="form-field"><label htmlFor={`${formId}-urgency`}>Quando você precisa de atendimento?</label><select defaultValue="" id={`${formId}-urgency`} name="urgencia" required><option disabled value="">Selecione o prazo desejado</option><option value="O quanto antes">O quanto antes</option><option value="Nos próximos dias">Nos próximos dias</option><option value="Ainda estou avaliando">Ainda estou avaliando</option></select></div><div className="form-field"><label htmlFor={`${formId}-message`}>Conte um pouco sobre sua situação</label><textarea id={`${formId}-message`} name="mensagem" placeholder="Compartilhe apenas o que considerar necessário neste primeiro contato." rows={4} /></div></>}
      <button aria-busy={submission === "sending"} className="button button-accent button-full" disabled={submission === "sending"} type="submit">{submission === "sending" ? "Enviando solicitação..." : "Solicitar atendimento"} <ArrowIcon /></button>
      <p className="form-note">Seus dados são utilizados somente para organizar seu atendimento.</p>
      {message && <p className={submission === "error" ? "form-error" : "form-feedback"} role={submission === "error" ? "alert" : "status"}>{message}</p>}
      {submission === "error" && <a className="button button-outline button-full" href={whatsappLink(fallbackMessage)} rel="noopener noreferrer" target="_blank">Enviar pelo WhatsApp <ArrowIcon /></a>}
    </form>
  );
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="article-card">
      <Link aria-label={`Ler artigo: ${article.title}`} className="article-image-link" href={articleHref(article)}><BrandImage alt="" className="article-card-image" decoding="async" height={400} loading="lazy" src={article.image} width={600} /></Link>
      <div className="article-card-content"><div className="article-meta"><span>{article.categoryLabel}</span><span aria-hidden="true">·</span><time dateTime={article.date}>{article.displayDate}</time></div><h3><Link href={articleHref(article)}>{article.title}</Link></h3><p>{article.description}</p><Link className="text-link" href={articleHref(article)}>Ler artigo <ArrowIcon /></Link></div>
    </article>
  );
}

export function BlogExplorer({ initialCategory = "Todos" }: { initialCategory?: string }) {
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState("");
  const categories = ["Todos", ...new Set(articleCategories.map((item) => item.filter))];
  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
    return articles.filter((article) => {
      const matchesCategory = category === "Todos" || article.categoryLabel.toLocaleLowerCase("pt-BR").includes(category.toLocaleLowerCase("pt-BR"));
      const matchesQuery = !normalizedQuery || `${article.title} ${article.description} ${article.categoryLabel}`.toLocaleLowerCase("pt-BR").includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <section aria-label="Pesquisar conteúdos jurídicos" className="blog-explorer">
      <div className="blog-controls"><div aria-label="Filtrar artigos por assunto" className="category-filters" role="group">{categories.map((item) => <button aria-pressed={category === item} className={`filter-button${category === item ? " filter-button-active" : ""}`} key={item} onClick={() => setCategory(item)} type="button">{item}</button>)}</div><label className="search-field" htmlFor="blog-search"><svg aria-hidden="true" fill="none" height="19" viewBox="0 0 24 24" width="19"><circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.6" /><path d="m16 16 4 4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" /></svg><span className="sr-only">Pesquisar artigos</span><input id="blog-search" onInput={(event) => setQuery(event.currentTarget.value)} placeholder="Pesquisar assunto" type="search" value={query} /></label></div>
      <p aria-live="polite" className="results-count">{filteredArticles.length} {filteredArticles.length === 1 ? "artigo encontrado" : "artigos encontrados"}</p>
      {filteredArticles.length ? <div className="article-grid">{filteredArticles.map((article) => <ArticleCard article={article} key={`${article.category}-${article.slug}`} />)}</div> : <div className="empty-state"><h2>Nenhum conteúdo encontrado.</h2><p>Experimente outra palavra ou selecione uma categoria diferente.</p></div>}
    </section>
  );
}

const formatCurrency = (value: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

export function DistratoCalculator() {
  const [result, setResult] = useState<{ paid: number; retention: number; refund: number; rate: number } | null>(null);
  const [error, setError] = useState("");

  function parseCurrency(value: string) {
    const trimmed = value.trim().replace(/\s|R\$/g, "");
    if (!trimmed) return 0;
    return Number(trimmed.includes(",") ? trimmed.replace(/\./g, "").replace(",", ".") : trimmed);
  }

  function calculate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submittedValues = new FormData(event.currentTarget);
    const paidValue = parseCurrency(String(submittedValues.get("valor-pago") || ""));
    const brokerageValue = parseCurrency(String(submittedValues.get("corretagem") || ""));
    const selectedScenario = String(submittedValues.get("cenario") || "construtora");
    if (!Number.isFinite(paidValue) || paidValue <= 0) { setError("Informe um valor pago superior a zero."); setResult(null); return; }
    if (!Number.isFinite(brokerageValue) || brokerageValue < 0) { setError("Informe um valor de corretagem válido."); setResult(null); return; }
    setError("");
    const rate = selectedScenario === "construtora" ? 0 : selectedScenario === "sem-afetacao" ? 0.25 : 0.5;
    const retention = paidValue * rate;
    const refund = paidValue - retention + (selectedScenario === "construtora" ? brokerageValue : 0);
    setResult({ paid: paidValue, retention, refund, rate });
  }

  return (
    <div className="calculator-shell">
      <form className="calculator-form" onSubmit={calculate}>
        <div className="form-field"><label htmlFor="valor-pago">Valor total já pago à construtora</label><div className="currency-field"><span aria-hidden="true">R$</span><input aria-describedby={error ? "calculator-error" : undefined} id="valor-pago" inputMode="decimal" name="valor-pago" placeholder="100.000,00" required /></div></div>
        <div className="form-field"><label htmlFor="corretagem">Comissão de corretagem paga, se houver</label><div className="currency-field"><span aria-hidden="true">R$</span><input id="corretagem" inputMode="decimal" name="corretagem" placeholder="0,00" /></div></div>
        <div className="form-field"><label htmlFor="motivo-distrato">Motivo do distrato</label><select defaultValue="construtora" id="motivo-distrato" name="cenario"><option value="construtora">Atraso ou responsabilidade da construtora</option><option value="sem-afetacao">Desistência sem patrimônio de afetação</option><option value="com-afetacao">Desistência com patrimônio de afetação</option></select></div>
        {error && <p className="form-error" id="calculator-error" role="alert">{error}</p>}
        <button className="button button-accent button-full" type="submit">Calcular estimativa <ArrowIcon /></button>
      </form>
      <div aria-live="polite" className={`calculator-result${result ? " calculator-result-active" : ""}`}>
        {result ? <><p className="eyebrow">Estimativa para o cenário escolhido</p><p className="result-amount">{formatCurrency(result.refund)}</p><p className="result-label">Valor estimado de devolução</p><div className="result-details"><div><span>Valor informado</span><strong>{formatCurrency(result.paid)}</strong></div><div><span>Retenção estimada</span><strong>{formatCurrency(result.retention)} · {result.rate * 100}%</strong></div></div><a className="button button-outline-light button-full" href={whatsappLink(`Olá! Simulei um distrato imobiliário. Valor pago: ${formatCurrency(result.paid)}. Devolução estimada: ${formatCurrency(result.refund)}. Gostaria de analisar meu contrato.`)}>Analisar meu contrato <ArrowIcon /></a></> : <><p className="eyebrow">Estimativa transparente</p><h2>Informe os valores para visualizar o cenário.</h2><p>O cálculo usa os percentuais gerais apresentados pelo escritório e considera a responsabilidade pelo cancelamento.</p></>}
        <p className="calculator-disclaimer">Estimativa informativa. A análise do contrato e das circunstâncias é indispensável.</p>
      </div>
    </div>
  );
}
