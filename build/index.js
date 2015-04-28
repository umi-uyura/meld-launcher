'use strict';

(function() {
  var exec = require('child_process').exec;
  var App = React.createClass({displayName: "App",
    doClick: function() {
      console.log(this.refs.target1.state.path + ' vs ' + this.refs.target2.state.path);

      var path1 = this.refs.target1.state.path;
      var path2 = this.refs.target2.state.path;

      if (0 === path1.length || 0 === path2.length) {
        return;
      }

      exec('meld ' + this.refs.target1.state.path + ' ' + this.refs.target2.state.path,
           function(error, stdout, stderr) {
             if (error) {
               alert(error);
             } else {
               process.exit();
             }
           });
    },
    render: function() {
      return (
        React.createElement("div", null, 
          React.createElement(DnDInput, {ref: "target1"}), 
          React.createElement(DnDInput, {ref: "target2"}), 
          React.createElement("button", {onClick: this.doClick}, "Compare")
        )
      )
    }
  });

  React.render(
    React.createElement(App, null),
    document.getElementById('app')
  );
})();
