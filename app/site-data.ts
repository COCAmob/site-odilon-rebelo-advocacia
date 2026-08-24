export const brand = {
  name: "Odilon Rebelo Advocacia",
  lawyer: "Fabiano Odilon Rebelo",
  oab: "OAB/SC 68.648",
  creci: "CRECI/SC 16272",
  website: "https://odilonrebeloadvocacia.com.br",
  phone: "(47) 3170-4250",
  phoneInternational: "+554731704250",
  whatsappNumber: "554731704250",
  email: "drfabiano@odilonrebeloadvocacia.com.br",
  street: "Rua Agílio Cunha, 372 · Sala 101",
  district: "Cidade Nova · Itajaí, SC",
  postcode: "88308-150",
  hours: "Segunda a sexta, das 9h às 17h",
  googleTagId: "GT-NGWZV8F2",
  googleSiteVerification: "6A2xQsMx_5Qj0G3pM6KW1P_ENNB1RAPDHk9QpwgGb9o",
  yandexVerification: "5a692b555f2e30a9",
  contactEndpoint: "https://script.google.com/macros/s/AKfycbyIrFZ1SjB7n0GsW3QXCQzeL8A03qW-sI55rhhGQzEVQ-NbWK70mm8VkQ3dcbU2vnrz/exec",
  portrait: "https://odilonrebeloadvocacia.com.br/wp-content/uploads/2026/08/retrato-advogado-fabiano-odilon-rebelo-itajai-sc.webp",
  portraitEditorial: "https://odilonrebeloadvocacia.com.br/wp-content/uploads/2026/07/Advogado-Fabiano-Odilon-Rebelo-Advocacia-pensativo-e1783320062220.webp",
  socialImage: "https://odilonrebeloadvocacia.com.br/wp-content/uploads/2026/07/capa-2-Odilon-Rebelo-Advocacia-Itajai-solucoes-juridicas-com-tecnica-e-etica.webp",
  mapUrl: "https://www.google.com/maps/search/Odilon%20Rebelo%20Advocacia/@-26.9168,-48.6937,17z?hl=pt-BR",
  reviewUrl: "https://g.page/r/CV0lwW3ShRlREBM/review",
} as const;

