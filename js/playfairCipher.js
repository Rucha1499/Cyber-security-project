import { decipher, encipher } from '../crypto-classic-playfair/playfair.js';

// const { encipher } = require('crypto-classic-playfair');

function getKey() { 
   const key = document.getElementById("key").value;
   return key;
}

function getPlainText() {
  return document.getElementById("String").value;
}

function cipher () {
  console.log(encipher(getPlainText(), getKey()));
}

const encodeBtn = document.getElementById("code");
const decodeBtn = document.getElementById("decode")

encodeBtn.addEventListener('click', () => {
  console.log(encipher(getPlainText(), getKey()));
})

decodeBtn.addEventListener('click', () => {
  console.log(decipher(getPlainText(), getKey()))
} )


