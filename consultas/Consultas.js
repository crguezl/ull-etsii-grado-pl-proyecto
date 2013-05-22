
$(document).ready(function(){
	$("#registro").click(function(){
	
			  var parametros ={"name": $('#name').val(),"email":$('#email').val(),"pass":$('#password').val()};
			  $.ajax({
			 data : parametros,
			 url : "consultas/Registro.php",
			 type :"post",
			 
			 beforeSend :function(){
			 //En esta sección podemos poner un aviso de cargando. Para este ejmplo estoy poniendo el aviso dentro de un div
			 //$("#mensajito").html("Espere...");
			 window.alert("espera");
			 },
			 success:function(respuesta){
			
			  window.alert("registrado");
			 }
			});
			
	});
	
	$("#login").click(function(){
			  var parametros ={"name": $('#name').val()};
			  $.ajax({
			 data : parametros,
			 url : "consultas/CheckUser.php",
			 type :"post",
			 
			 beforeSend :function(){
			 //En esta sección podemos poner un aviso de cargando. Para este ejmplo estoy poniendo el aviso dentro de un div
			 //$("#mensajito").html("Espere...");
			 window.alert("espera");
			 },
			 success:function(respuesta){
	
			  window.alert("hecho");
			 }
			});
			
	});
	
	

});
	
