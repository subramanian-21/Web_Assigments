const secondsDiv = document.getElementById("seconds");
const minutesDiv = document.getElementById("minutes");
const hoursDiv = document.getElementById("hours");
let timer;
let seconds = 0;
let minutes = 0;
let hours = 0;
document.getElementById("start").addEventListener('click',start);
document.getElementById("stop").addEventListener('click',stop);

function start() {
    seconds++;
    seconds%=60;
    minutes+=1/60;
    minutes%=60;
    hours+=1/3600;
    if(seconds <= 9){
        secondsDiv.innerText = "0"+seconds;
    }else{
        secondsDiv.innerText = seconds;
    }
    if(minutes <= 9){
        minutesDiv.innerText = "0"+Math.floor(minutes);

    }else {
        minutesDiv.innerText = Math.floor(minutes);

    }
    if(hours <= 9){
        hoursDiv.innerText ="0"+Math.floor(hours);

    }else {
        hoursDiv.innerText = Math.floor(hours);

    }
    timer = setTimeout(start,1000);
}

function stop() {
    clearTimeout(timer);
}