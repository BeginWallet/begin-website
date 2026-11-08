// Landing page copy in every language the Begin app supports.
// English is the source (from the "Landing · step 0 · dollar account" canvas board).
// The other languages are machine translations that still need a native speaker's review.
// App terms (Home, Add, Cash out, Me, secret words…) follow the app's own translations
// in b58-extension src/locale/messages so the site and the app say the same thing.

export const LOCALES = ['en', 'es', 'pt-BR', 'id', 'zh-Hans', 'zh-Hant'] as const
export type Locale = (typeof LOCALES)[number]

export const LOCALE_NAMES: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  'pt-BR': 'Português (Brasil)',
  id: 'Bahasa Indonesia',
  'zh-Hans': '简体中文',
  'zh-Hant': '繁體中文',
}

// Open Graph locale tags.
export const OG_LOCALE: Record<Locale, string> = {
  en: 'en_US',
  es: 'es_LA',
  'pt-BR': 'pt_BR',
  id: 'id_ID',
  'zh-Hans': 'zh_CN',
  'zh-Hant': 'zh_TW',
}

export const toLocale = (l?: string): Locale =>
  (LOCALES as readonly string[]).includes(l || '') ? (l as Locale) : 'en'

type TB = { t: string; b: string }

export type Copy = {
  meta: { title: string; description: string }
  nav: { home: string; main: string; how: string; yours: string; fees: string; help: string; get: string }
  hero: {
    h1: string
    lead: string
    note: string
    photoAlt: string
    phoneLabel: string
    yourDollars: string
    actions: [string, string, string, string]
    euros: string
    earn: string
    earnOff: string
    tabs: [string, string, string, string]
    toastTitle: string
    toastSub: string
  }
  glance: { label: string; items: TB[] }
  how: { h: string; lead: string; step: string; steps: (TB & { tag: string })[] }
  yours: { h: string; lead: string; facts: TB[] }
  more: { h: string; items: TB[] }
  invite: { eyebrow: string; h: string; body: string; small: string; photoAlt: string; chip: string }
  fees: { h: string; lead: string; rows: { k: string; v: string }[] }
  faq: { h: string; lead: string; help: string; items: { q: string; a: string }[] }
  get: { h: string; lead: string; note: string; links: { t: string; s: string }[] }
  footer: {
    nav: string
    links: [string, string, string, string, string, string, string]
    cookies: string
    language: string
    legal: string
    registered: string
    vat: string
  }
  cookie: { title: string; body: string; privacy: string; accept: string; reject: string }
}

const en: Copy = {
  meta: {
    title: 'Begin: a dollar account only you can open',
    description:
      'Hold digital dollars on your phone, send them free to anyone on Begin in about five seconds, and cash out to your bank. Begin can’t move your money. iPhone, Android and Chrome.',
  },
  nav: {
    home: 'Begin home',
    main: 'Main',
    how: 'How it works',
    yours: 'Only yours',
    fees: 'Fees',
    help: 'Help',
    get: 'Get Begin',
  },
  hero: {
    h1: 'Only you can open it',
    lead: 'A dollar account on your phone, in digital dollars. Hold them, send them free to anyone on Begin in about five seconds, and cash out to your bank when you need to. Begin can’t move your money.',
    note: 'Free to download · iPhone, Android and Chrome',
    photoAlt: 'A young woman smiling at her laptop by a sunny window',
    phoneLabel: 'The Begin app Home screen: $2,400.00 in your dollars, with Add, Send, Receive and Cash out',
    yourDollars: 'Your dollars',
    actions: ['Add', 'Send', 'Receive', 'Cash out'],
    euros: 'euros',
    earn: 'Earn on your dollars',
    earnOff: 'Off until you turn it on',
    tabs: ['Home', 'Convert', 'Earn', 'Activity'],
    toastTitle: '+$50.00 from @maria',
    toastSub: 'Arrived in 5 seconds · free',
  },
  glance: {
    label: 'At a glance',
    items: [
      { t: 'Free on Begin', b: 'No fee to send dollars to anyone on Begin' },
      { t: 'About 5 seconds', b: 'From your phone to theirs' },
      { t: 'Every fee up front', b: 'Shown before you add money or cash out' },
      { t: 'Only you can open it', b: 'Begin never holds your money' },
    ],
  },
  how: {
    h: 'Add dollars. Send them. Cash out',
    lead: 'Your balance is USDC, a digital dollar. One USDC is meant to be worth one US dollar, and it sits in a wallet on Solana that only you control.',
    step: 'Step',
    steps: [
      {
        t: 'Add dollars',
        b: 'Buy with your card or bank through our partner’s checkout, or move USDC in from another app or exchange.',
        tag: 'From another app: free on Begin',
      },
      {
        t: 'Send to anyone on Begin',
        b: 'Pick a @name, a contact or scan a QR code. The dollars land in their Begin in about five seconds.',
        tag: 'Free, every time',
      },
      {
        t: 'Cash out to your bank',
        b: 'Turn dollars back into money in your bank account. You see the full fee and what lands before you confirm.',
        tag: 'Fee shown first',
      },
    ],
  },
  yours: {
    h: 'Begin can’t move your money',
    lead: 'Begin isn’t a bank, and it doesn’t hold your dollars. They sit in a wallet on your phone. If a company closes or freezes its app, your wallet still opens, because only you have the way in.',
    facts: [
      {
        t: 'Only you hold the keys',
        b: 'Your 15 secret words open your wallet. Begin never sees them and can’t move your money.',
      },
      { t: 'Lose your phone, keep your dollars', b: 'Your 15 words bring your wallet back on a new phone.' },
      {
        t: 'Dollars, one for one',
        b: 'USDC is issued by Circle. Each one is meant to be worth one US dollar, backed by cash and short-term US government debt.',
      },
      {
        t: 'Honest about the trade-offs',
        b: 'USDC isn’t a bank deposit and has no deposit guarantee. Keep your 15 words safe: nobody, not even Begin, can restore them for you.',
      },
    ],
  },
  more: {
    h: 'Also in the app',
    items: [
      {
        t: 'Convert',
        b: 'Turn other coins into dollars, or dollars into coins, at the best price we can find. You approve with Face ID.',
      },
      {
        t: 'Earn',
        b: 'Put dollars or coins to work from your own wallet. Off until you turn it on. Rates move and aren’t promised.',
      },
      { t: 'eSIM for travel', b: 'Mobile data in other countries, paid from your dollars. Under Me.' },
      { t: 'Your other coins', b: 'Cardano, Bitcoin, NFTs and the apps you connect to are still here, under Me.' },
    ],
  },
  invite: {
    eyebrow: 'Invite a friend',
    h: 'They get $2. You get $1',
    body: 'Paid in dollars once your friend adds $20 or more, keeps it for 7 days and sends once on Begin. Up to 10 friends.',
    small: 'Money you send your friend doesn’t count toward their $20.',
    photoAlt: 'A woman in her kitchen smiling at her phone',
    chip: 'Added to your dollars',
  },
  fees: {
    h: 'Fees, before you pay',
    lead: 'Moving dollars inside Begin is free. When money comes in from a card or goes out to a bank, our partner charges a fee, and you see all of it before you confirm.',
    rows: [
      { k: 'Send dollars to anyone on Begin', v: 'Free' },
      { k: 'Move dollars in from another app', v: 'Free on Begin' },
      { k: 'Add money with a card or bank', v: 'Partner fee, shown first' },
      { k: 'Cash out to your bank', v: 'Partner fee, shown first' },
      { k: 'Convert other coins to dollars', v: 'Included in the rate, shown first' },
    ],
  },
  faq: {
    h: 'Questions',
    lead: 'Help at any hour. Ask Begin answers 24/7, and our team steps in when you need a person.',
    help: 'Get help',
    items: [
      {
        q: 'Is Begin a bank?',
        a: 'No. Begin is an app for holding and sending digital dollars. Your dollars sit in a wallet that only you control, not in an account Begin runs. That also means there is no deposit guarantee.',
      },
      {
        q: 'What is USDC?',
        a: 'USDC is a digital dollar issued by Circle. Each one is meant to be worth one US dollar and can be swapped back for one. It lives on Solana, a public network, so moving it is fast and costs almost nothing.',
      },
      {
        q: 'Is sending really free?',
        a: 'Yes, between Begin accounts. Begin covers the network cost. Adding money with a card and cashing out to a bank have a partner fee, which you always see before you confirm.',
      },
      {
        q: 'What if I lose my phone?',
        a: 'Install Begin on a new phone and enter your 15 secret words. Your dollars come back with them. Without the words nobody can restore the wallet, including us, so write them down and keep them safe.',
      },
      {
        q: 'Where can I add money and cash out?',
        a: 'It depends on your country and the methods our partner supports there. The app shows what works where you are, with the fee, before you start.',
      },
      {
        q: 'I already use Begin Wallet. Is this the same app?',
        a: 'Yes. Update the app and everything stays: your wallet, your coins and your 15 words. Dollars now come first, and the rest is under Me.',
      },
      {
        q: 'Someone from Begin asked for my 15 words.',
        a: 'It’s a scam. Begin will never ask for them, by email, chat, phone or DM. Don’t share them with anyone.',
      },
      {
        q: 'How do I get help?',
        a: 'Help at any hour: Ask Begin answers 24/7 in the app, and our team steps in when something needs a person.',
      },
    ],
  },
  get: {
    h: 'Get Begin',
    lead: 'A dollar account on your phone that only you can open.',
    note: 'Only download Begin from the App Store, Google Play, the Chrome Web Store or begin.is.',
    links: [
      { t: 'Begin for iPhone', s: 'App Store' },
      { t: 'Begin for Android', s: 'Google Play' },
      { t: 'Begin for your browser', s: 'Chrome Web Store' },
    ],
  },
  footer: {
    nav: 'Footer',
    links: ['How it works', 'Fees', 'Help centre', 'Security', 'Blog', 'Terms', 'Privacy'],
    cookies: 'Cookie settings',
    language: 'Language',
    legal:
      'Begin is not a bank and does not hold customer funds. Your balance is USDC, a digital dollar issued by Circle, in a wallet that only you control. USDC is not a bank deposit, is not covered by any deposit guarantee and can lose its peg. Adding money and cashing out are provided by our payment partner and depend on your country. Begin is a product of Neuralspark Limited.',
    registered: 'Registered in Ireland, no.',
    vat: 'VAT',
  },
  cookie: {
    title: 'Cookies on begin.is',
    body: 'We use essential cookies to run the site. With your OK, we’d also use analytics cookies to see how it’s used and make it better. See our',
    privacy: 'privacy policy',
    accept: 'Accept analytics',
    reject: 'Reject analytics',
  },
}

