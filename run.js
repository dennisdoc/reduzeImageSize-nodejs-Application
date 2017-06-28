var tinify = require("tinify");
var fs = require('fs');



var path=process.argv[2];
tinify.key = process.argv[3];

if(path==undefined){
	console.log(new Error("Definir Parametro de url"));
}else{
	console.log("Lendo" +path );
	var valoresFazendo=0;
	fs.readdir(path, function(err, items) {
	    if(items==undefined){
	    	console.log(new Error("Caminho Invalido"));
		}else{
			var fila=0;
			console.log(items.length);
		    for (var i=0; i<items.length; i++) {
		    	console.log(i);
		    	var filePath=path+items[i];
		        console.log(filePath);

		        
		        var finalFile=path+"optmized/"+items[i];
				var ext = items[i].substr(items[i].lastIndexOf('.') + 1);
		        if (fs.existsSync(finalFile)) {
		        	console.log("otimizado ja existente");
		        	fila++;
		        	verificaProgresso(fila,items);
		        }else{
		        	if(extensoesDisponiveis(ext)){
					    var source = tinify.fromFile(filePath);
		    			var resized = source.resize({
						  method: "scale",
						  height: 300
						});
		        		
						resized.toFile(finalFile).then(function(){
							console.log("finished");
							console.log(finalFile);
							valoresFazendo++
		        			console.log(valoresFazendo);
							verificaProgresso(fila,items);
						},function(error){
							console.log(new Error(error));
						});
					  }else{
					  	console.log("Extensão Invalida");
					  }
				}
		    }

		    
		}
	});
}

function verificaProgresso(fila,items){
	fila++;
	if(fila==items.length-1){
		process.exit();
	}
}

function extensoesDisponiveis(ext){
	switch(ext){
		case "jpg":
			return true
		case "jpeg":
			return true
		case "png":
			return true
		default:
			return false
	
	}

}