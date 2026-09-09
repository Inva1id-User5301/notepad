var savedText = [["Demo", "Saved text will appear here"]["Demo2", "+ reaveals the text\nCopy copies the text to your clipboard\nDel deletes the note from the saved list\nEdit allows you to change the contents"]];
// button attachements
document.getElementById("popout").addEventListener("click", PopOut);
document.getElementById("reveal").addEventListener("click", Minimise);
document.getElementById("clearHead").addEventListener("click", ClearHead);
document.getElementById("add").addEventListener("click", AddText);
document.getElementById("clearText").addEventListener("click", ClearText);
document.getElementById("copyNew").addEventListener("click", CopyText);

// new text field
const newtextfield = document.getElementById("new"); // div
const head = document.getElementById("newHeading"); // heading textbox
const text = document.getElementById("newText"); // text textbox

// saved text div
const savedtextfield = document.getElementById("savedText");

// add exisitng vars
for (let i = 0; i < savedText.length; i++) {
    Save(i);
}


/***************FUNCTIONS**************/
/** popout tab into new window */
function PopOut() {
    window.close();
    const newWindow = window.open("main.html",
        "Notepad",
        "width=350px,height=600,resizeable=yes,scrollbar=yes"
    );
    // require('./popout.js'); // runs popout.js
    // hidepopoutbutton();
    newWindow.onload = function() {
        this.document.getElementById("popout").textContent = "Close"
    };
}


/***************NEW TEXT FUNCTIONS**************/
/** Minise new note tab */
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

/** Clears active heading */
function ClearHead() {
    head.value = "";
}

/** Saves text to list */
function AddText() {
    if (text != "") {
        newtext = [head.value, text.value];
        savedText.push(newtext);
        ClearHead();
        ClearText();
        Save();
    }
}

/** Clears active text */
function ClearText() {
    text.value = "";
}

/** Copies active text to clipboard */
function CopyText() {
    var text = document.getElementById("newText");
    text.select();
    navigator.clipboard.writeText(text.value);
}

/** Save and show new text under the 'Saved' list */
function Save(i = savedText.length-1) {
    // create elements
    const newsaveddiv  = document.createElement(`div`);
    const newsavedhead = document.createElement(`h4`);
    const newsavedshow = document.createElement(`button`);
    const newsavedcopy = document.createElement(`button`);
    const newsaveddel  = document.createElement(`button`);
    const newsavededit = document.createElement(`button`);
    const newsavedtext = document.createElement(`p`);

    // get ids
    var divid   = "saved" + i;
    var headid  = "head" + i;
    var textid  = "text" + i;

    // heading
    newsavedhead.id = headid;
    newsavedhead.textContent = savedText[i][0];

    // text
    newsavedtext.id = textid;
    newsavedtext.textContent = savedText[i][1];
    newsavedtext.hidden = true;

    // buttons
    newsavedshow.textContent = "+";
    newsavedcopy.textContent = "Copy";
    newsaveddel.textContent = "Del";
    newsavededit.textContent = "Edit";

    // add elements
    newsaveddiv.appendChild(newsavedhead);
    newsavedhead.appendChild(newsavedshow);
    newsavedhead.appendChild(newsavedcopy);
    newsavedhead.appendChild(newsaveddel);
    newsavedhead.appendChild(newsavededit);
    newsaveddiv.appendChild(newsavedtext);

    // add to doc
    newsaveddiv.id  = divid;
    savedtextfield.appendChild(newsaveddiv);

    // functionality for buttons
    newsavedshow.addEventListener("click", Reveal(i));
    newsavedcopy.addEventListener("click", Copy(i));
    newsaveddel.addEventListener("click", Delete(i));
    newsavededit.addEventListener("click", Edit(i));
}


/***************SAVED TEXT FUNCTIONS***************/
/** Shows or hides the text content of the note */
function Reveal(i) {
    id = "text"+i;
    t = document.getElementById(id);
    if (t.hidden == true) {
        t.hidden = false;
        t.textContent = "-";
    }
    else if (t.hidden == false) {
        t.hidden = true;
        t.textContent = "+";
    }
}

/** Copies text content to clipboard */
function Copy(i) {

}

/** Deletes note */
function Delete(i) {

}

/** Edits note */
function Edit(i) {

}
