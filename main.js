var selectPressed = 0;

var vol = new Tone.Volume(-12);



var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d")
var controllerImage = new Image;
controllerImage.src = "controller.png";
var select = new Image;
select.src = "select.png";
var keymode = 1;
var buttons = {}
var directions = {}
directions.down = function(){
    return 0;
}
directions.up = function(){
    return 0;
}
directions.left = function(){
    return 0;
}
directions.right = function(){
    return 0;
}

//getkeymode
var keyselector = document.getElementById("keyselect");
var keyboardInfo = document.getElementById("keyboardInfo");

keyselector.onchange = function(){
  if(keyselector[0].checked){
    keymode = 0;
    keyboardInfo.innerHTML = ""
  }else if(keyselector[1].checked){
    keymode = 1;
    keyboardInfo.innerHTML = "<img class='keybind' src='buttons/A.png'> = <img class='keybind' src='keys/keys_101.png'> "
    keyboardInfo.innerHTML += "<img class='keybind' src='buttons/B.png'> = <img class='keybind' src='keys/keys_103.png'>   "
    keyboardInfo.innerHTML += "<img class='keybind' src='buttons/LEFT.png'> = <img class='keybind' src='keys/keys_072.png'>  "
    keyboardInfo.innerHTML += "<img class='keybind' src='buttons/RIGHT.png'> = <img class='keybind' src='keys/keys_083.png'><br />"

    keyboardInfo.innerHTML += "<img class='keybind' src='buttons/Y.png'> = <img class='keybind' src='keys/keys_089.png'> "
    keyboardInfo.innerHTML += "<img class='keybind' src='buttons/X.png'> = <img class='keybind' src='keys/keys_080.png'> "
    keyboardInfo.innerHTML += "<img class='keybind' src='buttons/UP.png'> = <img class='keybind' src='keys/keys_091.png'> "
    keyboardInfo.innerHTML += "<img class='keybind' src='buttons/DOWN.png'> = <img class='keybind' src='keys/keys_082.png'><br />"

    keyboardInfo.innerHTML += "<img class='keybind' src='buttons/R.png'> = Right Shift "
    keyboardInfo.innerHTML += "<img class='keybind' src='buttons/L.png'> = Left Shift "
    keyboardInfo.innerHTML += "<img class='keybind' src='buttons/SELECT.png'> = <img class='keybind1' src='keys/keys_150.png'> "

  }else if(keyselector[2].checked){
    keymode = 2;
    keyboardInfo.innerHTML = ""
  }
}

var pulseOptions = {
  oscillator:{
    type: "pulse"
  },
  envelope:{
    release: 0.07
  }
};


var sawtoothOptions = {
  oscillator:{
    type: "sawtooth"
  },
  envelope:{
    release: 0.07
  }
};

var triangleOptions = {
  oscillator:{
    type: "triangle"
  },
  envelope:{
    release: 0.07
  }
};

var squareOptions = {
  oscillator:{
    type: "square"
  },
  envelope:{
    release: 0.07
  }
};


var pulseSynth    = new Tone.Synth(pulseOptions).connect(vol);
var squareSynth   = new Tone.Synth(squareOptions).connect(vol);
var sawtoothSynth   = new Tone.Synth(sawtoothOptions).connect(vol);
var triangleSynth = new Tone.Synth(triangleOptions).connect(vol);
var noiseSynth    = new Tone.NoiseSynth().connect(vol);
var bassSynth = new Tone.MembraneSynth().connect(vol);

//janky ass volume stuffs
pulseSynth.chain(vol, Tone.Master);
squareSynth.chain(vol, Tone.Master);
sawtoothSynth.chain(vol, Tone.Master);
triangleSynth.chain(vol, Tone.Master);
noiseSynth.chain(vol, Tone.Master);
vol.toMaster();

var currentInstument = 2;

Tone.Transport.bpm.value = 100;

var drumPressed = 0;

//Gamepad stuffs
var interval;
var gamepads



if (!('ongamepadconnected' in window)) {
  // No gamepad events available, poll instead.
  interval = setInterval(pollGamepads, 10);
}