const es: Copy = {
  meta: {
    title: 'Begin: una cuenta en dólares que solo tú puedes abrir',
    description:
      'Guarda dólares digitales en tu teléfono, envíalos gratis a cualquiera en Begin en unos cinco segundos y retíralos a tu banco. Begin no puede mover tu dinero. iPhone, Android y Chrome.',
  },
  nav: {
    home: 'Inicio de Begin',
    main: 'Principal',
    how: 'Cómo funciona',
    yours: 'Solo tuya',
    fees: 'Comisiones',
    help: 'Ayuda',
    get: 'Descarga Begin',
  },
  hero: {
    h1: 'Solo tú puedes abrirla',
    lead: 'Una cuenta en dólares en tu teléfono, en dólares digitales. Guárdalos, envíalos gratis a cualquiera en Begin en unos cinco segundos y retíralos a tu banco cuando lo necesites. Begin no puede mover tu dinero.',
    note: 'Descarga gratis · iPhone, Android y Chrome',
    photoAlt: 'Una mujer joven sonríe frente a su laptop junto a una ventana soleada',
    phoneLabel: 'La pantalla de inicio de Begin: $2,400.00 en tus dólares, con Agregar, Enviar, Recibir y Retirar',
    yourDollars: 'Tus dólares',
    actions: ['Agregar', 'Enviar', 'Recibir', 'Retirar'],
    euros: 'euros',
    earn: 'Gana con tus dólares',
    earnOff: 'Apagado hasta que lo actives',
    tabs: ['Inicio', 'Convertir', 'Ganar', 'Actividad'],
    toastTitle: '+$50.00 de @maria',
    toastSub: 'Llegó en 5 segundos · gratis',
  },
  glance: {
    label: 'De un vistazo',
    items: [
      { t: 'Gratis en Begin', b: 'Sin comisión al enviar dólares a cualquiera en Begin' },
      { t: 'Unos 5 segundos', b: 'De tu teléfono al suyo' },
      { t: 'Todas las comisiones por adelantado', b: 'Las ves antes de agregar dinero o retirar' },
      { t: 'Solo tú puedes abrirla', b: 'Begin nunca guarda tu dinero' },
    ],
  },
  how: {
    h: 'Agrega dólares. Envíalos. Retíralos',
    lead: 'Tu saldo es USDC, un dólar digital. Un USDC está pensado para valer un dólar estadounidense, y está en una billetera en Solana que solo tú controlas.',
    step: 'Paso',
    steps: [
      {
        t: 'Agrega dólares',
        b: 'Compra con tu tarjeta o banco a través del pago de nuestro socio, o trae USDC desde otra app o exchange.',
        tag: 'Desde otra app: gratis en Begin',
      },
      {
        t: 'Envía a cualquiera en Begin',
        b: 'Elige un @nombre o un contacto, o escanea un código QR. Los dólares llegan a su Begin en unos cinco segundos.',
        tag: 'Gratis, siempre',
      },
      {
        t: 'Retira a tu banco',
        b: 'Convierte tus dólares otra vez en dinero en tu cuenta bancaria. Ves la comisión completa y lo que recibirás antes de confirmar.',
        tag: 'Comisión a la vista primero',
      },
    ],
  },
  yours: {
    h: 'Begin no puede mover tu dinero',
    lead: 'Begin no es un banco y no guarda tus dólares. Están en una billetera en tu teléfono. Si una empresa cierra o congela su app, tu billetera se sigue abriendo, porque solo tú tienes la forma de entrar.',
    facts: [
      {
        t: 'Solo tú tienes las llaves',
        b: 'Tus 15 palabras secretas abren tu billetera. Begin nunca las ve y no puede mover tu dinero.',
      },
      { t: 'Pierdes el teléfono, no tus dólares', b: 'Tus 15 palabras recuperan tu billetera en un teléfono nuevo.' },
      {
        t: 'Dólares, uno a uno',
        b: 'USDC es emitido por Circle. Cada uno está pensado para valer un dólar estadounidense, respaldado por efectivo y deuda del gobierno de EE. UU. a corto plazo.',
      },
      {
        t: 'Honestos sobre los riesgos',
        b: 'USDC no es un depósito bancario y no tiene garantía de depósitos. Guarda bien tus 15 palabras: nadie, ni siquiera Begin, puede recuperarlas por ti.',
      },
    ],
  },
  more: {
    h: 'También en la app',
    items: [
      {
        t: 'Convertir',
        b: 'Cambia otras monedas a dólares, o dólares a monedas, al mejor precio que encontremos. Lo apruebas con Face ID.',
      },
      {
        t: 'Ganar',
        b: 'Pon tus dólares o monedas a trabajar desde tu propia billetera. Apagado hasta que lo actives. Las tasas cambian y no están garantizadas.',
      },
      { t: 'eSIM para viajar', b: 'Datos móviles en otros países, pagados con tus dólares. En Yo.' },
      { t: 'Tus otras monedas', b: 'Cardano, Bitcoin, NFTs y las apps que conectas siguen aquí, en Yo.' },
    ],
  },
  invite: {
    eyebrow: 'Invita a un amigo',
    h: 'Tu amigo recibe $2. Tú, $1',
    body: 'Se paga en dólares cuando tu amigo agrega $20 o más, los mantiene 7 días y hace un envío en Begin. Hasta 10 amigos.',
    small: 'El dinero que tú le envíes no cuenta para sus $20.',
    photoAlt: 'Una mujer en su cocina sonríe mirando su teléfono',
    chip: 'Agregado a tus dólares',
  },
  fees: {
    h: 'Comisiones, antes de pagar',
    lead: 'Mover dólares dentro de Begin es gratis. Cuando el dinero entra desde una tarjeta o sale a un banco, nuestro socio cobra una comisión, y la ves completa antes de confirmar.',
    rows: [
      { k: 'Enviar dólares a cualquiera en Begin', v: 'Gratis' },
      { k: 'Traer dólares desde otra app', v: 'Gratis en Begin' },
      { k: 'Agregar dinero con tarjeta o banco', v: 'Comisión del socio, a la vista primero' },
      { k: 'Retirar a tu banco', v: 'Comisión del socio, a la vista primero' },
      { k: 'Convertir otras monedas a dólares', v: 'Incluida en la tasa, a la vista primero' },
    ],
  },
  faq: {
    h: 'Preguntas',
    lead: 'Ayuda a cualquier hora. Ask Begin responde 24/7, y nuestro equipo interviene cuando necesitas a una persona.',
    help: 'Obtener ayuda',
    items: [
      {
        q: '¿Begin es un banco?',
        a: 'No. Begin es una app para guardar y enviar dólares digitales. Tus dólares están en una billetera que solo tú controlas, no en una cuenta que administre Begin. Eso también significa que no hay garantía de depósitos.',
      },
      {
        q: '¿Qué es USDC?',
        a: 'USDC es un dólar digital emitido por Circle. Cada uno está pensado para valer un dólar estadounidense y se puede cambiar de vuelta por uno. Vive en Solana, una red pública, así que moverlo es rápido y casi no cuesta nada.',
      },
      {
        q: '¿Enviar es realmente gratis?',
        a: 'Sí, entre cuentas Begin. Begin cubre el costo de la red. Agregar dinero con tarjeta y retirar a un banco tienen una comisión del socio, que siempre ves antes de confirmar.',
      },
      {
        q: '¿Y si pierdo mi teléfono?',
        a: 'Instala Begin en un teléfono nuevo e ingresa tus 15 palabras secretas. Tus dólares vuelven con ellas. Sin las palabras nadie puede recuperar la billetera, ni siquiera nosotros, así que anótalas y guárdalas bien.',
      },
      {
        q: '¿Dónde puedo agregar dinero y retirar?',
        a: 'Depende de tu país y de los métodos que nuestro socio admite allí. La app te muestra qué funciona donde estás, con la comisión, antes de empezar.',
      },
      {
        q: 'Ya uso Begin Wallet. ¿Es la misma app?',
        a: 'Sí. Actualiza la app y todo se mantiene: tu billetera, tus monedas y tus 15 palabras. Ahora los dólares van primero, y el resto está en Yo.',
      },
      {
        q: 'Alguien de Begin me pidió mis 15 palabras.',
        a: 'Es una estafa. Begin nunca te las pedirá, ni por email, chat, teléfono o mensaje directo. No se las compartas a nadie.',
      },
      {
        q: '¿Cómo obtengo ayuda?',
        a: 'Ayuda a cualquier hora: Ask Begin responde 24/7 en la app, y nuestro equipo interviene cuando algo necesita a una persona.',
      },
    ],
  },
  get: {
    h: 'Descarga Begin',
    lead: 'Una cuenta en dólares en tu teléfono que solo tú puedes abrir.',
    note: 'Descarga Begin solo desde App Store, Google Play, Chrome Web Store o begin.is.',
    links: [
      { t: 'Begin para iPhone', s: 'App Store' },
      { t: 'Begin para Android', s: 'Google Play' },
      { t: 'Begin para tu navegador', s: 'Chrome Web Store' },
    ],
  },
  footer: {
    nav: 'Pie de página',
    links: ['Cómo funciona', 'Comisiones', 'Centro de ayuda', 'Seguridad', 'Blog', 'Términos', 'Privacidad'],
    cookies: 'Configurar cookies',
    language: 'Idioma',
    legal:
      'Begin no es un banco y no guarda fondos de clientes. Tu saldo es USDC, un dólar digital emitido por Circle, en una billetera que solo tú controlas. USDC no es un depósito bancario, no está cubierto por ninguna garantía de depósitos y puede perder su paridad. Agregar dinero y retirar lo ofrece nuestro socio de pagos y depende de tu país. Begin es un producto de Neuralspark Limited.',
    registered: 'Registrada en Irlanda, n.º',
    vat: 'IVA',
  },
  cookie: {
    title: 'Cookies en begin.is',
    body: 'Usamos cookies esenciales para que el sitio funcione. Con tu permiso, también usaríamos cookies de analítica para ver cómo se usa y mejorarlo. Consulta nuestra',
    privacy: 'política de privacidad',
    accept: 'Aceptar analítica',
    reject: 'Rechazar analítica',
  },
}

