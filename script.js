let tsk = document.getElementById('task');
let addbtn = document.getElementById('add');
let currentId = 0;
let sno = 1;

//Hide Error Message when input field is clicked
tsk.addEventListener('click', function() {
    errMessage.style.display = 'none';
});

//Add Task when input field is not empty and Enter button on the keyboard is Pressed
tsk.addEventListener('keypress', function(e) {
    if (e.keyCode === 13) {
        add();
        show();
    }
});

//Calling My Digital Clock
setInterval(DigitalClock, 1000);

// Get Todos
function getTodos() {
    var todos = new Array();
    var todo_str = localStorage.getItem('todo');

    if (todo_str !== null) {
        todos = JSON.parse(todo_str);
    }
    return todos;
}

//Add Todo
function add() {
    let task = tsk.value;
    console.log(addbtn.innerText);

    if (addbtn.innerText == 'Update') {
        if (task != '') {
            /* let todos = getTodos();
            todos.push(task);
            localStorage.setItem('todo', JSON.stringify(todos));
           
             */

            let todos = getTodos();
            todos[currentId] = task;
            localStorage.setItem('todo', JSON.stringify(todos));
            show();

            addbtn.innerText = 'Add Task';
            document.getElementById('task').value = '';
            return false;
        } else {
            errMessage.style.display = 'block';
            return false;
        }
    } else {
        if (task != '') {
            let todos = getTodos();
            todos.push(task);
            localStorage.setItem('todo', JSON.stringify(todos));
            show();
            document.getElementById('task').value = '';
            return false;
        } else {
            errMessage.style.display = 'block';
            return false;
        }
    }
}

//Anonymous
function clearDefault(a) {
    if (a.defaultValue == a.value) {
        a.value = '';
    }
}

//Remove Todo
function remove() {
    addbtn.innerText = 'Add Task';
    document.getElementById('task').value = '';
    let id = this.getAttribute('id');
    let todos = getTodos();
    todos.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(todos));
    show();

    return false;
}

//Update Todo
function update() {
    currentId = this.getAttribute('id');

    addbtn.innerText = 'Update';
    let value = this.getAttribute('val');
    tsk.value = value;
    return false;
}

//Fetch saved Todos from Browser Local Storage and display it
function show() {
    let todos = getTodos();

    let html =
        '<ul> <li style="color:snow; font-weight:bold; width:80%" > <span style=margin-right:25px>SNO</span><span>Task</span><span id="action" >Action</span></li>';
    for (i = 0; i < todos.length; i++) {
        html +=
            '<li>' +
            '<span style=margin-right:30px>&nbsp;&nbsp;' +
            (Number(sno) + Number(i)) +
            '</span>' +
            '<span style=margin-left:7px>' +
            todos[i] +
            '</span>' +
            '<button class = "remove"  id = "' +
            i +
            '"> Delete </button><button class = "update" id = "' +
            i +
            '" val = "' +
            todos[i] +
            '" id = "' +
            i +
            '"> Update </button> </li>';
    }
    html += '</ul>';
    document.getElementById('todos').innerHTML = html;

    let deleteButtons = document.getElementsByClassName('remove');
    for (i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', remove, false);
    }

    let updateButtons = document.getElementsByClassName('update');
    for (i = 0; i < updateButtons.length; i++) {
        updateButtons[i].addEventListener('click', update, false);
    }
}

//Adding Event Listener to Add button
document.getElementById('add').addEventListener('click', add, false);
show();

//Digital Clock

function DigitalClock() {
    let now = new Date();
    hours = now.getHours();
    minutes = now.getMinutes();
    seconds = now.getSeconds();
    period = 'AM';

    if (hours >= 12) {
        period = 'PM';
    }

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    display = document.querySelector('#display');
    display.innerHTML = hours + ':' + minutes + ':' + seconds + ':' + period;
}
