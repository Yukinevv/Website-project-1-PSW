let background_color;
let text_color;
let textArea;

function startApp() {

    init();
    clock();
    stickyMenu();
    scrollToBegin();

    //Do zmiany koloru tła
    background_color = document.getElementById('background-color-picker');
    background_color.addEventListener('change', BackgroundColorChange, false);

    //Do zmiany koloru tekstu
    text_color = document.getElementById('text-color-picker');
    text_color.addEventListener('change', TextColorChange, false);
}

window.onload = startApp;

//----------------------------------------------------------------------------------------------
//Obsługa przycisków wideo

const video = document.getElementById('video');
const playPauseButton = document.getElementById('play-pause');
const progressInput = document.getElementById('progress-input');
const videoProgress = document.getElementById('video-progress');
const muteButton = document.getElementById('mute');
const videoControls = document.getElementById('controls');
const videoContainer = document.getElementsByClassName('video-container');
const fullScreenButton = document.getElementById('fullscreen');

function playPauseClicked() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updatePlayPauseIcon() {
    if (video.paused) {
        playPauseButton.innerHTML = '<i class="fa fa-play"></i>';
    } else {
        playPauseButton.innerHTML = '<i class="fa fa-pause"></i>';
    }
}

function muteButtonClicked() {
    video.muted = !video.muted;
    if (video.muted) {
        muteButton.innerHTML = '<i class="fa fa-volume-mute">';
    } else {
        muteButton.innerHTML = '<i class="fa fa-volume-up">';
    }
}

function updateVideoProgress() {
    progressInput.value = (video.currentTime / video.duration) * 100;
    let minutes = Math.floor(video.currentTime / 60);
    if (minutes < 10) minutes = "0" + minutes;
    let seconds = Math.floor(video.currentTime % 60);
    if (seconds < 10) seconds = "0" + seconds;
    videoProgress.innerHTML = `${minutes}:${seconds}`;
}

function seekVideo() {
    let seekToTime = (progressInput.value * video.duration) / 100;
    if (seekToTime < 0 || seekToTime > video.duration) return;

    video.pause();
    video.currentTime = seekToTime;

    var timer = setInterval(function () {
        if (video.paused && video.readyState == 4) {
            video.play();
            clearInterval(timer);
        }
    }, 100)
}

function handleFullscreen() {
    if (!fullscreenSupported) return;

    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        fullScreenButton.innerHTML = '<i class="fa fa-compress"></i>';
    } else {
        document.exitFullscreen();
        fullScreenButton.innerHTML = '<i class="fa fa-expand"></i>';
    }
}

function init() {
    video.controls = false;
    playPauseButton.addEventListener("click", playPauseClicked);
    video.addEventListener("play", updatePlayPauseIcon);
    video.addEventListener("pause", updatePlayPauseIcon);
    muteButton.addEventListener("click", muteButtonClicked);
    video.addEventListener("timeupdate", updateVideoProgress);
    progressInput.addEventListener("change", seekVideo);
}

//---------------------------------------------------------------------------------------
//Zegarek
function clock() {

    var today = new Date();

    var hour = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();

    if (hour < 10) hour = "0" + hour;
    if (min < 10) min = "0" + min;
    if (sec < 10) sec = "0" + sec;

    document.getElementById('clock').innerHTML = hour + ":" + min + ":" + sec;

    setTimeout("clock()", 1000);
}

//Zmiana koloru tekstu
function TextColorChange() {

    var color = text_color.value;

    var elements = document.getElementsByClassName('cameleon-txt');

    for (var i = 0; i < elements.length; i++) {
        elements[i].style.color = color;
    }
}

//Zmiana koloru tła
function BackgroundColorChange() {

    var color = background_color.value;

    var elements = document.getElementsByClassName('cameleon-bg');

    for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = color;
    }
}

//Przyklejone menu
function stickyMenu() {

    $(document).ready(function () {
        var NavY = $('#menu').offset().top;

        var stickyNav = function () {
            var ScrollY = $(window).scrollTop();

            if (ScrollY > NavY) {
                $('#menu').addClass('sticky');
            } else {
                $('#menu').removeClass('sticky');
            }
        };

        stickyNav();

        $(window).scroll(function () {
            stickyNav();
        });
    });
}

//Powrót na górę strony
function scrollToBegin() {

    jQuery(function ($) {
        $.scrollTo(0);

        $('.scrollup').click(function () {
            $.scrollTo($('body'), 1000);
        });
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) $('.scrollup').fadeIn();
        else $('.scrollup').fadeOut();
    });
}