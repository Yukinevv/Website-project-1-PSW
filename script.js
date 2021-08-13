let background_color;
let text_color;
let textArea;

function startApp() {

    clock();
    stickyMenu();
    scrollToBegin();

    //Do zmiany koloru tła
    background_color = document.getElementById('background-color-picker');
    background_color.addEventListener('change', BackgroundColorChange, false);

    //Do zmiany koloru tekstu
    text_color = document.getElementById('text-color-picker');
    text_color.addEventListener('change', TextColorChange, false);

    //Do AJAX - wczytywanie tekstu
    document.getElementById('load-text').addEventListener('click', loadText);

    //Do statystyk tekstu
    textArea = document.getElementById("text");
    textArea.addEventListener("input", onChange);

    document.getElementById('show-stats').addEventListener('click', onChange);
}

window.onload = startApp;

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

//AJAX - wczytywanie tekstu
function loadText() {

    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'text.json', true);

    xhr.send();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 304) {
                let data = JSON.parse(xhr.response);
                console.log(data);
                renderHTML(data);
            } else if (xhr.status === 404) {
                document.getElementById('text').innerHTML = "404 nie znaleziono strony";
            } else if (xhr.status === 403) {
                document.getElementById('text').innerHTML = "Brak dostępu";
            } else {
                document.getElementById('text').innerHTML = "Aby funkcja działała poprawnie strona musi zostać uruchomiona na lokalnym serwerze";
            }
        }
    }
}

function renderHTML(data) {

    console.log("render");
    let htmlString = "";

    for (i = 0; i < data.length; i++) {
        htmlString += data[i].title + "\n\n" + data[i].text + "\n\n";
    }

    document.getElementById('text').innerHTML = htmlString;
}

//Statystyki tekstu
function onChange(e) {

    const data = textArea.value;
    const numCharacters = data.length;
    const numWords = data.replace(/[\r\n]/g, " ").split(" ").length;
    const numSentences = data.split(".").length;

    document.getElementById('num-characters').innerHTML = numCharacters;
    document.getElementById('num-words').innerHTML = numWords;
    document.getElementById('num-sentences').innerHTML = numSentences;
}

function showMsg1() {
    document.getElementById('login-info').innerHTML = '<span style="color: red">Logowanie nie zostało jeszcze okodowane</span>';
}

function showMsg2() {
    document.getElementById('registration-info').innerHTML = '<span style="color: #7FFF00">Dziękuje za założenie konta na moim serwisie</span>';
}