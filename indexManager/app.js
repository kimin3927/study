

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

const addTableRow = (number, registDate, title, contents, finDate, order, motherNumber, level) => {
    let levelClass ="";
    let levell = level+""
    const matchObject = {
        "null" : "firstLevel",
        "undefined" : "firstLevel",
        "NaN" : "firstLevel",
        "0" : "firstLevel",
        "1" : "secondLevel",
        "2" : "thirdLevel",
        "3" : "fourthLevel",
        "4" : "fifthLevel",
    }
    levelClass = matchObject[levell];
    $(`
    <tr class='${levelClass}'>
        <td class='level' style='display:none';>${level}</td>
        <td class='motherNumber' style='display:none';>${motherNumber}</td>
        <td class='numberTD'><div class='number'>${number}</div></td>
        <td class='registDate'>${registDate}</td>
        <td class='content'>
            <div class='contentWrapper'>
                <div class='title'>
                    <input value="${title}" >
                </div>
                <div class='contents'>
                    <input value="${contents}">
                </div>
            </div>
            <div class='extension hoverHidden'>
                <button class='extensionBtn'>∨</button>
            </div>
        </td>
        <td class='finDate'><input value=${finDate}></td>
        <td class='btnManager'><div class='hoverHidden'><button class='finishBtn'>완료</button><button class='remove' style=color:red>삭제</button><button class='makeSub'>추가</button></div></td>
    </tr>
    `).prependTo($("#tableDiv tbody")); 
}

const addNewTableRow = () => {
    let lastNumber;
    if(!itemsArray[0]){
        lastNumber = 0;    
    } else {
        lastNumber = itemsArray[itemsArray.length - 1].number * 1;
    }
    const registDate = ClockSet();
    addTableRow(lastNumber+1, registDate,"","","","", "")
}

class group {
    constructor(number, registDate, title, contents, finDate, order, motherNumber, level, status){
        this.number = number;
        this.registDate = registDate;
        this.title = title;
        this.finDate = finDate;
        this.contents = contents;
        this.order = order;
        this.motherNumber = motherNumber;
        this.level = level;
        this.status = status;
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

const saveItem2Localstorage = (rows, lastOrder, targetArray, storageName) => {
    for(let i = rows.length - 1; i > -1; i--) {
        const tr = $(rows[i]);
        const number = $(tr.find(".number")).text();
        const registDate = $(tr.children(".registDate")).text();
        const title = tr.find(".title input").val()
        const contents = tr.find(".contents input").val()
        const finDate = tr.find(".finDate input").val()
        const order = lastOrder++;
        let level = $(tr.children(".level")).text() * 1;
        if(!level){
            level = 0;
        }
        const motherNumber = findMotherNumber(tr);
        let children;
        const itemGroup = new group(number, registDate, title, contents, finDate, order, motherNumber, level, children);
        targetArray.push(itemGroup)
        }
    localStorage.setItem(storageName, JSON.stringify(targetArray))
}

const saveTableItem = () => { 
    console.log(itemsArray)
    const aliveLines = $("#tableDiv tbody").children();
    let lastOrder;
    if(!itemsArray[0]){
        lastOrder = 0;
    } else {
        lastOrder = itemsArray[itemsArray.length - 1].order;
    }
    itemsArray = [];
    sortItemGroups(itemsArray);
    saveItem2Localstorage(aliveLines, lastOrder, itemsArray, "first")
    console.log(itemsArray)
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
        itemsArray[i].navOrder = itemsArray[i].number.replaceAll(".","")
        length = 5 - itemsArray[i].number.replaceAll(".","").length;
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
        let number = orderArray[i].number;
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
        addTableRow(trGroup[i].number, trGroup[i].registDate, trGroup[i].title, trGroup[i].contents, trGroup[i].finDate, trGroup[i].order, trGroup[i].motherNumber, trGroup[i].level)
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

// for(let i = allLines.length - 1 ; i > -1; i--){
    //     $(allLines[i]).find(".number").text(allLines.length - i)
    // }
    //

const removeTableItem = (e) => {
    const targetTR = $($(e.currentTarget).parents("tr"));
    if(!targetTR.parents("#tableDiv")[0]){
        const targetIndex = targetTR.index()
        console.log(`targetIndex =${targetIndex}`)
        finishedArray.splice(targetIndex,1)
        console.log(finishedArray)
        localStorage.setItem("finish", JSON.stringify(finishedArray));
    }
    targetTR.remove()
    // const trGroup = $("#tableDiv tbody").children();
    // const numberOfFirstLevel = $("#tableDiv tbody").children(".firstLevel").length;
    // for(let i = trGroup.length; i > -1; i--){
    //     if(!$(trGroup[i]).find(".number").text() || $(trGroup[i]).find(".number").text() == 0) {
    //         $($(trGroup[i]).find(".number")).text(i);
    //     }
    // }
    saveTableItem();
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
    let objIndex;
    for(let i = 0; i < itemsArray.length; i++){
        if(itemsArray[i].number == $(targetTR.find(".number")).text()){
            objIndex = i
        }
    }
    const targetObj = itemsArray[objIndex]
    targetObj.status = "finish"
    const itsFirstLevel = $(targetTR).hasClass("firstLevel")
    console.log(typeof itsnotFirstLevel)
    if(!itsFirstLevel){
        if(targetTR.css("backgroundColor") !== "rgb(128, 128, 128)"){
            targetTR.css("backgroundColor", "grey")
        } else targetTR.css("backgroundColor", "rgba(0,0,0,0)")
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
            addTableRow(data[i].number, data[i].registDate, data[i].title, data[i].contents, data[i].finDate, data[i].order, data[i].motherNumber, data[i].level)
        }
        $(".extensionBtn").click((e) => {controlExtensionBtn(e)});
        $("#tableDiv tbody").keyup((e)=>{checkChange(e);})
        $(`.makeSub`).click((e) => {makeSubItem(e)})
        $(`.remove`).click((e) => {removeTableItem(e)})
        $(`.finishBtn`).click((e) => {finishBtnHandler(e)})
        connecttable2Index(itemsArray);
    }
    if(finData[0]){
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
    console.log(motherNumber)
    myNumber = motherNumber + "." + sibling;
    let myOrder;
    if(elderBro){
        myOrder = elderBro * 1 - 0.1;
    } else myOrder = motherOrder - 0.1;
    const item = new group(myNumber, ClockSet(),"","","",myOrder, motherNumber, myLevel);
    console.log(item)
    itemsArray.splice(motherIndex,0,item)
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
        saveTableItem()
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


//test

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