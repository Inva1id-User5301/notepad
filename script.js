// #region CONSTANTS
// new text field
const newtextfield = document.getElementById("new"); // div
const head = document.getElementById("newHeading"); // heading textbox
const text = document.getElementById("newText"); // text textbox

// saved text div
const savedtextfield = document.getElementById("savedText");
// #endregion


// #region BUTTON ATTACHMENTS
document.getElementById("popout").addEventListener("click", PopOut);
document.getElementById("reveal").addEventListener("click", Minimise);
document.getElementById("clearHead").addEventListener("click", ClearHead);
document.getElementById("add").addEventListener("click", AddText);
document.getElementById("clearText").addEventListener("click", ClearText);
document.getElementById("copyNew").addEventListener("click", CopyText);
document.getElementById("DeleteAll").addEventListener("click", DeleteAll);
document.getElementById("SaveAll").addEventListener("click", SaveAll);
head.addEventListener("change", LocalSaveChanges)
text.addEventListener("change", LocalSaveChanges)
// #endregion


// #region DISPLAY SAVED TEXT

// variables
var h = []; // array of headers
var t = []; // array of text content
var len = 0;

getCache();
CheckOld();
// #endregion


// #region *************** GENERAL FUNCTIONS**************
/** popout tab into new window */
function PopOut() {
    window.close();
    const newWindow = window.open("main.html",
        "Notepad",
        "width=430,height=600,resizeable=yes,scrollbar=yes"
    );
    // require('./popout.js'); // runs popout.js
    // hidepopoutbutton();
    newWindow.onload = function() {
        this.document.getElementById("popout").textContent = "Close"
    };
}

/** Delete all notes */
function DeleteAll() {
    h=[];
    t=[];
    saveToCache();
    savedtextfield.replaceChildren();
}

/** Saves all notes to file in format:  Heading0 \n Content0 \n\n Heading1 \n Content1 \n\n... */
function SaveAll() {
    let note = "";
    for (let i = 0; i < h.length; i++) {
        note += h[i] + "\n" + t[i] + "\n\n";
    }

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(note));
    element.setAttribute('download', "Notes");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
// #endregion


