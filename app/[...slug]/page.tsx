import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect, redirect } from "next/navigation";
import { BrandImage } from "../brand-image";
import { BlogExplorer, ContactForm, DistratoCalculator } from "../client-components";
import { ArrowIcon, Breadcrumbs, ConsultationBanner, SectionHeading, ServiceCard } from "../site-components";
import { articleCategories, articleHref, articles, brand, serviceHref, services, socialProfiles, whatsappLink, type Article, type Service } from "../site-data";

type PageProps = { params: Promise<{ slug: string[] }> };

const serviceAliases: Record<string, string> = {
  "advogado-imobiliario-itajai": "advogado-imobiliario-itajai",
  "advogado-civel-itajai": "advogado-civel-itajai",
  empresarial: "advogado-empresarial-itajai",
  "distrato-de-imovel-na-planta-e-seus-prazos-legais": "distrato-imobiliario-itajai",
  "melhor-advogado-imobiliario-itajai": "advogado-imobiliario-itajai",
};

function resolveService(path: string) {
  const direct = path.startsWith("atuacao/") ? path.split("/")[1] : serviceAliases[path];
  return services.find((service) => service.slug === direct);
}

function resolveArticle(parts: string[]) {
  if (parts[0] !== "blog" || parts.length < 3) return undefined;
  return articles.find((article) => article.slug === parts.at(-1));
}

