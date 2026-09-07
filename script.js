var savedText = [["Demo", "Saved text will appear here"],["test","2"]];
// button attachements
document.getElementById("popout").addEventListener("click", PopOut);
document.getElementById("minimise").addEventListener("click", Minimise);
document.getElementById("clearHead").addEventListener("click", ClearHead);
document.getElementById("add").addEventListener("click", AddText);
document.getElementById("clearText").addEventListener("click", ClearText);
document.getElementById("copyNew").addEventListener("click", CopyText);

// new text field
const head = document.getElementById("newHeading");
const text = document.getElementById("newText");


document.getElementById("savedText").textContent = savedText

var listItems = savedText.map(item => `<li>${item}</li>`).join('');
  // Inject the list items into the <ul> element
document.getElementById('list-output').innerHTML = listItems;


// functions
// popout tab into new window 
function PopOut() {

}

// minise new text tab
function Minimise() {

}

// clears heading
function ClearHead() {
    head.value = "";
}

// saves text to list
function AddText() {
    if (text != "") {
        newtext = [head.value, text.value];
        savedText.push(newtext);
        ClearHead();
        ClearText();
    }
}

// clears text
function ClearText() {
    text.value = "";
}

// copys text
function CopyText() {
    var text = document.getElementById("newText");
    text.select();
    navigator.clipboard.writeText(text.value);
}