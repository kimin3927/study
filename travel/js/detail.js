const showArrow = (e) => {
  const target = $($(e.currentTarget).children()[11]);
  console.log(target)
  if(target.data("hoverStatus") !== "on") {
    target.data("hoverStatus", "on")
    $(target.children()[0]).removeClass("hidden")
  } else {
    target.data("hoverStatus", "off");
    $(target.children()[0]).addClass("hidden")
  }
}

const arrowClickHandle = (e) => {
  const btnDiv = $(e.currentTarget).parent();
  const itsRowID = $(btnDiv.parent()).attr("id");
  if(!$("#detail").data("status") || $("#detail").data("status") == "closed") {
    $("#detail").data("status", `${itsRowID}`);
    $("#detail").css("width", "30%");
    console.log($("#detail").css("width"))
    $("#map").css("zIndex", "-2");
    makeDetailContents(itsRowID);
  } else {
      if(itsRowID !== $("#detail").data("status")){
        $("#detail").data("status", `${itsRowID}`);
        $("#detail").css("width", "30%");
        $("#map").css("zIndex", "-2")
        makeDetailContents(itsRowID);
      } else {
        $("#detail").text("");
        $("#map").css("zIndex", "2")
        $("#detail").data("status", "closed");
        $("#detail").css("width", "0");
      }
  }
}

$("body").click((e) =>{
  if($("#detail").data("status") !== "closed"){
    $("#detail").text("");
    $("#map").css("zIndex", "2")
    $("#detail").data("status", "closed");
    $("#detail").css("width", "0");
  }
})

const makeDetailContents = (id) => {
  $("#detail").text(``);
  $("#detail").append(`${id}`);
}

// const afkey = `SDRbmynkhVAJ7Y8GyxJDNvxT8dcE32hBE5%2FjwnFFCKxxusxtWuUy6HfdzRO%2BZ5jBlVxI7jsTvIXBRx4fHFPPeg%3D%3D`;

// const apiCall3 = () => {
//   const data = $.ajax({
//     url: `http://api.visitkorea.or.kr/openapi/service/rest/DataLabService/metcoRegnVisitrDDList?serviceKey=${afkey}&pageNo=1&numOfRows=10&MobileOS=WIN&MobileApp=AppTest&startYmd=20210513&endYmd=2021513`,
//     type: "GET",
//   });
//   console.log(data);
//   return data;
// }

// apiCall3();

// const apiCall_naver = (query, display, start) => {
//   const data = $.ajax({
//     headers : {
//       "X-Naver-Client-Id":"Jiz3dO5sz8acihT6BrKQ",
//       "X-Naver-Client-Secret":"SFcjSlbHui"
//     },
//     url: `https://openapi.naver.com/v1/search/local.xml?query=%EC%A3%BC%EC%8B%9D&display=10&start=1&sort=random`,
//     //`https://openapi.naver.com/v1/search/local.json?query=${query}&dispaly=${display}&start=${start}&sort=random`,
//     type: "GET",
//   });
//   console.log(data);
//   return data;
// }

// apiCall_naver("서울", 5, 1);


