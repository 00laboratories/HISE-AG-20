include("key_colors.js");
include("Samplers.js");
include("Intervals.js");

reg tmp;
reg tmp2;
reg tmpNote;
reg sampler;
reg id;
reg interval;

Synth.deferCallbacks(true);

Globals.initializeKeyColors();

Synth.startTimer(0.003);

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

const var rr_sequence_2 = [0,2,-1,1,0,-2,1,-1,2,-2];
const var rr_sequence_1 = [0,1,-1,0,-1,1];

const var rr_counters_2 = Engine.createMidiList();
rr_counters_2.fill(0);
const var rr_counters_1 = Engine.createMidiList();
rr_counters_1.fill(0);

inline function playNote(note, velocity, rr_steps, start_time){
    
    local rr_note = note;
    local rr_value = 0;
    
    // get rr value from different list depending on steps
    if(rr_steps > 0){
        if(rr_steps == 2){
            rr_value = rr_sequence_2[rr_counters_2.getValue(note)];
            rr_counters_2.setValue(note, (rr_counters_2.getValue(note)+1) % 10);
        }else{
            rr_value = rr_sequence_1[rr_counters_1.getValue(note)];
            rr_counters_1.setValue(note, (rr_counters_1.getValue(note)+1) % 6);
        }
    }
    
    //prevent rr from picking notes outside range
    if(note <= 38) rr_value = Math.abs(rr_value);
    if(note >= 76) rr_value = -Math.abs(rr_value);  
    
    rr_note = note + rr_value;
    
    // play note 
    var tmpId = Synth.playNote(rr_note, velocity);
    
    // correct tuning for neighbour rr
    if(note != rr_note){
        Synth.addPitchFade(tmpId, 0, -rr_value, 0);
    }
    
    if(Interface.Fake_12str.getValue() > 0){
        
        local newVel = velocity *Interface.Fake_12str.getValue() / 100;
        
        local tmpId2 = -1;
        if(note < Globals.playable_range[1]-12){
            tmpId2 = Synth.playNote(note+6, newVel); // play note 6 st above
            Synth.addPitchFade(tmpId2, 0, 6, 0); // tune 6 st more for the full octave
        }else{
            tmpId2 = Synth.playNote(note-5, newVel); // play note 5 st below
            Synth.addPitchFade(tmpId2, 0, 5, 0); // tune back 5 st for unison
        }
         
        Globals.storeActiveNoteInfo(note, newVel, start_time, tmpId2);
        
    }
    
    return tmpId;
}

inline function releaseNotes(i){
    // release notes
    if(Globals.active_notes[i].note != 0 && (Globals.CC.getValue(64)  < 64)){
        //log(Globals.midiList.getValue(Globals.active_notes[i].note) + " " + Engine.getUptime());
        if(Globals.midiList.getValue(Globals.active_notes[i].note) == 0){
            //log("releasing: " + Globals.active_notes[i].note + " id: " + Globals.active_notes[i].id);
            // fade note out
            Synth.addVolumeFade(Globals.active_notes[i].id, Interface.Release_Knob.getValue(), -100);
            Globals.resetActiveNote(i);
        }
    }
}

