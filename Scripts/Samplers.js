namespace Samplers
{
    reg muter;

    // all muters used to enable and disable samplers
    const var midiMuters = {
        sus_soft:Synth.getMidiProcessor("sustain soft muter"),
        sus_hard:Synth.getMidiProcessor("sustain hard muter"),
        min3rd_soft:Synth.getMidiProcessor("interval min3rd soft muter"),
        min3rd_hard:Synth.getMidiProcessor("interval min3rd hard muter"),
        maj3rd_soft:Synth.getMidiProcessor("interval maj3rd soft muter"),
        maj3rd_hard:Synth.getMidiProcessor("interval maj3rd hard muter"),
        "4th_soft":Synth.getMidiProcessor("interval 4th soft muter"),
        "4th_hard":Synth.getMidiProcessor("interval 4th hard muter"),
        "5th_soft":Synth.getMidiProcessor("interval 5th soft muter"),
        "5th_hard":Synth.getMidiProcessor("interval 5th hard muter")
    };

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