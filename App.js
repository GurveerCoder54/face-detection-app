import './App.css';
import 'tachyons';
import { Component } from 'react';
import ImageSearch from './components/ImageSearch.js';
import Signin from './Signin.js';
import ImgBox from './components/ImgBox.js';
import Register from './Register.js';
import Navigation from './components/Navigation/Navigation.js';




let obj;
class App extends Component {
  constructor() {
    super();
    this.state = {
      searchfield: '',
      box: {},
      route: '',
      user: {
        id: localStorage.getItem('id'),
        name: localStorage.getItem('name'),
        email: localStorage.getItem('email'),
        password: '',
        entries: localStorage.getItem('entries'),
        joined: localStorage.getItem('joined'),
        signedin: localStorage.getItem('signedin'),
      }

    }
  }

  calculateFaceLocation = (data) => {
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const clarifaiFace = data.outputs[0].data;
    

    let obj2= {
      leftCol: clarifaiFace.regions[0].region_info.bounding_box.left_col * width,
      topRow: clarifaiFace.regions[0].region_info.bounding_box.top_row * height,
      rightCol: width - (clarifaiFace.regions[0].region_info.bounding_box.right_col * width),
      bottomRow: height - (clarifaiFace.regions[0].region_info.bounding_box.bottom_row * height)
    }
return obj2;


  }
  

displayFaceBox=(box)=>{
  this.setState({box:box})
}

  onInputChange = (event) => {
    this.setState({ searchfield: event.target.value })

  }
  loadUser = (data) => {
    this.setState({
      user:
      {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
        signedin: data.signedin
      }
    })
  }
  onSubmit = () => {
    
    
     fetch('http://localhost:3001/imageurl', {
      method:'post',
      headers:{'Content-Type' : 'application/json'},
      body:JSON.stringify({
        input:this.state.searchfield
      })
     })
      .then(response => response.json())


      .then(result => {

      console.log(result)
  
        this.displayFaceBox(this.calculateFaceLocation(result));
      })

  }

  onButtonSubmit = (route) => {
    this.setState({ route: route });
    localStorage.setItem("state",route)
  }




  render() {

    return (
      <div className="App" >
        {localStorage.getItem('state') === "home" ? <div>

          <Navigation route={this.onButtonSubmit} />
          <ImageSearch searchChange={this.onInputChange} buttonClick={this.onSubmit} name={localStorage.getItem('name')} entries={this.state.user.entries} />
          <ImgBox source={this.state.searchfield} box={this.state.box} />
        </div>
          : (
            localStorage.getItem('state') === "signin"
              ? <div>

                <Signin ButtonSubmit={this.onButtonSubmit} buttonSubmit={this.onButtonSubmit} loadUser={this.loadUser} /></div> :
              <div>

                <Register button={this.onButtonSubmit} loadUser={this.loadUser} />
              </div>
          )
        }
      </div>

    )

  };
}

export default App;
