const plainText = document.getElementById("plain-text");

const k1 = document.getElementById("ip1")
const k2 = document.getElementById("ip2")
const k3 = document.getElementById("ip3")
const k4 = document.getElementById("ip4")
const k5 = document.getElementById("ip5")
const k6 = document.getElementById("ip6")
const k7 = document.getElementById("ip7")
const k8 = document.getElementById("ip8")
const k9 = document.getElementById("ip9")

const letter = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
]



const getMatrix = () => {
const keyFinal1 = letter.indexOf(k1.value)
const keyFinal2 = letter.indexOf(k2.value)
const keyFinal3 = letter.indexOf(k3.value)
const keyFinal4 = letter.indexOf(k4.value)
const keyFinal5 = letter.indexOf(k5.value)
const keyFinal6 = letter.indexOf(k6.value)
const keyFinal7 = letter.indexOf(k7.value)
const keyFinal8 = letter.indexOf(k8.value)
const keyFinal9 = letter.indexOf(k9.value)
const key = [[keyFinal1, keyFinal4, keyFinal7], [keyFinal2, keyFinal5, keyFinal8], [keyFinal3, keyFinal6, keyFinal9]]
 
return key
}

// do mod operation on two numbers
const mod = (m, n = 26) => {
  return ((m % n) + n) % n
}

// run multiple operation sequential
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

// get the number of letters A-Z
const getStringNumber = plainTextArray => {
  return plainTextArray.map(item => letter.indexOf(item))
}

//  Transform plaintex to array with removing spaces
const trsnformStringToArray = str => Array.from(str).filter(x => x !== ' ')

// divide the array into small chunks with specified length
const chunk = (myArray, chunk_size = 3) => {
  let results = []

  while (myArray.length) {
    results.push(myArray.splice(0, chunk_size))
  }

  return results
}

// make key ready for multiplication by re-sort it
const transformKey = key => {
  let result = []
  let j, i
  for (i = 0; i < key.length; i++) {
    for (j = 0; j < key.length; j++) {
      result.push(key[j][i])
    }
  }

  return chunk(result)
}

// divide the string into 3x3 matrix chunks
const chunks = pipe(
  trsnformStringToArray,
  getStringNumber,
  chunk,
)

// multiple two diff arrays
const mupltipleArray = arr1 => arr2 => {
  let sum = 0
  let result = []

  arr1.map(item1 =>
    arr2.map(item2 =>
      item1.reduce(function(r, a, i) {
        sum += a * item2[i]
        if (i === 2) {
          result.push(sum)
          sum = 0
        }

        return
      }, []),
    ),
  )
  return result
}

// get the mod for every operation
const getMod = arr => arr.map(item => mod(item))
// get the string that matches the encrypted character
const getString = arr => arr.reduce((acc, cur) => acc + letter[cur], '')

 
const cipher = pipe(
  getMod,
  getString,
)

const displayBox = document.getElementById("output")

document.getElementById("encrypt-button").addEventListener('click',(event) => {
    const key = getMatrix();
    const multipledArr = mupltipleArray(chunks(plainText.value))(transformKey(key))
    const encryptedText = cipher(multipledArr)
    displayBox.innerText = `${encryptedText}`
})