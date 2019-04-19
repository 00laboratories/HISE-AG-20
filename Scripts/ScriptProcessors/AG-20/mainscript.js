// interface size
Content.makeFrontInterface(630, 334);

// include 
include("globals.js");

include("interface.js");
include("interface_elements.js");

include("active_notes.js");
include("active_notes_functions.js");

include("played_notes.js");
include("played_notes_functions.js");

include("Intervals.js");

Intervals.initialize();

//include("released_notes.js");

reg noteOn;
reg noteOff;

Synth.startTimer(0.004);

reg tmp;
reg tmp2;
reg tmpNote;
reg sampler;
reg id;
reg interval;

const var intervalIdentifiers = [
    "min3rd_soft",
    "min3rd_hard",
    "maj3rd_soft",
    "maj3rd_hard",
    "4th_soft",
    "4th_hard",
    "5th_soft",
    "5th_hard",  
];

const var rr_sequence_2 = [0,2,-1,1,0,-2,1,-1,2,-2];
const var rr_sequence_1 = [0,1,-1,0,-1,1];

const var rr_counters_2 = Engine.createMidiList();
rr_counters_2.fill(0);
const var rr_counters_1 = Engine.createMidiList();
rr_counters_1.fill(0);

inline function playNote(note, velocity, rr_steps, start_time, identifier){
        
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
    local tmpId = Synth.playNote(rr_note, Math.max(1,velocity));
    
    // correct tuning for neighbour rr
    if(note != rr_note){
        Synth.addPitchFade(tmpId, 0, -rr_value, 0);
    }
    
    if(Globals.Interface.Fake_12str.getValue() > 0){
        
        local newVel = Math.max(1, velocity * Globals.Interface.Fake_12str.getValue() / 100);
        
        local tmpId2 = -1;
        if(note < Globals.playable_range[1]-12){
            tmpId2 = Synth.playNote(note+6, newVel); // play note 6 st above
            Synth.addPitchFade(tmpId2, 0, 6, 0); // tune 6 st more for the full octave
        }else{
            tmpId2 = Synth.playNote(note-5, newVel); // play note 5 st below
            Synth.addPitchFade(tmpId2, 0, 5, 0); // tune back 5 st for unison
        }
        
        pushId(identifier, tmpId2);
         
        storeActiveNoteInfo(note, newVel, start_time, tmpId2);
        
    }
    
    return tmpId;
}

inline function releaseNotes(){
    local i;
    for(i = 0; i < 64; i++){
        // release notes
        if(Globals.active_notes[i].note != 0 && (Globals.CC.getValue(64)  < 64)){
            //log(Globals.midiList.getValue(Globals.active_notes[i].note) + " " + Engine.getUptime());
            tmp = Engine.getUptime() - Globals.active_notes[i].start_time;

            if(Globals.midiList.getValue(Globals.active_notes[i].note) == 0 && tmp >= Globals.playback_delay){
                //log("releasing: " + Globals.active_notes[i].note + " id: " + Globals.active_notes[i].id);
                // fade note out
                Synth.addVolumeFade(Globals.active_notes[i].id, Globals.Interface.Release_Knob.getValue(), -100);
                        
                // play release samples
                if(Globals.Interface.Release_Knob.getValue() < 250 && Globals.Interface.Release_Samples_Button.getValue() == 1){                
                    // lower release volume based on how long note has been held
                    local delta = Engine.getUptime() - Globals.active_notes[i].start_time;
                
                    delta = Math.min(delta,5) / 5;
                    //log("start time: " + delta);
                    if(delta < 1){
                        local tmpID = Synth.playNote(Globals.active_notes[i].note, Math.max(1,Globals.active_notes[i].velocity));
                        pushId(19, tmpID);
                        Synth.addVolumeFade(tmpID, 0, -18 * delta);
                    }

                }
                resetActiveNote(i);
            }
        }
    }
}

