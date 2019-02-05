// interface size
Content.makeFrontInterface(630, 334);

// include 
include("globals.js");
include("interface.js");

include("active_notes.js");
include("active_notes_functions.js");

include("played_notes.js");
include("played_notes_functions.js");

include("released_notes.js");

reg noteOn;
reg noteOff;function onNoteOn()
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
    /*if(Globals.Interface.Predictive_Playback.getValue() == 1 && Globals.midiList.getValue(Globals.key_switches.harmonics) == 0){
        Intervals.findIntervals(); 
    }       
	playNotes();*/
}
function onControl(number, value)
{
	
}
