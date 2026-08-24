const headerSearchForm = document.getElementById("header-search-form");
const headerSearchInput = document.getElementById("header-search-input");
const searchSuggestions = document.getElementById("search-suggestions");

const belezaEmFocoArticles = [
  {
    id: "01",
    title: "Maquiagem para Iniciantes: Guia Completo Passo a Passo",
    category: "Iniciantes",
    description: "Aprenda maquiagem do zero com um passo a passo completo e fácil de acompanhar.",
    url: "articles/01-maquiagem-para-iniciantes.html",
    keywords: "maquiagem iniciantes basica passo a passo"
  },
  {
    id: "02",
    title: "Como Preparar a Pele Antes da Maquiagem",
    category: "Pele",
    description: "Veja como preparar corretamente a pele para melhorar o acabamento e a duração da maquiagem.",
    url: "articles/02-preparacao-de-pele.html",
    keywords: "pele preparacao hidratacao primer"
  },
  {
    id: "03",
    title: "Como Escolher a Base Ideal para Seu Tipo de Pele",
    category: "Pele",
    description: "Entenda como escolher base para pele seca, oleosa, mista e normal.",
    url: "articles/03-como-escolher-base-ideal.html",
    keywords: "base pele seca oleosa mista"
  },
  {
    id: "04",
    title: "Como Descobrir o Tom e Subtom da Sua Pele",
    category: "Pele",
    description: "Aprenda a identificar tom e subtom para escolher produtos mais harmoniosos.",
    url: "articles/04-como-descobrir-tom-subtom-pele.html",
    keywords: "tom subtom pele base"
  },
  {
    id: "05",
    title: "Como Aplicar Base sem Deixar Aspecto Pesado",
    category: "Pele",
    description: "Técnicas para conseguir cobertura bonita e natural sem efeito carregado.",
    url: "articles/05-como-aplicar-base-sem-aspecto-pesado.html",
    keywords: "base natural acabamento cobertura"
  },
  {
    id: "06",
    title: "Corretivo: Como Escolher e Aplicar Corretamente",
    category: "Pele",
    description: "Aprenda a escolher e aplicar corretivo para olheiras e pequenas imperfeições.",
    url: "articles/06-corretivo-como-escolher-aplicar.html",
    keywords: "corretivo olheira pele"
  },
  {
    id: "07",
    title: "Pó Solto ou Compacto: Quando Usar Cada Um",
    category: "Pele",
    description: "Descubra as diferenças entre pó solto e compacto e quando utilizar cada opção.",
    url: "articles/07-po-solto-ou-compacto.html",
    keywords: "po solto compacto acabamento"
  },
  {
    id: "08",
    title: "Contorno Facial para Iniciantes",
    category: "Pele",
    description: "Guia simples para entender luz, sombra e estrutura facial.",
    url: "articles/08-contorno-facial-para-iniciantes.html",
    keywords: "contorno rosto pele iniciante"
  },
  {
    id: "09",
    title: "Como Aplicar Blush de Acordo com o Formato do Rosto",
    category: "Pele",
    description: "Veja diferentes posicionamentos de blush para valorizar o formato do rosto.",
    url: "articles/09-como-aplicar-blush-formato-rosto.html",
    keywords: "blush rosto formato"
  },
  {
    id: "10",
    title: "Iluminador: Onde Aplicar para um Resultado Natural",
    category: "Pele",
    description: "Aprenda os pontos estratégicos para aplicar iluminador com naturalidade.",
    url: "articles/10-iluminador-onde-aplicar.html",
    keywords: "iluminador glow pele"
  },
  {
    id: "11",
    title: "Design de Sobrancelhas para Iniciantes",
    category: "Sobrancelhas",
    description: "Conheça princípios básicos para deixar as sobrancelhas mais equilibradas.",
    url: "articles/11-design-de-sobrancelhas-para-iniciantes.html",
    keywords: "sobrancelha design iniciante"
  },
  {
    id: "12",
    title: "Como Mapear as Sobrancelhas",
    category: "Sobrancelhas",
    description: "Aprenda a localizar início, arco e final das sobrancelhas.",
    url: "articles/12-como-mapear-sobrancelhas.html",
    keywords: "sobrancelha mapeamento"
  },
  {
    id: "13",
    title: "Como Preencher Sobrancelhas Naturalmente",
    category: "Sobrancelhas",
    description: "Técnicas para preencher falhas sem deixar o resultado marcado demais.",
    url: "articles/13-como-preencher-sobrancelhas-naturalmente.html",
    keywords: "sobrancelha preenchimento natural"
  },
  {
    id: "14",
    title: "Erros Comuns ao Fazer as Sobrancelhas",
    category: "Sobrancelhas",
    description: "Conheça erros frequentes que podem deixar as sobrancelhas artificiais.",
    url: "articles/14-erros-comuns-sobrancelhas.html",
    keywords: "sobrancelha erros"
  },
  {
    id: "15",
    title: "Produtos Essenciais para Sobrancelhas",
    category: "Sobrancelhas",
    description: "Veja quais produtos podem ajudar na definição e finalização das sobrancelhas.",
    url: "articles/15-produtos-essenciais-sobrancelhas.html",
    keywords: "sobrancelha produtos lapis gel"
  },
  {
    id: "16",
    title: "Como Aplicar Cílios Postiços Passo a Passo",
    category: "Cílios",
    description: "Aprenda a medir, aplicar cola e posicionar cílios postiços corretamente.",
    url: "articles/16-como-aplicar-cilios-posticos.html",
    keywords: "cilios posticos cola aplicar"
  },
  {
    id: "17",
    title: "Como Cortar e Ajustar Cílios Postiços",
    category: "Cílios",
    description: "Veja como ajustar o tamanho da faixa de cílios antes da aplicação.",
    url: "articles/17-como-cortar-ajustar-cilios-posticos.html",
    keywords: "cilios cortar ajustar"
  },
  {
    id: "18",
    title: "Como Escolher Cílios Postiços para Cada Formato de Olho",
    category: "Cílios",
    description: "Descubra modelos de cílios que combinam melhor com diferentes formatos de olhos.",
    url: "articles/18-cilios-posticos-formato-olho.html",
    keywords: "cilios formato olho"
  },
  {
    id: "19",
    title: "Como Retirar Cílios Postiços sem Machucar",
    category: "Cílios",
    description: "Aprenda a remover cílios postiços com cuidado e sem puxar a pele.",
    url: "articles/19-como-retirar-cilios-posticos.html",
    keywords: "cilios remover retirar"
  },
  {
    id: "20",
    title: "Máscara de Cílios: Técnicas para Dar Volume e Alongamento",
    category: "Cílios",
    description: "Técnicas de aplicação de máscara para destacar os cílios.",
    url: "articles/20-mascara-de-cilios-volume-alongamento.html",
    keywords: "mascara cilios volume alongamento"
  },
  {
    id: "21",
    title: "Delineado para Iniciantes",
    category: "Olhos",
    description: "Aprenda os fundamentos do delineado com técnicas simples e progressivas.",
    url: "articles/21-delineado-para-iniciantes.html",
    keywords: "delineado olhos iniciante"
  },
  {
    id: "22",
    title: "Como Fazer Delineado Gatinho",
    category: "Olhos",
    description: "Passo a passo para construir um delineado gatinho mais simétrico.",
    url: "articles/22-como-fazer-delineado-gatinho.html",
    keywords: "delineado gatinho olhos"
  },
  {
    id: "23",
    title: "Delineado para Cada Formato de Olho",
    category: "Olhos",
    description: "Veja como adaptar o delineado às características de diferentes olhos.",
    url: "articles/23-delineado-para-cada-formato-de-olho.html",
    keywords: "delineado formato olhos"
  },
  {
    id: "24",
    title: "Como Corrigir um Delineado Errado",
    category: "Olhos",
    description: "Truques práticos para corrigir pequenas falhas sem refazer toda a maquiagem.",
    url: "articles/24-como-corrigir-delineado-errado.html",
    keywords: "delineado corrigir erro"
  },
  {
    id: "25",
    title: "Tipos de Delineador e Como Usar Cada Um",
    category: "Olhos",
    description: "Conheça delineadores em caneta, gel e líquido e suas principais diferenças.",
    url: "articles/25-tipos-de-delineador.html",
    keywords: "delineador caneta gel liquido"
  },
  {
    id: "26",
    title: "Sombra para Iniciantes: Guia Completo",
    category: "Olhos",
    description: "Entenda preparação, aplicação e construção de sombras de forma simples.",
    url: "articles/26-sombra-para-iniciantes.html",
    keywords: "sombra olhos iniciante"
  },
  {
    id: "27",
    title: "Como Esfumar Sombra Corretamente",
    category: "Olhos",
    description: "Aprenda movimentos, pressão e transições para um esfumado mais uniforme.",
    url: "articles/27-como-esfumar-sombra-corretamente.html",
    keywords: "sombra esfumar esfumado"
  },
  {
    id: "28",
    title: "Cut Crease Passo a Passo",
    category: "Olhos",
    description: "Guia para construir um cut crease com definição e contraste.",
    url: "articles/28-cut-crease-passo-a-passo.html",
    keywords: "cut crease sombra olhos"
  },
  {
    id: "29",
    title: "Smokey Eye Passo a Passo",
    category: "Olhos",
    description: "Aprenda a criar um olho esfumado intenso com transições bem trabalhadas.",
    url: "articles/29-smokey-eye-passo-a-passo.html",
    keywords: "smokey eye olhos sombra"
  },
  {
    id: "30",
    title: "Como Combinar Cores de Sombra",
    category: "Olhos",
    description: "Princípios simples de combinação de cores para criar maquiagens harmoniosas.",
    url: "articles/30-como-combinar-cores-de-sombra.html",
    keywords: "sombra cores combinacao"
  },
  {
    id: "31",
    title: "Batom Vermelho: Como Escolher o Tom Ideal",
    category: "Lábios",
    description: "Veja como escolher diferentes tons de vermelho de acordo com o efeito desejado.",
    url: "articles/31-batom-vermelho-como-escolher-tom-ideal.html",
    keywords: "batom vermelho labios"
  },
  {
    id: "32",
    title: "Como Fazer o Batom Durar Mais",
    category: "Lábios",
    description: "Técnicas de preparação e aplicação para aumentar a duração do batom.",
    url: "articles/32-como-fazer-batom-durar-mais.html",
    keywords: "batom durar labios"
  },
  {
    id: "33",
    title: "Como Aumentar Visualmente os Lábios com Maquiagem",
    category: "Lábios",
    description: "Aprenda efeitos de contorno e luz para criar aparência de maior volume.",
    url: "articles/33-como-aumentar-visualmente-os-labios.html",
    keywords: "labios aumentar maquiagem"
  },
  {
    id: "34",
    title: "Como Fazer Contorno Labial",
    category: "Lábios",
    description: "Passo a passo para definir melhor o formato dos lábios com lápis.",
    url: "articles/34-como-fazer-contorno-labial.html",
    keywords: "contorno labial lapis batom"
  },
  {
    id: "35",
    title: "Gloss, Batom Cremoso ou Matte: Como Escolher",
    category: "Lábios",
    description: "Compare acabamentos e descubra qual combina melhor com cada ocasião.",
    url: "articles/35-gloss-batom-cremoso-ou-matte.html",
    keywords: "gloss batom matte cremoso"
  },
  {
    id: "36",
    title: "Pincéis de Maquiagem: Guia Completo",
    category: "Produtos",
    description: "Conheça os principais pincéis e entenda a função de cada formato.",
    url: "articles/36-pinceis-de-maquiagem-guia-completo.html",
    keywords: "pinceis maquiagem ferramentas"
  },
  {
    id: "37",
    title: "Como Higienizar Pincéis de Maquiagem",
    category: "Produtos",
    description: "Aprenda a limpar, enxaguar, secar e conservar pincéis de maquiagem.",
    url: "articles/37-como-higienizar-pinceis-de-maquiagem.html",
    keywords: "pincel higiene limpar"
  },
  {
    id: "38",
    title: "Esponja de Maquiagem: Como Usar Corretamente",
    category: "Produtos",
    description: "Veja como umedecer, aplicar produtos e higienizar sua esponja.",
    url: "articles/38-esponja-de-maquiagem-como-usar.html",
    keywords: "esponja maquiagem aplicar"
  },
  {
    id: "39",
    title: "Kit Básico de Maquiagem para Iniciantes",
    category: "Produtos",
    description: "Monte um kit funcional sem comprar produtos desnecessários.",
    url: "articles/39-kit-basico-de-maquiagem.html",
    keywords: "kit maquiagem iniciante produtos"
  },
  {
    id: "40",
    title: "Como Organizar Produtos de Maquiagem",
    category: "Produtos",
    description: "Ideias para armazenar produtos de forma prática, limpa e acessível.",
    url: "articles/40-como-organizar-produtos-de-maquiagem.html",
    keywords: "organizar maquiagem produtos"
  },
  {
    id: "41",
    title: "Maquiagem Glam Profissional Passo a Passo",
    category: "Tutoriais",
    description: "Construa uma maquiagem glam completa trabalhando pele, olhos e acabamento.",
    url: "articles/41-maquiagem-glam-profissional.html",
    keywords: "glam maquiagem profissional"
  },
  {
    id: "42",
    title: "Maquiagem para Festa à Noite",
    category: "Tutoriais",
    description: "Ideias e técnicas para criar uma maquiagem marcante para eventos noturnos.",
    url: "articles/42-maquiagem-para-festa-a-noite.html",
    keywords: "maquiagem festa noite"
  },
  {
    id: "43",
    title: "Maquiagem para Casamento",
    category: "Tutoriais",
    description: "Aprenda pontos importantes para uma maquiagem elegante e resistente para casamento.",
    url: "articles/43-maquiagem-para-casamento.html",
    keywords: "maquiagem casamento noiva convidada"
  },
  {
    id: "44",
    title: "Maquiagem Natural para o Dia a Dia",
    category: "Tutoriais",
    description: "Passo a passo de maquiagem leve e prática para diferentes rotinas.",
    url: "articles/44-maquiagem-natural-dia-a-dia.html",
    keywords: "maquiagem natural dia"
  },
  {
    id: "45",
    title: "Maquiagem para Fotos e Vídeos",
    category: "Tutoriais",
    description: "Entenda como luz, acabamento e contraste interferem em fotos e gravações.",
    url: "articles/45-maquiagem-para-fotos-e-videos.html",
    keywords: "maquiagem fotos videos camera"
  },
  {
    id: "46",
    title: "Maquiagem Drag Queen para Iniciantes",
    category: "Drag Queen",
    description: "Conheça etapas fundamentais de construção de uma maquiagem drag.",
    url: "articles/46-maquiagem-drag-queen-para-iniciantes.html",
    keywords: "drag queen maquiagem iniciante"
  },
  {
    id: "47",
    title: "Contorno Drag Queen: Transformação e Estrutura Facial",
    category: "Drag Queen",
    description: "Aprenda princípios de luz e sombra usados para transformar a estrutura visual do rosto.",
    url: "articles/47-contorno-drag-queen.html",
    keywords: "drag contorno rosto"
  },
  {
    id: "48",
    title: "Sobrancelhas para Maquiagem Drag Queen",
    category: "Drag Queen",
    description: "Veja técnicas de desenho e construção de sobrancelhas para maquiagem drag.",
    url: "articles/48-sobrancelhas-maquiagem-drag-queen.html",
    keywords: "drag sobrancelhas"
  },
  {
    id: "49",
    title: "Olhos Dramáticos e Cut Crease Drag Queen",
    category: "Drag Queen",
    description: "Aprenda a construir olhos de alto contraste e cut crease mais dramático.",
    url: "articles/49-olhos-dramaticos-cut-crease-drag.html",
    keywords: "drag olhos cut crease"
  },
  {
    id: "50",
    title: "Maquiagem Artística: Primeiros Passos e Técnicas Essenciais",
    category: "Maquiagem Artística",
    description: "Uma introdução às ferramentas, planejamento e técnicas fundamentais de maquiagem artística.",
    url: "articles/50-maquiagem-artistica-primeiros-passos.html",
    keywords: "maquiagem artistica arte"
  }
];

