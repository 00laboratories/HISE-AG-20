
include("key_colors.js");

Synth.deferCallbacks(true);

Globals.initializeKeyColors();

Synth.startTimer(0.01);

function updateGUI(){
        
    // update harmonics gui elements
    if(Globals.midiList.getValue(Globals.key_switches.harmonics) == 1){
        Globals.Interface.Harmonics.setValue(1);
        Globals.setKeyColorRange(Globals.key_colors.green,50, 79);
    }else{
        Globals.Interface.Harmonics.setValue(0);
        // reset to white keys first
        Globals.setKeyColorRangeAlpha(0x00000000,50,79);
        // set the playable range back to correct color
        Globals.setKeyColorRange(Globals.key_colors.light_blue,50,76);
    }
    
    // update power slap gui elements
    if(Globals.midiList.getValue(Globals.key_switches.pwr_slap) == 1){
        Globals.Interface.Power_Slap.setValue(1);
        Globals.setKeyColorRange(Globals.key_colors.yellow,38, 38+12);
    }else{
        if(Globals.midiList.getValue(Globals.key_switches.harmonics) == 0){
            Globals.Interface.Power_Slap.setValue(0);
            Globals.setKeyColorRange(Globals.key_colors.light_blue,38, 38+12);
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
	updateGUI();
}
function onControl(number, value)
{
	
}
