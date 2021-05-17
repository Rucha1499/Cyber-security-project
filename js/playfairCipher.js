var isEnd = false;
var flagX = false;
var flagAdd = false;

function getKey() { 
  return document.getElementById("key").value;
}

function getText() {
  return document.getElementById("String").value;
}

function createMatrix() { 
  var key = getKey();
  key = key.toUpperCase().replace(/\s/g, '').replace(/J/g, "I");
  var result = [];
  var temp = ''; 
  var alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
  for(var i = 0; i < key.length; i++) {
    if (alphabet.indexOf(key[i]) !== -1) {
      alphabet = alphabet.replace(key[i], '');
      temp += key[i];
    }
  }
  temp += alphabet;
  var result = [];
  temp = temp.split('');
  while(temp[0]) {
    result.push(temp.splice(0,5));
  }
  return result;
}

function cipher() {
  var matrix = createMatrix();
  var res = [];
  var error = 'Warning!!! String is empty';
  var str = getText();
  if(str === '') {
    alert(error);
  }
  // var err = 'ERRORX';
  var textPhrase, separator;
  str = str.toUpperCase().replace(/\s/g, '').replace(/J/g, "I");
  if(str.length === 0) {
    alert(error);
  }
  else {
    textPhrase = str[0];
  }
  var help = 0; flagAdd = false;
  for(var i = 1; i < str.length; i++) {
      if(str[i - 1] === str[i]) {
        if(str[i] === 'X') {
          separator = 'Q';
        }
        else {
          separator = 'X';
        }
        textPhrase += separator + str[i];
        help = 1; 
      }
      else {
        textPhrase += str[i];
      }
    if(help === 1) {
      flagAdd = true;
    }
  }
  
  if(textPhrase.length % 2 !== 0) {
    if(textPhrase[textPhrase.length - 1] === 'X') {
      textPhrase += 'Q';
      isEnd = true;
      flagX = false;
    }
    else {
      textPhrase += 'X';
      isEnd = true;
      flagX = true;
    }
  }
  
  var t = [];
  var enCodeStr = '';
  for(var i = 0; i < textPhrase.length; i += 2){
  	var pair1 = textPhrase[i];
  	var pair2 = textPhrase[i + 1];
  	var p1i, p1j, p2i, p2j;
  	for(var row = 0; row < matrix.length; row++) {
	    for(var column = 0; column < matrix[row].length; column++){
	      if (matrix[row][column] == pair1){
	      	p1i = row;
	      	p1j = column;
	      }
	      if (matrix[row][column] == pair2){
	      	p2i = row;
	      	p2j = column;
	      }
	    }
	  }
    var coord1 = '', coord2 = '';
    
    if(p1i === p2i) {
      if(p1j === 4) {
        coord1 = matrix[p1i][0];
      }
      else {
        coord1 = matrix[p1i][p1j + 1];
      }
      if(p2j === 4) {
        coord2 = matrix[p2i][0];
      }
      else {
        coord2 = matrix[p2i][p2j + 1]
      }
    }
    if(p1j === p2j) {
      if(p1i === 4) {
        coord1 = matrix[0][p1j];
      }
      else {
        coord1 = matrix[p1i + 1][p1j];
      }
      if(p2i === 4) {
        coord2 = matrix[0][p2j];
      }
      else {
        coord2 = matrix[p2i + 1][p2j]
      }
    }
    if(p1i !== p2i && p1j !== p2j) {
      coord1 = matrix[p1i][p2j];
      coord2 = matrix[p2i][p1j];
    }
    enCodeStr = enCodeStr + coord1 + coord2;
  }
  document.getElementById("output").innerHTML = enCodeStr;
  
  return enCodeStr;
}

function deCodeCipher() {
  var deCodeStr = '';
  var text = '';
  var error = "Warning!!! String is empty";
  var cipherText = getText();
  if(cipherText === '') {
    alert(error);
  }
  var matrix = createMatrix();
  for(var i = 0; i < cipherText.length; i += 2){
  	var pair1 = cipherText[i];
  	var pair2 = cipherText[i + 1];
  	var p1i, p1j, p2i, p2j;
  	for(var row = 0; row < matrix.length; row++) {
	    for(var column = 0; column < matrix[row].length; column++){
	      if (matrix[row][column] == pair1){
	      	p1i = row;
	      	p1j = column;
	      }
	      if (matrix[row][column] == pair2){
	      	p2i = row;
	      	p2j = column;
	      }
	    }
	  }
    var coord1 = '', coord2 = '';
    
    if(p1i === p2i) {
      if(p1j === 0) {
        coord1 = matrix[p1i][4];
      }
      else {
        coord1 = matrix[p1i][p1j - 1];
      }
      if(p2j === 0) {
        coord2 = matrix[p2i][4];
      }
      else {
        coord2 = matrix[p2i][p2j - 1]
      }
    }
    if(p1j === p2j) {
      if(p1i === 0) {
        coord1 = matrix[4][p1j]
      }
      else {
        coord1 = matrix[p1i - 1][p1j];
      }
      if(p2i === 0) {
        coord2 = matrix[4][p2j];
      }
      else {
        coord2 = matrix[p2i - 1][p2j]
      }
    }
    if(p1i !== p2i && p1j !== p2j) {
      coord1 = matrix[p1i][p2j];
      coord2 = matrix[p2i][p1j];
    }
    text = text + coord1 + coord2;
  }
  text = text.split('');
  
  for(var i = 0; i < text.length; i++) {
    var count;
    if (flagAdd) {
      if(text[i] === text[i + 2] && (text[i + 1] === 'X' || text[i + 1] === 'Q')) {
        count = i + 1;
        text.splice(count, 1);
      }
    }
    else if(flagAdd && isEnd && (flagX || !flagX)) {
      if(text[i - 2] === text[i] && (text[i - 1] === 'X' || text[i - 1] === 'Q'))
        count = i + 1;
      text.splice(count, 1);
    }
    else if(!flagAdd) {
      break;
    }
  }
  if(flagX) {
    text.pop();
  }
  if(isEnd && !flagX) {
    text.pop();
  }
  text = text.join('');
  console.log(text);
  document.getElementById('printDeCode').innerHTML = text;
}