const ptBR: Copy = {
  meta: {
    title: 'Begin: uma conta em dólares que só você pode abrir',
    description:
      'Guarde dólares digitais no celular, envie de graça para qualquer pessoa no Begin em cerca de cinco segundos e saque para o seu banco. O Begin não pode mexer no seu dinheiro. iPhone, Android e Chrome.',
  },
  nav: {
    home: 'Início do Begin',
    main: 'Principal',
    how: 'Como funciona',
    yours: 'Só sua',
    fees: 'Taxas',
    help: 'Ajuda',
    get: 'Baixe o Begin',
  },
  hero: {
    h1: 'Só você pode abrir',
    lead: 'Uma conta em dólares no seu celular, em dólares digitais. Guarde, envie de graça para qualquer pessoa no Begin em cerca de cinco segundos e saque para o seu banco quando precisar. O Begin não pode mexer no seu dinheiro.',
    note: 'Download grátis · iPhone, Android e Chrome',
    photoAlt: 'Uma jovem sorrindo para o notebook perto de uma janela ensolarada',
    phoneLabel: 'A tela inicial do Begin: US$ 2.400,00 nos seus dólares, com Adicionar, Enviar, Receber e Sacar',
    yourDollars: 'Seus dólares',
    actions: ['Adicionar', 'Enviar', 'Receber', 'Sacar'],
    euros: 'euros',
    earn: 'Renda com seus dólares',
    earnOff: 'Desligado até você ativar',
    tabs: ['Início', 'Converter', 'Investir', 'Atividade'],
    toastTitle: '+$50.00 de @maria',
    toastSub: 'Chegou em 5 segundos · grátis',
  },
  glance: {
    label: 'Em resumo',
    items: [
      { t: 'Grátis no Begin', b: 'Sem taxa para enviar dólares a qualquer pessoa no Begin' },
      { t: 'Cerca de 5 segundos', b: 'Do seu celular para o dela' },
      { t: 'Todas as taxas antes', b: 'Mostradas antes de adicionar dinheiro ou sacar' },
      { t: 'Só você pode abrir', b: 'O Begin nunca guarda o seu dinheiro' },
    ],
  },
  how: {
    h: 'Adicione dólares. Envie. Saque',
    lead: 'Seu saldo é USDC, um dólar digital. Um USDC foi feito para valer um dólar americano, e fica numa carteira na Solana que só você controla.',
    step: 'Passo',
    steps: [
      {
        t: 'Adicione dólares',
        b: 'Compre com cartão ou banco pelo checkout do nosso parceiro, ou traga USDC de outro app ou corretora.',
        tag: 'De outro app: grátis no Begin',
      },
      {
        t: 'Envie para qualquer pessoa no Begin',
        b: 'Escolha um @nome ou um contato, ou leia um QR code. Os dólares chegam no Begin da pessoa em cerca de cinco segundos.',
        tag: 'Grátis, sempre',
      },
      {
        t: 'Saque para o seu banco',
        b: 'Transforme dólares de volta em dinheiro na sua conta bancária. Você vê a taxa completa e o valor que cai antes de confirmar.',
        tag: 'Taxa mostrada antes',
      },
    ],
  },
  yours: {
    h: 'O Begin não pode mexer no seu dinheiro',
    lead: 'O Begin não é um banco e não guarda os seus dólares. Eles ficam numa carteira no seu celular. Se uma empresa fechar ou congelar o app dela, sua carteira continua abrindo, porque só você tem a chave.',
    facts: [
      {
        t: 'Só você tem as chaves',
        b: 'Suas 15 palavras secretas abrem a sua carteira. O Begin nunca as vê e não pode mexer no seu dinheiro.',
      },
      { t: 'Perdeu o celular? Seus dólares ficam', b: 'Suas 15 palavras recuperam a sua carteira num celular novo.' },
      {
        t: 'Dólares, um para um',
        b: 'O USDC é emitido pela Circle. Cada um foi feito para valer um dólar americano, lastreado em dinheiro e títulos de curto prazo do governo dos EUA.',
      },
      {
        t: 'Honestos sobre os riscos',
        b: 'USDC não é depósito bancário e não tem garantia de depósito. Guarde bem suas 15 palavras: ninguém, nem o Begin, pode recuperá-las para você.',
      },
    ],
  },
  more: {
    h: 'Também no app',
    items: [
      {
        t: 'Converter',
        b: 'Troque outras moedas por dólares, ou dólares por moedas, pelo melhor preço que encontrarmos. Você aprova com Face ID.',
      },
      {
        t: 'Investir',
        b: 'Faça seus dólares ou moedas renderem a partir da sua própria carteira. Desligado até você ativar. As taxas mudam e não são garantidas.',
      },
      { t: 'eSIM para viagem', b: 'Internet móvel em outros países, paga com seus dólares. Em Eu.' },
      { t: 'Suas outras moedas', b: 'Cardano, Bitcoin, NFTs e os apps que você conecta continuam aqui, em Eu.' },
    ],
  },
  invite: {
    eyebrow: 'Convide um amigo',
    h: 'Seu amigo ganha $2. Você ganha $1',
    body: 'Pago em dólares quando seu amigo adiciona $20 ou mais, mantém por 7 dias e faz um envio no Begin. Até 10 amigos.',
    small: 'O dinheiro que você envia para o seu amigo não conta para os $20 dele.',
    photoAlt: 'Uma mulher na cozinha sorrindo para o celular',
    chip: 'Adicionado aos seus dólares',
  },
  fees: {
    h: 'Taxas, antes de pagar',
    lead: 'Movimentar dólares dentro do Begin é grátis. Quando o dinheiro entra por cartão ou sai para um banco, nosso parceiro cobra uma taxa, e você vê o valor completo antes de confirmar.',
    rows: [
      { k: 'Enviar dólares para qualquer pessoa no Begin', v: 'Grátis' },
      { k: 'Trazer dólares de outro app', v: 'Grátis no Begin' },
      { k: 'Adicionar dinheiro com cartão ou banco', v: 'Taxa do parceiro, mostrada antes' },
      { k: 'Sacar para o seu banco', v: 'Taxa do parceiro, mostrada antes' },
      { k: 'Converter outras moedas em dólares', v: 'Incluída na cotação, mostrada antes' },
    ],
  },
  faq: {
    h: 'Perguntas',
    lead: 'Ajuda a qualquer hora. O Ask Begin responde 24/7, e nossa equipe entra quando você precisa de uma pessoa.',
    help: 'Pedir ajuda',
    items: [
      {
        q: 'O Begin é um banco?',
        a: 'Não. O Begin é um app para guardar e enviar dólares digitais. Seus dólares ficam numa carteira que só você controla, não numa conta administrada pelo Begin. Isso também significa que não há garantia de depósito.',
      },
      {
        q: 'O que é USDC?',
        a: 'USDC é um dólar digital emitido pela Circle. Cada um foi feito para valer um dólar americano e pode ser trocado de volta por um. Ele fica na Solana, uma rede pública, então movimentar é rápido e quase não custa nada.',
      },
      {
        q: 'Enviar é mesmo grátis?',
        a: 'Sim, entre contas Begin. O Begin cobre o custo da rede. Adicionar dinheiro com cartão e sacar para um banco têm uma taxa do parceiro, que você sempre vê antes de confirmar.',
      },
      {
        q: 'E se eu perder o celular?',
        a: 'Instale o Begin num celular novo e digite suas 15 palavras secretas. Seus dólares voltam com elas. Sem as palavras ninguém consegue recuperar a carteira, nem nós, então anote e guarde bem.',
      },
      {
        q: 'Onde posso adicionar dinheiro e sacar?',
        a: 'Depende do seu país e dos métodos que nosso parceiro aceita aí. O app mostra o que funciona onde você está, com a taxa, antes de começar.',
      },
      {
        q: 'Já uso o Begin Wallet. É o mesmo app?',
        a: 'Sim. Atualize o app e tudo continua: sua carteira, suas moedas e suas 15 palavras. Agora os dólares vêm primeiro, e o resto fica em Eu.',
      },
      {
        q: 'Alguém do Begin pediu minhas 15 palavras.',
        a: 'É golpe. O Begin nunca vai pedir suas palavras, nem por email, chat, telefone ou DM. Não compartilhe com ninguém.',
      },
      {
        q: 'Como consigo ajuda?',
        a: 'Ajuda a qualquer hora: o Ask Begin responde 24/7 no app, e nossa equipe entra quando algo precisa de uma pessoa.',
      },
    ],
  },
  get: {
    h: 'Baixe o Begin',
    lead: 'Uma conta em dólares no seu celular que só você pode abrir.',
    note: 'Só baixe o Begin pela App Store, Google Play, Chrome Web Store ou begin.is.',
    links: [
      { t: 'Begin para iPhone', s: 'App Store' },
      { t: 'Begin para Android', s: 'Google Play' },
      { t: 'Begin para o seu navegador', s: 'Chrome Web Store' },
    ],
  },
  footer: {
    nav: 'Rodapé',
    links: ['Como funciona', 'Taxas', 'Central de ajuda', 'Segurança', 'Blog', 'Termos', 'Privacidade'],
    cookies: 'Configurar cookies',
    language: 'Idioma',
    legal:
      'O Begin não é um banco e não guarda fundos de clientes. Seu saldo é USDC, um dólar digital emitido pela Circle, numa carteira que só você controla. USDC não é depósito bancário, não tem cobertura de nenhuma garantia de depósito e pode perder a paridade. Adicionar dinheiro e sacar são serviços do nosso parceiro de pagamentos e dependem do seu país. O Begin é um produto da Neuralspark Limited.',
    registered: 'Registrada na Irlanda, nº',
    vat: 'IVA',
  },
  cookie: {
    title: 'Cookies no begin.is',
    body: 'Usamos cookies essenciais para o site funcionar. Com a sua permissão, também usaríamos cookies de análise para entender como o site é usado e melhorá-lo. Veja nossa',
    privacy: 'política de privacidade',
    accept: 'Aceitar análise',
    reject: 'Recusar análise',
  },
}

