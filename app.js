'use strict';

// esperar o HTML carregar
document.addEventListener("DOMContentLoaded", function () {

    const input = document.getElementById("novaTarefa");
    const botao = document.getElementById("addBtn");
    const lista = document.getElementById("lista");

    // verifica se os elementos existem
    if (!input || !botao || !lista) {
        console.error("Elementos não encontrados no HTML");
        return;
    }

    // carregar tarefas salvas
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    // mostrar tarefas na tela (COM EXCLUIR)
    function renderizarTarefas() {
        lista.innerHTML = "";

        tarefas.forEach(function (tarefa, index) {
            const li = document.createElement("li");
            li.textContent = tarefa;

            // botão excluir
            const btnExcluir = document.createElement("button");
            btnExcluir.textContent = "❌";
            btnExcluir.style.marginLeft = "10px";
            btnExcluir.style.cursor = "pointer";

            btnExcluir.addEventListener("click", function () {
                tarefas.splice(index, 1);
                salvarTarefas();
                renderizarTarefas();
            });

            li.appendChild(btnExcluir);
            lista.appendChild(li);
        });
    }

    // salvar no navegador
    function salvarTarefas() {
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }

    // adicionar tarefa
    function adicionarTarefa() {
        const texto = input.value.trim();

        if (texto === "") return;

        tarefas.unshift(texto);

        salvarTarefas();
        renderizarTarefas();

        input.value = "";
    }

    // eventos
    botao.addEventListener("click", adicionarTarefa);

    input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            adicionarTarefa();
        }
    });

    // carregar ao abrir
    renderizarTarefas();
});
