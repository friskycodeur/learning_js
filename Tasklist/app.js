// Define UI vars

const form=document.querySelector('#task-form');
const taskList=document.querySelector('.collection');
const clearBtn=document.querySelector('.clear-tasks');
const filter=document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Load all eventlisteners

loadEvenetListeners();

function loadEvenetListeners(){
    //dom load event
    document.addEventListener('DOMContentLoaded',getTasks);
    // Add task event
    form.addEventListener('submit',addTask);
    // remove task event
    taskList.addEventListener('click',removeTask);
    // clear task event
    clearBtn.addEventListener('click',clearTasks);
    // filter task event
    filter.addEventListener('keyup',filterTasks);
}



// get tasks from LS
function getTasks(){
    let tasks;
    if(localStorage.getItem('task')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        //create li element
        const li= document.createElement('li');
        // add class
        li.className='collection-item';
        // Create text note and append the list
        li.appendChild(document.createTextNode(task));
        // create remove link element
        const link= document.createElement('a');
        link.className='delete-item secondary-content';

        // icon html

        link.innerHTML='<i class="fa fa-remove"></i>';
        // append link to li
        li.appendChild(link);


        // append li to ul
        taskList.appendChild(li);
    });
}






// Add task function

function addTask(e) {
    if(taskInput.value==''){
        alert('Add a task');
    }

    //create li element
    const li= document.createElement('li');
    // add class
    li.className='collection-item';
    // Create text note and append the list
    li.appendChild(document.createTextNode(taskInput.value));
    // create remove link element
    const link= document.createElement('a');
    link.className='delete-item secondary-content';

    // icon html

    link.innerHTML='<i class="fa fa-remove"></i>';
    // append link to li
    li.appendChild(link);


    // append li to ul
    taskList.appendChild(li);

    // store in local storage
    storeLocally(taskInput.value);

    //clear input

    taskInput.value='';

    e.preventDefault();
}

function storeLocally(task){
    let tasks;
    if(localStorage.getItem('task')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}



function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();
        }
        
    }
}

// clear tasks
function clearTasks(e){
    taskList.innerHTML='';
}


function filterTasks(e){

    const text=e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(
    function(task){
        const item=text.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display='none';
        }
});
}