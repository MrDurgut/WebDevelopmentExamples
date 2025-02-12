let timeTxtObj = document.getElementById("timeTxt");

function showTime() {
    let clock = new Date();
    let h;
    let m;
    let s;

    if (clock.getHours() < 10) {
        h = "0" + clock.getHours();
    } else { h = clock.getHours(); }

    if (clock.getMinutes() < 10) {
        m = "0" + clock.getMinutes();
    } else { m = clock.getMinutes(); }

    if (clock.getSeconds() < 10) {
        s = "0" + clock.getSeconds();
    } else { s = clock.getSeconds(); }

    timeTxtObj.innerHTML = `${h}:${m}:${s}`;

    setTimeout(showTime, 1000);
}

showTime();