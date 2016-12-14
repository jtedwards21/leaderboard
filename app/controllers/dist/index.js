var recent = "https://fcctop100.herokuapp.com/api/fccusers/top/recent"
var allTime = "https://fcctop100.herokuapp.com/api/fccusers/top/alltime"



var Scoreboard = React.createClass({
  toggleSort(){
    if(this.state.sort == "recent"){
	this.setState({sort: "alltime"})
    } else {
	this.setState({sort: "recent"})
    }
  },
  loadUsers(){
    this.serverRequest = $.get(recent, function(result){
      this.setState({
	sort: "recent",
        campers:result
      })
    }.bind(this))
  },
  getInitialState(){
    return ({campers:[], sort: "recent"})
  },
  componentDidMount: function() {
    this.loadUsers();
  },
  render(){
    var campers;
    if(this.state.sort == "recent"){
    campers = this.state.campers.sort(function(a, b){
	return b.recent - a.recent;
	})
    } else {
    campers = this.state.campers.sort(function(a, b){
	return b.alltime - a.alltime;
	})
    }

    campers = campers.map(function(c, i){
	return <Camper key={i} rank={i + 1} name={c.username} recentScore={c.recent} totalScore={c.alltime} />
})

    return (
      <div>
      <table className="table table-hover">
        <thead>
	　　　　<Header toggle={this.toggleSort.bind(this)} />
	</thead>
        <tbody>
        {campers}
	</tbody>
      </table>
      </div>
    )
    
  }
});

var Header = React.createClass({
　　toggle(){
    this.props.toggle();
  },
  render(){
　　　　return (
	  <tr>
	    <th>#</th>
	    <th>Name</th>
	    <th　onClick={this.toggle}>Recent Score</th>
	    <th　onClick={this.toggle}>Total Score</th>
	  </tr>
    )
  }
})


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