function canonicalPath(parts: string[]) {
  const path = parts.join("/");
  const service = resolveService(path);
  if (service) return serviceHref(service);
  const article = resolveArticle(parts);
  if (article) return articleHref(article);
  return `/${path}/`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const path = slug.join("/");
  const service = resolveService(path);
  const article = resolveArticle(slug);
  const category = slug.length === 2 && slug[0] === "blog" ? articleCategories.find((item) => item.slug === slug[1]) : undefined;
  let title = "Página não encontrada";
  let description = "Conteúdo jurídico da Odilon Rebelo Advocacia em Itajaí.";
  let image: string = brand.socialImage;

  if (service) {
    title = service.title;
    description = service.description;
    image = service.image || image;
  } else if (article) {
    title = article.title;
    description = article.description;
    image = article.image;
  } else if (category) {
    title = `Artigos sobre ${category.label}`;
    description = `Explore conteúdos sobre ${category.label.toLocaleLowerCase("pt-BR")}, publicados pela Odilon Rebelo Advocacia em Itajaí.`;
  } else if (path === "atuacao") {
    title = "Áreas de atuação jurídica em Itajaí";
    description = "Conheça a atuação da Odilon Rebelo Advocacia em Direito Imobiliário, Empresarial, Cível e outras demandas jurídicas em Itajaí.";
  } else if (path === "blog") {
    title = "Conteúdos jurídicos";
    description = "Artigos sobre Direito Imobiliário, Empresarial, Cível e temas que ajudam pessoas e empresas a tomar decisões com mais clareza.";
  } else if (path === "contato") {
    title = "Contato e atendimento jurídico em Itajaí";
    description = `Fale com a Odilon Rebelo Advocacia. Atendimento presencial em Itajaí, online e in-company. Telefone ${brand.phone}.`;
  } else if (path === "advogado-odilon-rebelo" || path === "advogado-em-itajai") {
    title = path === "advogado-em-itajai" ? "Como escolher um advogado em Itajaí" : "Advogado Fabiano Odilon Rebelo";
    description = "Conheça Fabiano Odilon Rebelo, advogado inscrito na OAB/SC 68.648 e corretor de imóveis, com atuação em Itajaí.";
    image = brand.portraitEditorial;
  } else if (path === "simulador-distrato-imobiliario") {
    title = "Simulador de distrato imobiliário";
    description = "Calcule uma estimativa de retenção e devolução em cenários gerais de distrato imobiliário. Resultado informativo e sem substituir análise jurídica.";
  } else if (path === "politica-de-privacidade") {
    title = "Política de privacidade";
    description = "Saiba como os dados enviados à Odilon Rebelo Advocacia são utilizados para atendimento e contato.";
  } else if (path === "mapa-do-site") {
    title = "Mapa do site";
    description = "Acesse as páginas institucionais, áreas de atuação, ferramentas e conteúdos jurídicos do escritório.";
  } else if (path === "baixar-check-list") {
    title = "Checklist para contratos comerciais";
    description = "Confira os pontos que merecem atenção antes de assinar um contrato comercial.";
  }

  const canonical = canonicalPath(slug);
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: article ? "article" : "website", images: [{ url: image, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

function ContactAside({ area }: { area?: string }) {
  return (
    <aside className="contact-aside">
      <p className="eyebrow">Fale diretamente com o escritório</p>
      <h2>Precisa avaliar sua situação?</h2>
      <p>Explique sua demanda em um primeiro contato. O escritório orientará sobre os documentos e o formato de atendimento.</p>
      <a className="button button-accent button-full" href={whatsappLink(area ? `Olá! Gostaria de uma consulta sobre ${area}.` : undefined)}>Solicitar atendimento <ArrowIcon /></a>
      <a className="aside-phone" href={`tel:${brand.phoneInternational}`}>{brand.phone}</a>
    </aside>
  );
}

function PracticePage() {
  return (
    <main id="conteudo-principal">
      <header className="page-intro"><div className="container"><Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Áreas de atuação" }]} /><p className="eyebrow">Soluções jurídicas</p><h1>Proteção jurídica para você, seu patrimônio e seu negócio.</h1><p className="page-intro-description">Cada demanda começa por uma análise cuidadosa. Conheça as áreas em que o escritório atua e encontre o caminho mais próximo da sua situação.</p></div></header>
      <section className="section"><div className="container"><div className="service-grid all-services-grid">{services.map((service, index) => <ServiceCard index={index} key={service.slug} service={service} />)}</div></div></section>
      <ConsultationBanner title="Uma decisão segura começa com a análise certa." />
    </main>
  );
}

function ServicePage({ service }: { service: Service }) {
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: service.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };
  const serviceSchema = { "@context": "https://schema.org", "@type": "Service", name: service.title, description: service.description, areaServed: { "@type": "City", name: "Itajaí" }, provider: { "@id": `${brand.website}/#organization` } };
  return (
    <main id="conteudo-principal">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([faqSchema, serviceSchema]) }} />
      <header className="page-intro"><div className="container"><Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Atuação", href: "/atuacao/" }, { label: service.shortTitle }]} /><p className="eyebrow">{service.eyebrow}</p><h1>{service.title}</h1><p className="page-intro-description">{service.description}</p><div className="page-intro-actions"><a className="button button-dark" href={whatsappLink(`Olá! Gostaria de uma consulta sobre ${service.shortTitle}.`)}>Solicitar uma consulta <ArrowIcon /></a><a className="page-intro-phone" href={`tel:${brand.phoneInternational}`}>Ligar para {brand.phone}</a></div></div></header>
      <section className="section"><div className="container interior-grid"><article className="interior-copy"><h2>Orientação para compreender o cenário antes de decidir.</h2><p>{service.intro}</p>{service.image && <BrandImage alt={`${service.shortTitle}: atendimento da Odilon Rebelo Advocacia em Itajaí`} className="service-feature-image" decoding="async" height={600} loading="lazy" src={service.image} width={900} />}<h2>Como o escritório pode ajudar</h2><ul className="outcome-list">{service.outcomes.map((item) => <li key={item}>{item}</li>)}</ul><h2>Quando buscar orientação</h2><ul className="situation-list">{service.situations.map((item) => <li key={item}>{item}</li>)}</ul><h2>Perguntas frequentes</h2><div className="faq-list">{service.faq.map((item) => <details className="faq-item" key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></article><ContactAside area={service.shortTitle} /></div></section>
      <ConsultationBanner eyebrow={service.eyebrow} title="Converse sobre seu caso com o escritório." />
    </main>
  );
}

function BlogPage({ category }: { category?: string }) {
  return (
    <main id="conteudo-principal"><header className="page-intro"><div className="container"><Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Conteúdos jurídicos" }]} /><p className="eyebrow">Informação para decidir melhor</p><h1>Conteúdos jurídicos sem complicação.</h1><p className="page-intro-description">Artigos sobre patrimônio, negócios, contratos e situações do cotidiano, organizados para você encontrar o que precisa.</p></div></header><section className="section"><div className="container"><BlogExplorer initialCategory={category} /></div></section><ConsultationBanner /></main>
  );
}

function ArticlePage({ article }: { article: Article }) {
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.description, image: article.image, datePublished: article.date, dateModified: article.date, inLanguage: "pt-BR", author: { "@type": "Person", name: brand.lawyer }, publisher: { "@id": `${brand.website}/#organization` }, mainEntityOfPage: `${brand.website}${articleHref(article)}` };
  return (
    <main id="conteudo-principal"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} /><header className="article-hero"><div className="container article-hero-inner"><Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Conteúdos", href: "/blog/" }, { label: article.categoryLabel }]} /><div className="article-meta article-hero-meta"><span>{article.categoryLabel}</span><span aria-hidden="true">·</span><time dateTime={article.date}>{article.displayDate}</time></div><h1>{article.title}</h1><p>{article.description}</p><div className="article-author"><BrandImage alt="" height={44} src={`${brand.website}/wp-content/uploads/2026/07/avatar_1_1783311722.webp`} width={44} /><span><strong>Dr. Fabiano Odilon Rebelo</strong><small>{brand.oab}</small></span></div></div></header><div className="article-cover container"><BrandImage alt={`Ilustração do artigo: ${article.title}`} decoding="async" fetchPriority="high" height={720} loading="eager" src={article.image} width={1200} /></div><section className="article-body-section"><div className="container interior-grid"><article className="article-prose">{article.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<aside className="editorial-note"><strong>Informação jurídica responsável</strong><p>Este conteúdo é geral e não substitui a análise dos documentos e das circunstâncias do seu caso.</p></aside>{article.sections.map((section) => <section key={section.title}><h2>{section.title}</h2><p>{section.text}</p></section>)}<div className="article-author-box"><BrandImage alt="Dr. Fabiano Odilon Rebelo" height={156} loading="lazy" src={brand.portraitEditorial} width={156} /><div><p className="eyebrow">Conteúdo revisado por</p><h2>Dr. Fabiano Odilon Rebelo</h2><p>Advogado inscrito na OAB/SC 68.648, com atuação em Itajaí e atendimento online.</p><Link className="text-link" href="/advogado-odilon-rebelo/">Conheça o advogado <ArrowIcon /></Link></div></div></article><ContactAside /></div></section><ConsultationBanner title="Sua situação tem detalhes que um artigo não consegue avaliar." /></main>
  );
}

