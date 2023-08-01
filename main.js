wordlist = [];
function getwords(){
    const searchvalue = document.getElementById('query');
    wordlist.push(searchvalue.value)// takes everything from the input field and pushes it to the array
    console.log(wordlist);
}
function get_words() {
    fetch("https://gist.githubusercontent.com/deekayen/4148741/raw/98d35708fa344717d8eee15d11987de6c8e26d7d/1-1000.txt")
        .then(response => response.text())
        .then(textData => { // chain of promises
            console.log(textData);
            parse_words(textData);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}
function parse_words(text) {
    oneword = [];
    oneword = text.split("\n");
    console.log(oneword);
}
get_words()
