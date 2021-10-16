console.log('js loaded');

$(function(){
    console.log('jquery loaded');
    getTasks();
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

function renderTasks(res){
    console.log(res);
    let container = $('#task-container');
    container.empty();
    
    for(let task of res){

        let html = $(`
        <div class="task">
            <input type="checkbox" ${task.complete ? 'checked' : ''}>
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