
// keeping track of playedly playing notes
Globals.played_notes = [];
Globals.played_notes_idx = 0;
for(var i = 0; i < 32;i++){
    Globals.played_notes[i] = {
        note : 0,
        velocity : 0,
        start_time : 0
    };
};

// store data about a played note
Globals.storePlayedNoteInfo = function(note, velocity){
    Globals.played_notes[Globals.played_notes_idx].note = note;
    Globals.played_notes[Globals.played_notes_idx].velocity = velocity;
    Globals.played_notes[Globals.played_notes_idx].start_time = Engine.getUptime(); 
    Globals.played_notes_idx = (Globals.played_notes_idx+1) % 32;
};

// fade out all notes of input note value and reset played note values
Globals.resetPlayedNote = function(index){  
    Globals.played_notes[index].note = 0;
    Globals.played_notes[index].velocity = 0;
    Globals.played_notes[index].start_time = 0;
};