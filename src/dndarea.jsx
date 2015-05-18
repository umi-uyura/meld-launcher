'use strict';

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
        width: '100px',
        height: '100px',
        margin: '20px auto'
      },
      hover: {
        display: 'inline-block',
        border: '10px dashed #333',
        width: '100px',
        height: '100px',
        margin: '20px auto'
      }
    };
    var style = this.state.hover ? styles.hover : styles.leave;
    var path = this.state.path;
    return (
        <div style={style} onDragOver={this.doDragOver} onDragLeave={this.doDragLeave} onDrop={this.doDrop} />
    );
  }
});
