// Load application styles
import "styles/index.less";
import {
    SSL_OP_SSLEAY_080_CLIENT_DH_BUG,
    DH_NOT_SUITABLE_GENERATOR
} from "constants";

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
var sortInterval = null;
var insertInterval = null;
let values = [];
var i = 0;
var j = 0;
let states = [];

selSubmit.addEventListener("click", function() {
    const dis = document.querySelectorAll(".disappear");
    dis[0].classList.remove("disappear");
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

submit.addEventListener("click", makeBlock);

function makeBlock() {
    const maneyBox = document.querySelectorAll(".text");
    for (let i = 0; i < maneyBox.length; i++) {
        if (maneyBox[i].value === "") {
            alert("1부터 9 사이의 숫자를 입력하세요");
            return;
        }
    }

    const dis = document.querySelectorAll(".disappear");
    dis[1].classList.remove("disappear");
    stageTwo.classList.add("disappear");

    for (let i = 0; i < maneyBox.length; i++) {
        values.push(Number(maneyBox[i].value));
        var building = document.createElement("div");
        building.classList.add("building-style");
        building.textContent = Number(maneyBox[i].value);
        building.style.height = `${Number(maneyBox[i].value) * 70}px`;
        building.id = Number(maneyBox[i].value);
        main.appendChild(building);
    }

    if (selSort.value === "Bubble") {
        stageTitle.innerHTML = `${selSort.value} sort`;
        sortInterval = setInterval(function() {
            bubbleSort();
        }, 1000);
    } else if (selSort.value === "Insertion") {
        stageTitle.innerHTML = `${selSort.value} sort`;
        i = 1;
        insertInterval = setInterval(function() {
            insertionSort();
        }, 1000);
    } else {
        stageTitle.innerHTML = `${selSort.value} sort`;
        quickSort();
    }
}

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

//each time draw

function bubbleSort() {
    var bubbleSortIndex = null;
    if (i < values.length) {
        j = 0;
        function bubble() {
            if (j < values.length - i) {
                if (values[j] > values[j + 1]) {
                    bubbleswap(values, j, j + 1);
                }
                j++;
            } else {
                clearInterval(bubbleSortIndex);
            }
        }
        bubbleSortIndex = setInterval(function() {
            bubble();
        }, 100);
        i++;
    } else {
        clearInterval(sortInterval);
    }
}

function insertionSort() {
    if (i < values.length) {
        let temp = values[i];
        j = i - 1;
        while (j >= 0 && values[j] > temp) {
            values[j + 1] = values[j];
            j = j - 1;
        }
        values[j + 1] = temp;
        for (let k = 0; k < values.length; k++) {
            const buildingStyle = document.querySelectorAll(".building-style");
            buildingStyle[k].style.height = `${values[k] * 70}px`;
            buildingStyle[k].textContent = values[k];
        }
        i++;
    } else {
        clearInterval(insertInterval);
    }
}

async function quickSort(left, right) {
    //console.log(values);
    if (!left) left = 0;
    if (!right) right = values.length - 1;
    var pivotIndex = right;
    pivotIndex = await partition(left, right - 1, pivotIndex);
    if (left < pivotIndex - 1) {
        await quickSort(left, pivotIndex - 1);
        console.log("1");
    }
    if (pivotIndex + 1 < right) {
        await quickSort(pivotIndex + 1, right);
        console.log("2");
    }
    console.log(values);
    return values;
}

async function partition(left, right, pivotIndex) {
    var pivot = values[pivotIndex];
    while (left <= right) {
        while (values[left] < pivot) {
            left++;
            console.log("3");
        }
        while (values[right] > pivot) {
            right--;
            console.log("4");
        }
        if (left <= right) {
            console.log("5");
            await swap(values, left, right);
            left++;
            right--;
        }
    }
    await swap(values, left, pivotIndex);
    console.log("6");
    return left;
}

function bubbleswap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    for (let k = 0; k < values.length; k++) {
        const buildingStyle = document.querySelectorAll(".building-style");
        buildingStyle[k].style.height = `${values[k] * 70}px`;
        buildingStyle[k].textContent = values[k];
    }
}

async function swap(arr, i, j) {
    await aniTime(500);
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    for (let k = 0; k < values.length; k++) {
        const buildingStyle = document.querySelectorAll(".building-style");
        buildingStyle[k].style.height = `${values[k] * 70}px`;
        buildingStyle[k].textContent = values[k];
    }
}

function aniTime(ms) {
    return new Promise(function(resolve) {
        setTimeout(resolve, ms);
    });
}
