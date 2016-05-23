/*
  Copyright (c) 2016 Jacques W.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.

  This a Big Node!

  /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
 
 *  Big Nodes familly, see Big Lib
 *
 *  https://www.npmjs.com/package/node-red-biglib
 *
 *  Any issues? https://github.com/Jacques44
 
  /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

*/

module.exports = function(RED) {

  var moment = require('moment');
  
  function bigstatus(config) {

    RED.nodes.createNode(this, config);

    if (config.locale) moment.locale(config.locale);

    var node = this;

    this.on('input', function(msg) {

      var status = {};
      if (msg.control) {
        
        switch (msg.control.state) {
          case 'start':
            status.shape = 'dot';
            status.fill = 'blue';
            status.text = msg.control.message;
            break;
          case 'end':
            status.shape = 'dot';
            status.fill = 'green';
            status.text = msg.control.message;
            break;
          case 'error':            
            status.shape = 'dot';
            status.fill = 'red';
            status.text = msg.control.message || 'has error';
            break;
          case 'running':
            status.fill = 'blue';
            status.shape = 'ring';
            status.text = msg.control.message;
            break;
        }

        var duration = moment.duration(moment().diff(msg.control.start, 'seconds')).humanize();
        if (config.show_duration) status.text +=  " (" + duration + ")";

        var ret = { 
          duration: duration, text: status.text, shape: status.shape, fill: status.fill, 
          name: msg.name, type: msg.type, state: msg.control.state, start: msg.control.start, 
          end: msg.control.end, message: msg.control.message 
        };

        if (msg.control.state == 'running') ret.speed = msg.control.speed;
        if (msg.control.state != 'start') ret.end = msg.control.end;

        var ntree = function(msg) {
          if (!msg.control) return;

          var n = "";
          if (msg.control.config) n = "[" + (msg.control.config.name || msg.control.config.type) + "]";

          if (up = ntree(msg.control)) return up + "." + n;
          return n;
        }
        ret.tree = ntree(msg);

        if (msg.config) {
          ret.name = msg.config.name;
          ret.type = msg.config.type;
        }

        msg.payload = ret;
        node.send(msg);

      } else {    
        if (msg.shape) status.shape = msg.shape;
        if (msg.fill) status.fill = msg.fill;
        msg.payload = status.text = msg.text || msg.payload;

        node.send(msg);
      }

      if (config.show_date) {
        status.text += " @ " + moment(new Date()).format("LLLL");
      }

      this.status({});
      setTimeout(function() {
        this.status(status);
      }.bind(this), 200);

    });

  }

  RED.nodes.registerType("bigstatus", bigstatus);
}


