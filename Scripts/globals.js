
// global static 
Globals.playable_range = [38,76];


// predictive playback 
Globals.playback_delay = 25/1000; // 25 ms

// interval range
Globals.interval_boundaries = [50,71];

// current notes
Globals.midiList = Engine.createMidiList();
Globals.midiList.fill(0);

Globals.CC = Engine.createMidiList();
Globals.CC.fill(0);

Globals.key_switches = {
    perc:[24,28],
    slide:29,
    pwr_slap:31,
    harmonics:33
};

Globals.perc_rr = [0,0,0,0,0,0];

Globals.noise_slide_rr = 0;

// shorter print function
Globals.log = function(msg){
    Console.print(msg);
};

Globals.SamplerNoteIds = [];
    
for(var i = 0; i < 32; i++){
    Globals.SamplerNoteIds[i] = [];
    for(var j = 0; j < 8; j++){
        Globals.SamplerNoteIds[i][j] = -1;
    }
}

inline function pushId(a1, a2){
    for(var i = 0; i < 8; i++){
        if(Globals.SamplerNoteIds[a1][i] === -1){
            Globals.SamplerNoteIds[a1][i] = a2;
            break;
        }
    }
}