const id: Copy = {
  meta: {
    title: 'Begin: akun dolar yang hanya bisa kamu buka',
    description:
      'Simpan dolar digital di ponselmu, kirim gratis ke siapa pun di Begin dalam sekitar lima detik, lalu cairkan ke bankmu. Begin tidak bisa memindahkan uangmu. iPhone, Android, dan Chrome.',
  },
  nav: {
    home: 'Beranda Begin',
    main: 'Utama',
    how: 'Cara kerjanya',
    yours: 'Hanya milikmu',
    fees: 'Biaya',
    help: 'Bantuan',
    get: 'Dapatkan Begin',
  },
  hero: {
    h1: 'Hanya kamu yang bisa membukanya',
    lead: 'Akun dolar di ponselmu, dalam dolar digital. Simpan, kirim gratis ke siapa pun di Begin dalam sekitar lima detik, dan cairkan ke bankmu saat kamu butuh. Begin tidak bisa memindahkan uangmu.',
    note: 'Gratis diunduh · iPhone, Android, dan Chrome',
    photoAlt: 'Seorang perempuan muda tersenyum melihat laptopnya di dekat jendela yang cerah',
    phoneLabel: 'Layar Beranda aplikasi Begin: $2,400.00 di dolarmu, dengan Tambah, Kirim, Terima, dan Cairkan',
    yourDollars: 'Dolarmu',
    actions: ['Tambah', 'Kirim', 'Terima', 'Cairkan'],
    euros: 'euro',
    earn: 'Hasilkan dari dolarmu',
    earnOff: 'Mati sampai kamu menyalakannya',
    tabs: ['Beranda', 'Konversi', 'Earn', 'Aktivitas'],
    toastTitle: '+$50.00 dari @maria',
    toastSub: 'Tiba dalam 5 detik · gratis',
  },
  glance: {
    label: 'Sekilas',
    items: [
      { t: 'Gratis di Begin', b: 'Tanpa biaya kirim dolar ke siapa pun di Begin' },
      { t: 'Sekitar 5 detik', b: 'Dari ponselmu ke ponsel mereka' },
      { t: 'Semua biaya di awal', b: 'Ditampilkan sebelum kamu menambah uang atau mencairkan' },
      { t: 'Hanya kamu yang bisa membukanya', b: 'Begin tidak pernah menyimpan uangmu' },
    ],
  },
  how: {
    h: 'Tambah dolar. Kirim. Cairkan',
    lead: 'Saldomu adalah USDC, dolar digital. Satu USDC dirancang bernilai satu dolar AS, dan disimpan di dompet di Solana yang hanya kamu kendalikan.',
    step: 'Langkah',
    steps: [
      {
        t: 'Tambah dolar',
        b: 'Beli dengan kartu atau bank lewat checkout mitra kami, atau pindahkan USDC dari aplikasi atau exchange lain.',
        tag: 'Dari aplikasi lain: gratis di Begin',
      },
      {
        t: 'Kirim ke siapa pun di Begin',
        b: 'Pilih @nama atau kontak, atau pindai kode QR. Dolarnya masuk ke Begin mereka dalam sekitar lima detik.',
        tag: 'Gratis, setiap kali',
      },
      {
        t: 'Cairkan ke bankmu',
        b: 'Ubah dolar kembali jadi uang di rekening bankmu. Kamu melihat biaya lengkap dan jumlah yang masuk sebelum konfirmasi.',
        tag: 'Biaya ditampilkan dulu',
      },
    ],
  },
  yours: {
    h: 'Begin tidak bisa memindahkan uangmu',
    lead: 'Begin bukan bank, dan tidak menyimpan dolarmu. Dolarmu ada di dompet di ponselmu. Kalau sebuah perusahaan tutup atau membekukan aplikasinya, dompetmu tetap bisa dibuka, karena hanya kamu yang punya jalan masuknya.',
    facts: [
      {
        t: 'Hanya kamu yang memegang kuncinya',
        b: '15 kata rahasiamu membuka dompetmu. Begin tidak pernah melihatnya dan tidak bisa memindahkan uangmu.',
      },
      { t: 'Ponsel hilang, dolar tetap aman di tanganmu', b: '15 katamu mengembalikan dompetmu di ponsel baru.' },
      {
        t: 'Dolar, satu banding satu',
        b: 'USDC diterbitkan oleh Circle. Setiap USDC dirancang bernilai satu dolar AS, didukung uang tunai dan surat utang jangka pendek pemerintah AS.',
      },
      {
        t: 'Jujur soal risikonya',
        b: 'USDC bukan simpanan bank dan tidak dijamin penjaminan simpanan. Simpan 15 katamu baik-baik: tidak ada yang bisa memulihkannya untukmu, termasuk Begin.',
      },
    ],
  },
  more: {
    h: 'Juga ada di aplikasi',
    items: [
      {
        t: 'Konversi',
        b: 'Tukar koin lain jadi dolar, atau dolar jadi koin, dengan harga terbaik yang bisa kami temukan. Kamu menyetujuinya dengan Face ID.',
      },
      {
        t: 'Earn',
        b: 'Kembangkan dolar atau koinmu dari dompetmu sendiri. Mati sampai kamu menyalakannya. Imbal hasil berubah dan tidak dijanjikan.',
      },
      { t: 'eSIM untuk bepergian', b: 'Data seluler di negara lain, dibayar dari dolarmu. Ada di Saya.' },
      {
        t: 'Koinmu yang lain',
        b: 'Cardano, Bitcoin, NFT, dan aplikasi yang kamu hubungkan masih ada di sini, di Saya.',
      },
    ],
  },
  invite: {
    eyebrow: 'Ajak teman',
    h: 'Temanmu dapat $2. Kamu dapat $1',
    body: 'Dibayar dalam dolar setelah temanmu menambah $20 atau lebih, menyimpannya selama 7 hari, dan mengirim sekali di Begin. Maksimal 10 teman.',
    small: 'Uang yang kamu kirim ke temanmu tidak dihitung untuk $20 miliknya.',
    photoAlt: 'Seorang perempuan di dapurnya tersenyum melihat ponselnya',
    chip: 'Ditambahkan ke dolarmu',
  },
  fees: {
    h: 'Biaya, sebelum kamu bayar',
    lead: 'Memindahkan dolar di dalam Begin itu gratis. Saat uang masuk dari kartu atau keluar ke bank, mitra kami mengenakan biaya, dan kamu melihat semuanya sebelum konfirmasi.',
    rows: [
      { k: 'Kirim dolar ke siapa pun di Begin', v: 'Gratis' },
      { k: 'Pindahkan dolar dari aplikasi lain', v: 'Gratis di Begin' },
      { k: 'Tambah uang dengan kartu atau bank', v: 'Biaya mitra, ditampilkan dulu' },
      { k: 'Cairkan ke bankmu', v: 'Biaya mitra, ditampilkan dulu' },
      { k: 'Konversi koin lain ke dolar', v: 'Sudah termasuk dalam kurs, ditampilkan dulu' },
    ],
  },
  faq: {
    h: 'Pertanyaan',
    lead: 'Bantuan kapan saja. Ask Begin menjawab 24/7, dan tim kami turun tangan saat kamu butuh orang.',
    help: 'Minta bantuan',
    items: [
      {
        q: 'Apakah Begin itu bank?',
        a: 'Bukan. Begin adalah aplikasi untuk menyimpan dan mengirim dolar digital. Dolarmu ada di dompet yang hanya kamu kendalikan, bukan di akun yang dikelola Begin. Artinya juga tidak ada penjaminan simpanan.',
      },
      {
        q: 'Apa itu USDC?',
        a: 'USDC adalah dolar digital yang diterbitkan oleh Circle. Setiap USDC dirancang bernilai satu dolar AS dan bisa ditukar kembali menjadi satu dolar. USDC ada di Solana, jaringan publik, jadi memindahkannya cepat dan hampir tanpa biaya.',
      },
      {
        q: 'Benarkah mengirim itu gratis?',
        a: 'Ya, antar akun Begin. Begin menanggung biaya jaringan. Menambah uang dengan kartu dan mencairkan ke bank dikenai biaya mitra, yang selalu kamu lihat sebelum konfirmasi.',
      },
      {
        q: 'Bagaimana kalau ponselku hilang?',
        a: 'Pasang Begin di ponsel baru dan masukkan 15 kata rahasiamu. Dolarmu kembali bersamanya. Tanpa kata-kata itu tidak ada yang bisa memulihkan dompetmu, termasuk kami, jadi catat dan simpan baik-baik.',
      },
      {
        q: 'Di mana aku bisa menambah uang dan mencairkan?',
        a: 'Tergantung negaramu dan metode yang didukung mitra kami di sana. Aplikasi menunjukkan apa yang tersedia di tempatmu, beserta biayanya, sebelum kamu mulai.',
      },
      {
        q: 'Aku sudah memakai Begin Wallet. Apakah ini aplikasi yang sama?',
        a: 'Ya. Perbarui aplikasinya dan semuanya tetap ada: dompetmu, koinmu, dan 15 katamu. Sekarang dolar tampil lebih dulu, dan sisanya ada di Saya.',
      },
      {
        q: 'Seseorang dari Begin meminta 15 kataku.',
        a: 'Itu penipuan. Begin tidak akan pernah memintanya, baik lewat email, chat, telepon, maupun DM. Jangan bagikan ke siapa pun.',
      },
      {
        q: 'Bagaimana cara mendapat bantuan?',
        a: 'Bantuan kapan saja: Ask Begin menjawab 24/7 di aplikasi, dan tim kami turun tangan saat ada yang butuh orang.',
      },
    ],
  },
  get: {
    h: 'Dapatkan Begin',
    lead: 'Akun dolar di ponselmu yang hanya bisa kamu buka.',
    note: 'Unduh Begin hanya dari App Store, Google Play, Chrome Web Store, atau begin.is.',
    links: [
      { t: 'Begin untuk iPhone', s: 'App Store' },
      { t: 'Begin untuk Android', s: 'Google Play' },
      { t: 'Begin untuk browsermu', s: 'Chrome Web Store' },
    ],
  },
  footer: {
    nav: 'Footer',
    links: ['Cara kerjanya', 'Biaya', 'Pusat bantuan', 'Keamanan', 'Blog', 'Ketentuan', 'Privasi'],
    cookies: 'Pengaturan cookie',
    language: 'Bahasa',
    legal:
      'Begin bukan bank dan tidak menyimpan dana pelanggan. Saldomu adalah USDC, dolar digital yang diterbitkan oleh Circle, di dompet yang hanya kamu kendalikan. USDC bukan simpanan bank, tidak dilindungi penjaminan simpanan apa pun, dan bisa kehilangan patokannya. Menambah uang dan mencairkan disediakan oleh mitra pembayaran kami dan tergantung negaramu. Begin adalah produk dari Neuralspark Limited.',
    registered: 'Terdaftar di Irlandia, no.',
    vat: 'PPN',
  },
  cookie: {
    title: 'Cookie di begin.is',
    body: 'Kami memakai cookie penting agar situs berjalan. Dengan izinmu, kami juga akan memakai cookie analitik untuk melihat cara situs digunakan dan memperbaikinya. Lihat',
    privacy: 'kebijakan privasi kami',
    accept: 'Terima analitik',
    reject: 'Tolak analitik',
  },
}

