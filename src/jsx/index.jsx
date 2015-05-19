'use strict';

(function() {
  var spawn = require('child_process').spawn;
  var React = require('react');
  var injectTapEventPlugin = require("react-tap-event-plugin");
  injectTapEventPlugin();

  var mui = require('material-ui');
  var RaisedButton = mui.RaisedButton;

  var DnDInput = require('./dndinput.jsx');
  var DnDArea = require('./dndarea.jsx');

  window.React = React;

  var App = React.createClass({
    onReceiveDrop1: function(e) {
      this.onReceiveDrop({
        target: this.refs.area1,
        path: e.path
      });
    },
    onReceiveDrop2: function(e) {
      this.onReceiveDrop({
        target: this.refs.area2,
        path: e.path
      });
    },
    onReceiveDrop: function(e) {
      var input = null;

      switch (e.target) {
      case this.refs.area1:
        input = this.refs.target1;
        break;
      case this.refs.area2:
        input = this.refs.target2;
        break;
      }

      if (input) {
        input.setPath(e.path);
      }
    },
    doClick: function() {
      var path1 = this.refs.target1.state.path;
      var path2 = this.refs.target2.state.path;

      alert(path1 + '\n' + path2);

      if (0 === path1.length || 0 === path2.length) {
        alert('パスがありません。');
        return;
      }

      var meld_exec = spawn('meld', [path1, path2]);
      meld_exec.stderr.on('data', function(data) {
        alert(data);
      });
      meld_exec.on('exit', function(code) {
        if (0 !== code) {
          alert('Error: ' + code);
        } else {
          process.exit();
        }
      });
    },
    render: function() {
      return (
        <div>
          <DnDArea ref='area1' receiveDrop={this.onReceiveDrop1} />
          <DnDArea ref='area2' receiveDrop={this.onReceiveDrop2} /><br />
          <DnDInput ref='target1' hintText="Path 1" /><br />
          <DnDInput ref='target2' hintText="Path 2" /><br />
          <RaisedButton onClick={this.doClick} label="Compare" />
        </div>
      );
    }
  });

  React.render(
    <App />,
    document.getElementById('app')
  );
})();