// #region *************** NEW TEXT FUNCTIONS **************
/** Minise new note tab */
function Minimise() {
    if (newtextfield.hidden == true) {
        newtextfield.hidden = false;
        document.getElementById("reveal").textContent = "Hide"
        document.getElementById("break").remove();
    }
    else if (newtextfield.hidden == false) {
        newtextfield.hidden = true;
        document.getElementById("reveal").textContent = "Show"
        var line = document.createElement(`br`);
        line.id = "break";
        document.getElementById("top").appendChild(line);
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

async function LocalSaveChanges() {
    await chrome.storage.session.set({tempH: head.value, tempT: text.value});
}

async function CheckOld() {
    var prevH = await chrome.storage.session.get(["tempH"]);
    var prevT = await chrome.storage.session.get(["tempT"]);
    var pH = prevH.tempH;
    var pT = prevT.tempT;
    if (pH == undefined || pT == undefined) { return; }
    else {
        // THIS DOES WORK?!@?!?!?!NXCUHVOEIWNODFHG0W
        head.value = pH;
        text.value = pT;

        const replacementH = head.cloneNode(true);
        replacementH.value = head.value;
        head.replaceWith(replacementH);

        const replacementT = text.cloneNode(true);
        replacementT.value = text.value;
        text.replaceWith(replacementT);
    }
}

// #endregion


// #region *************** ADD TEXT FUNCTIONS **************
/** Saves text to list */
function AddText(dummy = 'fuk u', headings = head.value, contents = text.value, id = len) {
    if (headings == "") {
        headings = "Note " + len;
    }
    h.push(headings);
    t.push(contents);
    len++;
    Display(id);
    saveToCache();
    ClearHead();
    ClearText();
}

/** Save and show new text under the 'Saved' list */
function Display(i = len) {
    // create elements
    const newsaveddiv    = document.createElement(`div`);
    const newsavedhead   = document.createElement(`h3`);
    const newsavedshow   = document.createElement(`button`);
    const newsavedcopy   = document.createElement(`button`);
    const newsavededit   = document.createElement(`button`);
    const newsaveddel    = document.createElement(`button`);
    const newsavedsave   = document.createElement(`button`);
    const newsavedchange = document.createElement(`button`);
    const newsavedcancel = document.createElement(`button`);
    const newsavedtext   = document.createElement(`pre`);

    // ids
    var divid   = "saved" + i;
    var headid  = "head" + i;
    var textid  = "text" + i;
    newsaveddiv.id  = divid;
        // buttons
    var showid   = "show" + i;
    var copyid   = "copy" + i;
    var editid   = "edit" + i;
    var delid    = "del"  + i;
    var saveid   = "save" + i;
    var changeid = "change" + i;
    var cancelid = "cancel" + i;


    var j = i
    if (i >= h.length) {j=h.length-1}
    
    // IDs and content
        // heading
    newsavedhead.id = headid;
    newsavedhead.textContent = h[j];

        // text
    newsavedtext.id = textid;
    newsavedtext.textContent = t[j];
    newsavedtext.hidden = true;

        // buttons
    newsavedshow.textContent   = "+";
    newsavedcopy.textContent   = "Copy";
    newsavededit.textContent   = "Edit";
    newsaveddel.textContent    = "Del";
    newsavedsave.textContent   = "Save";
    newsavedchange.textContent = "Save Changes";
    newsavedcancel.textContent = "Discard Changes";
    newsavedshow.id   = showid;
    newsavedcopy.id   = copyid;
    newsavededit.id   = editid;
    newsaveddel.id    = delid;
    newsavedsave.id   = saveid;
    newsavedchange.id = changeid;
    newsavedcancel.id = cancelid

    // styles
        // hide edit confirmation buttons
    newsavedchange.hidden = true;
    newsavedcancel.hidden = true;
        // give margin
    newsavedshow.style.marginLeft = "5px";
    newsavedcopy.style.marginLeft = "2px";
    newsavededit.style.marginLeft = "2px";
    newsaveddel.style.marginLeft = "2px";
    newsavedsave.style.marginLeft = "2px";
    newsavedchange.style.marginLeft = "5px";
    newsavedcancel.style.marginLeft = "2px";
        // inline
    newsavedhead.style.display = "inline";
        // padding
    newsaveddiv.style.paddingTop = "7px"

    // add elements to doc
    newsaveddiv.appendChild(newsavedhead);
    newsaveddiv.appendChild(newsavedshow);
    newsaveddiv.appendChild(newsavedcopy);
    newsaveddiv.appendChild(newsavededit);
    newsaveddiv.appendChild(newsaveddel);
    newsaveddiv.appendChild(newsavedsave);
    newsaveddiv.appendChild(newsavedchange);
    newsaveddiv.appendChild(newsavedcancel);
    newsaveddiv.appendChild(newsavedtext);

    savedtextfield.appendChild(newsaveddiv);

    // functionality for buttons
    newsavedshow.addEventListener("click", () => { Reveal(i) });
    newsavedcopy.addEventListener("click", () => { Copy(i) });
    newsavededit.addEventListener("click", () => { Edit(i) });
    newsaveddel.addEventListener("click",  () => { Delete(i) });
    newsavedsave.addEventListener("click", () => { Save(i) });
    newsavedchange.addEventListener("click", () => { SaveEdit(i) });
    newsavedcancel.addEventListener("click", () => { CancelEdit(i) });
}

// #endregion


// #region *************** SAVED TEXT FUNCTIONS ***************
/** Shows or hides the text content of the note */
function Reveal(i) {
    var id = "text"+i;
    var button = "show"+i;
    var content = document.getElementById(id);
    var b = document.getElementById(button)
    if (content.hidden == true) {
        content.hidden = false;
        b.textContent = "-";
    }
    else if (content.hidden == false) {
        content.hidden = true;
        b.textContent = "+";
    }
}

/** Copies text content to clipboard */
function Copy(i) {
    var id = "text" + i;
    var content = document.getElementById(id);
    var ct = content.textContent;
    navigator.clipboard.writeText(ct);

}

/** Edits note */
function Edit(i) {
    var id  = "text" + i;
    var Sid = "show" + i;
    var Cid = "copy" + i;
    var Eid = "edit" + i;
    var Did = "del" + i;
    var Said = "save" + i;
    var Changeid = "change" + i;
    var CancelId = "cancel" + i;
    var boxid = "box" + i;

    document.getElementById(Sid).hidden = true;
    document.getElementById(Cid).hidden = true;
    document.getElementById(Eid).hidden = true;
    document.getElementById(Did).hidden = true;
    document.getElementById(Said).hidden = true;
    document.getElementById(Changeid).hidden = false;
    document.getElementById(CancelId).hidden = false;

    var content = document.getElementById(id);
    var val = content.innerHTML;
    content.innerHTML = ""
    
    const editBox = document.createElement('textarea');
    editBox.id = boxid;
    editBox.value = val;
    editBox.defaultValue = val;
    editBox.cols = 40;

    content.appendChild(editBox);
    content.hidden = false;

}

/** Saves edits of notes */
function SaveEdit(i) {
    var id  = "text" + i;
    var Sid = "show" + i;
    var Cid = "copy" + i;
    var Eid = "edit" + i;
    var Did = "del" + i;
    var Said = "save" + i;
    var Changeid = "change" + i;
    var CancelId = "cancel" + i;
    var boxid = "box" + i;

    document.getElementById(Sid).hidden = false;
    document.getElementById(Cid).hidden = false;
    document.getElementById(Eid).hidden = false;
    document.getElementById(Did).hidden = false;
    document.getElementById(Said).hidden = false;
    document.getElementById(Changeid).hidden = true;
    document.getElementById(CancelId).hidden = true;

    var editBox = document.getElementById(boxid);
    var content = document.getElementById(id);
    content.innerHTML = editBox.value;
    editBox.remove();

    // update in cache
    var item = 0
    var Divid = "saved" + i;
    x = savedtextfield.getElementsByTagName('div')
    for (i in x) {
        if (Divid == x[i].id) {
            t[item] = content.innerHTML;
            saveToCache();
            break;
        }
        item++;
    }
}

/** Discard changes made during edits */
function CancelEdit(i) {
    var id  = "text" + i;
    var Sid = "show" + i;
    var Cid = "copy" + i;
    var Eid = "edit" + i;
    var Did = "del" + i;
    var Said = "save" + i;
    var Changeid = "change" + i;
    var CancelId = "cancel" + i;
    var boxid = "box" + i;

    document.getElementById(Sid).hidden = false;
    document.getElementById(Cid).hidden = false;
    document.getElementById(Eid).hidden = false;
    document.getElementById(Did).hidden = false;
    document.getElementById(Said).hidden = false;
    document.getElementById(Changeid).hidden = true;
    document.getElementById(CancelId).hidden = true;

    var editBox = document.getElementById(boxid);
    var content = document.getElementById(id);
    content.innerHTML = editBox.defaultValue;
    editBox.remove();
}

/** Deletes note */
function Delete(i) {
    var item = 0
    var id = "saved" + i;
    x = savedtextfield.getElementsByTagName('div')
    for (i in x) {
        if (id == x[i].id) {
            h.splice(item, 1)
            t.splice(item, 1)
            document.getElementById(id).remove();
            saveToCache();
            break;
        }
        item++;
    }
}

/** Saves note to txt file on device */
function Save(i) {
    var Hid = "head" + i;
    var Tid = "text" + i;

    var heading = document.getElementById(Hid).textContent;
    var content = document.getElementById(Tid).textContent;

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', heading);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
// #endregion


// #region *************** CACHE FUNCTIONS ***************
/** get cache */
async function getCache() {
    let heads;
    let texts;
    var headerExist = false;
    var contentExist = false;

    const keys = await chrome.storage.local.getKeys();
    for (let i = 0;i < keys.length;i++) {
        key = keys[i]
        if (key == "headers") { headerExist = true; }
        else if (key == "text") { contentExist = true; }
        if (headerExist && contentExist) { break; }
    }

    if (headerExist && contentExist) {
        
        heads = await chrome.storage.local.get(["headers"]);
        texts = await chrome.storage.local.get(["text"]);
        if (heads.length != texts.length) {
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
    

    var H = heads.headers;
    var T = texts.text;
    var l = T.length;
    len = T.length;
    for(let i = 0; i<l;i++) {
        AddText(null, H[i], T[i], i);
    }
}

async function saveToCache() {
    await chrome.storage.local.set({ headers: h });
    await chrome.storage.local.set({ text: t });
}
// #endregion

