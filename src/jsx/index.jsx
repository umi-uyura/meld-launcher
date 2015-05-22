'use strict';

(function() {
  var exec = window.require('child_process').exec;
  var React = require('react');
  var injectTapEventPlugin = require('react-tap-event-plugin');
  injectTapEventPlugin();

  var mui = require('material-ui');
  var RaisedButton = mui.RaisedButton;
  var Snackbar = mui.Snackbar;
  var Dialog = mui.Dialog;

  var DnDInput = require('./dndinput.jsx');
  var DnDArea = require('./dndarea.jsx');

  var App = React.createClass({
    getInitialState: function() {
      return {
        snackMessage: '',
        dialogMessage: ''
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
        this.refs.snakbar.show();
        return;
      }

      var self = this;
      exec('/usr/local/bin/meld ' + path1 + ' ' + path2, function(error, stdout, stderr) {
        if (error !== null) {
          self.setState({ dialogMessage: error.message + '(' + error.code + ')' });
          self.refs.alertDlg.show();
        } else {
          window.process.exit();
        }
      });
    },
    render: function() {
      return (
        <div>
          <DnDInput ref='target1' hintText='Path 1' floatingLabelText='Target 1' />
          <DnDInput ref='target2' hintText='Path 2' floatingLabelText='Target 2' />
          <DnDArea ref='area1' title="Target 1" receiveDrop={this.onReceiveDrop1}>Drop Here!</DnDArea>
          <DnDArea ref='area2' title="Target 2" receiveDrop={this.onReceiveDrop2}>Drop Here!</DnDArea>
          <div id="controller">
            <RaisedButton className="compare-button" onClick={this.doClick} label='Compare' />
          </div>
          <Snackbar ref='snakbar' message={this.state.snackMessage} />
          <Dialog ref='alertDlg' title='Meld Launcher' actions={[{ text: 'OK'}]} modal={true}>
            {this.state.dialogMessage}
          </Dialog>
        </div>
      );
    }
  });

  React.render(
    <App />,
    document.getElementById('app')
  );
})();
