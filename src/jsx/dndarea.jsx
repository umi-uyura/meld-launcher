'use strict';

var React = require('react');
var DnDArea = React.createClass({
  propTypes: {
    receiveDrop: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    return {
      hover: false
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

    this.setState({ hover: false });

    if (0 < e.dataTransfer.files.length) {
      this.props.receiveDrop({
        target: e.target,
        path: e.dataTransfer.files[0].path
      });
    }
  },
  render: function() {
    var styles = {
      leave: {
        display: 'inline-block',
        border: '10px dashed #ccc',
        width: '250px',
        height: '120px',
        margin: '10px 10px'
      },
      hover: {
        display: 'inline-block',
        border: '10px dashed #333',
        width: '250px',
        height: '120px',
        margin: '10px 10px'
      }
    };
    var style = this.state.hover ? styles.hover : styles.leave;
    var path = this.state.path;
    return (
      <div style={style} onDragOver={this.doDragOver} onDragLeave={this.doDragLeave} onDrop={this.doDrop} />
    );
  }
});

module.exports = DnDArea;
