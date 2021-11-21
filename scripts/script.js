let map = null;
async function main() {
 
    function init() {
        // initialize variables
        let map = initMap();
        let searchResultLayer = L.layerGroup();
        let selectedOption = "";
        let results = null;
        const options = {
            option1: "malls",
            option2: "parks"
        };

        // load taxi and weather
        loadGroup();

        //--------------------------------------------------------------------------
        // event listeners start
        //--------------------------------------------------------------------------
        // malls btn
        document.querySelector('#malls-btn').addEventListener('click', async ()=>{
            selectedOption = options.option1;
            results = await getSGMalls();
            loadSGMalls(results, false, "");
        })

        // malls mobile btn
        document.querySelector('#malls-btn-mbl').addEventListener('click', async ()=>{
            selectedOption = options.option1;
            results = await getSGMalls();
            loadSGMalls(results, false, "-mbl");
        })

        // parks btn
        document.querySelector('#parks-btn').addEventListener('click', async ()=>{
            selectedOption = options.option2;
            results = await getNParks();
            loadNParks(results, false, "");
        })

        // parks mobile btn
        document.querySelector('#parks-btn-mbl').addEventListener('click', async ()=>{
            selectedOption = options.option2;
            results = await getNParks();
            loadNParks(results, false, "-mbl");
        })

        // search btn
        document.querySelector('#search-btn').addEventListener('click', async ()=>{
            if(results == null){
                alert("Please choose either Malls/Parks first");
                return;
            }

            let query = document.querySelector('#search-input').value;
            let mbl = document.querySelector('#search-input-mbl').value;
            if(!mbl){
                mbl = "";
            }
            if(selectedOption==options.option1){
                loadSGMalls(results, query, mbl);
            } else {
                loadNParks(results, query, mbl);
            }
        })

        // search mobile btn
        document.querySelector('#search-btn-mbl').addEventListener('click', async ()=>{
            if(results == null){
                alert("Please choose either Malls/Parks first");
                return;
            }

            let query = document.querySelector('#search-input-mbl').value;
            let mbl = "-mbl";
            if(selectedOption==options.option1){
                loadSGMalls(results, query, mbl);
            } else {
                loadNParks(results, query, mbl);
            }
        })

        otherPlacesListeners(map, searchResultLayer);
        //--------------------------------------------------------------------------
        // event listeners end
        //--------------------------------------------------------------------------

        // loadGroup
        async function loadGroup(){
            // taxi
            const taxiResponse = await axios.get("https://api.data.gov.sg/v1/transport/taxi-availability");
            const taxiCoordinates = taxiResponse.data.features[0].geometry.coordinates;

            let taxiGroup = L.layerGroup();

            var taxiIcon = L.icon({
                iconUrl: 'images/taxi.png',
                iconSize: [40, 40] // size of the icon
            });

            if (taxiCoordinates.length > 1000){
                for (let i = 0; i < taxiCoordinates.length; i++) {
                    if(i%10 == 0){
                        let pos = taxiCoordinates[i];
                        L.marker([pos[1],pos[0]], {icon: taxiIcon}).bindPopup(`Taxi`).addTo(taxiGroup);
                    }
                }
            } else {
                for (let i = 0; i < taxiCoordinates.length; i++) {
                    let pos = taxiCoordinates[i];
                    L.marker([pos[1],pos[0]], {icon: taxiIcon}).bindPopup(`Taxi`).addTo(taxiGroup);
                }
            }

            // weather
            const weatherResponse = await axios.get("https://api.data.gov.sg/v1//environment/2-hour-weather-forecast");
            const rainy = new Set();
            const cloudy = new Set();
            const sunny = new Set();
            const night = new Set();
            weatherResponse.data.items[0].forecasts.forEach(forecast => {
                if(forecast.forecast.includes("Shower") || forecast.forecast.includes("Rain")){
                    rainy.add(forecast.area);
                } else if(forecast.forecast.includes("Cloud")){
                    cloudy.add(forecast.area);
                } else if(forecast.forecast.includes("Warm")){
                    sunny.add(forecast.area);
                } else if(forecast.forecast.includes("Night")){
                    night.add(forecast.area);
                }
            });
            const weatherCoordinates = weatherResponse.data.area_metadata;

            let weatherGroup = L.layerGroup();

            let rainyIcon = L.icon({
                iconUrl: 'images/rainy.png',
                iconSize: [50, 50] // size of the icon
            });

            let cloudyIcon = L.icon({
                iconUrl: 'images/cloudy.png',
                iconSize: [50, 50] // size of the icon
            });

            let sunnyIcon = L.icon({
                iconUrl: 'images/sunny.png',
                iconSize: [50, 50] // size of the icon
            });

            let nightIcon = L.icon({
                iconUrl: 'images/night.png',
                iconSize: [50, 50] // size of the icon
            });

            for (let i = 0; i < weatherCoordinates.length; i++) {
                let area = weatherCoordinates[i].name;
                if(rainy.has(area)){
                    let pos = weatherCoordinates[i].label_location;
                    L.marker([pos.latitude,pos.longitude], {icon: rainyIcon}).bindPopup(weatherCoordinates[i].name).addTo(weatherGroup);
                } else if(cloudy.has(area)){
                    let pos = weatherCoordinates[i].label_location;
                    L.marker([pos.latitude,pos.longitude], {icon: cloudyIcon}).bindPopup(weatherCoordinates[i].name).addTo(weatherGroup);
                } else if(sunny.has(area)){
                    let pos = weatherCoordinates[i].label_location;
                    L.marker([pos.latitude,pos.longitude], {icon: sunnyIcon}).bindPopup(weatherCoordinates[i].name).addTo(weatherGroup);
                } else if(night.has(area)){
                    let pos = weatherCoordinates[i].label_location;
                    L.marker([pos.latitude,pos.longitude], {icon: nightIcon}).bindPopup(weatherCoordinates[i].name).addTo(weatherGroup);
                }
            }

            let overlays ={
                'Taxi Available': taxiGroup,
                'Check Weather': weatherGroup
            }

            L.control.layers({}, overlays).addTo(map);
        }

        // load SG Mall icons
        function loadSGMalls(results,query,mbl){
            searchResultLayer.clearLayers();

            let searchResults = document.querySelector(`#search-results${mbl}`);
            searchResults.innerHTML = "";
            // add each coordinate
            for(let eachVenue of results) {
                if(!query || (eachVenue.name).toLowerCase().includes(query.toLowerCase())){
                    var mallIcon = L.icon({
                        iconUrl: 'images/mall.png',
                        iconSize: [30, 30] // size of the icon
                    });
                    let marker = L.marker([eachVenue.location.lat, eachVenue.location.lng], {icon: mallIcon});
                    marker.bindPopup(`<i class="fa-solid fa-bag-shopping me-2"></i>${eachVenue.name}`);
                    marker.addTo(searchResultLayer);

                    // display search results
                    displaySearchResult(searchResults, map, marker, eachVenue.name, eachVenue.location.lat, eachVenue.location.lng);
                }
            }

            // display the search result layer if it is not displayed
            displayResultLayer(map, searchResultLayer)
        }

        // load SG Park icons
        function loadNParks(results,query,mbl){
            // initialize variables
            searchResultLayer.clearLayers();
            let searchResults = document.querySelector(`#search-results${mbl}`);
            searchResults.innerHTML = "";
            const parkNames = new Set();
            var greenIcon = L.icon({
                iconUrl: 'images/leaf-red.png',
                iconSize:     [20, 45], // size of the icon
            });

            for (let n of results.data.features) {
                
                let desc = n.properties.Description;
                let pName = "";

                try {
                    pName = new DOMParser().parseFromString(desc, "text/xml").children[0].children[0].children[7].children[1].textContent;
                    if(parkNames.has(pName)){
                        continue;
                    }                
                    parkNames.add(pName);
                }
                catch(err) {
                    continue;
                }

                // add each coordinate
                if(!query || (pName).toLowerCase().includes(query.toLowerCase())){
                    if(!isNaN(n.geometry.coordinates[1]) && !isNaN(n.geometry.coordinates[0])){
                        let marker = L.marker([n.geometry.coordinates[1], n.geometry.coordinates[0]], { icon: greenIcon }).bindPopup(`<i class="fas fa-seedling me-2"></i>${pName}`);
                        // parksLayer.addLayer(marker); 
                        marker.addTo(searchResultLayer);

                        // display search results
                        displaySearchResult(searchResults, map, marker, pName, n.geometry.coordinates[1], n.geometry.coordinates[0]);
                    }
                }
            }

            // display the search result layer if it is not displayed
            displayResultLayer(map, searchResultLayer);
        }
    }

    init();

    // initialize map
    function initMap() {
        if(map){
            map.stopLocate();
            map.clearAllEventListeners();
            map.remove();
        }

        let singapore = [1.35, 103.83];
        map = L.map('map-container').setView(singapore, 13);
        
        // setup tilelayer
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 16,
            minZoom: 12,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiZXh0cmFrdW4iLCJhIjoiY2swdnZtMWVvMTAxaDNtcDVmOHp2c2lxbSJ9.4WxdONppGpMXeHO6rq5xvg'
        }).addTo(map);
    
        // go to current location
        let lc = L.control.locate().addTo(map);
        lc.start();
    
        return map;
    }
    
    // main();
    
    function displayResultLayer(map, searchResultLayer){
        if (!map.hasLayer(searchResultLayer)) {
            map.addLayer(searchResultLayer);
        }
    }
    
    function displaySearchResult(searchResults, map, marker, name, lat, lng){
        // display search results
        let resultElement = document.createElement('div');
        resultElement.innerHTML = name;
        resultElement.addEventListener('click', ()=>{
            document.querySelector("#btn-close-mbl").click();
            map.flyTo([lat, lng], 16);
            marker.openPopup();
            searchResults.innerHTML = "";
        })
        
        searchResults.appendChild(resultElement);
    }
    
    function displayOtherPlaces(map, searchResultLayer, lat, lng){
        let searchResults = document.querySelector('#search-results');
            searchResults.innerHTML = "";
            searchResultLayer.clearLayers();
    
            let circle = L.circle([lat, lng], {
                color: 'red',
                fillColor:"orange",
                fillOpacity:0.5,
                radius: 300
            })
    
            circle.addTo(searchResultLayer);
            displayResultLayer(map, searchResultLayer);
            map.flyTo([lat, lng], 16);
    }
    
    function otherPlacesListeners(map, searchResultLayer){
        // tanjong beach
        document.querySelector('#tanjong-beach-mbl').addEventListener('click', ()=>{
            document.getElementById('tanjong-beach').click();
        });
        document.querySelector('#tanjong-beach').addEventListener('click', ()=>{
            document.getElementById('img-place').src = 'images/tanjong-beach.png';
            document.getElementById('other-places-title').innerText = 'Tanjong Beach';
            document.getElementById('place-desc').innerText = 'If you’re looking for a beach that won’t have you worrying about breaking social distancing measures, consider Tanjong Beach in Sentosa. Sure, it’s still regularly populated but the vast amount of space means you’ll still be able to get a shaded, isolated spot under one of the many palm trees.       Don’t worry if you change your mind and end up having FOMO. Just within walking distance is Tanjong Beach Club – a seaside bar that offers food, drinks, day beds and a pool to get a soak in. ';
    
            displayOtherPlaces(map, searchResultLayer, 1.2415, 103.8295);
        });
    
        // pulau ubin
        document.querySelector('#pulau-ubin-mbl').addEventListener('click', ()=>{
            document.getElementById('pulau-ubin').click();
        });
        document.querySelector('#pulau-ubin').addEventListener('click', ()=>{
            document.getElementById('img-place').src = 'images/pulau-ubin.jpg';
            document.getElementById('other-places-title').innerText = 'Pulau Ubin';
            document.getElementById('place-desc').innerText = 'A very popular escape for locals, Pulau Ubin is likened to a time capsule that transports visitors back to the Singapore of the 60s. From traditional residences to the rocky crags that jut out from its shore, this place is a rustic enclave that Singaporeans cherish and adore. Enjoy trekking or booking a visit to Chek Jawa, one of the last wetland reserves in Singapore, or just cycling along the biking trails if you so desire. To get there, take a bumboat from Changi Jetty which operates from sunrise to sunset daily.';
    
            displayOtherPlaces(map, searchResultLayer, 1.4135, 103.960);
        });
    
        // pulau hantu
        document.querySelector('#pulau-hantu-mbl').addEventListener('click', ()=>{
            document.getElementById('pulau-hantu').click();
        });
        document.querySelector('#pulau-hantu').addEventListener('click', ()=>{
            document.getElementById('img-place').src = 'images/pulau-hantu.jpg';
            document.getElementById('other-places-title').innerText = 'Pulau Hantu';
            document.getElementById('place-desc').innerText = 'Hantu means ghost in Malay but that shouldn’t put you off visiting this remote island, which is populated with coral and very popular with deep sea enthusiasts. Some fascinating marine species like the giant clam can be spotted here, which make it a perfect vantage point to snorkel as well. You can also snorkel safely here and its remote beaches provide a very envious form of isolation and peace for the beach bum. To visit Pulau Hantu, charter a boat from West Coast Pier.';
    
            displayOtherPlaces(map, searchResultLayer, 1.225, 103.752);
        });
    
        // national gallery
        document.querySelector('#national-gallery-mbl').addEventListener('click', ()=>{
            document.getElementById('national-gallery').click();
        });
        document.querySelector('#national-gallery').addEventListener('click', ()=>{
            document.getElementById('img-place').src = 'images/national-gallery.png';
            document.getElementById('other-places-title').innerText = 'National Gallery';
            document.getElementById('place-desc').innerText = 'When the National Gallery opened, it made a major impact on the art world. It houses the largest public collection of Singaporean and Southeast Asian art in the world! The building alone is breathtaking and the facilities are state-of-the-art. It’s home to some amazing restaurants and, perhaps most importantly, the stories from within are a reflection of Singapore’s history, values and vision. Head to the rooftop garden or rooftop bar Smoke & Mirrors for some a-maze-ing fun! National Gallery Singapore, 1 St. Andrew’s Road, Singapore 178957';
    
            displayOtherPlaces(map, searchResultLayer, 1.2905, 103.8518);
        });
    
        // national museum
        document.querySelector('#national-museum-mbl').addEventListener('click', ()=>{
            document.getElementById('national-museum').click();
        });
        document.querySelector('#national-museum').addEventListener('click', ()=>{
            document.getElementById('img-place').src = 'images/national-museum.png';
            document.getElementById('other-places-title').innerText = 'National Museum';
            document.getElementById('place-desc').innerText = 'If you want to know more about our little red dot, the National Museum of Singapore is the place to go. Established in 1887, the city’s oldest museum delivers our history and culture through live performances and modern multimedia exhibits. Permanent galleries to visit include the Singapore History Gallery, which charts the development of the city. National Museum of Singapore, 93 Stamford Road, Singapore 178897';
    
            displayOtherPlaces(map, searchResultLayer, 1.2965, 103.8484);
        });
    
        // artscience museum
        document.querySelector('#artscience-museum-mbl').addEventListener('click', ()=>{
            document.getElementById('artscience-museum').click();
        });
        document.querySelector('#artscience-museum').addEventListener('click', ()=>{
            document.getElementById('img-place').src = 'images/artscience-museum.png';
            document.getElementById('other-places-title').innerText = 'ArtScience Museum';
            document.getElementById('place-desc').innerText = 'Combining art, science, design, media, architecture and technology, ArtScience Museum has housed notable exhibits and works from iconic artists including Andy Warhol, Salvatore Dali and Leonardo da Vinci. A permanent exhibit you have to add to your list is Future World, which features interactive digital installations and gets refreshed every few months. ArtScience Museum, 6 Bayfront Avenue, Singapore 018974';
    
            displayOtherPlaces(map, searchResultLayer, 1.2863, 103.8593);
        });
    
        // vintage museum
        document.querySelector('#vintage-museum-mbl').addEventListener('click', ()=>{
            document.getElementById('vintage-museum').click();
        });
        document.querySelector('#vintage-museum').addEventListener('click', ()=>{
            document.getElementById('img-place').src = 'images/vintage-museum.jpg';
            document.getElementById('other-places-title').innerText = 'Vintage Museum';
            document.getElementById('place-desc').innerText = 'If you find a special sort of charm in vintage photography equipment, pay a visit to this museum at Jalan Kledek. Founded by businessman Solaiyappan Ramanathan and his artist cousin AP Shreethar, it boasts an incredible collection of more than a thousand vintage cameras. The building itself is set in the form of a massive camera, and it holds the distinction of being the world’s biggest camera-shaped building. Vintage Cameras Museum Singapore, 8C-8D Jalan Kledek, Singapore 199263';
    
            displayOtherPlaces(map, searchResultLayer, 1.3035, 103.8590);
        });
    
        document.querySelectorAll(".small-icon").forEach(icon => {
            icon.addEventListener('click', ()=>{
                document.querySelectorAll(".small-icon").forEach(smallIcon => {
                    smallIcon.classList.add("d-none");
                })
            })
        });
    
        document.querySelectorAll(".exit-modal").forEach(btn => {
            btn.addEventListener('click', ()=>{
                document.querySelectorAll(".small-icon").forEach(exitBtn => {
                    exitBtn.classList.remove("d-none");
                    exitBtn.classList.add(["d-sm-inline", "d-md-inline", "d-lg-inline"]);
                })
            })
        });
    }
}

// main();