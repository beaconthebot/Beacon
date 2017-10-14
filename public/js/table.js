
var tabulate = function (data,columns) {
  var table = d3.select('#table1')
  .append('table')
  .attr("style", "font-size:11pt")

	var thead = table.append('thead')
	var tbody = table.append('tbody')


	  
	  	var rows = tbody.selectAll('tr')
	    .data(data)
	    .enter()
	  .append('tr')

		
	  	

		var inner=rows
		.append('tr')
		
		.text(function(d) { return d.documentname; });
	 
	 var detail=inner.append('tr')
	 .attr("class","trdetail")
	 .text(function(d) { return d.sentiment; });
	 
	 inner.append('tr').text(function(d) { return d.score; });

  return table;
}

d3.csv('data/documentsentiment.csv',function (data) {
	var columns = ['documentname','sentiment','score']
	
  tabulate(data,columns)
})