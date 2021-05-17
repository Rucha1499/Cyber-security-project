import { decipher, encipher } from '../crypto-classic-playfair/playfair.js';

function getKey() { 
   const key = document.getElementById("key").value;
   return key;
}

function getPlainText() {
  return document.getElementById("String").value;
}

const encodeBtn = document.getElementById("code");
const decodeBtn = document.getElementById("decode")
const displayBox = document.getElementById("output")

encodeBtn.addEventListener('click', () => {
  const output = encipher(getPlainText(), getKey());
  displayBox.innerText = output;
})

decodeBtn.addEventListener('click', () => {
  const output = decipher(getPlainText(), getKey())
  displayBox.innerText = output;
} )


