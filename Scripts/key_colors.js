// key color name mapping
Globals.key_colors = {
    light_blue:0x329cff,
    red:0xff3939,
    yellow:0xfff538,
    green:0x37ff45,
    pink:0xf136ff
};

// set color of key range, 0x66 alpha
inline function setKeyColorRange(color,start,end){
    for(var i = start; i <= end; i++)
        Engine.setKeyColour(i, 0x66000000 + color);
};

// set color of key range with alpha
inline function setKeyColorRangeAlpha(color,start,end){
    for(var i = start; i <= end; i++)
        Engine.setKeyColour(i, color);
};

// set key color playable range
setKeyColorRangeAlpha(0x00000000,0,127);

setKeyColorRange(key_colors.light_blue,38,76);
setKeyColorRange(key_colors.red,key_switches.perc[0],key_switches.perc[1]);
setKeyColorRange(key_colors.pink,key_switches.slide,key_switches.slide);
setKeyColorRange(key_colors.yellow,key_switches.pwr_slap,key_switches.pwr_slap);
setKeyColorRange(key_colors.green,key_switches.harmonics,key_switches.harmonics);
