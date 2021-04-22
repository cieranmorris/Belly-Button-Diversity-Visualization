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

        //DOUBLE CHECK IN TUTORING
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
            margin: {t: 30, l: 150}
        }

        Plotly.newPlot("bar", barArray, barLayout);

    });
}
//DRAW BUBBLECHART
//CAN WE LOOP THROUGH THIS DATA ALREADY?
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
            }

        };

        var bubbleData = [bubbleTrace];
        var bubbleLayout = {
            title: "OTU Abundance in Belly Button Biodiversity Analysis",
            showlegend: false,
            height: 600,
            width: 1000
        };

        Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    });
}

//DRAW SHOWMETADATA
function showMetadata(sampleId) {
    console.log(`showMetadata (${sampleId})`);

    d3.json("data/samples.json").then(data => {
        console.log(data);

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        var result = resultArray[0];
        console.log(result);
        
        var id = result.otu_ids;
        var ethnicity = result.ethnicity;
        

    });
}

function optionChanged(newsampleId) {
    console.log(`User selected ${newsampleId}`);

    //draw new charts when a new Sample ID is selected in dropdown menu
    drawBargraph(newsampleId);
    drawBubblechart(newsampleId);
    showMetadata(newsampleId);
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