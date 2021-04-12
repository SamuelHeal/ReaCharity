var charityData;

function queryApiData() {
    var url = "https://data.gov.au/data/api/3/action/datastore_search?resource_id=eb1e6be4-5b13-4feb-b28e-388bf7c26f93";
    fetch(url)
    .then(data=>{return data.json()})
    .then((res)=>{
        charityData = res.result.records;
    });
}

queryApiData();