function AboutPage({ guide = false }: { guide?: boolean }) {
  if (guide) return <GuidePage />;
  const timeline = [{ year: "1993", text: "Início da trajetória profissional e comercial." }, { year: "2008", text: "Nova fase profissional em Itajaí e atuação no mercado imobiliário." }, { year: "2022", text: "Conclusão do Bacharelado em Direito pela UNIVALI." }, { year: "2023", text: "Início oficial da atuação como advogado." }];
  return (
    <main id="conteudo-principal"><header className="page-intro about-intro"><div className="container about-hero-grid"><div><Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "O advogado" }]} /><p className="eyebrow">Sobre o advogado</p><h1>Técnica jurídica com visão prática de mercado.</h1><p className="page-intro-description">Fabiano Odilon Rebelo atua para traduzir cenários jurídicos complexos e orientar pessoas e empresas com clareza, atenção aos documentos e responsabilidade.</p></div><BrandImage alt="Fabiano Odilon Rebelo, advogado em Itajaí" className="about-hero-image" fetchPriority="high" height={720} loading="eager" src={brand.portraitEditorial} width={640} /></div></header><section className="section"><div className="container interior-grid"><article className="interior-copy"><h2>Formação e experiência aplicadas à realidade do cliente.</h2><p>Fabiano Odilon Rebelo é Bacharel em Direito pela Universidade do Vale do Itajaí (UNIVALI), formado em 2022, advogado inscrito na {brand.oab} e corretor de imóveis registrado no {brand.creci}.</p><p>A experiência no mercado imobiliário contribui para uma leitura prática de contratos, negociações e decisões patrimoniais. O atendimento busca explicar cada etapa de forma direta e adaptar a orientação às informações do caso.</p><h2>Uma trajetória construída em Itajaí</h2><div className="timeline-list">{timeline.map((item) => <div className="timeline-item" key={item.year}><strong>{item.year}</strong><p>{item.text}</p></div>)}</div><h2>Áreas de atuação</h2><div className="about-practice-links">{services.slice(0, 5).map((service) => <Link href={serviceHref(service)} key={service.slug}>{service.shortTitle}<ArrowIcon /></Link>)}</div></article><ContactAside /></div></section><ConsultationBanner /></main>
  );
}

