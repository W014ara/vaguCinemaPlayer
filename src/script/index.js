const app = document.querySelector(".vagu__player");
const videoWrapper = document.querySelector(".playerWrapper");
const video = document.querySelector("#originalVideo");
const rangeInp = document.querySelector("#volumeTargetSettings");

//Play/Pause
const mainToggle = document.querySelector("#mainToggle");
const controlTogglePlay = document.querySelector("#playVideo");
let playToggle = false;

function playVideo(){
    if(!playToggle){
        video.play();
        mainToggle.classList.remove("playMainToggle");
        mainToggle.classList.add("pauseMainToggle")
        controlTogglePlay.classList.add("pauseVideo");
        playToggle = true;
    }else{
        video.pause();
        mainToggle.classList.remove("pauseMainToggle");
        mainToggle.classList.add("playMainToggle")
        controlTogglePlay.classList.remove("pauseVideo");
        playToggle = false;
    }
}

document.addEventListener("keydown", (e)=>{
    if(e.keyCode === 32){
        playVideo();
    }
})

mainToggle.addEventListener("click", ()=>{
    playVideo();
})

controlTogglePlay.addEventListener("click", ()=>{
    playVideo();
})


//Change videoTime count
const controlTimeLimit = document.querySelector("#timeLimit");

video.addEventListener('loadedmetadata', function() {
    controlTimeLimit.innerHTML = `00:00:00/${secondsToHms(video.duration).hours}:${secondsToHms(video.duration).minutes}:${secondsToHms(video.duration).seconds}`
});

function secondsToHms(d) {
    d = Number(d);
    let h = Math.floor(d / 3600);
    let m = Math.floor(d % 3600 / 60);
    let s = Math.floor(d % 3600 % 60);

    let hDisplay = h > 0 ? h : 0;
    let mDisplay = m > 0 ? m : 0;
    let sDisplay = s > 0 ? s : 0;

    return {
        hours: checkDigitZeros(parseInt(hDisplay)),
        minutes: checkDigitZeros(parseInt(mDisplay)),
        seconds: checkDigitZeros(parseInt(sDisplay))
    }
}

function checkDigitZeros(digit){
    return ((digit / 10) >= 1) ? digit : `0${digit}`;
}

setInterval(() => {
    let curTime = video.currentTime;
    controlTimeLimit.innerHTML = `${secondsToHms(curTime).hours}:${secondsToHms(curTime).minutes}:${secondsToHms(curTime).seconds}/${secondsToHms(video.duration).hours}:${secondsToHms(video.duration).minutes}:${secondsToHms(video.duration).seconds}`;
    ``
}, 500);


//TimeLine progressFill
const timeLineProgress = document.querySelector('.timeLine__fill');
const timeLine = document.querySelector('.timeLine');
const timeHover = document.querySelector('#targetTime');
setInterval(() => {
    if(!video.paused){
        let fullProgressCount = video.duration;
        let currentProgressCount = video.currentTime;
        let result = currentProgressCount * 100 / fullProgressCount;
        timeLineProgress.style.width = `${result}%`;
    }
}, 1000);

timeLine.addEventListener("mouseover", (e)=>{
    let clikedVideoProgress = e.clientX / timeLine.clientWidth * 100;
    let fullVideoTime = video.duration;
    let targetTime = clikedVideoProgress * fullVideoTime / 100;
    timeHover.innerHTML = `${secondsToHms(targetTime).hours}:${secondsToHms(targetTime).minutes}:${secondsToHms(targetTime).seconds}`;
    timeHover.style.display = "block";
    timeHover.style.left = `${clikedVideoProgress}%`;
})

timeLine.addEventListener("mouseout", (e)=>{
    timeHover.style.display = "none";
})

timeLine.addEventListener("click", (e)=>{
    let clikedVideoProgress = e.clientX / timeLine.clientWidth * 100;
    let fullVideoTime = video.duration;
    let targetTime = clikedVideoProgress * fullVideoTime / 100;
    timeLineProgress.style.width = `${clikedVideoProgress}%`;
    video.currentTime = targetTime;
})

//Video change Quality
const qualityGear = document.querySelector("#settingsVideo");
const settingBlock = document.querySelector(".settings");
const qualityChange = document.querySelector("#quality-change");
let settingsToggle = false;

qualityGear.addEventListener("click", (e)=>{
    openCloseSettings();
});

function openCloseSettings(){
    if(!settingsToggle){
        settingBlock.style.display = "block";
        settingsToggle = true;
    }else{
        settingBlock.style.display = "none";
        settingsToggle = false;
    }
}

document.addEventListener("click", (e)=>{
    const quality = document.querySelector(".quality");
    for(let index = 0; index < quality.childNodes.length; ++index){
        if(quality.childNodes[index].className !== undefined){
            if(e.target.className === quality.childNodes[index].className || e.target === qualityGear){
                continue;
            }else{
                settingBlock.style.display = "none";
                settingsToggle = false;
                break;
            }
        }
    }
})


//
window.addEventListener('resize', function(event) {
    videoWrapper.style.width = `${video.clientWidth}px`;
    videoWrapper.style.height = `${video.clientHeight}px`;
}, true);


//Volume Change
let volumeVideoToggle = true;
const volumeVideoToggleBtn = document.querySelector("#volumeVideo");
volumeVideoToggleBtn.addEventListener("click", (e)=>{
    if(!volumeVideoToggle){
        video.volume = 1;
        rangeInp.style.background = `conic-gradient(from 90deg at ${100}% 80%, rgba(255, 255, 255, 0) 0deg, #E4BF01 210.21deg, rgba(255, 255, 255, 0) 360deg), #545454`;
        rangeInp.value = 100;
        volumeVideoToggle = true;
    }else{
        video.volume = 0;
        rangeInp.style.background = `conic-gradient(from 90deg at ${0}% 80%, rgba(255, 255, 255, 0) 0deg, #E4BF01 210.21deg, rgba(255, 255, 255, 0) 360deg), #545454`;
        rangeInp.value = 0;
        volumeVideoToggle = false;
    }
})

rangeInp.addEventListener("input", (e)=>{
    let targetWidth = rangeInp.clientWidth;
    let targetValue = rangeInp.value;
    let newWidth = targetWidth * targetValue / 100;
    rangeInp.style.background = `conic-gradient(from 90deg at ${newWidth + 10}% 80%, rgba(255, 255, 255, 0) 0deg, #E4BF01 210.21deg, rgba(255, 255, 255, 0) 360deg), #545454`;
    video.volume = targetValue / 100;
})

//FullScreen functions
const fullscreenVideo = document.querySelector("#fullscreenVideo");
fullscreenVideo.addEventListener("click", (e)=>{
    toggleFullScreen();
})
function toggleFullScreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (document.webkitFullscreenElement) {
      // Need this to support Safari
      document.webkitExitFullscreen();
    } else if (app.webkitRequestFullscreen) {
      // Need this to support Safari
      app.webkitRequestFullscreen();
    } else {
        app.requestFullscreen();
    }
}

