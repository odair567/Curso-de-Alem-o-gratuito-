import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google GenAI client lazily or when available
let aiClient: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// 1. Herr Deutsch AI Chat Endpoint
app.post("/api/teacher-chat", async (req, res) => {
  try {
    const { message, history = [], userLevel = "A1", contextTopic = "Geral" } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Mensagem é obrigatória." });
    }

    const ai = getGenAI();
    if (!ai) {
      // Intelligent local fallback if no API key is provided
      const fallbackResponse = generateLocalTeacherResponse(message, userLevel);
      return res.json(fallbackResponse);
    }

    const systemInstruction = `Você é o "Herr Deutsch AI", um professor amigável, paciente, experiente e altamente didático de alemão focado exclusivamente em alunos brasileiros (falantes de português do Brasil).
O nível atual do aluno é: ${userLevel}. Tópico atual: ${contextTopic}.

Suas diretrizes obrigatórias:
1. Responda com simpatia e clareza.
2. Analise a frase em alemão enviada pelo aluno.
3. Se houver erros gramaticais, ortográficos ou de concordância/casos (Akkusativ, Dativ, gênero der/die/das, ordem das palavras, tempo verbal, etc.):
   - Aponte a correção exata em alemão.
   - Explique o motivo do erro em PORTUGUÊS DO BRASIL de forma simples e encorajadora, destacando armadilhas comuns para brasileiros (ex: falsos amigos, preposições, verbos separáveis, etc.).
4. Dê uma sugestão de como um nativo falaria essa frase de maneira mais natural (Natural German Phrasing).
5. Continue a conversa fazendo uma pergunta curta e relevante em alemão (com tradução entre parênteses para A1/A2 se necessário), mantendo o diálogo engajante.
6. Retorne SEMPRE em formato JSON com o seguinte esquema:
{
  "replyText": "Resposta calorosa do professor em português com a continuação da conversa em alemão",
  "germanReply": "Frase em alemão para o aluno responder ou praticar",
  "hasCorrection": boolean,
  "correction": "Frase corrigida em alemão (ou vazio se estava perfeita)",
  "explanationPt": "Explicação em português detalhando as regras gramaticais e por que foi corrigido (ou elogio se estava correto)",
  "naturalSuggestion": "Sugestão de frase natural e idiomática em alemão",
  "grammarTopicsDetected": ["ex: Akkusativ", "ex: Perfekt com sein"]
}`;

    const formattedHistory = history.slice(-8).map((msg: { sender: string; text: string }) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: [
        ...formattedHistory,
        {
          role: "user",
          parts: [{ text: `Mensagem do aluno: "${message}"` }],
        },
      ],
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

    const rawText = response.text || "{}";
    try {
      const parsed = JSON.parse(rawText);
      return res.json(parsed);
    } catch {
      return res.json({
        replyText: rawText,
        germanReply: "Sehr gut! Machen wir weiter.",
        hasCorrection: false,
        correction: "",
        explanationPt: "",
        naturalSuggestion: "",
        grammarTopicsDetected: [],
      });
    }
  } catch (error: any) {
    console.error("Erro no chat com Herr Deutsch:", error);
    return res.json(generateLocalTeacherResponse(req.body?.message || "", req.body?.userLevel || "A1"));
  }
});

