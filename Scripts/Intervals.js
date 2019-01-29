namespace Intervals
{
    reg note;
    reg st; // semitones
          
    var intervalArray = [];
    
    inline function storeInterval(interval, data){
        local obj = {
            interval: interval,
            velocity: data.velocity,
            start: data.start_time,
            note: data.note
        };
                        
        intervalArray.push(obj);
    }
    
    inline function count(){
        return intervalArray.length;
    }
    
    inline function popInterval(){
        local obj = intervalArray[0];
        intervalArray.remove(0);
        return obj;
    }
    
    inline function firstElementStart(){
        return intervalArray[0].start_time;
    }
    
    inline function resetIntervalNotes(i1, i2){
        Globals.resetPlayedNote(i1);
        Globals.resetPlayedNote(i2);
    }

    inline function findIntervals(){
        for(var i = 0; i < 32; i++){
            note = played_notes[i].note;
            if(note >= Globals.interval_boundaries[0] && note <= Globals.interval_boundaries[1]){
                for(var j = 0; j < 32; j++){
                   // make sure notes are in interval range
//                   if(Globals.played_notes[j].note < Globals.interval_boundaries[0])
//                        continue;
      
                   st = Globals.played_notes[j].note - note;
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