import React from 'react';
import './App.css';

const keys = [
  {
    trigger: "Q", 
    keyCode: 81, 
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3", 
    desc: "Chord 1"
  },
  {
    trigger: "W", 
    keyCode: 87, 
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3", 
    desc: "Chord 2"
  },
  {
    trigger: "E", 
    keyCode: 69, 
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3", 
    desc: "Chord 3"
  },
  {
    trigger: "A", 
    keyCode: 65, 
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3", 
    desc: "Shaker"
  },
  {
    trigger: "S", 
    keyCode: 83, 
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3", 
    desc: "Open HH"
  },
  {
    trigger: "D", 
    keyCode: 68, 
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3", 
    desc: "Closed HH"
  },  
  {
    trigger: "Z", 
    keyCode: 90, 
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3", 
    desc: "Punchy Kick"
  },            
  {
    trigger: "X", 
    keyCode: 88, 
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3", 
    desc: "Side Stick"
  }, 
  {
    trigger: "C", 
    keyCode: 67, 
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3", 
    desc: "Snare"
  }
  ];
  
  class App extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        keysUsed: keys, 
        buttonPressed: false, 
        soundPlayed: ""
      }
      
      this.handleSoundChange = this.handleSoundChange.bind(this);
    }
    
    handleSoundChange(sound) {
      this.setState({soundPlayed: sound});
    }
    
    render() {
      let pad = this.state.keysUsed.map((keyObj, i, keysArr) => {
        return (
          <DrumPad trigger={keysArr[i].trigger}
                   clip={keysArr[i].url}
                   code={keysArr[i].keyCode}
                   desc={keysArr[i].desc}
                   handleSoundChange={this.handleSoundChange}/>
        )
      });
          
      return (
        <div id = 'drum-machine'>
          <div id = 'display'>
            
            <div id = 'heading'>
              <h3>Make music by pressing the keys below <i class="fas fa-hand-point-down"></i></h3>
            </div>
            
            <div id = 'keys'>
            {pad}          
            </div>
            
            <div id = 'desc'>
              <p>{this.state.soundPlayed}</p>
            </div>
            
          </div>
          </div>
      );
    }
  }
  
  class DrumPad extends React.Component {
    constructor(props) {
      super(props);
      
      this.handleKeyPress = this.handleKeyPress.bind(this);
      this.playSound = this.playSound.bind(this);
    }
    
    handleKeyPress(e) {
      if (e.keyCode === this.props.code) {
        this.playSound();
      }
    }
    
    playSound(e) {
      const sound = document.getElementById(this.props.trigger);
      sound.play();
      this.props.handleSoundChange(this.props.desc);
    }
    
    componentDidMount() {
      document.addEventListener("keydown", this.handleKeyPress);
    }
    
    componentWillUnmount() {
      document.removeEventListener("keydown", this.handleKeyPress);
    }
    
    render() {
    return (     
        <button id = "key" type="button" class="drum-pad" onClick = {this.playSound}>
            <audio className = "clip" id = {this.props.trigger} src = {this.props.clip}></audio>{this.props.trigger}
        </button>
      )
    }
  }

export default App;