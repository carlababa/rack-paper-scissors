import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

class PlayerMove extends React.Component{
  makeMove(){
    this.props.onClick(this.props.move);
  }

  marginButton(){
    return{
      margin: "12px"
    };
  }

  render(){
    return(
      <RaisedButton primary={true} style={this.marginButton()} onClick={this.makeMove.bind(this)}>{this.props.move}</RaisedButton>
    );
  }
}

export default PlayerMove;
