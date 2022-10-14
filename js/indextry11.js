

var finalData = []
var data = ''
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const d = new Date();
let dayOne = days[d.getDay()];
let dayTwo = days[d.getDay()+1];
let dayThree = days[d.getDay()+2];
if ((days.indexOf(d.getDay()+2))==-1)
{
  dayThree=days[0]
}

const m = new Date();
let month = months[m.getMonth()];

const dayNumber = new Date();

var searchInput = document.getElementById('searchInput')



async function getData(country) {
  var weatherData = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=55b5296507244e6da9c30603221010&q=${country}&days=3`)
  data = await weatherData.json()
  finalData.push(data)

  if (weatherData.status == 400) {
    weatherData = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=55b5296507244e6da9c30603221010&q=cairo&days=3`)
    data = await weatherData.json()
    finalData = []
    finalData.push(data)
  }
  displayData()
  displayDataTwo()
  displayDataThree()
}
getData('cairo')





function displayData() {
  var cols = ''
  

  for (let i = 0; i < finalData.length; i++) {

    cols = ` <div class="item   ">
<div class="d-flex justify-content-between firstsection">
  <h5 class="text-muted  ps-2 py-1">${dayOne}</h5>
  <h5 class="text-muted pe-2 py-1">${dayNumber.getDate()} ${month}</h5>
</div>
<div class="secondsection">
  <h5 class="pt-3 ps-4 text-muted">${finalData[i].location.name}</h5>
  <h1 class="text-white ps-3">${finalData[i].current.temp_c}°C<img src='https:${finalData[i].current.condition.icon}' alt="" class='ms-5 w-25'></h1>
  <h6 class="text-primary ps-4">${finalData[i].current.condition.text}</h6>
  <div class="mt-4 ps-3">
    <span class="pe-3 text-muted"><img src="Capture.JPG" alt=""> ${finalData[i].current.humidity}%</span>
    <span class="pe-3 text-muted"><img src="Capture1.JPG" alt=""> ${finalData[i].current.wind_kph} km/hr</span>
    <span class="text-muted"><img src="Capture2.JPG" alt="">${finalData[i].current.wind_dir}</span>
  </div>
</div>
</div>
`
  }
  document.getElementById('itemOne').innerHTML = cols
}

function displayDataTwo() {
  var cols = ''

  for (let i = 0; i < finalData.length; i++) {
    cols = `
<div class="item text-center " >
          <div class="firstsection1 py-1  ">
            <h5 class="text-center text-muted">${dayTwo}</h5>
          </div>
          <div class="secondsection1  ">
            <img src='https:${finalData[i].forecast.forecastday[1].day.condition.icon}' class="py-3" alt="">
            <h2 class="text-white">${finalData[i].forecast.forecastday[1].day.maxtemp_c}°C</h2>
            <h5 class="pb-3 text-muted">${finalData[i].forecast.forecastday[1].day.mintemp_c}°C </h5>

            <h5 class="text-primary">${finalData[i].forecast.forecastday[1].day.condition.text}</h5>
          </div>
        </div>
`
  }
  document.getElementById('itemTwo').innerHTML = cols
}
function displayDataThree() {
  var cols = ''

  for (let i = 0; i < finalData.length; i++) {
    cols = `
<div class="item text-center">
          <div class="firstsection py-1">
            <h5 class="text-center text-muted">${dayThree}</h5>
          </div>
          <div class="secondsection">
            <img src="https:${finalData[i].forecast.forecastday[2].day.condition.icon}" class="py-3" alt="">
            <h2 class=" text-white">${finalData[i].forecast.forecastday[2].day.maxtemp_c}°C</h2>
            <h5 class="pb-3 text-muted">${finalData[i].forecast.forecastday[2].day.mintemp_c}°C </h5>

            <h5 class="text-primary">${finalData[i].forecast.forecastday[2].day.condition.text}</h5>
          </div>
        </div>
`
  }
  document.getElementById('itemThree').innerHTML = cols
}


searchInput.onkeyup = function () {

  getData(`${searchInput.value}`)

}

