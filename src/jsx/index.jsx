'use strict';

(function() {
  var exec = window.require('child_process').exec;
  var React = require('react');
  var injectTapEventPlugin = require('react-tap-event-plugin');
  injectTapEventPlugin();

  var mui = require('material-ui');
  var RaisedButton = mui.RaisedButton;
  var Snackbar = mui.Snackbar;

  var DnDInput = require('./dndinput.jsx');
  var DnDArea = require('./dndarea.jsx');

  var App = React.createClass({
    getInitialState: function() {
      return {
        snackMessage: '初期メッセージ'
      };
    },
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

      if (0 === path1.length || 0 === path2.length) {
        this.setState({ snackMessage: '比較するファイル/フォルダを指定してください。'});
        this.refs.targetnoneDlg.show();
        return;
      }

      var self = this;
      exec('meld ' + path1 + ' ' + path2, function(error, stdout, stderr) {
        if (error !== null) {
          //self.setState({ snackMessage: error });
          //self.refs.targetnoneDlg.show();
          alert(error);
        } else {
          window.process.exit();
        }
      });
    },
    render: function() {
      return (
        <div>
          <DnDArea ref='area1' receiveDrop={this.onReceiveDrop1} />
          <DnDArea ref='area2' receiveDrop={this.onReceiveDrop2} /><br />
          <DnDInput ref='target1' hintText='Path 1' floatingLabelText='Path 1' /><br />
          <DnDInput ref='target2' hintText='Path 2' floatingLabelText='Path 2' /><br />
          <div id="controller">
            <RaisedButton id='compareButton' onClick={this.doClick} label='Compare' />
          </div>
          <Snackbar ref="targetnoneDlg" message={this.state.snackMessage} />
        </div>
      );
    }
  });

  React.render(
    <App />,
    document.getElementById('app')
  );
})();
