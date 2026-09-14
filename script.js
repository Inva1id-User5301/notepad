var savedText = [["Demo", "Saved text will appear here"],["Demo2", "+ reaveals the text\nCopy copies the text to your clipboard\nDel deletes the note from the saved list\nEdit allows you to change the contents"]];


// #region button attachements
document.getElementById("popout").addEventListener("click", PopOut);
document.getElementById("reveal").addEventListener("click", Minimise);
document.getElementById("clearHead").addEventListener("click", ClearHead);
document.getElementById("add").addEventListener("click", AddText);
document.getElementById("clearText").addEventListener("click", ClearText);
document.getElementById("copyNew").addEventListener("click", CopyText);
// #endregion

// new text field
const newtextfield = document.getElementById("new"); // div
const head = document.getElementById("newHeading"); // heading textbox
const text = document.getElementById("newText"); // text textbox

// saved text div
const savedtextfield = document.getElementById("savedText");

for (let i = 0; i < Object.keys(chrome.storage.local).length;i++) {
    id = "Note" + i
    console.log(chrome.storage.local.get([id]));
}

// #region *************** GENERAL FUNCTIONS**************
/** popout tab into new window */
function PopOut() {
    window.close();
    const newWindow = window.open("main.html",
        "Notepad",
        "width=350,height=400,resizeable=yes,scrollbar=yes"
    );
    // require('./popout.js'); // runs popout.js
    // hidepopoutbutton();
    newWindow.onload = function() {
        this.document.getElementById("popout").textContent = "Close"
    };
}
// #endregion


// #region ***************NEW TEXT FUNCTIONS**************
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
// #endregion


// #region ***************ADD TEXT FUNCTIONS**************
/** Saves text to list */
function AddText() {
    if (text != "") {
        newtext = [head.value, text.value];
        savedText.push(newtext);
        ClearHead();
        ClearText();
        Display();
    }
}

/** Save and show new text under the 'Saved' list */
function Display(i = savedText.length-1) {
    // create elements
    const newsaveddiv  = document.createElement(`div`);
    const newsavedhead = document.createElement(`h4`);
    const newsavedshow = document.createElement(`button`);
    const newsavedcopy = document.createElement(`button`);
    const newsavededit = document.createElement(`button`);
    const newsaveddel  = document.createElement(`button`);
    const newsavedsave  = document.createElement(`button`);
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
    newsavededit.textContent = "Edit";
    newsaveddel.textContent = "Del";
    newsavedsave.textContent = "Save";

    // add elements
    newsaveddiv.appendChild(newsavedhead);
    newsavedhead.appendChild(newsavedshow);
    newsavedhead.appendChild(newsavedcopy);
    newsavedhead.appendChild(newsavededit);
    newsavedhead.appendChild(newsaveddel);
    newsavedhead.appendChild(newsavedsave);
    newsaveddiv.appendChild(newsavedtext);

    // add to doc
    newsaveddiv.id  = divid;
    savedtextfield.appendChild(newsaveddiv);

    // functionality for buttons
    newsavedshow.addEventListener("click", Reveal(i));
    newsavedcopy.addEventListener("click", Copy(i));
    newsavededit.addEventListener("click", Edit(i));
    newsaveddel.addEventListener("click", Delete(i));

    newsavedsave.addEventListener("click", Save(i));
}

/** Save to cache */
async function addnew(number = savedText.length-1, heading="Demo", content="Saved text will appear here") {
    var id = "Note"+number;
    await chrome.storage.local.set({[id]: [heading, content]});
    Display(number);
}
// #endregion


// #region ***************SAVED TEXT FUNCTIONS***************
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

/** Edits note */
function Edit(i) {

}

/** Deletes note */
function Delete(i) {

}

/** Saves note to txt file on device */
function Save(i) {

}
// #endregion