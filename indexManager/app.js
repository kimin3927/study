function getUUID() { // UUID v4 generator in JavaScript (RFC4122 compliant)
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 3 | 8);
      return v.toString(16);
    });
  }

const originTable = 
`
<div id='tableDiv'>
<table>
    <thead>
        <tr>
            <th>순번</th>
            <th>날짜</th>
            <th>내용</th>
            <th>완료</th>
            <th>관리</th>
        </tr>
    </thead>
    <tbody>
    </tbody>
</table>
</div>
`
const originNav = 
`
<hr></hr>
<ul>
</ul>
`
const tableRowAddBtn = 
`
<button id='tableRowAddBtn'>+</button>
`;


const paintTableRow = (item) => {
    let level = String(item.level)
    const matchObject = {
        "null" : "firstLevel",
        "" : "firstLevel",
        "undefined" : "firstLevel",
        "NaN" : "firstLevel",
        "0" : "firstLevel",
        "1" : "secondLevel",
        "2" : "thirdLevel",
        "3" : "fourthLevel",
        "4" : "fifthLevel",
    }
    const levelClass = matchObject[level];
    $(`
    <tr id='${item.id}' class='${levelClass} ${item.status}'>
        <td class='level' style='display:none';>${level}</td>
        <td class='motherNumber' style='display:none';>${item.motherNumber}</td>
        <td class='numberTD'><div class='number'>${item.number}</div></td>
        <td class='registDate'>${item.registDate}</td>
        <td class='content'>
            <div class='contentWrapper'>
                <div class='title'>
                    <input value="${item.title}" >
                </div>
                <div class='contents'>
                    <input value="${item.contents}">
                </div>
            </div>
            <div class='extension hoverHidden'>
                <button class='extensionBtn'>∨</button>
            </div>
        </td>
        <td class='finDate'><input value=${item.finDate}></td>
        <td class='btnManager'><div class='hoverHidden'><button class='finishBtn'>완료</button><button class='remove' style=color:red>삭제</button><button class='makeSub'>추가</button></div></td>
    </tr>
    `).prependTo($("#tableDiv tbody"));
}

const addNewTableRow = () => {
    let lastNumber;
    let lastOrder
    if(!itemsArray[0]){
        lastNumber = 0;    
        lastOrder = 0;
    } else {
        lastNumber = itemsArray[itemsArray.length - 1].number * 1;
        lastOrder = itemsArray[itemsArray.length - 1].order * 1;
    }
    const registDate = ClockSet();
    const item = new Group(lastNumber+1, registDate,"","","",lastOrder + 1,"","","", getUUID())
    itemsArray.push(item);
    paintTableRow(item)
    sortItemGroups(itemsArray)
    saveTableItem()
}

class Group {
    constructor(number, registDate, title, contents, finDate, order, motherNumber, level, status, id){
        this.number = number;
        this.registDate = registDate;
        this.title = title;
        this.finDate = finDate;
        this.contents = contents;
        this.order = order;
        this.motherNumber = motherNumber;
        this.level = level;
        this.status = status;
        this.id = id;
    }
}

function ClockSet(){
    const date = new Date();
    const Year = date.getFullYear();
    const Month = date.getMonth();
    const date2 = date.getDate();
    const day = date.getDay();
    const hours = String(date.getHours()).padStart(2,"0");
    const minuetes = String(date.getMinutes()).padStart(2,"0");
    const seconds  = String(date.getSeconds()).padStart(2,"0");
    return `${Month}/${date2} ${hours}:${minuetes}`;
}

let itemsArray = [];
const finishedArray = [];

const sortItemGroups = (ItemGrops) => {
    ItemGrops.sort((a,b) => {
        return a["order"] - b["order"];
    })
    for(let i = 0; i < ItemGrops.length; i++){
        ItemGrops[i].order = i + 1;
    }
}

const findMotherNumber = (tr) => {
    const mylevel = tr.find(".level").text();
    const myIndex = tr.index();
    let motherNumber;
    const trGroup = $("#tableDiv tbody").children()
    for(let i = myIndex - 1; i > -1; i--) {
        const trLevel = $($(trGroup[i]).children(".level")).text() * 1;
        if(trLevel < mylevel) {
            motherNumber = $(trGroup[i]).find(".number").text()
            break;
        }
    }
    return motherNumber;
}

