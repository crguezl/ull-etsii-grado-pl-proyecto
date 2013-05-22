
function Note(f,d,o,punt,alt){
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
    this.alte = alt;
}

function InitSMR(){
    
    //Constructor
    this.xoffset = 40 + 3 * 35;
    this.yoffset = 80;

    this.progress = 0;
    this.separacion = 35;
    
    this.claveSol = "M643 2c0 -102 -65 -214 -190 -248c0 -13 1 -27 1 -40c0 -46 -1 -92 -4 -138c-7 -119 -92 -227 -214 -227c-111 0 -202 92 -202 205c0 58 54 104 113 104c54 0 95 -48 95 -104c0 -52 -43 -95 -95 -95c-13 0 -27 4 -39 10c26 -47 74 -80 130 -80c100 0 166 94 172 193 c3 44 4 89 4 133v31c-31 -5 -63 -6 -79 -6c-189 0 -333 173 -333 372c0 181 134 314 254 451c-37 129 -54 211 -54 379c0 197 147 308 159 308c25 0 151 -219 151 -388c0 -150 -90 -267 -190 -380c22 -73 42 -147 61 -221h6c154 0 254 -127 254 -259zM452 -207 c66 20 124 84 124 170c0 90 -64 178 -168 192c27 -129 40 -239 44 -362zM338 -220c7 0 45 1 75 5c-4 127 -19 241 -47 372c-87 -5 -136 -62 -136 -124c0 -45 26 -92 83 -125c4 -4 7 -9 7 -14c0 -11 -9 -21 -20 -21c-15 0 -125 63 -125 186c0 90 61 178 168 198 c-16 64 -35 127 -53 190c-110 -124 -220 -249 -220 -414c0 -149 144 -253 268 -253zM409 1108c-100 -55 -162 -159 -162 -273c0 -94 27 -190 40 -236c86 102 158 209 158 342c0 77 -11 110 -36 167z";
    this.b = "M25 44l-1 -69c0 -4 -1 -7 -1 -11c0 -22 2 -44 4 -66c46 38 96 80 96 139c0 34 -14 69 -44 69c-31 0 -53 -29 -54 -62zM-14 -136l-11 599c8 4 16 7 25 7s17 -3 25 -7l-6 -349c26 19 56 30 88 30c53 0 93 -46 93 -100c0 -82 -90 -118 -153 -169c-14 -11 -22 -32 -40 -32 c-12 0 -21 9 -21 21z";
    
    this.notes = new Array();
    this.compases = new Array();
    this.sol = new Array();
    this.sosts = new Array();
    this.bems = new Array();
    this.notePosition = new Array();

    this.svg = Raphael(10,10,1000,400);

    this.fondo = this.svg.rect(0,0,1000,400);
    this.fondo.attr("fill","#FFFFFF");
    this.fondo.notes = this.notes;
    this.fondo.delta= 0;
    this.lastdx = 0;
    this.fondo.compases = this.compases;
    this.fondo.sol = this.sol;
    this.fondo.bems = this.bems;
    this.fondo.sosts = this.sosts;
        
    //Metodos
    this.drawStaff = function(){
	
	for( i = 0; i < 5; i++){
	    this.svg.rect(0,this.yoffset+20*i,1000,1);
	}
	this.notes.push(this.svg.rect( 20, this.yoffset, 1, 4*20));
    };

    this.drawSolClave = function(){

	//this.divisionLine();
	var c = this.svg.path(this.claveSol);
	c.attr("fill","#000000");
	c.transform("s0.1 -0.1 t-2400,2000");
	//c.translate(-2400,2000);
	this.sol.push(c);
	//this.progress+=2;

    }

    this.drawNote = function (note){
	
	switch(note.alte){
	case "b":
	this.drawBem(note);
	break;
	case "s":
	this.drawSost(note);
	break;
	}

	this.notePosition.push(this.progress);

	posy = this.yoffset + 5*20 - note.freq*10;
	posx = this.xoffset + this.progress * this.separacion;
	
	octave = note.octave - 4;
	posy -= 70 * octave;

	this.progress++;
	
	switch(note.duration){
	case 1:
	    this.notes.push(this.svg.ellipse(posx,posy,10,10));
	    break;
	case 2:
	    this.notes.push(this.svg.ellipse(posx,posy,10,10));
	    this.notes.push(this.svg.rect(posx+10,posy-50,1,50));
	    break;
	case 4:
	    circle = this.svg.ellipse(posx,posy,10,10);
	    circle.attr("fill","#000000");
	    this.notes.push(circle);
	    this.notes.push(this.svg.rect(posx+10,posy-50,1,50));
	    break;
	}

	res = null;
	//Comprobar si hay que poner línea
	if( posy < this.yoffset-10 ){
			 
	    for( i = this.yoffset-20; i >= posy; i-=20 )
		this.notes.push(this.svg.rect(posx-15,i,30,1));
	}
	
	if( posy > this.yoffset + 20*4+10 ){
			 
	    for( i = this.yoffset + 20*4+20; i <= posy; i+=20 )
		this.notes.push(this.svg.rect(posx-15,i,30,1));

	}
	
	if(res != null) this.notes.push(res);

	if( note.puntillo ){
		    
	    if( (note.freq + note.octave*7)%2 != 0){ 
		res = this.svg.ellipse(posx +16,posy,2,2);
		res.attr("fill","#000000");
	    }
	    else{
		res = this.svg.ellipse(posx +16,posy -10,2,2);
		res.attr("fill","#000000");
	    }
		    
	}

	if(res != null) this.notes.push(res);
    };
    
    this.divisionLine = function (){
    	posx = this.xoffset + this.progress * this.separacion;
    	this.progress++;
    	this.notes.push(this.svg.rect( posx, this.yoffset, 1, 4*20));
    };
    
    this.ligadura = function(ini,fin){
    	inicio = this.xoffset + this.notePosition[ini] * this.separacion;
    	fina = this.xoffset + this.notePosition[fin] * this.separacion;
	medio = fina - inicio;
	medio/=2;
	medio+=inicio;
	
	curvatura = 100;

    	camino =  "M "+inicio+",200 ";
	camino += "C "+ (medio-curvatura) + ",250 "+  (medio+curvatura)+",250 ";
	camino += fina + ",200"
	camino += "C "+ (medio+curvatura) + ",255 "+  (medio-curvatura)+",255 ";
	camino += inicio + ",200";

    	ligadura = this.svg.path(camino);
	ligadura.attr("fill","#000000");
	this.notes.push(ligadura);
    };
    
    this.doubleLine = function (){

    	posx = this.xoffset + this.progress * this.separacion;
    	this.progress++;
    	this.notes.push(this.svg.rect( posx, this.yoffset, 6, 4*20));
    }
    
    this.drawSost = function(note){
	sost = this.svg.path("M215 -316c0 -9 -8 -17 -17 -17s-17 8 -17 17v151l-87 -31v-162c0 -9 -8 -17 -17 -17s-17 8 -17 17v150l-39 -13c-10 -4 -21 4 -21 15v64c0 7 5 13 11 15l49 18v164l-39 -14c-10 -4 -21 4 -21 15v65c0 7 5 13 11 15l49 17v163c0 9 8 17 17 17s17 -8 17 -17v-151l87 31v162 c0 9 8 17 17 17s17 -8 17 -17v-150l39 13c10 4 21 -4 21 -15v-64c0 -7 -5 -13 -11 -15l-49 -18v-164l39 14c10 4 21 -4 21 -15v-65c0 -7 -5 -13 -11 -15l-49 -17v-163zM181 97l-87 -30v-164l87 30v164z");
	sost.transform("s0.05 -0.05 ");
	sost.attr("fill","#000000");
	posy = (this.yoffset + 5*20 - note.freq*10)*-20; 
	posy += 70 * 20 * (note.octave-4);
	posx = this.xoffset + this.progress * 700;
	sost.posy = posy;
	sost.posx = posx+200;
	//posx = this.xoffset + (this.progress * this.separacion)*20;
	/*console.log("posx"+posx);
	  console.log("progress"+this.progress);*/
	sost.translate(200+posx,posy);//-3600
	this.sosts.push(sost);
	this.progress++;
	
    }

    this.drawBem = function(note){
	sost = this.svg.path(this.b);
	sost.transform("s0.05 -0.05 ");
	sost.attr("fill","#000000");
	posy = (this.yoffset + 5*20 - note.freq*10)*-20; 
	posy += 70 * 20 * (note.octave-4);
	posx = this.xoffset + this.progress * 700;
	sost.posx = 1200+posx;
	sost.posy = 3250+posy;
	//posx = this.xoffset + (this.progress * this.separacion)*20;
	/*console.log("posx"+posx);
	  console.log("progress"+this.progress);*/
	sost.translate(1200+posx,3250+posy);//-3600
	this.bems.push(sost);
	this.progress++;
    }
    
    this.drawComp = function( num, den ){
	posx = this.xoffset+this.progress*this.separacion; 
	var t = this.svg.text(posx-5, 122, num + "\n" + den);
	t.transform("s3 3 ");
	this.progress++;
	this.compases.push(t);
    }

    this.onMove = function(dx,dy,x,y){
	
	console.log(this.notes.length);
	for( i = 0; i < this.notes.length; i++){
	    this.notes[i].transform("t"+(this.delta+dx)+",0");
	    
	    /*this.notes[i].attr("x",this.notes[i].attr("x")-this.delta + dx);
	    this.notes[i].attr("x",this.notes[i].attr("x")-this.delta + dx);
	    */
	}
	
	for( i = 0; i < this.compases.length; i++){
	    this.compases[i].transform("s3 3 t"+(this.delta/3+dx/3)+",0");
	}
	for( i = 0; i < this.sol.length; i++){
	    this.sol[i].transform("s0.1 -0.1 t" +(this.delta/0.1+dx/0.1-2400)+",2000");
	}
	for( i = 0; i < this.sosts.length; i++){
	    this.sosts[i].transform("s0.05 -0.05 t"+(this.delta/0.05+dx/0.05+this.sosts[i].posx)+","+this.sosts[i].posy);
	}
	
	for( i = 0; i < this.bems.length; i++){
	    this.bems[i].transform("s0.05 -0.05 t"+(this.delta/0.05+dx/0.05+this.bems[i].posx)+","+this.bems[i].posy);
	}
	
	this.lastdx = dx;
    }
    
    this.endDrag = function(){
	this.delta += this.lastdx;

    }

    this.fondo.drag(this.onMove, null,this.endDrag);
};

