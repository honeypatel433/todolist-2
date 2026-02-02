let tasks = [];
let editIndex = -1;

function addTask(){
    let tasktext = document.getElementById("taskinput").value.trim();
    let taskdate = document.getElementById("dateinput").value;
    let tasktime = document.getElementById("timeinput").value;
    let taskstatus = document.getElementById("statusinput").value;

    if(tasktext === "" || taskdate === "" || tasktime === "" || taskstatus === ""){
        alert("Please enter all fields including status");
        return;
    }

    let exists = tasks.some((task, index) => 
        task.text.toLowerCase() === tasktext.toLowerCase() && index !== editIndex
    );

    if(exists){
        alert("This task already exists!");
        return;
    }

    let taskobj = { 
        text: tasktext, 
        date: taskdate, 
        time: tasktime,
        status: taskstatus
    };

    if(editIndex === -1){
        tasks.push(taskobj); 
    } else {
        tasks[editIndex] = taskobj; 
        editIndex = -1;
    }

    clearInput();
    sortTask();
    displayTask();
}
function displayTask(taskArray = tasks){
    let list = document.getElementById("tasklist");
    list.innerHTML = "";

    taskArray.forEach((task,index) =>{

        let statusBadge = 
            task.status === "Pending" 
                ? `<span class="badge bg-secondary px-3 py-2"> Pending</span>`
            : task.status === "Ongoing"
                ? `<span class="badge bg-warning text-dark px-3 py-2">Ongoing</span>`
                : `<span class="badge bg-success px-3 py-2">Complete</span>`;

        list.innerHTML += `
        <tr>
            <td>${task.text}</td>
            <td>${task.date}</td>
            <td>${task.time}</td>
            <td>${statusBadge}</td>
            <td>
                <button class="btn btn-sm btn-warning me-1" onclick="editTask(${index})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">Delete</button>
            </td>
        </tr>`;
    });
}

function deleteTask(index){
    tasks.splice(index,1);
    displayTask();
}

function editTask(index){
    let task = tasks[index];
    document.getElementById("taskinput").value = task.text;
    document.getElementById("dateinput").value = task.date;
    document.getElementById("timeinput").value = task.time;
    document.getElementById("statusinput").value = task.status;
    editIndex = index;
}

function clearInput(){
    document.getElementById("taskinput").value= "";
    document.getElementById("dateinput").value= "";
    document.getElementById("timeinput").value= "";
    document.getElementById("statusinput").value= ""; 
}

function sortTask(){
    tasks.sort((a,b) => {
        let adatetime = new Date(a.date + " " + a.time);
        let bdatetime = new Date(b.date + " " + b.time);
        return adatetime - bdatetime;
    });
}

function searchTask(){
    let searchvalue = document.getElementById("searchinput").value.toLowerCase();

    let filtered = tasks.filter(task =>
        task.text.toLowerCase().includes(searchvalue)
    );

    displayTask(filtered);
}

displayTask();
