namespace Intervals
{
    reg note;
    reg st; // semitones
    
    var map = {
      "5th":1,
      "4th":2,
      "maj3rd":3,
      "min3rd":4
    };
      
    var intervalArray = [];
    
    inline function storeInterval(i, data){
        local obj = {
            interval: map[i],
            velocity: data.velocity,
            start: data.start_time,
            note: data.note
        };
                
        intervalArray.push(obj);
    }
    
    inline function resetIntervalNotes(i1, i2){
        Globals.resetPlayedNote(i1);
        Globals.resetPlayedNote(i2);
    }

    inline function findIntervals(){
        for(var i = 0; i < 32; i++){
            note = played_notes[i].note;
            if(note >= Globals.playable_range[0] && note <= Globals.playable_range[1]){
               for(var j = 0; j < 32; j++){
                   st = note - Globals.played_notes[j].note;
                   if(st == 7){
                       storeInterval("5th", Globals.played_notes[i]);
                       resetIntervalNotes(i,j);
                       break;
                   }else if(st == 5){
                        storeInterval("4th", Globals.played_notes[i]);
                        resetIntervalNotes(i,j);
                        break;
                   }else if(st == 4){
                        storeInterval("maj3rd", Globals.played_notes[i]);
                        resetIntervalNotes(i,j);
                        break;
                   }else if(st == 3){
                        storeInterval("min3rd", Globals.played_notes[i]);
                        resetIntervalNotes(i,j);
                        break;
                   }
               }
            }
        }
    }
}