window.belezaEmFocoArticles = belezaEmFocoArticles;

function normalizeSearchText(text) {
  return String(text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function searchArticles(query) {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return [];
  }

  const words = normalizedQuery
    .split(/\s+/)
    .filter(Boolean);

  return belezaEmFocoArticles
    .map((article) => {
      const title = normalizeSearchText(article.title);
      const category = normalizeSearchText(article.category);
      const description = normalizeSearchText(article.description);
      const keywords = normalizeSearchText(article.keywords);

      const combinedText = `${title} ${category} ${description} ${keywords}`;

      let score = 0;

      words.forEach((word) => {
        if (title.includes(word)) {
          score += 8;
        }

        if (category.includes(word)) {
          score += 5;
        }

        if (keywords.includes(word)) {
          score += 4;
        }

        if (description.includes(word)) {
          score += 2;
        }

        if (combinedText.includes(word)) {
          score += 1;
        }
      });

      if (title.startsWith(normalizedQuery)) {
        score += 15;
      }

      if (title.includes(normalizedQuery)) {
        score += 10;
      }

      return {
        ...article,
        score
      };
    })
    .filter((article) => article.score > 0)
    .sort((a, b) => b.score - a.score);
}

function hideSearchSuggestions() {
  if (!searchSuggestions) {
    return;
  }

  searchSuggestions.innerHTML = "";
  searchSuggestions.style.display = "none";
}

function renderSearchSuggestions(query) {
  if (!searchSuggestions) {
    return;
  }

  const normalizedQuery = normalizeSearchText(query);

  if (normalizedQuery.length < 2) {
    hideSearchSuggestions();
    return;
  }

  const results = searchArticles(query).slice(0, 6);

  if (!results.length) {
    searchSuggestions.innerHTML = `
      <div class="search-suggestion-empty">
        Nenhum resultado encontrado.
      </div>
    `;

    searchSuggestions.style.display = "block";
    return;
  }

  searchSuggestions.innerHTML = results
    .map(
      (article) => `
        <a
          class="search-suggestion-item"
          href="${article.url}"
        >
          <span class="search-suggestion-category">
            ${article.category}
          </span>

          <strong>
            ${article.title}
          </strong>
        </a>
      `
    )
    .join("");

  searchSuggestions.style.display = "block";
}

if (headerSearchInput) {
  headerSearchInput.addEventListener("input", () => {
    renderSearchSuggestions(headerSearchInput.value);
  });

  headerSearchInput.addEventListener("focus", () => {
    if (headerSearchInput.value.trim().length >= 2) {
      renderSearchSuggestions(headerSearchInput.value);
    }
  });

  headerSearchInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      hideSearchSuggestions();
      headerSearchInput.blur();
    }
  });
}

if (headerSearchForm && headerSearchInput) {
  headerSearchForm.addEventListener("submit", (event) => {
    const query = headerSearchInput.value.trim();

    if (!query) {
      event.preventDefault();
      headerSearchInput.focus();
      return;
    }

    hideSearchSuggestions();
  });
}

document.addEventListener("click", (event) => {
  if (!headerSearchForm) {
    return;
  }

  if (!headerSearchForm.contains(event.target)) {
    hideSearchSuggestions();
  }
});scheduler