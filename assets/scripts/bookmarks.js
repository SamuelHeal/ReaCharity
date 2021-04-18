const charities = JSON.parse(localStorage.getItem("Bookmarks")) || [];
const charName = JSON.parse(localStorage.getItem("charBookmarks")) || [];


function renderBookmarks(){
   
    var bookmarkListEl = document.querySelector("#bookmark-list");

    for (let i = 0; i < charities.length; i++) {

        var bookmarkContainer = document.createElement("div");
        bookmarkContainer.id = "charityBookmark"+i;
        bookmarkContainer.setAttribute("class", "card col-md-3 bookmarkContainer");
       
        var bookmarkHeading = document.createElement("h2");
        bookmarkHeading.setAttribute("class", "card-title addPadding");
        bookmarkHeading.textContent= charities[i].name;
        
        var bookmarkWebsite = document.createElement("a");
        bookmarkWebsite.setAttribute("href", charities[i].website, "class", "addPadding");
        bookmarkWebsite.textContent= charities[i].website;

        var bookmarkAddress = document.createElement("p");
        bookmarkAddress.setAttribute("class", "card-text addPadding")
        bookmarkAddress.textContent= charities[i].address;
       

        var deleteBookmark= document.createElement("button");
        deleteBookmark.setAttribute("class", "align-self-end");
        deleteBookmark.textContent="Delete";

        deleteBookmark.addEventListener("click", function removeBookmark(){
        location.reload();
        var index = charName.indexOf(charities[i].name);
        console.log(index);
        
        if(index > -1){
        charities.splice(index, 1);
        charName.splice(index, 1);
        }
        
        
        localStorage.setItem("Bookmarks", JSON.stringify(charities));
        localStorage.setItem("charBookmarks", JSON.stringify(charName));
        
        document.getElementById("charityBookmark"+i).innerHTML="";

        })

        
        bookmarkListEl.append(bookmarkContainer);
        bookmarkContainer.append(bookmarkHeading, bookmarkWebsite, bookmarkAddress, deleteBookmark)
        
    }

}

renderBookmarks();