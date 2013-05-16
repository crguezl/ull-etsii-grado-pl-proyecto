
function Note(f,d,o){
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
    this.puntillo = false;

}

function InitSMR(){
    
    //Constructor
    this.xoffset = 40;
    this.yoffset = 80;

    this.progress = 0;
    this.svg = Raphael(10,10,1000,400);
    //Metodos
    this.drawStaff = function(){
    console.log(document.width );
	    for( i = 0; i < 5; i++){
		this.svg.rect(0,this.yoffset+20*i,1000,1);
	    }
    };
    
    this.drawNote = function (note){
	
		posy = this.yoffset + 5*20 - note.freq*10;
		posx = this.xoffset + this.progress * 30;
	
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
    };
    
    this.divisionLine = function (){
    	posx = this.xoffset + this.progress * 30;
    	this.progress++;
    	this.svg.rect( posx, this.yoffset, 1, 4*20);
    };
    
    this.ligadura = function(ini,fin){
    	inicio = ini * 30;
    	fina = fin * 30;
    	
    	this.svg.path("M "+ini+" 200 C "+ (inicio-fin)/2 + " 210 " + fina + " 200 ");
    	this.svg.path("M 100 100 (C 200 200 300 300)+");
    };
    
};

function InitSystem(){
    
    var SMR = new InitSMR();
    SMR.drawStaff();
    console.log("Hola");
    
    SMR.divisionLine();
    SMR.drawNote(new Note("Fa",4,5));
    SMR.drawNote(new Note("Sol",2,4));
    SMR.drawNote(new Note("Mi",4,4));
    SMR.drawNote(new Note("Fa",4,4));
    SMR.divisionLine();
    SMR.drawNote(new Note("Re",4,4));
    SMR.drawNote(new Note("Si",4,4));
    SMR.drawNote(new Note("Do",1,4));
    SMR.drawNote(new Note("Sol",2,5));
    SMR.divisionLine();
    SMR.drawNote(new Note("Do",1,6));
    SMR.drawNote(new Note("La",1,6));
    SMR.drawNote(new Note("Re",1,6));
    SMR.drawNote(new Note("Sol",1,6));
    SMR.ligadura(1,3);
}
