// main Jison

$(document).ready(function() {		// .ready
<<<<<<< HEAD
   $("#zonaSubirText").change(calculate);	//.change
});

function UploadPentagrama(valor){
			var parametros ={"content": valor};
			  $.ajax({
			 data : parametros,
			 url : "consultas/Thumbnail.php",
			 type :"post",
			 
			 beforeSend :function(){
			 //En esta secci�n podemos poner un aviso de cargando. Para este ejmplo estoy poniendo el aviso dentro de un div
			 //$("#mensajito").html("Espere...");
			// window.alert("espera");
			 },
			 success:function(respuesta){
			//  window.alert("hecho");
			 }
			});	
	}
	
	

function show(){
	$("svg").show();
}

=======
   $("#fileinput").change(calculate);	//.change
});

>>>>>>> 757d2294c4ea3d88af28934e6368bdbe51fa8a86
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
<<<<<<< HEAD
				 var e = contents.toString();
				UploadPentagrama(e);
=======
			
>>>>>>> 757d2294c4ea3d88af28934e6368bdbe51fa8a86
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
<<<<<<< HEAD
				
				//GUARDAR	
				$("svg").appendTo("body");
				$("svg").hide();
				
=======
>>>>>>> 757d2294c4ea3d88af28934e6368bdbe51fa8a86
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
