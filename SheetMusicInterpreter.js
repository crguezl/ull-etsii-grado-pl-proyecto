
function Note(f,d,o,punt){
    switch(f){
    case "Do":
	this.freq = 0;
	break;
    case "Re":
	this.freq = 1;
	break;
    case "Mi":
	this.freq = 2;
	break;
    case "Fa":
	this.freq = 3;
	break;
    case "Sol":
	this.freq = 4;
	break;
    case "La":
	this.freq = 5;
	break;
    case "Si":
	this.freq = 6;
	break;

    }

    this.duration = d;
    this.octave = o;
    this.puntillo = punt;
    
}

function InitSMR(){
    
    //Constructor
    this.xoffset = 40;
    this.yoffset = 80;

    this.progress = 0;
    this.separacion = 35;
    
    this.claveSol = "M643 2c0 -102 -65 -214 -190 -248c0 -13 1 -27 1 -40c0 -46 -1 -92 -4 -138c-7 -119 -92 -227 -214 -227c-111 0 -202 92 -202 205c0 58 54 104 113 104c54 0 95 -48 95 -104c0 -52 -43 -95 -95 -95c-13 0 -27 4 -39 10c26 -47 74 -80 130 -80c100 0 166 94 172 193 c3 44 4 89 4 133v31c-31 -5 -63 -6 -79 -6c-189 0 -333 173 -333 372c0 181 134 314 254 451c-37 129 -54 211 -54 379c0 197 147 308 159 308c25 0 151 -219 151 -388c0 -150 -90 -267 -190 -380c22 -73 42 -147 61 -221h6c154 0 254 -127 254 -259zM452 -207 c66 20 124 84 124 170c0 90 -64 178 -168 192c27 -129 40 -239 44 -362zM338 -220c7 0 45 1 75 5c-4 127 -19 241 -47 372c-87 -5 -136 -62 -136 -124c0 -45 26 -92 83 -125c4 -4 7 -9 7 -14c0 -11 -9 -21 -20 -21c-15 0 -125 63 -125 186c0 90 61 178 168 198 c-16 64 -35 127 -53 190c-110 -124 -220 -249 -220 -414c0 -149 144 -253 268 -253zM409 1108c-100 -55 -162 -159 -162 -273c0 -94 27 -190 40 -236c86 102 158 209 158 342c0 77 -11 110 -36 167z";

    this.svg = Raphael(10,10,1000,400);
    //Metodos
    this.drawStaff = function(){
	console.log(document.width );
	for( i = 0; i < 5; i++){
	    this.svg.rect(0,this.yoffset+20*i,1000,1);
	}
    };

    this.drawSolClave = function(){

	var c = this.svg.path(this.claveSol);
	c.attr("fill","#000000");
	c.transform("s0.1 -0.1 ");
	c.translate(-2400,2000);
	this.progress+=2;

    }

    this.drawNote = function (note){
	
	posy = this.yoffset + 5*20 - note.freq*10;
	posx = this.xoffset + this.progress * this.separacion;
	
	octave = note.octave - 4;
	posy -= 70 * octave;

	this.progress++;
	
	switch(note.duration){
	case 1:
	    this.svg.ellipse(posx,posy,10,10);
	    break;
	case 2:
	    this.svg.ellipse(posx,posy,10,10);
	    this.svg.rect(posx+10,posy-50,1,50);
	    break;
	case 4:
	    circle = this.svg.ellipse(posx,posy,10,10);
	    circle.attr("fill","#000000");
	    this.svg.rect(posx+10,posy-50,1,50);
	    break;
	}

	//Comprobar si hay que poner línea
	if( posy < this.yoffset-10 ){
			 
	    for( i = this.yoffset-20; i >= posy; i-=20 )
		this.svg.rect(posx-15,i,30,1);
	}
	
	if( posy > this.yoffset + 20*4+10 ){
			 
	    for( i = this.yoffset + 20*4+20; i <= posy; i+=20 )
		this.svg.rect(posx-15,i,30,1);

	}

	if( note.puntillo ){
		    
	    if( (note.freq + note.octave*7)%2 != 0){ 
		circle = this.svg.ellipse(posx +16,posy,2,2);
		circle.attr("fill","#000000");
	    }
	    else{
		circle = this.svg.ellipse(posx +16,posy -10,2,2);
		circle.attr("fill","#000000");
	    }
		    
	}
    };
    
    this.divisionLine = function (){
    	posx = this.xoffset + this.progress * this.separacion;
    	this.progress++;
    	this.svg.rect( posx, this.yoffset, 1, 4*20);
    };
    
    this.ligadura = function(ini,fin){
    	inicio = ini * this.separacion;
    	fina = fin * this.separacion;
	medio = fina - inicio;
	medio/=2;
	medio+=inicio;
	
    	camino =  "M "+inicio+",200 ";
	camino += "C "+ medio + ",215 "+  medio+",215 ";
	camino += fina + ",200"
	camino += "C "+ medio + ",220 "+  medio+",220 ";
	camino += inicio + ",200";

	console.log(camino);
    	ligadura = this.svg.path(camino);
	ligadura.attr("fill","#000000");
    	//this.svg.path("M 0,0 C 100,100 300,100 300,200");
    };
    
    this.doubleLine = function (){

    	posx = this.xoffset + this.progress * this.separacion;
    	this.progress++;
    	this.svg.rect( posx, this.yoffset, 6, 4*20);
    }
    
};

function InitSystem(){
    
    var SMR = new InitSMR();
    SMR.drawStaff();
    console.log("Hola");
    
    SMR.divisionLine();
    SMR.drawSolClave();
    SMR.drawNote(new Note("Fa",4,5,true));
    SMR.drawNote(new Note("Sol",2,4,true));
    SMR.drawNote(new Note("Mi",4,4,true));
    SMR.drawNote(new Note("Fa",4,4,true));
    SMR.divisionLine();
    SMR.drawNote(new Note("Re",4,4));
    SMR.drawNote(new Note("Si",4,4));
    SMR.drawNote(new Note("Do",1,4));
    SMR.drawNote(new Note("Sol",2,5));
    SMR.divisionLine();
    SMR.drawNote(new Note("Do",1,6));
    SMR.drawNote(new Note("La",1,6));
    SMR.drawNote(new Note("Re",1,6));
    SMR.drawNote(new Note("Do", 1, 5, true));
    SMR.ligadura(4,9);
    SMR.doubleLine();
}


