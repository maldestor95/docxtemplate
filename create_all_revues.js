/** Création de toutes les revues
*/

var prompt = require('prompt');
var fs=require('fs');
var _=require('underscore');
var Docxtemplater = require('docxtemplater');
var modele=require('./modele.json');

var create_revue=function(modele_name,produit){
	var modele_file = './'+_.filter(modele.Revue, function(num,key){ return key==modele_name; });
	// console.log(modele_name+"***"+modele_file);
	
	var dest_file_name =modele_name+produit.code+produit.revision+".docx";

	//Load the docx file as a binary
	content = fs.readFileSync(modele_file,"binary")
	
	doc=new Docxtemplater(content);
	
	//set the templateVariables
	doc.setData(produit);
	
	//apply them (replace all occurences of {first_name} by Hipp, ...)
	doc.render();
	
	var buf = doc.getZip()
	              .generate({type:"nodebuffer"});
	
	 fs.writeFileSync(__dirname+"/output/"+dest_file_name,buf);
	// console.log("Document "+dest_file_name+" créé");
	return dest_file_name

}



 
  // 
  // Start the prompt 
  // 
  prompt.start();
 
  // 
  // Get two properties from the user: username and email 
  // 
  prompt.get(['code_produit','revision'], function (err, result) {
    // 
    // Log the results. 
    // 
    console.log('  code_produit: ' + result.code_produit);
    console.log('  Revision: ' + result.revision);
    console.log(" Création des documents suivant dans le répertoire /output/")
	var produit_to_generate=_.find(modele.setData,{"code":result.code_produit,
	"revision":result.revision});
	console.log(produit_to_generate);
	
	_.each(_.keys(modele.Revue),function(item){
	
	console.log(create_revue(item,produit_to_generate));	
});
  });