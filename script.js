// DOM Elements
const time = document.querySelector('.time'),
  date = document.querySelector('.date'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus');

  const weatherIcon = document.querySelector('.weather-icon');
  const temperature = document.querySelector('.temperature');
  const weatherDescription = document.querySelector('.weather-description');
  const city = document.querySelector('.city');
  const icon_wind = document.querySelector('.icon-wind');
  const icon_humidity = document.querySelector('.icon_humidity');
  const wind_speed = document.querySelector('.wind-speed');
  const weather_description = document.querySelector('.weather-description');
  const humidity = document.querySelector('.humidity');
  const error_text = document.querySelector('.error_text');
  
  async function getWeather() {
    var name;
    if(city.textContent!=''){
      name=city.textContent;
      localStorage.setItem('city', name);
      var nothing = false;
    }
    else {name = localStorage.getItem('city'); var nothing=true;}
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&lang=ru&appid=fa4bd87f75bc89651ce93f8520a5f976&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    //var name = `${data.name}`;
    //console.log(data.name);
    if(data.name == name){
        localStorage.setItem('city', name);
        city.textContent=localStorage.getItem('city');
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
        weatherDescription.textContent = data.weather[0].description;


        wind_speed.textContent = `${data.wind.speed.toFixed(0)} м/с`;
        humidity.textContent = `${data.main.humidity} %`; 
        icon_wind.classList.remove('error');
        icon_humidity.classList.remove('error');
        weather_description.classList.remove('error');
        error_text.textContent='';
        
    }
    else{
      weatherIcon.className = ``;
      temperature.textContent = ``;
      wind_speed.textContent = ``;
      humidity.textContent = ``;
      icon_wind.classList.add(`error`);
      icon_humidity.classList.add('error');
      weather_description.classList.add('error');
      if(nothing){
        error_text.textContent='';
        city.textContent="Введите город...";
      }else{
        error_text.textContent='Извините, не удалось получить сведения о погоде!';
      }
      console.log(nothing);
      
    }
  }

  
  
  
  function setCity(event) {
    city.textContent=city.textContent.trim();
    if(event.type==='click'){
      var city_value = city.textContent;
      localStorage.setItem('city_value', city_value);
      city.textContent = '';
    }
  
    if(event.type==='blur'&& city.textContent == ''){
      city.textContent = localStorage.getItem('city_value');
    }
    if (event.code === 'Enter') {
      getWeather();
      city.blur();
    }
  }
  
  document.addEventListener('DOMContentLoaded', getWeather);
  city.addEventListener('keypress', setCity);
  city.addEventListener('click', setCity);
  city.addEventListener('blur', setCity);





//wцитаты
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btn1 = document.querySelector('.btn1');
let count;

if (localStorage.getItem('count')){
count=parseInt(localStorage.getItem('count'));
}
else{
count=0;
}
async function getQuote(){
const url = `https://type.fit/api/quotes`;
const res = await fetch(url);
const data = await res.json();
blockquote.textContent = data[count].text;
figcaption.textContent = data[count].author;
count++;
localStorage.setItem('count', count);
}
document.addEventListener('DOMContentLoaded', getQuote);
btn1.addEventListener('click', getQuote);

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();
    day = today.getDate();
    month = today.getMonth();
    weekday = today.getDay();

    switch(weekday){
      case 0: weekday="Sunday";break;
      case 1: weekday="Monday";break;
      case 2: weekday="Tuesday";break;
      case 3: weekday="Wednesday";break;
      case 4: weekday="Thursday";break;
      case 5: weekday="Friday";break;
      case 6: weekday="Saturday";break;
    }

    switch(month){
      case 0: month="January";break;
      case 1: month="February";break;
      case 2: month="March";break;
      case 3: month="April";break;
      case 4: month="May";break;
      case 5: month="June";break;
      case 6: month="July";break;
      case 7: month="August";break;
      case 8: month="September";break;
      case 9: month="October";break;
      case 10: month="November";break;
      case 11: month="December";break;
    }

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}<br> `;
  date.innerHTML = `${weekday}<span>, </span>${month} ${day}`;
  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

const base = './imgs/';
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg','21.jpg','22.jpg','23.jpg','24.jpg'];
let today = new Date();
let i = today.getHours();
const body = document.querySelector('body');
const btn = document.querySelector('.btn');

function viewBgImage(src) {
const img = new Image();
img.src = src;
img.onload = () => {
body.style.backgroundImage = `url(${src})`;
};
}

function getImage() {
const index = i % images.length;
const imageSrc = base + images[index];
if (index == 2 || index == 3 || index == 4 || index == 5 || index == 6 || index == 8 || index == 9 || index == 10 || index == 13 || index == 14 || index === 16 || index == 18 || index == 22 || index == 23) {
  document.body.style.color = 'white';
  } else {
  document.body.style.color = 'black';
  };
viewBgImage(imageSrc);
i++;
btn.disabled = true;
setTimeout(function() { btn.disabled = false }, 1000);
}
btn.addEventListener('click', getImage);
 
// Set Background and Greeting
function setBgGreet() {
let today = new Date(), hour = today.getHours();
let body = document.getElementsByTagName("body");
if (hour >= 6 && hour < 12) {
// Morning
greeting.textContent = 'Good Morning, ';
switch(hour){
case 6:
document.body.style.backgroundImage = "url(./imgs/07.jpg)";
body.style.color = "white";
break;
case 7:
document.body.style.backgroundImage = "url(./imgs/08.jpg)";
body.style.color = '#0a0a0a';
break;
case 8:
document.body.style.backgroundImage = "url(./imgs/09.jpg)";
body.style.color = "white";
break;
case 9:
document.body.style.backgroundImage = "url(./imgs/10.jpg)";
body.style.color = "white";
break;
case 10:
document.body.style.backgroundImage = "url(./imgs/11.jpg)";
body.style.color = "white";
break;
case 11:
document.body.style.backgroundImage = "url(./imgs/12.jpg)";
body.style.color = '#0a0a0a';
break;
}

} else if (hour >= 12 && hour < 18) {
// Afternoon
greeting.textContent = 'Good Afternoon, ';
switch(hour){
case 12:
document.body.style.backgroundImage = "url(./imgs/13.jpg)";
document.body.style.color = 'black';
break;
case 13:
document.body.style.backgroundImage = "url(./imgs/14.jpg)";
document.body.style.color = 'white';
break;
case 14:
document.body.style.backgroundImage = "url(./imgs/15.jpg)";
document.body.style.color = 'white';
break;
case 15:
document.body.style.backgroundImage = "url(./imgs/16.jpg)";
document.body.style.color = 'black';
break;
case 16:
document.body.style.backgroundImage = "url(./imgs/17.jpg)";
document.body.style.color = 'white';
break;
case 17:
document.body.style.backgroundImage = "url(./imgs/18.jpg)";
document.body.style.color = 'black';
break;
}
}else if (hour >= 18 && hour < 24) {
// Evening
greeting.textContent = 'Good Evening, ';
switch(hour){
case 18:
document.body.style.backgroundImage = "url(./imgs/19.jpg)";
document.body.style.color = 'white';
break;
case 19:
document.body.style.backgroundImage = "url(./imgs/20.jpg)";
document.body.style.color = "";
document.body.style.color = "black";
break;
case 20:
document.body.style.backgroundImage = "url(./imgs/21.jpg)";
document.body.style.color = "black";
break;
case 21:
document.body.style.backgroundImage = "url(./imgs/22.jpg)";
document.body.style.color = "black";
break;
case 22:
document.body.style.backgroundImage = "url(./imgs/23.jpg)";
document.body.style.color = 'white';
break;
case 23:
document.body.style.backgroundImage = "url(./imgs/24.jpg)";
document.body.style.color = 'white';
break;
}
} else {
// Night
greeting.textContent = 'Good Night, ';
document.body.style.color = 'white';
switch(hour){
case 0:
document.body.style.backgroundImage = "url(./imgs/01.jpg)";
document.body.style.color = "black";
break;
case 1:
document.body.style.backgroundImage = "url(./imgs/02.jpg)";
document.body.style.color = 'black';
break;
case 2:
document.body.style.backgroundImage = "url(./imgs/03.jpg)";
document.body.style.color = 'white';
break;
case 3:
document.body.style.backgroundImage = "url(./imgs/04.jpg)";
document.body.style.color = 'white';
break;
case 4:
document.body.style.backgroundImage = "url(./imgs/05.jpg)";
document.body.style.color = 'white';
break;
case 5:
document.body.style.backgroundImage = "url(./imgs/06.jpg)";
document.body.style.color = 'white';
break;
}
}
}


var name_value;
var focus_value;
// Get Name
function getName() {
  
  if (localStorage.getItem('name') === null || localStorage.getItem('name') == '') {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  name.textContent=name.textContent.trim();
  if(e.type==='click'){
    name_value = name.textContent;
    name.textContent = '';
  }

  if(e.type==='blur'&& name.textContent == ''){
    name.textContent = name_value;
  }

  if(e.type==='blur'&& name.textContent != ''){
    localStorage.setItem('name', e.target.innerText);
    name.textContent= localStorage.getItem('name');
  }
  
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
      localStorage.setItem('name', e.target.innerText);
    }

  }


// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null || localStorage.getItem('focus') == '') {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if(e.type==='click'){
    focus_value = focus.textContent;
    focus.textContent = '';
  }

  if(e.type==='blur'&& focus.textContent == ''){
    focus.textContent = focus_value;
  }

  if(e.type==='blur'&& focus.textContent != ''){
    focus.textContent=focus.textContent.trim();
    localStorage.setItem('focus', e.target.innerText);
    focus.textContent= localStorage.getItem('focus');
  }
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      focus.textContent=focus.textContent.trim();
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

name.addEventListener('click', setName);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);

focus.addEventListener('click', setFocus);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

// Run
showTime();
setBgGreet();
getName();
getFocus();