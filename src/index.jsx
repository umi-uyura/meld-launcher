'use strict';

(function() {
  var spawn = require('child_process').spawn;

  var App = React.createClass({
    doClick: function() {
      var path1 = this.refs.target1.state.path;
      var path2 = this.refs.target2.state.path;

      if (0 === path1.length || 0 === path2.length) {
        return;
      }

      var meld_exec = spawn('meld',
                            [this.refs.target1.state.path, this.refs.target2.state.path]);
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
          <DnDInput ref='target1' />
          <DnDInput ref='target2' />
          <button onClick={this.doClick}>Compare</button>
        </div>
      )
    }
  });

  React.render(
    <App />,
    document.getElementById('app')
  );
})();
