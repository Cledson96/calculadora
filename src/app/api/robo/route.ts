import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyDUEAyPDTCQUKLZMUC-3ZI7ov7UfMzk7YM";
const genAi = new GoogleGenerativeAI(apiKey);

export async function POST(request: Request) {
  const {
    tipo,
    tribunais,
    valor,
    fase,
    data,
    recurso,
    complexidade,
    razaocomplexidade,
    precedentes,
    razaoprecedente,
    acoes,
  } = await request.json();

  try {
    const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Com base em dados históricos de processos ${tipo} semelhantes no ${tribunais}, qual é a estimativa de prazo mínimo e máximo para o recebimento dos honorários? 

    **Detalhes do Processo:**
    * Tipo: ${tipo}
    * Tribunal: ${tribunais}
    * Valor da causa: R$ ${valor}
    * Fase atual: ${fase}
    * Data de distribuição: ${data}
    * Recursos: ${recurso}
    
    **Outras informações relevantes:**
    * Complexidade do caso: ${complexidade} (${
      razaocomplexidade || "não especificada"
    })
    * Existência de precedentes: ${precedentes} (${
      razaoprecedente || "não especificada"
    })
    * Ações dos advogados: ${acoes}
    
    Por favor, forneça a estimativa com base nos dados históricos mais relevantes, considerando fatores como a complexidade do caso, precedentes judiciais, e a carga de trabalho atual do tribunal. Responda no seguinte formato:
    
    **Resposta:**
    Prazo mínimo: [resposta em meses] 
    Prazo máximo: [resposta em meses] 
    Justificativa: [explique os fatores que influenciam esses prazos] 
    Observações: [qualquer informação adicional relevante]`;
    console.log("Prompt:", prompt);
    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    console.log("Dados extraídos:", text);

    const tempoMinimoMatch = text.match(
      /\*\*Prazo mínimo:\*\*\s*(\d+)\s*meses/i
    );
    const tempoMaximoMatch = text.match(
      /\*\*Prazo máximo:\*\*\s*(\d+)\s*meses/i
    );
    const justificativaMatch = text.match(
      /\*\*Justificativa:\*\*\n([\s\S]*?)\n\n/i
    );

    const observacaoMatch = text.match(
      /\*\*Observações:\*\*\n([\s\S]*?)(?=\n\n|\*\*|$)/i
    );

    const response = {
      tempo_minimo: tempoMinimoMatch ? parseInt(tempoMinimoMatch[1], 10) : null,
      tempo_maximo: tempoMaximoMatch ? parseInt(tempoMaximoMatch[1], 10) : null,
      justificativa: justificativaMatch ? justificativaMatch[1].trim() : null,
      observacao: observacaoMatch ? observacaoMatch[1].trim() : null,
    };

    console.log("Dados extraídos:", response);

    return NextResponse.json(
      {
        message: "Dados buscados com sucesso",
        success: true,
        data: response,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao processar a requisição:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: error,
        success: false,
      },
      { status: 500 }
    );
  }
}
