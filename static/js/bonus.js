function buildGauge(wfreq) {
    
// Enter the washing frequency 
var level = parseFloat(wfreq)*20;

// Trig to calc meter point
var degrees = 180 - level,
     radius = .5;
var radians = degrees * Math.PI / 180;
var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians);

// Path: may have to change to create a better triangle
var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
     pathX = String(x),
     space = ' ',
     pathY = String(y),
     pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);

var data = [{ type: 'scatter',
   x: [0], y:[0],
    marker: {size: 28, color:'850000'},
    showlegend: false,
    name: 'Wash Frequency Level',
    text: level,
    hoverinfo: 'text+name'},
  { values: [20/9, 20/9, 20/9, 20/9, 20/9, 20/9, 20/9, 20/9, 20/9, 20],
  rotation: 90,
  text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
  textinfo: 'text',
  textposition:'inside',
  marker: {colors:["rgb(0,69,41)",  
  "rgb(0,104,55)",
  "rgb(35,132,67)",
  "rgb(65,171,93)", 
  "rgb(120,198,121)", 
  "rgb(173,221,142)", 
  "rgb(217,240,163)",
  "rgb(247,252,185)", 
  "rgb(255,255,229)",
  'rgba(255, 255, 255, 0)']},
  labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3','1-2', '0-1', ''],
  hoverinfo: 'label',
  hole: .5,
  type: 'pie',
  showlegend: false
}];

var layout = {
  shapes:[{
      type: 'path',
      path: path,
      fillcolor: '850000',
      line: {
        color: '850000'
      }
    }],
  title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
  xaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]},
  yaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]}
};

Plotly.newPlot('gauge', data, layout);
}

