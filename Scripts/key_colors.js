Globals.key_colors = {
    light_blue:0x329cff,
    red:0xff3939,
    yellow:0xfff538,
    green:0x37ff45,
    pink:0xf136ff
};

// set color of key range, 0x66 alpha
Globals.setKeyColorRange = function(color,start,end){
    for(var i = start; i <= end; i++)
        Engine.setKeyColour(i, 0x66000000 + color);
};

// set color of key range with alpha
Globals.setKeyColorRangeAlpha = function(color,start,end){
    for(var i = start; i <= end; i++)
        Engine.setKeyColour(i, color);
};
    
// key color name mapping
Globals.initializeKeyColors = function(){

    // set key color playable range
    Globals.setKeyColorRangeAlpha(0x00000000,0,127);

    Globals.setKeyColorRange(Globals.key_colors.light_blue,38,76);
    Globals.setKeyColorRange(Globals.key_colors.red,Globals.key_switches.perc[0],Globals.key_switches.perc[1]);
    Globals.setKeyColorRange(Globals.key_colors.pink,Globals.key_switches.slide,Globals.key_switches.slide);
    Globals.setKeyColorRange(Globals.key_colors.yellow,Globals.key_switches.pwr_slap,Globals.key_switches.pwr_slap);
    Globals.setKeyColorRange(Globals.key_colors.green,Globals.key_switches.harmonics,Globals.key_switches.harmonics);
}