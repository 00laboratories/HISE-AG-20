const var identifier = 5;

reg input_id;
function onNoteOn()
{
    input_id = Message.getEventId();

    local i;
	for(i = 0; i < 8; i++){
	    if(Globals.SamplerNoteIds[identifier][i] === input_id){   
	        Globals.SamplerNoteIds[identifier][i] = -1;
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
