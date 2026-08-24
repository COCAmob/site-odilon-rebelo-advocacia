import Link from "next/link";
import { ArrowIcon } from "./site-components";

export default function NotFound() {
  return <main id="conteudo-principal" className="not-found-page"><div className="container not-found-inner"><p className="eyebrow">Erro 404</p><h1>Esta página não foi encontrada.</h1><p>O endereço pode ter mudado. Você pode voltar ao início, conhecer as áreas de atuação ou pesquisar nossos conteúdos jurídicos.</p><div className="not-found-actions"><Link className="button button-dark" href="/">Voltar ao início <ArrowIcon /></Link><Link className="button button-outline" href="/blog/">Pesquisar conteúdos</Link></div></div></main>;
}
