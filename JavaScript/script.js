"use strict";

const tbody = document.getElementById('task-list');
const newTask = document.getElementById('new-task');
const newTaskAdd = document.getElementById('new-task-add');

const toDos = []

//追加ボタンを押した時の関数
newTaskAdd.addEventListener('click', () => {
    if (newTask.value === '') {
        alert('新規タスクを入力してください')
        return

    } else {
        const toDo = { id:toDos.length, task: newTask.value, status: '作業中' };
        toDos.push(toDo);
        createToDos(toDos);
        newTask.value = "";
    }
});

//todoリストを表示する関数
const createToDos = (toDos) => {
    tbody.innerHTML = "";

    toDos.forEach((currentValue) => {
        const tr = document.createElement('tr');
        tbody.appendChild(tr);

        const tdId = document.createElement('td');
        const tdComment = document.createElement('td');
        const tdStatusButton = document.createElement('td');
        const tdDeleteButton = document.createElement('td');

        const tds = [tdId, tdComment, tdStatusButton, tdDeleteButton];
        tds.forEach((currentValue) => {
            tr.appendChild(currentValue);
        });

        tdId.innerHTML = currentValue.id + 1;
        tdComment.innerHTML = currentValue.task;
        tdStatusButton.appendChild(createStatusButton(currentValue, currentValue.id));
        tdDeleteButton.appendChild(createDeleteButton(tr));
    })
};

//「作業中」ボタンを作成する関数
const createStatusButton = (currentValue, currentValueId) => {
    const statusButton = document.createElement('button');
    statusButton.innerHTML = currentValue.status;

    statusButton.addEventListener('click', () => {
        if (statusButton.innerHTML === "作業中") {
            toDos[currentValueId].status = "完了"

        } else {
            toDos[currentValueId].status = "作業中"
        }
        createToDos(toDos);
    })
    return statusButton;
};

//「削除」ボタンを作成する関数
const createDeleteButton = (tr) => {
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '削除';

    deleteButton.addEventListener('click', () => {
        toDos.splice(tr.rowIndex - 1, 1);
        for (let i = 0; i < toDos.length; i++) {
            toDos[i].id = i;
        }
        createToDos(toDos);
    })
    return deleteButton;
};

//ラジオボタンを切り替えた時の関数
function radioButtonsAction() {
    if (document.getElementById('all').checked) {
        createToDos(toDos);

    } else if (document.getElementById('in-work').checked) {
        const toDosInWork = toDos.filter((value) => {
            return value.status === '作業中';
        });
        createToDos(toDosInWork); 

    } else if (document.getElementById('completed').checked) {
        const toDosCompleted = toDos.filter((value) => {
            return value.status === '完了';
        });
        createToDos(toDosCompleted);
    }
};