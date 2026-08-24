import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

async function requestPage(path) {
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

const routes = [
  ["/", "Seu patrimônio merece uma"],
  ["/advogado-odilon-rebelo/", "Técnica jurídica com visão prática"],
  ["/advogado-em-itajai/", "Como escolher um advogado em Itajaí"],
  ["/atuacao/", "Proteção jurídica para você"],
  ["/atuacao/advogado-imobiliario-itajai/", "Advogado imobiliário em Itajaí"],
  ["/atuacao/advogado-empresarial-itajai/", "Advogado empresarial em Itajaí"],
  ["/atuacao/advogado-civel-itajai/", "Advogado cível em Itajaí"],
  ["/atuacao/advogado-usucapiao-itajai/", "Usucapião e regularização"],
  ["/atuacao/distrato-imobiliario-itajai/", "Distrato imobiliário em Itajaí"],
  ["/atuacao/direito-de-familia-itajai/", "Direito de família em Itajaí"],
  ["/atuacao/inventario-itajai/", "Inventários e sucessões"],
  ["/atuacao/direito-previdenciario-itajai/", "Direito previdenciário em Itajaí"],
  ["/atuacao/consultoria-juridica-itajai/", "Consultoria jurídica em Itajaí"],
  ["/blog/", "Conteúdos jurídicos sem complicação"],
  ["/blog/imobiliario/", "Conteúdos jurídicos sem complicação"],
  ["/blog/empresarial/", "Conteúdos jurídicos sem complicação"],
  ["/blog/familia/", "Conteúdos jurídicos sem complicação"],
  ["/blog/civel/", "Conteúdos jurídicos sem complicação"],
  ["/blog/economia/", "Conteúdos jurídicos sem complicação"],
  ["/blog/politica/", "Conteúdos jurídicos sem complicação"],
  ["/contato/", "Conte sua situação"],
  ["/simulador-distrato-imobiliario/", "Simulador de distrato imobiliário"],
  ["/mapa-do-site/", "Mapa do site"],
  ["/politica-de-privacidade/", "Política de privacidade"],
  ["/baixar-check-list/", "O que conferir antes de assinar"],
  ["/advogado-imobiliario-itajai/", "Advogado imobiliário em Itajaí"],
  ["/advogado-civel-itajai/", "Advogado cível em Itajaí"],
  ["/empresarial/", "Advogado empresarial em Itajaí"],
  ["/blog/imobiliario/moro-no-imovel-mas-nao-tenho-escritura/", "Moro no imóvel, mas não tenho escritura"],
  ["/blog/empresarial/cliente-nao-paga/", "Cliente não paga"],
  ["/blog/empresarial/advocacia-seguranca-juridica-itajai/", "Grandes decisões exigem respaldo jurídico"],
  ["/blog/empresarial/planejamento-tributario-empresas/", "Planejamento tributário para empresas"],
  ["/blog/economia/analise-fiscal-recorde-carga-tributaria/", "Carga tributária e seus impactos"],
  ["/blog/economia/analise-fiscal-o-recorde-da-carga-tributaria-2024/", "Análise fiscal: impactos da carga tributária"],
  ["/blog/politica/abismo-entre-arbitrio-coletivismo-e-fe/", "Agência individual, propriedade"],
  ["/blog/imobiliario/minha-obra-invadiu-o-terreno-do-vizinho-vou-perder-minha-casa/", "Minha obra invadiu o terreno do vizinho"],
  ["/blog/imobiliario/aluguel-sem-briga-deveres-do-locador-e-do-inquilino/", "Aluguel sem conflito"],
  ["/blog/civel/pagar-a-pensao-nao-basta-nova-lei-pune-o-pai-ou-a-mae-que-some-da-vida-do-filho/", "Pensão alimentícia e convivência"],
  ["/blog/civel/o-fim-do-nao-te-dou-o-divorcio-por-que-agora-a-separacao-pode-sair-quase-imediatamente/", "Divórcio: o que acontece"],
  ["/blog/familia/volta-as-aulas-o-pai-deve-pagar-o-material-escolar-ou-isso-ja-esta-incluso-na-pensao/", "Material escolar e pensão alimentícia"],
];

for (const [path, expectedText] of routes) {
  test(`renders accessible, optimized public route: ${path}`, async () => {
    const response = await requestPage(path);
    assert.equal(response.status, 200, `${path} returned ${response.status}`);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    const html = await response.text();
    assert.ok(html.includes(expectedText), `${path} does not contain ${expectedText}`);
    assert.match(html, /<html\s+lang="pt-BR"/i);
    assert.match(html, /<title>[^<]+<\/title>/i);
    assert.match(html, /<meta\s+name="description"/i);
    assert.match(html, /<link\s+rel="canonical"/i);
    assert.equal((html.match(/<h1(?:\s|>)/gi) || []).length, 1, `${path} must render exactly one h1`);
    for (const [image] of html.matchAll(/<img\b[^>]*>/gi)) {
      assert.match(image, /\balt="[^"]*"/i, `${path} contains an image without alternative text`);
      assert.match(image, /\bwidth="\d+"/i, `${path} contains an image without an intrinsic width`);
      assert.match(image, /\bheight="\d+"/i, `${path} contains an image without an intrinsic height`);
    }
    assert.ok(!html.includes("Starter Project"));
    assert.ok(!html.includes("2033-7627"));
  });
}

test("keeps every internal navigation destination reachable", async () => {
  const destinations = new Set();
  for (const [path] of routes) {
    const html = await (await requestPage(path)).text();
    for (const [, href] of html.matchAll(/<a\b[^>]*\shref="([^\"]+)"/gi)) {
      if (href.startsWith("/") && !href.startsWith("//")) {
        destinations.add(new URL(href, "http://localhost").pathname);
      }
    }
  }
  for (const destination of destinations) {
    const response = await requestPage(destination);
    assert.ok([200, 307, 308].includes(response.status), `${destination} returned ${response.status}`);
  }
});

test("assigns unique titles and descriptions to services, categories and articles", async () => {
  const groups = [
    routes.filter(([path]) => /^\/atuacao\/[^/]+\/$/.test(path)),
    routes.filter(([path]) => /^\/blog\/[^/]+\/$/.test(path)),
    routes.filter(([path]) => /^\/blog\/[^/]+\/[^/]+\/$/.test(path)),
  ];
  for (const group of groups) {
    const titles = new Set();
    const descriptions = new Set();
    for (const [path] of group) {
      const html = await (await requestPage(path)).text();
      const title = html.match(/<title>([^<]+)<\/title>/i)?.[1];
      const description = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i)?.[1];
      assert.ok(title && !titles.has(title), `${path} must have a unique title`);
      assert.ok(description && !descriptions.has(description), `${path} must have a unique description`);
      titles.add(title);
      descriptions.add(description);
    }
  }
});

