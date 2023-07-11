//Selecionar as classes do input e do botão, através de uma constante
const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-task')

let minhaListaDeItens = []

function adicionarNovaTarefa() {
    minhaListaDeItens.push({
        tarefa: input.value,
        concluida: false
    })

    //para limpar o input
    input.value = ''

    mostrarTarefas()
}

function mostrarTarefas() {

    let novaLi = ''

    minhaListaDeItens.forEach((item, position) => {
        novaLi = novaLi + `
        <li class="task ${item.concluida && "done"}">
            <img src="./img/checked.png" alt="check-na-tarefa" onclick="concluirTarefa(${position})">
            <p>${item.tarefa}</p>
            <img src="./img/trash.png" alt="tarefa-para-lixo" onclick="deletarItem(${position})">
        </li>
        `
    })

    listaCompleta.innerHTML = novaLi

    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))

}

function concluirTarefa(position) {
    minhaListaDeItens[position].concluida = !minhaListaDeItens[position].concluida

    mostrarTarefas()
}

function deletarItem(position) {
    minhaListaDeItens.splice(position)

    mostrarTarefas()
}

function recarregarTarefas() {
    const tarefasLocalStorage = localStorage.getItem('lista')

    if (tarefasLocalStorage) {
        minhaListaDeItens = JSON.parse(tarefasLocalStorage)
    }

    mostrarTarefas()
}

recarregarTarefas()
button.addEventListener('click', adicionarNovaTarefa)
