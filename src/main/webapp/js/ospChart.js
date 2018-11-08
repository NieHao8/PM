/*
 *
 *   OSP - Operation Support Platform
 *
 */
//using chart.js

function drawSingleBarChart(chartId, dataMap){
	
	var labels = [];
	var data = [];
	for(var k in dataMap){
		labels.push(k);
		data.push(dataMap[k]);
	}
	
	
	var barData = {
	        labels: labels,
	        datasets: [
	            {
	            	label: "Example dataset",
	                fillColor: "rgba(26,179,148,0.5)",
	                strokeColor: "rgba(26,179,148,0.7)",
	                pointColor: "rgba(26,179,148,1)",
	                pointStrokeColor: "#fff",
	                pointHighlightFill: "#fff",
	                pointHighlightStroke: "rgba(26,179,148,1)",
	                data: data
	            }
	        ]
	    };

	    var barOptions = {
	        scaleBeginAtZero: true,
	        scaleShowGridLines: true,
	        scaleGridLineColor: "rgba(0,0,0,.05)",
	        scaleGridLineWidth: 1,
	        barShowStroke: true,
	        barStrokeWidth: 2,
	        barValueSpacing: 10,//space between two x-arix values
	        barDatasetSpacing: 1,//space between two datasets
	        responsive: true,
	    }

	    var barChartCtx = document.getElementById(chartId).getContext("2d");
	    var myBarChart = new Chart(barChartCtx).Bar(barData, barOptions);
	
}





