

	
var	margin = {top: 30, right: 20, bottom: 30, left: 50},
	width = 400,
	height = 300;
	    radius = Math.max(width, height) / 3.5;


var color = d3.scale.ordinal()
    .range(["#25467a", "#cccccc", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 40);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.size; });

var svg = d3.select("#area6").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + 190 + "," + 120 + ")");

d3.csv("data/sentiments.csv", type, function(error, data) {
  if (error) throw error;

  var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.text); });

  g.append("text")
      .attr("transform", function(d) {
        var _d = arc.centroid(d);
        _d[0] *= 1.5;	//multiply by a constant factor
        _d[1] *= 1.5;	//multiply by a constant factor
        return "translate(" + _d + ")";
      })
      .attr("dy", ".35em")
	  .style("text-anchor", "middle")
      .text(function(d) { return (d.data.text)+'\n\n'+(d.data.size)*100+'%'; })
	  ;
});

function type(d) {
  d.size = +d.size;
  return d;
}