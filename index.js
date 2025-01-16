const sideBar = document.getElementById("sideBar");
const closeSideB = document.getElementById("closeSideB");
const sideBarContainer = document.getElementById("sideBarContainer");
sideBar.onclick = () => {
    sideBarContainer.style.transform = "translateX(0)";
}

closeSideB.onclick = () => {
    sideBarContainer.style.transform = "translateX(-105%)";
}
///////////////////////////////////////////////////////////////////////////////////////////////////////
let lists = {};
let objTasksForThirdPage = {}
const container = document.getElementById("container");

const addList = document.getElementById("addList");
addList.addEventListener("click", function() {
    let titleFUL = prompt("اسم القائمة");
    if(titleFUL)
    {   
        let modelList = {
            title: titleFUL,
            date: new Date().toLocaleString(),
            ID: Date.now(),
            numTasks: 0,
            ComTask: 0,
            tasks: {},
        }
        lists[modelList.ID] = modelList;
        storageLists();
        showList(modelList.ID);
    }
})

function showList(ID) {
    let contentList = document.createElement("div");
    contentList.className = "newList";
    contentList.id = `${lists[ID].ID}`;
    contentList.innerHTML =`
            <div class="pathToTasks" onclick="tasksPage(${lists[ID].ID})">
                <div class="innerInfo">
                    <h3><span class="numCOM">${lists[ID].ComTask}</span>/${lists[ID].numTasks}</h3>
                    <h3 class="textHeader">${lists[ID].title}</h3>
                </div>
                <div class="date">
                    <span class="material-symbols-outlined">
                        calendar_month
                    </span>
                    <span>${lists[ID].date}</span>
                </div>
            </div>
            <div class="buttons">
                <button class="editButtons" onclick="editing(${lists[ID].ID})">
                    <span class="material-symbols-outlined">
                        edit
                    </span>
                </button>
                <button class="deleteButtons" onclick="deleting(${lists[ID].ID})">
                    <span class="material-symbols-outlined">
                        delete_forever
                    </span>
                </button>
            </div>`
    container.insertBefore(contentList, container.firstChild);
}

function editing(ID) {
    let massege = `تغيير اسم قائمة: ${lists[ID].title}`;
    let titleFUL = prompt(massege, lists[ID].title);
    if(titleFUL)
    {   
        lists[ID].title = titleFUL;
        storageLists();
        document.getElementById(ID).getElementsByClassName("textHeader")[0].textContent = titleFUL;
    }
}

function deleting(ID) {
    let deletingTitle = lists[ID].title;
    let massege = ` سوف يتم مسح القائمة بالكامل وما فيها من مهام. هل انت متأكد من حذف قائمة: ${deletingTitle}؟`
    let youSure = confirm(massege);
    if(youSure)
    {
        delete lists[ID];
        storageLists();
        document.getElementById(ID).remove();
    }
}

function tasksPage(ID) {
    localStorage.setItem("objectSent", ID)
    location.href = "secondPage.html";
}

function storageLists()
{
    let stringLists = JSON.stringify(lists);
    localStorage.setItem("listsInStorage", stringLists);
}

function showInPage()
{
    let getLists = JSON.parse(localStorage.getItem("listsInStorage"))
    lists = getLists ?? {}
    container.innerHTML = ""
    for(let list in lists)
    {
        showList(lists[list].ID);
    }
}

let massageAtTheStart = `مرحبًا،

نود أن نعرّفكم على موقعنا المخصص لإدارة المهام. يتيح لك هذا الموقع إنشاء قوائم متنوعة وإضافة مهام داخل هذه القوائم، بالإضافة إلى إمكانية تسجيل المهام كمنجزة وتمييزها. يمكنك أيضًا تعديل أو حذف أي مهمة أو قائمة حسب الحاجة.

كما يوفر الموقع إمكانية الوصول إلى جميع المهام المميزة أو المنجزة، فضلاً عن إمكانية البحث عن أي مهمة من خلال الشريط الجانبي.

نتمنى أن تجدوا الموقع مفيدًا في تنظيم مهامكم!`;

function restartMassege() {
    localStorage.removeItem("close");
    showMassege();
}

function showMassege()
{
    if(!localStorage.getItem("close"))
    {
        let agree = confirm(massageAtTheStart);
        agree ? localStorage.setItem("close", true) : localStorage.removeItem("close");
    }
}

window.addEventListener("load", function(){
    showMassege();
    showInPage();
})

let div000 = document.getElementById("000");
let searchInput = document.getElementById("searchOut");
let objTasksForSearch = {}

searchInput.addEventListener("keypress", function(event){
    if(event.key === "Enter")
    {
        selectorAllSearch();
    }
})

function selectorAllSearch()
{
    if(searchInput.value)
    {
        div000.style.display = "block";
        div000.innerHTML = `<div id="results">
                                <button id="closeResults" onclick="closeResults()">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#22b6b6"><path d="m251.33-204.67-46.66-46.66L433.33-480 204.67-708.67l46.66-46.66L480-526.67l228.67-228.66 46.66 46.66L526.67-480l228.66 228.67-46.66 46.66L480-433.33 251.33-204.67Z"/></svg>
                                </button>
                                <h5 class="textOutPut">
                                    <div class="spinner-border" role="status" style="color: blue;">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </h5>
                            </div>`

        setTimeout(function(){
            div000.getElementsByTagName("h5")[0].innerHTML = ""
            let searchInputSmall = String(searchInput.value).toLowerCase();
            let num = 0;
            let titleTask = "";
            for(let list in lists)
            {
                for(let task in lists[list].tasks)
                {
                    if(String(lists[list].tasks[task].title).toLowerCase() == searchInputSmall)
                    {
                        num++;
                        let model = {
                            title: lists[list].tasks[task].title,
                            date: lists[list].tasks[task].date,
                            isDone: lists[list].tasks[task].isDone,
                            isStar: lists[list].tasks[task].isStar,
                            titleList: lists[list].title,
                            IDList: lists[list].ID,
                        }
                        objTasksForSearch[lists[list].tasks[task].ID] = model;
                        titleTask = lists[list].tasks[task].title;
                    }
                }
            }
            search(num, titleTask);
        },500)
    }
}

function search(num, titleTask)
{
    if(num !== 0)
    {
        objTasksForSearch.title = `<h2>(<span style="color: blue;">${num}</span>) نتائج مطابقة للبحث</h2>`;
        goToThirdPage();
    }
    else
    {
        div000.getElementsByTagName("h5")[0].innerHTML +=`لا نتائج
        <span class="material-symbols-outlined">
            search_off
        </span>
        <div>الرجاء إدخال اسم المهمة الصحيح`
        
    }
}

function closeResults()
{
    document.getElementById("000").style.display = "none";
    objTasksForSearch = {};
}

function goToThirdPage() {
    objTasksForThirdPage = objTasksForSearch;
    localStorage.setItem("objectForThirdPage", JSON.stringify(objTasksForThirdPage));
    location.href = "thirdPage.html";
}

function doneTasks() {
    localStorage.setItem("objectForThirdPage",localStorage.getItem("objForDoneTasks"));
    location.href = "thirdPage.html";
}

function starTasks() {
    localStorage.setItem("objectForThirdPage",localStorage.getItem("objForStarTasks"));
    location.href = "thirdPage.html";
}