import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Recognition from './Components/Recognition/Recognition';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';

const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '1ac1c0d68b22458b9b8817b704257b92'
 });

const particlesOptions = {
    particles: {
     number: {
       value: 30,
       density: {
         enable: true,
         value_area: 800,
       }
     }
  }
}

class App extends Component {
  constructor () {
    super();
    this.state = {
      input: '',
      imageUrl: '',
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmitButton = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL,
        // URL
        this.state.input
    )
    .then(function(response) {
        console.log(response);
        },
        function(err) {// there was an error
        }
    );

  }


  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions}/>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onSubmitButton={this.onSubmitButton}/>
        <Recognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
