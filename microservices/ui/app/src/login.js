import React from 'react';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import ReactDOM from 'react-dom';

const style = {
  height: 400,
  width: "100%",
  margin: 20,
  display: 'inline-block',
 fontFamily: 'Noticia Text'
};
const style1 = {
  height: 400,
  width: "100%",
  margin: 20,
  textAlign:'center',
  display: 'inline-block',
 fontFamily: 'Noticia Text'
};

class Login extends React.Component{
	
	constructor()
	{
		super();
		this.state={
			username:"",
			password:"",
			output:"",
			log:false
		}
	}
	
	update()
	{
	ReactDOM.render(
	<MuiThemeProvider>
       <div>
       <Paper style={style1} zDepth={1}>
	   <img src="https://images-na.ssl-images-amazon.com/images/I/51ZEB1RS1qL._SX398_BO1,204,203,200_.jpg" width="60%" height="250px" style={{marginTop:15}}/>
	   <br/>
	   <h3>Successful Transaction of $25</h3>
	   </Paper>
       </div>
	   </MuiThemeProvider>,
  document.getElementById('root')
);	
	}

	check()
	{
	  
var authToken;

var url = "https://auth.aster61.hasura-app.io/v1/login";

var requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json"
    }
};

var body = {
    "provider": "username",
    "data": {
        "username": this.state.username,
        "password": this.state.password
    }
};

requestOptions.body = JSON.stringify(body);

fetch(url, requestOptions)
.then(function(response) {
	return response.json();
})
.then(function(result) {
	console.log(result);
		  authToken = result.auth_token
	     window.localStorage.setItem('HASURA_AUTH_TOKEN', authToken);
})
.catch(function(error) {
	console.log('Request Failed:' + error);
});

if(authToken)
{this.setState({output:"Loged In successfully",log:true});}
else{this.setState({output:"Credential not correct",log:false});}



	  
	}
render(){
	
	if(!this.state.log)
	{
return	(
    <MuiThemeProvider>
    <div>
    <Paper style={style} zDepth={1} >
	<h2 style={{marginLeft:10}}>Login</h2>
	<span style={{marginLeft:10}}>User Name  </span>
	<TextField
	 refs="a"
	 onChange={e => this.setState({ username: e.target.value })}
      hintText="User Name"
	  
      floatingLabelText="Enter your User Name"
	  style={{width:'70%',marginLeft:10}}
     /><br />
     <span style={{marginLeft:10}}>Password  </span>	
	 <TextField
	 refs="b"
	 onChange={e => this.setState({ password: e.target.value })}
      hintText="Password"
      floatingLabelText="Enter your Password"
	  type="password"
	  style={{width:'70%',marginLeft:10}}
    /><br />
	
	<br/>
	<span style={{textAlign:'center'}}> 
	<FlatButton label="Login" backgroundColor="#E3F2FD" hoverColor="#90CAF9" style={{marginLeft:40,borderRadius:40}} onClick={this.check.bind(this)}/> 
	<FlatButton label="Register"  backgroundColor="#E3F2FD" hoverColor="#90CAF9" style={{marginLeft:40,borderRadius:40}}/></span>
	<br/>
	<br/><span style={{textAlign:'center'}}>{this.state.output}</span>
	<br/>
	<p style={{margin:10}}>
	/ Enter user name as murari  and password tiger11 for demo  /
	</p>
	
	</Paper>
      </div>
	  </MuiThemeProvider>
);
	}
	else{
       return	(
       <MuiThemeProvider>
       <div>
       <Paper style={style1} zDepth={1}>
	   <img src="https://images-na.ssl-images-amazon.com/images/I/51ZEB1RS1qL._SX398_BO1,204,203,200_.jpg" width="60%" height="250px" style={{marginTop:15}}/>
	   <h3>Price $25</h3>
	   <FlatButton label="Buy Now"  backgroundColor="#E3F2FD" hoverColor="#90CAF9" style={{borderRadius:40}} href="https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-1BH91560WT344854D#/checkout/login"/>
	   </Paper>
       </div>
	   </MuiThemeProvider>);	
	}
}}
export default Login;