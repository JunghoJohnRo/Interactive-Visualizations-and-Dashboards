function buildMetadata(sample) {
  console.log("Build metadata"); 

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
    var url = `/metadata/${sample}`;
    d3.json(url).then(function(response) {

      var sampleData = d3.select("#sample-metadata");
      
    // Use `.html("") to clear any existing metadata
      sampleData.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new tags for each key-value in the metadata.
      Object.entries(response).forEach(([key,value]) => {
        var row = sampleData.append("p");
        row.text(`${key}: ${value}`);
      });
    // BONUS: Build the Gauge Chart
    buildGauge(response.WFREQ);
    }); 
}

function buildCharts(sample) {
  console.log("Build new chart");

  // @TODO: Use `d3.json` to fetch the sample data for the plots
    var url = `/samples/${sample}`;
    d3.json(url).then(function(data) {
    
      console.log(data);
    
      var xValues = data.otu_ids;
      var yValues = data.sample_values;
      var markerSize = data.sample_values;
      var markerColor = data.otu_ids;
      var textValues = data.otu_labels;

    // @TODO: Build a Bubble Chart using the sample data
      var trace1 = {
        x: xValues,
        y: yValues,
        text: textValues,
        mode: "markers",
        marker: {
          color: markerColor,
          size: markerSize}
      };

      var bubbledata = [trace1];

      var bubbleLayout = {
        xaxis: {title: "OTU ID"}
      };

      Plotly.newPlot("bubble", bubbledata, bubbleLayout);

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values, otu_ids, and labels (10 each).
      var pieValue = data.sample_values.slice(0,10);
      var pieLabel = data.otu_ids.slice(0,10);
      var hoverText = data.otu_labels.slice(0,10);

      var trace2 = {
        values: pieValue,
        labels: pieLabel,
        hovertext: hoverText,
        type: "pie"
      };

      var pieData = [trace2];
      
      var pieLayout = {
        showlegend: true
      };

      Plotly.newPlot("pie", pieData, pieLayout);
  });
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
