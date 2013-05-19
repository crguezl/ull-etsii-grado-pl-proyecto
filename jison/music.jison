/* description: Parses end executes music expressions. */


/* operator associations and precedence */

/*%right '=' '<' '>'
%right IDPARAM
*/

%start expressions

%{
	
	//Notas:
	//var SMR = new InitSMR();
	var elementos = [];
	
	// Devuelve un objeto hash.
	var hashNota = function (valorNota){
		return {
			valor: valorNota,
			tipo: "nota"
		};	
	};
	var hashClave = function (valorClave){
		return {
			valor: valorClave,
			tipo: "clave"
		};
	};
	var hashLine = function (){
		return {
			tipo: "linea"
		}
	}

	/*function dibujaElementos(){
		for (var i in elementos){
			//alert("elemento: "+elementos[i].valor.duration);
			SMR.drawNote(elementos[i].valor);
		}
	}*/
	/*function Note (nota, duracion, octava){
		this.note = nota;
		this.duration = duracion;
		this.octave = octava;
	}*/

%}

%% /* language grammar */

expressions: '<SCORE>' clave notas line '</SCORE>' EOF
        { 
	  typeof console !== 'undefined' ? console.log($1) : print($1);
	
	$$ = $2;
	//dibujaElementos();
	return elementos;
	}
    ;

clave
	: CLAVE
		{$$ = $1.toUpperCase();
		//alert("clave:" + $$);
		elementos.push(hashClave($$));}
	;
	

notas
	: /**/	
		{$$ = {};}
	| notas line '<NOTE>' tiempo nota octava puntillo '</NOTE>'
		{
		var not = hashNota(new Note($5, $4, $6, $7));
		elementos.push(not);
		/*if (Object.keys($2).length != 0){
			elementos.push($2);
		}*/
		$$ = not;
		}
	;

line
	: /* */	{$$ = {};}
	| '<DIVISIONLINE/>'
		{$$ = hashLine();
		elementos.push($$);} 
	;

tiempo 
	: '<TIME>' NUMBER '</TIME>'
		{$$ = parseInt($2);}
	;

nota 
	: '<NAME>' NOTA '</NAME>'
		{
		$$ = $2;
		}
	;

octava
	: '<OCTAVE>' NUMBER '</OCTAVE>'
		{$$ = parseInt($2);}
	;

puntillo
	: '<PUNTILLO/>'
		{$$ = true;}
	| /* Puede no tener puntillo. */
		{$$ = false;}
	;

	

