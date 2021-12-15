

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

const addNewTableRow = () => {
    let lastNumber;
    if(!itemsArray[0]){
        lastNumber = 0;    
    } else {
        lastNumber = itemsArray[itemsArray.length - 1].number * 1;
    }
    const regisDate = ClockSet();
    $(`
    <tr>
        <td class='number'>${lastNumber + 1}</td>
        <td class='regisDate'>${regisDate}</td>
        <td class='content'>
            <div class='contentWrapper'>
                <div class='title'>
                    <input>
                </div>
                <div class='contents'>
                    <input>
                </div>
            </div>
            <div class='extension hoverHidden'>
                <button class='extensionBtn'>∨</button>
            </div>
        </td>
        <td contenteditable="true"></td>
        <td><div class='hoverHidden'><button class='saveBtn'>완료</button><button class='remove' style=color:red>삭제</button><button class='makeSub'>추가</button></div></td>
    </tr>
    `).prependTo($("table")); 
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
        const registDate = $(tr.children()[1]).text();
        const title = $($($(tr.children(".content")).children(".contentWrapper")).children(".title")).children().val();
        const contents = $($($(tr.children(".content")).children(".contentWrapper")).children(".contents")).children().val();
        const finDate = $(tr.children()[3]).text();
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
        const TableContents = $(`<tr>
        <td class='number' contenteditable="true">${trGroup[i].number}</td>
        <td class='regisDate' contenteditable="true"></td>
        <td class='content'>
            <div class='contentWrapper'>
                <div class='title'>
                    <input>
                </div>
                <div class='contents'>
                    <input>
                </div>
            </div>
            <div class='extension hoverHidden'>
                <button class='extensionBtn'>∨</button>
            </div>
        </td>
        <td contenteditable="true"></td>
        <td><div class='hoverHidden'><button class='saveBtn'>완료</button><button class='remove' style=color:red>삭제</button><button class='makeSub'>추가</button></div></td>
    </tr>`).prependTo($("tbody"));
    }
    $(".extensionBtn").off()
    $(".tbody").off()
    $(".makeSub").off()
    saveTableItem()
    $(".extensionBtn").click((e) => {controlExtensionBtn(e)});
    $("tbody").keyup((e)=>{
        checkChange(e);
    })
    $(`.makeSub`).click((e) => {
        makeSubItem(e)
    })
}


const removeTableItem = (e) => {
    const targetTR = $(e.currentTarget).parents("tr");
    $(targetTR).remove()
}

const reCallData = () => {
    const data = JSON.parse(localStorage.getItem("first"))
    if(data){
        for(let i = 0; i < data.length; i++){
            console.log(data[i])
            itemsArray.push(data[i]);
            $(`
            <tr>
                <td class='number'>${data[i].number}</td>
                <td class='regisDate'>${data[i].registDate}</td>
                <td class='content'>
                    <div class='contentWrapper'>
                        <div class='title'>
                            <input>
                        </div>
                        <div class='contents'>
                            <input>
                        </div>
                    </div>
                    <div class='extension hoverHidden'>
                        <button class='extensionBtn'>∨</button>
                    </div>
                </td>
                <td contenteditable="true"></td>
                <td><div class='hoverHidden'><button class='saveBtn'>완료</button><button class='remove' style=color:red>삭제</button><button class='makeSub'>추가</button></div></td>
            </tr>
            `).prependTo($("tbody")); 
        }
    }
    saveTableItem()
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
        $(".tbody").off()
        $(".makeSub").off()
        saveTableItem()
        $(".extensionBtn").click((e) => {controlExtensionBtn(e)});
        $("tbody").keyup((e)=>{
            checkChange(e);
        })
        $(`.makeSub`).click((e) => {
            makeSubItem(e)
        })
        $(`.remove`).click((e) => {
            removeTableItem(e)
        })
    })
    $("nav").prepend(originNav);
}

showFirstPage()
reCallData()