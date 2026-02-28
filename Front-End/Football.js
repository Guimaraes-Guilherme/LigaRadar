const API_URL = "http://127.0.0.1:8000/api/";

let campeonatoAtual = "brasileirao";

document.addEventListener("DOMContentLoaded", () => {
    carregarJogos(campeonatoAtual);
});


// função que altera os campeonato
function mostrarCampeonato(nome, botao) {

    campeonatoAtual = nome;

    // remover active de todos
    document.querySelectorAll('.tab-button')
        .forEach(btn => btn.classList.remove('active'));

    // ativar o clicado
    if (botao) {
        botao.classList.add('active');
    }

    // esconder todos
    document.querySelectorAll('.match-group')
        .forEach(group => group.classList.add('hidden'));

    // mostrar selecionado com segurança
    if (nome === 'all') {

        document.querySelectorAll('.match-group')
            .forEach(group => group.classList.remove('hidden'));

    } else {

        const grupo = document.querySelector('.' + nome);

        if (grupo) {
            grupo.classList.remove('hidden');
        }

    }

    // ⭐ carregar jogos da API
    carregarJogos(nome);
}



// função carregar jogos
async function carregarJogos(liga) {

    const container = document.getElementById("matches-container");

    if (!container) {
        console.error("Elemento matches-container não encontrado");
        return;
    }

    container.innerHTML = `
        <div class="text-gray-400">Carregando jogos...</div>
    `;

    try {

        const response = await fetch(API_URL + liga);

        if (!response.ok) {
            throw new Error("Erro na API");
        }

        const data = await response.json();

        const jogos = data.dados;

        if (!jogos || jogos.length === 0) {

            container.innerHTML = `
                <div class="text-gray-400">
                    Nenhum jogo encontrado
                </div>
            `;

            return;
        }

        container.innerHTML = "";

        jogos.forEach(jogo => {

            const home = jogo.teams.home.name;
            const away = jogo.teams.away.name;

            const date = new Date(jogo.fixture.date);

            const hora = date.toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit"
            });

            const ligaNome = jogo.league.name;

            const card = `
                <div class="match-card">

                    <div>
                        <p class="competition">${ligaNome}</p>

                        <div class="team">${home}</div>

                        <div class="team">${away}</div>
                    </div>

                    <div class="match-time">${hora}</div>

                </div>
            `;

            container.innerHTML += card;

        });

    } catch (error) {

        container.innerHTML = `
            <div class="text-red-400">
                Erro ao carregar jogos
            </div>
        `;

        console.error("Erro:", error);
    }
}