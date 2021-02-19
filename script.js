const btnAdd = document.querySelector('#criar-tarefa');
const btnDeleteAll = document.querySelector('#apaga-tudo');
const btnDeleteCompleteTasks = document.querySelector('#remover-finalizados');
const btnSaveTasks = document.querySelector('#salvar-tarefas');
const inputTask = document.querySelector('#texto-tarefa');
const orderedList = document.querySelector('#lista-tarefas');
const taskList = document.querySelectorAll('li');

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
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].classList.contains('completed')) {
            orderedList.removeChild(taskList[i]);
        }
    }
}

btnDeleteCompleteTasks.onclick = deleteCompleteTask;

//Função para salvar as tarefas 
function savingTasks(){
    localStorage.setItem('tasks', orderedList.innerHTML);
}

btnSaveTasks.onclick=savingTasks;

//Condicional para exibir lista salva no localStorage (caso haja alguma) na página
if (localStorage.getItem('tasks')){
    orderedList.innerHTML=localStorage.getItem('tasks');
} 


