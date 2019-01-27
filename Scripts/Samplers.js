namespace Samplers
{
    reg muter;

    // all muters used to enable and disable samplers
    const var midiMuters = {
        SusSoft:Synth.getMidiProcessor("sustain soft muter"),
        SusHard:Synth.getMidiProcessor("sustain hard muter")
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