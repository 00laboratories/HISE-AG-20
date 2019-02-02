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

// array of id's that samplers can play
Globals.SamplerNoteIds = {
    "sus_soft":[],
    "sus_hard":[],
    "min3rd_soft":[],
    "min3rd_hard":[],
    "maj3rd_soft":[],
    "maj3rd_hard":[],
    "4th_soft":[],
    "4th_hard":[],
    "5th_soft":[],
    "5th_hard":[],
    "perc1":[],
    "perc2":[],
    "perc3":[],
    "perc4":[],
    "perc5":[],
    "pwr_slap_soft":[],
    "pwr_slap_hard":[],
    "noise_slide":[],
    "harmonics":[],
    "release":[],
};

Globals.pushId = function(a1, a2){
    Globals.SamplerNoteIds[a1].push(a2);
}
