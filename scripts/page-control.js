function emptyAllPages(){
    document.querySelector("#main-section").innerHTML = "";
    document.querySelector("#map-main").innerHTML = "";
    document.querySelector("#about-me-section").innerHTML = "";
}
function loadHomepageHTML(){
    emptyAllPages();
    document.querySelector("#main-section").innerHTML = `
    <div id="cover" class="d-flex justify-content-center align-items-center">
        <div class="text-center">
            <p>Hello there, feeling stressed?</p>
            <h1>Have a time out, go out and get some fresh air :)</h1>
            <button class="btn-lg btn-success mt-3 map-page" id="find-btn">Let's find a place to relax</button>
        </div>
    </div>
    `;
}

function loadMapPageHTML(){
    emptyAllPages();
    document.querySelector("#map-main").innerHTML = `
    <div class="col-12 col-lg-10">
        <!-- map container start -->
        <div id="map-container"></div>
        <!-- map container end -->

        <!-- small icons mobile start -->
        <a href="#" id="more-places" data-bs-toggle="modal" data-bs-target="#otherPlacesMblModal" class="small-icon d-flex justify-content-center align-items-center d-lg-none d-xl-none">
        <i class="fas fa-star" style="font-size:20px"></i>
        </a>
        <a href="#" id="search-mbl" data-bs-toggle="modal" data-bs-target="#searchMblModal" class="small-icon d-flex justify-content-center align-items-center d-lg-none d-xl-none">
        <i class="fas fa-search-plus" style="font-size:20px"></i>
        </a>
        <!-- small icons mobile end -->
    </div>

    <div id="map-section" class="col-lg-2 d-none d-md-none d-lg-inline d-flex flex-column align-items-center">
        <!-- suggested places start -->
        <div id="most-visited" class="mt-3 w-100 align-items-start d-none d-sm-none d-md-none d-lg-block d-xl-block">
        <h4 class="mx-1 d-lg-none d-xl-inline">Suggested Places:</h4>
        <h5 class="mx-1 d-lg-inline d-xl-none">Suggested Places:</h5>
        <ul class="d-flex flex-column align-items-start">
            <li><a href="#" data-bs-toggle="modal" class="mb-2 mx-3" id="tanjong-beach" data-bs-target="#otherPlacesModal">Tanjong Beach</a></li>
            <li><a href="#" data-bs-toggle="modal" class="mb-2 mx-3" id="pulau-ubin" data-bs-target="#otherPlacesModal">Pulau Ubin</a></li>
            <li><a href="#" data-bs-toggle="modal" class="mb-2 mx-3" id="pulau-hantu" data-bs-target="#otherPlacesModal">Pulau Hantu</a></li>
            <li><a href="#" data-bs-toggle="modal" class="mb-2 mx-3" id="national-gallery" data-bs-target="#otherPlacesModal">National Gallery</a></li>
            <li><a href="#" data-bs-toggle="modal" class="mb-2 mx-3" id="national-museum" data-bs-target="#otherPlacesModal">National Museum</a></li>
            <li><a href="#" data-bs-toggle="modal" class="mb-2 mx-3" id="artscience-museum" data-bs-target="#otherPlacesModal">ArtScience</a></li>
            <li><a href="#" data-bs-toggle="modal" class="mb-2 mx-3" id="vintage-museum" data-bs-target="#otherPlacesModal">Vintage Museum</a></li>
        </ul>  
        </div>
        <!-- suggested places end -->
        <hr>
        <hr>
        <!-- search map start -->
        <div id="search-container" class="justify-content-center row mt-3">
        <button class="btn-sm btn-success mb-3 me-2 col-4" id="malls-btn">MALLS</button>
        <button class="btn-sm btn-success mb-3 me-2 col-4" id="parks-btn">PARKS</button>
        <input id="search-input" class="col-10 mb-2" type="text"/>
        <button class="btn-sm btn-primary mb-3 col-10" id="search-btn">SEARCH</button>
        <div id="search-results"></div>
        </div>
        <!-- search map end -->
    </div>
    `;
}