export function whatsappLink(message = "Olá! Gostaria de conversar sobre uma demanda jurídica.") {
  return `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const socialProfiles = [
  { label: "Instagram", href: "https://www.instagram.com/odilonrebeloadvocacia/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/advogado-odilon-rebelo" },
  { label: "Facebook", href: "https://www.facebook.com/odilonrebeloadvocacia" },
  { label: "YouTube", href: "https://www.youtube.com/@OdilonRebeloAdv" },
] as const;

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  description: string;
  intro: string;
  outcomes: string[];
  situations: string[];
  faq: { question: string; answer: string }[];
  image?: string;
  featured?: boolean;
}

export const services: Service[] = [
  {
    slug: "advogado-imobiliario-itajai",
    title: "Advogado imobiliário em Itajaí",
    shortTitle: "Direito imobiliário",
    eyebrow: "Patrimônio e negócios imobiliários",
    description: "Compra, venda, locação, contratos e regularização imobiliária com análise jurídica antes da assinatura.",
    intro: "O imóvel representa patrimônio, planejamento e decisões de longo prazo. Uma análise criteriosa de documentos, contratos e riscos ajuda você a negociar com mais clareza e segurança em Itajaí e região.",
    outcomes: ["Análise de matrícula, certidões e documentação", "Elaboração e revisão de contratos imobiliários", "Assessoria em compra, venda e locação", "Regularização e proteção patrimonial"],
    situations: ["Você vai comprar um imóvel e quer verificar riscos antes de fechar negócio.", "Existe um conflito relacionado à locação, entrega ou documentação do imóvel.", "Seu patrimônio precisa ser regularizado ou protegido juridicamente."],
    faq: [
      { question: "Quando procurar um advogado imobiliário?", answer: "Preferencialmente antes de assinar contratos, pagar sinal ou concluir uma compra. A atuação preventiva também é indicada para locações, regularizações e conflitos já existentes." },
      { question: "O escritório atende imóveis fora de Itajaí?", answer: "O atendimento presencial acontece em Itajaí. Demandas compatíveis com atendimento digital podem ser avaliadas online, conforme as características do caso." },
    ],
    image: "https://odilonrebeloadvocacia.com.br/wp-content/uploads/2026/08/advogado-imobiliario-itajai-analise-documental.webp",
    featured: true,
  },
  {
    slug: "advogado-empresarial-itajai",
    title: "Advogado empresarial em Itajaí",
    shortTitle: "Direito empresarial",
    eyebrow: "Estratégia e segurança para empresas",
    description: "Contratos comerciais, relações societárias, cobrança e assessoria preventiva para decisões empresariais.",
    intro: "O jurídico precisa acompanhar a realidade da empresa. A assessoria empresarial organiza contratos, identifica vulnerabilidades e oferece apoio técnico para sócios e gestores tomarem decisões com mais segurança.",
    outcomes: ["Elaboração e revisão de contratos comerciais", "Orientação societária e acordos entre sócios", "Cobrança e recuperação de créditos", "Assessoria preventiva e atendimento in-company"],
    situations: ["Sua empresa vai firmar um contrato importante e precisa avaliar cláusulas e responsabilidades.", "A inadimplência de clientes está afetando o funcionamento do negócio.", "Sócios ou gestores precisam organizar juridicamente uma decisão estratégica."],
    faq: [
      { question: "A assessoria empresarial é apenas para empresas grandes?", answer: "Não. Contratos, cobranças e decisões societárias podem exigir orientação jurídica em empresas de diferentes portes. O atendimento é direcionado às necessidades apresentadas." },
      { question: "Existe atendimento na empresa?", answer: "Sim. O escritório informa atendimento presencial, online e consultoria in-company, mediante alinhamento prévio." },
    ],
    image: "https://odilonrebeloadvocacia.com.br/wp-content/uploads/2026/07/reuniao-empresarial-odilon-rebelo-advogado-itajai-600x400.webp",
    featured: true,
  },
  {
    slug: "advogado-civel-itajai",
    title: "Advogado cível em Itajaí",
    shortTitle: "Direito civil",
    eyebrow: "Contratos, conflitos e responsabilidades",
    description: "Contratos, cobranças, indenizações e resolução de conflitos patrimoniais com orientação clara.",
    intro: "Quando uma dívida não é paga, um contrato gera dúvidas ou um dano precisa ser reparado, o primeiro passo é compreender os fatos, reunir documentos e definir uma estratégia jurídica adequada.",
    outcomes: ["Revisão e elaboração de contratos", "Cobranças e recuperação de valores", "Responsabilidade civil e indenizações", "Negociação e resolução de conflitos"],
    situations: ["Você precisa cobrar um valor devido e não sabe qual medida é adequada.", "Um contrato deixou responsabilidades ou cláusulas importantes indefinidas.", "Uma situação gerou prejuízo e requer análise sobre eventual reparação."],
    faq: [
      { question: "Todo conflito precisa virar processo?", answer: "Não. Dependendo dos documentos e da situação, a negociação ou outra medida extrajudicial pode ser considerada antes de uma ação judicial." },
      { question: "Quais documentos devo apresentar?", answer: "Contratos, comprovantes, conversas relevantes e outros registros relacionados ao problema ajudam na avaliação inicial. A documentação necessária varia conforme o caso." },
    ],
    featured: true,
  },
  {
    slug: "advogado-usucapiao-itajai",
    title: "Usucapião e regularização de imóveis em Itajaí",
    shortTitle: "Usucapião",
    eyebrow: "Regularização da propriedade",
    description: "Avaliação documental da posse e orientação sobre caminhos judiciais ou extrajudiciais para regularizar imóveis.",
    intro: "Morar ou cuidar de um imóvel sem documentação regular pode gerar insegurança patrimonial. A análise da posse, do histórico e dos documentos permite verificar se a usucapião é uma alternativa aplicável.",
    outcomes: ["Análise do tempo e das características da posse", "Organização dos documentos necessários", "Avaliação da via judicial ou extrajudicial", "Orientação para regularização do imóvel"],
    situations: ["Você mora no imóvel, mas não possui escritura ou registro regular.", "A propriedade está amparada apenas por contrato particular ou documentação incompleta.", "Existe interesse em formalizar a propriedade para proteger o patrimônio familiar."],
    faq: [
      { question: "Usucapião pode ser feita em cartório?", answer: "Em determinadas situações, a via extrajudicial pode ser avaliada. A possibilidade depende dos requisitos legais, da documentação e das particularidades do imóvel." },
      { question: "Quanto tempo de posse é necessário?", answer: "Os prazos variam conforme a modalidade e as circunstâncias do caso. Uma análise individual é necessária para verificar qual hipótese pode ser aplicável." },
    ],
    image: "https://odilonrebeloadvocacia.com.br/wp-content/uploads/2026/08/advogado-odilon-rebelo-especialista-usucapiao-itajai-sc.jpg",
  },
  {
    slug: "distrato-imobiliario-itajai",
    title: "Distrato imobiliário em Itajaí",
    shortTitle: "Distrato imobiliário",
    eyebrow: "Rescisão e análise contratual",
    description: "Análise de rescisão contratual, atraso de obra, retenções e devolução de valores em negócios imobiliários.",
    intro: "A rescisão de um contrato imobiliário exige atenção às cláusulas, à origem do cancelamento e aos valores efetivamente pagos. Uma avaliação técnica ajuda a identificar condições e eventuais retenções inadequadas.",
    outcomes: ["Revisão do contrato e do histórico de pagamentos", "Análise de atrasos e responsabilidades", "Verificação de multas, retenções e devoluções", "Orientação para negociação ou medidas cabíveis"],
    situations: ["A entrega do imóvel atrasou e você precisa avaliar a rescisão.", "A construtora apresentou um distrato com retenções que parecem elevadas.", "Uma mudança financeira exige compreender os efeitos do cancelamento."],
    faq: [
      { question: "Qual valor pode ser devolvido em um distrato?", answer: "A estimativa depende do motivo da rescisão, do regime do empreendimento, do contrato e dos valores efetivamente pagos. O simulador apresenta cenários gerais e não substitui a análise jurídica." },
      { question: "A comissão de corretagem entra no cálculo?", answer: "O tratamento da corretagem depende das circunstâncias e da responsabilidade pelo distrato. O contrato e os comprovantes precisam ser avaliados individualmente." },
    ],
    image: "https://odilonrebeloadvocacia.com.br/wp-content/uploads/2026/08/distrato-imobiliario-em-itajai-sc-odilon-rebelo-adv.webp",
  },
  {
    slug: "direito-de-familia-itajai", title: "Direito de família em Itajaí", shortTitle: "Direito de família", eyebrow: "Decisões familiares com cuidado",
    description: "Orientação em divórcio, guarda, alimentos e outras questões familiares, com tratamento respeitoso.",
    intro: "Questões familiares exigem atenção jurídica e sensibilidade. O atendimento considera a situação apresentada, os interesses envolvidos e as alternativas adequadas para conduzir a demanda.",
    outcomes: ["Orientação sobre divórcio e dissolução de união estável", "Análise de guarda e convivência familiar", "Avaliação de pensão alimentícia", "Negociação e organização de acordos"],
    situations: ["Você precisa compreender os próximos passos de uma separação.", "Existem dúvidas sobre alimentos, convivência ou responsabilidades familiares.", "As partes desejam avaliar uma solução consensual."],
    faq: [{ question: "É possível buscar uma solução consensual?", answer: "Quando as condições permitem, caminhos consensuais podem ser avaliados. A estratégia depende dos interesses envolvidos e das circunstâncias concretas." }],
  },
  {
    slug: "inventario-itajai", title: "Inventários e sucessões em Itajaí", shortTitle: "Inventários", eyebrow: "Patrimônio familiar e sucessão",
    description: "Orientação sobre inventários judiciais ou extrajudiciais e organização da sucessão patrimonial.",
    intro: "A organização de um inventário começa pelo levantamento dos bens, documentos e interessados. A análise jurídica indica quais procedimentos podem ser considerados em cada contexto familiar.",
    outcomes: ["Levantamento de informações patrimoniais", "Análise de documentação e herdeiros", "Avaliação das vias judicial e extrajudicial", "Orientação sobre os próximos passos da sucessão"],
    situations: ["A família precisa organizar a documentação e os bens deixados por um familiar.", "Há dúvidas sobre a possibilidade de realizar o procedimento em cartório.", "O imóvel ou outro patrimônio ainda precisa ser regularizado."],
    faq: [{ question: "Todo inventário precisa ser judicial?", answer: "Não necessariamente. A possibilidade de inventário extrajudicial depende dos requisitos legais e da situação concreta dos envolvidos." }],
  },
  {
    slug: "direito-previdenciario-itajai", title: "Direito previdenciário em Itajaí", shortTitle: "Direito previdenciário", eyebrow: "Orientação previdenciária",
    description: "Orientação sobre aposentadoria, benefícios previdenciários, revisão e encaminhamentos relacionados ao INSS.",
    intro: "A avaliação previdenciária considera histórico de contribuição, documentos e requisitos aplicáveis. O atendimento ajuda a organizar informações antes de definir os encaminhamentos adequados.",
    outcomes: ["Orientação sobre aposentadoria", "Análise de benefícios previdenciários", "Avaliação documental e contributiva", "Encaminhamentos relacionados ao INSS"],
    situations: ["Você precisa verificar possibilidades de aposentadoria ou benefício.", "Um pedido previdenciário foi negado ou exige documentação adicional.", "Existem dúvidas sobre contribuições e histórico previdenciário."],
    faq: [{ question: "Quais documentos são analisados?", answer: "A documentação varia conforme o benefício pretendido. O histórico contributivo e os registros relacionados ao pedido ajudam na avaliação inicial." }],
  },
  {
    slug: "consultoria-juridica-itajai", title: "Consultoria jurídica em Itajaí", shortTitle: "Consultoria jurídica", eyebrow: "Orientação antes da decisão",
    description: "Análise preventiva de contratos, decisões e situações jurídicas para pessoas físicas e empresas.",
    intro: "A consulta jurídica organiza dúvidas, analisa documentos e identifica riscos antes de uma decisão relevante. O atendimento pode ser presencial, online ou, quando alinhado, na própria empresa.",
    outcomes: ["Leitura e análise de contratos", "Identificação de riscos e responsabilidades", "Orientação jurídica preventiva", "Atendimento presencial, online ou in-company"],
    situations: ["Você precisa de orientação antes de assinar um documento importante.", "Sua empresa deseja avaliar riscos antes de tomar uma decisão.", "Uma situação jurídica exige explicações claras e análise individual."],
    faq: [{ question: "Como funciona a primeira consulta?", answer: "O contato inicial permite compreender a demanda, orientar sobre documentos relevantes e alinhar o formato do atendimento." }],
  },
];

export interface Article {
  slug: string;
  category: string;
  categoryLabel: string;
  title: string;
  description: string;
  date: string;
  displayDate: string;
  image: string;
  paragraphs: string[];
  sections: { title: string; text: string }[];
}

const uploadBase = `${brand.website}/wp-content/uploads`;

export const articles: Article[] = [
  {
    slug: "advocacia-seguranca-juridica-itajai", category: "empresarial", categoryLabel: "Empresarial", title: "Grandes decisões exigem respaldo jurídico: o papel da advocacia preventiva",
    description: "Por que avaliar contratos, riscos e responsabilidades antes de decisões empresariais ou imobiliárias.", date: "2026-07-28", displayDate: "28 jul 2026", image: `${uploadBase}/2026/07/citacao-grandes-decisoes-fabiano-900x600.webp`,
    paragraphs: ["Decisões corporativas e imobiliárias costumam produzir consequências que vão além do momento da assinatura. Cláusulas pouco claras, documentos incompletos e responsabilidades não avaliadas podem transformar uma boa oportunidade em um problema duradouro.", "A advocacia preventiva organiza informações antes que o conflito apareça. Isso inclui compreender os riscos da operação, revisar os documentos relevantes e esclarecer quais medidas podem oferecer mais segurança à decisão."],
    sections: [{ title: "O que deve ser avaliado antes de decidir", text: "Contratos, obrigações assumidas, documentação disponível e possíveis impactos para o patrimônio ou a empresa precisam ser considerados de forma conjunta." }, { title: "Orientação jurídica como apoio à estratégia", text: "O objetivo não é tornar a decisão mais burocrática, mas permitir que ela aconteça com informações claras e uma compreensão realista dos riscos envolvidos." }],
  },
  {
    slug: "cliente-nao-paga", category: "empresarial", categoryLabel: "Empresarial", title: "Cliente não paga: como lidar com a inadimplência na empresa",
    description: "Entenda quais informações e documentos ajudam a organizar uma estratégia de cobrança empresarial.", date: "2026-07-27", displayDate: "27 jul 2026", image: `${uploadBase}/capas-auto/capa-post-814.webp?v=1785200734`,
    paragraphs: ["A inadimplência afeta o fluxo de caixa e pode comprometer compromissos importantes da empresa. Antes de decidir qual caminho seguir, é necessário entender como a dívida surgiu e quais documentos comprovam a relação comercial.", "Contratos, notas fiscais, comprovantes, mensagens e registros de negociação ajudam a organizar a análise. Dependendo das circunstâncias, medidas extrajudiciais ou judiciais podem ser consideradas."],
    sections: [{ title: "Organize a documentação da cobrança", text: "Reúna o histórico da contratação, valores, vencimentos e tentativas anteriores de contato. Informações consistentes facilitam a definição de uma abordagem adequada." }, { title: "Evite decisões precipitadas", text: "A estratégia depende do tipo de dívida, da documentação existente e do relacionamento comercial. Uma análise jurídica ajuda a identificar os próximos passos possíveis." }],
  },
  {
    slug: "planejamento-tributario-empresas", category: "empresarial", categoryLabel: "Empresarial", title: "Planejamento tributário para empresas: organização antes da decisão",
    description: "Como a análise prévia das operações empresariais contribui para decisões tributárias mais conscientes.", date: "2026-07-16", displayDate: "16 jul 2026", image: `${uploadBase}/2026/07/reuniao-empresarial-odilon-rebelo-advogado-itajai-600x400.webp`,
    paragraphs: ["O planejamento tributário depende da compreensão das operações da empresa e das regras aplicáveis a cada situação. A análise deve acontecer antes das decisões relevantes, com informações adequadas e observância da legislação.", "A realidade de cada negócio é diferente. Estrutura societária, atividades e documentação podem influenciar a avaliação das alternativas disponíveis."],
    sections: [{ title: "A importância de uma avaliação individual", text: "Medidas adequadas para uma empresa podem não servir para outra. A orientação deve considerar o contexto específico e evitar promessas genéricas de economia." }],
  },
  {
    slug: "analise-fiscal-recorde-carga-tributaria", category: "economia", categoryLabel: "Economia", title: "Carga tributária e seus impactos nas decisões empresariais",
    description: "Uma leitura sobre os efeitos do ambiente fiscal para a organização e o planejamento das empresas.", date: "2026-07-07", displayDate: "7 jul 2026", image: `${uploadBase}/2026/07/analise-fiscal-carga_tributaria-2026-600x400.webp`,
    paragraphs: ["O ambiente fiscal influencia custos, margens e decisões de investimento. Para empresas, acompanhar esse cenário significa compreender como obrigações e mudanças podem repercutir na própria operação.", "Uma análise responsável considera documentos, atividade econômica e regras aplicáveis, sem substituir a avaliação individual por conclusões padronizadas."],
    sections: [{ title: "Planejamento com informações verificáveis", text: "Organização documental, acompanhamento das obrigações e orientação profissional contribuem para decisões empresariais mais consistentes." }],
  },
  {
    slug: "abismo-entre-arbitrio-coletivismo-e-fe", category: "politica", categoryLabel: "Política e sociedade", title: "Agência individual, propriedade e a relação entre coletivismo e fé",
    description: "Reflexões sobre liberdade individual, responsabilidade, propriedade e diferentes visões de organização social.", date: "2026-03-29", displayDate: "29 mar 2026", image: `${uploadBase}/2026/07/gemini_generated_image_ijwj4dijwj4dijwj-3Ja5lt2e2pG44SZq-600x400.webp`,
    paragraphs: ["A relação entre liberdade individual, responsabilidade e propriedade envolve perspectivas jurídicas, filosóficas e sociais. O debate costuma apresentar diferentes interpretações sobre o papel do indivíduo e da coletividade.", "Examinar essas questões requer distinguir argumentos, reconhecer divergências e observar como cada posição compreende dignidade, autonomia e deveres sociais."],
    sections: [{ title: "Liberdade e responsabilidade", text: "A discussão sobre agência individual aborda a capacidade de escolha e a responsabilidade pelas próprias decisões em uma sociedade organizada." }],
  },
  {
    slug: "minha-obra-invadiu-o-terreno-do-vizinho-vou-perder-minha-casa", category: "imobiliario", categoryLabel: "Imobiliário", title: "Minha obra invadiu o terreno do vizinho. O que fazer?",
    description: "Entenda por que documentação, limites do imóvel e circunstâncias da construção precisam ser avaliados.", date: "2026-01-08", displayDate: "8 jan 2026", image: `${uploadBase}/2026/07/casas-demolidas-blumenau-morro-800x600-VUD5WMJYoUJB3VR4-600x400.webp`,
    paragraphs: ["Uma divergência na divisa entre terrenos pode gerar preocupação para proprietários e vizinhos. Antes de concluir que a construção precisará ser demolida, é importante verificar as medidas, os documentos e as circunstâncias da ocupação.", "A situação deve ser avaliada a partir da extensão da divergência, da documentação dos imóveis e da existência ou não de boa-fé. Cada caso possui características próprias."],
    sections: [{ title: "Reúna documentos e informações técnicas", text: "Matrículas, plantas, projetos, levantamentos e registros relacionados à construção ajudam a esclarecer a situação e orientar o diálogo entre os envolvidos." }, { title: "Busque orientação antes de qualquer medida", text: "Uma avaliação jurídica pode indicar formas de negociação e os procedimentos apropriados para o conflito apresentado." }],
  },
  {
    slug: "analise-fiscal-o-recorde-da-carga-tributaria-2024", category: "economia", categoryLabel: "Economia", title: "Análise fiscal: impactos da carga tributária para o contribuinte",
    description: "Uma reflexão sobre arrecadação, obrigações e os efeitos do cenário tributário para cidadãos e empresas.", date: "2025-12-15", displayDate: "15 dez 2025", image: `${uploadBase}/2026/07/unnamed-62DBHBdUVO9aVSpQ-600x400.webp`,
    paragraphs: ["A carga tributária influencia o orçamento das famílias, a operação das empresas e as decisões de investimento. Compreender o tema exige observar informações confiáveis e o contexto específico de cada obrigação.", "Para o contribuinte, organização documental e orientação individual são pontos importantes na avaliação das questões fiscais relacionadas à sua realidade."],
    sections: [{ title: "Consequências para o planejamento", text: "A análise das obrigações e dos custos associados contribui para decisões mais conscientes e para a organização das atividades econômicas." }],
  },
  {
    slug: "pagar-a-pensao-nao-basta-nova-lei-pune-o-pai-ou-a-mae-que-some-da-vida-do-filho", category: "civel", categoryLabel: "Família e direito civil", title: "Pensão alimentícia e convivência: responsabilidades que vão além do pagamento",
    description: "Uma análise sobre assistência, presença e responsabilidades familiares conforme a situação concreta.", date: "2025-12-10", displayDate: "10 dez 2025", image: `${uploadBase}/2026/07/90c967e42cec74500820ff8dfdda0529-4nZBHOMT2EdMIdYL-600x400.webp`,
    paragraphs: ["As responsabilidades familiares não se limitam à organização financeira. Questões relacionadas à convivência, assistência e participação na vida dos filhos podem ter relevância jurídica conforme os fatos apresentados.", "A avaliação dessas situações depende de provas, contexto familiar e regras aplicáveis. Orientação individual é indispensável antes de considerar qualquer medida."],
    sections: [{ title: "Cada situação exige análise própria", text: "A existência de pagamentos não resolve automaticamente outras questões familiares. Da mesma forma, eventuais consequências jurídicas dependem das circunstâncias concretas." }],
  },
  {
    slug: "aluguel-sem-briga-deveres-do-locador-e-do-inquilino", category: "imobiliario", categoryLabel: "Imobiliário", title: "Aluguel sem conflito: deveres do proprietário e do inquilino",
    description: "Conheça os principais pontos que precisam ser definidos para uma relação de locação mais clara.", date: "2025-12-06", displayDate: "6 dez 2025", image: `${uploadBase}/2026/07/1-lei-do-inquilinato-conheca-os-direitos-e-deveres-do-locador-e-locatario-n2ftjhnZY76uE9xF-600x400.webp`,
    paragraphs: ["Muitos conflitos de locação surgem por dúvidas sobre manutenção, despesas e responsabilidades. Um contrato bem compreendido e a documentação do estado do imóvel ajudam a reduzir divergências.", "As obrigações do proprietário e do inquilino dependem da legislação aplicável, do contrato e das características de cada problema."],
    sections: [{ title: "Conservação e condições do imóvel", text: "É importante distinguir problemas estruturais, condições anteriores à locação e situações relacionadas ao uso do imóvel durante o contrato." }, { title: "Despesas e responsabilidades contratuais", text: "Cláusulas sobre condomínio, tributos, manutenção e reparos devem ser analisadas para compreender o que foi pactuado e quais regras se aplicam." }],
  },
  {
    slug: "volta-as-aulas-o-pai-deve-pagar-o-material-escolar-ou-isso-ja-esta-incluso-na-pensao", category: "familia", categoryLabel: "Família", title: "Material escolar e pensão alimentícia: como avaliar as despesas",
    description: "Entenda por que acordos, decisões judiciais e despesas extraordinárias precisam ser analisados individualmente.", date: "2025-12-03", displayDate: "3 dez 2025", image: `${uploadBase}/2026/07/m0jaap3l1bolwt7ui58y_educaassapso_308k.-lWkVTjYsdmIc3zPo-600x400.webp`,
    paragraphs: ["A compra de livros, materiais e uniformes costuma gerar dúvidas em famílias que possuem acordos ou decisões sobre pensão alimentícia. A resposta depende do que foi estabelecido entre as partes e das circunstâncias específicas.", "Antes de presumir quem deve assumir determinada despesa, é importante consultar o documento que regula os alimentos e avaliar a natureza do gasto."],
    sections: [{ title: "O acordo ou a decisão judicial é o ponto de partida", text: "A existência de previsão sobre despesas ordinárias ou extraordinárias pode influenciar a análise. Quando houver dúvida, a situação deve ser examinada individualmente." }],
  },
  {
    slug: "o-fim-do-nao-te-dou-o-divorcio-por-que-agora-a-separacao-pode-sair-quase-imediatamente", category: "civel", categoryLabel: "Família e direito civil", title: "Divórcio: o que acontece quando apenas uma pessoa deseja a separação?",
    description: "Compreenda por que a vontade de uma das partes e as questões patrimoniais precisam ser analisadas separadamente.", date: "2026-07-07", displayDate: "7 jul 2026", image: `${uploadBase}/2026/07/o-processo-de-diva3rcio-pode-ocorrer-de-forma-consensual-amiga-vel-ou-litigioso-nao-amiga-vel-960x540-BgcXx0j57he4794H.webp`,
    paragraphs: ["A decisão de encerrar um casamento pode surgir mesmo quando não existe consenso entre as partes. Nessa situação, o divórcio e outras questões relacionadas ao relacionamento podem receber tratamento jurídico distinto.", "Partilha de bens, guarda e alimentos dependem de análise própria. A estratégia adequada varia conforme a documentação, a existência de filhos e as circunstâncias familiares."],
    sections: [{ title: "Separação e questões pendentes", text: "O encerramento do vínculo conjugal não elimina a necessidade de organizar responsabilidades patrimoniais e familiares quando elas existirem." }],
  },
  {
    slug: "moro-no-imovel-mas-nao-tenho-escritura", category: "imobiliario", categoryLabel: "Imobiliário", title: "Moro no imóvel, mas não tenho escritura. Como regularizar?",
    description: "Conheça os pontos avaliados quando existe posse do imóvel, mas a documentação não está regularizada.", date: "2026-08-20", displayDate: "20 ago 2026", image: `${uploadBase}/2026/07/passos-para-adquirir-sua-casa-pra3pria-xxEnfyFhPcZlYjaU.webp`,
    paragraphs: ["A posse de um imóvel sem escritura registrada pode dificultar operações, gerar insegurança e tornar a situação patrimonial mais complexa. Contratos particulares, recibos e o histórico de ocupação ajudam a compreender o caso.", "A usucapião é uma das possibilidades que podem ser analisadas, mas sua aplicação depende de requisitos legais, documentos e características específicas da posse."],
    sections: [{ title: "Reúna os documentos disponíveis", text: "Comprovantes de residência, contratos, recibos e outros registros relacionados ao imóvel podem ajudar a organizar a avaliação jurídica." }, { title: "Via judicial ou extrajudicial", text: "A possibilidade de regularização em cartório ou pela via judicial depende da situação concreta, da documentação e dos requisitos aplicáveis." }],
  },
];

export function serviceHref(service: Pick<Service, "slug">) {
  return `/atuacao/${service.slug}/`;
}

export function articleHref(article: Pick<Article, "category" | "slug">) {
  return `/blog/${article.category}/${article.slug}/`;
}

export const articleCategories = [
  { slug: "imobiliario", label: "Direito imobiliário", filter: "Imobiliário" },
  { slug: "empresarial", label: "Direito empresarial", filter: "Empresarial" },
  { slug: "familia", label: "Direito de família", filter: "Família" },
  { slug: "civel", label: "Direito civil e família", filter: "Família" },
  { slug: "economia", label: "Economia e tributação", filter: "Economia" },
  { slug: "politica", label: "Política e sociedade", filter: "Política e sociedade" },
] as const;

export const primaryServices = services.filter((service) => service.featured);

export const testimonials = [
  { name: "Rolando Serafim da Luz", location: "Centro · Itajaí", quote: "Excelente atendimento e profissionalismo, sem deixar dúvidas em suas respostas e consultas. Profissional de alta qualidade e já me tornei cliente." },
  { name: "Carlos Loss Junior", location: "Gravatá · Navegantes", quote: "Fomos muito bem atendidos pelo Fabiano, desde o primeiro contato até o desfecho. Fabiano fez a defesa no sentido de clarear a luz da lei do inquilinato." },
  { name: "Sandra Souza Coelho", location: "Pioneiros · Balneário Camboriú", quote: "Um profissional excelente, sempre solícito, prestativo e muito atencioso." },
] as const;