inline function playNotes(){
    releaseNotes();
    local i;   
    for(i = 0; i < 64; i++){
        
        
        // release notes
       /*if(Globals.released_notes[i].note != 0 && (Globals.CC.getValue(64)  < 64)){
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

                            // lower release volume based on how long note has been held
                            local delta = Engine.getUptime() - Globals.active_notes[j].start_time;
                            delta = Math.min(delta,5) / 5;
                            
                            if(delta < 1){
                                var tmpID = Synth.playNote(Globals.released_notes[i].note, Math.max(1,Globals.active_notes[j].velocity));
                                Globals.pushId("release", tmpID);
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

                var identifier = 18;
                
                var tmpId = playNote(tmpNote, Globals.played_notes[i].velocity, Globals.Interface.Neighbour_RR.getValue(),Globals.played_notes[i].start_time, identifier);    
                
                pushId(identifier, tmpId);

                storeActiveNoteInfo(tmpNote, Globals.played_notes[i].velocity,Globals.played_notes[i].start_time, tmpId);
            
                resetPlayedNote(i);
            }
            
            // play power slap
            if((tmpNote >= 38) && (tmpNote <= 50) && Globals.midiList.getValue(Globals.key_switches.pwr_slap) == 1){
 
                local identifier = 17;
                
                 // enable correct sampler depending on velocity
                if(Globals.played_notes[i].velocity <= Globals.Interface.Soft_velocity.getValue())
                    identifier = 16;
                
                local tmpId = Synth.playNote(tmpNote, Globals.played_notes[i].velocity);    

                pushId(identifier, tmpId);
                
                storeActiveNoteInfo(tmpNote, Globals.played_notes[i].velocity,Globals.played_notes[i].start_time, tmpId);
            
                resetPlayedNote(i);   
            }
            
            // play normal sustain notes
            if(tmpNote >= Globals.playable_range[0] && tmpNote <= Globals.playable_range[1]){

                //log("i: " + i + " " + tmpNote + " " + Engine.getUptime());
 
                local identifier = 1;
                
                if(Globals.played_notes[i].velocity <= Globals.Interface.Soft_velocity.getValue())
                    identifier = 0;
     
                local tmpId = playNote(tmpNote, Globals.played_notes[i].velocity, Globals.Interface.Neighbour_RR.getValue(),Globals.played_notes[i].start_time, identifier);    
                
                //log("sus: " + tmpNote + " id: " + tmpId);

                pushId(identifier, tmpId);
 
                storeActiveNoteInfo(tmpNote, Globals.played_notes[i].velocity,Globals.played_notes[i].start_time, tmpId);
                    
                resetPlayedNote(i);                 
            }
                        
            // play percussion
           if(tmpNote >= Globals.key_switches.perc[0] && tmpNote <= Globals.key_switches.perc[1]){
                // perc number 1-5
                tmp2 = (tmpNote - Globals.key_switches.perc[0] + 1);
                
                local tmpId = Synth.playNote(Globals.perc_rr[tmp2]+1, Globals.played_notes[i].velocity);
          
                pushId(tmp2+9, tmpId);
                
                storeActiveNoteInfo(tmpNote, Globals.played_notes[i].velocity,Globals.played_notes[i].start_time, tmpId);
                
                Globals.perc_rr[tmp2] = (Globals.perc_rr[tmp2] + 1) % 6;
                     
                resetPlayedNote(i);
            }
            
            // noise slide
            if(tmpNote == Globals.key_switches.slide){
        
                while(tmp2 == Globals.noise_slide_rr){
                    tmp2 = Math.randInt(1,22);
                }
                Globals.noise_slide_rr = tmp2;
                
                local tmpId = Synth.playNote(tmp2, Globals.played_notes[i].velocity);
                
                pushId(15, tmpId);
            
                storeActiveNoteInfo(tmpNote, Globals.played_notes[i].velocity,Globals.played_notes[i].start_time, tmpId);
                                     
                resetPlayedNote(i);
            }
    
        }

        // play interval
        if(i < 8){
            tmp = Engine.getUptime() - Globals.intervalBuffer[i].start_time;
            if(tmp >= Globals.playback_delay && Globals.intervalBuffer[i].note != 0){
                //Engine.showMessage(tmp);
                local identifier = Globals.intervalBuffer[i].interval+1;//  + "_hard";
                
                if(Globals.intervalBuffer[i].velocity <= Globals.Interface.Soft_velocity.getValue())
                    identifier = Globals.intervalBuffer[i].interval;
                //identifier = Globals.intervalBuffer[i].interval + "_soft";
                
                //log(identifier);
                
                local tmpId = playNote(Globals.intervalBuffer[i].note, Globals.intervalBuffer[i].velocity, Globals.Interface.Neighbour_RR.getValue(), Globals.intervalBuffer[i].start_time, identifier+2);  
           
                pushId(identifier+2, tmpId);
                
                storeActiveNoteInfo(Globals.intervalBuffer[i].note, Globals.intervalBuffer[i].velocity, Globals.intervalBuffer[i].start_time, tmpId);
                
                Intervals.resetInterval(i);
            }
        }
        
        /*if(Intervals.count() > 0){
            tmp = Engine.getUptime() - Intervals.firstElementStart();
            log(Intervals.firstElement().interval);
            
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
            

        }*/
    }
}
function onNoteOn()
{        
    Message.ignoreEvent(true);
    
    noteOn = Message.getNoteNumber();

    // store played note info if it is within range
    //if(note >= playable_range[0] & note <= playable_range[1]){
    //var velocity = Message.getVelocity();       
    storePlayedNoteInfo(noteOn, Message.getVelocity());
    //}
        
    // set value in midi list 
    Globals.midiList.setValue(noteOn, 1);
}
function onNoteOff()
{ 
    Message.ignoreEvent(true);
        
    //var note = Message.getNoteNumber();

	//storeReleaseNoteInfo(note);
	
	// set value in midi list 
    Globals.midiList.setValue(Message.getNoteNumber(), 0);
    
}
function onController()
{
	if(Message.getControllerNumber() == 64){
	    Globals.CC.setValue(64, Message.getControllerValue());
	}
}
function onTimer()
{
    if(Interface.Predictive_Playback.getValue() == 1 && Globals.midiList.getValue(Globals.key_switches.harmonics) == 0){
        Intervals.findIntervals(); 
    }
        
	playNotes();
}
function onControl(number, value)
{
	
}