const zhHans: Copy = {
  meta: {
    title: 'Begin：只有你能打开的美元账户',
    description:
      '在手机上持有数字美元，约五秒内免费转给 Begin 上的任何人，还能提现到你的银行。Begin 无法动用你的钱。支持 iPhone、Android 和 Chrome。',
  },
  nav: {
    home: 'Begin 首页',
    main: '主导航',
    how: '如何使用',
    yours: '只属于你',
    fees: '费用',
    help: '帮助',
    get: '下载 Begin',
  },
  hero: {
    h1: '只有你能打开它',
    lead: '手机上的美元账户，以数字美元计。持有它们，约五秒内免费转给 Begin 上的任何人，需要时提现到你的银行。Begin 无法动用你的钱。',
    note: '免费下载 · iPhone、Android 和 Chrome',
    photoAlt: '一位年轻女性在阳光充足的窗边对着笔记本电脑微笑',
    phoneLabel: 'Begin 应用首页：你的美元余额为 $2,400.00，带有添加、发送、收款和提现按钮',
    yourDollars: '你的美元',
    actions: ['添加', '发送', '收款', '提现'],
    euros: '欧元',
    earn: '用你的美元赚收益',
    earnOff: '在你开启前保持关闭',
    tabs: ['首页', '兑换', '赚币', '动态'],
    toastTitle: '+$50.00 来自 @maria',
    toastSub: '5 秒到账 · 免费',
  },
  glance: {
    label: '一览',
    items: [
      { t: '在 Begin 上免费', b: '给 Begin 上的任何人转美元都不收费' },
      { t: '约 5 秒', b: '从你的手机到对方的手机' },
      { t: '所有费用提前展示', b: '在你添加资金或提现前显示' },
      { t: '只有你能打开它', b: 'Begin 从不保管你的钱' },
    ],
  },
  how: {
    h: '添加美元。转出去。提现',
    lead: '你的余额是 USDC，一种数字美元。一枚 USDC 的设计价值为一美元，存放在 Solana 上一个只有你能控制的钱包里。',
    step: '步骤',
    steps: [
      {
        t: '添加美元',
        b: '通过合作伙伴的支付页面用银行卡或银行账户购买，或从其他应用或交易所转入 USDC。',
        tag: '从其他应用转入：在 Begin 上免费',
      },
      {
        t: '转给 Begin 上的任何人',
        b: '选择一个 @用户名或联系人，或扫描二维码。美元约五秒后到达对方的 Begin。',
        tag: '每次都免费',
      },
      {
        t: '提现到你的银行',
        b: '把美元换回你银行账户里的钱。确认前，你会看到全部费用和实际到账金额。',
        tag: '费用先展示',
      },
    ],
  },
  yours: {
    h: 'Begin 无法动用你的钱',
    lead: 'Begin 不是银行，也不保管你的美元。它们存放在你手机上的钱包里。即使某家公司关闭或冻结了它的应用，你的钱包依然能打开，因为只有你掌握进入的方式。',
    facts: [
      { t: '钥匙只在你手里', b: '你的 15 个秘密单词可以打开你的钱包。Begin 永远看不到它们，也无法动用你的钱。' },
      { t: '手机丢了，美元还在', b: '用你的 15 个单词就能在新手机上找回钱包。' },
      {
        t: '美元，一比一',
        b: 'USDC 由 Circle 发行。每一枚的设计价值为一美元，由现金和美国政府短期债券支持。',
      },
      {
        t: '坦诚说明风险',
        b: 'USDC 不是银行存款，也没有存款保险。请妥善保管你的 15 个单词：没有人能替你找回它们，Begin 也不能。',
      },
    ],
  },
  more: {
    h: '应用里还有',
    items: [
      { t: '兑换', b: '以我们能找到的最优价格，把其他币换成美元，或把美元换成币。用 Face ID 确认。' },
      { t: '赚币', b: '在你自己的钱包里让美元或币产生收益。在你开启前保持关闭。收益率会变动，不作保证。' },
      { t: '旅行 eSIM', b: '在其他国家使用移动数据，用你的美元支付。在“我”里面。' },
      { t: '你的其他币', b: 'Cardano、Bitcoin、NFT 以及你连接的应用都还在，就在“我”里面。' },
    ],
  },
  invite: {
    eyebrow: '邀请朋友',
    h: '朋友得 $2，你得 $1',
    body: '朋友添加 $20 或以上、持有 7 天并在 Begin 上转账一次后，奖励以美元发放。最多邀请 10 位朋友。',
    small: '你转给朋友的钱不计入对方的 $20。',
    photoAlt: '一位女士在厨房里看着手机微笑',
    chip: '已存入你的美元',
  },
  fees: {
    h: '付款前，先看费用',
    lead: '在 Begin 内转美元是免费的。当钱从银行卡转入或提现到银行时，合作伙伴会收取费用，确认前你能看到全部金额。',
    rows: [
      { k: '给 Begin 上的任何人转美元', v: '免费' },
      { k: '从其他应用转入美元', v: '在 Begin 上免费' },
      { k: '用银行卡或银行账户添加资金', v: '合作伙伴费用，先行展示' },
      { k: '提现到你的银行', v: '合作伙伴费用，先行展示' },
      { k: '把其他币兑换成美元', v: '已含在汇率中，先行展示' },
    ],
  },
  faq: {
    h: '常见问题',
    lead: '随时获得帮助。Ask Begin 全天候解答，需要真人时我们的团队会接手。',
    help: '获取帮助',
    items: [
      {
        q: 'Begin 是银行吗？',
        a: '不是。Begin 是一款持有和发送数字美元的应用。你的美元存放在只有你能控制的钱包里，而不是 Begin 管理的账户中。这也意味着没有存款保险。',
      },
      {
        q: '什么是 USDC？',
        a: 'USDC 是由 Circle 发行的数字美元。每一枚的设计价值为一美元，可以兑换回一美元。它运行在公共网络 Solana 上，所以转账很快，费用几乎为零。',
      },
      {
        q: '转账真的免费吗？',
        a: '是的，在 Begin 账户之间免费。网络费用由 Begin 承担。用银行卡添加资金和提现到银行会收取合作伙伴费用，确认前你总能看到。',
      },
      {
        q: '手机丢了怎么办？',
        a: '在新手机上安装 Begin，输入你的 15 个秘密单词，你的美元就会一起回来。没有这些单词，任何人都无法找回钱包，包括我们，所以请抄写下来并妥善保管。',
      },
      {
        q: '我可以在哪里添加资金和提现？',
        a: '这取决于你所在的国家以及合作伙伴在当地支持的方式。开始前，应用会显示你所在地可用的方式和费用。',
      },
      {
        q: '我已经在用 Begin Wallet，这是同一个应用吗？',
        a: '是的。更新应用后一切都会保留：你的钱包、你的币和你的 15 个单词。现在美元排在最前面，其余内容在“我”里面。',
      },
      {
        q: '有自称 Begin 的人向我索要 15 个单词。',
        a: '这是诈骗。Begin 绝不会通过邮件、聊天、电话或私信向你索要它们。不要告诉任何人。',
      },
      {
        q: '如何获得帮助？',
        a: '随时获得帮助：Ask Begin 在应用内全天候解答，遇到需要真人处理的问题时，我们的团队会接手。',
      },
    ],
  },
  get: {
    h: '下载 Begin',
    lead: '手机上只有你能打开的美元账户。',
    note: '请只从 App Store、Google Play、Chrome 网上应用店或 begin.is 下载 Begin。',
    links: [
      { t: 'iPhone 版 Begin', s: 'App Store' },
      { t: 'Android 版 Begin', s: 'Google Play' },
      { t: '浏览器版 Begin', s: 'Chrome 网上应用店' },
    ],
  },
  footer: {
    nav: '页脚',
    links: ['如何使用', '费用', '帮助中心', '安全', '博客', '条款', '隐私'],
    cookies: 'Cookie 设置',
    language: '语言',
    legal:
      'Begin 不是银行，不持有客户资金。你的余额是 USDC，一种由 Circle 发行的数字美元，存放在只有你能控制的钱包中。USDC 不是银行存款，不受任何存款保险保障，并可能与美元脱钩。添加资金和提现服务由我们的支付合作伙伴提供，并因国家/地区而异。Begin 是 Neuralspark Limited 的产品。',
    registered: '在爱尔兰注册，编号',
    vat: '增值税号',
  },
  cookie: {
    title: 'begin.is 上的 Cookie',
    body: '我们使用必要的 Cookie 来运行网站。经你同意后，我们还会使用分析 Cookie 来了解网站的使用情况并加以改进。请查看我们的',
    privacy: '隐私政策',
    accept: '接受分析',
    reject: '拒绝分析',
  },
}

