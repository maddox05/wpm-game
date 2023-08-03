array_of_1kwords = [];
array_of_100words = [];
char_w_array100 = [];
words_I_typed = "";
let searchbar = document.getElementById("query");
down_or_up = true;
// true = down, false = up

function get_1kwords(){
    fetch("https://gist.githubusercontent.com/deekayen/4148741/raw/98d35708fa344717d8eee15d11987de6c8e26d7d/1-1000.txt")
        .then(response => response.text())
        .then(textData => { // chain of promises
            array_of_1kwords = textData.split("\n");

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

function first_launch() {
    get_1kwords();
}
function searchbar_focus() {

    searchbar.focus();
    setTimeout(searchbar_focus, 1000);
}
function start_game(time) {
    searchbar_focus();
    delete_loop();
    // Start the game
}

function deleted(event) {
    if(words_I_typed.length > 0) {
        if (event.keyCode === 8) {
            span = document.getElementById("words").children[i - 1]
            span.style.color = "black";
            span.style.background = "white";
            span1.style.opacity = ".5";
            span3 = document.getElementById("words").children[i + 1]
            span3.style.color = "black";
            span3.style.background = "white";
            span1.style.opacity = ".5";

        }
    }
    // true = down, false = up
}
//loop that checks length of words you are typing turns all other after it words to black
function delete_loop() {
    if(true) {
        word_div = document.getElementById("words");
        for (i = char_w_array100.length; i > words_I_typed.length-1; i--) {
            spanplus2 = word_div.children[i];
            if (spanplus2 !== undefined) {
                spanplus2.style.color = "black";
                spanplus2.style.background = "white";
                span1.style.opacity = ".5";

            } else {
            }

        }
    }

    setTimeout(delete_loop, 500);
}
function update_game() {
    words_I_typed = searchbar.value;
    console.log(words_I_typed);

    if(words_I_typed.length > 0){
        correct = true;
        for(i = 0; i < words_I_typed.length; i++){

            if(words_I_typed[i] !== char_w_array100[i]) {
                span = document.getElementById("words").children[i];
                span.style.background = "red";
                span1.style.opacity = ".5";
                correct = false;
            }
            else{
                span1 = document.getElementById("words").children[i];
                span1.style.background = "green";
                span1.style.opacity = "1";
            }
        }
        if(correct){
            console.log("correct");
        }
        else{
            console.log("incorrect");
        }
    }
}


function color_updater() {
    // Update the color of the char subset of update_game()
}
first_launch();
start_game(15);



// force focus the thing you can type in, hide it, then when user writes words highlight them accordingly