inline function playNotes(){

    for(var i = 0; i < 64; i++){
        
        releaseNotes(i);
        // release notes
       /* if(Globals.released_notes[i].note != 0 && (Globals.CC.getValue(64)  < 64)){
            // time since note was released
             
            tmp = Engine.getUptime() - Globals.released_notes[i].start_time;
            if(tmp >= Globals.playback_delay && (Globals.midiList.getValue(Globals.released_notes[i].note) == 0)){
                         
                // loop all released notes
                for(var j = 0; j < 64 ; j++){
                    if(Globals.released_notes[i].note == Globals.active_notes[j].note){
    
                        // fade note out
                        Synth.addVolumeFade(Globals.active_notes[j].id, Interface.Release_Knob.getValue(), -100);
                                  
                        // play release samples
                        if(Interface.Release_Knob.getValue() < 250 && Interface.Release_Samples_Button.getValue() == 1){
                            Samplers.disableAll();
                            Samplers.enable("release");
                
                            // lower release volume based on how long note has been held
                            local delta = Engine.getUptime() - Globals.active_notes[j].start_time;
                            delta = Math.min(delta,5) / 5;
                            
                            if(delta < 1){
                                var tmpID = Synth.playNote(Globals.released_notes[i].note, Math.max(1,Globals.active_notes[j].velocity));
                                Synth.addVolumeFade(tmpID, 0, -18 * delta);
                            }

                        }
             
                        Globals.resetActiveNote(j);
                              
                    }
                }
                Globals.resetReleaseNote(i);
            }
            
        }*/
           
        // time since note was triggered
        tmp = Engine.getUptime() - Globals.played_notes[i].start_time;
        tmpNote = Globals.played_notes[i].note;
        
        // play note after playback delay
        if(tmp >= Globals.playback_delay && Globals.played_notes[i].velocity > 0){
            
            
            // play harmonics 
            if((tmpNote >= 50) && (tmpNote <= 79) && Globals.midiList.getValue(Globals.key_switches.harmonics) == 1){
                Samplers.disableAll();
                Samplers.enable("harmonics");
                
                var tmpId = Synth.playNote(tmpNote, Globals.played_notes[i].velocity);
            
                Globals.storeActiveNoteInfo(tmpNote, Globals.played_notes[i].velocity,Globals.played_notes[i].start_time, tmpId);
            
                Globals.resetPlayedNote(i);
            
                // go to next note
                continue;
            }
            
            // play power slap
            if((tmpNote >= 38) && (tmpNote <= 50) && Globals.midiList.getValue(Globals.key_switches.pwr_slap) == 1){
                Samplers.disableAll();
                 // enable correct sampler depending on velocity
                if(Globals.played_notes[i].velocity <= Interface.Soft_velocity.getValue())
                    Samplers.enable("pwr_slap_soft");
                else
                    Samplers.enable("pwr_slap_hard");
                
                var tmpId = Synth.playNote(tmpNote, Globals.played_notes[i].velocity);
            
                Globals.storeActiveNoteInfo(tmpNote, Globals.played_notes[i].velocity,Globals.played_notes[i].start_time, tmpId);
            
                Globals.resetPlayedNote(i);
            
                // go to next note
                continue;
            }
            
            // play normal sustain notes
            if(tmpNote >= Globals.playable_range[0] && tmpNote <= Globals.playable_range[1]){
                Samplers.disableAll();
                // enable correct sampler depending on velocity
                if(Globals.played_notes[i].velocity <= Interface.Soft_velocity.getValue())
                    Samplers.enable("sus_soft");
                else
                    Samplers.enable("sus_hard");
                    
                var tmpId = playNote(tmpNote, Globals.played_notes[i].velocity, Interface.Neighbour_RR.getValue(),Globals.played_notes[i].start_time);    
                    
                //var tmpId = Synth.playNote(tmpNote, Globals.played_notes[i].velocity);
            
                Globals.storeActiveNoteInfo(tmpNote, Globals.played_notes[i].velocity,Globals.played_notes[i].start_time, tmpId);
            
                Globals.resetPlayedNote(i);
            
                // go to next note
                continue;
            }
                        
            // play percussion
            if(tmpNote >= Globals.key_switches.perc[0] && tmpNote <= Globals.key_switches.perc[1]){
                // perc number 1-5
                tmp2 = (tmpNote - Globals.key_switches.perc[0] + 1);
                
                Samplers.disableAll();
                Samplers.enable("perc" + tmp2);
                
                var tmpId = Synth.playNote(Globals.perc_rr[tmp2]+1, Globals.played_notes[i].velocity);
            
                Globals.storeActiveNoteInfo(tmpNote, Globals.played_notes[i].velocity,Globals.played_notes[i].start_time, tmpId);
                
                Globals.perc_rr[tmp2] = (Globals.perc_rr[tmp2] + 1) % 6;
                     
                Globals.resetPlayedNote(i);
            
                // go to next note
                continue;
            }
            
            // noise slide
            if(tmpNote == Globals.key_switches.slide){
                Samplers.disableAll();
                Samplers.enable("noise_slide");
                
                while(tmp2 == Globals.noise_slide_rr){
                    tmp2 = Math.randInt(1,22);
                }
                Globals.noise_slide_rr = tmp2;
                
                var tmpId = Synth.playNote(tmp2, Globals.played_notes[i].velocity);
            
                Globals.storeActiveNoteInfo(tmpNote, Globals.played_notes[i].velocity,Globals.played_notes[i].start_time, tmpId);
                                     
                Globals.resetPlayedNote(i);
            
                // go to next note
                continue;
            }
    
        }

        // play interval
        if(Intervals.count() > 0){
            tmp = Engine.getUptime() - Intervals.firstElementStart();
            
            if(tmp > Globals.playback_delay){
                interval = Intervals.popInterval();
                
                log("playing: " + interval.interval + " - " + interval.note + " array: " + intervalArray.length); 
                
                Samplers.disableAll();
                // enable correct sampler depending on velocity
                if(interval.velocity <= Interface.Soft_velocity.getValue())
                    Samplers.enable(interval.interval + "_soft");
                else
                    Samplers.enable(interval.interval + "_hard");
                    
                   
                
                var tmpId = playNote(interval.note, interval.velocity, Interface.Neighbour_RR.getValue(), interval.start_time);  
                //var tmpId = Synth.playNote(interval.note, interval.velocity);
            
                Globals.storeActiveNoteInfo(interval.note, interval.velocity, interval.start_time, tmpId);
                        
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
    /*if(Interface.Predictive_Playback.getValue() == 1 && Globals.midiList.getValue(Globals.key_switches.harmonics) == 0){
        Intervals.findIntervals(); 
    }
        
	playNotes();
	updateGUI();*/
}
function onControl(number, value)
{
	
}
