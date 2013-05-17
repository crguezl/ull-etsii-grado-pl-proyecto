/* description: Parses end executes music expressions. */


/* operator associations and precedence */

/*%right '=' '<' '>'
%right IDPARAM
*/

%start partitura

%{
	
	//Notas:
	//var SMR = new InitSMR();
	var elementos = [];
	var posicionElementoSiguiente = 1; 
	
	// Devuelve un objeto hash.
	var hashObjeto = function (valorObjeto, tipoObjeto){
		return {
			valor: valorObjeto,
			tipo: tipoObjeto
		};
	};

	function hashNota (valor){
		return hashObjeto(valor, "nota");
	}
	function hashClave (valor){
		return hashObjeto(valor, "clave");
	}
	var hashLine = function (){
		return {
			tipo: "linea"
		};
	};
	var hashDoubleLine = function (){
		return {
			tipo: "dobleLinea"
		};
	};
	function hashBemol (valor){
		return hashObjeto(valor, "bemol");
	}
	function hashLigadura (valor){
		return hashObjeto(valor, "ligadura");
	}
	function hashCompas (valor){
		return hashObjeto(valor, "compas");
	}
	/*var hashCompas = function (n, d){
		return {
			numerador: n,
			denominador: d,
			tipo: "compas"
		};
	};*/
	/*function dibujaElementos(){
		for (var i in elementos){
			//alert("elemento: "+elementos[i].valor.duration);
			SMR.drawNote(elementos[i].valor);
		}
	}*/
	
	// Clase compás: (new Bar(n, d);)
	function Bar (numerador, denominador){
		this.n = numerador;
		this.d = denominador;
	}
	/* Inicio es el primer objeto donde empieza la ligadura
	   y fin es el último objeto donde termina. */
	function Ligature (inicio, fin){
		this.start = inicio;
		this.end = fin;
	}

	/* Devuelve el nombre correcto de la nota para el programa 
	    que dibuja las notas. */
	function nombreNota (nombre){
		nombre = nombre.toUpperCase();
		if (nombre == "DO" || nombre == "C"){
			return "Do";
		}
		if (nombre == "RE" || nombre == "D"){
			return "Re";
		}
		if (nombre == "MI" || nombre == "E"){
			return "Mi";
		}
		if (nombre == "FA" || nombre == "F"){
			return "Fa";
		}
		if (nombre == "SOL" || nombre == "G"){
			return "Sol";
		}
		if (nombre == "LA" || nombre == "A"){
			return "La";
		}
		if (nombre == "SI" || nombre == "B"){
			return "Si";
		}	
		return nombre;
	}
	
%}

%% /* language grammar */

partitura: '<SCORE>' clave elementosLigadura '</SCORE>' EOF
        { 
	  typeof console !== 'undefined' ? console.log($1) : print($1);
	
	$$ = $2;
	//dibujaElementos();
	return elementos;
	}
    ;

clave
	: CLAVE
		{posicionElementoSiguiente += 3;
		$$ = $1.toUpperCase();
		elementos.push(hashClave($$));}
	;
	
elementosLigadura
	: /**/	
		{$$ = {};}
	| nota elementosLigadura
	| bemol elementosLigadura
	| line elementosLigadura
	| doubleline elementosLigadura
	| compas elementosLigadura
	| ligadura elementosLigadura
	;

elementos
	: /**/	
		{$$ = {};}
	| nota elementos
	| bemol elementos 
	| line elementos
	| doubleline elementos
	| compas elementos
	;

line
	: '<DIVISIONLINE/>'
		{posicionElementoSiguiente += 1;
		$$ = hashLine();
		elementos.push($$);} 
	;

doubleline
	: '<DOUBLELINE/>'
		{posicionElementoSiguiente += 1;
		$$ = hashDoubleLine();
		elementos.push($$);}
	;

compas
	: '<BAR>' numerador denominador '</BAR>'
		{//posicionElementoSiguiente += 1;
		elementos.push(hashCompas(new Bar($2, $3)));} 
	;

numerador
	: '<N>' NUMBER '</N>'
		{$$ = parseInt($2);}
	;

denominador
	: '<D>' NUMBER '</D>'
		{$$ = parseInt($2);}
	;

ligadura
	: '<LIGATURE>' inicioLigadura elementos '</LIGATURE>'
		{elementos.push(hashLigadura(new Ligature($2, posicionElementoSiguiente)));} 
		
	;

inicioLigadura
	: /**/
		{$$ = posicionElementoSiguiente;}
	;

bemol
	: '<FLAT>' tiempo nombreNota octava '</FLAT>'
		{posicionElementoSiguiente += 1;
		var bem = hashBemol(new Note($3, $2, $4));
		elementos.push(bem);
		$$ = not;
		}
	;

nota
	: '<NOTE>' tiempo nombreNota octava puntillo '</NOTE>'
		{posicionElementoSiguiente += 1;
		var not = hashNota(new Note($3, $2, $4, $5));
		elementos.push(not);
		/*if (Object.keys($5).length != 0){
			elementos.push($5);
		}*/
		$$ = not;
		}
	;

tiempo 
	: '<TIME>' NUMBER '</TIME>'
		{$$ = parseInt($2);}
	;

nombreNota 
	: '<NAME>' NOTA '</NAME>'
		{
		$$ = nombreNota($2);
		}
	;

octava
	: '<OCTAVE>' NUMBER '</OCTAVE>'
		{$$ = parseInt($2);}
	;

puntillo
	: '<DOTTED/>'
		{$$ = true;}
	| /* Puede no tener puntillo. */
		{$$ = false;}
	;

	

