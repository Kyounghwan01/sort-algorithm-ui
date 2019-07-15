// Load application styles
import "styles/index.less";

// ================================
// START YOUR APP HERE
// ================================

const stageOne = document.querySelector(".stage-one");
const stageTwo = document.querySelector(".stage-two");
const selSubmit = document.querySelector("#sel-submit");
const submit = document.querySelector("#submit");
const selNum = document.querySelector("#sel-num");
const selSort = document.querySelector("#sel-sort");
const boxes = document.querySelector(".boxes");
const stageTitle = document.querySelector(".stage-title");
const main = document.querySelector(".main");
let data = [];

selSubmit.addEventListener("click", function() {
    stageOne.classList.add("disappear");
    for (let i = 0; i < selNum.value; i++) {
        let box = document.createElement("input");
        box.setAttribute("type", "text");
        box.setAttribute("maxlength", "1");
        box.classList.add("text");
        box.addEventListener("keydown", keyPrevent);
        box.dataset.id = i + 1;
        boxes.appendChild(box);
    }
});

submit.addEventListener("click", function() {
    const maneyBox = document.querySelectorAll(".text");
    for (let i = 0; i < maneyBox.length; i++) {
        if (maneyBox[i].value === "") {
            alert("1부터 9 사이의 숫자를 입력하세요");
            return;
        }
    }
    if (selSort.value === "Bubble") {
        console.log(selSort);
        bubbleSort();
        stageTwo.classList.add("disappear");
        stageTitle.innerHTML = `${selSort.value} sort`;
    } else {
        //mergeSort();
        stageTitle.innerHTML = `${selSort.value} sort`;
    }
});

function keyPrevent(e) {
    var keyID = e.keyCode;
    if (
        !(
            (keyID >= 49 && keyID <= 57) ||
            //(keyID >= 96 && keyID <= 105) ||
            (keyID >= 8 && keyID <= 9)
        )
    ) {
        alert("1부터 9 사이의 숫자를 입력하세요");
        e.returnValue = false;
    }
}

function bubbleSort() {
    const maneyBox = document.querySelectorAll(".text");
    for (var i = 0; i < maneyBox.length; i++) {
        data.push(Number(maneyBox[i].value));
        var building = document.createElement("div");
        building.classList.add("building-style");
        building.textContent = Number(maneyBox[i].value);
        building.style.height = `${Number(maneyBox[i].value) * 70}px`;
        building.dataset.id = Number(maneyBox[i].value);
        main.appendChild(building);
    }
    console.log(data);
}

function mergeSort() {
    //머지 정렬
}
