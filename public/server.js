
'use strict';

var http = require('http');
var math = require('math');
var bodyParser = require('body-parser');
var childprocess=require('child_process');

const DiscoveryV1 = require('watson-developer-cloud/discovery/v1');
const fs = require('fs');

var r={};
var jsonoutput={};
var entities_output={};
var agg_first={};
var agg_second={};
var agg_third={};
var checkglobal={};
var results={};
var document_count={};
	var total=0;
	var result=0;
var filesavepath="public/data/"
	
const express = require('express');
const app = express();
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));

app.use(express.static(__dirname + '/css'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.get('/', function (req, res) {
 res.sendFile(__dirname + '/public/static/index.html');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})

const discovery = new DiscoveryV1({
  // if left unspecified here, the SDK will fall back to the DISCOVERY_USERNAME and DISCOVERY_PASSWORD
  // environment properties, and then Bluemix's VCAP_SERVICES environment property
  // username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  // password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE'
  username: 'e6cddeed-f7fb-4f1a-897b-9d5613cea367',
  password: 'tkCNMMQa8Ine',
  version_date: '2017-08-01'
});

app.post('/input', function (req,res) {
	
discovery.environmentId = 'system';
discovery.collectionId = 'news';

const env_id=discovery.environmentId
const coll_id=discovery.collectionId
var qy='';	
var qydetail='enriched_text.concepts.text:"Breast Cancer"'

const ct=10;

var sentiment_value=sentiment();

const entitydetaildrug = {
	environment_id:env_id,
	collection_id:coll_id,
  query:qydetail,
  count:10,
  aggregation: ['nested(enriched_text.entities).filter(enriched_text.entities.type:Drug).term(enriched_text.entities.text, count:10)'],
  return: 'enriched_text.entities.text,enriched_text.entities.type,enriched_text.entities.relevance'
};

const entitydetailfacility = {
	environment_id:env_id,
	collection_id:coll_id,
  query:qydetail,
  count:10,
  aggregation: ['nested(enriched_text.entities).filter(enriched_text.entities.type:Facility).term(enriched_text.entities.text, count:10)'],
  return: 'enriched_text.entities.text,enriched_text.entities.type,enriched_text.entities.relevance'
};

const entitydetailperson = {
	environment_id:env_id,
	collection_id:coll_id,
  query:qydetail,
  count:10,
  aggregation: ['nested(enriched_text.entities).filter(enriched_text.entities.type:Person).term(enriched_text.entities.text, count:10)'],
  return: 'enriched_text.entities.text,enriched_text.entities.type,enriched_text.entities.relevance'
};

const entitydetailcompany = {
	environment_id:env_id,
	collection_id:coll_id,
  query:qydetail,
  count:10,
  aggregation: ['nested(enriched_text.entities).filter(enriched_text.entities.type:Company).term(enriched_text.entities.text, count:10)'],
  return: 'enriched_text.entities.text,enriched_text.entities.type,enriched_text.entities.relevance'
};

const entityextraction = {
	environment_id:env_id,
	collection_id:coll_id,
  query:qy,
  count:10,
  aggregation: ['term(enriched_text.entities.text,count:5)'],
  return: 'enriched_text.entities.text'
};

const conceptsextraction = {
	environment_id:env_id,
	collection_id:coll_id,
  query:qy,
  count:10,
  aggregation: ['term(enriched_text.concepts.text,count:5)'],
  return: 'enriched_text.concepts.text'
};

const forentirejson = {
	environment_id:env_id,
	collection_id:coll_id,
  query:qydetail,
  count:5
};

const getdocumentcount = {
	environment_id:env_id,
	collection_id:coll_id};

discovery.getCollection(getdocumentcount, function(error, data) {
  var resultset=(JSON.stringify(data, null, 2));
  
  
  for (var i=0;i<resultset.length;i++)
	{ 
  var document_count=(resultset[i].document_counts);
  
	}

  
});


discovery.query( 
	forentirejson, 
function(error, data) {
	if(error){
    console.error(error);
     }
  else{
	  	  fs.writeFile(filesavepath+"documentsentiment.csv","documentname,sentiment,score\n",function(err){
		  if(err){
			  return console.log(err);
		  }  });
	  
	      r.myValue=(JSON.stringify(data, null, 2));
		  var jsonoutput=JSON.parse(r.myValue);
	var results=(jsonoutput.results);
		 
	for (var i=0;i<results.length;i++)
	{
		var score=(results[i].score);
		var percentage=math.round((score*100),1);
		var sentiment_label=(results[i].enriched_text.sentiment.document.label);
		 
		var filename=(results[i].extracted_metadata.filename);
				
				var text=(results[i].text);
				var findposition=text.indexOf("Speaker 1")
				var trimmed=text.substr(findposition,50);
				var spacetrimmed=trimmed.trim()
				var myresult=filename+","+sentiment_label+","+percentage+"%"
				
							     fs.appendFile(filesavepath+"documentsentiment.csv",myresult+"\n",function(err){
		  if(err){
			  return console.log(err);
		  }  
		  });	

	}

	
				
	

	

  }
});







function sentiment(){
	
	const sentimentextraction = {
	environment_id:env_id,
	collection_id:coll_id,
  query:qy,
  count:10,
  aggregation: ['term(enriched_text.sentiment.document.label,count:3)'],
  return: 'enriched_text.sentiment.document.label'
};

function sentiment_take(){
	

	discovery.query( 
	sentimentextraction, 
function(error, data) {
	if(error){
    console.error(error);
     }
  else{
	  fs.writeFile(filesavepath+"sentiments.csv","text,size\n",function(err){
		  if(err){
			  return console.log(err);
		  }  });
	
    r.myValue=(JSON.stringify(data, null, 2));
	var jsonoutput=JSON.parse(r.myValue);
	var sentiment_total=(jsonoutput.aggregations);

	 for (var i=0;i<sentiment_total.length;i++){
		 var agg_second=(sentiment_total[i].results);
		 
		  
	 }
	 for (var i=0;i<agg_second.length;i++){
		 
		 var resultkey=agg_second[i].key;
		 var result=agg_second[i].matching_results;
		 
		 
		 
		 total=total+result;
		 
		 
		 var positive= agg_second[i].matching_results/total;
		 var negative=1-positive;
		 
	
		 
	 }
	 
	 
	 total=0;
		     fs.appendFile(filesavepath+"sentiments.csv","Positive,"+positive+"\n",function(err){
		  if(err){
			  return console.log(err);
		  }  
		  });
		  		     fs.appendFile(filesavepath+"sentiments.csv","Negative,"+negative+"\n",function(err){
		  if(err){
			  return console.log(err);
		  }  
		  });
		  

		  
		 
		  
  }
  }
  );
}
sentiment_take();	
};


	
	discovery.query(
	conceptsextraction, 
function(error, data) {
	if(error){
    console.error(error);
     }
  else{
	    fs.writeFile(filesavepath+"concepts.csv","text,size\n",function(err){
		  if(err){
			  return console.log(err);
		  }  });
    r.myValue=(JSON.stringify(data, null, 2));
	var jsonoutput=JSON.parse(r.myValue);
	var sentiment_total=(jsonoutput.aggregations);

	 for (var i=0;i<sentiment_total.length;i++){
		 var agg_second=(sentiment_total[i].results);
		 
		  
	 }
	 for (var i=0;i<agg_second.length;i++){
		 
		 var resultkey=agg_second[i].key;
		 var result=agg_second[i].matching_results;
		 var resultop=resultkey+","+result

	
    fs.appendFile(filesavepath+"concepts.csv",resultop+"\n",function(err){
		  if(err){
			  return console.log(err);
		  }  
		  });	
	 }


		 
  }
  }
  
  );

  
  


discovery.query(
	entityextraction, 
function(error, data) {
	if(error){
    console.error(error);
     }
  else{
	    fs.writeFile(filesavepath+"entities.csv","text,size\n",function(err){
		  if(err){
			  return console.log(err);
		  }  });
    r.myValue=(JSON.stringify(data, null, 2));
	var jsonoutput=JSON.parse(r.myValue);
	var sentiment_total=(jsonoutput.aggregations);

	 for (var i=0;i<sentiment_total.length;i++){
		 var agg_second=(sentiment_total[i].results);
		 
		  
	 }
	 for (var i=0;i<agg_second.length;i++){
		 
		 var resultkey=agg_second[i].key;
		 var result=agg_second[i].matching_results;
		 var resultop=resultkey+","+result
		 

	
    fs.appendFile(filesavepath+"entities.csv",resultop+"\n",function(err){
		  if(err){
			  return console.log(err);
		  }  
		  });	
	 }


		 
  }
  }
  );

discovery.query(
	entitydetaildrug, 
function(error, data) {
	if(error){
    console.error(error);
      }
  else{
	   fs.writeFile(filesavepath+"Top10entitiesDrug.tsv","letter\tfrequency\n",function(err){
		  if(err){
			  return console.log(err);
		  }  });
	  
    r.myValue=(JSON.stringify(data, null, 2));
	 var jsonoutput=JSON.parse(r.myValue);
	var agg_first= (jsonoutput.aggregations);
		 for (var i=0;i<agg_first.length;i++){
		 var agg_second=(agg_first[i].aggregations[i].aggregations[i].results);

	 }
	 	 for (var i=0;i<agg_second.length;i++){
		 
		 var resultkey=agg_second[i].key;
		 var result=agg_second[i].matching_results;
		 var resultop=resultkey+"\t"+result

		 	 fs.appendFile(filesavepath+"Top10entitiesDrug.tsv",resultop+"\n",function(err){
		  if(err){
			  return console.log(err);
		  }  
		  });
	 }
	 var enriched_text=(jsonoutput.results);
	   for (var i=0;i<enriched_text.length;i++){
		  var entities=(enriched_text[i].enriched_text.entities);
		   
		  }
	  for (var i=0;i<entities.length;i++){
		  var entities_output=(entities[i].text);
		  
	  }
  
  }
  }
  );
  
  discovery.query(
	entitydetailfacility, 
function(error, data) {
	if(error){
    console.error(error);
      }
  else{
	   fs.writeFile(filesavepath+"Top10entitiesfacility.tsv","letter\tfrequency\n",function(err){
		  if(err){
			  return console.log(err);
		  }  });
	  
    r.myValue=(JSON.stringify(data, null, 2));
	 var jsonoutput=JSON.parse(r.myValue);
	var agg_first= (jsonoutput.aggregations);
		 for (var i=0;i<agg_first.length;i++){
		 var agg_second=(agg_first[i].aggregations[i].aggregations[i].results);
		 

	 }
	 	 for (var i=0;i<agg_second.length;i++){
		 
		 var resultkey=agg_second[i].key;
		 var result=agg_second[i].matching_results;
		 var resultop=resultkey+"\t"+result
	
		 	 fs.appendFile(filesavepath+"Top10entitiesfacility.tsv",resultop+"\n",function(err){
		  if(err){
			  return console.log(err);
		  }  
		  });
	 }
	 var enriched_text=(jsonoutput.results);
	   for (var i=0;i<enriched_text.length;i++){
		  var entities=(enriched_text[i].enriched_text.entities);
		   
		  }
	  for (var i=0;i<entities.length;i++){
		  var entities_output=(entities[i].text);
		  
	  }
  
  }
  }
  );
  discovery.query(
	entitydetailperson, 
function(error, data) {
	if(error){
    console.error(error);
      }
  else{
	   fs.writeFile(filesavepath+"Top10entitiesperson.tsv","letter\tfrequency\n",function(err){
		  if(err){
			  return console.log(err);
		  }  });
	  
    r.myValue=(JSON.stringify(data, null, 2));
	 var jsonoutput=JSON.parse(r.myValue);
	var agg_first= (jsonoutput.aggregations);
		 for (var i=0;i<agg_first.length;i++){
		 var agg_second=(agg_first[i].aggregations[i].aggregations[i].results);
		 

	 }
	 	 for (var i=0;i<agg_second.length;i++){
		 
		 var resultkey=agg_second[i].key;
		 var result=agg_second[i].matching_results;
		 var resultop=resultkey+"\t"+result
		 

		 	 fs.appendFile(filesavepath+"Top10entitiesperson.tsv",resultop+"\n",function(err){
		  if(err){
			  return console.log(err);
		  }  
		  });
	 }
	 var enriched_text=(jsonoutput.results);
	   for (var i=0;i<enriched_text.length;i++){
		  var entities=(enriched_text[i].enriched_text.entities);
		   
		  }
	  for (var i=0;i<entities.length;i++){
		  var entities_output=(entities[i].text);
		  
	  }
  
  }
  }
  );
  discovery.query(
	entitydetailcompany, 
function(error, data) {
	if(error){
    console.error(error);
      }
  else{
	   fs.writeFile(filesavepath+"Top10entitiescompany.tsv","letter\tfrequency\n",function(err){
		  if(err){
			  return console.log(err);
		  }  });
	  
    r.myValue=(JSON.stringify(data, null, 2));
	 var jsonoutput=JSON.parse(r.myValue);
	 checkglobal=JSON.parse(r.myValue);
	var agg_first= (jsonoutput.aggregations);
		 for (var i=0;i<agg_first.length;i++){
		 var agg_second=(agg_first[i].aggregations[i].aggregations[i].results);
		 

	 }
	 	 for (var i=0;i<agg_second.length;i++){
		 
		 var resultkey=agg_second[i].key;
		 var result=agg_second[i].matching_results;
		 var resultop=resultkey+"\t"+result
		 

		 	 fs.appendFile(filesavepath+"Top10entitiescompany.tsv",resultop+"\n",function(err){
		  if(err){
			  return console.log(err);
		  }  
		  });
	 }
	 var enriched_text=(jsonoutput.results);
	   for (var i=0;i<enriched_text.length;i++){
		  var entities=(enriched_text[i].enriched_text.entities);
		   
		  }
	  for (var i=0;i<entities.length;i++){
		  var entities_output=(entities[i].text);
		  
	  }
  
  }

  }
  
 );
 

res.send(200)

	res.render('index',{inputtext: qydetail });
});

