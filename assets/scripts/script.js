// INITIAL ELEMENTS
var charitiesName= $('#charity-name');
var charitiesWebsite = $('#charity-website');
var charitiesAddress = $('#charity-address');
var charitiesBookmark = $('#bookmark');

// DATA ARRAYS
var charities = JSON.parse(localStorage.getItem("Charities")) || [];

// SAVING INPUT

// EVENT LISTENER
$('form').on('submit', function bookmark(event){
    event.preventDefault();

    var charityName= charitiesName.val();
    var charityWebsite= charitiesWebsite.val();
    var charityAddress= charitiesAddress.val();

    let charity = {
        name: charityName,
        website: charityWebsite,
        address: charityAddress
    }

    charities.unshift(charity);
    localStorage.setItem('Charities', JSON.stringify(charities));

    charitiesName.val("");
    charitiesWebsite.val("");
    charitiesAddress.val("");

});
console.log(charities);
