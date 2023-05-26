// Global Variables

let barscreen = document.querySelector(".barscreen");
let iBar;
let jBar;
let arr = [];
let waitTime = 0;
let barScreenPadding = 10;

// Array Dimensions

let screenWidth = barscreen.clientWidth - (2 * barScreenPadding);
let screenHeight = barscreen.clientHeight;
let arraySize = screenWidth;
console.log(screenWidth)


// Input Event Listeners
let sizeInput = document.querySelector(".array_size");
let delayInput = document.querySelector(".sorting_delay");

sizeInput.addEventListener("keypress", (e) => {
    if (e.key == "Enter") generate();
});

// Sorting Event Listeners

let buttons = document.querySelectorAll(".button");
let newArray = document.querySelector(".new_array");
let bubble = document.querySelector(".bubble");
let selection = document.querySelector(".selection");
let insertion = document.querySelector(".insertion");
let merged = document.querySelector(".merge");
let quick = document.querySelector(".quick");

newArray.addEventListener("click", generate);
bubble.addEventListener("click", () => {
    waitForSorter(bubbleSort, arr)
});
selection.addEventListener("click", () => {
    waitForSorter(selectionSort, arr)
});
insertion.addEventListener("click", () => {
    waitForSorter(insertionSort, arr)
});
merged.addEventListener("click", () => {
    waitForSorter(mergeSort, arr, 0)
});

quick.addEventListener("click", () => {
    waitForSorter(quickSort, arr, 0, arr.length - 1)
});