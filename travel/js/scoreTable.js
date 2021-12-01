const GyeonggiArray =[
  {"name":"고양시"},
  {"name":"과천시"},
  {"name":"광명시"},
  {"name":"광주시"},
  {"name":"구리시"},
  {"name":"군포시"},
  {"name":"김포시"},
  {"name":"남양주시"},
  {"name":"동두천시"},
  {"name":"부천시"},
  {"name":"성남시"},
  {"name":"수원시"},
  {"name":"시흥시"},
  {"name":"안산시"},
  {"name":"안성시"},
  {"name":"안양시"},
  {"name":"양주시"},
  {"name":"여주시"},
  {"name":"오산시"},
  {"name":"용인시"},
  {"name":"의왕시"},
  {"name":"의정부시"},
  {"name":"이천시"},
  {"name":"파주시"},
  {"name":"평택시"},
  {"name":"포천시"},
  {"name":"하남시"},
  {"name":"화성시"},
  {"name":"가평군"},
  {"name":"양평군"},
  {"name":"연천군"},
  ]

const KoreaArray = [
  {name: "Gangwon-do"},
  {name: "Gyeonggi-do"},
  {name: "Gyeongsangnam-do"},
  {name: "Gyeongsangbuk-do"},
  {name: "세종시"},
  {name: "광주광역시"},
  {name: "대구광역시"},
  {name: "대전광역시"},
  {name: "부산광역시"},
  {name: "서울특별시"},
  {name: "울산광역시"},
  {name: "인천광역시"},
  {name: "Jeollanam-do"},
  {name: "Jeollabuk-do"},
  {name: "Jeju-do"},
  {name: "Chungcheongnam-do"},
  {name: "Chungcheongbuk-do"}
]

const SeoulArray = [
 {name: "종로구"},
 {name: "중구"},
 {name: "용산구"},
 {name: "성동구"},
 {name: "광진구"},
 {name: "동대문구"},
 {name: "중랑구"},
 {name: "성북구"},
 {name: "강북구"},
 {name: "도봉구"},
 {name: "노원구"},
 {name: "은평구"},
 {name: "서대문구"},
 {name: "마포구"},
 {name: "양천구"},
 {name: "강서구"},
 {name: "구로구"},
 {name: "금천구"},
 {name: "영등포구"},
 {name: "동작구"},
 {name: "관악구"},
 {name: "서초구"},
 {name: "강남구"},
 {name: "송파구"},
 {name: "강동구"},
]

const shortNameArray ={
  "고양시":"고양시",
  "과천시":"과천시",
  "세종시":"세종시",
  "Gyeongsangbuk-do": "경상북도",
  "광명시":"광명시",
  "광주시":"광주시",
  "구리시":"구리시",
  "군포시":"군포시",
  "김포시":"김포시",
  "남양주시":"남양주시",
  "동두천시":"동두천시",
  "부천시":"부천시",
  "성남시":"성남시",
  "수원시":"수원시",
  "시흥시":"시흥시",
  "안산시":"안산시",
  "안성시":"안성시",
  "안양시":"안양시",
  "양주시":"양주시",
  "여주시":"여주시",
  "오산시":"오산시",
  "용인시":"용인시",
  "의왕시":"의왕시",
  "의정부시":"의정부시",
  "이천시":"이천시",
  "파주시":"파주시",
  "평택시":"평택시",
  "포천시":"포천시",
  "하남시":"하남시",
  "화성시":"화성시",
  "가평군":"가평군",
  "양평군":"양평군",
  "연천군":"연천군",
  "Gangwon-do":"강원도",
  "Gyeonggi-do":"경기도",
  "Gyeongsangnam-do":"경상남도",
  "광주광역시":"광주",
  "대구광역시":"대구",
  "대전광역시":"대전",
  "부산광역시":"부산",
  "서울특별시":"서울",
  "울산광역시":"울산",
  "인천광역시":"인천",
  "Jeollanam-do":"전라남도",
  "Jeollabuk-do":"전라북도",
  "Jeju-do":"제주도",
  "Chungcheongnam-do":"충청남도",
  "Chungcheongbuk-do":"충청북도",
  "종로구":"종로구",
  "중구":"중구",
  "용산구":"용산구",
  "성동구":"성동구",
  "광진구":"광진구",
  "동대문구":"동대문구",
  "중랑구":"중랑구",
  "성북구":"성북구",
  "강북구":"강북구",
  "도봉구":"도봉구",
  "노원구":"노원구",
  "은평구":"은평구",
  "서대문구":"서대문구",
  "마포구":"마포구",
  "양천구":"양천구",
  "강서구":"강서구",
  "구로구":"구로구",
  "금천구":"금천구",
  "영등포구":"영등포구",
  "동작구":"동작구",
  "관악구":"관악구",
  "서초구":"서초구",
  "강남구":"강남구",
  "송파구":"송파구",
  "강동구":"강동구",
}

