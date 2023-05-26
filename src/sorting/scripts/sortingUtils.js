async function swap(arr, i, j) {
    iBar = document.querySelector(`.bar${i}`);
    jBar = document.querySelector(`.bar${j}`);
    setElementColor(iBar, cinnabar);
    setElementColor(jBar, cinnabar);

    await wait(waitTime);

    let temp = arr[i];

    arr[i] = arr[j];
    setElementHeight(iBar, arr[j])

    arr[j] = temp;
    setElementHeight(jBar, temp)

    setElementColor(iBar, yaleBlue);
    setElementColor(jBar, yaleBlue);
}

function wait(mil) {
    return new Promise((resolve) => {
        setTimeout(resolve, mil);
    });
}

function inPlace(i) {
    setElementColor(document.querySelector(`.bar${i}`), mainAccent);
}

function setElementColor(element, color) {
    element.style.backgroundColor = color;
}

function setElementHeight(element, height) {
    element.style.height = `${height}px`;
}