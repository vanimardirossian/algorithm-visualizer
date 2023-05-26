function generate() {
    arr = [];
    if (sizeInput.value != "") {
        arraySize = parseInt(sizeInput.value);
        if (arraySize > screenWidth) arraySize = screenWidth;
    } else {
        arraySize = screenWidth;
    }
    for (let i = 0; i < arraySize; i++) {
        arr.push(randomInRange(0, screenHeight - 5));
    }
    renderArray();
}

function renderArray() {
    clearScreen();
    for (let i = 0; i < arr.length; i++) {
        const bar = document.createElement("div");
        bar.classList.add("bars", `bar${i}`);
        bar.style.height = `${arr[i]}px`;
        bar.style.width = `${screenWidth / arraySize}px`;
        barscreen.appendChild(bar);
    }
}

function clearScreen() {
    barscreen.innerHTML = "";
}

function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function waitForSorter(sorter, array, start, end) {
    if (array.length == 0) return;
    setWaitTime();
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }
    await sorter(array, start, end);
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
    }

    if (sorter == mergeSort || sorter == quickSort) {
        for (i = 0; i < array.length; i++) {
            await wait(0);
            inPlace(i);
        }
    }
    arr = [];
}

function setWaitTime() {
    if (delayInput.value != "") {
        waitTime = parseInt(delayInput.value);
    } else {
        waitTime = 0;
    }
}
