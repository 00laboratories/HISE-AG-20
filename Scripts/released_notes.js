
// keeping track of actively playing notes
Globals.active_notes = [];
Globals.active_notes_idx = 0;
for(var i = 0; i < 32;i++){
    Globals.active_notes[i] = {
        note : 0,
        start_time : 0,
    };
};

// store data about a played note
Globals.storeReleaseNoteInfo = function(note){
    Globals.active_notes[Globals.active_notes_idx].note = note;
    Globals.active_notes[Globals.active_notes_idx].start_time = Engine.getUptime();
    Globals.active_notes_idx = (Globals.active_notes_idx+1) % 32;
};

// fade out all notes of input note value and reset active note values
Globals.resetReleaseNote = function(note){
	for(var i = 0; i < 32; i++){
	    if(Globals.active_notes[i].note == note){   
	        Globals.active_notes[i].note = 0;
	        Globals.active_notes[i].start_time = 0;
	    }
	};
};