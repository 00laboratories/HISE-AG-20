const var identifier = "4th_hard";

reg input_id;
function onNoteOn()
{
    input_id = Message.getEventId();

	for(var i = 0; i < Globals.SamplerNoteIds[identifier].length; i++){
	    if(Globals.SamplerNoteIds[identifier][i] == input_id){
	        Globals.SamplerNoteIds[identifier].remove(input_id);
	        return;
	    }
	}
	
	// if loop doesn't find id, ignore event
	Message.ignoreEvent(true);
}

function onNoteOff()
{
	
}
function onController()
{
	
}
function onTimer()
{
	
}
function onControl(number, value)
{
	
}
