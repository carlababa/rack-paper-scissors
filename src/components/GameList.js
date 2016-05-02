import React from 'react';

class GameList extends React.Component{
  constructor(){
    super();

    this.state = {
      games: []
    };
  }

  selectGame(event){
    let gameId = event.currentTarget.id;
    this.props.onSelect(gameId);

  }

  componentDidMount(){
    this.setState({
      games: this.props.games
    });
  }

  render(){
    let component = this;
    return(
      <ul>
      {this.props.games.map(function(game){
        return <li id={game._id} key={game._id} onClick={component.selectGame.bind(component)}>Game by {game.playerOne}</li>
      }) }
      </ul>
    );
  }
}

export default GameList;
