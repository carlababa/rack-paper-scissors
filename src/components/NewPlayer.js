import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';


class NewPlayer extends React.Component {
  createPlayer(event) {
    event.preventDefault();
    console.log("Create Player Called!");
    let newPlayer = this.refs.playerName.value;
    this.props.onCreate(newPlayer);
    this.refs.playerName.value = "";
  }

  centerStyle(){
    return{
      paddingTop: "30px",
      textAlign: "center"
    };
  }

  render() {
    return(
      <div style={this.centerStyle()}>
        <form onSubmit={this.createPlayer.bind(this)}>
          <div>
            <label>Player Name:</label>
            <input type="text" ref="playerName" placeholder="What's your name?"/>
          </div>
          <div>
            <RaisedButton type="submit" label="Save" primary={true} />
          </div>
        </form>
      </div>
    );
  }
}

export default NewPlayer;
