import Vue from "./Vue.js";

let audio = document.getElementsByTagName("audio")[0];
let playbtn = document.getElementsByClassName("play-btn")[0];
let playimg = document.getElementById("play-img");


playbtn.addEventListener('click', function () {
    console.log(audio)
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }

}, false);



audio.addEventListener('timeupdate', function () {
    updateProgress(audio);
}, false);


function updateProgress(audio) {
    var value = audio.currentTime / audio.duration;
    document.getElementById('progressbar').style.width = value * 100 + '%';
    document.getElementById('progressdot').style.left = value * 100 + '%';

}

function realtime(value) {
    let time = "";
    let h = parseInt(value / 3600);
    value %= 3600;
    let m = parseInt(value / 60);
    let s = parseInt(value % 60);
    if (h > 0) {
        time = formatTime(h + ":" + m + ":" + s);
    } else {
        time = formatTime(m + ":" + s);
    }
    return time;
}

audio.addEventListener('ended', function () {
    audioEnded();
}, false)

function audioEnded() {
    document.getElementById('progressbar').style.width = 0;
    document.getElementById('progressdot').style.left = 0;
}


let progressBarbg = document.getElementsByClassName('progressbar-bg')[0];
progressBarbg.addEventListener('mousedown', function (event) {
    if (!audio.paused || audio.currentTime != 0) {
        let pgsWidth = parseFloat(window.getComputedStyle(progressBarbg, null).width.replace('px', ''));
        let rate = event.offsetX / pgsWidth;
        audio.currentTime = audio.duration * rate;
        updateProgress(audio);
    }
})

function dargProgressdot(audio) {
    let dot = document.getElementById('progressdot');

    let position = {
        originOffsetLeft: 0,
        originX: 0,
        maxLeft: 0,
        maxRight: 0
    };
    let flag = false;

    dot.addEventListener('mousedown', down);
    dot.addEventListener('touchstart', down);

    document.addEventListener('mousemove', move);
    document.addEventListener('touchmove', move);

    document.addEventListener('mouseup', end);
    document.addEventListener('touchend', end);

    function down(event) {
        if (!audio.paused || audio.currentTime != 0) { // ????????????????????????????????????????????????????????????????????????????????????
            flag = true;

            position.originOffsetLeft = dot.offsetLeft;
            position.originX = event.touches ? event.touches[0].clientX : event.clientX; // ???????????????mousedown???touchstart??????
            position.maxLeft = position.originOffsetLeft; // ???????????????????????????
            position.maxRight = document.getElementsByClassName('progressbar-bg')[0].offsetWidth - position.originOffsetLeft; // ???????????????????????????

            // ????????????????????????????????????????????????????????????????????????
            if (event && event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }

            // ??????????????????
            if (event && event.stopPropagation) {
                event.stopPropagation();
            } else {
                window.event.cancelBubble = true;
            }
        }
    }

    function move(event) {
        if (flag) {
            var clientX = event.touches ? event.touches[0].clientX : event.clientX; // ???????????????mousemove???touchmove??????
            var length = clientX - position.oriX;
            if (length > position.maxRight) {
                length = position.maxRight;
            } else if (length < -position.maxLeft) {
                length = -position.maxLeft;
            }
            var progressBarBg = document.getElementById('progressbar-bg');
            var pgsWidth = parseFloat(window.getComputedStyle(progressBarBg, null).width.replace('px', ''));
            var rate = (position.originOffsetLeft + length) / pgsWidth;
            audio.currentTime = audio.duration * rate;
            updateProgress(audio);
        }
    }

    function end() {
        flag = false;
    }
}
// let commitDiv = document.getElementById('commitdiv');
// let commitbtn = document.getElementById('commit');
// commitbtn.addEventListener('click', function () {
//     if (commitbtn.value == "??????") {

//         commitbtn.style.backgroundImage = "url('img/??????.png')";
//         commitDiv.style.display = "none";

//         commitbtn.value = "??????"
//     } else {
//         commitbtn.style.backgroundImage = "url('img/?????? (1).png')";
//         commitbtn.value = "??????"
//         commitDiv.style.display = "flex";

//     }
// })