const zhHant: Copy = {
  meta: {
    title: 'Begin：只有你能打開的美元帳戶',
    description:
      '在手機上持有數位美元，約五秒內免費轉給 Begin 上的任何人，還能提現到你的銀行。Begin 無法動用你的錢。支援 iPhone、Android 和 Chrome。',
  },
  nav: {
    home: 'Begin 首頁',
    main: '主選單',
    how: '如何使用',
    yours: '只屬於你',
    fees: '費用',
    help: '說明',
    get: '下載 Begin',
  },
  hero: {
    h1: '只有你能打開它',
    lead: '手機上的美元帳戶，以數位美元計。持有它們，約五秒內免費轉給 Begin 上的任何人，需要時提現到你的銀行。Begin 無法動用你的錢。',
    note: '免費下載 · iPhone、Android 和 Chrome',
    photoAlt: '一位年輕女性在陽光充足的窗邊對著筆電微笑',
    phoneLabel: 'Begin 應用程式首頁：你的美元餘額為 $2,400.00，附有新增、傳送、收款和提現按鈕',
    yourDollars: '你的美元',
    actions: ['新增', '傳送', '收款', '提現'],
    euros: '歐元',
    earn: '用你的美元賺收益',
    earnOff: '在你開啟前維持關閉',
    tabs: ['首頁', '兌換', '賺幣', '動態'],
    toastTitle: '+$50.00 來自 @maria',
    toastSub: '5 秒到帳 · 免費',
  },
  glance: {
    label: '一覽',
    items: [
      { t: '在 Begin 上免費', b: '轉美元給 Begin 上的任何人都不收費' },
      { t: '約 5 秒', b: '從你的手機到對方的手機' },
      { t: '所有費用事先顯示', b: '在你新增資金或提現前顯示' },
      { t: '只有你能打開它', b: 'Begin 從不保管你的錢' },
    ],
  },
  how: {
    h: '新增美元。轉出去。提現',
    lead: '你的餘額是 USDC，一種數位美元。一枚 USDC 的設計價值為一美元，存放在 Solana 上一個只有你能控制的錢包裡。',
    step: '步驟',
    steps: [
      {
        t: '新增美元',
        b: '透過合作夥伴的付款頁面用信用卡或銀行帳戶購買，或從其他應用程式或交易所轉入 USDC。',
        tag: '從其他應用程式轉入：在 Begin 上免費',
      },
      {
        t: '轉給 Begin 上的任何人',
        b: '選擇一個 @使用者名稱或聯絡人，或掃描 QR 碼。美元約五秒後到達對方的 Begin。',
        tag: '每次都免費',
      },
      {
        t: '提現到你的銀行',
        b: '把美元換回你銀行帳戶裡的錢。確認前，你會看到全部費用和實際到帳金額。',
        tag: '費用先顯示',
      },
    ],
  },
  yours: {
    h: 'Begin 無法動用你的錢',
    lead: 'Begin 不是銀行，也不保管你的美元。它們存放在你手機上的錢包裡。即使某家公司關閉或凍結了它的應用程式，你的錢包依然能打開，因為只有你掌握進入的方式。',
    facts: [
      { t: '鑰匙只在你手裡', b: '你的 15 個秘密單詞可以打開你的錢包。Begin 永遠看不到它們，也無法動用你的錢。' },
      { t: '手機掉了，美元還在', b: '用你的 15 個單詞就能在新手機上找回錢包。' },
      {
        t: '美元，一比一',
        b: 'USDC 由 Circle 發行。每一枚的設計價值為一美元，由現金和美國政府短期債券支持。',
      },
      {
        t: '坦誠說明風險',
        b: 'USDC 不是銀行存款，也沒有存款保險。請妥善保管你的 15 個單詞：沒有人能替你找回它們，Begin 也不能。',
      },
    ],
  },
  more: {
    h: '應用程式裡還有',
    items: [
      { t: '兌換', b: '以我們能找到的最佳價格，把其他幣換成美元，或把美元換成幣。用 Face ID 確認。' },
      { t: '賺幣', b: '在你自己的錢包裡讓美元或幣產生收益。在你開啟前維持關閉。收益率會變動，不作保證。' },
      { t: '旅行 eSIM', b: '在其他國家使用行動數據，用你的美元支付。在「我」裡面。' },
      { t: '你的其他幣', b: 'Cardano、Bitcoin、NFT 以及你連接的應用程式都還在，就在「我」裡面。' },
    ],
  },
  invite: {
    eyebrow: '邀請朋友',
    h: '朋友得 $2，你得 $1',
    body: '朋友新增 $20 或以上、持有 7 天並在 Begin 上轉帳一次後，獎勵以美元發放。最多邀請 10 位朋友。',
    small: '你轉給朋友的錢不計入對方的 $20。',
    photoAlt: '一位女士在廚房裡看著手機微笑',
    chip: '已存入你的美元',
  },
  fees: {
    h: '付款前，先看費用',
    lead: '在 Begin 內轉美元是免費的。當錢從信用卡轉入或提現到銀行時，合作夥伴會收取費用，確認前你能看到全部金額。',
    rows: [
      { k: '轉美元給 Begin 上的任何人', v: '免費' },
      { k: '從其他應用程式轉入美元', v: '在 Begin 上免費' },
      { k: '用信用卡或銀行帳戶新增資金', v: '合作夥伴費用，事先顯示' },
      { k: '提現到你的銀行', v: '合作夥伴費用，事先顯示' },
      { k: '把其他幣兌換成美元', v: '已含在匯率中，事先顯示' },
    ],
  },
  faq: {
    h: '常見問題',
    lead: '隨時獲得協助。Ask Begin 全天候解答，需要真人時我們的團隊會接手。',
    help: '取得協助',
    items: [
      {
        q: 'Begin 是銀行嗎？',
        a: '不是。Begin 是一款持有和傳送數位美元的應用程式。你的美元存放在只有你能控制的錢包裡，而不是 Begin 管理的帳戶中。這也表示沒有存款保險。',
      },
      {
        q: '什麼是 USDC？',
        a: 'USDC 是由 Circle 發行的數位美元。每一枚的設計價值為一美元，可以兌換回一美元。它運行在公共網路 Solana 上，所以轉帳很快，費用幾乎為零。',
      },
      {
        q: '轉帳真的免費嗎？',
        a: '是的，在 Begin 帳戶之間免費。網路費用由 Begin 負擔。用信用卡新增資金和提現到銀行會收取合作夥伴費用，確認前你一定看得到。',
      },
      {
        q: '手機掉了怎麼辦？',
        a: '在新手機上安裝 Begin，輸入你的 15 個秘密單詞，你的美元就會一起回來。沒有這些單詞，任何人都無法找回錢包，包括我們，所以請抄寫下來並妥善保管。',
      },
      {
        q: '我可以在哪裡新增資金和提現？',
        a: '這取決於你所在的國家以及合作夥伴在當地支援的方式。開始前，應用程式會顯示你所在地可用的方式和費用。',
      },
      {
        q: '我已經在用 Begin Wallet，這是同一個應用程式嗎？',
        a: '是的。更新應用程式後一切都會保留：你的錢包、你的幣和你的 15 個單詞。現在美元排在最前面，其餘內容在「我」裡面。',
      },
      {
        q: '有自稱 Begin 的人向我索取 15 個單詞。',
        a: '這是詐騙。Begin 絕不會透過電子郵件、聊天、電話或私訊向你索取它們。不要告訴任何人。',
      },
      {
        q: '如何獲得協助？',
        a: '隨時獲得協助：Ask Begin 在應用程式內全天候解答，遇到需要真人處理的問題時，我們的團隊會接手。',
      },
    ],
  },
  get: {
    h: '下載 Begin',
    lead: '手機上只有你能打開的美元帳戶。',
    note: '請只從 App Store、Google Play、Chrome 線上應用程式商店或 begin.is 下載 Begin。',
    links: [
      { t: 'iPhone 版 Begin', s: 'App Store' },
      { t: 'Android 版 Begin', s: 'Google Play' },
      { t: '瀏覽器版 Begin', s: 'Chrome 線上應用程式商店' },
    ],
  },
  footer: {
    nav: '頁尾',
    links: ['如何使用', '費用', '說明中心', '安全', '部落格', '條款', '隱私'],
    cookies: 'Cookie 設定',
    language: '語言',
    legal:
      'Begin 不是銀行，不持有客戶資金。你的餘額是 USDC，一種由 Circle 發行的數位美元，存放在只有你能控制的錢包中。USDC 不是銀行存款，不受任何存款保險保障，並可能與美元脫鉤。新增資金和提現服務由我們的支付合作夥伴提供，並因國家/地區而異。Begin 是 Neuralspark Limited 的產品。',
    registered: '於愛爾蘭註冊，編號',
    vat: '增值稅號',
  },
  cookie: {
    title: 'begin.is 上的 Cookie',
    body: '我們使用必要的 Cookie 來運作網站。經你同意後，我們也會使用分析 Cookie 來了解網站的使用情況並加以改善。請參閱我們的',
    privacy: '隱私權政策',
    accept: '接受分析',
    reject: '拒絕分析',
  },
}

