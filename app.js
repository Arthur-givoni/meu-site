'use strict';

document.addEventListener("DOMContentLoaded", function () {

    const switcher = document.querySelector(".btn");
    const input = document.getElementById("novaTarefa");
    const botao = document.getElementById("addBtn");
    const lista = document.getElementById("lista");

    // tema salvo
    const temaSalvo = localStorage.getItem("tema");

    if (temaSalvo) {
        document.body.className = temaSalvo;
    }

    // ícone inicial
    if (document.body.classList.contains("dark-theme")) {
        switcher.textContent = "☀️";
    } else {
        switcher.textContent = "🌙";
    }

    // botão tema
    switcher.addEventListener("click", function () {
        if (document.body.classList.contains("light-theme")) {
            document.body.classList.replace("light-theme", "dark-theme");
            this.textContent = "☀️";
            localStorage.setItem("tema", "dark-theme");
        } else {
            document.body.classList.replace("dark-theme", "light-theme");
            this.textContent = "🌙";
            localStorage.setItem("tema", "light-theme");
        }
    });

    // tarefas
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    function renderizarTarefas() {
        lista.innerHTML = "";

        tarefas.forEach(function (tarefa, index) {
            const li = document.createElement("li");
            li.textContent = tarefa;

            const btnExcluir = document.createElement("button");
            btnExcluir.textContent = "❌";
            btnExcluir.style.marginLeft = "10px";

            btnExcluir.addEventListener("click", function () {
                tarefas.splice(index, 1);
                salvarTarefas();
                renderizarTarefas();
            });

            li.appendChild(btnExcluir);
            lista.appendChild(li);
        });
    }

    function salvarTarefas() {
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }

    function adicionarTarefa() {
        const texto = input.value.trim();
        if (texto === "") return;

        tarefas.unshift(texto);

        salvarTarefas();
        renderizarTarefas();

        input.value = "";
    }

    botao.addEventListener("click", adicionarTarefa);

    input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            adicionarTarefa();
        }
    });

    renderizarTarefas();
});
