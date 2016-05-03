import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

class GameListItem extends React.Component {
  selectGame() {
    this.props.onClick(this.props.game);
  }

  gameOpen() {
    return !this.gameFinished() &&
      this.props.game.winner === null &&
      (this.props.game.playerOne === this.props.currentPlayer ||
      this.props.game.playerTwo === null ||
      this.props.game.playerTwo === this.props.currentPlayer);
  }

  gameAlreadyJoined() {
    return !this.gameFinished() &&
      this.props.game.winner === null &&
      (this.props.game.playerOne === this.props.currentPlayer ||
      this.props.game.playerTwo === this.props.currentPlayer);
  }

  gameFull() {
    return !this.gameOpen();
  }

  gameFinished() {
    return this.props.game.winner !== null;
  }

  playerOrYou(player) {
    if (player === this.props.currentPlayer) {
      return "You";
    }
    return player;
  }

  theWinner() {
    if (this.gameFinished()) {
      if (this.props.game.winner === "draw") {
        return `Draw between ${this.playerOrYou(this.props.game.playerOne)} and ${this.playerOrYou(this.props.game.playerTwo)}`;
      }
      return `${this.playerOrYou(this.props.game.winner)} won`;
    } else {
      return "Nobody";
    }
  }

  centerStyle(){
    return{
      textAlign: "center"
    };
  }

  render() {
    return (
      <List>
        <ListItem style={this.centerStyle()} > Game by {this.props.game.playerOne}

        { this.gameOpen() && !this.gameAlreadyJoined() &&
          <FlatButton label="Join Game" secondary={true} onClick={this.selectGame.bind(this)}></FlatButton> }

        { this.gameOpen() && this.gameAlreadyJoined() &&
          <FlatButton label="Resume Game" secondary={true} onClick={this.selectGame.bind(this)}></FlatButton> }

        { !this.gameFinished() && this.gameFull() &&
          <FlatButton label="FULL" disabled={true} /> }

        { this.gameFinished() &&
          <FlatButton disabled={true} label={this.theWinner()} /> }
        </ListItem>
      </List>
    );
  }
}

export default GameListItem;
