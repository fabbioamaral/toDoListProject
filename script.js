const btnAdd = document.querySelector('#criar-tarefa');
const btnDeleteAll = document.querySelector('#apaga-tudo');
const inputTask = document.querySelector('#texto-tarefa');
const orderedList = document.querySelector('#lista-tarefas');

//Função para adicionar tarefas à lista
function addingTask() {
    if (inputTask.value === '') {
        alert('Campo vazio');
    }
    else {
        var task = document.createElement('li');
        task.onclick = selectingTask;
        task.ondblclick = completingTask;
        task.innerHTML = inputTask.value;
        orderedList.appendChild(task);
        inputTask.value = "";
    }
}

btnAdd.onclick = addingTask;

//Função para alterar a cor de fundo de uma tarefa que foi selecionada pelo usuário
function selectingTask(event) {
    const liTarget = event.target;
    const checkSelected = document.querySelector('.selected');
    if (checkSelected) {
        checkSelected.classList.remove('selected');
    }

    liTarget.classList.add('selected');
}

//Função para tachar itens concluídos
function completingTask(event) {
    const liTarget = event.target;
    if (liTarget.classList.contains('completed')) {
        liTarget.classList.remove('completed');
    }
    else {
        liTarget.classList.add('completed')
    }
}

//Função para apagar todos as tarefas da lista
function deletingAllTasks () {
    orderedList.innerHTML='';
}

btnDeleteAll.onclick=deletingAllTasks;