import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
var axios = require('axios');


const Card = (props) => {
return(
<div style={{margin:"1cm"}}>
  <img width="200" src = {props.avatar_url} />
  <div style={{display:"inline-block", marginLeft:10}}>
  <div style= {{fontWeight: 'bold',fontSize:"1.25cm"}}> {props.name}</div>
    <div style ={{fontSize:"1cm"}}> {props.company}</div>
  </div>
</div>
);
};


const Cardslist = (props)=>{
return(
<div>
 { props.cards.map(card => <Card {... card} />)}
</div>
)
}
class Form extends React.Component{
state={username:""};
eventhandle=(event)=>{
event.preventDefault();
axios.get(`https://api.github.com/users/${this.state.username}`)
.then(res=>{
this.props.addnewcard(res.data);
})
};
render(){
return(
<div>
<form onSubmit={this.eventhandle} >
  <input type="text" placeholder="username" value={this.state.username} onChange={(event)=>this.setState({username:event.target.value})}/>
  <button>search</button>
  </form>
</div>
);
};
}
class App extends React.Component{
state={data :[]}
 addnewcard=(cardinfo)=>{this.setState({data:this.state.data.concat(cardinfo)})

 };

render(){
return(
<div>
  <Form addnewcard={this.addnewcard}/>
  <Cardslist cards={this.state.data} />
</div>
);
}
}





export default App;
