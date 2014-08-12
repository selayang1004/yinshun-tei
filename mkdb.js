/*
TODO , normalize all traditional and variants to simplified Chinese
*/
var yinshun="*.xml";
var tei=require("ksana-document").tei;

var do_div=function(text,tag,attributes,status) {
	return null;
}
var do_title=function() {
	var t=this.text.trim();
	if (!t) return;
	return [	{path:["head"],value:t},
		      {path:["head_depth"],value:1},
		      {path:["head_voff"],value:this.status.fileStartVpos}
	];
	//console.log(this.text.trim(),this.status.fileStartVpos);
}
var do_head=function(text,tag,attributes,status) {
	if (!text) return;
	return [	{path:["head"],value:text.trim()},
		      {path:["head_depth"],value:status.tagStack.length+1},
		      {path:["head_voff"],value:status.vpos}
		    ]
}

var captureTags={
	"div":do_div,
	"head":do_head,
};

var beforebodystart=function(s,status) {
	tei(s,status.parsed,status.filename,config,status);
}
var afterbodyend=function(s,status) {
	//status has parsed body text and raw body text, raw start text
	
	//console.log(apps)
}
var warning=function() {
	console.log.apply(console,arguments);
}

var onFile=function(fn) {
	if (window) console.log("indexing ",fn);
	else process.stdout.write("indexing "+fn+"\033[0G");
}
var setupHandlers=function() {
	this.addHandler(  "TEI/teiHeader/fileDesc/titleStmt/title", do_title);
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
	,setupHandlers:setupHandlers
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