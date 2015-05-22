'use strict';

var React = require('react');
var mui = require('material-ui');
var ClassNames = require('classnames');

var Paper = mui.Paper;

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
    var zDepth = this.state.hover ? 5 : 3;
    var classArea = ClassNames('dndarea', { 'drag': this.state.hover });
    return (
      <div className="dndarea-wrap">
        <span>{this.props.title}</span>
        <Paper className={classArea}
               zDepth={zDepth} onDragOver={this.doDragOver} onDragLeave={this.doDragLeave} onDrop={this.doDrop}>
          <p className="dndarea-content">{this.props.children}</p>
        </Paper>
      </div>
    );
  }
});

module.exports = DnDArea;
