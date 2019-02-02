// store data about a played note
inline function storePlayedNoteInfo(note, velocity){
    Globals.played_notes[Globals.played_notes_idx].note = note;
    Globals.played_notes[Globals.played_notes_idx].velocity = velocity;
    Globals.played_notes[Globals.played_notes_idx].start_time = Engine.getUptime(); 
    Globals.played_notes_idx = (Globals.played_notes_idx+1) % 64;
};

// fade out all notes of input note value and reset played note values
inline function resetPlayedNote(index){  
    Globals.played_notes[index].note = 0;
    Globals.played_notes[index].velocity = 0;
    Globals.played_notes[index].start_time = 0;
};