function pollGamepads() {

  //poll pads status
  gamepads =  navigator.getGamepads()
  volumeCtl()
  processInput()
  buttonIns()
  directionsIns()
  changeIns()
  volumeCtl()

 ctx.clearRect(0, 0, canvas.width, canvas.height);
 ctx.drawImage(controllerImage,20,20)
 if(buttons.B == 1){
   ctx.drawImage(select,395,325,30,30)
 }

 if(buttons.A == 1){
   ctx.drawImage(select,440,287,30,30)
 }

 if(buttons.Y == 1){
   ctx.drawImage(select,350,287,30,30)
 }

 if(buttons.X == 1){
   ctx.drawImage(select,395,250,30,30)
 }

 if(buttons.R == 1){
   ctx.drawImage(select,395,200,45,15)
 }

 if(buttons.L == 1){
   ctx.drawImage(select,110,200,45,15)
 }

 if(directions.right() == 1){
   //left
   ctx.drawImage(select,150,287,30,30)
 }
 if(directions.left() == 1){
   //right
   ctx.drawImage(select,100,287,30,30)
 }
 if(directions.down() == 1){
   //Down
   ctx.drawImage(select,125,310,30,30)
 }
 if(directions.up() == 1){
   //Up
   ctx.drawImage(select,125,260,30,30)
 }

 if(buttons.START == 1){
   ctx.drawImage(select,265,300,30,30)
 }
 if(buttons.SELECT == 1){
   ctx.drawImage(select,215,300,30,30)
 }
 drawIns()

}






function processInput(){

  if(keymode == 0){
    buttons.A = gamepads[0].buttons[1].value
    buttons.B = gamepads[0].buttons[2].value
    buttons.X = gamepads[0].buttons[0].value
    buttons.Y = gamepads[0].buttons[3].value
    buttons.R = gamepads[0].buttons[5].value
    buttons.L = gamepads[0].buttons[4].value
    buttons.START = gamepads[0].buttons[9].value
    buttons.SELECT = gamepads[0].buttons[8].value

   directions.left = function(){
     if(gamepads[0].axes[0] == -1){
       return 1;
     }else{
       return 0;
     }
   }
   directions.right = function(){
     if(gamepads[0].axes[0] == 1){
       return 1;
     }else{
       return 0;
     }
   }
   directions.up = function(){
     if(gamepads[0].axes[1] == -1){
       return 1;
     }else{
       return 0;
     }
   }
   directions.down = function(){
     if(gamepads[0].axes[1] == 1){
       return 1;
     }else{
       return 0;
     }
   }
  }
}


var isPlaying = {};
isPlaying.T = 0;
isPlaying.S = 0;




