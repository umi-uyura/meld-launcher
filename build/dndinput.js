'use strict';

var DnDInput = React.createClass({displayName: "DnDInput",
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
  render: function() {
    return (
        React.createElement("input", {type: "text", size: "100", value: this.state.path, onDragOver: this.doDragOver, onDragLeave: this.doDragLeave, onDrop: this.doDrop, readOnly: true})
    )
  }
});
