words_you_typed = "";
chars_to_check = [];
chars_you_typed = [];

function typing(){
    const searchvalue = document.getElementById('query');
    words_you_typed = searchvalue.value;
    chars_you_typed = array_to_chars(words_you_typed, false)
    check_words()
}
function check_words() {
    let correct = true;
    for (let i = 0; i < chars_you_typed.length; i++) {
        //console.log(chars_you_typed.length);

        if (chars_to_check[i] !== chars_you_typed[i]) {


            update_colors(i, true);
            correct = false;
            // change incorrect index to red
        } else {
            update_colors(i, false);
            //console.log("correct")
            // change correct index to green
        }


    }
    if (correct) {
        console.log("correct")
    } else {
    console.log("incorrect")
}
    update_game()
}
function get_words() {
    console.log("fetching data");
    fetch("https://gist.githubusercontent.com/deekayen/4148741/raw/98d35708fa344717d8eee15d11987de6c8e26d7d/1-1000.txt")
        .then(response => response.text())
        .then(textData => { // chain of promises
            oneword = [];
            oneword = textData.split("\n");
            onehundred_words = [];
            for(i = 0; i < 100; i++) {
                onehundred_words.push(oneword[Math.floor(Math.random() * 100)]);
            }
            chars_to_check = array_to_chars(onehundred_words, true)
            update_game()
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}


function update_game() {
    word_div = document.getElementById('words');
    word_div.innerHTML = chars_to_check.join("");
}
function update_colors(word_i_am_on, bool) {
    word_div = document.getElementById('words');
    if(bool) {
        word_div.innerHTML[word_i_am_on].style = "color: red"
    } else {
        word_div.innerHTML[word_i_am_on].style = "color: green"
    }
}




function array_to_chars(init_array, bool) {
    let push_array = [];
    for (i = 0; i < init_array.length; i++) {

        for (j = 0; j < init_array[i].length; j++) {
            push_array.push(init_array[i][j]);
        }
        if(bool) {
            push_array.push(" ");
        }
    }
    return push_array;
}
let time = 0;
function timer() {
    document.getElementById('query').focus();

    if (time < 15) {
        setTimeout(timer, 1000);
        time += 1;
        console.log(time);

    }
    else {
        word_div = document.getElementById('words');
        word_div.innerHTML = "Game Over";

    }
}


// fetch is async function so array is empty when you try to print it
