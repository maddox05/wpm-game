
array_of_1kwords = [];
array_of_100words = [];
char_w_array100 = [];

function get_1kwords(){
    fetch("https://gist.githubusercontent.com/deekayen/4148741/raw/98d35708fa344717d8eee15d11987de6c8e26d7d/1-1000.txt")
        .then(response => response.text())
        .then(textData => { // chain of promises
            array_of_1kwords = textData.split("\n");
            console.log(array_of_1kwords);

            for(i = 0; i < 100; i++){
                array_of_100words.push(array_of_1kwords[Math.floor(Math.random() * 100)]);
            }
            char_w_array100 = array_to_char(array_of_100words);
            console.log(char_w_array100);
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
        div.appendChild(char);
    }
}

function first_launch() {
    get_1kwords();


}

function start_game(time) {

    // Start the game

}
function update_game() {
    // Update the game and start timer

}
function color_updater() {
    // Update the color of the char subset of update_game()
}
first_launch();
//start_game(15)



// force focus the thing you can type in, hide it, then when user writes words highlight them accordingly