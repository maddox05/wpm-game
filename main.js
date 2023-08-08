char_w_array100 = [];
words_I_typed = "";
let searchbar = document.getElementById("query");

function get_1kwords(){
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
    if (array.length !== 0) {
        for (i = 0; i < array.length; i++) {
            for (j = 0; j < array[i].length; j++) {
                char_array.push(array[i][j]);
            }
            char_array.push(" ");
        }
    }
    else {
        console.log("hi");
    }
    return char_array;
}

function add_chars_to_div(char_array) {
    let div = document.getElementById("words");
    for (i = 0; i < char_array.length; i++) {
        let char = document.createElement("span");
        char.innerHTML = char_array[i];
        //change its color
        char.style.color = "black";
        char.style.opacity = "0.5";
        div.appendChild(char);
    }
}


function searchbar_focus_loop() {

    searchbar.focus();
    setTimeout(searchbar_focus_loop, 1000);
}


function deleted(event) {
    if(words_I_typed.length > 0) {
        if (event.keyCode === 8) {
            span = document.getElementById("words").children[i - 1];
            span.style.color = "black";
            span.style.background = "white";
            span.style.opacity = ".5";
            span3 = document.getElementById("words").children[i + 1];
            span3.style.color = "black";
            span3.style.background = "white";
            span3.style.opacity = ".5";

        }
    }
    // true = down, false = up
}
//loop that checks length of words you are typing turns all other after it words to black
function delete_loop() {
    word_div = document.getElementById("words");
    for (i = char_w_array100.length; i> words_I_typed.length; i--) {
        spanplus2 = word_div.children[i];
        if (spanplus2 !== undefined && spanplus2.className !== "cursor") {
            spanplus2.style.color = "black";
            spanplus2.style.background = "white";
            spanplus2.style.opacity = ".5";
            spanplus2.className = "NONE";

        } else {
        }

    }

    setTimeout(delete_loop, 500);
}

function cursor() {
    if(words_I_typed.length > 0) {
        for (j = 0; j < words_I_typed.length; j++) {
            if (j === words_I_typed.length-1) {
                index_span = document.getElementById("words").children[words_I_typed.length];
                index_span.className = "cursor";

            } else {
                index_span = document.getElementById("words").children[j+1];
                index_span.className = "NONE";
                index_span.style.color = "black";



            }
        }
    }
}
function update_game() {
    words_I_typed = searchbar.value;

    cursor();

    // CHECK IF WORDS ARE CORRECT
    if(words_I_typed.length > 0){
        correct = true;
        for(i = 0; i < words_I_typed.length; i++){

            if(words_I_typed[i] !== char_w_array100[i]) {
                span = document.getElementById("words").children[i];
                span.style.background = "red";
                span.style.opacity = ".5";
                correct = false;

            }
            else{
                span = document.getElementById("words").children[i];
                span.style.background = "green";
                span.style.opacity = "1";
            }
        }

    }
}


let time = 15;
async function timer(time) {
    button = document.getElementById("timer");
    button.innerHTML = "time: " + time;
// counts down from certain time
    if (time > 0) {
        time--;
        setTimeout(timer, 1000, time);
    } else {
        console.log("game over");
        end_game();

        word_div = document.getElementById("words");
        word_div.innerHTML = "";
        button.innerHTML = "time:";
    }
}


async function start_game(time) {
    score_div = document.getElementById("score");
    score_div.innerHTML = "score: ";
    searchbar.value = "";

    await get_1kwords();
    timer(time);
    // Start the game
}
function end_game() {
    score();
    char_w_array100 = [];
    words_I_typed = "";
    searchbar.value = "";

}
function score() {
    //time
    let errors = find_errors();
    let score = ((words_I_typed.length/5)-errors) / (time/60);
    console.log(score);
    let score_div = document.getElementById("score");
    score_div.innerHTML = "score: " + score.toFixed(2);
}
function find_errors() {
    errors = 0;
    for(i = 0; i < words_I_typed.length; i++){
        if(words_I_typed[i] !== char_w_array100[i]) {
            errors++;
        }
    }
    return errors;
}

searchbar_focus_loop();
delete_loop();




// force focus the thing you can type in, hide it, then when user writes words highlight them accordingly