import React from 'react';
import GameModel from './models/GameModel';
import NewPlayer from './components/NewPlayer';
import NewGameComponent from './components/NewGameComponent';
import GameList from './components/GameList';
import PlayerMove from './components/PlayerMove';
import Utils from './lib/Utils';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import AppBar from 'material-ui/lib/app-bar';

class App extends React.Component {
  constructor() {
    super();

    this.games = new GameModel();
    this.games.subscribe(this.updateList.bind(this));
    this.utils = new Utils();

    let playerStorage = this.utils.store("rockpaperscissors.player");
    if (playerStorage.length === 0) {
      playerStorage = null;
    }

    this.state = {
      games: [],
      currentGame: null,
      currentPlayer: playerStorage,
      playerMove: ""
    };
  }

  updateList() {
    this.setState({
      games: this.games.resources
    });

    if (this.state.currentGame !== null) {
      let component = this;
      this.games.resources.map(function(game) {
        if (game._id === component.state.currentGame._id) {
          component.setState({
            currentGame: game
          });
          if (game.winner === null) {
            component.determineWinner();
          }
        }
      });
    }
  }

  setPlayer(player) {
    this.setState({
      currentPlayer: player
    });
    this.utils.store("rockpaperscissors.player", player);
  }

  createGame() {
    this.games.addResource({
      playerOne: this.state.currentPlayer
    });
  }

  joinGame(game) {
    console.log("Joining game...");
    if (game.playerOne === this.state.currentPlayer || game.playerTwo === this.state.currentPlayer || game.playerTwo === null) {
      if (game.playerOne !== this.state.currentPlayer && game.playerTwo !== this.state.currentPlayer) {
        console.log("Joining game as player two...");
        this.games.save(game, { playerTwo: this.state.currentPlayer });
      }

      this.setState({
        currentGame: game
      });
    } else {
      window.alert("Can't touch this dung dung dung dung");
    }
  }

  containerStyles() {
    return {
      width: "40%",
      height: "100%",
      margin: "auto",
      fontFamily: "Roboto"
    };
  }

  navbarAlign(){
    return {
      textAlign: "center",
      margin: "auto"
    };
  }

  headerStyle() {
    return {
      textAlign: "center"
    };
  }

  determineWinner() {
    let moveOne = this.state.currentGame.playerOneMove;
    let moveTwo = this.state.currentGame.playerTwoMove;
    if (moveOne !== null && moveTwo !== null) {
      if (moveOne === moveTwo) {
        this.storeWinner("draw");
      }

      if (moveOne === "Rock") {
        if (moveTwo === "Scissors") {
          this.storeWinner(this.state.currentGame.playerOne);
        }

        if (moveTwo === "Paper") {
          this.storeWinner(this.state.currentGame.playerTwo);
        }
      }

      if (moveOne === "Paper") {
        if (moveTwo === "Rock") {
          this.storeWinner(this.state.currentGame.playerOne);
        }

        if (moveTwo === "Scissors") {
          this.storeWinner(this.state.currentGame.playerTwo);
        }
      }

      if (moveOne === "Scissors") {
        if (moveTwo === "Rock") {
          this.storeWinner(this.state.currentGame.playerTwo);
        }

        if (moveTwo === "Paper") {
          this.storeWinner(this.state.currentGame.playerOne);
        }
      }
    }
  }

  storeWinner(winner) {
    if (this.state.currentGame.winner === null) {
      this.games.save(this.state.currentGame, { winner: winner });
    }
  }

  makeMove(move) {
    console.log(move);
    if (this.state.currentGame.playerOne === this.state.currentPlayer) {
      this.games.save(this.state.currentGame, { playerOneMove: move });
    }

    if (this.state.currentGame.playerTwo === this.state.currentPlayer) {
      this.games.save(this.state.currentGame, { playerTwoMove: move });
    }

    this.setState({
      playerMove: move
    });
  }

  winningMove() {
    if (this.state.currentGame.playerOne === this.state.currentGame.winner) {
      return this.state.currentGame.playerOneMove;
    }

    if (this.state.currentGame.playerTwo === this.state.currentGame.winner) {
      return this.state.currentGame.playerTwoMove;
    }
  }

  losingMove() {
    if (this.state.currentGame.playerTwo !== this.state.currentGame.winner) {
      return this.state.currentGame.playerTwoMove;
    }

    if (this.state.currentGame.playerOne !== this.state.currentGame.winner) {
      return this.state.currentGame.playerOneMove;
    }
  }

  winnerSentence() {
    if (this.state.currentGame.winner === "draw") {
      return `${this.winningMove()} draws ${this.losingMove()}`;
    } else {
      return `${this.winningMove()} trumps ${this.losingMove()}`;
    }
  }

  clearCurrentGame() {
    this.setState({
      currentGame: null
    });
  }

  playerMoveStyle(){
    return{
      fontSize: "120px",
      color: "gray"
    };
  }

  hiPlayerStyle(){
    return{
      fontSize: "40px",
      color: "gray",
      paddingTop: "30px",
      display: "inline-block"
    };
  }

  createNewGameStyle(){
    return{
      paddingTop: "35px",
      float: "right"
    };
  }

  render() {
    console.log(this.state);
    return (
      <div>
      <AppBar
          title="Rock Paper Scissors"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          style={this.navbarAlign()}/>
      <div style={this.containerStyles()}>
        { this.state.currentPlayer !== null &&
          <div style={this.hiPlayerStyle()}>Hi, {this.state.currentPlayer}</div> }

        { this.state.currentPlayer === null &&
          <NewPlayer onCreate={this.setPlayer.bind(this)}/> }

        <div style={this.createNewGameStyle()}>
        { this.state.currentPlayer && this.state.currentGame === null &&
          <NewGameComponent onCreate={this.createGame.bind(this)}/> }
        </div>

        { this.state.currentGame === null &&
          <GameList games={this.state.games} currentPlayer={this.state.currentPlayer} onSelect={this.joinGame.bind(this)}/> }

        { this.state.currentGame !== null && <div className="game">
          <p>Player one: {this.state.currentGame.playerOne}</p>
          <p>Player two: {this.state.currentGame.playerTwo}</p>

          { this.state.currentGame.winner === null && <div>
            <div style={this.playerMoveStyle()}>{this.state.playerMove}</div>
            <PlayerMove move="Rock" onClick={this.makeMove.bind(this)} />
            <PlayerMove move="Paper" onClick={this.makeMove.bind(this)} />
            <PlayerMove move="Scissors" onClick={this.makeMove.bind(this)} />
          </div> }

          { this.state.currentGame.winner !== null && <div>
            <h1>{this.state.currentGame.winner} won!</h1>
            <p>{this.winnerSentence()}</p>
          </div> }

          <div>
            <FlatButton style={this.navbarAlign()} onClick={this.clearCurrentGame.bind(this)}>Back</FlatButton>
          </div>
        </div>}
      </div>
      </div>
    );
  }
}

export default App;