$("li").click((e) => {
  $("#content").html("")
  const value = e.target.text;
  $("#dropdownMenuButton1").text(value);
  let areas;
  switch(value){
    case '경기도': areas = GyeonggiArray; break;
    case '한국': areas = KoreaArray; break;
    case '서울': areas = SeoulArray; break;
  }
  drawRows(areas);
  showNewmap(value);
})

$("#ktable").mouseenter((e)=>{
  $("#ktable").addClass("hoverTable");
})

$("#ktable").mouseleave((e)=>{
  $("#ktable").removeClass("hoverTable");
})

const apiCall_air = async (lat, lon) => {
  const kk = await apiCall2(lat,lon);
  const airIDX = kk.list[0].main.aqi;
  return airIDX;
}

const apiCall = async (city) => {
  const data = await $.ajax({
    url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&APPID=419670dccf136242228a0ffe5dc4c65d",
    type: "GET",
  });
    const result = {"city":city, "temp": data.main.temp, "humid": data.main.humidity, "wind":data.wind.speed, "cloud": data.clouds.all,  "snow":data.snow, "location":{"lon":data.coord.lon, "lat":data.coord.lat}, "cityEng":data.name};
    result.air = await apiCall_air(result.location.lat, result.location.lon);
    if(data.rain){
      result.rain = data.rain['1'];
    } else result.rain = 0;
    if(data.snow){
      result.snow = data.snow["1h"];
    } else result.snow = 0;
  return result;
};


const explainAir = () => {
  console.log(12)
}

const airMappingObject = {
  1:`매우좋음`,
  2:`좋음`,
  3:`보통`,
  4:`나쁨`,
  5:`매우나쁨`,
}


const paintTable = (order, distance, city, weatherScore, temp, cloud, wind, humid, rain, snow, air, cityEng) =>{
  const airTitle = airMappingObject[air];
  const divTR = $(
  `<div class='divTR' id='${cityEng}'>
  <div class='divTD'>${order}</div>
  <div class='divTD'>${city}</div>
  <div class='divTD'>${weatherScore}</div>
  <div class='divTD'>${distance}</div>
  <div class='divTD'>${temp}</div>
  <div class='divTD'>${cloud}</div>
  <div class='divTD'>${wind}</div>
  <div class='divTD'>${humid}</div>
  <div class='divTD'>${rain}</div>
  <div class='divTD'>${snow}</div>
  <div class='divTD' title='${airTitle}'>${air}</div>
  </div>`).appendTo($("#content"));
  divTR.mouseenter((e)=>{
    showArrow(e);
    connectTable2Map(e);
  })
  divTR.mouseleave((e)=>{
    showArrow(e);
    connectTable2Map(e);
  })
  const arrowDiv = $(`<div class='divTD'></div>`).appendTo(divTR);
  const arrowBtn = $(`<button class='hidden'>👉</button>`).appendTo(arrowDiv)
  arrowBtn.click((e)=> {
    arrowClickHandle(e);
    e.stopPropagation();
  })
}