function buttonIns(){

  if(buttons.X == 1 && buttons.R == 0 && buttons.A == 0 && buttons.Y == 0){
    //X
    if(isPlaying.T){
      triangleSynth.setNote("D3")
    }else{
      triangleSynth.triggerAttack("D3")
      isPlaying.T = 1;
    }
     drumPressed = 0;

  }else if(buttons.A == 1 && buttons.R == 0 && buttons.X == 0 && buttons.B == 0){
    //A
    if(isPlaying.T){
      triangleSynth.setNote('A2')
    }else{
      triangleSynth.triggerAttack('A2')
      isPlaying.T = 1;
    }

  }else if(buttons.B == 1 && buttons.R == 0 && buttons.Y == 0 && buttons.A == 0){
    //B
    if(isPlaying.T){
      triangleSynth.setNote('B2')
    }else{
      triangleSynth.triggerAttack('B2')
      isPlaying.T = 1;
    }

  }else if(buttons.Y == 1 && buttons.R == 0 && buttons.B == 0 && buttons.X == 0){
    //Y
    if(isPlaying.T){
      triangleSynth.setNote('C3')
    }else{
      triangleSynth.triggerAttack('C3')
      isPlaying.T = 1;
    }

  }else if(buttons.X == 1 && buttons.R == 0 && buttons.A == 1 && buttons.Y == 0){
    //X + A
    if(isPlaying.T){
      triangleSynth.setNote('D#3')
    }else{
      triangleSynth.triggerAttack('D#3')
      isPlaying.T = 1;
    }
     drumPressed = 0;

  }else if(buttons.A == 1 && buttons.R == 0 && buttons.X == 0 && buttons.B == 1){
    //A + B
    if(isPlaying.T){
      triangleSynth.setNote('A#2')
    }else{
      triangleSynth.triggerAttack('A#2')
      isPlaying.T = 1;
    }

  }else if(buttons.B == 1 && buttons.R == 0 && buttons.Y == 1 && buttons.A == 0){
    //B + Y
    if(isPlaying.T){
      triangleSynth.setNote('B#2')
    }else{
      triangleSynth.triggerAttack('B#2')
      isPlaying.T = 1;
    }

  }else if(buttons.Y == 1 && buttons.R == 0 && buttons.B == 0 && buttons.X == 1){
    //Y + X
    if(isPlaying.T){
      triangleSynth.setNote('C#3')
    }else{
      triangleSynth.triggerAttack('C#3')
      isPlaying.T = 1;
    }

  }else if(buttons.X == 1 && buttons.R == 1 && buttons.A == 0 && buttons.Y == 0){
      //X + R
      if(drumPressed == 0){
        noiseSynth.triggerAttackRelease()
        drumPressed = 1;
      }
  }else if(buttons.A == 1 && buttons.R == 1 && buttons.X == 0 && buttons.B == 0){
      //A + R
      if(isPlaying.T){
        triangleSynth.setNote('E3')
      }else{
        triangleSynth.triggerAttack('E3')
        isPlaying.T = 1;
      }

  }else if(buttons.B == 1 && buttons.R == 1 && buttons.Y == 0 && buttons.A == 0){
      //B + R
      if(isPlaying.T){
        triangleSynth.setNote('F3')
      }else{
        triangleSynth.triggerAttack('F3')
        isPlaying.T = 1;
      }

  }else if(buttons.Y == 1 && buttons.R == 1 && buttons.X == 0 && buttons.B == 0){
      //Y + R
      if(isPlaying.T){
        triangleSynth.setNote('G3')
      }else{
        triangleSynth.triggerAttack('G3')
        isPlaying.T = 1;
      }

  }else if(buttons.X == 1 && buttons.R == 1 && buttons.A == 1 && buttons.Y == 0){
      //X + R + A
      if(drumPressed == 0){
        //bassSynth.triggerAttack("C1", "8n");
        //bug to fix with bass drum
        drumPressed = 1;
      }
  }else if(buttons.A == 1 && buttons.R == 1 && buttons.X == 0 && buttons.B == 1){
      //A + R + B
      if(isPlaying.T){
        triangleSynth.setNote('E#3')
      }else{
        triangleSynth.triggerAttack('E#3')
        isPlaying.T = 1;
      }

  }else if(buttons.B == 1 && buttons.R == 1 && buttons.Y == 1 && buttons.A == 0){
      //B + R + Y
      if(isPlaying.T){
        triangleSynth.setNote('F#3')
      }else{
        triangleSynth.triggerAttack('F#3')
        isPlaying.T = 1;
      }

  }else if(buttons.Y == 1 && buttons.R == 1 && buttons.X == 1 && buttons.B == 0){
      //Y + R + X
      if(isPlaying.T){
        triangleSynth.setNote('G#3')
      }else{
        triangleSynth.triggerAttack('G#3')
        isPlaying.T = 1;
      }

  }else if(
    buttons.A == 0 &&
    buttons.B == 0 &&
    buttons.Y == 0 &&
    buttons.X == 0
 ){
   drumPressed = 0;
   isPlaying.T = 0;
   triangleSynth.triggerRelease();
 }
}

