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
        var appendedAddress = charity.Address_Line_1+", "+charity.Address_Line_2+", "+charity.Address_Line_3+", "+charity.Town_City+ ", " + charity.State+ ", "+ charity.Postcode+ ", "+ charity.Country;
        var addressText = document.createTextNode(appendedAddress);
        addressAnchor.appendChild(addressText);

        containerDiv.appendChild(addressAnchor);

        // Attach charity to body
        var body = document.body;
        body.insertBefore(containerDiv,body.firstChild)
    });
}

queryApiData();