const findObjIndex = (targetTR) => {
    const id = targetTR[0].id;
    for(let i = 0; i < itemsArray.length; i++){
        if(itemsArray[i].id == id){
            const Index = i;
            return Index;
        }
    }
}

const saveItem2Localstorage = (rows, targetArray, storageName) => {
    for(let i = rows.length - 1; i > -1; i--) {
        const tr = $(rows[i]);
        const objIndex = findObjIndex(tr)
        const itsObj = targetArray[objIndex]
        itsObj.level = $(tr.find(".level")).text() * 1;
        if(!itsObj.level){
            itsObj.level = 0;
        }
        itsObj.registDate = $(tr.find(".registDate")).text();
        itsObj.title = $(tr.find(".title input")).val()
        itsObj.contents = tr.find(".contents input").val()
        itsObj.finDate = tr.find(".finDate input").val()
        itsObj.motherNumber = findMotherNumber(tr);
        }
    localStorage.setItem(storageName, JSON.stringify(targetArray))
}

const saveTableItem = () => { 
    const aliveLines = $("#tableDiv tbody tr")
    saveItem2Localstorage(aliveLines, itemsArray, "first")
    sortItemGroups(itemsArray);
    connecttable2Index(itemsArray);
}

const controlExtensionBtn = (e) => {
    const targetBtn = $(e.currentTarget);
    const targetTR = $(targetBtn.parents("tr"));
    const targetContents = targetTR.find(".contents")
    targetContents.slideToggle();
    if(targetBtn.text() =="∨"){
        targetBtn.text("∧");
    } else {
        targetBtn.text("∨");
    }
}

const connecttable2Index = (itemsArray) => {
    $("nav ul").html("");
    const orderArray = []
    for(let i = 0;  i < itemsArray.length; i++){
        itemsArray[i].navOrder = String(itemsArray[i].number).replaceAll(".","")
        length = 5 - itemsArray[i].navOrder.length;
        multiflier = 10 ** length;
        itemsArray[i].navOrder = itemsArray[i].navOrder * multiflier;
        orderArray.push(itemsArray[i])
    }
    orderArray.sort((a,b) => {
        return a.navOrder - b.navOrder;
    })
    const pattern = /........../;
    for(let i = 0; i < orderArray.length; i++){
        let title = orderArray[i].title;
        let number = String(orderArray[i].number);
        const countDot = number.match(/./g).length - 1; 
        let blank = '&nbsp'
        blank = blank.repeat(countDot)
        if(title.length > 10) {
            title = pattern.exec(title)[0] + "...";
        }
        $(`<li>${blank}${number}.${title}<li>`).appendTo($("nav ul"));
    }
}

let timer;

const checkChange = (e) => {
    if(timer){
        clearTimeout(timer);
    }
    timer = setTimeout(()=>{
        saveTableItem()
    }, 300)
}

const renderTableAgain = (trGroup) =>{
    $("#tableDiv tbody").html("");
    for(let i = 0; i < trGroup.length; i++){
        paintTableRow(trGroup[i])
    }
    $(".extensionBtn").off()
    $("#tableDiv tbody").off()
    $(".makeSub").off()
    $(`.remove`).off()
    saveTableItem()
    $(".extensionBtn").click((e) => {controlExtensionBtn(e)});
    $("#tableDiv tbody").keyup((e)=>{checkChange(e);})
    $(`.makeSub`).click((e) => {makeSubItem(e)})
    $(`.remove`).click((e) => {removeTableItem(e)})
    $(`.finishBtn`).click((e) => {finishBtnHandler(e)})
}

const delFinishedLine = () => {
    if(!$(".finTable tbody tr")[0]){
        $($("main").children("hr")).remove()
        $($("main").children(".finTable")).remove()
    }
}

const removeTableItem = (e) => {
    const targetTR = $($(e.currentTarget).parents("tr"));
    if(!targetTR.parents("#tableDiv")[0]){
        const targetIndex = targetTR.index()
        finishedArray.splice(targetIndex,1)
        localStorage.setItem("finish", JSON.stringify(finishedArray));
    } else{
        const objIndex = findObjIndex(targetTR);
        itemsArray.splice(objIndex,1);
    }
    targetTR.remove()
    renderTableAgain(itemsArray)
    delFinishedLine()
    // const trGroup = $("#tableDiv tbody").children();
    // const numberOfFirstLevel = $("#tableDiv tbody").children(".firstLevel").length;
    // for(let i = trGroup.length; i > -1; i--){
    //     if(!$(trGroup[i]).find(".number").text() || $(trGroup[i]).find(".number").text() == 0) {
    //         $($(trGroup[i]).find(".number")).text(i);
    //     }
    // }
}