export const COPY: Record<Locale, Copy> = {
  en,
  es,
  'pt-BR': ptBR,
  id,
  'zh-Hans': zhHans,
  'zh-Hant': zhHant,
}

// The film section plays the film made for each language:
// Spanish gets "Hilo" (Maria), Portuguese gets "Na hora certa" (Rafael), and every other
// language gets the global film "Rain or Shine" (Mei). The copy around each film still needs
// Francis's check, and the non-English copy a native speaker's review.
export type Film = { src: string; poster: string; eyebrow: string; h: string; lead: string; label: string }

const HILO = { src: '/videos/begin-hilo-es-16x9.mp4', poster: '/videos/begin-hilo-es-poster.jpg' }
const NA_HORA_CERTA = { src: '/videos/begin-na-hora-certa-16x9.mp4', poster: '/videos/begin-na-hora-certa-poster.jpg' }
const RAIN_OR_SHINE = { src: '/videos/begin-rain-or-shine-16x9.mp4', poster: '/videos/begin-rain-or-shine-poster.jpg' }

export const FILMS: Record<Locale, Film> = {
  en: {
    ...RAIN_OR_SHINE,
    eyebrow: 'Begin in 33 seconds',
    h: 'Rain or shine, paid in seconds',
    lead: 'Mei draws in Manila. A client pays her on Begin and the dollars land in about 5 seconds, free between Begin accounts. Only she can open her account.',
    label: 'Begin film: Rain or Shine',
  },
  es: {
    ...HILO,
    eyebrow: 'Begin en 33 segundos',
    h: 'Cobra de cualquiera en Begin',
    lead: 'María teje ñandutí en Asunción. Su cliente está en Lisboa. El pago le llega en unos 5 segundos, sin costo entre cuentas Begin. Y su cuenta solo la puede abrir ella.',
    label: 'Video de Begin: Hilo',
  },
  'pt-BR': {
    ...NA_HORA_CERTA,
    eyebrow: 'O Begin em 33 segundos',
    h: 'Na hora certa',
    lead: 'Rafael recebe em dólares no Begin. Na praia de Boa Viagem, ele envia para um amigo e o dinheiro chega em cerca de 5 segundos, grátis entre contas Begin. E só ele pode abrir a conta dele.',
    label: 'Vídeo do Begin: Na hora certa',
  },
  id: {
    ...RAIN_OR_SHINE,
    eyebrow: 'Begin dalam 33 detik',
    h: 'Hujan atau cerah, dibayar dalam hitungan detik',
    lead: 'Mei menggambar di Manila. Kliennya membayar lewat Begin dan dolarnya masuk dalam sekitar 5 detik, gratis antar akun Begin. Hanya dia yang bisa membuka akunnya.',
    label: 'Film Begin: Rain or Shine',
  },
  'zh-Hans': {
    ...RAIN_OR_SHINE,
    eyebrow: '33 秒了解 Begin',
    h: '无论晴雨，几秒到账',
    lead: 'Mei 在马尼拉画插画。客户通过 Begin 付款，美元约 5 秒到账，Begin 账户之间免费。她的账户只有她自己能打开。',
    label: 'Begin 影片：Rain or Shine',
  },
  'zh-Hant': {
    ...RAIN_OR_SHINE,
    eyebrow: '33 秒認識 Begin',
    h: '無論晴雨，幾秒到帳',
    lead: 'Mei 在馬尼拉畫插畫。客戶透過 Begin 付款，美元約 5 秒到帳，Begin 帳戶之間免費。她的帳戶只有她自己能打開。',
    label: 'Begin 影片：Rain or Shine',
  },
}

