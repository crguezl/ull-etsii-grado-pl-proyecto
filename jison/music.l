// music.l
/* description: Parses end executes music expressions. */

/* lexical grammar */


/*%start expressions*/
%{
	var notas = {DO: 'DO', RE: 'RE', MI: 'MI', FA: 'FA', SOL: 'SOL', LA: 'LA', SI: 'SI', A: 'A', B: 'B', C: 'C', D: 'D', E: 'E', F: 'F', G: 'G'};
	var reserved_words = {SCORE: 'SCORE', NOTE: 'NOTE', TIME: 'TIME', OCTAVE: 'OCTAVE'};
	
	function idORrw (x) {
		x = x.toUpperCase();	
	//return ((x.toUpperCase() in reserved_words)? x.toUpperCase() : 'ID');
	//return ((x.toUpperCase() in reserved_words)? x : 'ID');
		if (x in notas) {
			return 'NOTA';
		}
		if (x in reserved_words) {
			return x;
			//return reserved_words[x.toUpperCase()];
		}
		return 'ID';
	}

	function token (x) {
		x = x.toUpperCase();
		return x;
	}
	
%}



%%

\s+                   	/* skip whitespace */
[0-9]+("."[0-9]+)?\b  	return 'NUMBER'
"<ksol2/>"		return 'CLAVE'
"<KSOL2/>"		return 'CLAVE'
"<"[/]?[a-zA-Z_]\w*[/]?">"	return token(yytext)

";"                   	return ';'
\b[a-zA-Z_]\w*\b	return idORrw(yytext)
[-+*/^%()<>=!,{}]	return yytext

<<EOF>>               	return 'EOF'
.                     	return 'INVALID'




