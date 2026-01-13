let colors=["#c084fc","#4ade80","#facc15","#f87171","#60a5fa","#8B4513" ,"#ffffff" ];
let colorIndex=0;

let categories=JSON.parse(localStorage.getItem("cat"))||["Personal","Work","Study","Other"];
let tasks=JSON.parse(localStorage.getItem("tasks"))||[];

const dashBtn=document.getElementById("dashBtn");
const taskBtn=document.getElementById("taskBtn");
const dashboard=document.getElementById("dashboard");
const tasksPage=document.getElementById("tasks");

dashBtn.onclick=()=>show("dashboard");
taskBtn.onclick=()=>show("tasks");

function show(p){
dashboard.classList.add("hidden");
tasksPage.classList.add("hidden");
dashBtn.classList.remove("active");
taskBtn.classList.remove("active");
if(p==="dashboard"){dashboard.classList.remove("hidden");dashBtn.classList.add("active");}
else{tasksPage.classList.remove("hidden");taskBtn.classList.add("active");}
}

function save(){
localStorage.setItem("cat",JSON.stringify(categories));
localStorage.setItem("tasks",JSON.stringify(tasks));
}

function renderCategories(){
const list=document.getElementById("categoryList");
const select=document.getElementById("taskCategory");
list.innerHTML="";select.innerHTML="";
categories.forEach((c,i)=>{
list.innerHTML+=`<li>${c}<span onclick="delCat(${i})">✖</span></li>`;
select.innerHTML+=`<option>${c}</option>`;
});
}

function delCat(i){
categories.splice(i,1);save();renderCategories();renderDash();
}

function renderTasks(){
const ul=document.getElementById("taskList");ul.innerHTML="";
tasks.forEach((t,i)=>{
ul.innerHTML+=`
<li style="background:${t.color}">
<div class="${t.done?'done':''}">
<b>${t.name}</b><br>
${t.category} | ${t.date} | ${t.start}${t.sMer} - ${t.end}${t.eMer}
</div>
<div class="task-right">
<input type="checkbox" ${t.done?'checked':''} onclick="toggle(${i})">
<button class="delete-btn" onclick="removeTask(${i})">X</button>
</div>
</li>`;
});
}

function renderDash(){
document.getElementById("totalCount").innerText=tasks.length;
document.getElementById("completedCount").innerText=tasks.filter(t=>t.done).length;
document.getElementById("pendingCount").innerText=tasks.filter(t=>!t.done).length;
const ul=document.getElementById("categoryStats");ul.innerHTML="";
categories.forEach(c=>{
ul.innerHTML+=`<li>${c}: ${tasks.filter(t=>t.category===c).length}</li>`;
});
}

function toggle(i){tasks[i].done=!tasks[i].done;save();renderTasks();renderDash();}
function removeTask(i){tasks.splice(i,1);save();renderTasks();renderDash();}

document.getElementById("addCategoryBtn").onclick=()=>{
let v=newCategoryInput.value.trim();
if(v&&!categories.includes(v)){categories.push(v);save();renderCategories();}
newCategoryInput.value="";
};

document.getElementById("addTaskBtn").onclick=()=>{
let name=taskInput.value.trim();
if(!name)return;
let obj={
name,
category:taskCategory.value,
date:taskDate.value,
start:startTime.value,
end:endTime.value,
sMer:startMer.value,
eMer:endMer.value,
done:false,
color:colors[colorIndex++%colors.length]
};
tasks.push(obj);save();renderTasks();renderDash();
taskInput.value="";
};

renderCategories();renderTasks();renderDash();