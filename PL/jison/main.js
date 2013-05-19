// main Jison

//var SMR = new InitSMR();
//var SMR;
var result;
$(document).ready(function() {		// .ready
   $("#fileinput").change(calculate);	//.change
});

/*function dibujaElementos(elementos){
	for (var i in elementos){
		
	}
}*/

function calculate (evt){
	
	var fichero = evt.target.files[0];

	//var result = music.parse($("input").val());
	//$("#output").html(result);
	if (fichero) {
    var r = new FileReader();	//FileR

    r.onload = function(e) { 
      var contents = e.target.result;	//	.result
      alert("contents: "+contents);
      //out.className = 'unhidden';		// Cambiar la clase de out
      //@initialinput.innerHTML = contents;	//.innerHTML
			//var result = "";
			try {
				//result = music.parse("Do");
				result = music.parse(contents);
				pintar(result);

			
			//GUARDAR	
				$("svg").appendTo("body");
				$("svg").hide();
			} catch (error) {
				//alert("Entrada incorrecta");
				alert (error);
			}
			//alert("result.length: "+result.length);
			//alert("Duration:"+result[0].valor.duration);
			
			
			//finaloutput.innerHTML = result;
			//$("#output").html(result);
			//SMR.drawStaff();
    }
    r.readAsText(fichero); // Leer como texto		//.readAsText
  } else { 
    alert("Fichero no detectado");
  }
	
}

function show(){
	$("svg").show();
}
function pintar(result){
		//__Dibujar notas:
		
					var SMR = new InitSMR();
					//SMR.drawSolClave();
					for (var i in result){
						//alert("result["+i+"].tipo: "+result[i].tipo);
						switch (result[i].tipo){
							case "nota":
								SMR.drawNote(result[i].valor);
								break;
							case "linea": 
								SMR.divisionLine();
							case "clave":
								SMR.drawStaff();
								SMR.drawSolClave();
								break;
							default:
								alert("Tipo incorrecto.");	
						}
					}
				
}

