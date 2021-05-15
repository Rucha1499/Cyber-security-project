const encrypt = (plainText, key) => {
    if (plainText.length != key.length) {
		return "Text and Key have to be the same length.Try again!"
	}
	
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("")
	
    let nText = []
	let kText = []
	
    for (let i of plainText) {
		nText.push(alphabet.indexOf(i.toLowerCase()))
	}
	for (let i of key) {
		kText.push(alphabet.indexOf(i.toLowerCase()))
	}
	let out = ""
	for (let i in nText) {
		out += alphabet[(nText[i] + kText[i]) % 26]
	}
	return out;
}

const decrypt = (cipherText, key ) => {
    if (cipherText.length != key.length) {
		return "Text and Key have to be the same length.Try again!"
		
	}
	const alphabet = "abcdefghijklmnopqrstuvwxyz".split("")
	
    let nText = []
	let kText = []
	
    for (let i of cipherText) {
		nText.push(alphabet.indexOf(i.toLowerCase()))
	}
	for (let i of key) {
		kText.push(alphabet.indexOf(i.toLowerCase()))
	}
	let out = ""
	for (let i in nText) {
		out += alphabet[(nText[i] - kText[i]) < 0 ? 26 + (nText[i] - kText[i]) : (nText[i] - kText[i]) % 26]
	}
	return out;
}

const inputBoxText = document.getElementById("input-plain-text");
const inputBoxKey = document.getElementById("input-key");
const displayBox = document.getElementById("output");
let encryptedText, decryptedText;

document.getElementById("encrypt").addEventListener('click',(event) => {
	encryptedText = encrypt(inputBoxText.value, inputBoxKey.value)
	displayBox.innerText = `${encryptedText}`
})

document.getElementById("decrypt").addEventListener('click',(event) => {
	decryptedText = decrypt(inputBoxText.value, inputBoxKey.value)
	displayBox.innerText = `${decryptedText}`
})