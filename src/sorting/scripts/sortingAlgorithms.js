async function bubbleSort(arr) {
    let i, j;
    for (i = 0; i < arr.length - 1; i++) {
        for (j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                await swap(arr, j, j + 1);
            }
        }
        inPlace(j);
    }
    inPlace(0);
}

async function selectionSort(arr) {
    let i, j, min;

    for (i = 0; i < arr.length - 1; i++) {
        min = i;
        for (j = i + 1; j < arr.length; j++) if (arr[j] < arr[min]) min = j;
        await swap(arr, min, i);
        inPlace(i);
    }
    inPlace(arr.length - 1);
}

async function insertionSort(arr) {
    let i, key, j;
    for (i = 1; i < arr.length; i++) {
        key = arr[i];
        j = i - 1;

        while (j >= 0 && arr[j] > key) {
            await swap(arr, j + 1, j);
            j = j - 1;
        }
        arr[j + 1] = key;
        setElementHeight(document.querySelector(`.bar${j + 1}`), key);
    }

    for (i = 0; i < arr.length; i++) {
        await wait(0);
        inPlace(i);
    }
}

async function mergeSort(arr, start) {
    if (arr.length <= 1) {
        return;
    }

    let mid = Math.floor(arr.length / 2);
    let left = arr.slice(0, mid);
    let right = arr.slice(mid, arr.length);

    await mergeSort(left, start);
    await mergeSort(right, start + mid);

    let i = 0;
    let j = 0;
    let k = start;
    let leftLength = left.length;
    let rightLength = right.length;

    while (i < leftLength && j < rightLength) {
        setElementColor(document.querySelector(`.bar${k}`), cinnabar);
        await wait(waitTime);
        if (left[i] < right[j]) {
            setElementHeight(document.querySelector(`.bar${k}`), left[i]);
            arr[i + j] = left[i++];
        } else {
            setElementHeight(document.querySelector(`.bar${k}`), right[j]);
            arr[i + j] = right[j++];
        }
        setElementColor(document.querySelector(`.bar${k++}`), yaleBlue);
    }

    while (i < leftLength) {
        setElementColor(document.querySelector(`.bar${k}`), cinnabar);

        await wait(waitTime);
        setElementHeight(document.querySelector(`.bar${k}`), left[i]);

        arr[i + j] = left[i++];
        setElementColor(document.querySelector(`.bar${k++}`), yaleBlue);
    }

    while (j < rightLength) {
        setElementColor(document.querySelector(`.bar${k}`), cinnabar);
        await wait(waitTime);
        setElementHeight(document.querySelector(`.bar${k}`), right[j]);
        arr[i + j] = right[j++];
        setElementColor(document.querySelector(`.bar${k++}`), yaleBlue);
    }
}

async function quickSort(arr, start, end) {
    if (start >= end) return;
    let pivot = arr[start];
    let right = end;

    for (let i = start + 1; i <= right; i++) {
        while (arr[i] >= pivot && i <= right) {
            await swap(arr, right, i);
            right--;
        }
    }
    await swap(arr, right, start);
    setElementColor(document.querySelector(`.bar${right}`), mainAccent);

    await quickSort(arr, start, right - 1);
    await quickSort(arr, right + 1, end);
}