function GuidePage() {
  return <main id="conteudo-principal"><header className="page-intro"><div className="container"><Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Como escolher um advogado em Itajaí" }]} /><p className="eyebrow">Guia de contratação</p><h1>Como escolher um advogado em Itajaí.</h1><p className="page-intro-description">Critérios objetivos ajudam a avaliar o profissional, o formato de atendimento e a experiência relacionada à sua demanda.</p></div></header><section className="section"><div className="container interior-grid"><article className="interior-copy"><h2>Verifique a inscrição e a atuação profissional.</h2><p>Confirme a inscrição na OAB, procure compreender as áreas de atuação informadas e observe se o atendimento permite explicar o caso, os documentos e os riscos envolvidos.</p><h2>Clareza é parte do atendimento.</h2><p>A contratação deve deixar claro o objeto do serviço, os honorários, as responsabilidades e os canais de comunicação. Desconfie de promessas de resultado: decisões jurídicas dependem de fatos, provas e autoridades competentes.</p><h2>Considere a experiência relacionada à demanda.</h2><p>Em questões imobiliárias e empresariais, a familiaridade com contratos, documentação e negociações pode ajudar a compreender o contexto prático do problema.</p></article><ContactAside /></div></section><ConsultationBanner title="Escolher com segurança começa por uma conversa clara." /></main>;
}

function ContactPage() {
  return <main id="conteudo-principal"><header className="page-intro"><div className="container"><Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Contato" }]} /><p className="eyebrow">Fale com o escritório</p><h1>Conte sua situação. Vamos organizar o primeiro passo.</h1><p className="page-intro-description">Atendimento presencial em Itajaí, por videochamada ou, quando combinado, na sua empresa.</p></div></header><section className="section contact-page-section"><div className="container contact-page-grid"><div className="contact-info"><SectionHeading eyebrow="Canais de atendimento" title="Escolha a forma mais conveniente." /><div className="contact-methods"><a href={`tel:${brand.phoneInternational}`}><span>Telefone e WhatsApp</span><strong>{brand.phone}</strong></a><a href={`mailto:${brand.email}`}><span>E-mail</span><strong>{brand.email}</strong></a><a href={brand.mapUrl} target="_blank" rel="noopener noreferrer"><span>Escritório em Itajaí</span><strong>{brand.street}<br />{brand.district}</strong></a><div><span>Horário</span><strong>{brand.hours}</strong></div></div><div className="social-links">{socialProfiles.map((profile) => <a href={profile.href} key={profile.label} rel="noopener noreferrer" target="_blank">{profile.label}<ArrowIcon /></a>)}</div></div><div className="form-panel"><p className="eyebrow">Solicite um atendimento</p><h2>Como podemos ajudar?</h2><ContactForm /></div></div></section><section className="map-section"><iframe allowFullScreen aria-label="Mapa com a localização do escritório Odilon Rebelo Advocacia em Itajaí" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Rua%20Ag%C3%ADlio%20Cunha%20372%20Itaja%C3%AD%20SC&output=embed" title="Localização do escritório no Google Maps" /><div className="map-address"><p className="eyebrow">Atuação local em Itajaí</p><h2>{brand.street}</h2><p>{brand.district} · CEP {brand.postcode}</p><a className="text-link" href={brand.mapUrl} target="_blank" rel="noopener noreferrer">Abrir rota no Google Maps <ArrowIcon /></a></div></section></main>;
}

