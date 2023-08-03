import { useState, useEffect } from "react";


function App() {
  const [words, setWords] = useState()
  const [loading, setLoading] = useState(true)
  const [list, setList] = useState([])
  const url = 'https://gist.githubusercontent.com/deekayen/4148741/raw/98d35708fa344717d8eee15d11987de6c8e26d7d/1-1000.txt';

  const fetchWords = async () => {
    const response = await fetch(url);
    const words = await response.text();
    const newWords = words.split('/n')
    setWords(newWords)
    setLoading(false)
}
const randomwords = () => {
  let randoList = []
  // console.log('words', words)
  for(let i=0; i <100; i++){
    randoList.push(words[Math.floor(Math.random() * 100)])
  }
  console.log(randoList)
  return randoList

}
setList(randomwords())





useEffect(() => {
fetchWords()
console.log(words)


}, [])
console.log(list)



  return (
    <div className="App">
      {/* {list.map((word) =>console.log(word))} */}

    </div>
  );
}

export default App;