function directionsIns(){

  if(directions.right() == 1 && buttons.L == 0 && directions.down() == 0 && directions.up() == 0){
    //right
    if(currentInstument == 0){
      if(isPlaying.S){
        squareSynth.setNote('A4')
      }else{
        squareSynth.triggerAttack('A4')
        isPlaying.S = 1;
      }
    }else if(currentInstument == 1){
      if(isPlaying.S){
        pulseSynth.setNote('A4')
      }else{
        pulseSynth.triggerAttack('A4')
        isPlaying.S = 1;
      }
    }else if(currentInstument == 2){
      if(isPlaying.S){
        sawtoothSynth.setNote('A4')
      }else{
        sawtoothSynth.triggerAttack('A4')
        isPlaying.S = 1;
      }
    }


  }else if(directions.down() == 1 && buttons.L == 0 && directions.left() == 0 && directions.right() == 0){
    //down
    if(currentInstument == 0){
      if(isPlaying.S){
        squareSynth.setNote('B4')
      }else{
        squareSynth.triggerAttack('B4')
        isPlaying.S = 1;
      }
    }else if(currentInstument == 1){
      if(isPlaying.S){
        pulseSynth.setNote('B4')
      }else{
        pulseSynth.triggerAttack('B4')
        isPlaying.S = 1;
      }
    }else if(currentInstument == 2){
      if(isPlaying.S){
        sawtoothSynth.setNote('B4')
      }else{
        sawtoothSynth.triggerAttack('B4')
        isPlaying.S = 1;
      }
    }

  }else if(directions.left() == 1 && buttons.L == 0 && directions.up() == 0 && directions.down() == 0){
    //left

    if(currentInstument == 0){
      if(isPlaying.S){
        squareSynth.setNote('C5')
      }else{
        squareSynth.triggerAttack('C5')
        isPlaying.S = 1;
      }
    }else if(currentInstument == 1){
      if(isPlaying.S){
        pulseSynth.setNote('C5')
      }else{
        pulseSynth.triggerAttack('C5')
        isPlaying.S = 1;
      }
    }else if(currentInstument == 2){
      if(isPlaying.S){
        sawtoothSynth.setNote('C5')
      }else{
        sawtoothSynth.triggerAttack('C5')
        isPlaying.S = 1;
      }
    }

  }else if(directions.up() == 1 && buttons.L == 0 && directions.left() == 0 && directions.right() == 0){
    //up

    if(currentInstument == 0){
      if(isPlaying.S){
        squareSynth.setNote('D5')
      }else{
        squareSynth.triggerAttack('D5')
        isPlaying.S = 1;
      }
    }else if(currentInstument == 1){
      if(isPlaying.S){
        pulseSynth.setNote('D5')
      }else{
        pulseSynth.triggerAttack('D5')
        isPlaying.S = 1;
      }
    }else if(currentInstument == 2){
      if(isPlaying.S){
        sawtoothSynth.setNote('D5')
      }else{
        sawtoothSynth.triggerAttack('D5')
        isPlaying.S = 1;
      }
    }

  }else if(directions.right() == 1 && buttons.L == 0 && directions.down() == 1 && directions.up() == 0){
    //right + down

    if(currentInstument == 0){
      if(isPlaying.S){
        squareSynth.setNote('A#4')
      }else{
        squareSynth.triggerAttack('A#4')
        isPlaying.S = 1;
      }
    }else if(currentInstument == 1){
      if(isPlaying.S){
        pulseSynth.setNote('A#4')
      }else{
        pulseSynth.triggerAttack('A#4')
        isPlaying.S = 1;
      }
    }else if(currentInstument == 2){
      if(isPlaying.S){
        sawtoothSynth.setNote('A#4')
      }else{
        sawtoothSynth.triggerAttack('A#4')
        isPlaying.S = 1;
      }
    }

  }else if(directions.left() == 1 && buttons.L == 0 && directions.down() == 1 && directions.up() == 0){
    //left + down

    if(currentInstument == 0){
      if(isPlaying.S){
        squareSynth.setNote('B#4')
      }else{
        squareSynth.triggerAttack('B#4')
        isPlaying.S = 1;
      }
    }else if(currentInstument == 1){
      if(isPlaying.S){
        pulseSynth.setNote('B#4')
      }else{
        pulseSynth.triggerAttack('B#4')
        isPlaying.S = 1;
      }
    }else if(currentInstument == 2){
      if(isPlaying.S){
        sawtoothSynth.setNote('B#4')
      }else{
        sawtoothSynth.triggerAttack('B#4')
        isPlaying.S = 1;
      }
    }

  }else if(directions.left() == 1 && buttons.L == 0 && directions.down() == 0 && directions.up() == 1){
    //left + up

    if(currentInstument == 0){
      if(isPlaying.S){
        squareSynth.setNote('C#5')
      }else{
        squareSynth.triggerAttack('C#5')
        isPlaying.S = 1;
      }
    }else if(currentInstument == 1){
      if(isPlaying.S){
        pulseSynth.setNote('C#5')
      }else{
        pulseSynth.triggerAttack('C#5')
        isPlaying.S = 1;
      }
    }else if(currentInstument == 2){
      if(isPlaying.S){
        sawtoothSynth.setNote('C#5')
      }else{
        sawtoothSynth.triggerAttack('C#5')
        isPlaying.S = 1;
      }
    }

  }else if(directions.right() == 1 && buttons.L == 0 && directions.down() == 0 && directions.up() == 1){
    //right + up

    if(currentInstument == 0){
      if(isPlaying.S){
        squareSynth.setNote('D#5')
      }else{
        squareSynth.triggerAttack('D#5')
        isPlaying.S = 1;
      }
    }else if(currentInstument == 1){
      if(isPlaying.S){
        pulseSynth.setNote('D#4')
      }else{
        pulseSynth.triggerAttack('D#4')
        isPlaying.S = 1;
      }
    }else if(currentInstument == 2){
      if(isPlaying.S){
        sawtoothSynth.setNote('D#4')
      }else{
        sawtoothSynth.triggerAttack('D#4')
        isPlaying.S = 1;
      }
    }

  }else if(directions.right() == 1 && buttons.L == 1 && directions.down() == 0 && directions.up() == 0){
    //right

    if(currentInstument == 0){
      if(isPlaying.S){
        squareSynth.setNote('E5')
      }else{
        squareSynth.triggerAttack('E5')
        isPlaying.S = 1;
      }
    }else if(currentInstument == 1){
      if(isPlaying.S){
        pulseSynth.setNote('E5')
      }else{
        pulseSynth.triggerAttack('E5')
        isPlaying.S = 1;
      }
    }else if(currentInstument == 2){
      if(isPlaying.S){
        sawtoothSynth.setNote('E5')
      }else{
        sawtoothSynth.triggerAttack('E5')
        isPlaying.S = 1;
      }
    }

  }else if(directions.down() == 1 && buttons.L == 1 && directions.left() == 0 && directions.right() == 0){
    //down

    if(currentInstument == 0){
      if(isPlaying.S){
        squareSynth.setNote('F5')
      }else{
        squareSynth.triggerAttack('F5')
        isPlaying.S = 1;
      }
    }else if(currentInstument == 1){
      if(isPlaying.S){
        pulseSynth.setNote('F5')
      }else{
        pulseSynth.triggerAttack('F5')
        isPlaying.S = 1;
      }
    }else if(currentInstument == 2){
      if(isPlaying.S){
        sawtoothSynth.setNote('F5')
      }else{
        sawtoothSynth.triggerAttack('F5')
        isPlaying.S = 1;
      }
    }

  }else if(directions.left() == 1 && buttons.L == 1 && directions.up() == 0 && directions.down() == 0){
    //left

    if(currentInstument == 0){
      if(isPlaying.S){
        squareSynth.setNote('G5')
      }else{
        squareSynth.triggerAttack('G5')
        isPlaying.S = 1;
      }
    }else if(currentInstument == 1){
      if(isPlaying.S){
        pulseSynth.setNote('G5')
      }else{
        pulseSynth.triggerAttack('G5')
        isPlaying.S = 1;
      }
    }else if(currentInstument == 2){
      if(isPlaying.S){
        sawtoothSynth.setNote('G5')
      }else{
        sawtoothSynth.triggerAttack('G5')
        isPlaying.S = 1;
      }
    }


  }else if(directions.up() == 1 && buttons.L == 1 && directions.left() == 0 && directions.right() == 0){
    //up

    if(currentInstument == 0){
      if(isPlaying.S){
        squareSynth.setNote('A5')
      }else{
        squareSynth.triggerAttack('A5')
        isPlaying.S = 1;
      }
    }else if(currentInstument == 1){
      if(isPlaying.S){
        pulseSynth.setNote('A5')
      }else{
        pulseSynth.triggerAttack('A5')
        isPlaying.S = 1;
      }
    }else if(currentInstument == 2){
      if(isPlaying.S){
        sawtoothSynth.setNote('A5')
      }else{
        sawtoothSynth.triggerAttack('A5')
        isPlaying.S = 1;
      }
    }

  }else if(directions.right() == 1 && buttons.L == 1 && directions.down() == 1 && directions.up() == 0){
    //right + down

    if(currentInstument == 0){
      if(isPlaying.S){
        squareSynth.setNote('E#5')
      }else{
        squareSynth.triggerAttack('E#5')
        isPlaying.S = 1;
      }
    }else if(currentInstument == 1){
      if(isPlaying.S){
        pulseSynth.setNote('E#5')
      }else{
        pulseSynth.triggerAttack('E#5')
        isPlaying.S = 1;
      }
    }else if(currentInstument == 2){
      if(isPlaying.S){
        sawtoothSynth.setNote('E#5')
      }else{
        sawtoothSynth.triggerAttack('E#5')
        isPlaying.S = 1;
      }
    }

  }else if(directions.left() == 1 && buttons.L == 1 && directions.down() == 1 && directions.up() == 0){
    //left + down

    if(currentInstument == 0){
      if(isPlaying.S){
        squareSynth.setNote('F#5')
      }else{
        squareSynth.triggerAttack('F#5')
        isPlaying.S = 1;
      }
    }else if(currentInstument == 1){
      if(isPlaying.S){
        pulseSynth.setNote('F#5')
      }else{
        pulseSynth.triggerAttack('F#5')
        isPlaying.S = 1;
      }
    }else if(currentInstument == 2){
      if(isPlaying.S){
        sawtoothSynth.setNote('F#5')
      }else{
        sawtoothSynth.triggerAttack('F#5')
        isPlaying.S = 1;
      }
    }

  }else if(directions.left() == 1 && buttons.L == 1 && directions.down() == 0 && directions.up() == 1){
    //left + up

    if(currentInstument == 0){
      if(isPlaying.S){
        squareSynth.setNote('G#5')
      }else{
        squareSynth.triggerAttack('G#5')
        isPlaying.S = 1;
      }
    }else if(currentInstument == 1){
      if(isPlaying.S){
        pulseSynth.setNote('G#5')
      }else{
        pulseSynth.triggerAttack('G#5')
        isPlaying.S = 1;
      }
    }else if(currentInstument == 2){
      if(isPlaying.S){
        sawtoothSynth.setNote('G#5')
      }else{
        sawtoothSynth.triggerAttack('G#5')
        isPlaying.S = 1;
      }
    }

  }else if(directions.right() == 1 && buttons.L == 1 && directions.down() == 0 && directions.up() == 1){
    //right + up

    if(currentInstument == 0){
      if(isPlaying.S){
        squareSynth.setNote('A#5')
      }else{
        squareSynth.triggerAttack('A#5')
        isPlaying.S = 1;
      }
    }else if(currentInstument == 1){
      if(isPlaying.S){
        pulseSynth.setNote('A#5')
      }else{
        pulseSynth.triggerAttack('A#5')
        isPlaying.S = 1;
      }
    }else if(currentInstument == 2){
      if(isPlaying.S){
        sawtoothSynth.setNote('A#5')
      }else{
        sawtoothSynth.triggerAttack('A#5')
        isPlaying.S = 1;
      }
    }


  }else if(
    directions.left() == 0 &&
    directions.right() == 0 &&
    directions.up() == 0 &&
    directions.down() == 0
  ){

    if(currentInstument == 0){
      squareSynth.triggerRelease();
      isPlaying.S = 0;
    }else if(currentInstument == 1){
      pulseSynth.triggerRelease();
      isPlaying.S = 0;
    }else if(currentInstument == 2){
      sawtoothSynth.triggerRelease();
      isPlaying.S = 0;
    }




  }
}