// 2. Pronunciation Evaluation Endpoint
app.post("/api/pronunciation-evaluate", async (req, res) => {
  try {
    const { targetText, spokenText, wordAudioHint } = req.body;
    const ai = getGenAI();

    if (!ai) {
      return res.json(generateLocalPronunciationScore(targetText, spokenText));
    }

    const prompt = `Você é um fonoaudiólogo e professor de fonética alemã especialista em alunos brasileiros.
Texto esperado em alemão: "${targetText}"
Texto reconhecido/falado pelo aluno: "${spokenText || ""}"

Avalie a pronúncia, identifique sons difíceis para brasileiros (como os tremas ä, ö, ü, os sons de "ch" ich-Laut / ach-Laut, "r" gutural, "z" com som de "ts", "w" com som de "v", "v" com som de "f", "st/sp" no início de sílabas).

Retorne SEMPRE um JSON válido:
{
  "score": number (0 a 100),
  "isAccurate": boolean,
  "feedbackPt": "Feedback em português destacando os pontos fortes e o que melhorar no posicionamento da língua/lábios",
  "phoneticTips": ["dica fonética 1", "dica fonética 2"],
  "highlightedSounds": "fonemas para praticar"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.3,
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json(parsed);
  } catch (err) {
    return res.json(generateLocalPronunciationScore(req.body?.targetText || "", req.body?.spokenText || ""));
  }
});

// 3. Grammar Explanation Endpoint
app.post("/api/explain-grammar", async (req, res) => {
  try {
    const { topic, userLevel = "A1", question } = req.body;
    const ai = getGenAI();

    if (!ai) {
      return res.json({
        title: topic || "Tópico de Gramática",
        summaryPt: `Explicação essencial de ${topic} para o nível ${userLevel}.`,
        rules: [
          "Identifique o sujeito e a posição do verbo (em orações principais, o verbo conjugado fica na posição 2).",
          "Atenção aos artigos definidos (der, die, das) e indefinidos (ein, eine, ein).",
        ],
        examples: [
          { german: "Ich lerne jeden Tag Deutsch.", portuguese: "Eu aprendo alemão todos os dias." },
          { german: "Der Kaffee ist sehr lecker.", portuguese: "O café é muito gostoso." },
        ],
        brazilianPitfall: "Lembre-se de que no alemão os substantivos sempre começam com letra MAIÚSCULA.",
      });
    }

    const prompt = `Explique o tópico gramatical de alemão "${topic}" para um estudante brasileiro de nível ${userLevel}. Dúvida específica do aluno: "${question || "Explicação geral e regras práticas"}".
Retorne um JSON:
{
  "title": "${topic}",
  "summaryPt": "Resumo simples, claro e direto em português",
  "rules": ["regra 1 com exemplo", "regra 2 com exemplo", "regra 3 com exemplo"],
  "examples": [
    {"german": "frase em alemão", "portuguese": "tradução em português", "note": "observação gramatical"}
  ],
  "brazilianPitfall": "Dica de ouro para brasileiros não errarem este conceito"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: { responseMimeType: "application/json" },
    });

    return res.json(JSON.parse(response.text || "{}"));
  } catch (err) {
    return res.status(500).json({ error: "Erro ao gerar explicação gramatical." });
  }
});