function loadAboutmePageHTML(){
    emptyAllPages();
    document.querySelector("#about-me-section").innerHTML = `
    <div id="about-me-container" class="w-75 row justify-content-center align-items-center">
        <!-- row 1 -->
        <div class="text-center col-12">
            <br>
            <br>
            <h1>MY STORY</h1>
        </div>

        <!-- row 2 -->
        <div class="col-md-7 mx-3 mb-3">
            <p>When the pandemic hit, all our plans were shattered, so many people lost their jobs and above all, millions of people died. During the peak of pandemic, I felt really sad every time I watched the news, and it stressed me out. So one day when the situation got better, I went to a park with very little people and relaxed. It feels really good like all my worries were gone. I want to share my experience by helping people to find some time to relax during this pandemic to lessen their stress. We all know that it's very stressful nowadays.</p>
            <br>
        </div>

        <!-- row 3 -->
        <div class="page-row-3-a d-flex flex-column col-12 col-lg-5 align-items-start mx-2 my-5">
            <h1>What causes stress?</h1>
            <p>Feelings of stress are normally triggered by things happening in your life which involve:</p>
            <ul>
            <li>not having enough work, activities or change in your life</li>
            <li>being under lots of pressure</li>
            <li>facing big changes</li>
            <li>worrying about something</li>
            <li>not having much or any control over the outcome of a situation</li>
            <li>times of uncertainty</li>
            <li>having responsibilities that you're finding overwhelming</li>
            </ul>
        </div>
        <div class="page-row-3-b align-items-start col-12 col-lg-5 mx-2 my-5">
            <h1>Stress statistics by age</h1>
            <p>When asked to rate their stress level out of ten</p>
            <div id="chart"></div>
        </div>
        
        <!-- row 4 -->
        <div class="page-row-4-a d-flex flex-column col-12 col-lg-5 align-items-center mx-2 my-5">
            <img class="img-about-me" src="images/time-to-relax.jpg" alt="Time to relax">
        </div>
        <div class="page-row-4-b align-items-start col-12 col-lg-5 mx-2 my-5">
            <h1>The journey to relaxation</h1>
            <p>My goal is to help you de-stress yourself by providing you some great places in the area. Find a place where you can enjoy, relax, breath and see beautiful places that will re-energize your soul.</p>
        </div>

        <!-- row 5 -->
        <div class="page-row-5-a align-items-start col-12 col-lg-5 mx-2 my-5">
            <h1>Quick guide</h1>
            <ol>
            <li>Go to your current location</li>
            <li>Map will go to our suggested places</li>
            <li>Search your favorite malls or parks</li>
            </ol>
        </div>
        <div class="page-row-5-b d-flex flex-column col-12 col-lg-5 align-items-center mx-2 my-5">
            <img class="img-about-me" src="images/map-guide.png" alt="Time to relax">
        </div>

        <!-- row 2 -->
        <div class="text-center col-12">
            <h1>"Sometimes all you need is a little fresh air" -anonymous</h1>
        </div>
    </div>
    `;
}

// home page
document.querySelector("#home-page").addEventListener('click', async (event)=>{
    event.preventDefault();
    event.stopPropagation();
    document.querySelector("#main-section").classList.remove("d-none");
    document.querySelector("#map-main").classList.add("d-none");
    document.querySelector("#about-me-section").classList.add("d-none");

    document.querySelector("#home-page").classList.add("active");
    document.querySelector("#map-page").classList.remove("active");
    document.querySelector("#about-me-page").classList.remove("active");
    loadHomepageHTML();

    // map page
    findBtnListener();
});

// map page
document.querySelector("#map-page").addEventListener('click', async (event)=>{
    event.preventDefault();
    event.stopPropagation();
    document.querySelector("#main-section").classList.add("d-none");
    document.querySelector("#map-main").classList.remove("d-none");
    document.querySelector("#about-me-section").classList.add("d-none");

    document.querySelector("#home-page").classList.remove("active");
    document.querySelector("#map-page").classList.add("active");
    document.querySelector("#about-me-page").classList.remove("active");
    loadMapPageHTML();
    await main();
});

function findBtnListener(){
    // map page
    document.querySelector("#find-btn").addEventListener('click', async (event)=>{
        event.preventDefault();
        event.stopPropagation();
        document.querySelector("#main-section").classList.add("d-none");
        document.querySelector("#map-main").classList.remove("d-none");
        document.querySelector("#about-me-section").classList.add("d-none");

        document.querySelector("#home-page").classList.remove("active");
        document.querySelector("#map-page").classList.add("active");
        document.querySelector("#about-me-page").classList.remove("active");
        loadMapPageHTML();
        await main();
    });
}
findBtnListener();

// about me page
document.querySelector("#about-me-page").addEventListener('click', (event)=>{
    event.preventDefault();
    event.stopPropagation();
    document.querySelector("#main-section").classList.add("d-none");
    document.querySelector("#map-main").classList.add("d-none");
    document.querySelector("#about-me-section").classList.remove("d-none");

    document.querySelector("#home-page").classList.remove("active");
    document.querySelector("#map-page").classList.remove("active");
    document.querySelector("#about-me-page").classList.add("active");
    loadAboutmePageHTML();
    initChart();
});