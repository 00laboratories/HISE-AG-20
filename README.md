# AG-20 for HISE
Fingerpicked Acoustic Guitar Library (AG-20) for HISE. The guitar is a Richwood A-20.
Samples are not included and [can be purchased from our store](https://00laboratories.com/product/acoustic-guitar-library).

<p align="center">
  <img src="https://00laboratories.com/wp-content/uploads/2019/02/ag-20-vst-interface.png" />
</p>

### Description
- Sampled range is from D1 to E4, sampling is done for each string until the note of the next string is reached, so there are no recordings of every single note of every string.
- Soft and Hard dynamics for every note and interval.
- 5 percussion samples with 6 round robins each.
- Chord change/sliding noise with 21 round robins.
- Power chord slaps from D1 to D2 with both soft and hard dynamic layers and 2 round robins.
- When the Power Slap keyswitch is held down they keyboard range where it is playable will change color.
- Release samples for every note with 2 round robins.
- - Release samples can only trigger if release time is set to 250ms or lower.
- Harmonics in range D2 to G4 with 2 round robins.
- 12-string guitar simulation mode, in octaves up to the high E string. From there it turns into unison.
 

### Predictive Playback
When this option is enabled the script will add a 25ms audio delay to give it time to analyze the midi notes.
If a Major 3rd, Minor 3rd, 4th or 5th interval is played on the D string and above, a real sample of that interval will be played instead of two individual notes.

Depending on the order of the notes, a root position major chord could be played as follows:

- a Major 3rd interval sample + a solo 5th sample.
- a 5th interval sample + a 3rd solo sample.
- a Minor 3rd interval sample + a root note solo sample.
 

### Example Tracks
These example tracks only use the AG-20 library.

- [Example 1](https://00laboratories.com/wp-content/uploads/2019/01/AG-20_RT_demo.mp3) © by Rotho 2019
- [Example 2](https://00laboratories.com/wp-content/uploads/2019/01/AG-20_example_track_2.mp3) © by Joakim Lövgren 2019

### Minimum System Requirements
HISE instrument was built with HISE 2.0 build 650.
