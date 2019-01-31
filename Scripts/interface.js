
// ui elements 
Globals.Interface = {
    Release_Knob : Content.getComponent("Release Knob"),
    Power_Slap : Content.getComponent("Power Slap"),
    Harmonics : Content.getComponent("Harmonics"),
    Soft_velocity : Content.getComponent("Soft Velocity"),
    Predictive_Playback : Content.getComponent("PP button"),
    Neighbour_RR : Content.getComponent("Neighbour RR"),
    Release_Samples_Button : Content.getComponent("Release Samples Button"),
    Fake_12str : Content.getComponent("12 Str Volume"),



};


inline function onPP_buttonControl(component, value)
{
	switch(value){
	    case 0:
	        Globals.playback_delay = 0;
	        break;
	    case 1:
	        Globals.playback_delay = 25/1000;
	        break;
	}
};

Content.getComponent("PP button").setControlCallback(onPP_buttonControl);
