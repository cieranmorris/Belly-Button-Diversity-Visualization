//This starter code is pulled from the office hours discussion with Dom
console.log("app.js is loaded");

//Create stubs for bar graph, bubble chart, and demographic metadata
function drawBargraph(sampleId) {
    console.log(`drawBargraph(${sampleId})`);

    d3.json("data/samples.json").then(data => {
        //console.log(data);

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        var result = resultArray[0];

        // console.log(result);

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        // console.log(otu_ids);

        var sample_values = result.sample_values;
        // console.log(sample_values);

        yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();

        var barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0, 10).reverse(),
            orientation: "h"
        }

        var barArray = [barData];
        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150},
            xaxis: {
                title: {
                    text: "Sample Values"
                },
            },
            yaxis: {
                title: {
                    text: "OTU IDs",
                },
            },
        }

        Plotly.newPlot("bar", barArray, barLayout);

    });
}
//DRAW BUBBLECHART
function drawBubblechart(sampleId) {
    console.log(`drawBubblechart(${sampleId})`);

    d3.json("data/samples.json").then(data => {
        console.log(data);

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        var result = resultArray[0];
       

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        

        var sample_values = result.sample_values
        console.log(sample_values);

        //Use trace to create bubble chart markers
        var bubbleTrace = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids, 
                colorscale: "Portland"
            },
        };

        var bubbleData = [bubbleTrace];
        var bubbleLayout = {
            title: "OTU Abundance in Belly Button Biodiversity Analysis",
            showlegend: false,
            height: 600,
            width: 1000,
            xaxis: {
                title: {
                    text: "OTU ID",
                },
            },
            yaxis: {
                title: {
                    text: "Sample Values",
                },
            },
        };

        Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    });
}

//DRAW SHOWMETADATA
function showMetadata(sampleId) {
    console.log(`showMetadata (${sampleId})`);

    d3.json("data/samples.json").then(data => {
        console.log(data);

        var metadata = data.metadata;
        var resultArray = metadata.filter(s => s.id == sampleId);
        var result = resultArray[0];
        console.log(result);
        

        //select handle using d3.select
        var demoTable = d3.select("#sample-metadata");

        //empty table
        demoTable.html("");


        Object.entries(result).forEach(function([key, value]) {
            // var itemTag = console.log(`key ${key} value ${value}`)
            var itemTag = `${key.toUpperCase()} : ${value}`;

            demoTable.append("h6").text(itemTag)
        });

        var wfreq = result.wfreq;
        createGauge(wfreq);
        

    });
}

function optionChanged(newsampleId) {
    console.log(`User selected ${newsampleId}`);

    //draw new charts when a new Sample ID is selected in dropdown menu
    drawBargraph(newsampleId);
    drawBubblechart(newsampleId);
    showMetadata(newsampleId);
}


//Gauge Chart

function createGauge(wfreq) {
    console.log("creating gauge with ", wfreq);

    var data = [
        {
          value: wfreq,
          title: { text: "Weekly Belly Button Washing Frequency" },
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            axis: { range: [null, 9], tickwidth:  1, tickmode: "linear"},
            bar:  {color:  "#00b3b3"},
            steps: [
              { range: [0, 1], color: "#ffe0cc" },
              { range: [1, 2], color: "#ffd1b3" },
              { range: [2, 3], color: "#ffc299" },
              { range: [3, 4], color: "#ffb380" },
              { range: [4, 5], color: "#ffa366" },
              { range: [5, 6], color: "ff944d" },
              { range: [6, 7], color: "#ff8533" },
              { range: [7, 8], color: "#ff751a" },
              { range: [8, 9], color: "#ff6600" }
            ],
            threshold: {
              line: { color: "black", width: 4 },
              thickness: 0.75,
              value: wfreq
            }
          }
        }
      ];
      
      var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
      Plotly.newPlot('gauge', data, layout);
}

function InitDashboard() {
    console.log("InitDashboard()");

    //populate dropdown
    var selector = d3.select("#selDataset");

    //read data from samples.json using D3
    d3.json("data/samples.json").then(data => {
        // console.log(data);

        var sampleNames = data.names;

        sampleNames.forEach(sampleId => {
            selector.append("option")
                .text(sampleId)
                .property("value", sampleId);
        });

        
        var id = sampleNames[0];

        //Draw graphs and metadata
        drawBargraph(id);
        drawBubblechart(id);
        showMetadata(id);
    });

}
InitDashboard();