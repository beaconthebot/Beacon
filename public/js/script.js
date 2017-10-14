var fill = d3.scale.category20b();



d3.csv("data/entities_person.csv", function(data) {
  data.forEach(function(d) {
    d.size = +d.size;
  });

  
  d3.layout.cloud().size([700, 300])
      .words(data)
      .padding(1)
      .rotate(function() { return ~~(Math.random()); })
      .font("Verdana")
	   
      .fontSize(function(d) { return Math.max(13, Math.min(d.size, 500)); })
       
	  .on("end", draw)
	  .start();
	  
  

  function draw(words) {
    d3.select("#area3").append("svg")
        .attr("width", 850)
        .attr("height", 300)
      .append("g")
	  .attr('class','bar')
        .attr("transform", "translate(380,150)")
      .selectAll("text")
        .data(data)
      .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Verdana")
        .style("cursor", "pointer")
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")";
        })
        .text(function(d) { return d.text; })
		.on("click", function (d, i){
		window.open("http://en.wikipedia.org/wiki/"+d.text, "_blank")});
  }
  
    
});

d3.csv("data/entities_organisation.csv", function(data) {
  data.forEach(function(d) {
    d.size = +d.size;
  });

  
  d3.layout.cloud().size([700, 300])
      .words(data)
      .padding(4)
      .rotate(function() { return ~~(Math.random()); })
      .font("Verdana")
	   
      .fontSize(function(d) { return Math.max(13, Math.min(d.size, 40)); })
       
	  .on("end", draw)
	  .start();
	  
  

  function draw(words) {
    d3.select("#area4").append("svg")
        .attr("width", 850)
        .attr("height", 300)
      .append("g")
	  .attr('class','bar')
        .attr("transform", "translate(380,150)")
      .selectAll("text")
        .data(data)
      .enter().append("text")
        .style("font-size", function(d) { return d.size + "pt"; })
        .style("font-family", "Verdana")
        .style("cursor", "pointer")
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x*1.3, d.y] + ")";
        })
        .text(function(d) { return d.text; })
		.on("click", function (d, i){
		window.open("http://en.wikipedia.org/wiki/"+d.text, "_blank")});
  }
  
    
});


d3.csv("data/entities_Location.csv", function(data) {
  data.forEach(function(d) {
    d.size = +d.size;
  });

  
  d3.layout.cloud().size([700, 300])
      .words(data)
      .padding(4)
      .rotate(function() { return ~~(Math.random()); })
      .font("Verdana")
	   
      .fontSize(function(d) { return Math.max(13, Math.min(d.size, 40)); })
       
	  .on("end", draw)
	  .start();
	  
  

  function draw(words) {
    d3.select("#area5").append("svg")
        .attr("width", 850)
        .attr("height", 300)
      .append("g")
	  .attr('class','bar')
        .attr("transform", "translate(380,150)")
      .selectAll("text")
        .data(data)
      .enter().append("text")
        .style("font-size", function(d) { return d.size + "pt"; })
        .style("font-family", "Verdana")
        .style("cursor", "pointer")
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x*1.3, d.y] + ")";
        })
        .text(function(d) { return d.text; })
		.on("click", function (d, i){
		window.open("http://en.wikipedia.org/wiki/"+d.text, "_blank")});
  }
  
    
});




d3.csv("data/entities_Drug.csv", function(data) {
  data.forEach(function(d) {
    d.size = +d.size;
  });

  
  d3.layout.cloud().size([700, 300])
      .words(data)
      .padding(4)
      .rotate(function() { return ~~(Math.random()); })
      .font("Verdana")
	   
      .fontSize(function(d) { return Math.max(13, Math.min(d.size, 40)); })
       
	  .on("end", draw)
	  .start();
	  
  

  function draw(words) {
    d3.select("#area6").append("svg")
        .attr("width", 850)
        .attr("height", 300)
      .append("g")
	  .attr('class','bar')
        .attr("transform", "translate(380,150)")
      .selectAll("text")
        .data(data)
      .enter().append("text")
        .style("font-size", function(d) { return d.size + "pt"; })
        .style("font-family", "Verdana")
        .style("cursor", "pointer")
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x*1.3, d.y] + ")";
        })
        .text(function(d) { return d.text; })
		.on("click", function (d, i){
		window.open("http://en.wikipedia.org/wiki/"+d.text, "_blank")});
  }
  
    
});

d3.csv("data/entities_facility.csv", function(data) {
  data.forEach(function(d) {
    d.size = +d.size;
  });

  
  d3.layout.cloud().size([700, 300])
      .words(data)
      .padding(4)
      .rotate(function() { return ~~(Math.random()); })
      .font("Verdana")
	   
      .fontSize(function(d) { return Math.max(13, Math.min(d.size, 40)); })
       
	  .on("end", draw)
	  .start();
	  
  

  function draw(words) {
    d3.select("#area7").append("svg")
        .attr("width", 850)
        .attr("height", 300)
      .append("g")
	  .attr('class','bar')
        .attr("transform", "translate(380,150)")
      .selectAll("text")
        .data(data)
      .enter().append("text")
        .style("font-size", function(d) { return d.size + "pt"; })
        .style("font-family", "Verdana")
        .style("cursor", "pointer")
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x*1.3, d.y] + ")";
        })
        .text(function(d) { return d.text; })
		.on("click", function (d, i){
		window.open("http://en.wikipedia.org/wiki/"+d.text, "_blank")});
  }
  
    
});

