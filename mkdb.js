/*
TODO , normalize all traditional and variants to simplified Chinese
*/
var yinshun="y*.xml";
var tei=require("ksana-document").tei;

var do_div=function(text,tag,attributes,status) {
	return null;
}
var toplevels={
	0:"妙雲集上編",
	8:"妙雲集中編",
	15:"妙雲集下編",
	26:"華雨集",
	31:"雜阿含經論會編",
	34:"原始佛教及部派",
	38:"大乘及其他"
}
var do_title=function() {
	var toplevel=toplevels[this.status.filenow];
	var out=[];
	if (toplevel) {
		out=[{path:["head"],value:toplevel},
			      {path:["head_depth"],value:1},
			      {path:["head_voff"],value:this.status.fileStartVpos}
		];		
	}
	var t=this.text.trim();
	if (!t) return;		
	out=out.concat([	{path:["head"],value:t},
			      {path:["head_depth"],value:2},
			      {path:["head_voff"],value:this.status.fileStartVpos}
	]);
	return out;
	//console.log(this.text.trim(),this.status.fileStartVpos);
}
var do_head=function(text,tag,attributes,status) {
	if (!text) return;
	return [	{path:["head"],value:text.trim()},
		      {path:["head_depth"],value:status.tagStack.length+2},
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
	if (typeof window!=="undefined") console.log("indexing ",fn);
	else process.stdout.write("indexing "+fn+"\033[0G");
}
var setupHandlers=function() {
	this.addHandler(  "teiHeader/fileDesc/titleStmt/title", do_title);
}
var finalized=function(session) {
	console.log("VPOS",session.vpos);
	console.log("FINISHED")
}
var finalizeField=function(fields) {

}
var config={
	name:"yinshun"
	,meta:{
		config:"simple1"	
	}
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