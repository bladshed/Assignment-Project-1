// convert csv to json format
async function loadData(url) {
    let response = await axios.get(url);
    // csv object is available from csvtojson package
    let json = await csv().fromString(response.data);
    return json;
}

// get sg malls data
async function getSGMalls() {
    let rawData = await loadData("https://raw.githubusercontent.com/ValaryLim/Mall-Coordinates-Web-Scraper/master/mall_coordinates_updated.csv");
    let malls = [];
    rawData.map(data => {
        malls.push({
            "name": data.name,
            "location": {
                "lat": data.latitude,
                "lng": data.longitude
            }
        })
    })

    return malls;
}

// get sg parks data
async function getNParks() {
    return await axios.get("files/nparks-tracks/nparks-tracks-geojson.geojson");
}