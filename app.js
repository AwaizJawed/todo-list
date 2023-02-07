const iteminput = document.querySelector("#item");
const taskbox = document.querySelector("#to-do-box");
let editid;
let isediter = false;
let todos = JSON.parse(localStorage.getItem("todo-list"));

function Showto() {
    li = "";
    if (todos) {
        todos.forEach((todo, id) => {
            let iscompleted = todo.status === "completed" ? "checked" : "";
            li += ` <li class= "task">
            <label for="${id}">
                <input onclick ="updatefile(this)" type="checkbox" name="" id="${id}" ${iscompleted} >
                <p id="para" class="${iscompleted}">${todo.name}</p>
            </label>
            <div class="setting">
            
            <button id="btn2"class="fa-regular fa-pen-to-square" onclick="edittask(${id},'${todo.name}')"></button>
            <button id="btn3" class="fa-solid fa-trash" onclick="deletetask(${id})"></button>
               
            </div>
        </li>`;
        })
    }
    taskbox.innerHTML = li;
};
Showto();



function deletetask(deleteId) {
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    Showto();
}

function updatefile(selectedfile) {
    let taskname = selectedfile.parentElement.lastElementChild;
    if (selectedfile.checked) {
        taskname.classList.add("done");
        todos[selectedfile.id].status = "completed";
    } else {
        taskname.classList.remove("done");
        todos[selectedfile.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
};
function edittask(taskid,taskname){
    editid = taskid;
    isediter = true;
    iteminput.value = taskname;
}


iteminput.addEventListener("keyup", e => {
    let usertask = iteminput.value.trim();
    if (e.key === "Enter" && usertask) {
        if (!isediter) {
            todos = !todos ? [] : todos;
            let taskInfo = {name: usertask, status: "pending"};
            todos.push(taskInfo);

        }
        else {
            isediter = false;
            todos[editid].name = usertask;
        }

        iteminput.value = "";

        localStorage.setItem(("todo-list"), JSON.stringify(todos));
        Showto();
    }
})








// item.addEventListener(
//     "keyup",
//     function(event){
//         if(event.key === "Enter"){
//             addtodo(this.value);
//             this.value = ""
//         }
//     }
// );


// const addtodo = (item) => {
//     const listitem = document.createElement("li");
//     listitem.innerHTML = `
//     ${item}
//     <i class="fa-solid fa-xmark"></i>
//     `;
//     listitem.addEventListener(
//         "click",
//         function(){
//             this.classList.toggle("done");
//         }
//     )
//     listitem.querySelector("i").addEventListener(
//         "click",
//         function(){
//             listitem.remove();
//         }
//     )
//     todoapp.appendChild(listitem)
// }