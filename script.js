import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = 'https://vkkgalgjmyvbkswtxvqv.supabase.co';
const SUPABASE_KEY = "sb_publishable_BVvLztDbI5lvcl5XDF1f6Q_fZ_9r2HE";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// --- FUNÇÕES CRUD DO SUPABASE ---

// CREATE - Adicionar ao Time
async function salvarFavorito(nome, extra) {
  const { error } = await supabase
    .from("time_pokemon")
    .insert({ nome_item: nome, dados_extra: extra });

  if (error) {
    console.error("Erro ao salvar:", error);
    alert("Erro ao adicionar Pokémon ao time!");
  } else {
    listarFavoritos();
  }
}

// READ - Listar o Time
async function listarFavoritos() {
  const container = document.getElementById("time-list");
  const { data, error } = await supabase
    .from("time_pokemon")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar time:", error);
    container.innerHTML = "<p>Erro ao carregar o time.</p>";
    return;
  }

  if (data.length === 0) {
    container.innerHTML = "<p style='grid-column: 1/-1;'>Nenhum Pokémon no time ainda.</p>";
    return;
  }

  container.innerHTML = data.map(item => `
    <div class="team-card">
      <h4>${item.nome_item}</h4>
      <p><small>${item.dados_extra}</small></p>
      <button class="btn-del" onclick="removerFavorito(${item.id})">Remover</button>
    </div>
  `).join("");
}

// DELETE - Remover do Time
async function removerFavorito(id) {
  const { error } = await supabase
    .from("time_pokemon")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Erro ao remover:", error);
  } else {
    listarFavoritos();
  }
}

// Expõe a função de remoção no escopo global para o botão HTML chamar
window.removerFavorito = removerFavorito;

// --- BUSCA NA POKEAPI ---

async function buscarDados(termo) {
  const area = document.getElementById("resultado");
  area.innerHTML = "<p>Carregando...</p>";

  try {
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${termo}`);

    if (!resposta.ok) {
      throw new Error("Pokémon não encontrado");
    }

    const dados = await resposta.json();
    const nome = dados.name;
    const imagem = dados.sprites.front_default || dados.sprites.other["official-artwork"].front_default;
    const id = String(dados.id).padStart(3, '0');
    const tipo = dados.types[0].type.name;

    area.innerHTML = `
      <div class="pokemon-card">
        <span class="id-tag">#${id}</span>
        <h2>${nome}</h2>
        <img src="${imagem}" alt="${nome}">
        <div class="details">
          <p><strong>Tipo:</strong> ${tipo}</p>
        </div>
        <button class="btn-add" id="btn-adicionar"> + Salvar no Time</button>
      </div>
    `;

    document.getElementById("btn-adicionar").addEventListener("click", () => {
      salvarFavorito(nome, `#${id} - ${tipo}`);
    });

  } catch (erro) {
    area.innerHTML = "<p class='error-msg'>Ops! Pokémon não encontrado. Tente outro termo.</p>";
  }
}

// Eventos de Busca
document.getElementById("botao-buscar").addEventListener("click", () => {
  const termo = document.getElementById("campo-busca").value.toLowerCase().trim();
  if (termo) buscarDados(termo);
});

document.getElementById("campo-busca").addEventListener("keypress", (e) => {
  if (e.key === 'Enter') {
    const termo = document.getElementById("campo-busca").value.toLowerCase().trim();
    if (termo) buscarDados(termo);
  }
});

// Inicialização
listarFavoritos();