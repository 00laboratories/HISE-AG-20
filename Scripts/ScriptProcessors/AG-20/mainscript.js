// interface size
Content.makeFrontInterface(630, 334);

// include 
include("globals.js");
include("interface.js");

include("active_notes.js");
include("played_notes.js");
include("released_notes.js");

reg note;
reg velocity;
function onNoteOn()
{        
   /* Message.ignoreEvent(true);
    
    note = Message.getNoteNumber();
    // store played note info if it is within range
    //if(note >= playable_range[0] & note <= playable_range[1]){
    velocity = Message.getVelocity();       
    storePlayedNoteInfo(note, velocity);
    //}
        
    // set value in midi list 
    Globals.midiList.setValue(note, 1);*/

}
function onNoteOff()
{ 
    /*Message.ignoreEvent(true);
        
    note = Message.getNoteNumber();

	//storeReleaseNoteInfo(note);

	// set value in midi list 
    Globals.midiList.setValue(note, 0);*/
    
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
