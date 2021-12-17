

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

const addTableRow = (number, registDate, title, contents, finDate, motherNumber) => {
    $(`
    <tr>
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
    constructor(number, registDate, title, contents, finDate, order, motherNumber){
        this.number = number;
        this.registDate = registDate;
        this.title = title;
        this.finDate = finDate;
        this.contents = contents;
        this.order = order;
        this.motherNumber = motherNumber;
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
        const number = $(tr.children(".number")).text() * 1;
        const registDate = $(tr.children(".registDate")).text();
        const title = $($($(tr.children(".content")).children(".contentWrapper")).children(".title")).children().val();
        const contents = $($($(tr.children(".content")).children(".contentWrapper")).children(".contents")).children().val();
        const finDate = $($($(tr.children(".finDate"))).children()).val();
        const order = lastOrder++;
        const motherNumber = Math.floor($(tr.children(".number")).text() * 1);
        const itemGroup = new group(number, registDate, title, contents, finDate, order, motherNumber)
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
    const NumberOfItem = $($("tbody").children()).length;
    console.log("연결")
    $("nav ul").html("");
    for(let i = 0; i < NumberOfItem; i++){
        title = itemsArray[i].title;
        const newItemIndex = $(`<li>${i+1}.${title}<li>`).appendTo($("nav ul"));
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
        addTableRow(trGroup[i].number, trGroup[i].registDate, trGroup[i].title, trGroup[i].contents, trGroup[i].finDate, trGroup[i].motherNumber)
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
    ///
    const allLines = $("tbody").children();
    for(let i = allLines.length - 1 ; i > -1; i--){
        console.log($(allLines[i]).children(".number").text(allLines.length - i))
    }
    //
    saveTableItem();
}

const reCallData = () => {
    const data = JSON.parse(localStorage.getItem("first"))
    console.log(data);
    if(data){
        for(let i = 0; i < data.length; i++){
            itemsArray.push(data[i]);
            addTableRow(data[i].number, data[i].registDate, data[i].title, data[i].contents, data[i].finDate, data[i].motherNumber)
        }
        $(".extensionBtn").click((e) => {controlExtensionBtn(e)});
        $("tbody").keyup((e)=>{checkChange(e);})
        $(`.makeSub`).click((e) => {makeSubItem(e)})
        $(`.remove`).click((e) => {removeTableItem(e)})
        connecttable2Index(itemsArray);
    }
}



const makeSubItem = (e) => {
    const targetTR = $(e.currentTarget).parents("tr")
    const motherNumber = $(targetTR.children(`.number`)).text();
    const motherOrder = targetTR.index()
    let sibling = 0;
    let mydd;
    for(let i = 0; i < itemsArray.length; i++){
        if(itemsArray[i].motherNumber == motherNumber){
            ElderBro = itemsArray[i].order
            break;
        }
    }
    for(let i = 0; i < itemsArray.length; i++){
        if(itemsArray[i].motherNumber == motherNumber){
        sibling++
    }}
    myNumber = motherNumber * 1 + ((sibling) * 0.1);
    myOrder = ElderBro * 1 + 0.1;
    const item = new group(myNumber, "","","","",myOrder, motherNumber);
    console.log(itemsArray);
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