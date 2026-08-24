import Link from "next/link";
import { BrandImage } from "./brand-image";
import { HeaderNavigation } from "./client-components";
import { articleHref, articles, brand, primaryServices, serviceHref, socialProfiles, whatsappLink, type Service } from "./site-data";

export function ArrowIcon({ className = "" }: { className?: string }) {
  return <svg aria-hidden="true" className={className} width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return <Link aria-label="Odilon Rebelo Advocacia: página inicial" className={`brand-mark${inverse ? " brand-mark-inverse" : ""}`} href="/"><BrandImage alt="Logotipo oficial de Odilon Rebelo Advocacia, OAB/SC 68.648" className="brand-logo" decoding="async" height={237} loading={inverse ? "lazy" : "eager"} src="/logo-odilon-rebelo.png" width={395} /></Link>;
}

export function SiteHeader() {
  return <header className="site-header"><div className="header-inner container-wide"><BrandMark /><HeaderNavigation /></div></header>;
}

export function WhatsAppDock() {
  return <a aria-label="Conversar com o escritório pelo WhatsApp" className="whatsapp-dock" href={whatsappLink()} rel="noopener noreferrer" target="_blank"><svg aria-hidden="true" fill="none" height="20" viewBox="0 0 24 24" width="20"><path d="M20.1 11.8a8.1 8.1 0 0 1-12.1 7.04l-4.1 1.06 1.1-4a8.1 8.1 0 1 1 15.1-4.1Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.6" /><path d="M9.1 8.9c.17-.42.4-.44.63-.44h.45c.14 0 .34.03.51.4l.66 1.5c.1.21.09.37-.04.56l-.52.62c-.1.12-.2.25-.1.45.36.71.91 1.35 1.7 1.8l.75.41c.19.09.33.07.46-.07l.69-.83c.17-.19.35-.15.54-.08l1.35.64c.22.1.36.16.43.26.08.1.08.56-.12 1.08-.2.52-1.16 1.01-1.61 1.05-.46.04-.93.22-3.18-.72-2.7-1.14-4.46-3.92-4.6-4.1-.12-.18-1.07-1.4-1.07-2.68 0-1.29.64-1.92 1.1-1.97" fill="currentColor" /></svg><span>Conversar pelo WhatsApp</span></a>;
}

export function SectionHeading({ eyebrow, title, description, dark = false }: { eyebrow: string; title: string; description?: string; dark?: boolean }) {
  return <div className={`section-heading${dark ? " section-heading-dark" : ""}`}><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{description && <p className="section-description">{description}</p>}</div>;
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.label, ...(item.href ? { item: new URL(item.href, brand.website).toString() } : {}) })) };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} /><nav aria-label="Caminho da página" className="breadcrumbs"><ol>{items.map((item) => <li key={`${item.label}-${item.href || "current"}`}>{item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</li>)}</ol></nav></>;
}

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return <article className="service-card"><span aria-hidden="true" className="service-number">{String(index + 1).padStart(2, "0")}</span><h3>{service.shortTitle}</h3><p>{service.description}</p><Link className="text-link service-link" href={serviceHref(service)}>Conhecer a atuação <ArrowIcon /></Link></article>;
}

export function ConsultationBanner({ eyebrow = "Atendimento jurídico em Itajaí e online", title = "Vamos entender sua situação com clareza." }: { eyebrow?: string; title?: string }) {
  return <section className="consultation-banner"><div className="container banner-inner"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><p>Conte o que está acontecendo. O primeiro passo é compreender sua demanda e orientar os próximos encaminhamentos.</p></div><div className="banner-actions"><a className="button button-accent" href={whatsappLink()}>Conversar pelo WhatsApp <ArrowIcon /></a><a className="banner-phone" href={`tel:${brand.phoneInternational}`}>Ou ligue para {brand.phone}</a></div></div></section>;
}

export function SiteFooter() {
  return <footer className="site-footer"><div className="container footer-main"><div className="footer-brand-column"><BrandMark inverse /><p>Advocacia imobiliária, empresarial e cível com atendimento próximo e orientação jurídica responsável.</p><p className="footer-oab">{brand.oab}</p></div><nav aria-label="Áreas de atuação" className="footer-column"><h2>Áreas de atuação</h2>{primaryServices.map((service) => <Link href={serviceHref(service)} key={service.slug}>{service.shortTitle}</Link>)}<Link href="/atuacao/advogado-usucapiao-itajai/">Usucapião</Link><Link href="/simulador-distrato-imobiliario/">Simulador de distrato</Link></nav><nav aria-label="Navegação institucional" className="footer-column"><h2>Escritório</h2><Link href="/advogado-odilon-rebelo/">Conheça o advogado</Link><Link href="/atuacao/">Todas as especialidades</Link><Link href="/blog/">Conteúdos jurídicos</Link><Link href={articleHref(articles[0])}>Advocacia preventiva</Link><Link href="/mapa-do-site/">Mapa do site</Link></nav><address className="footer-column footer-address"><h2>Contato</h2><a href={`tel:${brand.phoneInternational}`}>{brand.phone}</a><a href={`mailto:${brand.email}`}>{brand.email}</a><span>{brand.street}</span><span>{brand.district}</span><span>CEP {brand.postcode}</span><span>{brand.hours}</span></address></div><div className="container footer-bottom"><p>© {new Date().getFullYear()} Odilon Rebelo Advocacia. {brand.oab}.</p><div className="footer-bottom-links"><Link href="/politica-de-privacidade/">Privacidade</Link>{socialProfiles.slice(0, 2).map((profile) => <a href={profile.href} key={profile.label} rel="noopener noreferrer" target="_blank">{profile.label}</a>)}</div></div></footer>;
}