// 4. Adaptive Exercise Generator based on Weak Areas
app.post("/api/adaptive-exercises", async (req, res) => {
  try {
    const { weakArea, level = "A1", count = 3 } = req.body;
    const ai = getGenAI();

    if (!ai) {
      return res.json({
        exercises: [
          {
            id: `adapt_${Date.now()}_1`,
            type: "multiple_choice",
            question: `Qual é a forma correta para praticar ${weakArea}?`,
            germanContext: "Ich kaufe ___ Apfel.",
            options: ["den", "der", "dem", "die"],
            correctAnswer: "den",
            explanation: "No Akkusativ masculino (der Apfel), o artigo se transforma em 'den'.",
            category: weakArea,
            xp: 15,
          },
        ],
      });
    }

    const prompt = `Gere ${count} exercícios práticos e inteligentes de alemão para um aluno brasileiro de nível ${level} focado no ponto fraco: "${weakArea}".
Tipos possíveis de exercício: "multiple_choice", "fill_blank", "select_article", "translate_pt_de", "order_words".

Retorne JSON no formato:
{
  "exercises": [
    {
      "id": "string único",
      "type": "tipo_de_exercício",
      "instruction": "Instrução clara em português",
      "question": "Pergunta ou frase para completar",
      "germanContext": "Frase em alemão de apoio",
      "options": ["opção 1", "opção 2", "opção 3", "opção 4"],
      "correctAnswer": "resposta correta",
      "explanation": "Explicação detalhada em português do porquê desta ser a resposta correta",
      "category": "${weakArea}",
      "xp": 15
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: { responseMimeType: "application/json" },
    });

    return res.json(JSON.parse(response.text || "{}"));
  } catch (err) {
    return res.json({ exercises: [] });
  }
});

// Helpers for smart local fallbacks
function generateLocalTeacherResponse(message: string, level: string) {
  const msgLower = message.toLowerCase();
  let correction = "";
  let explanationPt = "";
  let naturalSuggestion = "";
  let hasCorrection = false;
  let replyText = "Excelente tentativa! Estou muito feliz com a sua dedicação aos estudos de alemão.";
  let germanReply = "Wie kann ich dir heute noch helfen? (Como posso te ajudar mais hoje?)";

  if (msgLower.includes("ich habe") && msgLower.includes("gegangen")) {
    hasCorrection = true;
    correction = message.replace(/habe/i, "bin");
    explanationPt = "No alemão, verbos que indicam movimento ou mudança de estado (como 'gehen', 'fahren', 'kommen') usam o verbo auxiliar 'sein' (ich bin) no tempo verbal Perfekt, e não 'haben'.";
    naturalSuggestion = "Ich bin gestern in den Supermarkt gegangen.";
    replyText = "Muito bom! Preste apenas atenção no verbo auxiliar do Perfekt:";
    germanReply = "Wohin möchtest du heute gehen? (Aonde você gostaria de ir hoje?)";
  } else if (msgLower.includes("guten tag") || msgLower.includes("hallo") || msgLower.includes("servus") || msgLower.includes("moin")) {
    replyText = "Hallo! Schön, dass du da bist! Que alegria ter você aqui para praticar alemão.";
    germanReply = "Wie geht es dir heute? (Como você está hoje?)";
    explanationPt = "Sua saudação foi excelente e muito natural!";
  } else if (msgLower.includes("ich bin gut") || msgLower.includes("ich bin gut danke")) {
    hasCorrection = true;
    correction = "Mir geht es gut, danke!";
    explanationPt = "Em alemão não dizemos 'Ich bin gut' para responder 'estou bem' (isso soa como 'eu sou bom em algo'). Usamos a expressão com o pronome dativo: 'Mir geht es gut' (literalmente: 'a mim vai bem').";
    naturalSuggestion = "Mir geht's super, danke! Und dir?";
    replyText = "Um clássico que todo brasileiro confunde no início! Veja a regrinha:";
    germanReply = "Was hast du heute Schönes gemacht? (O que você fez de bom hoje?)";
  } else {
    replyText = `Entendi sua mensagem: "${message}". Você está no caminho certo para dominar o nível ${level}!`;
    germanReply = "Möchtest du einen Beispielsatz oder einen Dialog üben? (Quer praticar uma frase de exemplo ou um diálogo?)";
    explanationPt = "Continue praticando a estrutura das frases com o verbo sempre na segunda posição nas orações principais.";
  }

  return {
    replyText,
    germanReply,
    hasCorrection,
    correction,
    explanationPt,
    naturalSuggestion,
    grammarTopicsDetected: ["Präsens / Estrutura de Frases"],
  };
}

function generateLocalPronunciationScore(targetText: string, spokenText: string) {
  if (!spokenText) {
    return {
      score: 50,
      isAccurate: false,
      feedbackPt: "Não conseguimos ouvir claramente o áudio. Tente falar novamente mais próximo ao microfone com calma.",
      phoneticTips: ["Fale de forma ritmada e clara", "Articule bem as vogais"],
      highlightedSounds: targetText,
    };
  }

  const cleanTarget = targetText.toLowerCase().replace(/[^a-zäöüß0-9]/g, "");
  const cleanSpoken = spokenText.toLowerCase().replace(/[^a-zäöüß0-9]/g, "");

  let score = 75;
  if (cleanTarget === cleanSpoken) {
    score = 98;
  } else if (cleanTarget.includes(cleanSpoken) || cleanSpoken.includes(cleanTarget)) {
    score = 88;
  } else {
    // calculate simple similarity
    let matches = 0;
    for (let i = 0; i < Math.min(cleanTarget.length, cleanSpoken.length); i++) {
      if (cleanTarget[i] === cleanSpoken[i]) matches++;
    }
    score = Math.max(40, Math.min(95, Math.round((matches / Math.max(cleanTarget.length, 1)) * 100)));
  }

  return {
    score,
    isAccurate: score >= 75,
    feedbackPt: score >= 85
      ? "Excelente pronúncia! Seu sotaque está muito claro e próximo ao alemão padrão (Hochdeutsch)."
      : "Muito bom esforço! Lembre-se de posicionar a boca de forma mais fechada e arredondada para os sons de tremas (ä, ö, ü).",
    phoneticTips: [
      "No alemão, a letra 'W' tem som de 'V' em português (ex: Wasser = Vasser).",
      "A letra 'Z' tem som de 'TS' (ex: Zug = Tsug).",
      "O 'ST' no começo de palavras soa como 'SHT' (ex: Straße = Shtrasse).",
    ],
    highlightedSounds: targetText,
  };
}

// Vite middleware in development vs static serving in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Deutsch Fácil AI server running on http://localhost:${PORT}`);
  });
}

startServer();