function changeIns(){



  if(buttons.SELECT == 1 && currentInstument == 0){
    if(selectPressed == 0){
      currentInstument = 1
    }

  }else if(buttons.SELECT == 1 && currentInstument == 1){
    if(selectPressed == 0){
      currentInstument = 2
    }
  }else if(buttons.SELECT == 1 && currentInstument == 2){
      if(selectPressed == 0){
      currentInstument = 0
    }
  }

  if(selectPressed == 0 && buttons.SELECT == 1){
    selectPressed = 1;
  }else if(selectPressed == 1 && buttons.SELECT == 1){

  }else if(selectPressed == 1 && buttons.SELECT == 0){
    selectPressed = 0;
  }else if(selectPressed == 0 && buttons.SELECT == 0){

  }
}

function drawIns(){
  if(currentInstument == 0){
    ctx.font = "30px Arial";
    ctx.fillStyle = "yellow";
    ctx.textAlign = "center";
    ctx.fillText("Sound: Square",120,35);
  }else if(currentInstument == 1){
    ctx.font = "30px Arial";
    ctx.fillStyle = "yellow";
    ctx.textAlign = "center";
    ctx.fillText("Sound: Pulse",110,35);
  }else if(currentInstument == 2){
    ctx.font = "30px Arial";
    ctx.fillStyle = "yellow";
    ctx.textAlign = "center";
    ctx.fillText("Sound: Sawtooth",140,35);
  }
}


