namespace Samplers
{
    reg muter;

    // all muters used to enable and disable samplers
    /*const var midiMuters = {
        sus_soft:Synth.getMidiProcessor("sustain soft muter"),
        sus_hard:Synth.getMidiProcessor("sustain hard muter"),
        min3rd_soft:Synth.getMidiProcessor("interval min3rd soft muter"),
        min3rd_hard:Synth.getMidiProcessor("interval min3rd hard muter"),
        maj3rd_soft:Synth.getMidiProcessor("interval maj3rd soft muter"),
        maj3rd_hard:Synth.getMidiProcessor("interval maj3rd hard muter"),
        "4th_soft":Synth.getMidiProcessor("interval 4th soft muter"),
        "4th_hard":Synth.getMidiProcessor("interval 4th hard muter"),
        "5th_soft":Synth.getMidiProcessor("interval 5th soft muter"),
        "5th_hard":Synth.getMidiProcessor("interval 5th hard muter"),
        perc1:Synth.getMidiProcessor("perc1 muter"),
        perc2:Synth.getMidiProcessor("perc2 muter"),
        perc3:Synth.getMidiProcessor("perc3 muter"),
        perc4:Synth.getMidiProcessor("perc4 muter"),
        perc5:Synth.getMidiProcessor("perc5 muter"),
        pwr_slap_soft:Synth.getMidiProcessor("pwr slap soft muter"),
        pwr_slap_hard:Synth.getMidiProcessor("pwr slap hard muter"),
        harmonics:Synth.getMidiProcessor("harmonics muter"),
        noise_slide:Synth.getMidiProcessor("noise slide muter"),
        release:Synth.getMidiProcessor("release muter"),
    };*/
    
    

    // mute all samplers
    inline function disableAll(){
        for(key in midiMuters){
            muter = midiMuters[key];
            muter.setAttribute(0, 1);
        }
    };
    
    inline function enable(name){
        midiMuters[name].setAttribute(0,0);
    }
}