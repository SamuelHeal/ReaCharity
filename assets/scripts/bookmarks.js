const charities = JSON.parse(localStorage.getItem("Bookmarks")) || [];
const charName = JSON.parse(localStorage.getItem("charBookmarks")) || [];


function renderBookmarks(){
   
    var bookmarkListEl = document.querySelector("#bookmark-list");

    for (let i = 0; i < charities.length; i++) {

        var bookmarkContainer = document.createElement("div");
        bookmarkContainer.id = "charityBookmark"+i;
       
        var bookmarkHeading = document.createElement("h2");
        bookmarkHeading.textContent= charities[i].name;
        
        var bookmarkWebsite = document.createElement("p");
        bookmarkWebsite.textContent= charities[i].website;

        var bookmarkAddress = document.createElement("p");
        bookmarkAddress.textContent= charities[i].address;
       

        var deleteBookmark= document.createElement("button");
        deleteBookmark.textContent="X";

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