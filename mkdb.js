/*
TODO , normalize all traditional and variants to simplified Chinese
*/
var yinshun="*.xml";
var tei=require("ksana-document").tei;

var do_div=function(text,tag,attributes,status) {
	return null;
}
var do_head=function(text,tag,attributes,status) {
	if (!text) return;
	return [	{path:["head"],value:text},
		      {path:["head_depth"],value:status.tagStack.length},
		      {path:["head_voff"],value:status.vpos}
		    ]
}

var captureTags={
	"div":do_div,
	"head":do_head,
};

var beforebodystart=function(s,status) {
}
var afterbodyend=function(s,status) {
	//status has parsed body text and raw body text, raw start text
	//var apps=tei(status.starttext+s,status.parsed,status.filename,config);
	//console.log(apps)
}
var warning=function() {
	console.log.apply(console,arguments);
}

var onFile=function(fn) {
	process.stdout.write("indexing "+fn+"\033[0G");
}
var initialize=function() {
}
var finalized=function(session) {
	console.log("VPOS",session.vpos);
	console.log("FINISHED")
}
var finalizeField=function(fields) {

}
var config={
	name:"yinshun"
	,config:"simple1"
	,glob:yinshun
	,pageSeparator:"pb.n"
	,format:"TEIP5"
	,bodystart: "<body>"
	,bodyend : "</body>"
	,reset:true
	,initialize:initialize
	,finalized:finalized
	,finalizeField:finalizeField
	,warning:warning
	,captureTags:captureTags
	,callbacks: {
		beforebodystart:beforebodystart
		,afterbodyend:afterbodyend
		,onFile:onFile
	}
}
setTimeout(function(){ //this might load by gulpfile-app.js
	if (!config.gulp) require("ksana-document").build();
},100)
module.exports=config;