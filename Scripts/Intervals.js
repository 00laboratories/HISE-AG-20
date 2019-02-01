namespace Intervals
{
    reg note;
    reg st; // semitones
          
    Globals.intervalBuffer = [];
    for(var i = 0; i < 8; i++){
        Globals.intervalBuffer[i] = {
            interval: "",
            velocity: 0,
            start_time: 0,
            note: 0
        };
    }
    Globals.intervalBufferIdx = 0;
    
    inline function storeInterval(interval, data){
        Globals.intervalBuffer[Globals.intervalBufferIdx].interval = interval;
        Globals.intervalBuffer[Globals.intervalBufferIdx].velocity = data.velocity;
        Globals.intervalBuffer[Globals.intervalBufferIdx].start_time = data.start_time;
        Globals.intervalBuffer[Globals.intervalBufferIdx].note = data.note;
         
        Globals.intervalBufferIdx = (Globals.intervalBufferIdx+1) % 8;
    }
    
    inline function resetInterval(i){
        Globals.intervalBuffer[i].interval = "";
        Globals.intervalBuffer[i].velocity = 0;
        Globals.intervalBuffer[i].start_time = 0;
        Globals.intervalBuffer[i].note = 0;
    }
            
    inline function resetIntervalNotes(i1, i2){
        Globals.resetPlayedNote(i1);
        Globals.resetPlayedNote(i2);
    }

    inline function findIntervals(){
        for(var i = 0; i < 64; i++){
            note = played_notes[i].note;
            if(note >= Globals.interval_boundaries[0] && note <= Globals.interval_boundaries[1]){
                for(var j = 0; j < 64; j++){
                    
                   st = Globals.played_notes[j].note - note;
                   if(st == 7){
                       storeInterval("5th", Globals.played_notes[i]);
                       //log("5th - " + note);
                       resetIntervalNotes(i,j);
                       break;
                   }else if(st == 5){
                        storeInterval("4th", Globals.played_notes[i]);
                        //log("4th - " + note);
                        resetIntervalNotes(i,j);
                        break;
                   }else if(st == 4){
                        storeInterval("maj3rd", Globals.played_notes[i]);
                        //log("maj 3rd - " + note);
                        resetIntervalNotes(i,j);
                        break;
                   }else if(st == 3){
                        storeInterval("min3rd", Globals.played_notes[i]);
                        //log("min 3rd - " + note);
                        resetIntervalNotes(i,j);
                        break;
                   }
               }
            }
        }
    }
}