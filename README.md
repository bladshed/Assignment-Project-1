### PROJECT OVERVIEW

This project is mainly used to find good places in the area like malls and parks. It also helps the users to check the taxi availability and the weather condition. The web application can fit multiple screen, from mobile to desktop screen. 

The main goal of this project is about help people to de-stress themselves and have a quick break in their lives to go out and find some good places in the area. Most people nowadays are stressed and one of the main reasons is the pandemic.

I believe this application will be a big help to those people who are stressed, depressed, not in a good mood or those who are in any negative energy.

[Web Application link](https://bladshed.github.io/Assignment-Project-1/)

### UI/UX

* [Wireframes link](files)

* The design main colors revolves in blue, green, red and black. I chose these colors because it represent the nature's colors, blue and green are very pleasing to the eyes, red to catch the attention, black to neutralize the colors and to make it dark so it won't stressed your eyes.

### FEATURES

* The main feature of this web application is the map navigation where when you choose your location from search or from the suggested places, it will fly you to that place so you will be able to see the exact location on the map.

* I also used chart to show the statictics of stressed people, I used chart because it's easier to show informations via chart rather than using a table and the third party chart library that I used has very good UIs.

* There is one bug from leaflet plugin (I think) where when you go to other page and go back to Maps tab, it won't be able to automatically show your location.

### TECHNOLOGIES USED

* Bootstrap
   * I used bootstrap in my entire UI web application because it's super easy to manipulate html elements and they also provide basic element designs where I was able to save a lot time in designing like my buttons, navbar, etc.

* Javascript
   * I used javascript to control all the functionalities of my application, it is like the brain of my application
   * This is the main language I used to implement all the third part libraries I used
   * Some of the advance method of the script were used like forEach, array.map, etc
   * You may find the scripts [here](scripts)

* Leaflet
   * I used leaflet for my maps (Maps tab), the reason why I chose Leaflet is because it is beginner friendly and the guides from their web page is not that complicated to understand. Also, this is the library that we used in all of our map lessons.

* Apexcharts
   * I used only one chart just to show that I am able to use a third party chart library. You may find the chart in About me tab.

* Google fonts and font awesome were used for fonts and icons.
   * They have cool fonts and icons

### TEST CASES
<html lang="en">
   <head>
      <style>
         table {
            width: 100%;
         }
      </style>
   </head>
   <body>
      <table>
         <tr>
            <th colspan=2>Home Page
         <tr>
         <tr>
            <th>Action</td>
            <th>Expected Result</td>
         <tr>
         <tr>
            <td>Click "Let's find a place to relax" button</td>
            <td>Redirects to "Maps" tab</td>
         <tr>
         <tr>
            <td>Click "Maps" tab</td>
            <td>Redirects to "Maps" tab</td>
         <tr>

      </table>
   </body>
</html>