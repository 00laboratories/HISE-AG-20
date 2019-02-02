
// keeping track of actively playing notes
Globals.released_notes = [];
Globals.released_notes_idx = 0;
for(var i = 0; i < 64;i++){
    Globals.released_notes[i] = {
        note : 0,
        start_time : 0
    };
};
// store data about a played note
inline function storeReleaseNoteInfo(note){
    Globals.released_notes[Globals.released_notes_idx].note = note;
    Globals.released_notes[Globals.released_notes_idx].start_time = Engine.getUptime();
    Globals.released_notes_idx = (Globals.released_notes_idx+1) % 64;
};

// reset data at array index
Globals.resetReleaseNote = function(index){ 
    Globals.released_notes[index].note = 0;
    Globals.released_notes[index].start_time = 0;
};