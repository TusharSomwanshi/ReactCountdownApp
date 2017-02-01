var React =  require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');
var Controls = require('Controls');

var Timer = React.createClass({
  getInitialState: function () {
    return {
      count: 0,
      timerStatus: 'stopped'
    };
  },

  startTimer: function(){
    this.timer = setInterval(() => {
        var newCount = this.state.count + 1;
        this.setState({
          count: newCount >=0 ? newCount : 0
        });

    }, 1000);
  },

  componentDidUpdate: function(preProps, prevState){
    if(this.state.timerStatus !== prevState.timerStatus){
      switch(this.state.timerStatus){
        case 'started':
          this.startTimer();
          break;
          case 'stopped':
            this.setState({count:0});
          case 'paused':
            clearInterval(this.timer)
            this.timer = undefined;
            break;
      }
    }
  },

  handleStatusChange: function(newStatus){
    this.setState({timerStatus: newStatus});
  },

  componentWillUnmount: function(){
    clearInterval(this.timer)
    this.timer = undefined;
  },

  render: function () {
    var {count,timerStatus} = this.state;


    return(
      <div>
        <h1 className="page-title">Timer</h1>
          <Clock totalSeconds={count}/>
          <Controls countdownStatus={timerStatus} onStatusChanged={this.handleStatusChange}/>
      </div>
    );
  }
});

module.exports = Timer;