// Language suggestion: the site never redirects (so search engines index every language
// through hreflang). Instead, when the browser's language has its own page, a small bar
// offers it, written in that language.
export const SUGGEST: Record<Locale, { text: string; cta: string; close: string }> = {
  en: { text: 'This page is available in English.', cta: 'View in English', close: 'Close' },
  es: { text: 'Esta página está disponible en español.', cta: 'Ver en español', close: 'Cerrar' },
  'pt-BR': { text: 'Esta página está disponível em português.', cta: 'Ver em português', close: 'Fechar' },
  id: { text: 'Halaman ini tersedia dalam Bahasa Indonesia.', cta: 'Lihat dalam Bahasa Indonesia', close: 'Tutup' },
  'zh-Hans': { text: '本页面提供简体中文版。', cta: '查看简体中文版', close: '关闭' },
  'zh-Hant': { text: '本頁面提供繁體中文版。', cta: '查看繁體中文版', close: '關閉' },
}

// Maps a browser language tag (navigator.languages) to one of our languages, or null.
export const localeFromTag = (tag: string): Locale | null => {
  const t = tag.trim().toLowerCase()
  if (t.startsWith('zh')) return /hant|-tw|-hk|-mo/.test(t) ? 'zh-Hant' : 'zh-Hans'
  const base = t.split('-')[0]
  if (base === 'en') return 'en'
  if (base === 'es') return 'es'
  if (base === 'pt') return 'pt-BR'
  if (base === 'id' || base === 'in' || base === 'ms') return 'id'
  return null
}
