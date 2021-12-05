

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
        <td><div class='hoverHidden'><button class='saveBtn'>등록</button><button style=color:red>삭제</button><button>추가</button></div></td>
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

const saveTableItem = (e) => {
    const targetTR = $($(e.currentTarget).parents()[2]);
    console.log(targetTR);
    const itemGroup = new group(
        $(targetTR.children()[0]).text(),
        $(targetTR.children()[1]).text(),
        $($($(targetTR.children()[2])).children()[0]).text(),
        $($($(targetTR.children()[2])).children()[3]).text(),
        $(targetTR.children()[3]).text(),
    )
    const order = $($(targetTR)+".order");
    console.log(itemGroup);
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

const connecttable2Index = () => {
    const NumberOfItem = $($("tbody").children()).length;
    $("nav ul").html("");
    for(let i = 1; i < NumberOfItem + 1; i++){
        const newItemIndex = $(`<li>${i}.기민<li>`).appendTo($("nav ul"));
    }
}

const showFirstPage = () => {
    $("main").prepend(originTable);
    const addBtn = $(tableRowAddBtn).appendTo($("main"));
    addBtn.click((e)=> {
        addNewTableRow();
        $("tbody button").off()
        $(".saveBtn").click((e) => {saveTableItem(e)});
        $(".extensionBtn").click((e) => {controlExtensionBtn(e)});
        connecttable2Index()
    })
    $("nav").prepend(originNav);
}

showFirstPage()