//keyboard support

document.addEventListener("keydown", keydownhandler);
document.addEventListener("keyup", keyuphandler);

function keydownhandler(e){
  e.preventDefault();
  if(keymode == 1){

    switch(e.keyCode){

      case 83:
        directions.down = function(){
            return 1;
        }
      break;

      case 87:
        directions.up = function(){
            return 1;
        }
      break;
      case 65:
        directions.left = function(){
            return 1;
        }
      break;
      case 68:
        directions.right = function(){
            return 1;
        }
      break;
      //buttons
      case 80:
        buttons.X = 1;
      break;
      case 222:
        buttons.A = 1;
      break;
      case 76:
        buttons.Y = 1;
      break;
      case 186:
        buttons.B = 1;
      break;
      case 32:
        buttons.SELECT = 1;
      break;
      //trigger
    }
    switch(e.code){
      case "ShiftRight":
        buttons.R = 1;
      break;
      case "ShiftLeft":
        buttons.L = 1;
      break;
    }

  }
}

function keyuphandler(e){
  e.preventDefault();
  if(keymode == 1){

    switch(e.keyCode){

      case 83:
        directions.down = function(){
            return 0;
        }
      break;

      case 87:
        directions.up = function(){
            return 0;
        }
      break;
      case 65:
        directions.left = function(){
            return 0;
        }
      break;
      case 68:
        directions.right = function(){
            return 0;
        }
      break;
      //buttons
      case 80:
        buttons.X = 0;
      break;
      case 222:
        buttons.A = 0;
      break;
      case 76:
        buttons.Y = 0;
      break;
      case 186:
        buttons.B = 0;
      break;
      case 32:
        buttons.SELECT = 0;
      break;

      //trigger
    }
    switch(e.code){
      case "ShiftRight":
        buttons.R = 0;
      break;
      case "ShiftLeft":
        buttons.L = 0;
      break;
    }

  }
}

function volumeCtl(){

  if(buttons.START == 1){

    vol.volume.value = -20;
  }else{
    vol.volume.value = -12;
  }

}
