const caeserCipher = (plainText, shiftValue) => {
    
    // for decryption
    if(shiftValue < 0){
        return caeserCipher(plainText, shiftValue+26);
    };

    // Output variable
    let output = '';

    // iterate through each character
    for (var i = 0; i < plainText.length; i++) {
        // Get the character we'll be appending
        var c = plainText[i];

        // If it's a letter...
        if (c.match(/[a-z]/i)) {
        // Get its code
        var code = plainText.charCodeAt(i);

        // For Uppercase letters
        if (code >= 65 && code <= 90) {
            c = String.fromCharCode(((code - 65 + shiftValue) % 26) + 65);
        }

        // For Lowercase letters
        else if (code >= 97 && code <= 122) {
            c = String.fromCharCode(((code - 97 + shiftValue) % 26) + 97);
        }
        }

    // Append
    output += c;
  }

  //return output
  return output;
}

