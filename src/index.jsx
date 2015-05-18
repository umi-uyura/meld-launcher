'use strict';

(function() {
  var spawn = require('child_process').spawn;

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
          <DnDArea ref='area1' receiveDrop={this.onReceiveDrop1} />
          <DnDArea ref='area2' receiveDrop={this.onReceiveDrop2} />
          <DnDInput ref='target1' />
          <DnDInput ref='target2' />
          <button onClick={this.doClick}>Compare</button>
        </div>
      );
    }
  });

  React.render(
    <App />,
    document.getElementById('app')
  );
})();
