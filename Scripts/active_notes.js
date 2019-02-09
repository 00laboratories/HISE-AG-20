
// keeping track of actively playing notes
Globals.active_notes = [];
Globals.active_notes_idx = 0;
for(var i = 0; i < 64;i++){
    Globals.active_notes[i] = {
        note : 0,
        velocity : 0,
        start_time : 0,
        id : 0
    };
};

// store data about a played note
/*inline function storeActiveNoteInfo(note, velocity, start_t, identifier){
    Globals.active_notes[Globals.active_notes_idx].note = note;
    Globals.active_notes[Globals.active_notes_idx].velocity = velocity;
    Globals.active_notes[Globals.active_notes_idx].start_time = start_t;
    Globals.active_notes[Globals.active_notes_idx].id = identifier;  
    Globals.active_notes_idx = (Globals.active_notes_idx+1) % 64;
};

// fade out all notes of input note value and reset active note values
inline function resetActiveNote(i){
    Globals.active_notes[i].note = 0;
    Globals.active_notes[i].velocity = 0;
    Globals.active_notes[i].id = 0;
    Globals.active_notes[i].start_time = 0;
};*/