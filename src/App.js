import React from 'react';
import GameModel from './models/GameModel';
import NewGameComponent from './components/NewGameComponent';
import GameList from './components/GameList';

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      games: [],
      currentGame: null
    };
  }

  componentDidMount(){
    this.games = new GameModel();
    this.games.subscribe(this.updateList.bind(this));

  }

  updateList(){
    this.setState({
      games: this.games.resources
    });
  }

  createGame(newPlayer){
    this.games.addResource({
      playerOne: newPlayer
    });
  }

  containerStyles(){
    return{
      width: "500px",
      height: "500px",
      margin: "auto"
    };
  }

  selectGame(gameId){
    this.games.getResource({_id: gameId});
    this.setState({
      currentGame: gameId
    });
  }

  headerStyle(){
    return{
      textAlign: "center"
    };
  }
    render() {
      console.log(this.state);
        return (
          <div style={this.headerStyle()}>
            <h1 style={this.containerStyles()}>Rock | Paper | Scissors</h1>
            <NewGameComponent onCreate={this.createGame.bind(this)}/>
            <GameList games={this.state.games} onSelect={this.selectGame.bind(this)} />
          </div>
        );
    }
}

export default App;
