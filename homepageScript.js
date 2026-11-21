var buttonPressed = false;

var noteList = document.getElementById("notesList");
var NewName = document.getElementById("newNote");
var createNew = document.getElementById("newConfirm");


createNew.addEventListener("click", createNote);

displayList();


async function createNote() {
    var lists = await chrome.storage.sync.get(["list"]);
    var fulllist = lists.list
    if (fulllist == undefined) { fulllist = []; }
    console.log(NewName.value=="")
    if (NewName.value == "") { 
        let i = 1;
        let x = "Note "+ i;
        while (fulllist.includes(x)) {
            i++;
            x = "Note "+ i;
            console.log(x);
        }
        NewName.value = x;
    }
    if (!fulllist.includes(NewName.value)) {
        console.log(NewName.value, fulllist)
        fulllist.push(NewName.value);
        await chrome.storage.sync.set({list: fulllist});
        window.location.href = "main.html";
    }
    else {
        document.getElementById("ErrorMsg").hidden = false;      
    }   
}

async function displayList() {
    var lists = await chrome.storage.sync.get(["list"]);
    var fulllist = lists.list

    var lastPage = await chrome.storage.session.get(["page"]);
    var Page = lastPage.page
    console.log(Page)
    if (Page != "home" && Page != undefined) {
        MovePage(fulllist.indexOf(Page), Page);
    }

    for (let i in fulllist) {
        var clickObj = document.createElement(`div`);
        var Item = document.createElement(`h3`);
        var name = document.createElement(`button`);
        var del = document.createElement(`button`);

        clickObj.id = i;
        clickObj.tabIndex = 0;
        clickObj.style.padding = "4px"
        clickObj.onkeydown = function(event) {
            if (event.key == " " || event.key == "Enter") {
                MovePage(i, fulllist[i]);
            }
        }
        clickObj.onclick = async function() {
            MovePage(i, fulllist[i]); 
        };

        Item.innerHTML = Item.id = fulllist[i];
        Item.style.display = "inline";
        name.innerHTML = "Rename";
        del.innerHTML = "Delete";
        name.style.marginLeft = del.style.marginLeft = "7px";
        name.tabIndex = del.tabIndex= 1;
        name.addEventListener("click", () => Rename())
        del.addEventListener("click", () => Delete(i, fulllist, fulllist[i]))

        

        clickObj.appendChild(Item);
        clickObj.appendChild(name);
        clickObj.appendChild(del);
        noteList.appendChild(clickObj);
    }
}

function Rename(i) {
    buttonPressed = true;
}

async function Delete(id, list, item) {
    buttonPressed = true
    console.log('del')
    console.log(id, list, item);

    list.splice(list.indexOf(item), 1);
    document.getElementById(id).remove();

    console.log(list)

    await chrome.storage.sync.set({ list: list });
}

async function MovePage(i, name) {
    if (buttonPressed == true) {
        buttonPressed = false;
        return;
    }
    // set chrome.storage.local [headers, text, title]
    console.log("move")

    // console.log(i, name)
    // console.log(typeof name)



    
    await chrome.storage.session.set({
        title: name, 
        page: name
    });

    // await chrome.storage.local.set({
    //     headers: await chrome.storage.get(["headers"]),
    //     text: await chrome.storage.get(["text"])
    // });

    // window.location.href="main.html"
}

