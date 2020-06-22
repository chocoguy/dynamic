//get the DOM elements
let time = document.querySelector('#time');
greeting = document.querySelector('#greeting');
let tabItems = document.querySelectorAll('.tab-item');
let tabContentItems = document.querySelectorAll('.tab-content-item');
let Quote = document.querySelector('#Quote');
let Weather = document.querySelector('#Weather');

//show the actual time
function showTime(){
    let today = new Date()
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

    //Am or Pm?
    const amPm = hour >= 12 ? 'PM' : 'AM';
    //sets to 12 hours
    hour = hour % 12 || 12;
    //print time
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
    //Refresh every second
    setTimeout(showTime, 1000)
}

//add zero to the time using terenary
function addZero(n){
    return (parseInt(n, 10) < 10 ? '0' : '') + n
}

//setting background image according to time
function setBackground() {
    let today = new Date(),
    hour = today.getHours();
        if(hour < 12){
            document.body.style.backgroundImage = "url('./morning.jpg')";
            greeting.textContent = "Guten Morgen!"
        } else if(hour < 18){
            document.body.style.backgroundImage = "url('./afterrnoon.jpg')";
            greeting.textContent = "Guten Tag!"
        } else{
            document.body.style.backgroundImage = "url('./night.jpg')";
            greeting.textContent = "Guten Abend!"
            document.body.style.color = '#FFFFFF'
        }
}

//Toggles between meme generator and main page
function selectItem(e){
    removeColor()
    removeShow()
    this.classList.add('color')
    console.log(this.item)
    let tabContentItem = document.querySelector(`#${this.id}-content`)
    tabContentItem.classList.add('show');
}




function removeShow() {
    tabContentItems.forEach(item => item.classList.remove('show'));
}

function removeColor() {
    tabItems.forEach(item => item.classList.remove('color'));
}

tabItems.forEach(item => item.addEventListener('click', selectItem));



//fetching data

const fetchQuote = async () => {
    try{
        const res = await fetch('https://150000-quotes.p.rapidapi.com/random', {

        headers: {
            "x-rapidapi-host" : "150000-quotes.p.rapidapi.com",
            "x-rapidapi-key" : "7da1759178msh229dd905e210446p1bb084jsn5dd0818fa88c"
        }
    });
        const data = await res.json();
        const {message} = data
        Quote.textContent = `"${message}"`
    } catch (err){
        console.log(err);
        Quote.textContent = "Server Error"
    }
}


//fetching data for weather
const fetchWeather = async () => {
    try{
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const res2 = await fetch(`${proxy}https://api.darksky.net/forecast/e5649364891e4dc55f7f7ba89570c8cd/42.336273, -89.013037`)
        const data2 = await res2.json();
        const {apparentTemperature, summary} = data2.currently;
        Weather.textContent = `Current weather: ${apparentTemperature} Degrees F    ${summary}`
    } catch(err){
        console.log(err)
        Weather.textContent = "Server error"
    }
}


//fetching meme api
//const fetchMeme = async () => {
 //   try{
  //      const res3 = await fetch('https://ronreiter-meme-generator.p.rapidapi.com/meme?font=Impact&font_size=50&meme=Condescending-Wonka&top=Top%20text&bottom=Bottom%20text', {
   //         headers: {
    //            "method" : "GET",
     //           "x-rapidapi-host": "ronreiter-meme-generator.p.rapidapi.com",
	//	        "x-rapidapi-key": "7da1759178msh229dd905e210446p1bb084jsn5dd0818fa88c"
     //       }
      //  });
       // data = res3.json()
        //console.log(data)
        //document.getElementById("testt").src = 
    //} catch(err){
     //   console.log(err)
    //}
//}


//fetchMeme()
fetchWeather()
fetchQuote()
showTime()
setBackground()