const sendData = (array, entireArray, j) =>{
  for(let i = 0; i < array.length; i++){
    entireArray.push(array[i]);
    const lat = array[i].location.lat;
    const lon = array[i].location.lon;
    const distance = getDistanceFromLatLonInKm(myHome, lat, lon)+"km"
    const cityName = array[i].city+"";
    const city = shortNameArray[cityName];
    const weatherScore = array[i].weatherScore;
    const temp = array[i].temp+"℃";
    const cloud = Math.round(array[i].cloud)+"%";
    const wind = array[i].wind+"m/s";
    const humid = array[i].humid+"%";
    if(array[i].rain !== 0){
      const rain = array[i].rain+"mm";
    } const rain = "-";
    if(array[i].snow !== 0){
      const snow = array[i].snow+"mm";
    } const snow = "-";
    const air = array[i].air;
    const cityEng = array[i].cityEng
    const order = (j *6) + 1 + i;
    paintTable(order, distance, city, weatherScore, temp, cloud, wind, humid, rain, snow, air, cityEng);
    paintMap(cityEng, weatherScore);
  }
}


const apiCall2 = async (lat, lon) => {
  return $.ajax({
    url: `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=419670dccf136242228a0ffe5dc4c65d`,
    type: "GET",
  });
};

function getDistanceFromLatLonInKm(myHome, lat2, lng2) {
  const [lat1, lng1] = myHome;
  function deg2rad(deg) {
      return deg * (Math.PI/180);
  }
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1); // deg2rad below
  var dLon = deg2rad(lng2-lng1);
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = Math.floor(R * c); // Distance in km return d;
  return d;
}

const myHome = [37.573, 126.935]

console.log(getDistanceFromLatLonInKm(myHome, 35.1048, 129.0333))


const paintMap = (cityID, score) => {
  for(let i = 0; i < Object.keys(IDObject).length; i++) {
    if(IDObject[Object.keys(IDObject)[i]] == cityID) {
      const mapID = Object.keys(IDObject)[i];
      if(score > 70){
        const red = ((100 - score)*10);
        const blue = ((100 - score)*10);
        $(`#${mapID}`).css("fill", `rgb(${red},255,${blue})`);
      } else {
        const green = 255 + ((score - 70)*6);
        const blue =255 + ((score - 70)*6);
        $(`#${mapID}`).css("fill", `rgb(255,${green},${blue})`);
      }
    }
  }
}

const chunk = (arr, size) => {
  var i, j, temparray = [], chunk = size;
  for (i = 0, j = arr.length; i < j; i += chunk) {
      temparray.push(arr.slice(i, i + chunk));
  }
  return temparray
}

const drawRows = async (areaArray) => {
  const finalArray = [];
  const eachArray = chunk(areaArray, 6);
  for(let j=0; j < eachArray.length; j++){
    const callTask = eachArray[j].map(async (area) => {
      const result = await apiCall(area.name);
      return result;
    })
    const result = await Promise.all(callTask);
    result.forEach((a) => {
      const myArr = [a.temp, Math.round(a.humid)*0.01, a.wind, Math.round(a.cloud)*0.01, a.snow, a.rain, a.air];
      a.weatherScore = calculator(myArr);
    });
    result.sort((a,b) => {
      if(a.weatherScore !== b.weatherScore){
        return b.weatherScore - a.weatherScore;
      } else return 0;
    })
    sendData(result, finalArray, j)
  }
  finalArray.sort((a,b) => {
    if(a.weatherScore !== b.weatherScore){
      return b.weatherScore - a.weatherScore;
    } else return 0;
  })
  $("#content").html("")
  sendData(finalArray, [], 0)
  $("#content").addClass(`animate__animated animate__headShake`);
  setTimeout( () => {
    $("#content").removeClass(`animate__animated animate__headShake`)
  }, 2000);
}

$("#addressForm").submit((e) => {
  e.preventDefault();
  const inputTag = $(e.currentTarget).children()[0];
  const address = inputTag.value;
  if(address !== `서울시 서대문구 연희로`){
    $(inputTag).val(address)
  }
})

const addOptionButton = (option) =>{
  $("#option").prepend(
    `<label class='switch'>
    <span>${option}</span>
    <input type='checkbox'>
    <span class='slider round'></span>
    </label>`
  )
}
const opptionArray = ["온도", "구름", "바람", "습도", "강수", "강설", "공기"];

for(i of opptionArray){
  addOptionButton(i)
}

