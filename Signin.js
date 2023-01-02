
import React from "react";
class Signin extends React.Component{
  constructor(props){
    super(props);
    this.state={
     signInemail:'',
     signInpassword:'',
    }
  }
onEmailChange=(event)=>{
  this.setState({signInemail:event.target.value});


}
onPasswordChange=(event)=>{
  this.setState({signInpassword:event.target.value})

}



onButtonSubmit=()=>{
 
  fetch('http://localhost:3001/signin',{
    method:'post',
    headers:{'Content-Type':'application/json'},
    body : JSON.stringify({
      email:this.state.signInemail,
      password:this.state.signInpassword
    })
  })
  .then(response=>response.json())
  .then(data=>{
if(data.id){
  this.props.loadUser(data);
  let name=data.name;
  this.props.ButtonSubmit('home')
localStorage.setItem('signedin',data.signedin);
localStorage.setItem('name',name.charAt(0).toUpperCase() + name.slice(1));

}

  }).catch(console.log)
}
  render(){
  return(
    <div className="parentSignIn">
    <div className="signin">
      <h1 id="h1">SIGN IN</h1>
      <input type="email" onChange={this.onEmailChange} placeholder="Enter Your Email" id="email" name="inp1"/>
      <input type="password" onChange={this.onPasswordChange} placeholder="Enter Your Password" id="pass" name="inp1"/>
    <button type="submit" id="submit" onClick={this.onButtonSubmit}>Sign In</button>
    <button type="submit" id="register" onClick={this.props.buttonSubmit}> Register</button>

    </div>
    </div>
  )
  }
}
export default Signin;