

const originTable = 
`
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

const addTableRow = (number, registDate, title, contents, finDate, motherNumber, level) => {
    let levelClass ="";
    let levell = level+""
    const matchObject = {
        "null" : "firstLevel",
        "undefined" : "firstLevel",
        "NaN" : "firstLevel",
        "1" : "secondLevel",
        "2" : "thirdLevel",
        "3" : "forthLevel",
        "4" : "fifthLevel",
    }
    levelClass = matchObject[levell];
    $(`
    <tr class='${levelClass}'>
        <td class='level' style='display:none';>${level}</td>
        <td class='motherNumber' style='display:none';>${motherNumber}</td>
        <td class='number'>${number}</td>
        <td class='registDate'>${registDate}</td>
        <td class='content'>
            <div class='contentWrapper'>
                <div class='title'>
                    <input value=${title}>
                </div>
                <div class='contents'>
                    <input value=${contents}>
                </div>
            </div>
            <div class='extension hoverHidden'>
                <button class='extensionBtn'>∨</button>
            </div>
        </td>
        <td class='finDate'><input value=${finDate}></td>
        <td class='btnManager'><div class='hoverHidden'><button class='saveBtn'>완료</button><button class='remove' style=color:red>삭제</button><button class='makeSub'>추가</button></div></td>
    </tr>
    `).prependTo($("tbody")); 
}

const addNewTableRow = () => {
    let lastNumber;
    if(!itemsArray[0]){
        lastNumber = 0;    
    } else {
        lastNumber = itemsArray[itemsArray.length - 1].number * 1;
    }
    const registDate = ClockSet();
    addTableRow(lastNumber+1, registDate,"","","","")
}

class group {
    constructor(number, registDate, title, contents, finDate, order, motherNumber, level){
        this.number = number;
        this.registDate = registDate;
        this.title = title;
        this.finDate = finDate;
        this.contents = contents;
        this.order = order;
        this.motherNumber = motherNumber;
        this.level = level;
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

const sortItemGroups = (ItemGrops) => {
    ItemGrops.sort((a,b) => {
        return b["order"] - a["order"];
    })
}

const saveTableItem = () => { 
    const TRArray = $("tbody").children();
    let lastOrder;
    if(!itemsArray[0]){
        lastOrder = 0;
    } else {
        lastOrder = itemsArray[itemsArray.length - 1].order;
    }
    itemsArray = [];
    for(i of TRArray){
        const tr = $(i);
        const number = $(tr.children(".number")).text();
        const registDate = $(tr.children(".registDate")).text();
        const title = $($($(tr.children(".content")).children(".contentWrapper")).children(".title")).children().val();
        const contents = $($($(tr.children(".content")).children(".contentWrapper")).children(".contents")).children().val();
        const finDate = $($($(tr.children(".finDate"))).children()).val();
        const order = lastOrder++;
        let motherNumber = "";
        if(/\./.test(number)){
            motherNumber = /.+\./.exec(number)[0].slice(0, -1);
        }
        const level = $(tr.children(".level")).text() * 1;
        const itemGroup = new group(number, registDate, title, contents, finDate, order, motherNumber, level);
        itemsArray.push(itemGroup)
    }
    sortItemGroups(itemsArray);
    console.log(itemsArray)
    localStorage.setItem("first",JSON.stringify(itemsArray));
    connecttable2Index(itemsArray);
}

const controlExtensionBtn = (e) => {
    const targetBtn = $(e.currentTarget);
    const targetTR = $(targetBtn.parents("tr"));
    const targetContents = $($(targetTR.children(".content")).children()).children(".contents");
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
        orderArray.push(itemsArray[i])
    }
    orderArray.sort((a,b) => {
        return a.number - b.number
    })
    for(let i = 0; i < orderArray.length; i++){
        title = orderArray[i].title;
        number = orderArray[i].number;
        const newItemIndex = $(`<li>${number}.${title}<li>`).appendTo($("nav ul"));
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
    $("tbody").html("");
    for(let i = 0; i < trGroup.length; i++){
        addTableRow(trGroup[i].number, trGroup[i].registDate, trGroup[i].title, trGroup[i].contents, trGroup[i].finDate, trGroup[i].motherNumber, trGroup[i].level)
    }
    $(".extensionBtn").off()
    $("tbody").off()
    $(".makeSub").off()
    $(`.remove`).off()
    saveTableItem()
    $(".extensionBtn").click((e) => {controlExtensionBtn(e)});
    $("tbody").keyup((e)=>{checkChange(e);})
    $(`.makeSub`).click((e) => {makeSubItem(e)})
    $(`.remove`).click((e) => {removeTableItem(e)})
}


const removeTableItem = (e) => {
    const targetTR = $(e.currentTarget).parents("tr");
    $(targetTR).remove();
    const allLines = $("tbody").children();
    for(let i = allLines.length - 1 ; i > -1; i--){
        // $(allLines[i]).children(".number").text(allLines.length - i)
        console.log($(allLines[i]).children(".number").text(allLines.length - i))//이게 왜 되는것인지?
    }
    saveTableItem();
}

const reCallData = () => {
    const data = JSON.parse(localStorage.getItem("first"))
    if(data){
        for(let i = 0; i < data.length; i++){
            itemsArray.push(data[i]);
            addTableRow(data[i].number, data[i].registDate, data[i].title, data[i].contents, data[i].finDate, data[i].motherNumber, data[i].level)
        }
        $(".extensionBtn").click((e) => {controlExtensionBtn(e)});
        $("tbody").keyup((e)=>{checkChange(e);})
        $(`.makeSub`).click((e) => {makeSubItem(e)})
        $(`.remove`).click((e) => {removeTableItem(e)})
        connecttable2Index(itemsArray);
    }
}



const makeSubItem = (e) => {
    const motherTR = $(e.currentTarget).parents("tr")
    const motherNumber = $(motherTR.children(`.number`)).text() * 1;
    let motherLevel = $(motherTR.children(".level")).text() + "";
    if(motherLevel == "null" || motherLevel == "undefined" || motherLevel == "NaN"){
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
    console.log(`motherNumber = ${motherNumber}`)
    console.log(`myLevel=${myLevel}`)
    console.log(`sibling=${sibling}`)
    console.log(sibling)
    myNumber = motherNumber + "." + sibling;
    console.log(`mynumber = ${myNumber}`)
    myOrder = elderBro * 1 + 0.1;
    const item = new group(myNumber, ClockSet(),"","","",myOrder, motherNumber, myLevel);
    itemsArray.push(item)
    sortItemGroups(itemsArray)
    renderTableAgain(itemsArray);
}

const showFirstPage = () => {
    $("main").prepend(originTable);
    const addBtn = $(tableRowAddBtn).appendTo($("main"));
    addBtn.click((e)=> {
        addNewTableRow();
        $(".extensionBtn").off()
        $("tbody").off()
        $(".makeSub").off()
        $(".remove").off()
        saveTableItem()
        $(".extensionBtn").click((e) => {controlExtensionBtn(e)});
        $("tbody").keyup((e)=>{checkChange(e);})
        $(`.makeSub`).click((e) => {makeSubItem(e)})
        $(`.remove`).click((e) => {removeTableItem(e)})
    })
    $("nav").prepend(originNav);
}

showFirstPage()
reCallData()