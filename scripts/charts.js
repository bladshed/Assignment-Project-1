function initChart(){
    // ---------------------------------------------------------------------------------------
    // ------------  BAR CHART  ---------------
    // ---------------------------------------------------------------------------------------
    try {
        let options = null;
        let chart = null;
        options =  {
            chart: {
                type:"bar",
                height:200,
                foreColor: "#FFFFFF"
            },
            // each series represents one set of data
            series:[
                {
                    name: 'level',
                    data:[6.1, 5.6, 5.2, 4.0, 3.3]
                }
            ],
            // what is are the labels along the x-axis (horizontal line)
            xaxis: {
                categories:['Gen Z', 'Millennials', 'Gen X:', 'Baby Boomers', 'Older Adults']
            },

                // primary colors
                colors:['#3CB371']
            
        }
        // create the chart
        chart = new ApexCharts(document.querySelector('#chart'), options);
        
        // render the chart
        chart.render();
      }
      catch(err) {
        
      }
    
    // ---------------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------
}