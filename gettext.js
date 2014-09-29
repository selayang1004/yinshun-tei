var kde=require("ksana-document").kde;

kde.open("yinshun",function(db){
	var fileid=1, pageid=1;
	var content=db.get(["fileContents",fileid,pageid]);
	console.log(content);  //y01.xml first page after <body>
});
