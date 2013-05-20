
 		var stop = false;
		
		function parar(){stop = true;}
		
    function play() {
stop = false;
        var noteDefs = ["A", "B", "D","E","F"];
        var scaleDefs = ["1"];
        var loading = 0;
        var notes = [];

        var song = [0, 1,1,0,2,3,2,4,0];//, 8, 9, 7, 7, 8, 9, 7, 9, 10, 11, 9, 10, 11, 11, 12, 11, 10, 9,7, 11, 12, 11, 10, 9, 7, 7, 4,7, 7, 4, 7];
	
     /*  window.addEventListener("load", function () {
	window.alert("dfgfdg");
            preload();
        }, false);
*/
        function preload() {
            loading = noteDefs.length * scaleDefs.length;

            // Show preload progress
            var debug = document.getElementById('debug');
            var total = loading;
            var timerLoading = setInterval(function () {
                debug.innerHTML = "Loaded: " + (total - loading) + "/" + total;
                if (loading == 0) {
                    debug.innerHTML = "Playing song!";
                    clearInterval(timerLoading);
                }
            }, 16);

            for (var scale in scaleDefs)
                for (var note in noteDefs)
                    addNote(/*scaleDefs[scale] +*/ noteDefs[note]);
        }

        function addNote(name) {
            var audio = document.createElement("audio");
            audio.addEventListener("canplaythrough", function () {
                loading--;
                if (loading == 0)
                    playSong();
            }, false);
     		audio.src = "./resources/sounds/piano_"+ name +".mp3";
		    notes.push(audio);
        }

        function playSong(){ 	
            var time = 0;
            timerId = setInterval(function () {
									playNote(song[time]);
									time++;
									time %= song.length;
									if (stop == true)
										clearInterval(timerId);
								}, 300);
        }

        function playNote(audioIndex) {
            var note = notes[audioIndex];
            note.currentTime = 0;
            note.play();
        }
		
		

		

  preload();
 }
 
