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

const bigCities = [
  {name: "Gangwon-do"},
  {name: "Gyeonggi-do"},
  {name: "Gyeongsangnam-do"},
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
const global = [
  {name:"GHANA", 한글명:"가나"},{name:"GABON", 한글명:"가봉"},{name:"GUYANA", 한글명:"가이아나"},{name:"GAMBIA", 한글명:"감비아"},{name:"GUERNSEY", 한글명:"건지 섬"},{name:"GUADELOUPE", 한글명:"과들루프"},{name:"GUATEMALA", 한글명:"과테말라"},{name:"GUAM", 한글명:"괌"},{name:"GRENADA", 한글명:"그레나다"},{name:"GREECE", 한글명:"그리스"},{name:"GREENLAND", 한글명:"그린란드"},{name:"GUINEA", 한글명:"기니"},{name:"GUINEA-BISSAU", 한글명:"기니비사우"},{name:"NAMIBIA", 한글명:"나미비아"},{name:"NAURU", 한글명:"나우루"},{name:"NIGERIA", 한글명:"나이지리아"},{name:"ANTARCTICA", 한글명:"남극"},{name:"REPUBLIC OF SOUTH SUDAN", 한글명:"남수단"},{name:"NETHERLANDS", 한글명:"네덜란드"},{name:"NEPAL", 한글명:"네팔"},{name:"NORWAY", 한글명:"노르웨이"},{name:"NORFOLK ISLAND", 한글명:"노퍽 섬"},{name:"NEW CALEDONIA", 한글명:"누벨칼레도니"},{name:"NEW ZEALAND", 한글명:"뉴질랜드"},{name:"NIUE", 한글명:"니우에"},{name:"NIGER", 한글명:"니제르"},{name:"NICARAGUA", 한글명:"니카라과"},{name:"KOREA, REPUBLIC OF", 한글명:"대한민국"},{name:"DENMARK", 한글명:"덴마크"},{name:"DOMINICAN REPUBLIC", 한글명:"도미니카 공화국"},{name:"DOMINICA", 한글명:"도미니카 연방"},{name:"GERMANY", 한글명:"독일"},{name:"LAO PEOPLE'S DEMOCRATIC REPUBLIC", 한글명:"라오스"},{name:"LIBERIA", 한글명:"라이베리아"},{name:"LATVIA", 한글명:"라트비아"},{name:"RUSSIAN FEDERATION", 한글명:"러시아"},{name:"LEBANON", 한글명:"레바논"},{name:"LESOTHO", 한글명:"레소토"},{name:"REUNION", 한글명:"레위니옹"},{name:"ROMANIA", 한글명:"루마니아"},{name:"LUXEMBOURG", 한글명:"룩셈부르크"},{name:"RWANDA", 한글명:"르완다"},{name:"LIBYAN ARAB JAMAHIRIYA", 한글명:"리비아"},{name:"LITHUANIA", 한글명:"리투아니아"},{name:"LIECHTENSTEIN", 한글명:"리히텐슈타인"},{name:"MADAGASCAR", 한글명:"마다가스카르"},{name:"MARTINIQUE", 한글명:"마르티니크"},{name:"MAYOTTE", 한글명:"마요트"},{name:"MACAU", 한글명:"마카오"},{name:"REPUBLIC OF MACEDONIA", 한글명:"마케도니아 공화국"},{name:"MALAWI", 한글명:"말라위"},{name:"MALAYSIA", 한글명:"말레이시아"},{name:"MALI", 한글명:"말리"},{name:"ISLE OF MAN", 한글명:"맨 섬"},{name:"MEXICO", 한글명:"멕시코"},{name:"MONACO", 한글명:"모나코"},{name:"MOROCCO", 한글명:"모로코"},{name:"MAURITIUS", 한글명:"모리셔스"},{name:"MAURITANIA", 한글명:"모리타니"},{name:"MOZAMBIQUE", 한글명:"모잠비크"},{name:"MONTENEGRO", 한글명:"몬테네그로"},{name:"MONTSERRAT", 한글명:"몬트세랫"},{name:"MOLDOVA, REPUBLIC OF", 한글명:"몰도바"},{name:"MALDIVES", 한글명:"몰디브"},{name:"MALTA", 한글명:"몰타"},{name:"MONGOLIA", 한글명:"몽골"},{name:"UNITED STATES", 한글명:"미국"},{name:"MYANMAR", 한글명:"미얀마"},{name:"MICRONESIA", 한글명:"미크로네시아 연방"},{name:"VANUATU", 한글명:"바누아투"},{name:"BAHRAIN", 한글명:"바레인"},{name:"BARBADOS", 한글명:"바베이도스"},{name:"BAHAMAS", 한글명:"바하마"},{name:"BANGLADESH", 한글명:"방글라데시"},{name:"BERMUDA", 한글명:"버뮤다"},{name:"BENIN", 한글명:"베냉"},{name:"VENEZUELA", 한글명:"베네수엘라"},{name:"BELGIUM", 한글명:"벨기에"},{name:"BELARUS", 한글명:"벨라루스"},{name:"BELIZE", 한글명:"벨리즈"},{name:"BOTSWANA", 한글명:"보츠와나"},{name:"BOLIVIA", 한글명:"볼리비아"},{name:"BURUNDI", 한글명:"부룬디"},{name:"BURKINA FASO", 한글명:"부르키나파소"},{name:"BHUTAN", 한글명:"부탄"},{name:"BULGARIA", 한글명:"불가리아"},{name:"BRAZIL", 한글명:"브라질"},{name:"BRUNEI DARUSSALAM", 한글명:"브루나이"},{name:"SAMOA", 한글명:"사모아"},{name:"SAUDI ARABIA", 한글명:"사우디아라비아"},{name:"SAN MARINO", 한글명:"산마리노"},{name:"SENEGAL", 한글명:"세네갈"},{name:"SERBIA", 한글명:"세르비아"},{name:"SEYCHELLES", 한글명:"세이셸"},{name:"SAINT LUCIA", 한글명:"세인트루시아"},{name:"ST. HELENA", 한글명:"세인트헬레나"},{name:"SOMALIA", 한글명:"소말리아"},{name:"SUDAN", 한글명:"수단"},{name:"SURINAME", 한글명:"수리남"},{name:"SRI LANKA", 한글명:"스리랑카"},{name:"SWAZILAND", 한글명:"스와질란드"},{name:"SWEDEN", 한글명:"스웨덴"},{name:"SWITZERLAND", 한글명:"스위스"},{name:"SPAIN", 한글명:"스페인"},{name:"SLOVAKIA", 한글명:"슬로바키아"},{name:"SLOVENIA", 한글명:"슬로베니아"},{name:"SYRIAN ARAB REPUBLIC", 한글명:"시리아"},{name:"SIERRA LEONE", 한글명:"시에라리온"},{name:"SINGAPORE", 한글명:"싱가포르"},{name:"UNITED ARAB EMIRATES", 한글명:"아랍에미리트"},{name:"ARUBA", 한글명:"아루바"},{name:"ARMENIA", 한글명:"아르메니아"},{name:"ARGENTINA", 한글명:"아르헨티나"},{name:"AMERICAN SAMOA", 한글명:"아메리칸사모아"},{name:"ICELAND", 한글명:"아이슬란드"},{name:"HAITI", 한글명:"아이티"},{name:"IRELAND", 한글명:"아일랜드"},{name:"AZERBAIJAN", 한글명:"아제르바이잔"},{name:"AFGHANISTAN", 한글명:"아프가니스탄"},{name:"ANDORRA", 한글명:"안도라"},{name:"ALBANIA", 한글명:"알바니아"},{name:"ALGERIA", 한글명:"알제리"},{name:"ANGOLA", 한글명:"앙골라"},{name:"ANTIGUA AND BARBUDA", 한글명:"앤티가 바부다"},{name:"ANGUILLA", 한글명:"앵귈라"},{name:"ERITREA", 한글명:"에리트레아"},{name:"ESTONIA", 한글명:"에스토니아"},{name:"ECUADOR", 한글명:"에콰도르"},{name:"ETHIOPIA", 한글명:"에티오피아"},{name:"EL SALVADOR", 한글명:"엘살바도르"},{name:"UNITED KINGDOM", 한글명:"영국"},{name:"YEMEN, REPUBLIC OF", 한글명:"예멘"},{name:"OMAN", 한글명:"오만"},{name:"AUSTRALIA", 한글명:"오스트레일리아"},{name:"AUSTRIA", 한글명:"오스트리아"},{name:"HONDURAS", 한글명:"온두라스"},{name:"JORDAN", 한글명:"요르단"},{name:"UGANDA", 한글명:"우간다"},{name:"URUGUAY", 한글명:"우루과이"},{name:"UZBEKISTAN", 한글명:"우즈베키스탄"},{name:"UKRAINE", 한글명:"우크라이나"},{name:"IRAQ", 한글명:"이라크"},{name:"IRAN", 한글명:"이란"},{name:"ISRAEL", 한글명:"이스라엘"},{name:"EGYPT", 한글명:"이집트"},{name:"ITALY", 한글명:"이탈리아"},{name:"INDIA", 한글명:"인도"},{name:"INDONESIA", 한글명:"인도네시아"},{name:"JAPAN", 한글명:"일본"},{name:"JAMAICA", 한글명:"자메이카"},{name:"ZAMBIA", 한글명:"잠비아"},{name:"JERSEY", 한글명:"저지 섬"},{name:"EQUATORIAL GUINEA", 한글명:"적도 기니"},{name:"KOREA, DEMOCRATIC PEOPLE'S REPUBLIC OF", 한글명:"조선민주주의인민공화국"},{name:"GEORGIA", 한글명:"조지아"},{name:"CENTRAL AFRICAN REPUBLIC", 한글명:"중앙아프리카 공화국"},{name:"TAIWAN, PROVINCE OF CHINA", 한글명:"중화민국"},{name:"CHINA", 한글명:"중화인민공화국"},{name:"DJIBOUTI", 한글명:"지부티"},{name:"GIBRALTAR", 한글명:"지브롤터"},{name:"ZIMBABWE", 한글명:"짐바브웨"},{name:"CHAD", 한글명:"차드"},{name:"CZECH REPUBLIC", 한글명:"체코"},{name:"CHILE", 한글명:"칠레"},{name:"CAMEROON", 한글명:"카메룬"},{name:"KAZAKHSTAN", 한글명:"카자흐스탄"},{name:"QATAR", 한글명:"카타르"},{name:"CAMBODIA", 한글명:"캄보디아"},{name:"CANADA", 한글명:"캐나다"},{name:"KENYA", 한글명:"케냐"},{name:"CAYMAN ISLANDS", 한글명:"케이맨 제도"},{name:"COMOROS", 한글명:"코모로"},{name:"COSTA RICA", 한글명:"코스타리카"},{name:"COLOMBIA", 한글명:"콜롬비아"},{name:"CONGO", 한글명:"콩고 공화국"},{name:"DEMOCRATIC REPUBLIC OF THE CONGO", 한글명:"콩고 민주 공화국"},{name:"CUBA", 한글명:"쿠바"},{name:"KUWAIT", 한글명:"쿠웨이트"},{name:"COOK ISLANDS", 한글명:"쿡 제도"},{name:"CROATIA", 한글명:"크로아티아"},{name:"CHRISTMAS ISLAND", 한글명:"크리스마스 섬"},{name:"KYRGYZSTAN", 한글명:"키르기스스탄"},{name:"KIRIBATI", 한글명:"키리바시"},{name:"CYPRUS", 한글명:"키프로스"},{name:"THAILAND", 한글명:"타이"},{name:"TAJIKISTAN", 한글명:"타지키스탄"},{name:"TANZANIA, UNITED REPUBLIC OF", 한글명:"탄자니아"},{name:"TURKEY", 한글명:"터키"},{name:"TOGO", 한글명:"토고"},{name:"TONGA", 한글명:"통가"},{name:"TURKMENISTAN", 한글명:"투르크메니스탄"},{name:"TUVALU", 한글명:"투발루"},{name:"TUNISIA", 한글명:"튀니지"},{name:"TRINIDAD AND TOBAGO", 한글명:"트리니다드 토바고"},{name:"PANAMA", 한글명:"파나마"},{name:"PARAGUAY", 한글명:"파라과이"},{name:"PAKISTAN", 한글명:"파키스탄"},{name:"PAPUA NEW GUINEA", 한글명:"파푸아 뉴기니"},{name:"PALAU", 한글명:"팔라우"},{name:"PALESTINE", 한글명:"팔레스타인"},{name:"FAROE ISLANDS", 한글명:"페로 제도"},{name:"PERU", 한글명:"페루"},{name:"PORTUGAL", 한글명:"포르투갈"},{name:"FALKLAND ISLANDS", 한글명:"포클랜드 제도"},{name:"POLAND", 한글명:"폴란드"},{name:"PUERTO RICO", 한글명:"푸에르토리코"},{name:"FRANCE", 한글명:"프랑스"},{name:"FRENCH GUIANA", 한글명:"프랑스령 기아나"},{name:"FRENCH POLYNESIA", 한글명:"프랑스령 폴리네시아"},{name:"FIJI", 한글명:"피지"},{name:"FINLAND", 한글명:"핀란드"},{name:"PHILIPPINES", 한글명:"필리핀"},{name:"PITCAIRN", 한글명:"핏케언 제도"},{name:"HUNGARY", 한글명:"헝가리"},{name:"HONG KONG", 한글명:"홍콩"}
]

const shortNameArray ={
  "고양시":"고양시",
  "과천시":"과천시",
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
  "Chungcheongbuk-do":"충청북도"
}

$("li").click((e) => {
  $("#content").html("")
  const value = e.target.text;
  $("#dropdownMenuButton1").text(value);
  let areas;
  switch(value){
    case '경기도': areas = GyeonggiArray; break;
    case '한국': areas = bigCities; break;
    case '글로벌': areas = global;
  }
  drawRows(areas);
})

const apiCall = (city) => {
  return new Promise((resolve, reject) => {
    const res = $.ajax({
      url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&APPID=419670dccf136242228a0ffe5dc4c65d",
      type: "GET",
      success: async function(data){
        const result = {"city":city, "temp": data.main.temp, "humid": data.main.humidity, "wind":data.wind.speed, "cloud": data.clouds.all,  "snow":data.snow, "location":{"lon":data.coord.lon, "lat":data.coord.lat}};
        result.air = await apiCall_air();
        if(data.rain){
          result.rain = data.rain['1'];
        } else result.rain = 0;
        if(data.snow){
          result.snow = data.snow;
        } else result.snow = 0;
        resolve(result);
      }
  });
  })
};

apiCall("고양시")

const paintTable = (order, distance, city, weatherScore, temp, cloud, wind, humid, rain, snow, air) =>{
  $(`<div class='divTR'>
  <div class='divTD'>${order}</div>
  <div class='divTD'>${city}</div>
  <div class='divTD'><b>${weatherScore}</b></div>
  <div class='divTD'><b>${distance}km</b></div>
  <div class='divTD'>${temp}</div>
  <div class='divTD'>${cloud}</div>
  <div class='divTD'>${wind}</div>
  <div class='divTD'>${humid}</div>
  <div class='divTD'>${rain}</div>
  <div class='divTD'>${snow}</div>
  <div class='divTD'>${air}</div>
  </div>`).appendTo($("#content"));
$("#content .divTR").click((e)=>{
showDetail(e)
})
}

const drawRows = async (areaArray) => {
  const callTask = areaArray.map(async (area) => {
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
  console.log(result);
  for(let i = 0; i < 10; i++){
    const lat = result[i].location.lat;
    const lon = result[i].location.lon;
    const distance = Math.round(await kimin(lat, lon)/1000);
    const cityName = result[i].city+"";
    const city = shortNameArray[cityName];
    const weatherScore = result[i].weatherScore;
    const temp = result[i].temp+"℃";
    const cloud = Math.round(result[i].cloud);
    const wind = result[i].wind+"m/s";
    const humid = result[i].humid+"%";
    if(result[i].rain !== 0){
      const rain = result[i].rain+"mm";
    } const rain = "-";
    if(result[i].snow !== 0){
      const snow = result[i].snow+"mm";
    } const snow = "-";
    const air = result[i].air;
    let order = 1;
    paintTable(order, distance, city, weatherScore, temp, cloud, wind, humid, rain, snow, air);
    order++;
  }
}

const apiCall2 = async (lat, lon) => {
  return $.ajax({
    url: `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=419670dccf136242228a0ffe5dc4c65d`,
    type: "GET",
  });
};

const apiCall_air = async (lat, lon) => {
  const kk = await apiCall2(50,50);
  const airIDX = kk.list[0].main.aqi
  return airIDX;
}

const addOptionButton = (option) =>{
  $("#option").append(
    `<span>${option}</span>
    <label class='switch'>
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
    if(rain){
      this.rainScore = (100 - rain)*.15;
    } else this.rainScore = 15;
    this.airScore = (100 - air)*.15;
  }

  getTotal(){
    const totalScore =this.tempScore + this.humidScore + this.windScore + this.cloudScore + this.snowScore + this.rainScore + this.airScore;
    return totalScore;
  }
}

const calculator = (weatherArr) => {
  const [temp, humid, wind, cloud, snow, rain, air] = weatherArr;
  const scores = new Scores(temp, humid, wind, cloud, snow, rain, air).getTotal();
  return Math.round(scores);
}

drawRows(bigCities);
