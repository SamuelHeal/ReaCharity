var charityData;

function queryApiData() {
    var url = "https://data.gov.au/data/api/3/action/datastore_search?resource_id=eb1e6be4-5b13-4feb-b28e-388bf7c26f93";
    fetch(url)
    .then(data=>{return data.json()})
    .then((res)=>{
        charityData = res.result.records;
    });
}

function filterApiData(stateFilter, causeFilter) {
    if (!charityData)
        return null;
    
    function arrayFilter(charity) {
        return (charity[stateFilter] === "Y" && charity[causeFilter] === "Y");
    }

    return charityData.filter(arrayFilter);
}

function generateAddress(charity) {

    var address = "";

    if (charity.Address_Line_1 !== "") {
        address = address + charity.Address_Line_1;
    }
    if (charity.Address_Line_2 !== "") {
        address = address+ ", " +charity.Address_Line_2;
    }
    if (charity.Address_Line_3 !== "") {
        address = address+ ", " +charity.Address_Line_3;
    }
    if (charity.Town_City !== "") {
        address = address+ ", " +charity.Town_City;
    }
    if (charity.State !== "") {
        address = address+ ", " +charity.State;
    }
    if (charity.Postcode !== "") {
        address = address+ ", " +charity.Postcode;
    }

    return address;
}

function resultBoxGenerator(filteredData) {

    filteredData.forEach(charity => {
        //Create container for charity data
        var containerDiv = document.createElement('div');
        containerDiv.id = charity._id;

        //Charity name
        var nameHeader = document.createElement('h1');
        var nameText = document.createTextNode(charity.Charity_Legal_Name);
        nameHeader.appendChild(nameText);

        containerDiv.appendChild(nameHeader);

        //Charity website
        var websiteAnchor = document.createElement('a');
        var website = "";
        if (!charity.Charity_Website.includes("http://") && !charity.Charity_Website.includes("https://")) {
            website = website +"https://";
        }
        website = website + charity.Charity_Website;
        websiteAnchor.setAttribute("target", "_blank");
        websiteAnchor.setAttribute("href", website);
        var webText = document.createTextNode(charity.Charity_Website);
        websiteAnchor.appendChild(webText);
        containerDiv.appendChild(websiteAnchor);
        
        //Charity address
        var addressAnchor = document.createElement('a');
        var appendedAddress = generateAddress(charity);
        var addressText = document.createTextNode(appendedAddress);
        addressAnchor.appendChild(addressText);

        containerDiv.appendChild(addressAnchor);

        // Attach charity to body
        var body = document.body;
        body.insertBefore(containerDiv,body.firstChild)
    });
}

queryApiData();