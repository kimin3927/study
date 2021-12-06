

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
    let lastOrder = lastOrderDiv.text() * 1;
    if(!lastOrder){
        lastOrder = 0;    
    }
    $(`
    <tr>
        <td class='order' contenteditable="true">${lastOrder + 1}</td>
        <td class='regisDate' contenteditable="true"></td>
        <td>
            <div class='title'>
                <p contenteditable="true"></p>
            </div>
            <div class='extension hoverHidden'>
                <button class='extensionBtn'>∨</button>
            </div></br>
            <div class='contents'><p contenteditable="true"></p></div>
        </td>
        <td contenteditable="true"></td>
        <td><div class='hoverHidden'><button class='saveBtn'>완료</button><button style=color:red>삭제</button><button>추가</button></div></td>
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
            $(tr.children()[0]).text() * 1,
            $(tr.children()[1]).text(),
            $($($(tr.children()[2])).children()[0]).text().trim(),
            $($($(tr.children()[2])).children()[3]).text(),
            $(tr.children()[3]).text(),
        )
        itemsArray.push(itemGroup)
    }
    sortItemGroups(itemsArray);
    console.log(itemsArray);
    connecttable2Index(itemsArray);
}


const controlExtensionBtn = (e) => {
    const targetBtn = $(e.currentTarget);
    const targetTR = $(targetBtn.parents()[2]);
    const targetContents = $($(targetTR.children()[2]).children(".contents"));
    if(targetBtn.text() =="∨"){
        targetBtn.text("∧");
        targetContents.css('display', 'block');
    } else {
        targetBtn.text("∨");
        targetContents.css('display', 'none');
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




const showFirstPage = () => {
    $("main").prepend(originTable);
    const addBtn = $(tableRowAddBtn).appendTo($("main"));
    addBtn.click((e)=> {
        addNewTableRow();
        $("tbody").off()
        $(".extensionBtn").click((e) => {controlExtensionBtn(e)});
        saveTableItem()
        connecttable2Index(itemsArray)
        $("tbody").keyup((e)=>{
            checkChange(e);
        })
    })
    $("nav").prepend(originNav);
}



showFirstPage()
