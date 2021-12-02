

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
        <td contenteditable="true">${lastOrder + 1}</td>
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
        <td contenteditable="true"></td>
        <td><div class='hoverHidden'><button>👍</button><button>✅</button><button style=color:red;>ㅡ</button></div></td>
    </tr>
    `).prependTo($("table")); 
}

const showFirstPage = () => {
    $("main").prepend(originTable);
    const addBtn = $(tableRowAddBtn).appendTo($("main"));
    addBtn.click((e)=> {
        addNewTableRow();
    })
    $("nav").prepend(originNav);
}

showFirstPage()


