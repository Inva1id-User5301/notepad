var savedText = [["Demo", "Saved text will appear here"],["test","2"]];
// button attachements
document.getElementById("popout").addEventListener("click", PopOut);
document.getElementById("reveal").addEventListener("click", Minimise);
document.getElementById("clearHead").addEventListener("click", ClearHead);
document.getElementById("add").addEventListener("click", AddText);
document.getElementById("clearText").addEventListener("click", ClearText);
document.getElementById("copyNew").addEventListener("click", CopyText);

// new text field
const head = document.getElementById("newHeading");
const text = document.getElementById("newText");
const newtextfield = document.getElementById("new");


// functions
// popout tab into new window 
function PopOut() {

}

// minise new text tab
function Minimise() {
    if (newtextfield.hidden == true) {
        newtextfield.hidden = false;
        document.getElementById("reveal").textContent = "Hide"
    }
    else if (newtextfield.hidden == false) {
        newtextfield.hidden = true;
        document.getElementById("reveal").textContent = "Show"
    }
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