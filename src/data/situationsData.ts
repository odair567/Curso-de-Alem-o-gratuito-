import { SituationDialogue } from '../types';

export const initialSituationsData: SituationDialogue[] = [
  {
    id: 'sit_buergeramt',
    titlePt: 'No Bürgeramt (Anmeldung & Burocracia)',
    titleDe: 'Im Bürgeramt (Wohnsitzanmeldung)',
    category: 'bureaucracy',
    location: 'Prefeitura / Bürgeramt em Berlim ou Munique',
    level: 'A1',
    icon: 'Building2',
    descriptionPt: 'Aprenda a fazer o registro oficial de residência (Anmeldung), obrigatório para morar, trabalhar ou abrir conta na Alemanha.',
    culturalTipsPt: 'Na Alemanha, a pontualidade é rigorosa. Chegue 10 minutos antes do horário agendado (Termin) e tenha em mãos seu passaporte e a confirmação do proprietário (Wohnungsgeberbestätigung).',
    contextScenarioPt: 'Você está no guichê do funcionário público (Beamter) para registrar seu endereço na cidade.',
    userRolePt: 'Novo residente brasileiro',
    aiRoleDe: 'Mitarbeiter im Bürgeramt (Funcionário público)',
    usefulPhrases: [
      {
        german: 'Guten Tag, ich habe einen Termin für die Wohnsitzanmeldung um 10 Uhr.',
        portuguese: 'Bom dia, tenho um agendamento para registro de residência às 10 horas.',
      },
      {
        german: 'Hier sind mein Reisepass und die Wohnungsgeberbestätigung.',
        portuguese: 'Aqui estão meu passaporte e o comprovante do proprietário.',
      },
      {
        german: 'Könnten Sie mir bitte die Meldebestätigung ausstellen?',
        portuguese: 'Poderia por favor emitir o meu comprovante de registro?',
      },
      {
        german: 'Gehören Sie einer Religionsgemeinschaft an? - Nein, keine.',
        portuguese: 'Você pertence a alguma comunidade religiosa? - Não, nenhuma (para não pagar imposto de igreja Kirchensteuer).',
      },
    ],
    sampleDialogue: [
      {
        speaker: 'Herr Schmidt (Mitarbeiter)',
        german: 'Guten Tag! Haben Sie eine Wartenummer oder einen Termin?',
        portuguese: 'Bom dia! O senhor tem uma senha ou um agendamento?',
      },
      {
        speaker: 'Você (Aluno)',
        german: 'Guten Tag! Ja, mein Name ist Silva. Ich habe einen Termin für die Anmeldung.',
        portuguese: 'Bom dia! Sim, meu nome é Silva. Tenho um agendamento para o registro.',
      },
      {
        speaker: 'Herr Schmidt (Mitarbeiter)',
        german: 'Sehr gut. Bitte geben Sie mir Ihren Reisepass und das ausgefüllte Formular.',
        portuguese: 'Muito bem. Por favor, me dê seu passaporte e o formulário preenchido.',
      },
      {
        speaker: 'Você (Aluno)',
        german: 'Hier bitte, und hier ist auch die Bescheinigung vom Vermieter.',
        portuguese: 'Aqui está, por favor, e aqui também está a declaração do proprietário.',
      },
    ],
  },
  {
    id: 'sit_supermarkt',
    titlePt: 'No Supermercado & Padaria',
    titleDe: 'Im Supermarkt und in der Bäckerei',
    category: 'daily_life',
    location: 'Supermercado (Rewe/Edeka/Aldi) e Bäckerei',
    level: 'A1',
    icon: 'ShoppingCart',
    descriptionPt: 'Como pedir pães na padaria, pesar frutas, perguntar onde estão os produtos e passar pelo caixa com agilidade.',
    culturalTipsPt: 'Nos caixas alemães, o ritmo é muito rápido! Já tenha sua sacola pronta (ou compre uma no início da esteira) e embale suas compras com agilidade. Para garrafas com retorno (Pfand), use a máquina na entrada antes de fazer as compras.',
    contextScenarioPt: 'Você está fazendo compras e no caixa precisa pagar com cartão e pedir a nota fiscal.',
    userRolePt: 'Cliente',
    aiRoleDe: 'Kassierer(in) / Verkäufer(in) (Caixa / Vendedor)',
    usefulPhrases: [
      {
        german: 'Entschuldigung, wo finde ich die Milch?',
        portuguese: 'Com licença, onde encontro o leite?',
      },
      {
        german: 'Ich hätte gern zwei Brötchen und ein Vollkornbrot, bitte.',
        portuguese: 'Eu gostaria de dois pãezinhos e um pão integral, por favor.',
      },
      {
        german: 'Kann ich mit Karte zahlen? - Mit Karte bitte!',
        portuguese: 'Posso pagar com cartão? - No cartão, por favor!',
      },
      {
        german: 'Brauchen Sie den Kassenbon? - Ja, bitte. / Nein, danke.',
        portuguese: 'Precisa da nota fiscal? - Sim, por favor. / Não, obrigado.',
      },
    ],
    sampleDialogue: [
      {
        speaker: 'Verkäuferin',
        german: 'Hallo, was darf es für Sie sein?',
        portuguese: 'Olá, o que posso servir para você?',
      },
      {
        speaker: 'Você (Aluno)',
        german: 'Hallo! Ich hätte gern zwei frische Laugenbrötchen, bitte.',
        portuguese: 'Olá! Eu gostaria de dois pãezinhos de pretzel frescos, por favor.',
      },
      {
        speaker: 'Verkäuferin',
        german: 'Gern. Sonst noch etwas?',
        portuguese: 'Com prazer. Mais alguma coisa?',
      },
      {
        speaker: 'Você (Aluno)',
        german: 'Nein, danke, das ist alles. Kann ich mit Karte bezahlen?',
        portuguese: 'Não, obrigado, isso é tudo. Posso pagar com cartão?',
      },
    ],
  },
  {
    id: 'sit_arzt',
    titlePt: 'No Médico & Consultório',
    titleDe: 'Beim Arzt (Praxis)',
    category: 'health',
    location: 'Consultório médico (Arztpraxis)',
    level: 'A2',
    icon: 'Stethoscope',
    descriptionPt: 'Como marcar consulta, descrever sintomas em alemão (dor de cabeça, febre, tosse) e solicitar atestado médico (Krankschreibung/AU).',
    culturalTipsPt: 'Na Alemanha, você geralmente precisa de um "Hausarzt" (médico da família) para a primeira triagem. Se faltar ao trabalho por doença, você precisará da "Arbeitsunfähigkeitsbescheinigung" (AU) emitida pelo médico.',
    contextScenarioPt: 'Você está no consultório com sintomas de gripe e precisa de orientação e receita.',
    userRolePt: 'Paciente',
    aiRoleDe: 'Dr. Weber (Médico / Hausarzt)',
    usefulPhrases: [
      {
        german: 'Ich fühle mich seit zwei Tagen nicht gut.',
        portuguese: 'Não estou me sentindo bem há dois dias.',
      },
      {
        german: 'Ich habe starke Halsschmerzen und Fieber.',
        portuguese: 'Estou com muita dor de garganta e febre.',
      },
      {
        german: 'Mein Kopf tut weh und ich habe Husten.',
        portuguese: 'Minha cabeça dói e estou com tosse.',
      },
      {
        german: 'Ich brauche eine Krankschreibung für meinen Arbeitgeber.',
        portuguese: 'Preciso de um atestado médico para o meu empregador.',
      },
    ],
    sampleDialogue: [
      {
        speaker: 'Dr. Weber',
        german: 'Guten Tag! Was fehlt Ihnen denn? Wo haben Sie Schmerzen?',
        portuguese: 'Bom dia! O que está sentindo? Onde está doendo?',
      },
      {
        speaker: 'Você (Aluno)',
        german: 'Guten Tag, Herr Doktor. Ich habe seit gestern hohes Fieber und starke Halsschmerzen.',
        portuguese: 'Bom dia, doutor. Tenho febre alta e muita dor de garganta desde ontem.',
      },
      {
        speaker: 'Dr. Weber',
        german: 'Ich untersuche jetzt Ihren Hals. Bitte machen Sie den Mund weit auf und sagen Sie "Ah".',
        portuguese: 'Vou examinar sua garganta agora. Por favor, abra bem a boca e diga "Ah".',
      },
    ],
  },
  {
    id: 'sit_wohnungssuche',
    titlePt: 'Aluguel de Apartamento & Visita',
    titleDe: 'Wohnungsbesichtigung & Miete',
    category: 'housing',
    location: 'Apartamento para alugar (Wohnungsbesichtigung)',
    level: 'B1',
    icon: 'Home',
    descriptionPt: 'Perguntas cruciais sobre Warmmiete/Kaltmiete, contas de aquecimento (Nebenkosten), caução (Kaution) e cozinha embutida (EBK).',
    culturalTipsPt: 'Na Alemanha, a maioria dos apartamentos é alugada sem cozinha! Se o anúncio tiver "EBK" (Einbauküche), significa que já possui armários e fogão instalados. A "Kaltmiete" é o aluguel bruto; a "Warmmiete" inclui condomínio e aquecimento.',
    contextScenarioPt: 'Você está conversando com o proprietário/corretor durante a visita a um apartamento.',
    userRolePt: 'Interessado no aluguel (Mieter)',
    aiRoleDe: 'Vermieter / Makler (Proprietário / Corretor)',
    usefulPhrases: [
      {
        german: 'Wie hoch ist die Warmmiete inklusive Nebenkosten und Heizung?',
        portuguese: 'Qual o valor do aluguel total incluindo condomínio e aquecimento?',
      },
      {
        german: 'Ist eine Einbauküche vorhanden oder muss ich eine kaufen?',
        portuguese: 'Há uma cozinha planejada inclusa ou preciso comprar uma?',
      },
      {
        german: 'Wie hoch ist die Kaution? Sind es drei Monatskaltmieten?',
        portuguese: 'Qual o valor da caução? São três meses de aluguel básico?',
      },
      {
        german: 'Hier ist meine vollständige Bewerbungsmappe mit Schufa und Gehaltsnachweisen.',
        portuguese: 'Aqui está minha pasta de candidatura completa com Schufa e comprovantes de salário.',
      },
    ],
    sampleDialogue: [
      {
        speaker: 'Herr Bauer (Vermieter)',
        german: 'Herzlich willkommen zur Besichtigung. Wie gefällt Ihnen die Wohnung?',
        portuguese: 'Seja muito bem-vindo à visita. O que achou do apartamento?',
      },
      {
        speaker: 'Você (Aluno)',
        german: 'Die Wohnung ist sehr hell und gut geschnitten. Sind Haustiere erlaubt?',
        portuguese: 'O apartamento é muito iluminado e bem dividido. Animais de estimação são permitidos?',
      },
      {
        speaker: 'Herr Bauer (Vermieter)',
        german: 'Kleine Haustiere sind kein Problem. Haben Sie Ihre Schufa-Auskunft dabei?',
        portuguese: 'Pequenos animais não são problema. O senhor trouxe sua certidão da Schufa?',
      },
    ],
  },
  {
    id: 'sit_vorstellungsgespraech',
    titlePt: 'Entrevista de Emprego',
    titleDe: 'Das Vorstellungsgespräch',
    category: 'work',
    location: 'Empresa / Sala de reunião',
    level: 'B2',
    icon: 'Briefcase',
    descriptionPt: 'Como se apresentar profissionalmente, destacar sua experiência e responder a perguntas sobre suas qualificações.',
    culturalTipsPt: 'Apresente fatos concretos e objetivos sobre seus projetos anteriores. Os alemães valorizam clareza técnica, honestidade sobre o que você sabe ou não sabe, e perguntas inteligentes sobre a dinâmica da equipe.',
    contextScenarioPt: 'Você está sendo entrevistado pelo gestor de contratação para uma vaga na sua área.',
    userRolePt: 'Candidato(a)',
    aiRoleDe: 'Personalverantwortlicher / Teamleiter (Entrevistador / Gestor)',
    usefulPhrases: [
      {
        german: 'Vielen Dank für die Einladung zum Vorstellungsgespräch.',
        portuguese: 'Muito obrigado pelo convite para a entrevista de emprego.',
      },
      {
        german: 'In meiner bisherigen Position war ich für internationale Projekte zuständig.',
        portuguese: 'Na minha posição anterior, eu era responsável por projetos internacionais.',
      },
      {
        german: 'Ich kann mich schnell in neue Technologien und Arbeitsweisen einarbeiten.',
        portuguese: 'Consigo me adaptar rapidamente a novas tecnologias e metodologias de trabalho.',
      },
      {
        german: 'Wie sieht die typische Einarbeitungsphase in Ihrem Team aus?',
        portuguese: 'Como é a fase típica de integração / onboarding na sua equipe?',
      },
    ],
    sampleDialogue: [
      {
        speaker: 'Frau Becker (Interviewer)',
        german: 'Guten Tag! Schön, dass Sie da sind. Erzählen Sie uns bitte kurz etwas über sich.',
        portuguese: 'Bom dia! Que bom que você está aqui. Conte-nos por favor brevemente sobre você.',
      },
      {
        speaker: 'Você (Aluno)',
        german: 'Guten Tag, Frau Becker. Ich bin Softwareentwickler aus Brasilien mit 5 Jahren Erfahrung.',
        portuguese: 'Bom dia, Sra. Becker. Sou desenvolvedor de software do Brasil com 5 anos de experiência.',
      },
    ],
  },
  {
    id: 'sit_restaurant',
    titlePt: 'No Restaurante',
    titleDe: 'Im Restaurant',
    category: 'daily_life',
    location: 'Restaurante tradicional alemão ou internacional',
    level: 'A1',
    icon: 'Utensils',
    descriptionPt: 'Pedir mesa, escolher pratos e bebidas, pedir a conta e entender a gorjeta (Trinkgeld).',
    culturalTipsPt: 'Na Alemanha, a gorjeta habitual gira em torno de 5% a 10%. Ao pagar, você diz o valor arredondado diretamente ao garçom (ex: a conta deu 22€, você entrega uma nota de 25€ e diz "24 Euro, bitte" ou "Stimmt so" se quiser deixar os 25€).',
    contextScenarioPt: 'Você está almoçando em um restaurante e deseja fazer o pedido e depois pagar separadamente.',
    userRolePt: 'Cliente',
    aiRoleDe: 'Kellner(in) (Garçom)',
    usefulPhrases: [
      {
        german: 'Haben Sie einen Tisch für zwei Personen frei?',
        portuguese: 'Vocês têm uma mesa livre para duas pessoas?',
      },
      {
        german: 'Ich nehme das Schnitzel mit Kartoffelsalat, bitte.',
        portuguese: 'Eu vou querer o Schnitzel com salada de batatas, por favor.',
      },
      {
        german: 'Wir möchten bitte zahlen. Zusammen oder getrennt? - Getrennt, bitte.',
        portuguese: 'Nós gostaríamos de pagar, por favor. Junto ou separado? - Separado, por favor.',
      },
      {
        german: 'Stimmt so! (Das Trinkgeld ist inklusive).',
        portuguese: 'Pode ficar com o troco! (Está certo assim).',
      },
    ],
    sampleDialogue: [
      {
        speaker: 'Kellner',
        german: 'Guten Abend! Was darf ich Ihnen zu trinken bringen?',
        portuguese: 'Boa noite! O que posso trazer para beber?',
      },
      {
        speaker: 'Você (Aluno)',
        german: 'Guten Abend! Ein großes Mineralwasser mit Kohlensäure und ein Apfelschorle, bitte.',
        portuguese: 'Boa noite! Uma água mineral com gás grande e um suco de maçã com água com gás (Apfelschorle), por favor.',
      },
    ],
  },
  {
    id: 'sit_apotheke',
    titlePt: 'Na Farmácia',
    titleDe: 'In der Apotheke',
    category: 'health',
    location: 'Farmácia com o símbolo vermelho "A"',
    level: 'A2',
    icon: 'Cross',
    descriptionPt: 'Como comprar analgésicos, entender receitas médicas (Rezept) e pedir produtos sem prescrição.',
    culturalTipsPt: 'Na Alemanha, remédios comuns como paracetamol e ibuprofeno NÃO são vendidos em supermercados, apenas na "Apotheke" (identificada por um grande "A" vermelho). Receitas vermelhas são do convênio público (Krankenkasse); receitas verdes/azuis são particulares.',
    contextScenarioPt: 'Você precisa de um xarope para tosse e pastilhas para dor de garganta.',
    userRolePt: 'Cliente',
    aiRoleDe: 'Apotheker(in) (Farmacêutico)',
    usefulPhrases: [
      {
        german: 'Ich brauche etwas gegen Halsschmerzen und Husten.',
        portuguese: 'Preciso de algo contra dor de garganta e tosse.',
      },
      {
        german: 'Haben Sie ein rezeptfreies Schmerzmittel?',
        portuguese: 'Você tem um analgésico que não precisa de receita?',
      },
      {
        german: 'Wie oft am Tag soll ich diese Tabletten einnehmen?',
        portuguese: 'Quantas vezes ao dia devo tomar esses comprimidos?',
      },
    ],
    sampleDialogue: [
      {
        speaker: 'Apothekerin',
        german: 'Guten Tag, wie kann ich Ihnen helfen?',
        portuguese: 'Bom dia, como posso ajudar você?',
      },
      {
        speaker: 'Você (Aluno)',
        german: 'Hallo, ich habe starke Kopfschmerzen. Haben Sie Ibuprofen da?',
        portuguese: 'Olá, estou com forte dor de cabeça. Vocês têm Ibuprofeno?',
      },
    ],
  },
  {
    id: 'sit_bahnhof',
    titlePt: 'Na Estação de Trem & Transporte',
    titleDe: 'Am Bahnhof & Öffentlicher Nahverkehr',
    category: 'daily_life',
    location: 'Estação Central (Hauptbahnhof) ou Metrô (U-Bahn / S-Bahn)',
    level: 'A1',
    icon: 'Train',
    descriptionPt: 'Comprar passagens, entender atrasos (Verspätung), trocar de plataforma (Gleis) e usar o Deutschlandticket.',
    culturalTipsPt: 'Fique muito atento aos anúncios no trem e na estação: "Gleiswechsel" significa mudança de plataforma; "Verspätung" significa atraso. O "Deutschlandticket" permite usar quase todo o transporte regional por um valor fixo mensal.',
    contextScenarioPt: 'Você precisa comprar uma passagem para outra cidade e perguntar sobre o horário e plataforma.',
    userRolePt: 'Passageiro',
    aiRoleDe: 'DB Mitarbeiter / Fahrkartenautomat (Atendente da ferrovia)',
    usefulPhrases: [
      {
        german: 'Von welchem Gleis fährt der Zug nach Frankfurt ab?',
        portuguese: 'De qual plataforma parte o trem para Frankfurt?',
      },
      {
        german: 'Hat der ICE nach Berlin Verspätung?',
        portuguese: 'O trem de alta velocidade (ICE) para Berlim está atrasado?',
      },
      {
        german: 'Muss ich auf der Strecke umsteigen?',
        portuguese: 'Eu preciso fazer baldeação / trocar de trem no trajeto?',
      },
    ],
    sampleDialogue: [
      {
        speaker: 'DB Mitarbeiter',
        german: 'Guten Tag, DB Reisezentrum. Wohin möchten Sie fahren?',
        portuguese: 'Bom dia, Central de viagens da DB. Para onde o senhor gostaria de ir?',
      },
      {
        speaker: 'Você (Aluno)',
        german: 'Guten Tag. Eine einfache Fahrt nach Köln für heute Nachmittag, bitte.',
        portuguese: 'Bom dia. Uma viagem só de ida para Colônia para hoje à tarde, por favor.',
      },
    ],
  },
];
