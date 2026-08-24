import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { SiteFooter, SiteHeader, WhatsAppDock } from "./site-components";
import { brand, socialProfiles } from "./site-data";
import "./globals.css";

const description = "Advogado em Itajaí com atuação em Direito Imobiliário, Empresarial e Cível. Atendimento presencial, online e in-company. OAB/SC 68.648.";

export const metadata: Metadata = {
  metadataBase: new URL(brand.website),
  title: { default: "Odilon Rebelo Advocacia | Advogado em Itajaí", template: "%s | Odilon Rebelo Advocacia" },
  description,
  applicationName: "Odilon Rebelo Advocacia",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", locale: "pt_BR", url: brand.website, siteName: "Odilon Rebelo Advocacia", title: "Odilon Rebelo Advocacia | Advogado em Itajaí", description,
    images: [{ url: brand.socialImage, width: 1672, height: 941, alt: "Odilon Rebelo Advocacia: soluções jurídicas com técnica e ética em Itajaí" }],
  },
  twitter: { card: "summary_large_image", title: "Odilon Rebelo Advocacia | Advogado em Itajaí", description, images: [brand.socialImage] },
  robots: { index: true, follow: true },
  verification: { google: brand.googleSiteVerification, yandex: brand.yandexVerification },
  other: { "geo.region": "BR-SC", "geo.placename": "Itajaí" },
  icons: { icon: `${brand.website}/wp-content/uploads/2026/07/cropped-logotipo-odilon-rebelo-advocacia-32x32.webp` },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#fcfbf8" };

const initializeTheme = `try{var saved=localStorage.getItem("odilon-rebelo-theme");var theme=saved==="dark"||saved==="light"?saved:window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;var themeMeta=document.querySelector('meta[name="theme-color"]');if(themeMeta)themeMeta.setAttribute("content",theme==="dark"?"#111512":"#fcfbf8")}catch(error){document.documentElement.dataset.theme="light"}`;

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LegalService", "@id": `${brand.website}/#organization`, name: brand.name, url: brand.website, telephone: brand.phoneInternational, email: brand.email, image: brand.socialImage, priceRange: "Consultar",
      address: { "@type": "PostalAddress", streetAddress: "Rua Agílio Cunha, 372, sala 101, Cidade Nova", addressLocality: "Itajaí", addressRegion: "SC", postalCode: "88308-150", addressCountry: "BR" },
      geo: { "@type": "GeoCoordinates", latitude: -26.916592986035845, longitude: -48.69373591534471 },
      openingHoursSpecification: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "17:00" },
      areaServed: [{ "@type": "City", name: "Itajaí" }, { "@type": "Country", name: "Brasil" }],
      employee: { "@type": "Person", name: "Fabiano Odilon Rebelo", jobTitle: "Advogado" },
      sameAs: socialProfiles.map((profile) => profile.href),
    },
    { "@type": "WebSite", "@id": `${brand.website}/#website`, url: brand.website, name: brand.name, inLanguage: "pt-BR", publisher: { "@id": `${brand.website}/#organization` } },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: initializeTheme }} /><link rel="preconnect" href="https://odilonrebeloadvocacia.com.br" /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} /></head>
      <body>
        <a className="skip-link" href="#conteudo-principal">Pular para o conteúdo principal</a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <WhatsAppDock />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${brand.googleTagId}`} strategy="afterInteractive" />
        <Script id="odilon-rebelo-google-tag" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("set","linker",{"domains":["odilonrebeloadvocacia.com.br"]});gtag("js",new Date());gtag("config","${brand.googleTagId}");`}</Script>
      </body>
    </html>
  );
}
