// interface size
Content.makeFrontInterface(630, 334);

// include 
include("globals.js");
include("interface.js");

include("active_notes.js");
include("played_notes.js");
include("released_notes.js");


function onNoteOn()
{        
    Message.ignoreEvent(true);
    
    var note = Message.getNoteNumber();
    // store played note info if it is within range
    //if(note >= playable_range[0] & note <= playable_range[1]){
    var velocity = Message.getVelocity();       
    storePlayedNoteInfo(note, velocity);
    //}
        
    // set value in midi list 
    Globals.midiList.setValue(note, 1);

}
function onNoteOff()
{ 
    Message.ignoreEvent(true);
    
    var note = Message.getNoteNumber();

	storeReleaseNoteInfo(note);

	// set value in midi list 
    Globals.midiList.setValue(note, 0);
}
function onController()
{
	if(Message.getControllerNumber() == 64){
	    Globals.CC.setValue(64, Message.getControllerValue());
	}
}
function onTimer()
{
	
}
function onControl(number, value)
{
	
}