function SimulatorPage() {
  const faq = [{ q: "O resultado substitui uma análise jurídica?", a: "Não. A estimativa usa percentuais gerais e não considera todas as cláusulas, pagamentos e circunstâncias do contrato." }, { q: "Como a corretagem é tratada?", a: "No simulador, a corretagem é somada ao cenário de responsabilidade da construtora. O tratamento concreto depende do contrato e dos fatos." }, { q: "Quais percentuais são usados?", a: "O cálculo apresenta 0%, 25% ou 50% de retenção sobre o valor informado, conforme o cenário selecionado, seguindo os parâmetros gerais publicados pelo escritório." }];
  return <main id="conteudo-principal"><header className="page-intro"><div className="container"><Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Simulador de distrato" }]} /><p className="eyebrow">Ferramenta informativa</p><h1>Simulador de distrato imobiliário.</h1><p className="page-intro-description">Compare cenários gerais de retenção e devolução. O resultado é apenas uma estimativa e não substitui a leitura do seu contrato.</p></div></header><section className="section simulator-section"><div className="container"><DistratoCalculator /><div className="simulator-content"><SectionHeading eyebrow="Entenda o cálculo" title="A origem do cancelamento muda o cenário." description="A ferramenta considera o valor efetivamente informado como pago à construtora. Outros valores, cláusulas e circunstâncias podem alterar uma análise jurídica real." /><div className="scenario-table" role="table" aria-label="Cenários gerais do simulador"><div role="row"><strong role="columnheader">Cenário</strong><strong role="columnheader">Retenção usada</strong></div><div role="row"><span role="cell">Responsabilidade da construtora</span><span role="cell">0%</span></div><div role="row"><span role="cell">Desistência sem patrimônio de afetação</span><span role="cell">25%</span></div><div role="row"><span role="cell">Desistência com patrimônio de afetação</span><span role="cell">50%</span></div></div><h2>Perguntas frequentes</h2><div className="faq-list">{faq.map((item) => <details className="faq-item" key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div></div></div></section><ConsultationBanner title="Seu contrato precisa de uma análise individual." /></main>;
}

function PrivacyPage() {
  return <main id="conteudo-principal"><header className="page-intro"><div className="container"><Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Privacidade" }]} /><p className="eyebrow">Proteção de dados</p><h1>Política de privacidade.</h1><p className="page-intro-description">Como os dados informados neste site são utilizados no contato com a Odilon Rebelo Advocacia.</p></div></header><section className="section"><article className="container privacy-prose"><p>O site da Odilon Rebelo Advocacia, sob responsabilidade de Fabiano Odilon Rebelo ({brand.oab}), utiliza os dados enviados voluntariamente nos formulários para responder solicitações e organizar o atendimento solicitado.</p><section><h2>Dados coletados</h2><p>O formulário pode solicitar nome, e-mail, telefone, área de interesse, prazo desejado e uma mensagem. Não envie documentos sigilosos ou informações sensíveis antes de receber orientação sobre o canal adequado.</p></section><section><h2>Finalidade e compartilhamento</h2><p>As informações são utilizadas para contato e encaminhamento do atendimento. Elas não devem ser comercializadas. Serviços técnicos necessários ao funcionamento do site podem processar dados conforme suas próprias políticas e obrigações legais.</p></section><section><h2>Seus direitos</h2><p>Você pode solicitar informações, correção ou exclusão de dados enviados, respeitadas as hipóteses de guarda exigidas por lei. Para isso, escreva para <a href={`mailto:${brand.email}`}>{brand.email}</a>.</p></section><section><h2>Contato</h2><p>Dúvidas sobre esta política podem ser enviadas ao e-mail do escritório ou tratadas pelo telefone {brand.phone}.</p></section></article></section></main>;
}