class Scores {
  constructor(temp, humid, wind, cloud, snow, rain, air){
    if(temp > 20){
      this.tempScore = (100- (temp - 20) * 4) * 0.25;
    } else this.tempScore = (100 - (20 - temp) * 4)*.25;
    if(humid > 0.6){
      this.humidScore = (100- (humid - 0.6) * 200)*.05;
    } else this.humidScore = (100- (0.6 - humid) * 130)*.05;
    this.windScore = (100 - wind * 5)*.1;
    this.cloudScore = (100 - cloud * 100)*.15;
    if(snow){
      this.snowScore = (100 - snow * 10) * .15;
    } else this.snowScore = 15;
    if(rain)   {
      this.rainScore = (100 - rain)*.15;
    } else this.rainScore = 15;
    this.airScore = (100 - air)*.15;
  }

  getTotal() {
    const totalScore =this.tempScore + this.humidScore + this.windScore + this.cloudScore + this.snowScore + this.rainScore + this.airScore;
    return totalScore;
  }
}

const calculator = (weatherArr) => {
  const [temp, humid, wind, cloud, snow, rain, air] = weatherArr;
  const scores = new Scores(temp, humid, wind, cloud, snow, rain, air).getTotal();
  return Math.round(scores);
}

drawRows(KoreaArray);

const sortAgain = (e) => {
  value = e.currentTarget.textContent; //클릭된 메뉴 텍스트 인식
  const contents = [];//현재 렌더된 도시별 데이터를 매핑
  for(i of $("#content").children()) {
    const content ={};
    const cell = i.children;
    content.order = cell[0].textContent;
    content.cityName = cell[1].textContent+"";
    content.weatherScore = cell[2].textContent;
    content.distance = cell[3].textContent;
    content.temp = cell[4].textContent;
    content.cloud = cell[5].textContent;
    content.wind = cell[6].textContent;
    content.humid = cell[7].textContent;
    content.rain = cell[8].textContent;
    content.snow = cell[9].textContent;
    content.air = cell[10].textContent;
    content.cityEng = i.id;
    contents.push(content)
  };
  let standard;
  switch(value) {
    case '순위': standard = "order"; break;
    case '도시': standard = "cityName"; break;
    case '날씨점수': standard = "weatherScore"; break;
    case '거리': standard = "distance"; break;
    case '온도': standard = "temp"; break;
    case '구름': standard = "cloud"; break;
    case '바람': standard = "wind"; break;
    case '습도': standard = "humid"; break;
    case '강수': standard = "rain"; break;
    case '강설': standard = "snow"; break;
    case '공기': standard = "air"; break;
  }
  for(let i = 0; i < $("#content").children().length; i++) {
    $($(".divDia")[i]).removeClass("diamondAscending diamondDescending");
    $($(".divDia")[i]).addClass("diamond");
  }
  if($(e.currentTarget).data("status") !== "Descending") {
    if(/\d/.test(contents[0][standard])) {
      contents.sort((a,b) =>{
        return b[standard].match(/[\d.]+/)[0]*1 - a[standard].match(/[\d.]+/)[0]*1;
      })
    } else contents.sort((a,b) => {
        if(b[standard] > a[standard]) {
          return -1
        } else return 1;
    })
    $(e.currentTarget.children[0]).addClass("diamondDescending");
    $(e.currentTarget).data("status", "Descending");
  } else {
    if(/\d/.test(contents[0][standard])) {
      contents.sort((a,b) =>{
        return a[standard].match(/[\d.]+/)[0]*1 - b[standard].match(/[\d.]+/)[0]*1;
      })
    } else contents.sort((a,b) => {
        if(a[standard] > b[standard]) {
          return -1
        } else return 1;
    })
    $(e.currentTarget.children[0]).addClass("diamondAscending");
    $(e.currentTarget).data("status", "Ascending");
  }
  $("#content").html("");
    for(let i = 0; i < contents.length; i++){
      paintTable(contents[i].order, contents[i].distance, contents[i].cityName, contents[i].weatherScore, contents[i].temp, contents[i].cloud, contents[i].wind, contents[i].humid, contents[i].rain, contents[i].snow, contents[i].air, contents[i].cityEng);
    }
}


$("#divMenu .divTD").click(sortAgain);

