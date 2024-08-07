const root = document.getElementById("questions");
const popupBody = document.getElementById("popup-body");
const scoreBox = document.getElementById("score");
const percentage = document.getElementById("percentage");
const clockDiv = document.getElementById("clock")

const timerDiv = document.getElementById("time")

const hoursDiv = document.getElementById("hours")
const minutesDiv = document.getElementById("minutes");
const secondsDiv = document.getElementById("seconds");


let hours = 0;
let minutes = 0;
let seconds = 0;

let timer;

let attemepted = 0;
let score = 0;
function generateTemplate(question, options, answer, id) {
  let selectedOption = -1;
  const wholeQuestion  = document.createElement("div");
  const questionDiv = document.createElement("div");
  questionDiv.innerHTML = question;
  const answerDiv = document.createElement("div");
  options?.map((option,i) => {
    const optionsDiv = document.createElement("div");
    optionsDiv.classList.add("flex");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "option"+id;
    input.value = i;
    input.id = i+1;
    input.addEventListener("change", (e)=>{
      selectedOption = e.target.value;
    })
    const optDiv = document.createElement("label");
    optDiv.innerText = option;
    optionsDiv.append(input);
    optionsDiv.append(optDiv);
    answerDiv.append(optionsDiv);
  });
  const saveButton = document.createElement("button");
  saveButton.innerHTML = "Save"

  saveButton.addEventListener("click", save)

  function save(){
    if(selectedOption == -1){
      alert("Select answer to save");
      return;
    }
    attemepted++;
    if(selectedOption == answer){
      score++;
    }
    
    document.getElementsByName("option"+id).forEach((element)=>{
      element.disabled = "true";
    })
    saveButton.disabled = "true";
  }

  wholeQuestion.append(questionDiv);
  wholeQuestion.append(answerDiv)
  wholeQuestion.append(saveButton);
 
  root.append(wholeQuestion);
}
async function initialize(num) {
  const resp = await fetch("data.json");
  const data = await resp.json();
  clearTimer(timer);
  const dataJava = data[num].questions;
  startClock();
  dataJava?.map((d, i) => {
    
    generateTemplate(d.question, d.answers, d.answer, i);
  });
  const submitButton  = document.createElement("button");
  submitButton.innerHTML = "Submit";
  submitButton.id = "submit-btn"
  submitButton.onclick =  showPopup
  root.append(submitButton);
}

function update(ind) {
  root.innerHTML = "";
  initialize(ind);
}
function closePopup(){
  popupBody.classList.add("hidden");
}
function showPopup(){
  if(attemepted != 10){
    alert("Enter all questions before submission")
    return;
  }
  scoreBox.innerText = "Your score : "+score;
  
  timerDiv.innerText = "Time taken : "+Math.floor(hours)+" hrs - "+Math.floor(minutes%60)+" mins - "+seconds%60+" secs"; 
  percentage.innerText = "Accuracy : "+score*10+"%";
  popupBody.classList.remove("hidden")
  clearTimer(timer)
}
function startClock(){
  clockDiv.classList.remove("hidden")
  seconds++;
  seconds = seconds%60;
  minutes += 1/60;
  minutes = minutes%60;
  hours += 1/3600
  if(seconds < 10){
    secondsDiv.innerText = "0"+seconds
  }else {
    secondsDiv.innerText = seconds
  }
  if(minutes < 10){
    minutesDiv.innerText = "0"+Math.floor(minutes);
  }else{
    minutesDiv.innerText = Math.floor(minutes);
  }
  if(hours < 10){
    hoursDiv.innerText = "0"+Math.floor(hours)
  }else {
    hoursDiv.innerText = Math.floor(hours)
  }
  timer = setTimeout(startClock, 1000);
}
function clearTimer(timer){
  clearTimeout(timer);
  seconds = 0;
  minutes = 0;
  hours = 0;
  clockDiv.classList.add("hidden")
}



