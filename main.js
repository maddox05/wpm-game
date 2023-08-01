words_you_typed = [];
words_you_need_to_type = [];
function typing(){
    const searchvalue = document.getElementById('query');
    words_you_typed.push(searchvalue.value)// takes everything from the input field and pushes it to the array
}
function get_words() {
    fetch("https://gist.githubusercontent.com/deekayen/4148741/raw/98d35708fa344717d8eee15d11987de6c8e26d7d/1-1000.txt")
        .then(response => response.text())
        .then(textData => { // chain of promises
            parse_words(textData);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}
function parse_words(text) {
    oneword = [];
    oneword = text.split("\n");
    start(oneword)
}

function start(oneword) {
    for(i = 0; i < 100; i++) {
        words_you_need_to_type[i] = oneword[Math.floor(Math.random()*100)];
        word_div = document.getElementById('words');
        word_div.textContent += words_you_need_to_type[i] + " ";
    }
}

get_words()
console.log(words_you_need_to_type)
