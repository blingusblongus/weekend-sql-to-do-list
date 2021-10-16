console.log('js loaded');
const DateTime = luxon.DateTime;
let sortBy = 'date';

$(function(){
    console.log('jquery loaded');
    getTasks();

    const dt = DateTime.now();
    console.log(dt);

    //click handlers
    $('#add-task-btn').on('click', addTask);
    $('#task-container').on('click', '.task-checkbox', updateStatus);
});

function getTasks(){
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(res => {
        renderTasks(res);
    }).catch(err => {
        console.log('error getting tasks', err);
        
    });
}

function addTask() {
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: {
            description: $('#description-in').val(),
            dateDue: $('#date-due-in').val(),
            complete: false
        }
    }).then(res => {
        console.log('task created');
        getTasks();
    }).catch(err => {
        console.log('error creating task', err);
    })
}

function updateStatus() {
    console.log('checkbox clicked');
    let task = $(this).closest('.task');
    let id = task.data().id;
    let checked = task.data().complete;

    console.log(checked);

    $.ajax({
        method: 'PUT',
        url: `/tasks/${id}`,
        data: {
            complete: !checked
        }
    }).then(res => {
        console.log('PUT success');
        getTasks();
    }).catch(err => {
        console.log('PUT err', err);
    })
}

function renderTasks(res){
    console.log(res);
    let container = $('#task-container');
    container.empty();
    
    for(let task of res){
        // use luxon and split to parse SQL date
        let date = task.date_due ? DateTime.fromSQL(task.date_due.split('T')[0]) : '';

        let html = $(`
        <div class="task">
            <input type="checkbox" class="task-checkbox" 
            ${task.complete ? 'checked' : ''}>
            <div class="task-info task-description">
                ${task.description}
            </div>
            <div class="task-info task-date-due">
                ${date.toLocaleString()}
            </div>
        </div>
        `).data(task);

        container.append(html);
    }
}