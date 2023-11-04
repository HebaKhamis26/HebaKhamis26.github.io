const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === ''){
        alert("You must write somthing!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"
        li.appendChild(span);
    }
    inputBox.value = '';
    saveData();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle ("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function displayData(){
    listContainer.innerHTML = localStorage.getItem("data");
}

displayData();

let buttons = document.querySelectorAll(".btn");
let focus = document.getElementById("focus");
let shortBreak = document.getElementById("short-break");
let longBreak = document.getElementById("long-break");
let start = document.getElementById("btn-start");
let pause = document.getElementById("btn-pause");
let reset = document.getElementById("btn-reset");
 
let time = document.getElementById("time");
let set;
let count = 59;
let paused = true;
let minCount = 24;
time.textContent = `${minCount + 1}:00` ;
const appendZero = (value) => {
    value = value < 10 ? `0${value}` : value;
    return value;
  };
  reset.addEventListener(
    "click",
    (resetTime = () => {
      pauseTimer();
      switch (active) {
        case "long":
          minCount = 14;
          break;
        case "short":
          minCount = 4;
          break;
        default:
          minCount = 24;
          break;
      }
      count = 59;
      time.textContent = `${minCount + 1}:00`;
    })
  );
  const removeFocus = () => {
    buttons.forEach((btn) => {
      btn.classList.remove("btn-focus");
    });
  };
  focus.addEventListener("click", () => {
    removeFocus();
    focus.classList.add("btn-focus");
    pauseTimer();
    minCount = 24;
    count = 59;
    time.textContent = `${minCount + 1}:00`;
  });
  shortBreak.addEventListener("click", () => {
    active = "short";
    removeFocus();
    shortBreak.classList.add("btn-focus");
    pauseTimer();
    minCount = 4;
    count = 59;
    time.textContent = `${appendZero(minCount + 1)}:00`;
  });
  longBreak.addEventListener("click", () => {
    active = "long";
    removeFocus();
    longBreak.classList.add("btn-focus");
    pauseTimer();
    minCount = 14;
    count = 59;
    time.textContent = `${minCount + 1}:00`;
  });
  pause.addEventListener(
    "click",
    (pauseTimer = () => {
      paused = true;
      clearInterval(set);
      start.classList.remove("hide");
      pause.classList.remove("show");
      reset.classList.remove("show");
    })
  );
  start.addEventListener("click", () => {
    reset.classList.add("show");
    pause.classList.add("show");
    start.classList.add("hide");
    start.classList.remove("show");
    if (paused) {
      paused = false;
      time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
      set = setInterval(() => {
        count--;
        time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
        if (count == 0) {
          if (minCount != 0) {
            minCount--;
            count = 60;
          } else {
            clearInterval(set);
          }
        }
      }, 1000);
    }
  });