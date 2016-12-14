var recent = "https://fcctop100.herokuapp.com/api/fccusers/top/recent"
var allTime = "https://fcctop100.herokuapp.com/api/fccusers/top/alltime"



var Scoreboard = React.createClass({
  loadUsers(){
    this.serverRequest = $.get(recent, function(result){
      this.setState({
        campers:result
      })
    }.bind(this))
  },
  getInitialState(){
    return ({campers:[]})
  },
  componentDidMount: function() {
    this.loadUsers();
  },
  render(){
    console.log(this.state.block)
    
    var campers = this.state.campers.map(function(c, i){
	return <Camper key={i} rank={i} name={c.username} recentScore={c.recent} totalScore={c.alltime} />
})

    return (
      <table className="table table-hover">
        <thead>
	  <tr>
	    <th>#</th>
	    <th>Name</th>
	    <th>Recent Score</th>
	    <th>Total Score</th>
	  </tr>
	</thead>
        <tbody>
        {campers}
	</tbody>
      </table>
    )
    
  }
});

var Camper = React.createClass({
  
  render(){
    return (
      <tr>
        <th>{this.props.rank}</th>
        <td>{this.props.name}</td>
        <td>{this.props.recentScore}</td>
        <td>{this.props.totalScore}</td>
      </tr>
    )
  }
});

ReactDOM.render(
  <Scoreboard url="https://fcctop100.herokuapp.com/api/fccusers/top/recent"  pollInterval={2000}/>,
  document.getElementById('container')
);
