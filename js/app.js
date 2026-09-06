/* =========================================================
   HINÁRIO FÉ APOSTÓLICA AMERICANA — ORQUESTRA
   Ficheiro: js/app.js
   ========================================================= */

const hinos = [
    {
        numero: "001",
        titulo: "Hino de Exemplo",
        descricao: "Primeiro hino do Hinário Fé Apostólica Americana.",
        instrumentos: ["Soprano", "Alto", "Tenor", "Baixo", "Orquestra"]
    },
    {
        numero: "002",
        titulo: "Segundo Hino",
        descricao: "Segundo hino do hinário.",
        instrumentos: ["Soprano", "Alto", "Tenor", "Baixo", "Orquestra"]
    },
    {
        numero: "003",
        titulo: "Terceiro Hino",
        descricao: "Terceiro hino do hinário.",
        instrumentos: ["Soprano", "Alto", "Tenor", "Baixo", "Orquestra"]
    }
];

/* =========================================================
   ELEMENTOS DA PÁGINA
   ========================================================= */

const hymnsGrid = document.querySelector(".hymns-grid");
const searchInput = document.querySelector("#searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");

let filtroAtual = "Todos";


/* =========================================================
   MOSTRAR HINOS
   ========================================================= */

function mostrarHinos(lista) {

    if (!hymnsGrid) return;

    hymnsGrid.innerHTML = "";

    if (lista.length === 0) {

        hymnsGrid.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🎼</div>
                <h3>Nenhum hino encontrado</h3>
                <p>Tente pesquisar por outro número ou título.</p>
            </div>
        `;

        atualizarContador(0);
        return;
    }

    lista.forEach(hino => {

        const card = document.createElement("article");

        card.className = "hymn-card";

        card.innerHTML = `
            <span class="hymn-number">
                HINO Nº ${hino.numero}
            </span>

            <h3>${hino.titulo}</h3>

            <p>${hino.descricao}</p>

            <div class="instrument-tags">
                ${hino.instrumentos.map(instrumento => `
                    <span class="instrument-tag">
                        ${instrumento}
                    </span>
                `).join("")}
            </div>

            <button
                class="hymn-button"
                onclick="abrirHino('${hino.numero}')">
                Abrir Hino
            </button>
        `;

        hymnsGrid.appendChild(card);
    });

    atualizarContador(lista.length);
}


/* =========================================================
   PESQUISA
   ========================================================= */

function pesquisarHinos() {

    const texto = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    let resultado = hinos.filter(hino => {

        const correspondePesquisa =
            hino.numero.toLowerCase().includes(texto) ||
            hino.titulo.toLowerCase().includes(texto) ||
            hino.descricao.toLowerCase().includes(texto);

        const correspondeInstrumento =
            filtroAtual === "Todos" ||
            hino.instrumentos.includes(filtroAtual);

        return correspondePesquisa && correspondeInstrumento;
    });

    mostrarHinos(resultado);
}


/* =========================================================
   FILTRO POR INSTRUMENTO
   ========================================================= */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        filtroAtual = button.textContent.trim();

        pesquisarHinos();
    });

});


/* =========================================================
   CAMPO DE PESQUISA
   ========================================================= */

if (searchInput) {

    searchInput.addEventListener("input", pesquisarHinos);

}


/* =========================================================
   ABRIR HINO
   ========================================================= */

function abrirHino(numero) {

    const hino = hinos.find(item => item.numero === numero);

    if (!hino) {
        alert("Hino não encontrado.");
        return;
    }

    const modal = document.querySelector("#hinoModal");

    if (!modal) {
        criarModal();
    }

    const modalAtual = document.querySelector("#hinoModal");

    const titulo = modalAtual.querySelector("#modalTitulo");

    titulo.textContent =
        `Hino Nº ${hino.numero} — ${hino.titulo}`;

    modalAtual.classList.add("show");

    document.body.style.overflow = "hidden";
}


/* =========================================================
   CRIAR MODAL AUTOMATICAMENTE
   ========================================================= */

function criarModal() {

    const modal = document.createElement("div");

    modal.id = "hinoModal";

    modal.className = "modal";

    modal.innerHTML = `
        <div class="modal-content">

            <div class="modal-header">

                <h3 id="modalTitulo">
                    Hino
                </h3>

                <button
                    class="close-modal"
                    onclick="fecharModal()">
                    ×
                </button>

            </div>

            <div class="modal-body">

                <div class="modal-item">

                    <div class="modal-item-icon">
                        🎼
                    </div>

                    <div>
                        <strong>Partitura</strong>
                        <span>
                            A partitura principal será disponibilizada aqui.
                        </span>
                    </div>

                </div>


                <div class="modal-item">

                    <div class="modal-item-icon">
                        🎹
                    </div>

                    <div>
                        <strong>Partes Instrumentais</strong>
                        <span>
                            Soprano, Alto, Tenor, Baixo e Orquestra.
                        </span>
                    </div>

                </div>


                <div class="modal-item">

                    <div class="modal-item-icon">
                        🎧
                    </div>

                    <div>
                        <strong>Áudio</strong>
                        <span>
                            Áudio do hino para estudo e ensaio.
                        </span>
                    </div>

                </div>


                <div class="modal-item">

                    <div class="modal-item-icon">
                        📝
                    </div>

                    <div>
                        <strong>Letra do Hino</strong>
                        <span>
                            A letra completa será apresentada nesta área.
                        </span>
                    </div>

                </div>


                <div class="modal-item">

                    <div class="modal-item-icon">
                        ℹ️
                    </div>

                    <div>
                        <strong>Informações</strong>
                        <span>
                            Informações adicionais sobre o hino.
                        </span>
                    </div>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(modal);


    /* Fechar ao clicar fora */

    modal.addEventListener("click", event => {

        if (event.target === modal) {
            fecharModal();
        }

    });
}


/* =========================================================
   FECHAR MODAL
   ========================================================= */

function fecharModal() {

    const modal = document.querySelector("#hinoModal");

    if (modal) {

        modal.classList.remove("show");

        document.body.style.overflow = "";

    }
}


/* =========================================================
   TECLA ESC PARA FECHAR
   ========================================================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        fecharModal();
    }

});


/* =========================================================
   CONTADOR DE HINOS
   ========================================================= */

function atualizarContador(numero) {

    const elementos = document.querySelectorAll(
        "[data-hino-count]"
    );

    elementos.forEach(elemento => {
        elemento.textContent = numero;
    });
}


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    mostrarHinos(hinos);

});
