import React from "react";

class Register extends React.Component{
  constructor(props){
    super(props);
    this.state={
      registerEmail:'',
      registerPassword:'',
      registerName:''
    }
  }
  onNameChange=(event)=>{
    this.setState({registerName:event.target.value});
  }
  onEmailChange=(event)=>{
    this.setState({registerEmail:event.target.value});
  }
  onPasswordChange=(event)=>{
    this.setState({registerPassword:event.target.value})
  }

  onButtonSubmit=()=>{
    fetch('http://localhost:3001/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.registerEmail,
        password: this.state.registerPassword,
        name: this.state.registerName
      })
    })
      .then(response => response.json())
      .then(user => {
      if(user.id){
        this.props.loadUser(user);
  let name= user.name;
        this.props.button('home');
        localStorage.setItem('signedin',user.signedin);
    localStorage.setItem('name',user.name);
    localStorage.setItem('name',name.charAt(0).toUpperCase() + name.slice(1));
      }
      
    }).catch(console.log)
  }
  render(){
  return(
    <div className="parentRegister">
    <div className="register">
      <h1>REGISTER</h1>
      <input type="name" onChange={this.onNameChange} placeholder="Enter Your Name" id="name" name="inp1"/>
      <input type="email"onChange={this.onEmailChange} placeholder="Enter Your Email" id="email" name="inp2"/>
      <input type="password" onChange={this.onPasswordChange} placeholder="Enter Your Password" id="pass" name="inp3"/>
   
    <button type="submit" id="register2" onClick={this.onButtonSubmit}> Register</button>

    </div>
    </div>
  )
  }
}
export default Register;