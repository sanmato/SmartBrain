import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Recognition from './Components/Recognition/Recognition';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';


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

const initialState = {
  input: '',
  imageUrl: '',
  faceBox: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor () {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
       id: data.id,
       name: data.name,
       email: data.email,
       entries: data.entries,
       joined: data.joined 
      }
    })
  }

  calculateFaceLocation = (data) => {
   const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
   const image = document.getElementById('inputimage');
   const width = Number(image.width);
   const height = Number(image.height);

   return {
     leftCol: clarifaiFace.left_col * width,
     topRow: clarifaiFace.top_row * height,
     rightCol: width - (clarifaiFace.right_col * width),
     bottomRow: height - (clarifaiFace.bottom_row * height),
   }
  }

  displayFaceBox = (faceBox) => {
    console.log(faceBox);
    this.setState({faceBox: faceBox});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmitButton = () => {
    this.setState({imageUrl: this.state.input});
       fetch('https://limitless-sea-25110.herokuapp.com/imageUrl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            input: this.state.input
            })
        })
        .then(response => response.json())     
    .then(response =>{
      if(response) {
        fetch('https://limitless-sea-25110.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            id: this.state.user.id
            })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
      }
       this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }


  render() {
    const {isSignedIn, faceBox, route, imageUrl} = this.state;
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions}/> 
        <Navigation isSignedIn={isSignedIn} onRoutechange={this.onRouteChange} />
        { route === 'home' 
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm onInputChange={this.onInputChange} onSubmitButton={this.onSubmitButton}/>
              <Recognition faceBox={faceBox} imageUrl={imageUrl}/>
            </div> 
          : (
            route === 'signin'
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
            
        }
        </div>
    );
  }
}

export default App;

/* 
//File without Heroku config


import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Recognition from './Components/Recognition/Recognition';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';


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

const initialState = {
  input: '',
  imageUrl: '',
  faceBox: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor () {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
       id: data.id,
       name: data.name,
       email: data.email,
       entries: data.entries,
       joined: data.joined 
      }
    })
  }

  calculateFaceLocation = (data) => {
   const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
   const image = document.getElementById('inputimage');
   const width = Number(image.width);
   const height = Number(image.height);

   return {
     leftCol: clarifaiFace.left_col * width,
     topRow: clarifaiFace.top_row * height,
     rightCol: width - (clarifaiFace.right_col * width),
     bottomRow: height - (clarifaiFace.bottom_row * height),
   }
  }

  displayFaceBox = (faceBox) => {
    console.log(faceBox);
    this.setState({faceBox: faceBox});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmitButton = () => {
    this.setState({imageUrl: this.state.input});
       fetch('https://localhost:3000/imageUrl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            input: this.state.input
            })
        })
        .then(response => response.json())     
    .then(response =>{
      if(response) {
        fetch('https://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            id: this.state.user.id
            })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
      }
       this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }


  render() {
    const {isSignedIn, faceBox, route, imageUrl} = this.state;
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions}/> 
        <Navigation isSignedIn={isSignedIn} onRoutechange={this.onRouteChange} />
        { route === 'home' 
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm onInputChange={this.onInputChange} onSubmitButton={this.onSubmitButton}/>
              <Recognition faceBox={faceBox} imageUrl={imageUrl}/>
            </div> 
          : (
            route === 'signin'
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
            
        }
        </div>
    );
  }
}


*/
