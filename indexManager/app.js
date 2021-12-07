

const originTable = 
`
<table>
    <thead>
        <tr>
            <th contenteditable="true">순번</th>
            <th contenteditable="true">날짜</th>
            <th contenteditable="true">내용</th>
            <th contenteditable="true">완료</th>
            <th contenteditable="true">관리</th>
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
    const lastOrderDiv = $($("tbody td")[0])
    let lastOrder;
    if(!itemsArray[0]){
        lastOrder = 0;    
    } else {
        lastOrder = itemsArray[itemsArray.length - 1].order * 1;
    }
    $(`
    <tr>
        <td class='order' contenteditable="true">${lastOrder + 1}</td>
        <td class='regisDate' contenteditable="true"></td>
        <td class='content'>
            <div class='title'>
                <p contenteditable="true"></p>
            </div>
            <div class='extension hoverHidden'>
                <button class='extensionBtn'>∨</button>
            </div></br>
            <div class='contents'><p contenteditable="true"></p></div>
        </td>
        <td contenteditable="true"></td>
        <td><div class='hoverHidden'><button class='saveBtn'>완료</button><button style=color:red>삭제</button><button class='makeSub'>추가</button></div></td>
    </tr>
    `).prependTo($("table")); 
}

class group {
    constructor(order, registDate, title, contents, finDate){
        this.order = order;
        this.registDate = registDate;
        this.title = title;
        this.finDate = finDate;
        this.contents = contents;
    }
}

let itemsArray = [];

const sortItemGroups = (ItemGrops) => {
    ItemGrops.sort((a,b) => {
        return a["order"] - b["order"];
    })
}

const saveTableItem = () => { 
    const TRArray = $("tbody").children();
    itemsArray = [];
    for(i of TRArray){
        const tr = $(i);
        const itemGroup = new group(
            $(tr.children(".order")).text() * 1,
            $(tr.children()[1]).text(),
            $($($(tr.children()[2])).children()[0]).text().trim(),
            $($($(tr.children()[2])).children()[3]).text(),
            $(tr.children()[3]).text(),
        )
        itemsArray.push(itemGroup)
        console.log(itemGroup)
    }
    sortItemGroups(itemsArray);
    console.log(itemsArray);
    connecttable2Index(itemsArray);
}

const controlExtensionBtn = (e) => {
    const targetBtn = $(e.currentTarget);
    const targetTR = $(targetBtn.parents("tr"));
    const targetContents = targetTR.children(".content").children(".contents");
    targetContents.slideToggle(1);
    if(targetBtn.text() =="∨"){
        targetBtn.text("∧");
    } else {
        targetBtn.text("∨");
    }
}

const connecttable2Index = (itemsArray) => {
    const NumberOfItem = $($("tbody").children()).length;
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
    }, 500)
}

const makeSubItem = (e) => {
    const targetTR = $(e.currentTarget).parents("tr")
    console.log(targetTR.children(`.order`))
    const numberOfSubItem = targetTR.children(`.order`).children().length
    const subOrderDiv = targetTR.children(`.order`).append(`<div class='blank'><div class='subOrder'>1-${numberOfSubItem + 1}</div></div>`);
    const subRegisDate = targetTR.children(`.regisDate`).append(`</br><div class='subRegisDate'></div>`);
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
        connecttable2Index(itemsArray)
        $(".extensionBtn").click((e) => {controlExtensionBtn(e)});
        $("tbody").keyup((e)=>{
            checkChange(e);
        })
        $(`.makeSub`).click((e) => {
            makeSubItem(e)
        })
    })
    $("nav").prepend(originNav);
}



showFirstPage()
