import { GrammarTopic } from '../types';

export const initialGrammarData: GrammarTopic[] = [
  {
    id: 'g_artigos_der_die_das',
    level: 'A1',
    titlePt: 'Artigos Definidos (der, die, das) e Indefinidos (ein, eine, ein)',
    titleDe: 'Bestimmte und unbestimmte Artikel',
    category: 'Substantivos e Artigos',
    shortSummaryPt: 'Em alemão, todo substantivo tem um gênero gramatical: masculino (der), feminino (die) ou neutro (das).',
    fullExplanationPt: `Diferente do português que possui apenas dois gêneros (o / a), o alemão possui TRÊS gêneros: Masculino (der), Feminino (die) e Neutro (das).
Além disso, todos os substantivos alemães DEVEM ser escritos com a PRIMEIRA LETRA MAIÚSCULA (ex: der Tisch, die Frau, das Auto).

Não tente traduzir o gênero diretamente do português! Por exemplo:
- "A mesa" em português é feminino, mas em alemão é MASCULINO: der Tisch.
- "A menina" em português é feminino, mas em alemão é NEUTRO: das Mädchen (por causa do sufixo diminutivo -chen).
- "O sol" em português é masculino, mas em alemão é FEMININO: die Sonne.`,
    rulesList: [
      'Substantivos terminados em -ung, -heit, -keit, -schaft, -tät, -ie são sempre FEMININOS (die).',
      'Substantivos terminados em -chen, -lein, -um, -ment são sempre NEUTROS (das).',
      'Dias da semana, meses, estações do ano e pontos cardeais são sempre MASCULINOS (der).',
      'O plural de TODOS os substantivos no caso Nominativ usa o artigo DIE.',
    ],
    tables: [
      {
        header: ['Gênero', 'Definido (O/A)', 'Indefinido (Um/Uma)', 'Negativo (Nenhum/Nenhuma)', 'Exemplo'],
        rows: [
          ['Masculino (Maskulin)', 'der', 'ein', 'kein', 'der Mann / ein Mann'],
          ['Feminino (Feminin)', 'die', 'eine', 'keine', 'die Frau / eine Frau'],
          ['Neutro (Neutral)', 'das', 'ein', 'kein', 'das Kind / ein Kind'],
          ['Plural', 'die', '—', 'keine', 'die Kinder / keine Kinder'],
        ],
      },
    ],
    examples: [
      { german: 'Der Tisch ist sehr alt.', portuguese: 'A mesa é muito antiga.' },
      { german: 'Ich habe eine Katze.', portuguese: 'Eu tenho uma gata.' },
      { german: 'Das Mädchen lernt schnell.', portuguese: 'A menina aprende rápido.' },
      { german: 'Das ist kein Problem.', portuguese: 'Isso não é nenhum problema.' },
    ],
    brazilianPitfallPt: 'Nunca use a lógica do português para adivinhar o gênero. Aprenda SEMPRE o substantivo junto com seu artigo (ex: nunca decore "Tisch", decore "der Tisch").',
    practiceExercises: [
      {
        id: 'g_art_ex1',
        type: 'select_article',
        level: 'A1',
        category: 'Artigos',
        instructionPt: 'Escolha o artigo definido correto para a palavra "Sonne" (sol):',
        question: '___ Sonne scheint heute sehr schön.',
        options: ['der', 'die', 'das'],
        correctAnswer: 'die',
        explanationPt: 'Em alemão, "Sonne" é feminino: die Sonne.',
        xp: 15,
      },
      {
        id: 'g_art_ex2',
        type: 'select_article',
        level: 'A1',
        category: 'Artigos',
        instructionPt: 'Escolha o artigo definido correto para "Tisch" (mesa):',
        question: '___ Tisch steht in der Küche.',
        options: ['der', 'die', 'das'],
        correctAnswer: 'der',
        explanationPt: 'Em alemão, "Tisch" é masculino: der Tisch.',
        xp: 15,
      },
    ],
  },
  {
    id: 'g_akkusativ',
    level: 'A1',
    titlePt: 'O Caso Acusativo (Akkusativ - Objeto Direto)',
    titleDe: 'Der Akkusativ',
    category: 'Casos Gramaticais',
    shortSummaryPt: 'O Acusativo responde à pergunta "Quem?" ou "O quê?" (Wen? ou Was?) e afeta principalmente o artigo masculino (der vira den).',
    fullExplanationPt: `O Akkusativ equivale ao OBJETO DIRETO em português. Ele indica quem ou o que recebe a ação do verbo diretamente.

A grande boa notícia:
No Akkusativ, o Feminino (die/eine), o Neutro (das/ein) e o Plural (die/keine) NÃO MUDAM NADA!
A ÚNICA mudança acontece com o MASCULINO:
- der vira DEN
- ein vira EINEN
- kein vira KEINEN
- mein vira MEINEN

Verbos comuns que exigem Akkusativ: haben (ter), kaufen (comprar), essen (comer), trinken (beber), sehen (ver), brauchen (precisar), suchen (procurar).`,
    rulesList: [
      'Identifique o sujeito da frase (Nominativ) e o objeto direto que sofre a ação (Akkusativ).',
      'Se o objeto for masculino (der), mude para DEN ou EINEN.',
      'Preposições que SEMPRE exigem Akkusativ: für (para), durch (através), ohne (sem), um (em volta/às), gegen (contra). Ex: "ohne DICH", "für DEN Freund".',
    ],
    tables: [
      {
        header: ['Caso / Gênero', 'Masculino', 'Feminino', 'Neutro', 'Plural'],
        rows: [
          ['Nominativ (Sujeito)', 'der / ein', 'die / eine', 'das / ein', 'die / keine'],
          ['Akkusativ (Objeto Direto)', 'den / einen', 'die / eine', 'das / ein', 'die / keine'],
        ],
      },
    ],
    examples: [
      { german: 'Ich habe einen Apfel.', portuguese: 'Eu tenho uma maçã (der Apfel -> einen Apfel).' },
      { german: 'Ich brauche den Schlüssel.', portuguese: 'Eu preciso da chave (der Schlüssel -> den Schlüssel).' },
      { german: 'Er kauft ein Auto.', portuguese: 'Ele compra um carro (das Auto -> ein Auto - neutro não muda).' },
      { german: 'Das Geschenk ist für dich.', portuguese: 'O presente é para você.' },
    ],
    brazilianPitfallPt: 'O erro mais comum de brasileiros é falar "Ich habe ein Hund" em vez de "Ich habe einen Hund" (porque der Hund é masculino e exige Akkusativ).',
    practiceExercises: [
      {
        id: 'g_akk_ex1',
        type: 'multiple_choice',
        level: 'A1',
        category: 'Akkusativ',
        instructionPt: 'Complete a frase no Akkusativ:',
        question: 'Ich trinke ___ Kaffee.',
        options: ['einen', 'ein', 'eine', 'einem'],
        correctAnswer: 'einen',
        explanationPt: 'Kaffee é masculino (der Kaffee). No Akkusativ com o verbo trinken, vira "einen Kaffee".',
        xp: 20,
      },
    ],
  },
  {
    id: 'g_dativ',
    level: 'A2',
    titlePt: 'O Caso Dativo (Dativ - Objeto Indireto e Localização Estática)',
    titleDe: 'Der Dativ',
    category: 'Casos Gramaticais',
    shortSummaryPt: 'O Dativo equivale ao objeto indireto ("a quem?", "para quem?") e a respostas para a pergunta "Onde?" (Wo?).',
    fullExplanationPt: `O Dativ indica a quem se destina uma ação, ou onde algo está parado/estático (Wo?).

Tabela de transformações no Dativ:
- der -> DEM / einem
- das -> DEM / einem (masculino e neutro ficam iguais!)
- die (feminino) -> DER / einer
- die (plural) -> DEN + terminação -n no substantivo!

Verbos que SEMPRE pedem Dativ: helfen (ajudar), danken (agradecer), gefallen (agradar), gehören (pertencer), schmecken (ter gosto bom para), passen (servir).
Preposições que SEMPRE pedem Dativ: aus, bei, mit, nach, seit, von, zu (dica mnemônica: "Aus-bei-mit-nach-seit-von-zu").`,
    rulesList: [
      'Responde a "Wem?" (A quem?) ou "Wo?" (Onde - sem movimento de deslocamento).',
      'No plural Dativ, acrescente a letra -n ao final do substantivo se ele já não terminar com n ou s (ex: den Kindern).',
      'Preposição MIT sempre pede Dativ: "mit dem Bus", "mit meiner Familie".',
    ],
    tables: [
      {
        header: ['Caso', 'Masculino', 'Feminino', 'Neutro', 'Plural'],
        rows: [
          ['Nominativ', 'der / ein', 'die / eine', 'das / ein', 'die / keine'],
          ['Akkusativ', 'den / einen', 'die / eine', 'das / ein', 'die / keine'],
          ['Dativ', 'dem / einem', 'der / einer', 'dem / einem', 'den ...n / keinen ...n'],
        ],
      },
    ],
    examples: [
      { german: 'Ich helfe dem Mann.', portuguese: 'Eu ajudo o homem (helfen pede Dativ).' },
      { german: 'Ich fahre mit dem Zug.', portuguese: 'Eu vou de trem (mit pede Dativ).' },
      { german: 'Das Buch gehört der Lehrerin.', portuguese: 'O livro pertence à professora.' },
      { german: 'Wie geht es dir? - Mir geht es gut.', portuguese: 'Como vai você? - Eu estou bem.' },
    ],
    brazilianPitfallPt: 'Em português dizemos "eu ajudo você" (objeto direto), mas em alemão o verbo helfen SEMPRE exige Dativ: "Ich helfe dir" (e nunca "Ich helfe dich").',
    practiceExercises: [
      {
        id: 'g_dat_ex1',
        type: 'multiple_choice',
        level: 'A2',
        category: 'Dativ',
        instructionPt: 'Complete com a forma correta do Dativo após a preposição "mit":',
        question: 'Ich fahre mit ___ Bus zur Arbeit.',
        options: ['dem', 'den', 'der', 'das'],
        correctAnswer: 'dem',
        explanationPt: 'Bus é masculino (der Bus). A preposição "mit" exige Dativo, transformando der em dem.',
        xp: 20,
      },
    ],
  },
  {
    id: 'g_praesens_verben',
    level: 'A1',
    titlePt: 'Verbos no Presente (Präsens) e Posição na Frase',
    titleDe: 'Verben im Präsens und Satzbau',
    category: 'Verbos',
    shortSummaryPt: 'Em orações afirmativas principais, o verbo conjugado ocupa OBRIGATORIAMENTE a 2ª posição.',
    fullExplanationPt: `A conjugação regular no presente adiciona terminações ao radical do verbo:
- ich: -e (ich lerne)
- du: -st (du lernst)
- er/sie/es: -t (er lernt)
- wir: -en (wir lernen)
- ihr: -t (ihr lernt)
- sie/Sie: -en (sie lernen)

A Regra de Ouro do Alemão (Regra da Posição 2):
Em qualquer oração principal afirmativa, o verbo conjugado SEMPRE fica na POSIÇÃO 2.
Mesmo que você comece com o tempo ou lugar, o verbo não sai da posição 2!
Exemplo:
- "Ich lerne heute Deutsch." (Posição 1: Ich, Posição 2: lerne)
- "Heute lerne ich Deutsch." (Posição 1: Heute, Posição 2: lerne, Posição 3: ich)`,
    rulesList: [
      'Regra das terminações regulares: -e, -st, -t, -en, -t, -en.',
      'Verbos irregulares mudam a vogal do radical na 2ª e 3ª pessoas do singular (du e er/sie/es): e -> i/ie (sprechen -> du sprichst, sehen -> du siehst), a -> ä (fahren -> du fährst).',
      'Em perguntas com pronome interrogativo (W-Fragen), o pronome fica na posição 1 e o verbo na posição 2 (ex: "Wo wohnst du?").',
      'Em perguntas de Sim/Não (Ja/Nein-Fragen), o verbo vai para a posição 1 (ex: "Lernst du Deutsch?").',
    ],
    tables: [
      {
        header: ['Pronome', 'lernen (regular)', 'sprechen (irregular e->i)', 'fahren (irregular a->ä)', 'sein (ser/estar)'],
        rows: [
          ['ich', 'lerne', 'spreche', 'fahre', 'bin'],
          ['du', 'lernst', 'sprichst', 'fährst', 'bist'],
          ['er / sie / es', 'lernt', 'spricht', 'fährt', 'ist'],
          ['wir', 'lernen', 'sprechen', 'fahren', 'sind'],
          ['ihr', 'lernt', 'sprecht', 'fahrt', 'seid'],
          ['sie / Sie', 'lernen', 'sprechen', 'fahren', 'sind'],
        ],
      },
    ],
    examples: [
      { german: 'Morgen fahre ich nach Berlin.', portuguese: 'Amanhã eu viajo para Berlim (verbo fahre na posição 2).' },
      { german: 'Sprichst du Portugiesisch?', portuguese: 'Você fala português?' },
      { german: 'Er arbeitet bei Siemens.', portuguese: 'Ele trabalha na Siemens.' },
    ],
    brazilianPitfallPt: 'Em português dizemos "Amanhã eu vou", mas em alemão você NUNCA pode dizer "Morgen ich gehe". Deve ser "Morgen gehe ich", pois o verbo exige a posição 2.',
    practiceExercises: [
      {
        id: 'g_praes_ex1',
        type: 'select_verb',
        level: 'A1',
        category: 'Verbos no Presente',
        instructionPt: 'Conjugue o verbo irregular "sprechen" para "du":',
        question: 'Du ___ sehr gut Deutsch.',
        options: ['sprichst', 'sprechst', 'sprecht', 'spreche'],
        correctAnswer: 'sprichst',
        explanationPt: 'O verbo sprechen muda a vogal de "e" para "i" na segunda pessoa do singular: du sprichst.',
        xp: 15,
      },
    ],
  },
  {
    id: 'g_perfekt',
    level: 'A2',
    titlePt: 'O Passado no Cotidiano (Das Perfekt mit haben / sein)',
    titleDe: 'Das Perfekt',
    category: 'Tempos Verbais',
    shortSummaryPt: 'O Perfekt é o tempo verbal mais falado no dia a dia para contar coisas que aconteceram no passado.',
    fullExplanationPt: `Como se forma o Perfekt:
[Sujeito] + [haben ou sein conjugado na posição 2] + [...] + [Partizip II no final da frase!]

Quando usar HABEN e quando usar SEIN?
1. Usamos SEIN quando o verbo indica:
   - MOVIMENTO de um ponto A para um ponto B (ex: gehen, fahren, fliegen, kommen, reisen).
   - MUDANÇA DE ESTADO (ex: aufstehen - acordar, einschlafen - adormecer, sterben - falecer).
   - Os verbos sein (ser/estar) e bleiben (permanecer): "Ich bin gewesen", "Ich bin geblieben".
2. Usamos HABEN para a grande maioria dos outros verbos (verbos transitivos, verbos reflexivos, verbos estáticos).`,
    rulesList: [
      'Estrutura em moldura (Satzklammer): o auxiliar fica na posição 2 e o Partizip II vai OBRIGATORIAMENTE para o fim da frase.',
      'Partizip II regular: ge- + radical + -t (ex: machen -> gemacht, kaufen -> gekauft).',
      'Partizip II irregular: geralmente ge- + radical modificado + -en (ex: trinken -> getrunken, sprechen -> gesprochen).',
      'Verbos terminados em -ieren NÃO recebem o prefixo ge- (ex: studieren -> studiert, telefonieren -> telefoniert).',
    ],
    tables: [
      {
        header: ['Infinitiv', 'Auxiliar', 'Partizip II', 'Frase no Perfekt'],
        rows: [
          ['machen (fazer)', 'haben', 'gemacht', 'Ich habe die Hausaufgaben gemacht.'],
          ['gehen (ir a pé)', 'sein', 'gegangen', 'Ich bin nach Hause gegangen.'],
          ['fahren (viajar/dirigir)', 'sein', 'gefahren', 'Wir sind nach Hamburg gefahren.'],
          ['essen (comer)', 'haben', 'gegessen', 'Er hat eine Pizza gegessen.'],
          ['bleiben (ficar)', 'sein', 'geblieben', 'Sie ist zu Hause geblieben.'],
        ],
      },
    ],
    examples: [
      { german: 'Ich habe gestern Deutsch gelernt.', portuguese: 'Eu estudei alemão ontem.' },
      { german: 'Wir sind um 8 Uhr angekommen.', portuguese: 'Nós chegamos às 8 horas.' },
      { german: 'Hast du den Film gesehen?', portuguese: 'Você viu o filme?' },
    ],
    brazilianPitfallPt: 'Nunca diga "Ich habe nach Berlin gefahren". Como "fahren" é deslocamento, o correto é SEMPRE "Ich bin nach Berlin gefahren".',
    practiceExercises: [
      {
        id: 'g_perf_ex1',
        type: 'multiple_choice',
        level: 'A2',
        category: 'Perfekt',
        instructionPt: 'Escolha o auxiliar correto para o verbo "kommen" (vir):',
        question: 'Gestern ___ meine Freunde zu Besuch gekommen.',
        options: ['sind', 'haben', 'waren', 'hatten'],
        correctAnswer: 'sind',
        explanationPt: 'Kommen indica deslocamento e requer o verbo auxiliar "sein" (meine Freunde sind ... gekommen).',
        xp: 20,
      },
    ],
  },
  {
    id: 'g_modalverben',
    level: 'A1',
    titlePt: 'Verbos Modais (können, müssen, dürfen, wollen, sollen, möchten)',
    titleDe: 'Die Modalverben',
    category: 'Verbos',
    shortSummaryPt: 'Modificam o sentido do verbo principal e jogam o segundo verbo no infinitivo para o final da frase.',
    fullExplanationPt: `Os 6 verbos modais mais importantes:
1. können = poder / ser capaz de / saber fazer algo ("Ich kann schwimmen")
2. müssen = dever / ter a obrigação estrita de ("Ich muss arbeiten")
3. dürfen = ter permissão / autorização para ("Hier darf man parken")
4. wollen = querer com determinação / plano ("Ich will Deutsch lernen")
5. sollen = dever (por recomendação de outrem / conselho) ("Der Arzt sagt, ich soll schlafen")
6. möchten = gostaria de (forma polida de querer) ("Ich möchte einen Kaffee")

Estrutura da frase:
[Sujeito] + [Modal conjugado na posição 2] + [Complementos] + [Verbo principal no INFINITIVO no final]!`,
    rulesList: [
      'Na 1ª e 3ª pessoa do singular (ich e er/sie/es), os verbos modais têm formas IDÊNTICAS e NÃO recebem terminação -t (ex: ich kann, er kann).',
      'No singular, o radical perde o trema (ex: müssen -> ich muss, können -> ich kann, dürfen -> ich darf).',
      'O verbo principal NUNCA é conjugado, ficando no infinitivo na última posição da frase.',
    ],
    tables: [
      {
        header: ['Pronome', 'können (poder)', 'müssen (ter que)', 'dürfen (permissão)', 'wollen (querer)', 'möchten (gostaria)'],
        rows: [
          ['ich', 'kann', 'muss', 'darf', 'will', 'möchte'],
          ['du', 'kannst', 'musst', 'darfst', 'willst', 'möchtest'],
          ['er / sie / es', 'kann', 'muss', 'darf', 'will', 'möchte'],
          ['wir', 'können', 'müssen', 'dürfen', 'wollen', 'möchten'],
          ['ihr', 'könnt', 'müsst', 'dürft', 'wollt', 'möchtet'],
          ['sie / Sie', 'können', 'müssen', 'dürfen', 'wollen', 'möchten'],
        ],
      },
    ],
    examples: [
      { german: 'Ich kann sehr gut kochen.', portuguese: 'Eu sei / consigo cozinhar muito bem.' },
      { german: 'Hier darf man nicht rauchen.', portuguese: 'Aqui não é permitido fumar.' },
      { german: 'Wir müssen heute pünktlich sein.', portuguese: 'Nós temos que ser pontuais hoje.' },
    ],
    brazilianPitfallPt: 'Nunca coloque o segundo verbo conjugado! É "Ich kann Deutsch sprechen", e JAMAIS "Ich kann Deutsch spreche".',
    practiceExercises: [
      {
        id: 'g_mod_ex1',
        type: 'select_verb',
        level: 'A1',
        category: 'Modalverben',
        instructionPt: 'Complete com a forma correta do verbo "müssen" para a terceira pessoa:',
        question: 'Er ___ heute lange im Büro arbeiten.',
        options: ['muss', 'musst', 'müsst', 'müssen'],
        correctAnswer: 'muss',
        explanationPt: 'No singular de müssen para er/sie/es, a forma é "muss" (sem trema e sem a letra -t).',
        xp: 15,
      },
    ],
  },
  {
    id: 'g_wechselpraepositionen',
    level: 'A2',
    titlePt: 'Preposições de Lugar Bidirecionais (Wechselpräpositionen)',
    titleDe: 'Die Wechselpräpositionen (Akkusativ oder Dativ)',
    category: 'Preposições',
    shortSummaryPt: '9 preposições usam Akkusativ para movimento em direção a um destino (Wohin?) e Dativ para localização estática (Wo?).',
    fullExplanationPt: `As 9 preposições são: an, auf, hinter, in, neben, über, unter, vor, zwischen.

A regra fundamental:
1. WOHIN? (Para onde? - Deslocamento / Movimento em direção a algo) -> use AKKUSATIV!
   Ex: "Ich lege das Buch auf DEN Tisch." (Eu coloco o livro sobre a mesa - ação de colocar).
2. WO? (Onde? - Posição fixa / Estática) -> use DATIV!
   Ex: "Das Buch liegt auf DEM Tisch." (O livro está deitado sobre a mesa - estado parado).`,
    rulesList: [
      'Pares de verbos clássicos: stellen (colocar em pé - Akkusativ) vs stehen (estar em pé - Dativ).',
      'legen (colocar deitado - Akkusativ) vs liegen (estar deitado - Dativ).',
      'setzen (sentar algo/alguém - Akkusativ) vs sitzen (estar sentado - Dativ).',
      'hängen (pendurar - Akkusativ) vs hängen (estar pendurado - Dativ).',
    ],
    tables: [
      {
        header: ['Preposição', 'Significado', 'Wohin? (Akkusativ - Movimento)', 'Wo? (Dativ - Local estático)'],
        rows: [
          ['in', 'em / dentro de', 'Ich gehe in das (ins) Kino.', 'Ich bin in dem (im) Kino.'],
          ['auf', 'em cima / sobre', 'Ich stelle das Glas auf den Tisch.', 'Das Glas steht auf dem Tisch.'],
          ['an', 'junto a / na parede', 'Ich hänge das Bild an die Wand.', 'Das Bild hängt an der Wand.'],
          ['unter', 'debaixo de', 'Der Hund läuft unter das Bett.', 'Der Hund schläft unter dem Bett.'],
        ],
      },
    ],
    examples: [
      { german: 'Ich fahre in die Stadt.', portuguese: 'Eu vou para a cidade (Wohin? -> Akkusativ die Stadt).' },
      { german: 'Ich bin in der Stadt.', portuguese: 'Eu estou na cidade (Wo? -> Dativ der Stadt).' },
    ],
    brazilianPitfallPt: 'Cuidado com a fusão in + das = ins (Akkusativ) e in + dem = im (Dativ). "Ich gehe ins Bett" (vou pra cama) vs "Ich liege im Bett" (estou na cama).',
    practiceExercises: [
      {
        id: 'g_wech_ex1',
        type: 'multiple_choice',
        level: 'A2',
        category: 'Preposições',
        instructionPt: 'Complete indicando o local estático onde a pessoa está (Dativ):',
        question: 'Wir sind jetzt ___ Restaurant.',
        options: ['im', 'ins', 'in den', 'in die'],
        correctAnswer: 'im',
        explanationPt: 'Como estamos parados dentro do restaurante (Wo?), usamos Dativ: in + dem Restaurant = im Restaurant.',
        xp: 20,
      },
    ],
  },
  {
    id: 'g_adjektivdeklination',
    level: 'B1',
    titlePt: 'Declinação de Adjetivos (Adjektivdeklination)',
    titleDe: 'Die Deklination der Adjektive',
    category: 'Adjetivos',
    shortSummaryPt: 'Quando o adjetivo vem antes do substantivo, ele precisa receber uma terminação de acordo com o gênero, número e caso.',
    fullExplanationPt: `Existem 3 tipos de declinação de adjetivos:
1. Declinação Fraca (após artigo definido: der, die, das, den, dem...):
   - No Nominativ singular: adjetivo termina em -e (der gute Mann, die gute Frau, das gute Kind).
   - No Akkusativ masculino, em TODOS os Dativos e em TODOS os plurais: adjetivo termina SEMPRE em -en!
2. Declinação Mista (após artigo indefinido: ein, eine, ein / kein / mein):
   - Nominativ: ein gutER Mann, eine gutE Frau, ein gutES Kind.
   - Akkusativ: einen gutEN Mann, eine gutE Frau, ein gutES Kind.
   - Dativ & Plural: sempre -en (einem gutEN Mann, meinen gutEN Freunden).
3. Declinação Forte (sem nenhum artigo na frente - o adjetivo assume a terminação do artigo correspondente).`,
    rulesList: [
      'Se o adjetivo estiver DEPOIS do verbo sein, ele NUNCA declina (ex: "Der Mann ist gut").',
      'No Dativo com artigo, a terminação do adjetivo é SEMPRE -en.',
      'No Plural com artigo, a terminação do adjetivo é SEMPRE -en.',
    ],
    tables: [
      {
        header: ['Caso', 'Masculino (mit der)', 'Feminino (mit die)', 'Neutro (mit das)', 'Plural (mit die)'],
        rows: [
          ['Nominativ', 'der alt-e Baum', 'die schön-e Stadt', 'das neu-e Auto', 'die alt-en Bücher'],
          ['Akkusativ', 'den alt-en Baum', 'die schön-e Stadt', 'das neu-e Auto', 'die alt-en Bücher'],
          ['Dativ', 'dem alt-en Baum', 'der schön-en Stadt', 'dem neu-en Auto', 'den alt-en Büchern'],
        ],
      },
    ],
    examples: [
      { german: 'Ich trinke einen heißen Kaffee.', portuguese: 'Eu bebo um café quente (Akkusativ masc: heißen).' },
      { german: 'Das ist ein schönes Haus.', portuguese: 'Esta é uma linda casa (Nominativ neutro: schönes).' },
    ],
    brazilianPitfallPt: 'Nunca adicione terminação se o adjetivo for predicativo (depois do verbo sein): "Das Auto ist neu" (correto) vs "Das Auto ist neues" (incorreto).',
    practiceExercises: [
      {
        id: 'g_adj_ex1',
        type: 'fill_blank',
        level: 'B1',
        category: 'Adjetivos',
        instructionPt: 'Complete com a terminação correta do adjetivo:',
        question: 'Ich wünsche dir einen schön___ Tag!',
        options: ['en', 'e', 'es', 'em'],
        correctAnswer: 'en',
        explanationPt: 'Tag é masculino (der Tag), e no Akkusativ após "einen", a terminação do adjetivo é "-en" (einen schönen Tag).',
        xp: 20,
      },
    ],
  },
  {
    id: 'g_nebensaetze',
    level: 'A2',
    titlePt: 'Orações Subordinadas e Conjunções (weil, dass, wenn, ob)',
    titleDe: 'Nebensätze mit weil, dass, wenn',
    category: 'Estrutura da Frase',
    shortSummaryPt: 'Nas orações subordinadas introduzidas por weil, dass, wenn, o verbo conjugado vai OBRIGATORIAMENTE para o fim da frase.',
    fullExplanationPt: `As conjunções subordinativas mais importantes:
- weil = porque (explicação de motivo)
- dass = que (ex: "Eu sei que...")
- wenn = se / quando (condição ou tempo)
- ob = se (em perguntas indiretas: "não sei se...")
- obwohl = embora / apesar de que

A Regra do Verbo no Final (Verbletztstellung):
Em orações subordinadas, o verbo conjugado é empurrado para a ÚLTIMA posição da frase!
Exemplo:
- Frase normal: "Ich habe keine Zeit."
- Com WEIL: "Ich komme nicht, WEIL ich keine Zeit HABE." (o verbo habe vai para o fim).`,
    rulesList: [
      'Coloque sempre uma vírgula antes da conjunção subordinativa.',
      'O verbo conjugado deve ser a última palavra da oração subordinada.',
      'Se houver um verbo modal, ele fica no final após o infinitivo: "... weil ich heute arbeiten MUSS."',
    ],
    tables: [
      {
        header: ['Conjunção', 'Significado', 'Exemplo de Frase Subordinada'],
        rows: [
          ['weil', 'porque', 'Ich lerne Deutsch, weil ich in Deutschland leben möchte.'],
          ['dass', 'que', 'Ich weiß, dass Deutsch eine schöne Sprache ist.'],
          ['wenn', 'se / quando', 'Wenn das Wetter schön ist, gehen wir spazieren.'],
          ['ob', 'se (dúvida)', 'Ich weiß nicht, ob der Zug pünktlich kommt.'],
        ],
      },
    ],
    examples: [
      { german: 'Er bleibt zu Hause, weil er krank ist.', portuguese: 'Ele fica em casa porque está doente.' },
      { german: 'Ich hoffe, dass alles gut klappt.', portuguese: 'Espero que tudo dê certo.' },
    ],
    brazilianPitfallPt: 'Nunca coloque o verbo logo após "weil" como fazemos em português ("porque ele está doente" -> "weil er ist krank" é ERRO GRAVE! O correto é "weil er krank ist").',
    practiceExercises: [
      {
        id: 'g_neb_ex1',
        type: 'order_words',
        level: 'A2',
        category: 'Nebensätze',
        instructionPt: 'Organize as palavras na ordem gramatical correta com "weil":',
        question: 'Organize a frase com o verbo no final:',
        wordTiles: ['Ich', 'lerne,', 'weil', 'ich', 'einen', 'Job', 'suche.'],
        correctAnswer: 'Ich lerne, weil ich einen Job suche.',
        explanationPt: 'Na oração com "weil", o verbo conjugado "suche" fica no final da oração.',
        xp: 25,
      },
    ],
  },
  {
    id: 'g_konjunktiv_ii',
    level: 'B1',
    titlePt: 'O Modo Cortês e Hipotético (Konjunktiv II - würde, hätte, wäre, könnte)',
    titleDe: 'Der Konjunktiv II',
    category: 'Modos Verbais',
    shortSummaryPt: 'Usado para pedidos educados, desejos, conselhos e situações hipotéticas ("se eu tivesse...", "eu gostaria de...").',
    fullExplanationPt: `O Konjunktiv II é essencial na Alemanha para soar educado em lojas, restaurantes, prefeitura e trabalho!

As 4 formas mais comuns no dia a dia:
1. Pedidos com WÜRDE + infinitivo:
   - "Ich würde gern bezahlen." (Eu gostaria de pagar.)
   - "Würden Sie mir bitte helfen?" (O senhor/a senhora poderia por favor me ajudar?)
2. WÄRE (de sein = seria / estaria):
   - "Das wäre super!" (Isso seria ótimo!)
   - "Wenn ich reich wäre..." (Se eu fosse rico...)
3. HÄTTE (de haben = teria):
   - "Ich hätte gern einen Kaffee." (Eu gostaria / pediria um café.)
   - "Ich hätte eine Frage." (Eu teria uma pergunta.)
4. KÖNNTE (de können = poderia):
   - "Könnten Sie das bitte wiederholen?" (Poderia por favor repetir?)`,
    rulesList: [
      'Use "hätte gern" ou "möchte" para fazer pedidos educados em restaurantes e padarias.',
      'Use "Könnten Sie..." para solicitar favores com gentileza máxima.',
      'Para dar conselhos, use "Du solltest..." (Você deveria...).',
    ],
    tables: [
      {
        header: ['Forma Direta / Imperativa', 'Forma Educada (Konjunktiv II)', 'Tradução em Português'],
        rows: [
          ['Geben Sie mir einen Kaffee!', 'Ich hätte gern einen Kaffee, bitte.', 'Eu gostaria de um café, por favor.'],
          ['Helfen Sie mir!', 'Könnten Sie mir bitte helfen?', 'Poderia por favor me ajudar?'],
          ['Wiederholen Sie das!', 'Würden Sie das bitte wiederholen?', 'Você se importaria de repetir isso?'],
        ],
      },
    ],
    examples: [
      { german: 'Ich hätte gern ein Wasser ohne Kohlensäure.', portuguese: 'Eu gostaria de uma água sem gás, por favor.' },
      { german: 'Könnten Sie mir sagen, wo das Bürgeramt ist?', portuguese: 'Poderia me dizer onde fica a prefeitura?' },
    ],
    brazilianPitfallPt: 'Evite pedir comida dizendo "Ich will..." (soa muito rude ou infantil). Diga sempre "Ich hätte gern..." ou "Ich möchte...".',
    practiceExercises: [
      {
        id: 'g_konj_ex1',
        type: 'multiple_choice',
        level: 'B1',
        category: 'Konjunktiv II',
        instructionPt: 'Como pedir um café de forma educada em uma cafeteria alemã?',
        question: 'Escolha a opção mais cortês e natural:',
        options: ['Ich hätte gern einen Kaffee, bitte.', 'Ich will einen Kaffee!', 'Gib mir Kaffee sofort.', 'Kaffee haben.'],
        correctAnswer: 'Ich hätte gern einen Kaffee, bitte.',
        explanationPt: '"Ich hätte gern..." é a fórmula padrão da cortesia alemã.',
        xp: 20,
      },
    ],
  },
  {
    id: 'g_passiv',
    level: 'B2',
    titlePt: 'A Voz Passiva (Das Passiv mit werden)',
    titleDe: 'Das Passiv',
    category: 'Voz Passiva',
    shortSummaryPt: 'Muito usada na Alemanha em documentos formais, manuais, notícias e ambiente corporativo.',
    fullExplanationPt: `Na voz passiva, o foco está na AÇÃO realizada e não em quem a executou.

Formação da Voz Passiva de Processo (Vorgangspassiv):
[werden conjugado na posição 2] + [...] + [Partizip II no final da frase]

Exemplos nos tempos verbais:
- Presente: "Das Auto WIRD repariert." (O carro está sendo consertado.)
- Passado (Präteritum): "Das Auto WURDE repariert." (O carro foi consertado.)
- Perfekt: "Das Auto ist repariert WORDEN." (O carro foi consertado - note que usa worden e não geworden!).`,
    rulesList: [
      'Agente da passiva com pessoa/instituição: usa a preposição VON + Dativ ("vom Arzt", "von der Firma").',
      'Agente da passiva com meio/instrumento: usa a preposição DURCH + Akkusativ ("durch einen Unfall").',
    ],
    tables: [
      {
        header: ['Tempo Verbal', 'Estrutura', 'Exemplo'],
        rows: [
          ['Präsens', 'wird + Partizip II', 'Die E-Mail wird heute geschickt.'],
          ['Präteritum', 'wurde + Partizip II', 'Das Haus wurde 1990 gebaut.'],
          ['Perfekt', 'ist + Partizip II + worden', 'Der Vertrag ist unterschrieben worden.'],
          ['Mit Modalverb', 'muss + Partizip II + werden', 'Das Dokument muss unterschrieben werden.'],
        ],
      },
    ],
    examples: [
      { german: 'Die Anmeldung muss innerhalb von zwei Wochen gemacht werden.', portuguese: 'O registro de endereço deve ser feito dentro de duas semanas.' },
      { german: 'Deutsch wird in Deutschland, Österreich und der Schweiz gesprochen.', portuguese: 'O alemão é falado na Alemanha, Áustria e Suíça.' },
    ],
    brazilianPitfallPt: 'No Perfekt da voz passiva, o partizípio de werden é SEMPRE "worden" (sem o prefixo ge-).',
    practiceExercises: [
      {
        id: 'g_pas_ex1',
        type: 'multiple_choice',
        level: 'B2',
        category: 'Passiv',
        instructionPt: 'Complete a frase na voz passiva com verbo modal:',
        question: 'Die Rechnung muss bis Freitag bezahlt ___.',
        options: ['werden', 'worden', 'wurde', 'wird'],
        correctAnswer: 'werden',
        explanationPt: 'Com verbo modal ("muss"), o verbo auxiliar da passiva vai para o infinitivo no final da frase: "bezahlt werden".',
        xp: 25,
      },
    ],
  },
  {
    id: 'g_tekamolo',
    level: 'B1',
    titlePt: 'Ordem dos Advérbios e Complementos (Regra TeKaMoLo)',
    titleDe: 'Die Wortstellung TeKaMoLo',
    category: 'Estrutura da Frase',
    shortSummaryPt: 'A ordem padrão dos complementos em alemão: Temporal (quando?), Kausal (por quê?), Modal (como?), Lokal (onde/para onde?).',
    fullExplanationPt: `Quando uma frase possui múltiplos complementos circunstanciais, a ordem padrão natural do alemão segue a sigla Te-Ka-Mo-Lo:
1. Temporal (Te) = Quando? / Duração / Frequência (ex: heute, um 10 Uhr, jeden Tag).
2. Kausal (Ka) = Por que motivo? (ex: wegen des Wetters, aus Liebe).
3. Modal (Mo) = De que modo? / Com quem? / Por qual meio? (ex: mit dem Zug, gerne, schnell).
4. Lokal (Lo) = Onde? / Para onde? (ex: nach Berlin, im Büro, zu Hause).

Exemplo completo:
"Ich fahre [heute - Te] [wegen der Konferenz - Ka] [mit dem ICE - Mo] [nach München - Lo]."` ,
    rulesList: [
      'Tempo sempre vem antes de Lugar (Te antes de Lo).',
      'Modo (como/com quem) vem antes de Lugar (Mo antes de Lo).',
    ],
    tables: [
      {
        header: ['Te (Temporal)', 'Ka (Kausal)', 'Mo (Modal)', 'Lo (Lokal)'],
        rows: [
          ['morgen', 'wegen der Arbeit', 'mit dem Bus', 'nach Frankfurt'],
          ['jeden Abend', 'aus Neugier', 'sehr fleißig', 'zu Hause'],
        ],
      },
    ],
    examples: [
      { german: 'Ich gehe heute (Te) mit Freunden (Mo) ins Restaurant (Lo).', portuguese: 'Eu vou hoje com amigos ao restaurante.' },
    ],
    brazilianPitfallPt: 'Em português é comum dizer "Eu vou para Munique hoje" (Lugar antes do Tempo). Em alemão isso soa muito estranho: coloque SEMPRE o tempo antes do lugar ("Ich fahre heute nach München").',
    practiceExercises: [
      {
        id: 'g_tek_ex1',
        type: 'multiple_choice',
        level: 'B1',
        category: 'TeKaMoLo',
        instructionPt: 'Qual frase respeita a ordem TeKaMoLo (Tempo antes de Lugar)?',
        question: 'Escolha a ordem mais natural em alemão:',
        options: [
          'Ich fahre morgen nach Berlin.',
          'Ich fahre nach Berlin morgen.',
          'Nach Berlin fahre morgen ich.',
          'Ich morgen fahre nach Berlin.',
        ],
        correctAnswer: 'Ich fahre morgen nach Berlin.',
        explanationPt: '"Morgen" (Temporal) deve vir antes de "nach Berlin" (Lokal).',
        xp: 20,
      },
    ],
  },
];
