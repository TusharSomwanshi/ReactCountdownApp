var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

var Timer = require('Timer');

describe('Timer', ()=>{
  it('should exists',()=> {
    expect(Timer).toExist();
  });

  it('it should start countdown on started status', (done)=> {
    var timer = TestUtils.renderIntoDocument(<Timer/>);
    timer.handleStatusChange('started');
    expect(timer.state.count).toBe(0);

    setTimeout(()=>{
      expect(timer.state.timerStatus).toBe('started');
      expect(timer.state.count).toBe(1);
      done();
    },1001);
  });

  it('it should pause countdown on paused status', (done)=> {
    var timer = TestUtils.renderIntoDocument(<Timer/>);

    timer.setState({count:5});
    timer.handleStatusChange('started');
    timer.handleStatusChange('paused');

    setTimeout(()=>{
      expect(timer.state.timerStatus).toBe('paused');
      expect(timer.state.count).toBe(5);
      done();
    },1001);
  });

  it('it should stop countdown on stopped status', (done)=> {
    var timer = TestUtils.renderIntoDocument(<Timer/>);

    timer.setState({count:5});
    timer.handleStatusChange('started');
    timer.handleStatusChange('stopped');


    setTimeout(()=>{
      expect(timer.state.timerStatus).toBe('stopped');
      expect(timer.state.count).toBe(0);
      done();
    },1001);
  });

});
