const btnAdd = document.querySelector('#criar-tarefa');
const btnDeleteAll = document.querySelector('#apaga-tudo');
const btnDeleteCompleteTasks = document.querySelector('#remover-finalizados');
const btnSaveTasks = document.querySelector('#salvar-tarefas');
const btnMoveUp = document.querySelector('#mover-cima');
const btnMoveDown = document.querySelector('#mover-baixo');
const btnRemoveSelectedTask = document.querySelector('#remover-selecionado');
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
function deletingAllTasks() {
    orderedList.innerHTML = '';
    localStorage.setItem('tasks', "");
}

btnDeleteAll.onclick = deletingAllTasks;

//Função para apagar as tarefas concluídas da lista
function deleteCompleteTask() {
    const liCompleteTask = document.querySelectorAll('li');
    for (let i = 0; i < liCompleteTask.length; i++) {
        if (liCompleteTask[i].classList.contains('completed')) {
            orderedList.removeChild(liCompleteTask[i]);
        }
    }
}

btnDeleteCompleteTasks.onclick = deleteCompleteTask;

//Função para salvar as tarefas 
function savingTasks() {
    localStorage.setItem('tasks', orderedList.innerHTML);
}

btnSaveTasks.onclick = savingTasks;

//Condicional para exibir lista salva no localStorage (caso haja alguma) na página
if (localStorage.getItem('tasks')) {
    orderedList.innerHTML = localStorage.getItem('tasks');
}

//Função para mover um item selecionado para cima
function moveSelectedTaskUp() {
    const liSelectedTask = document.querySelectorAll('li');
    let temporaryTask = '';
    let temporaryClassName = '';
    let temporaryClassName2 = '';
    for (let i = 1; i < liSelectedTask.length; i++) {
        if (liSelectedTask[i].classList.contains('selected')) {
            temporaryTask = liSelectedTask[i].innerHTML;
            temporaryClassName = liSelectedTask[i].className;
            temporaryClassName2 = liSelectedTask[i - 1].className;
            liSelectedTask[i].innerHTML = liSelectedTask[i - 1].innerHTML;
            liSelectedTask[i].className = temporaryClassName2;
            liSelectedTask[i - 1].innerHTML = temporaryTask;
            liSelectedTask[i - 1].className = temporaryClassName;
        }
    }
}

btnMoveUp.onclick = moveSelectedTaskUp;

//Função para mover um item selecionado para baixo
function moveSelectedTaskDown() {
    const liSelectedTask = document.querySelectorAll('li');
    let temporaryTask = '';
    let temporaryClassName = '';
    let temporaryClassName2 = '';
    let index = 0;
    for (let i = 0; i < (liSelectedTask.length - 1); i++) {
        if (liSelectedTask[i].classList.contains('selected')) {
            temporaryTask = liSelectedTask[i].innerHTML;
            temporaryClassName = liSelectedTask[i].className;
            temporaryClassName2 = liSelectedTask[i + 1].className;

            liSelectedTask[i].innerHTML = liSelectedTask[i + 1].innerHTML;
            liSelectedTask[i + 1].innerHTML = temporaryTask;

            index = i;
        }
    }

    liSelectedTask[index + 1].className = temporaryClassName;
    liSelectedTask[index].className = temporaryClassName2;
}

btnMoveDown.onclick = moveSelectedTaskDown;

//Função para remover tarefa selecionada
function removingSelectedTask() {
    const liSelectedTask = document.querySelectorAll('li');
    for (let i = 0; i < liSelectedTask.length; i++) {
        if (liSelectedTask[i].classList.contains('selected')) {
            orderedList.removeChild(liSelectedTask[i]);
        }
    }
}

btnRemoveSelectedTask.onclick = removingSelectedTask;