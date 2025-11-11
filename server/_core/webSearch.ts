/**
 * Web Search Integration
 * Permite que a IA busque dados atualizados na internet
 */

import { callDataApi } from "./dataApi";

export type SearchResult = {
  title: string;
  url: string;
  snippet: string;
};

/**
 * Buscar na internet usando a API de dados da Manus
 * @param query - Termo de busca
 * @param limit - Número máximo de resultados (padrão: 5)
 * @returns Array de resultados da busca
 */
export async function searchWeb(
  query: string,
  limit: number = 5
): Promise<SearchResult[]> {
  try {
    const response = (await callDataApi("Google/search", {
      query: {
        q: query,
        num: limit,
      },
    })) as any;

    if (!response || !response.results) {
      return [];
    }

    return response.results
      .slice(0, limit)
      .map((result: any) => ({
        title: result.title || "",
        url: result.link || "",
        snippet: result.snippet || "",
      }))
      .filter((r: SearchResult) => r.title && r.snippet);
  } catch (error) {
    console.error("[Web Search] Erro ao buscar:", error);
    return [];
  }
}

/**
 * Formatar resultados de busca para incluir no prompt da IA
 * @param results - Resultados da busca
 * @returns String formatada para incluir no prompt
 */
export function formatSearchResults(results: SearchResult[]): string {
  if (results.length === 0) {
    return "";
  }

  return (
    "Aqui estão informações recentes encontradas na internet:\n" +
    results
      .map((r, i) => `${i + 1}. **${r.title}**: ${r.snippet}\n   Fonte: ${r.url}`)
      .join("\n")
  );
}

/**
 * Detectar se uma pergunta precisa de busca na internet
 * @param message - Mensagem do usuário
 * @returns true se deve fazer busca
 */
export function shouldSearchWeb(message: string): boolean {
  const searchKeywords = [
    // Tempo
    "hoje", "agora", "recente", "recentemente", "último",
    // Notícias
    "notícia", "notícias", "aconteceu", "acontecendo",
    // Atualidades
    "atual", "atualidade", "atualizado", "novo",
    // Preços
    "preço", "quanto custa", "custa", "valor",
    // Clima
    "clima", "tempo", "temperatura", "previsão",
    // Eventos
    "evento", "jogo", "partida", "resultado",
    // Dados em tempo real
    "bolsa", "ações", "criptomoeda", "bitcoin", "dólar",
    // Localização
    "onde", "localização", "endereço",
    // Quando
    "quando", "data", "horário", "que horas",
    // Quem
    "quem", "pessoa", "celebridade",
    // Busca geral
    "pesquisa", "procura", "encontra", "busca",
  ];

  const lowerMessage = message.toLowerCase();
  return searchKeywords.some((keyword) => lowerMessage.includes(keyword));
}

/**
 * Executar busca com tratamento de erros
 * @param query - Termo de busca
 * @returns Contexto formatado para incluir no prompt
 */
export async function getWebContext(query: string): Promise<string> {
  try {
    const results = await searchWeb(query, 3);
    return formatSearchResults(results);
  } catch (error) {
    console.error("[Web Context] Erro:", error);
    return "";
  }
}
