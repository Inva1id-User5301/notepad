// #region BUTTON ATTACHMENTS
document.getElementById("popout").addEventListener("click", PopOut);
document.getElementById("reveal").addEventListener("click", Minimise);
document.getElementById("clearHead").addEventListener("click", ClearHead);
document.getElementById("add").addEventListener("click", AddText);
document.getElementById("clearText").addEventListener("click", ClearText);
document.getElementById("copyNew").addEventListener("click", CopyText);
// #endregion

// #region CONSTANTS
// new text field
const newtextfield = document.getElementById("new"); // div
const head = document.getElementById("newHeading"); // heading textbox
const text = document.getElementById("newText"); // text textbox

// saved text div
const savedtextfield = document.getElementById("savedText");
// #endregion

// #region DISPLAY SAVED TEXT

// variables
let h; // array of headers
let t; // array of text content

getCache();



// #endregion

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
    text.select();
    navigator.clipboard.writeText(text.value);
}
// #endregion


// #region ***************ADD TEXT FUNCTIONS**************
/** Saves text to list */
function AddText(dummy = 'fuk u', headings = head.value, contents = text.value) {
    console.log(headings, head.value)
    console.log(contents, text.value)
    console.log(headings == head.value)
    console.log(contents == text.value)
    if (text != "") {
        if (headings == "") {
            headings = "Note " + h.length;
        }
        h.push(headings);
        t.push(contents);
        ClearHead();
        ClearText();
        console.log(h,t)
        Display()    
    }
}

/** Save and show new text under the 'Saved' list */
function Display(i = h.length-1) {
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
    var showid  = "show" + i;

    // heading
    newsavedhead.id = headid;
    newsavedhead.textContent = h[i];

    // text
    newsavedtext.id = textid;
    newsavedtext.textContent = t[i];
    newsavedtext.hidden = true;

    // buttons
    newsavedshow.textContent = "+";
    newsavedcopy.textContent = "Copy";
    newsavededit.textContent = "Edit";
    newsaveddel.textContent = "Del";
    newsavedsave.textContent = "Save";

    newsavedshow.id = showid;

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
    newsavedshow.addEventListener("click", () => { Reveal(i) });
    newsavedcopy.addEventListener("click", () => { Copy(i) });
    newsavededit.addEventListener("click", () => { Edit(i) });
    newsaveddel.addEventListener("click",  () => { Delete(i) });
    newsavedsave.addEventListener("click", () => { Save(i) });
}

// #endregion


// #region ***************SAVED TEXT FUNCTIONS***************
/** Shows or hides the text content of the note */
function Reveal(i) {
    id = "text"+i;
    button = "show"+i;
    content = document.getElementById(id);
    b = document.getElementById(button)
    console.log(content);
    if (content.hidden == true) {
        content.hidden = false;
        b.textContent = "-";
        console.log('hidden true');
    }
    else if (content.hidden == false) {
        content.hidden = true;
        this.b.textContent = "+";
        console.log('hidden false');
    }
}

/** Copies text content to clipboard */
function Copy(i) {
    id = "text" + i;
    content = document.getElementById(id);
    console.log(content);
    ct = content.textContent;
    navigator.clipboard.writeText(ct);

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



// #region ***************CACHE FUNCTIONS***************
/** get cache */
async function getCache() {
    let heads;
    let texts;
    var headerExist = false;
    var contentExist = false;

    const keys = await chrome.storage.local.getKeys();
    for (let i = 0;i < keys.length;i++) {
        key = keys[i]
        if (key == "header") { headerExist = true; }
        else if (key == "text") { contentExist = true; }
        if (headerExist && contentExist) { break; }
    }

    if (headerExist && contentExist) {
        if (heads.length != texts.length) {
            heads = await chrome.storage.local.get(["headers"]);
            texts = await chrome.storage.local.get(["text"]);
            await chrome.storage.local.set({ headers: ["Demo", "Demo2"] });
            await chrome.storage.local.set({ text: ["Saved text will appear here", "+ reaveals the text\nCopy copies the text to your clipboard\nDel deletes the note from the saved list\nEdit allows you to change the contents"] });
            heads = await chrome.storage.local.get(["headers"]);
            texts = await chrome.storage.local.get(["text"]);
        }
    }
    else {
        await chrome.storage.local.set({ headers: ["Demo", "Demo2"] });
        await chrome.storage.local.set({ text: ["Saved text will appear here", "+ reaveals the text\nCopy copies the text to your clipboard\nDel deletes the note from the saved list\nEdit allows you to change the contents"] });
        heads = await chrome.storage.local.get(["headers"]);
        texts = await chrome.storage.local.get(["text"]);
    }
    

    h = heads.headers;
    t = texts.text;

    console.log(t)
    console.log("length: ",t.length);
    
    console.log(h)
    console.log("length: ",h.length);

    l = t.length

    for(var i = 0; i<l;i++) {
        console.log(i);
        console.log(h[i]);
        console.log(t[i]);
        AddText(null, h[i], t[i]);
    }

}

// #endregion