const addNewFinishedItem = (item) => {
    let level = String(item.level)
    const matchObject = {
    "null" : "firstLevel",
    "undefined" : "firstLevel",
    "NaN" : "firstLevel",
    "0" : "firstLevel",
    "1" : "secondLevel",
    "2" : "thirdLevel",
    "3" : "fourthLevel",
    "4" : "fifthLevel",}
    item.levelClass = matchObject[level];
        $(`
        <tr class='${item.levelClass}'>
            <td class='level' style='display:none';>${item.level}</td>
            <td class='motherNumber' style='display:none';>${item.motherNumber}</td>
            <td class='numberTD'><div class='number'>${item.number}</div></td>
            <td class='registDate'>${item.registDate}</td>
            <td class='content'>
                <div class='contentWrapper'>
                    <div class='title'>
                        ${item.title}
                    </div>
                    <div class='contents'>
                        <p>${item.contents}</p>
                    </div>
                </div>
                <div class='extension hoverHidden'>
                    <button class='extensionBtn'>∨</button>
                </div>
            </td>
            <td class='finDate'>${item.finDate}</td>
            <td class='btnManager'><div class='hoverHidden'><button class='finishBtn'>완료</button><button class='remove' style=color:red>삭제</button><button class='makeSub'>추가</button></div></td>
        </tr>
        `).appendTo($(".finTable tbody"))
    $(".remove").off()
    $(".extensionBtn").off()
    $(`.remove`).click((e) => {removeTableItem(e)})
    $(".extensionBtn").click((e) => {controlExtensionBtn(e)});
}

const finishBtnHandler = (e) => {
    const targetTR = $(e.currentTarget).parents("tr");
    for(let i = 0; i < itemsArray.length; i++){
        if(itemsArray[i].id == targetTR[0].id){
            objIndex = i
            break;
        }
    }
    const targetObj = itemsArray[objIndex]
    const itsFirstLevel = $(targetTR).hasClass("firstLevel")
    if(!itsFirstLevel){
        if(targetObj.status !== "finish") {
            targetObj.status = "finish"
            targetTR.addClass("finish");
        } else {
            targetObj.status = "";
            targetTR.removeClass("finish");
        }
        saveTableItem();
        return;
    } else {
        $(targetTR).remove();
        const itis = $("main hr").length;
        if(!itis){
            $("main").append(`
            <hr>
            <div class=finTable>
            <table>
            <thead>
                <tr>
                    <th>순번</th>
                    <th>날짜</th>
                    <th>내용</th>
                    <th>완료</th>
                    <th>관리</th>
                </tr>
            </thead>
            <tbody></tbody>
            </table>
            </div>`)
        }
        finishedArray.push(targetObj)
        itemsArray.splice(objIndex,1)
        localStorage.setItem("finish", JSON.stringify(finishedArray))
        saveTableItem();
        addNewFinishedItem(targetObj);
    }
}


const reCallData = () => {
    const data = JSON.parse(localStorage.getItem("first"))
    const finData = JSON.parse(localStorage.getItem("finish"));
    if(data){
        for(let i = 0; i < data.length; i++){
            itemsArray.push(data[i]);
            paintTableRow(data[i])
        }
        $(".extensionBtn").click((e) => {controlExtensionBtn(e)});
        $("#tableDiv tbody").keyup((e)=>{checkChange(e);})
        $(`.makeSub`).click((e) => {makeSubItem(e)})
        $(`.remove`).click((e) => {removeTableItem(e)})
        $(`.finishBtn`).click((e) => {finishBtnHandler(e)})
        connecttable2Index(itemsArray);
    }
    if(finData.length !== 0){
        $("main").append(`
        <hr>
        <div class=finTable>
        <table>
            <thead>
                <tr>
                    <th>순번</th>
                    <th class='registDate'>날짜</th>
                    <th class='content'>내용</th>
                    <th class='finDate'>완료</th>
                    <th class='btnManager'>관리</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
        </div>`)
        for(let i = 0; i < finData.length; i++){
            finishedArray.push(finData[i]);
            addNewFinishedItem(finData[i])
        }
    }
}



