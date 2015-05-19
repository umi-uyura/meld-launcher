'use strict';

var React = require('react');
var mui = require('material-ui');
var TextField = mui.TextField;

var DnDInput = React.createClass({
  getInitialState: function() {
    return {
      hover: false,
      path: ''
    };
  },
  doDragOver: function(e) {
    this.setState({ hover: true });
  },
  doDragLeave: function() {
    this.setState({ hover: false });
  },
  doDrop: function(e) {
    e.preventDefault();

    if (0 < e.dataTransfer.files.length) {
      this.setState({ path: e.dataTransfer.files[0].path });
    }
  },
  setPath: function(path) {
    this.setState({ path: path });
  },
  render: function() {
    return (
        <TextField hintText="path" size='100' value={this.state.path} onDragOver={this.doDragOver} onDragLeave={this.doDragLeave} onDrop={this.doDrop} readOnly />
    );
  }
});

module.exports = DnDInput;
