// main Jison

$(document).ready(function() {		// .ready
   $("#fileinput").change(calculate);	//.change
});

function calculate (evt){
	var fichero = evt.target.files[0];
	
	if (fichero) {
    var r = new FileReader();

    r.onload = function(e) { 
      var contents = e.target.result;	
      //alert("contents: "+contents);
      //initialinput.innerHTML = contents;	

			try {
				//result = music.parse("Do");
				var result = music.parse(contents);
			
				//__Dibujar notas:
				var SMR = new InitSMR();
				for (var i in result){
					switch (result[i].tipo){
						case "nota":
							SMR.drawNote(result[i].valor);
							break;
						case "bemol":
							SMR.drawBem(result[i].valor);
							break;
						case "linea": 
							SMR.divisionLine();
							break;
						case "dobleLinea": 
							SMR.doubleLine();
							break;
						case "compas":
							SMR.drawComp(result[i].valor.n, result[i].valor.d);
							break;
						case "ligadura":
							SMR.ligadura(result[i].valor.start, result[i].valor.end);
							break;
						case "clave":
							SMR.drawStaff();
							SMR.drawSolClave();
							break;
						default:
							alert("Tipo incorrecto.");	
					}
				}
				//SMR.ligadura(1,4);
				//__
			} catch (error) {
				//alert("Entrada incorrecta");
				alert (error);
			}
    }
    r.readAsText(fichero); // Leer como texto
  } else { 
    alert("Fichero no detectado");
  }
	
}
