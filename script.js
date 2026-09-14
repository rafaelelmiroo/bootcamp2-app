async function buscarDados(termo) {
  const area = document.getElementById("resultado");
  area.innerHTML = "<p>Carregando...</p>";

  try {
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${termo}`);

    if (!resposta.ok) {
      throw new Error("Pokémon não encontrado");
    }

    const dados = await resposta.json();

    // Extração das informações da API
    const nome = dados.name;
    const imagem = dados.sprites.front_default || dados.sprites.other["official-artwork"].front_default;
    const altura = (dados.height / 10).toFixed(1); // Converte para metros
    const peso = (dados.weight / 10).toFixed(1);   // Converte para kg
    const id = String(dados.id).padStart(3, '0');
    const tipos = dados.types.map(t => t.type.name).join(', ');

    // Renderização no HTML
    area.innerHTML = `
      <div class="pokemon-card">
        <span class="id-tag">#${id}</span>
        <h2>${nome}</h2>
        <img src="${imagem}" alt="${nome}">
        <div class="details">
          <p><strong>Tipo(s):</strong> ${tipos}</p>
          <p><strong>Altura:</strong> ${altura} m</p>
          <p><strong>Peso:</strong> ${peso} kg</p>
        </div>
      </div>
    `;

  } catch (erro) {
    area.innerHTML = "<p class='error-msg'>Ops! Pokémon não encontrado. Tente outro termo.</p>";
  }
}

// Evento de clique no botão
document.getElementById("botao-buscar").addEventListener("click", () => {
  const termo = document.getElementById("campo-busca").value.toLowerCase().trim();
  if (termo) {
    buscarDados(termo);
  }
});

// Permitir busca ao pressionar a tecla "Enter"
document.getElementById("campo-busca").addEventListener("keypress", (e) => {
  if (e.key === 'Enter') {
    const termo = document.getElementById("campo-busca").value.toLowerCase().trim();
    if (termo) {
      buscarDados(termo);
    }
  }
});