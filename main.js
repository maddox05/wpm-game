var char_w_array100 = [];
var words_typed = "";
var searchbar = document.getElementById("query");
var time =15;
var rank = 0;
var raw_wpm =0
var accuracy =0

function get_1kwords(){
    scoreSetter();
    words_I_typed = "";
    char_w_array100 = [];
    words_typed = "";
    errors = 0;
    raw_wpm = 0;
    accuracy = 0;
    rank = 0;
    restarted = false;
    fetch("https://gist.githubusercontent.com/deekayen/4148741/raw/98d35708fa344717d8eee15d11987de6c8e26d7d/1-1000.txt")
        .then(response => response.text())
        .then(textData => { // chain of promises
            console.log("Data fetched");
            let array_of_1kwords = textData.split("\n");
            let array_of_100words = [];

            for(i = 0; i < 100; i++){
                array_of_100words.push(array_of_1kwords[Math.floor(Math.random() * 100)]);
            }
            char_w_array100 = array_to_char(array_of_100words);
            add_chars_to_div(char_w_array100);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

function array_to_char(array) {
    let char_array = [];
        for (i = 0; i < array.length; i++) {
            for (j = 0; j < array[i].length; j++) {
                char_array.push(array[i][j]);
            }
            char_array.push(" ");
        }
    return char_array;
}

function add_chars_to_div(char_array) {
    let div = document.getElementById("words");
    for (i = 0; i < char_array.length; i++) {
        let char = document.createElement("span");
        char.innerHTML = char_array[i];
        char.classList.add("white");
        div.appendChild(char);
    }
}

function searchbar_focus_loop() {
    searchbar.focus();
    setTimeout(searchbar_focus_loop, 500);
}

function deleted(event) {
    if(words_typed.length > 0) {
        if (event.keyCode === 8) {
            let cursorSpan = document.querySelector(".cursor");
        if (cursorSpan) {
            cursorSpan.classList.remove("cursor");
        }
        }
    }
}

function cursor() {
    if(words_typed.length > 0) {
        for (let j = 0; j < words_typed.length; j++) {
            if (j === words_typed.length-1) {
                index_span = document.getElementById("words").children[words_typed.length];
                index_span.className = "cursor";

            } else {
                index_span = document.getElementById("words").children[j+1];
                index_span.classList.remove("cursor");
            }
        }
    }
    else {
        index_span = document.getElementById("words").children[0];
        index_span.className = "cursor";
    }
}

function update_game() {
    words_typed = searchbar.value;
    cursor();
    index_span = document.getElementById("words").children[0];
    index_span.className = "NONE";
    // CHECK IF WORDS ARE CORRECT
    if(words_typed.length > 0){
        correct = true;
        for(let i = 0; i < words_typed.length; i++){
            if(words_typed[i] !== char_w_array100[i]) {
                span = document.getElementById("words").children[i];
                span.classList.add("red");
                correct = false;
            }
            else{
                span = document.getElementById("words").children[i];
                span.classList.add("green");
            }
        }
        score();
    }
}
restarted = false;
async function timer(time) {
    duration = document.getElementById("timer");
    duration.innerHTML =  + time;
// counts down from certain time
    if (time > 0 && restarted === false) {
        time--;
        setTimeout(timer, 1000, time);
    } else {
        restarted = true;
        console.log("game over");
        end_game();
        word_div = document.getElementById("words");
        word_div.innerHTML = "";
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function start_game(duration) {
    time = duration;
    score_div = document.getElementById("score");
    score_div.innerHTML = "Score: ";
    searchbar.value = "";
    char_w_array100 = [];
    words_typed = "";
    word_div = document.getElementById("words");
    word_div.innerHTML = "";

    await get_1kwords();
    await delay(200);
    index_span = document.getElementById("words").children[0];
    index_span.className = "cursor";
    timer(time);
}

function end_game() {
    score();
    words_typed = "";
    char_w_array100 = [];
}

function score() { 
    let errors = find_errors();
    if (words_typed.length > 0) {
        raw_wpm = (words_typed.length / 5) / (time / 60);
        accuracy = ((words_typed.length - errors) * 100) / words_typed.length;
        rank = accuracy * raw_wpm;
    }
    scoreSetter();
}
function find_errors() {
    let errors = 0;
    for(i = 0; i < words_typed.length; i++){
        if(words_typed[i] !== char_w_array100[i]) {
            errors++;
        }
    }
    return errors;
}
function scoreSetter(){
    let score_div = document.getElementById("score"); 
    let acc_div = document.getElementById("accuracy"); 
    let wpm_div = document.getElementById("wpm"); 
    score_div.innerHTML = "Score: " + Math.round(rank);
    acc_div.innerHTML= " Accurancy: "+ accuracy.toFixed(2) ;
    wpm_div.innerHTML= " Wpm: "+ raw_wpm;
}
searchbar_focus_loop();

// force focus the thing you can type in, hide it, then when user writes words highlight them accordingly