const makeSubItem = (e) => {
    const motherTR = $(e.currentTarget).parents("tr")
    const motherNumber = $(motherTR.find(`.number`)).text();
    let motherIndex;
    for(let i = 0; i < itemsArray.length; i++){
        if(itemsArray[i].number == motherNumber){
            motherIndex = i;
        }
    }
    let motherLevel = itemsArray[motherIndex].level;    
    let motherOrder = itemsArray[motherIndex].order;
    if(motherTR.hasClass("firstLevel")){
        motherLevel = 0;
    }
    const myLevel = motherLevel * 1 + 1;
    let sibling = 1;
    let elderBro;
    let elderBroOrder;
    for(let i = 0; i < itemsArray.length; i++){
        if(itemsArray[i].motherNumber == motherNumber){
            elderBro = itemsArray[i].order
            break;
        }
    }
    for(let i = 0; i < itemsArray.length; i++){
        if(itemsArray[i].motherNumber == motherNumber){
        sibling++
    }}
    myNumber = motherNumber + "." + sibling;
    let myOrder;
    if(elderBro){
        myOrder = elderBro * 1 - 0.03;
    } else {
        myOrder = motherOrder - 0.01;
    }
    console.log(myOrder)
    const item = new Group(myNumber, ClockSet(),"","","", myOrder, motherNumber, myLevel, "", getUUID());
    console.log(item)
    if(elderBro !== undefined){
        itemsArray.splice(elderBro,0,item)
    } else itemsArray.splice(motherIndex,0,item)
    console.log(itemsArray)
    sortItemGroups(itemsArray)
    renderTableAgain(itemsArray);
}

const showFirstPage = () => {
    $("main").prepend(originTable);
    const addBtn = $(tableRowAddBtn).appendTo($("thead"));
    addBtn.click((e)=> {
        addNewTableRow();
        $(".extensionBtn").off()
        $("#tableDiv tbody").off()
        $(".makeSub").off()
        $(".remove").off()
        $(".extensionBtn").click((e) => {controlExtensionBtn(e)});
        $("#tableDiv tbody").keyup((e)=>{checkChange(e);})
        $(`.makeSub`).click((e) => {makeSubItem(e)})
        $(`.remove`).click((e) => {removeTableItem(e)})
        $(`.finishBtn`).click((e) => {finishBtnHandler(e)})
    })
    $("nav").prepend(originNav);
}

showFirstPage()
reCallData()




kiminArray = [
    { number : 1,registDate : "kimin", title : "kimin", contents : "kimin", finDate : "kimin", order : "kimin", motherNumber : "kimin", level : "kimin", children : 
    [
        {number : "1-1",registDate : "tt", title : "tt", contents : "tt",finDate : "tt",order : "tt",motherNumber : "tt",level : "tt",children : {
             number : "1-1-1",registDate : "kimin", title : "kimin", contents : "kimin", finDate : "kimin", order : "kimin", motherNumber : "kimin", level : "kimin", children : ""}
            }, 
        {number : "1-2",registDate : "kimin", title : "kimin", contents : "kimin", finDate : "kimin", order : "kimin", motherNumber : "kimin", level : "kimin", children : "",}
    ]
    },    
    { number : 2, registDate : "kimin",  title : "kimin",  contents : "kimin",  finDate : "kimin",  order : "kimin",  motherNumber : "kimin",  level : "kimin",  children : 
    [
        {number : "2-1",registDate : "tt", title : "tt", contents : "tt",finDate : "tt",order : "tt",motherNumber : "tt",level : "tt",children : 
        {number : "2-2",registDate : "kimin", title : "kimin", contents : "kimin", finDate : "kimin", order : "kimin", motherNumber : "kimin", level : "kimin", children : ""}}, 
        {number : "2-3",registDate : "kimin", title : "kimin", contents : "kimin", finDate : "kimin", order : "kimin", motherNumber : "kimin", level : "kimin", children : ""}
    ]}
]

getChildrenData = (arr) => {
    const resultArr = [];
    const subArr = [];
    const findChildren = (arr) => {
        subArr.push(arr);
        if(arr.children){
            for(i in arr.children)
            subArr.push(arr.children[i]);
            findChildren(arr.children[i])
        } else return subArr;   
    }
    for(let i = 0; i < arr.length; i++) {
        findChildren(arr[i])
        resultArr.push(...subArr)
        subArr.splice(0)
    }
    return resultArr.flat()
}

getChildrenData(kiminArray)


//