test("preserves verified local business contact and structured data", async () => {
  const html = await (await requestPage("/contato/")).text();
  assert.ok(html.includes("(47) 3170-4250"));
  assert.ok(html.includes("drfabiano@odilonrebeloadvocacia.com.br"));
  assert.ok(html.includes("LegalService"));
  assert.ok(html.includes("88308-150"));
  assert.ok(html.includes("09:00"));
});

test("preserves existing Google Analytics and ownership verification", async () => {
  const html = await (await requestPage("/")).text();
  assert.ok(html.includes("GT-NGWZV8F2"));
  assert.ok(html.includes("6A2xQsMx_5Qj0G3pM6KW1P_ENNB1RAPDHk9QpwgGb9o"));
  assert.ok(html.includes("5a692b555f2e30a9"));
});

test("uses the original transparent office logo in the header and footer", async () => {
  const html = await (await requestPage("/")).text();
  const logo = await readFile(new URL("../public/logo-odilon-rebelo.png", import.meta.url));
  assert.equal(logo.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
  assert.equal((html.match(/src="\/logo-odilon-rebelo\.png"/g) || []).length, 2);
  assert.ok(html.includes("Logotipo oficial de Odilon Rebelo Advocacia"));
});

test("renders an accessible persistent light and dark theme toggle", async () => {
  const html = await (await requestPage("/")).text();
  const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const navigation = await readFile(new URL("../app/client-components.tsx", import.meta.url), "utf8");
  assert.ok(html.includes('aria-label="Ativar tema escuro"'));
  assert.ok(html.includes('aria-pressed="false"'));
  assert.ok(html.includes("odilon-rebelo-theme"));
  assert.ok(html.includes("prefers-color-scheme: dark"));
  assert.ok(styles.includes(':root[data-theme="dark"]'));
  assert.ok(navigation.includes("localStorage.setItem(themeStorageKey, nextTheme)"));
  assert.ok(navigation.includes("useSyncExternalStore"));
});

test("keeps readable foreground contrast in light and dark palettes", () => {
  function relativeLuminance(hex) {
    return [1, 3, 5].map((index) => Number.parseInt(hex.slice(index, index + 2), 16) / 255)
      .map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
      .reduce((total, value, index) => total + value * [0.2126, 0.7152, 0.0722][index], 0);
  }
  function contrast(foreground, background) {
    const [bright, dark] = [relativeLuminance(foreground), relativeLuminance(background)].sort((a, b) => b - a);
    return (bright + 0.05) / (dark + 0.05);
  }
  assert.ok(contrast("#82613c", "#fcfbf8") >= 4.5);
  assert.ok(contrast("#46544c", "#f6f5f1") >= 4.5);
  assert.ok(contrast("#c4c8c0", "#111512") >= 4.5);
  assert.ok(contrast("#d8bb88", "#191e1a") >= 4.5);
});

test("preserves the original qualified contact form fields", async () => {
  const html = await (await requestPage("/contato/")).text();
  for (const field of ["nome", "email", "whatsapp", "motivo", "urgencia"]) {
    assert.match(html, new RegExp(`name="${field}"`));
  }
  assert.ok(html.includes("Solicitar atendimento"));
});

test("preserves the verified original contact integration and WhatsApp fallback", async () => {
  const siteData = await readFile(new URL("../app/site-data.ts", import.meta.url), "utf8");
  const clientComponents = await readFile(new URL("../app/client-components.tsx", import.meta.url), "utf8");
  assert.ok(siteData.includes("script.google.com/macros/s/AKfycbyIrFZ1SjB7n0GsW3QXCQzeL8A03qW-sI55rhhGQzEVQ-NbWK70mm8VkQ3dcbU2vnrz/exec"));
  assert.ok(clientComponents.includes("fetch(brand.contactEndpoint"));
  assert.ok(clientComponents.includes('acao: "consulta"'));
  assert.ok(clientComponents.includes("whatsappLink(fallbackMessage)"));
});

test("publishes the verified professional chronology without inventing founding claims", async () => {
  const html = await (await requestPage("/advogado-odilon-rebelo/")).text();
  for (const year of ["1993", "2008", "2022", "2023"]) assert.ok(html.includes(year));
  assert.ok(!html.includes("fundação do escritório"));
});

test("retains responsive breakpoints, keyboard focus and reduced-motion support", async () => {
  const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  for (const breakpoint of ["1090px", "820px", "560px", "359px"]) {
    assert.ok(styles.includes(`@media (max-width: ${breakpoint})`));
  }
  assert.ok(styles.includes(":focus-visible"));
  assert.ok(styles.includes("prefers-reduced-motion: reduce"));
  assert.ok(styles.includes("overflow-x: clip"));
});

test("adds service, FAQ and breadcrumb structured data", async () => {
  const html = await (await requestPage("/atuacao/advogado-imobiliario-itajai/")).text();
  assert.ok(html.includes("FAQPage"));
  assert.ok(html.includes("BreadcrumbList"));
  assert.ok(html.includes("\"@type\":\"Service\""));
});

test("uses article-specific metadata and images", async () => {
  const html = await (await requestPage("/blog/imobiliario/moro-no-imovel-mas-nao-tenho-escritura/")).text();
  assert.ok(html.includes("\"@type\":\"Article\""));
  assert.ok(html.includes("passos-para-adquirir-sua-casa"));
  assert.ok(html.includes("article:published_time") || html.includes("datePublished"));
});

test("publishes category-specific SEO metadata", async () => {
  const html = await (await requestPage("/blog/politica/")).text();
  assert.match(html, /<title>Artigos sobre Política e sociedade/);
  assert.match(html, /\/blog\/politica\//);
  assert.ok(!html.includes("Página não encontrada"));
});

test("redirects article duplicates to their canonical category", async () => {
  const response = await requestPage("/blog/empresarial/moro-no-imovel-mas-nao-tenho-escritura/");
  assert.equal(response.status, 308);
  assert.match(response.headers.get("location") || "", /\/blog\/imobiliario\/moro-no-imovel-mas-nao-tenho-escritura\/$/);
});

test("publishes a crawlable robots policy and complete XML sitemap", async () => {
  const robotsResponse = await requestPage("/robots.txt");
  assert.equal(robotsResponse.status, 200);
  const robots = await robotsResponse.text();
  assert.match(robots, /User-Agent:\s*\*/i);
  assert.match(robots, /Sitemap:\s*https:\/\/odilonrebeloadvocacia\.com\.br\/sitemap\.xml/i);

  const sitemapResponse = await requestPage("/sitemap.xml");
  assert.equal(sitemapResponse.status, 200);
  assert.match(sitemapResponse.headers.get("content-type") || "", /xml/i);
  const sitemap = await sitemapResponse.text();
  assert.equal((sitemap.match(/<url>/g) || []).length, 37);
  assert.ok(sitemap.includes("/atuacao/advogado-imobiliario-itajai/"));
  assert.ok(sitemap.includes("/blog/politica/"));
  assert.ok(sitemap.includes("/blog/imobiliario/moro-no-imovel-mas-nao-tenho-escritura/"));
});

test("redirects the historical WhatsApp route to the verified number", async () => {
  const response = await requestPage("/whatsapp/");
  assert.ok([307, 308].includes(response.status));
  assert.match(response.headers.get("location") || "", /^https:\/\/wa\.me\/554731704250/);
});

test("rejects nonexistent content categories instead of creating soft 404s", async () => {
  const response = await requestPage("/blog/categoria-inexistente/");
  assert.equal(response.status, 404);
});

test("returns the branded not-found page for unknown routes", async () => {
  const response = await requestPage("/uma-pagina-que-nao-existe/");
  assert.equal(response.status, 404);
  assert.ok((await response.text()).includes("Esta página não foi encontrada"));
});
