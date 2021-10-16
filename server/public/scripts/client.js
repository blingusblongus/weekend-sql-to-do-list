console.log('js loaded');

$(function(){
    console.log('jquery loaded');
    getTasks();

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
}

function renderTasks(res){
    console.log(res);
    let container = $('#task-container');
    container.empty();
    
    for(let task of res){

        let html = $(`
        <div class="task">
            <input type="checkbox" class="task-checkbox" 
            ${task.complete ? 'checked' : ''}>
            <div class="task-info task-description">
                ${task.description}
            </div>
            <div class="task-info task-date-due">
                ${task.date_due}
            </div>
        </div>
        `).data(task);

        container.append(html);
    }
}