var savedText = [["Demo", "Saved text will appear here"]];
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



/***************NEW TEXT FUNCTIONS/***************/
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
        Save();
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

    // functionality for buttons
    newsavedshow.textContent = "+";
    newsavedshow.addEventListener("click", Reveal(i))
    newsavedcopy.textContent = "Copy";
    newsavedcopy.addEventListener("click", Copy(i));
    newsaveddel.textContent = "Del";
    newsaveddel.addEventListener("click", Delete(i));
    newsavededit.textContent = "Edit";
    newsavededit.addEventListener("click", Edit(i));

    // heading
    newsavedhead.id = headid;
    newsavedhead.textContent = savedText[i][0];

    // text
    newsavedtext.id = textid;
    newsavedtext.textContent = savedText[i][1];
    newsavedtext.hidden = true;

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
}


/***************SAVED TEXT FUNCTIONS/***************/
function Reveal(i) {
    // if (newtextfield.hidden == true) {
    //     newtextfield.hidden = false;
    //     document.getElementById("reveal").textContent = "Hide"
    // }
    // else if (newtextfield.hidden == false) {
    //     newtextfield.hidden = true;
    //     document.getElementById("reveal").textContent = "Show"
    // }
    
}
function Copy(i) {

}

function Delete(i) {

}

function Edit(i) {

}
