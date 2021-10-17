console.log('js loaded');
const DateTime = luxon.DateTime;
let sortBy = 'Date &darr;';

$(function(){
    console.log('jquery loaded');
    getTasks();

    const dt = DateTime.now();
    console.log(dt);

    //click handlers
    $('#add-task-btn').on('click', addTask);
    $('#sort-by-btn').on('click', swapSort);
    $('#task-container').on('click', '.task-checkbox', updateStatus);
    $('#task-container').on('click', '.task-delete-icon', deleteTask);
});

function swapSort(){
    let sortOptions = ['Date &darr;', 'Date &uarr;', 'Complete', 'Incomplete'];

    let index = sortOptions.indexOf(sortBy);

    sortBy = sortOptions[index + 1] || sortOptions[0];
    $(this).html(sortBy);
    getTasks();
}

function getTasks(){
    $.ajax({
        method: 'GET',
        url: `/tasks/${sortBy}`
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
        $('.text-input').val('');
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

function deleteTask() {
    let id = $(this).closest('.task').data().id;

    $.ajax({
        method: 'DELETE',
        url: `/tasks/${id}`
    }).then(res => {
        console.log('item deleted');
        getTasks();
    }).catch(err => {
        console.log('could not delete');
    });
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
            <div class="task-info task-delete-icon">&#10005;</div>
        </div>
        `).data(task);

        if(task.complete){
            html.addClass('completed');
        }

        container.append(html);
    }
}