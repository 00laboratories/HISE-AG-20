include("key_colors.js");
include("Samplers.js");
include("Intervals.js");

reg tmp;
reg sampler;
reg id;
reg interval;

Synth.deferCallbacks(true);

Globals.initializeKeyColors();

// millisecond(edited hise source to get it this low) accurate timing for predictive playback
Synth.startTimer(0.01);

function updateGUI(){
        
    // update harmonics gui elements
    if(Globals.midiList.getValue(Globals.key_switches.harmonics) == 1){
        Interface.Harmonics.setValue(1);
        Globals.setKeyColorRange(Globals.key_colors.green,50, 79);
    }else{
        Interface.Harmonics.setValue(0);
        // reset to white keys first
        Globals.setKeyColorRangeAlpha(0x00000000,50,79);
        // set the playable range back to correct color
        Globals.setKeyColorRange(Globals.key_colors.light_blue,50,76);
    }
    
    // update power slap gui elements
    if(Globals.midiList.getValue(Globals.key_switches.pwr_slap) == 1){
        Interface.Power_Slap.setValue(1);
        Globals.setKeyColorRange(Globals.key_colors.yellow,38, 38+12);
    }else{
        if(Globals.midiList.getValue(Globals.key_switches.harmonics) == 0){
            Interface.Power_Slap.setValue(0);
            Globals.setKeyColorRange(Globals.key_colors.light_blue,38, 38+12);
        }
    }
}


function playNotes(){
    for(var i = 0; i < 32; i++){
        
        // release notes
        if(Globals.released_notes[i].note != 0 && (Globals.CC.getValue(64)  < 64)){
            // time since note was released
             
            tmp = Engine.getUptime() - Globals.released_notes[i].start_time;
            if(tmp >= Globals.playback_delay && (Globals.midiList.getValue(Globals.released_notes[i].note) == 0)){
                         
                // loop all released notes
                for(var j = 0; j < 32 ; j++){
                    if(Globals.released_notes[i].note == Globals.active_notes[j].note){
                        // fade note out
                        Synth.addVolumeFade(Globals.active_notes[j].id, Interface.Release_Knob.getValue(), -100);
                        
                        //log("releasing: " + Globals.active_notes[j].note + " id: " + Globals.active_notes[j].id );
                        Globals.resetActiveNote(j);
                              
                    }
                }
                Globals.resetReleaseNote(i);
            }
            
        }
        
        
        // time since note was triggered
        tmp = Engine.getUptime() - Globals.played_notes[i].start_time;
        
        // play note after playback delay
        if(tmp >= Globals.playback_delay && Globals.played_notes[i].note != 0 && Globals.played_notes[i].velocity > 0){

            Samplers.disableAll();
            // enable correct sampler depending on velocity
            if(Globals.played_notes[i].velocity <= Interface.Soft_velocity.getValue())
                Samplers.enable("sus_soft");
            else
                Samplers.enable("sus_hard");
            
            var tmpId = Synth.playNote(Globals.played_notes[i].note, Globals.played_notes[i].velocity);
            
            Globals.storeActiveNoteInfo(Globals.played_notes[i].note, Globals.played_notes[i].velocity, tmpId);
            
            Globals.resetPlayedNote(i);
            
            // go to next note
            continue;
        }
        
        
        // play interval
        if(Intervals.count() > 0){
            tmp = Engine.getUptime() - Intervals.firstElementStart();
            
            if(tmp > Globals.playback_delay){
                interval = Intervals.popInterval();
                
                //log("note: " + interval.note + " / " + interval.interval);
            
                Samplers.disableAll();
                // enable correct sampler depending on velocity
                if(interval.velocity <= Interface.Soft_velocity.getValue())
                    Samplers.enable(interval.interval + "_soft");
                else
                    Samplers.enable(interval.interval + "_hard");
                    
                var tmpId = Synth.playNote(interval.note, interval.velocity);
            
                Globals.storeActiveNoteInfo(interval.note, interval, tmpId);
                        
                // go to next note
                continue;
            }
            

        }
    }
}
function onNoteOn()
{
	
}
function onNoteOff()
{
	
}
function onController()
{
	
}
function onTimer()
{
	Intervals.findIntervals();
	playNotes();
	updateGUI();
}
function onControl(number, value)
{
	
}