function SitemapPage() {
  return <main id="conteudo-principal"><header className="page-intro"><div className="container"><Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Mapa do site" }]} /><p className="eyebrow">Navegação completa</p><h1>Mapa do site.</h1><p className="page-intro-description">Todas as páginas públicas organizadas por assunto, sem carregamento dinâmico.</p></div></header><section className="section"><div className="container sitemap-grid"><nav aria-label="Páginas institucionais"><h2>Escritório</h2><Link href="/">Início</Link><Link href="/advogado-odilon-rebelo/">O advogado</Link><Link href="/contato/">Contato</Link><Link href="/politica-de-privacidade/">Privacidade</Link></nav><nav aria-label="Páginas de atuação"><h2>Áreas de atuação</h2>{services.map((service) => <Link href={serviceHref(service)} key={service.slug}>{service.shortTitle}</Link>)}</nav><nav aria-label="Conteúdos e ferramentas"><h2>Conteúdos e ferramentas</h2><Link href="/blog/">Todos os artigos</Link><Link href="/simulador-distrato-imobiliario/">Simulador de distrato</Link><Link href="/baixar-check-list/">Checklist de contratos</Link>{articles.map((article) => <Link href={articleHref(article)} key={`${article.category}-${article.slug}`}>{article.title}</Link>)}</nav></div></section></main>;
}

function ChecklistPage() {
  const checks = ["Identificação completa das partes e de seus representantes", "Descrição objetiva do serviço, produto ou obrigação", "Valores, datas, forma de pagamento e critérios de reajuste", "Prazos, entregas, responsabilidades e formas de comprovação", "Hipóteses de encerramento, multas e efeitos da rescisão", "Tratamento de informações confidenciais e dados pessoais", "Forma de solução de conflitos e foro aplicável", "Anexos, propostas e documentos incorporados ao contrato"];
  return <main id="conteudo-principal"><header className="page-intro checklist-intro"><div className="container"><Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Checklist de contratos" }]} /><p className="eyebrow">Guia para empresários</p><h1>O que conferir antes de assinar um contrato comercial.</h1><p className="page-intro-description">Uma lista objetiva para organizar a leitura inicial. O checklist não substitui a análise jurídica do contrato.</p></div></header><section className="section"><div className="container interior-grid"><article className="interior-copy"><h2>Checklist essencial</h2><ol className="checklist-list">{checks.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>)}</ol><aside className="editorial-note"><strong>Atenção</strong><p>Modelos prontos e checklists não identificam todos os riscos de uma operação. Valores relevantes, garantias ou obrigações complexas merecem análise individual.</p></aside></article><ContactAside area="contratos comerciais" /></div></section><ConsultationBanner title="Revise antes de transformar a assinatura em obrigação." /></main>;
}

export default async function PublicPage({ params }: PageProps) {
  const { slug } = await params;
  const path = slug.join("/");
  if (path === "whatsapp") redirect(whatsappLink());
  const service = resolveService(path);
  if (service) return <ServicePage service={service} />;
  const article = resolveArticle(slug);
  if (article) {
    if (`/${path}/` !== articleHref(article)) permanentRedirect(articleHref(article));
    return <ArticlePage article={article} />;
  }
  if (path === "atuacao") return <PracticePage />;
  if (path === "blog") return <BlogPage />;
  if (slug[0] === "blog" && slug.length === 2) {
    const category = articleCategories.find((item) => item.slug === slug[1]);
    if (!category) notFound();
    return <BlogPage category={category.filter} />;
  }
  if (path === "contato") return <ContactPage />;
  if (path === "advogado-odilon-rebelo") return <AboutPage />;
  if (path === "advogado-em-itajai") return <AboutPage guide />;
  if (path === "simulador-distrato-imobiliario") return <SimulatorPage />;
  if (path === "politica-de-privacidade") return <PrivacyPage />;
  if (path === "mapa-do-site") return <SitemapPage />;
  if (path === "baixar-check-list") return <ChecklistPage />;
  notFound();
}
