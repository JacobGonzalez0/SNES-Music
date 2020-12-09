(function () {
    
    class Screen{

        canvas;
        ctx;
        controllerImg;

        constructor(){

            //setup graphics context
            this.canvas = document.getElementById("myCanvas");
            this.ctx = this.canvas.getContext("2d");

            this.controllerImg = new Image;
            this.controllerImg.src = "img/controller.png"

        }




    }

    class Controller{

        buttons;
        keymap;
        sound;

        constructor(sound){

            document.addEventListener("keydown", event => this.keyDown(event))
            document.addEventListener("keyup", event => this.keyUp(event))

            this.sound = sound; //makes a pointer to the sound object
            this.buttons = {}

            //setup binds
            this.keymap = {
                90: "C3",
                83: "C3#",
                88: "D3",
                68: "D3#",
                67: "E3",
                86: "F3",
                71: "F3#",
                66: "G3",
                72: "G3#",
                78: "A3",
                74: "A3#",
                77: "B3"
            } 

            this.setBind(82, "D5") // R
            this.setBind(9,"B4") //tests tab 
            

        }

        keyDown(event){
            event.preventDefault();

            //checks if the button has been pressed so the repeat doesnt fire
            if(!this.buttons[event.keyCode]){
                this.sound.playTone(
                    0, //the tone
                    this.keymap[event.keyCode] // the note
                );
            }
            //marks the button to have been pressed
            this.buttons[event.keyCode] = true;
        }

        keyUp(event){
            event.preventDefault();
            this.sound.stopTone(
                0, //the tone
                this.keymap[event.keyCode] // the note
            );
            this.buttons[event.keyCode] = false;
        }

        getButtonState(){
            return buttons;
        }

        setBind(keycode, note){
            if(typeof keycode !== 'number') return false;
            if(typeof note !== 'string') return false;
            
            var possibleNotes = ['a','b','c','d','e','f','g']

            for(var i = 0; i < possibleNotes.length; i++){
                //test if the first character of the note is proper
                if(note[0].toLowerCase() == possibleNotes[i]){
                    if(note[1] < 0 || note[1] >= 8) return false //checks if the octive is valid
                    this.keymap[keycode] = note;
                    return true; //makes sure the user knows it passed
                }
            }
            
            return false
        }

    }

    class Sound{

        tones;
        vol;

        constructor(){
            //stores all tones
            this.tones = []
            //setup volume object to pipe everything though
            this.vol = new Tone.Volume(-12).toDestination();
        }

        createTone(type, release = 0.10){
            
            let options =  {
                oscillator:{
                    type: type
                },
                envelope:{
                    release: release
                }
            }
            
            //create the synth object and pipe it to the volume object
            
            this.tones.push( new Tone.PolySynth(Tone.Synth, options).connect(this.vol) )
            console.log(this.tones)
        }

        deleteTone(index){

            if(typeof index === 'number'){

                this.tones[index].disconnect(); // disconnect the tone from volume
                this.tones.splice(index, 1); // remove from array

            }else if(typeof index === 'string'){

                let i = this.tones.indexOf(index)
                this.tones[index].disconnect(); // disconnect the tone from volume
                this.tones.splice(index, 1); // remove from array

            }else{
                //if its invalid input return false
                return false
            }
            
        }

        playTone(tone, note, velocity = .5){
            console.log(note)

            this.getTone(tone).triggerAttack(note)

        }

        stopTone(tone, note){

            this.getTone(tone).triggerRelease(note)

        }

        getTone(tone){

            if(typeof tone === 'number'){

                return this.tones[tone]

            }else if(typeof tone === 'string'){

                let i = this.tones.indexOf(tone) // get the index of the tone
                return this.tones[index]

            }else{

                return false;

            }
        }




    }

    class Main{

        screen;
        controller;
        sound;

        constructor(){

            this.screen = new Screen;
            this.sound = new Sound;
            this.controller = new Controller(this.sound);

            this.sound.createTone("sawtooth")

            //debug
            setTimeout(()=>{
                this.sound.stopTone(0);
            },2000)
            
        }


    }

    const main = new Main()
    
})();
