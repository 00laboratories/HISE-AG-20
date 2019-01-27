// global static 
Globals.playable_range = [38,76];

// predictive playback 
Globals.playback_delay = 25/1000; // 25 ms

// soft/hard sample velocity split point 
Globals.soft_velocity = 50;

// interval range
Globals.interval_boundaries = [50,71];

// current notes
Globals.midiList = Engine.createMidiList();

Globals.key_switches = {
    perc:[24,28],
    slide:29,
    pwr_slap:31,
    harmonics:33
};

// shorter print function
Globals.log = function(msg){
    Console.print(msg);
};