function InitSystem(){
    
    var SMR = new InitSMR();
    SMR.drawStaff();
    SMR.drawSolClave();
    SMR.drawBem(new Note("Si",4,4,true ));
    SMR.drawBem(new Note("Mi",4,5,true));
    SMR.drawBem(new Note("La",4,4,true));
    SMR.drawBem(new Note("Re",4,5,true));
    SMR.drawBem(new Note("Sol",4,4,true));
    SMR.drawComp(2,4);    


    //SMR.drawBem(new Note("Mi",4,5,true));
    SMR.drawNote(new Note("Mi",4,5,true,"b"));
    
    //SMR.drawSost(new Note("Sol",4,4,true));
    SMR.drawNote(new Note("Sol",2,4,true,"s"));

    //    SMR.drawBem(new Note("Mi",4,4,true));
    SMR.drawNote(new Note("Mi",4,4,true,"b"));
    
    //SMR.drawBem(new Note("Fa",4,4,true));
    SMR.drawNote(new Note("Fa",4,4,true,"b"));
    
    //SMR.drawBem(new Note("Fa",4,4,true));
    SMR.drawNote(new Note("Fa",4,4,true, "b"));
    
    SMR.divisionLine();
    SMR.drawNote(new Note("Re",4,4));
    SMR.drawNote(new Note("Si",4,4));
    SMR.drawNote(new Note("Do",1,4,true));
    SMR.drawNote(new Note("Sol",2,5));
    SMR.divisionLine();
    SMR.drawNote(new Note("Do",1,6));
    SMR.drawNote(new Note("La",1,6));
    SMR.drawNote(new Note("Re",1,6));
    SMR.drawNote(new Note("Do", 1, 5, true));
    SMR.ligadura(0,2);
    SMR.ligadura(4,9);

    SMR.doubleLine();

}


