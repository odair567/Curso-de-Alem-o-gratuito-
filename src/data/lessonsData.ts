import { CourseModule } from '../types';

export const initialCourseModulesData: CourseModule[] = [
  // ===================== A1 - INICIANTE =====================
  {
    id: 'mod_a1_1',
    level: 'A1',
    order: 1,
    titlePt: 'Módulo 1: Primeiros Passos & Fundamentos',
    titleDe: 'Modul 1: Erste Schritte & Grundlagen',
    descriptionPt: 'Alfabeto fonético, saudações formais e informais, apresentação pessoal, números e países.',
    iconName: 'Sparkles',
    lessons: [
      {
        id: 'les_a1_1_alfabeto',
        moduleId: 'mod_a1_1',
        level: 'A1',
        order: 1,
        titlePt: '1. Alfabeto, Pronúncia & Tremas (Ä, Ö, Ü, ß)',
        titleDe: 'Das Alphabet und die Aussprache',
        descriptionPt: 'Domine a pronúncia das letras alemãs, os tremas e a letra especial Eszett (ß).',
        durationMinutes: 10,
        xpReward: 35,
        grammarFocus: 'Fonética alemã: Ä [é/ê], Ö [boca de o dizendo ê], Ü [boca de u dizendo i], ß [som de ss duplo]',
        theoryExplanationPt: `O alfabeto alemão possui as mesmas 26 letras do português, além de 4 caracteres especiais fundamentais:
1. Ä / ä (A-Umlaut): Som entre o 'é' e o 'ê' aberto (ex: Mädchen).
2. Ö / ö (O-Umlaut): Faça a boca redonda de 'O' e tente pronunciar o som de 'Ê'.
3. Ü / ü (U-Umlaut): Faça biquinho de 'U' e tente pronunciar o som de 'I' (ex: über, Tschüss).
4. ß (Eszett / scharfes S): Tem som de 'ss' forte e nunca inicia palavras (ex: Straße, heißen).

Dicas de fonética para brasileiros:
- A letra 'W' em alemão tem som de 'V' em português (Wasser soa como Vasser).
- A letra 'V' tem som de 'F' (Vater soa como Fater).
- A letra 'Z' soa como 'TS' (Zug soa como Tsug).
- O 'J' soa como 'I' (Ja soa como Ia).
- O 'EI' soa como 'AI' (mein soa como main).
- O 'IE' soa como 'I' longo (wie soa como vii).`,
        culturalNotePt: 'Na Alemanha, pronunciar o nome das pessoas com o som correto demonstra respeito imediato.',
        vocabulary: [
          { german: 'das Alphabet', article: 'das', portuguese: 'o alfabeto', example: 'Das Alphabet hat 26 Buchstaben.', examplePt: 'O alfabeto tem 26 letras.' },
          { german: 'die Straße', article: 'die', plural: 'die Straßen', portuguese: 'a rua', example: 'Ich wohne in dieser Straße.', examplePt: 'Eu moro nesta rua.' },
          { german: 'das Mädchen', article: 'das', plural: 'die Mädchen', portuguese: 'a menina', example: 'Das Mädchen lernt Deutsch.', examplePt: 'A menina aprende alemão.' },
          { german: 'das Wasser', article: 'das', portuguese: 'a água', example: 'Ein Glas Wasser, bitte.', examplePt: 'Um copo de água, por favor.' },
        ],
        examples: [
          { german: 'Guten Morgen! Mein Name ist Maria.', portuguese: 'Bom dia! Meu nome é Maria.' },
          { german: 'Wie schreibt man das?', portuguese: 'Como se soletra / escreve isso?' },
          { german: 'Ich trinke frisches Wasser.', portuguese: 'Eu bebo água fresca.' },
        ],
        practiceExercises: [
          {
            id: 'ex_a1_1_1',
            type: 'multiple_choice',
            level: 'A1',
            category: 'Fonética',
            instructionPt: 'Como se pronuncia a letra "W" em palavras alemãs como "Wasser"?',
            question: 'A letra "W" em alemão tem som de:',
            options: ['Som de "V" em português', 'Som de "U"', 'Som de "W" inglês', 'Som mudo'],
            correctAnswer: 'Som de "V" em português',
            explanationPt: 'Exato! Em alemão, "W" tem som de "V" (Wasser = Vasser, Wohnen = Vônen).',
            xp: 15,
          },
          {
            id: 'ex_a1_1_2',
            type: 'select_article',
            level: 'A1',
            category: 'Artigos',
            instructionPt: 'Substantivos com sufixo diminutivo -chen (como Mädchen) têm qual gênero?',
            question: '___ Mädchen',
            options: ['das', 'die', 'der'],
            correctAnswer: 'das',
            explanationPt: 'Todo substantivo com sufixo -chen é obrigatoriamente NEUTRO (das Mädchen).',
            xp: 15,
          },
        ],
        miniTestExercises: [
          {
            id: 'test_a1_1_1',
            type: 'true_false',
            level: 'A1',
            category: 'Ortografia',
            instructionPt: 'Avalie a afirmação sobre as regras do alemão:',
            question: 'Em alemão, TODOS os substantivos devem ser escritos com a primeira letra MAIÚSCULA.',
            options: ['Verdadeiro (Richtig)', 'Falso (Falsch)'],
            correctAnswer: 'Verdadeiro (Richtig)',
            explanationPt: 'Correto! Essa é uma das regras mais fundamentais e obrigatórias da língua alemã.',
            xp: 20,
          },
        ],
      },
      {
        id: 'les_a1_2_cumprimentos',
        moduleId: 'mod_a1_1',
        level: 'A1',
        order: 2,
        titlePt: '2. Cumprimentos & Despedidas (Formal vs. Informal)',
        titleDe: 'Begrüßung und Verabschiedung',
        descriptionPt: 'Aprenda a cumprimentar em diferentes horas do dia e a diferença entre Du (informal) e Sie (formal).',
        durationMinutes: 10,
        xpReward: 35,
        grammarFocus: 'Distinção formal (Sie) vs informal (du)',
        theoryExplanationPt: `Na cultura alemã, a distinção entre formal e informal é muito respeitada:
1. Informal (Du - amigos, família, crianças e colegas próximos):
   - Hallo! (Oi / Olá)
   - Tschüss! (Tchau)
   - Bis später! (Até mais tarde) / Bis morgen! (Até amanhã)
   - Wie geht's? (Como vai?)

2. Formal (Sie - médicos, prefeitura, lojas, chefes, pessoas desconhecidas):
   - Guten Morgen! (Bom dia - até ~10h/11h)
   - Guten Tag! (Bom dia / Boa tarde - ao longo do dia)
   - Guten Abend! (Boa noite - ao chegar/encontrar alguém à noite)
   - Gute Nacht! (Boa noite - apenas ao ir dormir / despedida final)
   - Auf Wiedersehen! (Até logo / Adeus formal)
   - Wie geht es Ihnen? (Como vai o senhor / a senhora?)`,
        culturalNotePt: 'Nunca use "Du" com funcionários do Bürgeramt ou médicos a menos que eles expressamente ofereçam o "Du".',
        vocabulary: [
          { german: 'Guten Morgen', portuguese: 'Bom dia (manhã)' },
          { german: 'Guten Tag', portuguese: 'Bom dia / Boa tarde' },
          { german: 'Guten Abend', portuguese: 'Boa noite (chegada)' },
          { german: 'Gute Nacht', portuguese: 'Boa noite (ao ir dormir)' },
          { german: 'Auf Wiedersehen', portuguese: 'Até logo (formal)' },
          { german: 'Tschüss', portuguese: 'Tchau (informal)' },
        ],
        examples: [
          { german: 'Guten Tag, Frau Meier! Wie geht es Ihnen?', portuguese: 'Bom dia, Sra. Meier! Como vai a senhora?' },
          { german: 'Hallo Lukas! Wie geht es dir?', portuguese: 'Oi Lukas! Como vai você?' },
          { german: 'Danke, mir geht es sehr gut!', portuguese: 'Obrigado, eu vou muito bem!' },
        ],
        practiceExercises: [
          {
            id: 'ex_a1_2_1',
            type: 'multiple_choice',
            level: 'A1',
            category: 'Cumprimentos',
            instructionPt: 'Qual despedida é mais apropriada em uma reunião formal de negócios?',
            question: 'Despedida formal ao sair do escritório:',
            options: ['Auf Wiedersehen!', 'Tschüssi!', 'Servus!', 'Tschau!'],
            correctAnswer: 'Auf Wiedersehen!',
            explanationPt: '"Auf Wiedersehen" é a forma padrão e educada em ambientes profissionais.',
            xp: 15,
          },
          {
            id: 'ex_a1_2_2',
            type: 'translate_pt_de',
            level: 'A1',
            category: 'Cumprimentos',
            instructionPt: 'Como se diz "Boa noite" ao se despedir para ir dormir?',
            question: 'Boa noite (ao ir para a cama):',
            options: ['Gute Nacht!', 'Guten Abend!', 'Guten Tag!', 'Schlaf gut!'],
            correctAnswer: 'Gute Nacht!',
            explanationPt: '"Gute Nacht" é usado exclusivamente quando você ou a outra pessoa está indo dormir.',
            xp: 15,
          },
        ],
        miniTestExercises: [
          {
            id: 'test_a1_2_1',
            type: 'fill_blank',
            level: 'A1',
            category: 'Cumprimentos',
            instructionPt: 'Complete a saudação formal para perguntar "Como vai a senhora?":',
            question: 'Wie geht es ___ ?',
            options: ['Ihnen', 'dir', 'dich', 'Sie'],
            correctAnswer: 'Ihnen',
            explanationPt: 'Na forma formal (Sie), o pronome dativo para a expressão é "Ihnen": Wie geht es Ihnen?',
            xp: 20,
          },
        ],
      },
      {
        id: 'les_a1_3_apresentacao',
        moduleId: 'mod_a1_1',
        level: 'A1',
        order: 3,
        titlePt: '3. Apresentação Pessoal & Verbos Heißen, Sein, Wohnen',
        titleDe: 'Sich vorstellen & Grundverben',
        descriptionPt: 'Dizer seu nome, de onde vem, onde mora e sua profissão.',
        durationMinutes: 12,
        xpReward: 40,
        grammarFocus: 'Conjugação de heißen, sein, kommen, wohnen no singular',
        theoryExplanationPt: `Para se apresentar em alemão, usamos as seguintes estruturas clássicas:
1. Nome:
   - "Ich heiße Pedro." (Eu me chamo Pedro.)
   - "Mein Name ist Pedro." (Meu nome é Pedro.)
   - "Ich bin Pedro." (Eu sou o Pedro.)

2. Origem (País/Cidade):
   - "Ich komme aus Brasilien." (Eu venho do Brasil / Sou do Brasil.)
   - "Ich komme aus São Paulo." (Eu sou de São Paulo.)

3. Onde mora:
   - "Ich wohne in Berlin." (Eu moro em Berlim.)
   - "Ich lebe in Deutschland." (Eu vivo na Alemanha.)

4. Idiomas:
   - "Ich spreche Portugiesisch, Englisch und ein bisschen Deutsch." (Falo português, inglês e um pouco de alemão.)`,
        culturalNotePt: 'Os alemães adoram quando estrangeiros se esforçam para dizer "Ich lerne Deutsch" (Estou aprendendo alemão).',
        vocabulary: [
          { german: 'heißen', portuguese: 'chamar-se', example: 'Ich heiße Gabriel.' },
          { german: 'kommen aus', portuguese: 'vir de / ser de', example: 'Ich komme aus Brasilien.' },
          { german: 'wohnen in', portuguese: 'morar em', example: 'Ich wohne in Frankfurt.' },
          { german: 'sprechen', portuguese: 'falar', example: 'Ich spreche Portugiesisch.' },
        ],
        examples: [
          { german: 'Hallo! Ich bin Thiago und ich komme aus Brasilien.', portuguese: 'Olá! Eu sou Thiago e sou do Brasil.' },
          { german: 'Wo wohnst du jetzt? - Ich wohne in München.', portuguese: 'Onde você mora agora? - Eu moro em Munique.' },
        ],
        practiceExercises: [
          {
            id: 'ex_a1_3_1',
            type: 'fill_blank',
            level: 'A1',
            category: 'Apresentação',
            instructionPt: 'Complete com a preposição correta de origem ("vir de"):',
            question: 'Ich komme ___ Brasilien.',
            options: ['aus', 'in', 'nach', 'von'],
            correctAnswer: 'aus',
            explanationPt: 'Para indicar país ou cidade de origem, usamos a preposição "aus" (aus Brasilien).',
            xp: 15,
          },
          {
            id: 'ex_a1_3_2',
            type: 'order_words',
            level: 'A1',
            category: 'Estrutura da Frase',
            instructionPt: 'Ordene as palavras para formar a apresentação:',
            question: 'Monte a frase correta:',
            wordTiles: ['Ich', 'wohne', 'in', 'Deutschland.'],
            correctAnswer: 'Ich wohne in Deutschland.',
            explanationPt: 'O verbo "wohne" fica na 2ª posição: Sujeito (Ich) + Verbo (wohne) + Local (in Deutschland).',
            xp: 20,
          },
        ],
        miniTestExercises: [
          {
            id: 'test_a1_3_1',
            type: 'multiple_choice',
            level: 'A1',
            category: 'Verbos',
            instructionPt: 'Qual é a conjugação correta do verbo "kommen" para "du"?',
            question: 'Woher ___ du?',
            options: ['kommst', 'kommt', 'komme', 'kommen'],
            correctAnswer: 'kommst',
            explanationPt: 'Para a 2ª pessoa do singular (du), adicionamos a terminação -st: du kommst.',
            xp: 20,
          },
        ],
      },
      {
        id: 'les_a1_4_numeros_paises',
        moduleId: 'mod_a1_1',
        level: 'A1',
        order: 4,
        titlePt: '4. Números (0 a 100), Países, Nacionalidades & Cores',
        titleDe: 'Zahlen, Länder, Nationalitäten und Farben',
        descriptionPt: 'Como contar, falar números de telefone, preços e o peculiar sistema dos números alemães (unidades antes das dezenas!).',
        durationMinutes: 15,
        xpReward: 40,
        grammarFocus: 'Formação dos números compostos com "und" (ex: 21 = einundzwanzig)',
        theoryExplanationPt: `Números de 0 a 12 (básicos para memorizar):
0: null, 1: eins, 2: zwei, 3: drei, 4: vier, 5: fünf, 6: sechs, 7: sieben, 8: acht, 9: neun, 10: zehn, 11: elf, 12: zwölf.

Atenção especial para números de 21 a 99:
Em alemão, lemos PRIMEIRO a unidade, depois a palavra "und" (e), e por fim a dezena!
- 21 = ein-und-zwanzig (literalmente: um-e-vinte)
- 35 = fünf-und-dreißig (cinco-e-trinta)
- 48 = acht-und-vierzig (oito-e-quarenta)
- 99 = neun-und-neunzig (nove-e-noventa)

Cores principais:
- rot (vermelho), blau (azul), gelb (amarelo), grün (verde), schwarz (preto), weiß (branco), grau (cinza).`,
        culturalNotePt: 'Ao passar número de telefone ou preços em lojas, os alemães costumam falar os números de 2 em 2 dígitos (ex: 25 -> fünfundzwanzig).',
        vocabulary: [
          { german: 'eins, zwei, drei', portuguese: 'um, dois, três' },
          { german: 'zehn, zwanzig, dreißig', portuguese: 'dez, vinte, trinta' },
          { german: 'hundert', portuguese: 'cem / cento' },
          { german: 'die Farbe', article: 'die', plural: 'die Farben', portuguese: 'a cor' },
        ],
        examples: [
          { german: 'Das Zimmer kostet 450 (vierhundertfünfzig) Euro.', portuguese: 'O quarto custa 450 euros.' },
          { german: 'Meine Telefonnummer ist 0176 24 58 90.', portuguese: 'Meu telefone é 0176 24 58 90.' },
        ],
        practiceExercises: [
          {
            id: 'ex_a1_4_1',
            type: 'multiple_choice',
            level: 'A1',
            category: 'Números',
            instructionPt: 'Como se diz o número 34 em alemão?',
            question: 'O número 34 é falado como:',
            options: ['vierunddreißig', 'dreißigundvier', 'dreivier', 'vierzigdrei'],
            correctAnswer: 'vierunddreißig',
            explanationPt: 'Unidade primeiro (vier), depois "und", depois a dezena (dreißig): vierunddreißig.',
            xp: 15,
          },
        ],
        miniTestExercises: [
          {
            id: 'test_a1_4_1',
            type: 'translate_de_pt',
            level: 'A1',
            category: 'Números',
            instructionPt: 'Traduza o número "einundzwanzig":',
            question: 'einundzwanzig = ?',
            options: ['21', '12', '31', '201'],
            correctAnswer: '21',
            explanationPt: 'Ein (1) + und (e) + zwanzig (20) = 21.',
            xp: 20,
          },
        ],
      },
    ],
  },

  // ===================== A1 - MÓDULO 2 =====================
  {
    id: 'mod_a1_2',
    level: 'A1',
    order: 2,
    titlePt: 'Módulo 2: Vida Pessoal, Casa & Comida',
    titleDe: 'Modul 2: Familie, Wohnung & Essen',
    descriptionPt: 'Membros da família, partes da casa, móveis, supermercado, comidas e compras cotidianas.',
    iconName: 'Home',
    lessons: [
      {
        id: 'les_a1_5_familia',
        moduleId: 'mod_a1_2',
        level: 'A1',
        order: 1,
        titlePt: '5. Família & Pronomes Possessivos (mein / dein)',
        titleDe: 'Die Familie und Possessivpronomen',
        descriptionPt: 'Falar sobre pais, filhos, irmãos e usar os pronomes meu/minha (mein/meine) e seu/sua (dein/deine).',
        durationMinutes: 12,
        xpReward: 40,
        grammarFocus: 'Pronomes possessivos no Nominativ: mein (masc/neutro), meine (fem/plural)',
        theoryExplanationPt: `Vocabulário da família e seus artigos:
- der Vater (o pai), die Mutter (a mãe), die Eltern (os pais - plural)
- der Sohn (o filho), die Tochter (a filha), die Kinder (os filhos / crianças)
- der Bruder (o irmão), die Schwester (a irmã), die Geschwister (os irmãos em geral)
- der Mann (o marido / homem), die Frau (a esposa / mulher)

Regra dos Possessivos no Nominativ:
- Para masculino e neutro: mein / dein (ex: mein Vater, mein Kind).
- Para feminino e plural: adicionamos a terminação -e: meinE / deinE (ex: meine Mutter, meine Kinder).`,
        culturalNotePt: 'Na Alemanha, "Geschwister" é uma palavra muito útil que abrange tanto irmãos quanto irmãs no plural.',
        vocabulary: [
          { german: 'der Vater', article: 'der', plural: 'die Väter', portuguese: 'o pai' },
          { german: 'die Mutter', article: 'die', plural: 'die Mütter', portuguese: 'a mãe' },
          { german: 'die Eltern', article: 'die', portuguese: 'os pais' },
          { german: 'das Kind', article: 'das', plural: 'die Kinder', portuguese: 'a criança / filho' },
        ],
        examples: [
          { german: 'Das ist mein Bruder und das ist meine Schwester.', portuguese: 'Este é meu irmão e esta é minha irmã.' },
          { german: 'Hast du Geschwister? - Ja, zwei Brüder.', portuguese: 'Você tem irmãos? - Sim, dois irmãos.' },
        ],
        practiceExercises: [
          {
            id: 'ex_a1_5_1',
            type: 'fill_blank',
            level: 'A1',
            category: 'Possessivos',
            instructionPt: 'Complete com a forma feminina de "meu/minha":',
            question: 'Das ist ___ Mutter.',
            options: ['meine', 'mein', 'meinen', 'meinem'],
            correctAnswer: 'meine',
            explanationPt: 'Mutter é feminino (die Mutter), portanto usamos "meine".',
            xp: 15,
          },
        ],
        miniTestExercises: [
          {
            id: 'test_a1_5_1',
            type: 'multiple_choice',
            level: 'A1',
            category: 'Família',
            instructionPt: 'Como se diz "meu pai" em alemão?',
            question: 'Meu pai = ?',
            options: ['mein Vater', 'meine Vater', 'meinen Vater', 'mein Väter'],
            correctAnswer: 'mein Vater',
            explanationPt: 'Vater é masculino (der Vater) no Nominativ: mein Vater.',
            xp: 20,
          },
        ],
      },
      {
        id: 'les_a1_6_comida_compras',
        moduleId: 'mod_a1_2',
        level: 'A1',
        order: 2,
        titlePt: '6. Comidas, Bebidas & No Supermercado',
        titleDe: 'Essen, Trinken und Einkaufen',
        descriptionPt: 'Alimentos essenciais, fazer a lista de compras e pedir itens com educação.',
        durationMinutes: 15,
        xpReward: 45,
        grammarFocus: 'Verbos essen (irregular du isst), trinken, möchten e a palavra gern',
        theoryExplanationPt: `Alimentos do dia a dia:
- der Apfel (a maçã), der Käse (o queijo), der Kaffee (o café), der Reis (o arroz)
- die Banane (a banana), die Milch (o leite), die Butter (a manteiga), die Kartoffel (a batata)
- das Brot (o pão), das Fleisch (a carne), das Ei (o ovo), das Wasser (a água)

Expressando gostos com GERN:
Em alemão, não usamos um verbo para dizer "eu gosto de fazer algo". Colocamos o advérbio GERN após o verbo!
- "Ich trinke gern Kaffee." (Eu gosto de beber café.)
- "Ich esse gern Obst." (Eu gosto de comer frutas.)
- "Ich trinke lieber Tee." (Eu prefiro beber chá - comparativo gern -> lieber).`,
        culturalNotePt: 'Na Alemanha, água mineral com gás ("mit Kohlensäure" ou "Sprudel") é o padrão. Se quiser sem gás, peça "stilles Wasser" ou "ohne Kohlensäure".',
        vocabulary: [
          { german: 'das Brot', article: 'das', plural: 'die Brote', portuguese: 'o pão' },
          { german: 'der Käse', article: 'der', portuguese: 'o queijo' },
          { german: 'die Milch', article: 'die', portuguese: 'o leite' },
          { german: 'das Wasser', article: 'das', portuguese: 'a água' },
        ],
        examples: [
          { german: 'Ich esse gern deutsches Brot mit Käse.', portuguese: 'Eu gosto de comer pão alemão com queijo.' },
          { german: 'Was möchten Sie trinken? - Ein stilles Wasser, bitte.', portuguese: 'O que o senhor gostaria de beber? - Uma água sem gás, por favor.' },
        ],
        practiceExercises: [
          {
            id: 'ex_a1_6_1',
            type: 'multiple_choice',
            level: 'A1',
            category: 'Gostos & Comida',
            instructionPt: 'Como expressar "Eu gosto de beber café" em alemão?',
            question: 'Eu gosto de beber café:',
            options: ['Ich trinke gern Kaffee.', 'Ich mag zu trinken Kaffee.', 'Ich trinke mit Liebe Kaffee.', 'Kaffee trinke ich gut.'],
            correctAnswer: 'Ich trinke gern Kaffee.',
            explanationPt: 'A forma mais natural e idiomática em alemão usa o advérbio "gern" após o verbo conjugado: Ich trinke gern Kaffee.',
            xp: 20,
          },
        ],
        miniTestExercises: [
          {
            id: 'test_a1_6_1',
            type: 'select_verb',
            level: 'A1',
            category: 'Verbos Irregulares',
            instructionPt: 'Conjugue o verbo irregular "essen" (comer) para "du":',
            question: 'Was ___ du zum Frühstück?',
            options: ['isst', 'esst', 'esse', 'essen'],
            correctAnswer: 'isst',
            explanationPt: 'O verbo essen muda a vogal de "e" para "i" na segunda e terceira pessoa: du isst, er isst.',
            xp: 20,
          },
        ],
      },
    ],
  },

  // ===================== A1 - MÓDULO 3 =====================
  {
    id: 'mod_a1_3',
    level: 'A1',
    order: 3,
    titlePt: 'Módulo 3: Gramática Essencial A1 & Negação',
    titleDe: 'Modul 3: Grammatik & Verneinung',
    descriptionPt: 'Akkusativ básico, negação com nicht vs kein, plural dos substantivos e perguntas (W-Fragen).',
    iconName: 'BookOpen',
    lessons: [
      {
        id: 'les_a1_7_negacao',
        moduleId: 'mod_a1_3',
        level: 'A1',
        order: 1,
        titlePt: '7. Negação: Quando usar NICHT e quando usar KEIN',
        titleDe: 'Verneinung: nicht oder kein?',
        descriptionPt: 'Elimine de vez a dúvida mais comum de brasileiros sobre como negar frases em alemão.',
        durationMinutes: 12,
        xpReward: 40,
        grammarFocus: 'Regra de ouro da negação: kein para substantivos com ein/sem artigo, nicht para o resto',
        theoryExplanationPt: `A regra simples e definitiva para nunca mais errar:

1. Use KEIN / KEINE quando você estiver negando um SUBSTANTIVO que teria o artigo indefinido (ein/eine) ou que está sem artigo nenhum:
   - "Ich habe ein Auto." -> "Ich habe KEIN Auto." (Eu não tenho carro / tenho nenhum carro).
   - "Ich habe Zeit." -> "Ich habe KEINE Zeit." (Não tenho tempo).
   - "Das ist ein Problem." -> "Das ist KEIN Problem." (Não é problema).

2. Use NICHT para negar todo o resto:
   - Verbos: "Ich arbeite NICHT." (Eu não trabalho).
   - Adjetivos: "Das ist NICHT gut." (Isso não é bom).
   - Nomes próprios ou pronomes: "Ich bin NICHT Pedro." (Eu não sou o Pedro).
   - Substantivos com artigo DEFINIDO (der/die/das): "Ich kaufe das Auto NICHT." (Não vou comprar esse carro específico).`,
        culturalNotePt: '"Kein Problem!" (Sem problemas!) é uma das expressões mais faladas no cotidiano alemão.',
        vocabulary: [
          { german: 'nicht', portuguese: 'não (para verbos, adjetivos, advérbios)' },
          { german: 'kein / keine', portuguese: 'nenhum / nenhuma / não (para substantivos)' },
          { german: 'das Problem', article: 'das', plural: 'die Probleme', portuguese: 'o problema' },
          { german: 'die Zeit', article: 'die', portuguese: 'o tempo' },
        ],
        examples: [
          { german: 'Ich habe keine Zeit heute.', portuguese: 'Eu não tenho tempo hoje.' },
          { german: 'Ich verstehe das nicht.', portuguese: 'Eu não entendo isso.' },
          { german: 'Er kommt heute nicht zur Arbeit.', portuguese: 'Ele não vem ao trabalho hoje.' },
        ],
        practiceExercises: [
          {
            id: 'ex_a1_7_1',
            type: 'multiple_choice',
            level: 'A1',
            category: 'Negação',
            instructionPt: 'Complete a frase negando o substantivo "Geld" (dinheiro):',
            question: 'Ich habe leider ___ Geld dabei.',
            options: ['kein', 'nicht', 'keine', 'keinen'],
            correctAnswer: 'kein',
            explanationPt: 'Geld é neutro (das Geld) e está sendo negado como substantivo: "kein Geld".',
            xp: 20,
          },
          {
            id: 'ex_a1_7_2',
            type: 'multiple_choice',
            level: 'A1',
            category: 'Negação',
            instructionPt: 'Complete a frase negando o verbo "verstehen" (entender):',
            question: 'Entschuldigung, ich verstehe ___ .',
            options: ['nicht', 'kein', 'keine', 'nichts'],
            correctAnswer: 'nicht',
            explanationPt: 'Para negar o verbo ou a ação, usamos "nicht" no final da frase: "ich verstehe nicht".',
            xp: 20,
          },
        ],
        miniTestExercises: [
          {
            id: 'test_a1_7_1',
            type: 'true_false',
            level: 'A1',
            category: 'Negação',
            instructionPt: 'A frase "Ich habe nicht Auto" está correta?',
            question: '"Ich habe nicht Auto" é uma frase gramaticalmente correta?',
            options: ['Falso (Incorreto - deve ser "kein Auto")', 'Verdadeiro (Correto)'],
            correctAnswer: 'Falso (Incorreto - deve ser "kein Auto")',
            explanationPt: 'Incorreto! Para substantivos como Auto, devemos usar "kein Auto".',
            xp: 20,
          },
        ],
      },
    ],
  },

  // ===================== A1 - MÓDULO 4 =====================
  {
    id: 'mod_a1_4',
    level: 'A1',
    order: 4,
    titlePt: 'Módulo 4: Situações Práticas na Alemanha',
    titleDe: 'Modul 4: Alltagssituationen in Deutschland',
    descriptionPt: 'No restaurante, transporte público, médico, compras e comunicação do dia a dia.',
    iconName: 'MapPin',
    lessons: [
      {
        id: 'les_a1_8_restaurante_transporte',
        moduleId: 'mod_a1_4',
        level: 'A1',
        order: 1,
        titlePt: '8. No Restaurante & Transporte Público',
        titleDe: 'Im Restaurant und Unterwegs',
        descriptionPt: 'Fazer pedidos, pedir a conta, pagar junto/separado e pegar ônibus/metrô/trens na Alemanha.',
        durationMinutes: 15,
        xpReward: 50,
        grammarFocus: 'Expressão "Ich hätte gern...", "Zahlen bitte", preposição "mit dem Bus/Zug"',
        theoryExplanationPt: `Expressões vitais em restaurantes:
- "Ich hätte gern die Speisekarte, bitte." (Eu gostaria do cardápio, por favor.)
- "Für mich ein Bier und ein Wasser, bitte." (Para mim uma cerveja e uma água, por favor.)
- "Hat es Ihnen geschmeckt?" (Estava gostoso?) -> "Ja, es war sehr lecker!" (Sim, estava uma delícia!)
- "Wir möchten bitte zahlen." (Gostaríamos de pagar, por favor.)
- "Zusammen oder getrennt?" (Juntos ou separados?) -> "Getrennt, bitte." (Separados, por favor).

No transporte:
- "Eine Einzelfahrt nach Berlin, bitte." (Uma passagem simples para Berlim, por favor.)
- "Fährt dieser Bus zum Hauptbahnhof?" (Este ônibus vai para a estação central?)`,
        culturalNotePt: 'Na Alemanha é perfeitamente normal pedir para pagar a conta separada ("getrennt zahlen"), mesmo em grupos grandes.',
        vocabulary: [
          { german: 'die Speisekarte', article: 'die', plural: 'die Speisekarten', portuguese: 'o cardápio' },
          { german: 'die Rechnung', article: 'die', plural: 'die Rechnungen', portuguese: 'a conta' },
          { german: 'der Bahnhof', article: 'der', plural: 'die Bahnhöfe', portuguese: 'a estação de trem' },
          { german: 'die Fahrkarte', article: 'die', plural: 'die Fahrkarten', portuguese: 'a passagem / bilhete' },
        ],
        examples: [
          { german: 'Entschuldigung, die Rechnung bitte!', portuguese: 'Com licença, a conta por favor!' },
          { german: 'Ich fahre mit der U-Bahn zur Uni.', portuguese: 'Eu vou de metrô para a universidade.' },
        ],
        practiceExercises: [
          {
            id: 'ex_a1_8_1',
            type: 'multiple_choice',
            level: 'A1',
            category: 'Restaurante',
            instructionPt: 'Como responder quando o garçom pergunta se a conta será paga junta ou separada?',
            question: '"Zusammen oder getrennt?"',
            options: ['Getrennt, bitte. (Separado, por favor)', 'Nein danke.', 'Guten Tag.', 'Auf Wiedersehen.'],
            correctAnswer: 'Getrennt, bitte. (Separado, por favor)',
            explanationPt: '"Getrennt, bitte" significa que cada pessoa pagará o seu consumo.',
            xp: 20,
          },
        ],
        miniTestExercises: [
          {
            id: 'test_a1_8_1',
            type: 'translate_pt_de',
            level: 'A1',
            category: 'Restaurante',
            instructionPt: 'Como pedir a conta educadamente em alemão?',
            question: 'A conta, por favor:',
            options: ['Die Rechnung, bitte!', 'Das Geld, bitte!', 'Ich will zahlen sofort!', 'Karte bitte!'],
            correctAnswer: 'Die Rechnung, bitte!',
            explanationPt: '"Die Rechnung, bitte!" é a forma padrão e educada em qualquer café ou restaurante.',
            xp: 20,
          },
        ],
      },
    ],
  },

  // ===================== NÍVEIS A2, B1, B2, C1 =====================
  {
    id: 'mod_a2_1',
    level: 'A2',
    order: 5,
    titlePt: 'A2: Passado no Dia a Dia (Perfekt) & Rotina',
    titleDe: 'A2 Modul 1: Das Perfekt im Alltag',
    descriptionPt: 'Conte sobre o seu dia anterior, viagens e experiências passadas usando o tempo verbal Perfekt com haben e sein.',
    iconName: 'Clock',
    lessons: [
      {
        id: 'les_a2_1_perfekt',
        moduleId: 'mod_a2_1',
        level: 'A2',
        order: 1,
        titlePt: '9. O Perfekt no Cotidiano com haben e sein',
        titleDe: 'Das Perfekt: Haben oder Sein?',
        descriptionPt: 'Aprenda a falar sobre o que você fez ontem, no fim de semana ou nas férias.',
        durationMinutes: 15,
        xpReward: 50,
        grammarFocus: 'Perfekt: Auxiliar na posição 2 + Partizip II no final',
        theoryExplanationPt: `O Perfekt é o tempo verbal mais falado para expressar o passado no dia a dia.
Estrutura:
[Sujeito] + [haben ou sein conjugado] + [...] + [Partizip II no final da frase].

Quando usar SEIN:
- Verbos de deslocamento: gehen, fahren, fliegen, kommen, laufen.
- Verbos de mudança de estado: aufstehen, einschlafen.
- Exceções fixas: sein (ist gewesen), bleiben (ist geblieben).

Exemplos:
- "Ich bin gestern nach Köln gefahren."
- "Ich habe gestern viel gearbeitet."`,
        culturalNotePt: 'No alemão falado do dia a dia, raramente se usa o Präteritum (passado simples), exceto para os verbos sein (war) e haben (hatte).',
        vocabulary: [
          { german: 'gestern', portuguese: 'ontem' },
          { german: 'letzte Woche', portuguese: 'semana passada' },
          { german: 'gearbeitet', portuguese: 'trabalhado (Partizip II de arbeiten)' },
          { german: 'gefahren', portuguese: 'viajado / dirigido (Partizip II de fahren)' },
        ],
        examples: [
          { german: 'Was hast du am Wochenende gemacht?', portuguese: 'O que você fez no fim de semana?' },
          { german: 'Ich bin zu Hause geblieben und habe Deutsch gelernt.', portuguese: 'Eu fiquei em casa e estudei alemão.' },
        ],
        practiceExercises: [
          {
            id: 'ex_a2_1_1',
            type: 'multiple_choice',
            level: 'A2',
            category: 'Perfekt',
            instructionPt: 'Escolha o auxiliar correto para o verbo "bleiben" (ficar/permanecer):',
            question: 'Am Sonntag ___ ich zu Hause geblieben.',
            options: ['bin', 'habe', 'war', 'hatte'],
            correctAnswer: 'bin',
            explanationPt: 'O verbo "bleiben" utiliza obrigatoriamente o auxiliar "sein" no Perfekt: ich bin geblieben.',
            xp: 25,
          },
        ],
        miniTestExercises: [
          {
            id: 'test_a2_1_1',
            type: 'fill_blank',
            level: 'A2',
            category: 'Perfekt',
            instructionPt: 'Complete com o Partizip II do verbo regular "kaufen" (comprar):',
            question: 'Ich habe gestern ein neues Buch ___ .',
            options: ['gekauft', 'kaufte', 'kaufen', 'gekauften'],
            correctAnswer: 'gekauft',
            explanationPt: 'O Partizip II do verbo regular kaufen é "gekauft" (ge- + kauf + -t).',
            xp: 20,
          },
        ],
      },
    ],
  },

  {
    id: 'mod_b1_1',
    level: 'B1',
    order: 6,
    titlePt: 'B1: Conjunções Avançadas & Vida Profissional',
    titleDe: 'B1 Modul 1: Berufsleben & Komplexe Sätze',
    descriptionPt: 'Orações subordinadas com obwohl, weil, dass, quando usar Konjunktiv II para cortesia e comunicação em reuniões.',
    iconName: 'Briefcase',
    lessons: [
      {
        id: 'les_b1_1_subordinadas',
        moduleId: 'mod_b1_1',
        level: 'B1',
        order: 1,
        titlePt: '10. Orações Subordinadas e Conectivos (obwohl, damit, weil)',
        titleDe: 'Nebensätze und Konnektoren',
        descriptionPt: 'Construa argumentos elaborados em conversas profissionais e discussões.',
        durationMinutes: 18,
        xpReward: 60,
        grammarFocus: 'Posição do verbo conjugado no final da oração subordinada',
        theoryExplanationPt: `Conectivos avançados essenciais no B1:
- obwohl = embora / apesar de que (expressa concessão)
- damit = para que / a fim de que (expressa objetivo com sujeitos diferentes)
- um... zu + Infinitiv = para (quando o sujeito da oração principal e subordinada é o mesmo)

Exemplos:
- "Obwohl es regnet, gehe ich spazieren." (Embora esteja chovendo, vou caminhar.)
- "Ich lerne fleißig, um eine gute Stelle zu finden." (Estudo com dedicação para encontrar uma boa vaga de emprego.)`,
        culturalNotePt: 'Em entrevistas de emprego na Alemanha, usar conectivos como "obwohl" e "deshalb" demonstra excelente maturidade linguística.',
        vocabulary: [
          { german: 'obwohl', portuguese: 'embora / apesar de que' },
          { german: 'deshalb', portuguese: 'por isso / portanto' },
          { german: 'die Voraussetzung', article: 'die', plural: 'die Voraussetzungen', portuguese: 'o pré-requisito / condição' },
        ],
        examples: [
          { german: 'Ich habe die Stelle bekommen, obwohl die Konkurrenz groß war.', portuguese: 'Consegui a vaga de emprego, embora a concorrência fosse grande.' },
        ],
        practiceExercises: [
          {
            id: 'ex_b1_1_1',
            type: 'multiple_choice',
            level: 'B1',
            category: 'Conectivos B1',
            instructionPt: 'Escolha a conjunção que expressa concessão ("embora"):',
            question: '___ er müde war, hat er die Präsentation fertiggestellt.',
            options: ['Obwohl', 'Weil', 'Damit', 'Dass'],
            correctAnswer: 'Obwohl',
            explanationPt: '"Obwohl" significa "embora" e joga o verbo conjugado "war" para o final.',
            xp: 25,
          },
        ],
        miniTestExercises: [
          {
            id: 'test_b1_1_1',
            type: 'true_false',
            level: 'B1',
            category: 'Conjunções',
            instructionPt: 'Na oração com "deshalb", o verbo conjugado vai para a posição 2?',
            question: 'Em orações com o advérbio conector "deshalb", o verbo conjugado fica na posição 2 (ex: "Deshalb lerne ich Deutsch").',
            options: ['Verdadeiro (Richtig)', 'Falso (Falsch)'],
            correctAnswer: 'Verdadeiro (Richtig)',
            explanationPt: 'Correto! "Deshalb" é um advérbio que ocupa a posição 1, fazendo com que o verbo conjugado venha imediatamente na posição 2.',
            xp: 25,
          },
        ],
      },
    ],
  },

  {
    id: 'mod_b2_1',
    level: 'B2',
    order: 7,
    titlePt: 'B2: Alemão Corporativo, Passiv & Nomen-Verb-Verbindungen',
    titleDe: 'B2 Modul 1: Fachsprache & Passiv',
    descriptionPt: 'Voz passiva, combinações de substantivo e verbo para e-mails e relatórios formais.',
    iconName: 'GraduationCap',
    lessons: [
      {
        id: 'les_b2_1_passiv',
        moduleId: 'mod_b2_1',
        level: 'B2',
        order: 1,
        titlePt: '11. A Voz Passiva no Ambiente Corporativo',
        titleDe: 'Das Passiv im Berufsalltag',
        descriptionPt: 'Como redigir relatórios, entender processos e se comunicar com precisão profissional.',
        durationMinutes: 20,
        xpReward: 70,
        grammarFocus: 'Vorgangspassiv (werden + Partizip II) em todos os tempos verbais',
        theoryExplanationPt: `No nível B2 corporativo, a voz passiva é amplamente empregada para focar no processo:
- Presente: "Das Projekt WIRD nächste Woche ABGESCHLOSSEN." (O projeto será concluído semana que vem.)
- Passado: "Die Verträge WURDEN gestern UNTERZEICHNET." (Os contratos foram assinados ontem.)
- Modal: "Diese Maßnahme MUSS schnell DURCHGEFÜHRT WERDEN." (Esta medida precisa ser executada rapidamente.)`,
        culturalNotePt: 'E-mails corporativos e normas técnicas alemãs (DIN) utilizam intensamente a voz passiva.',
        vocabulary: [
          { german: 'durchführen', portuguese: 'executar / realizar', example: 'Das Projekt wird durchgeführt.' },
          { german: 'die Maßnahme', article: 'die', plural: 'die Maßnahmen', portuguese: 'a medida / providência' },
        ],
        examples: [
          { german: 'Die neuen Richtlinien wurden erfolgreich implementiert.', portuguese: 'As novas diretrizes foram implementadas com sucesso.' },
        ],
        practiceExercises: [
          {
            id: 'ex_b2_1_1',
            type: 'multiple_choice',
            level: 'B2',
            category: 'Passiv B2',
            instructionPt: 'Complete na voz passiva com verbo modal no presente:',
            question: 'Der Fehler muss sofort korrigiert ___ .',
            options: ['werden', 'worden', 'wurde', 'wird'],
            correctAnswer: 'werden',
            explanationPt: 'Com verbo modal ("muss"), o auxiliar da passiva vai para o infinitivo "werden" no final da frase.',
            xp: 30,
          },
        ],
        miniTestExercises: [
          {
            id: 'test_b2_1_1',
            type: 'select_verb',
            level: 'B2',
            category: 'Passiv',
            instructionPt: 'Forma correta do verbo auxiliar no Präteritum da passiva:',
            question: 'Das Dokument ___ gestern per Einschreiben verschickt.',
            options: ['wurde', 'worden', 'werde', 'geworden'],
            correctAnswer: 'wurde',
            explanationPt: 'No passado (Präteritum) de werden para o singular neutro/masculino, usamos "wurde".',
            xp: 25,
          },
        ],
      },
    ],
  },

  {
    id: 'mod_c1_1',
    level: 'C1',
    order: 8,
    titlePt: 'C1: Fluência Avançada, Redewendungen & Cidadania',
    titleDe: 'C1 Modul 1: Fortgeschrittene Redewendungen & Einbürgerung',
    descriptionPt: 'Expressões idiomáticas nativas, nuances de registro linguístico e preparação para cidadania alemã.',
    iconName: 'Crown',
    lessons: [
      {
        id: 'les_c1_1_redewendungen',
        moduleId: 'mod_c1_1',
        level: 'C1',
        order: 1,
        titlePt: '12. Expressões Idiomáticas Nativas (Redewendungen)',
        titleDe: 'Typische deutsche Redewendungen',
        descriptionPt: 'Fale e compreenda alemão no mais alto nível como um falante nativo.',
        durationMinutes: 20,
        xpReward: 80,
        grammarFocus: 'Expressões idiomáticas, metáforas cotidianas e registro culto',
        theoryExplanationPt: `Expressões idiomáticas que todo falante avançado precisa dominar:
1. "Ich verstehe nur Bahnhof." = Não estou entendendo absolutamente nada (expressão clássica alemã).
2. "Da drücke ich dir die Daumen!" = Estou torcendo muito por você! (o equivalente a cruzar os dedos).
3. "Das ist mir Wurst / Wurscht." = Tanto faz para mim / Não me importo.
4. "Die Kirche im Dorf lassen." = Não exagerar / manter o bom senso e a moderação.
5. "Zwei Fliegen mit einer Klappe schlagen." = Matar dois coelhos com uma cajadada só.`,
        culturalNotePt: 'Usar expressões idiomáticas naturais no momento certo demonstra integração cultural profunda na sociedade alemã.',
        vocabulary: [
          { german: 'die Daumen drücken', portuguese: 'torcer por alguém (literalmente: pressionar os polegares)' },
          { german: 'nur Bahnhof verstehen', portuguese: 'não entender nada de um assunto' },
        ],
        examples: [
          { german: 'Morgen habe ich meine Prüfung. - Ich drücke dir ganz fest die Daumen!', portuguese: 'Amanhã tenho minha prova. - Estou torcendo muito por você!' },
        ],
        practiceExercises: [
          {
            id: 'ex_c1_1_1',
            type: 'multiple_choice',
            level: 'C1',
            category: 'Expressões C1',
            instructionPt: 'O que significa a expressão alemã "Ich drücke dir die Daumen"?',
            question: '"Ich drücke dir die Daumen" significa:',
            options: ['Estou torcendo por você com carinho!', 'Estou com dor nos dedos.', 'Estou te pressionando.', 'Não quero te ajudar.'],
            correctAnswer: 'Estou torcendo por você com carinho!',
            explanationPt: 'Pressionar os polegares ("die Daumen drücken") é o gesto cultural alemão equivalente a torcer / cruzar os dedos.',
            xp: 30,
          },
        ],
        miniTestExercises: [
          {
            id: 'test_c1_1_1',
            type: 'translate_de_pt',
            level: 'C1',
            category: 'Redewendungen',
            instructionPt: 'O que quer dizer "Ich verstehe nur Bahnhof"?',
            question: '"Ich verstehe nur Bahnhof" = ?',
            options: ['Não estou entendendo nada.', 'Estou na estação de trem.', 'Quero viajar de trem.', 'O trem está atrasado.'],
            correctAnswer: 'Não estou entendendo nada.',
            explanationPt: '"Ich verstehe nur Bahnhof" é a expressão alemã mais famosa para dizer "não entendi patavina / grego para mim".',
            xp: 30,
          },
        ],
      },
    ],
  },
];
