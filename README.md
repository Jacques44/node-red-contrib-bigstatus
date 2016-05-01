# node-red-contrib-bigstatus

Big "Status" node for node-red. 

![alt tag](https://cloud.githubusercontent.com/assets/18165555/14944046/05f0fed4-0fe9-11e6-8952-ef2065fe4c89.png)

![alt tag](https://cloud.githubusercontent.com/assets/18165555/14944055/2c13b660-0fe9-11e6-8a87-d3afc7813ca4.png)

## Installation
```bash
npm install node-red-contrib-bigstatus
```

## Principles for Big Nodes
 
See [biglib](https://www.npmjs.com/package/node-red-biglib) for details on Big Nodes

###1 can handle big data or block mode

  That means, in block mode, not only "one message is a whole file" and able to manage start/end control messages

###2 send start/end messages as well as statuses

  That means it uses a second output to give control states (start/end/running and error) control messages

###3 tell visually what they are doing

  Visual status on the node tells it's ready/running (blue), all is ok and done (green) or in error (red)

## Usages

Big Status is a debug node for big nodes. It acts as a filter for control messages and resend them filtered as a payload suitable for debug

It is also possible to control it in order to show custom status and text

## Dependencies

[moment](https://github.com/moment/moment) Parse, validate, manipulate, and display dates in javascript

## Example flow files

  Try pasting in the flow file below that shows the node behaviour 

```json
[{"id":"6de6b906.921948","type":"bigstatus","z":"92d89c48.6d276","name":"","locale":"","x":505.5,"y":230,"wires":[["923b363e.6dc4c8"]]},{"id":"453a9b9e.bac564","type":"inject","z":"92d89c48.6d276","name":"ok!","topic":"","payload":"Everything if fine!","payloadType":"str","repeat":"","crontab":"","once":false,"x":112.5,"y":67,"wires":[["b9281c2d.46d7e"]]},{"id":"b9281c2d.46d7e","type":"function","z":"92d89c48.6d276","name":"green dot","func":"msg = { shape: \"dot\", fill: \"green\", text: msg.payload }\nreturn msg;","outputs":1,"noerr":0,"x":264.5,"y":67,"wires":[["6de6b906.921948"]]},{"id":"923b363e.6dc4c8","type":"debug","z":"92d89c48.6d276","name":"text","active":true,"console":"false","complete":"payload","x":585.5,"y":145,"wires":[]},{"id":"d8a42cf6.275bd","type":"inject","z":"92d89c48.6d276","name":"warn!","topic":"","payload":"Beware, this is a warning!","payloadType":"str","repeat":"","crontab":"","once":false,"x":112,"y":146,"wires":[["1617f049.e9e81"]]},{"id":"1617f049.e9e81","type":"function","z":"92d89c48.6d276","name":"yellow ring","func":"msg = { shape: \"ring\", fill: \"yellow\", text: msg.payload }\nreturn msg;","outputs":1,"noerr":0,"x":275,"y":146,"wires":[["6de6b906.921948"]]},{"id":"6d5c0620.92a3f8","type":"inject","z":"92d89c48.6d276","name":"error!","topic":"","payload":"Something went wrong, oh damn!","payloadType":"str","repeat":"","crontab":"","once":false,"x":116,"y":230,"wires":[["267dea87.d98216"]]},{"id":"267dea87.d98216","type":"function","z":"92d89c48.6d276","name":"red ring","func":"msg = { shape: \"ring\", fill: \"red\", text: msg.payload }\nreturn msg;","outputs":1,"noerr":0,"x":267,"y":230,"wires":[["6de6b906.921948"]]},{"id":"b03e4ed7.4fc1b","type":"inject","z":"92d89c48.6d276","name":"blue!","topic":"","payload":"I'm blue!","payloadType":"str","repeat":"","crontab":"","once":false,"x":112,"y":316,"wires":[["7ec24af6.813db4"]]},{"id":"e9755af5.168aa8","type":"inject","z":"92d89c48.6d276","name":"grey!","topic":"","payload":"I'm grey!","payloadType":"str","repeat":"","crontab":"","once":false,"x":113,"y":394,"wires":[["c3965235.3c69b"]]},{"id":"7ec24af6.813db4","type":"function","z":"92d89c48.6d276","name":"blue ring","func":"msg = { shape: \"ring\", fill: \"blue\", text: msg.payload }\nreturn msg;","outputs":1,"noerr":0,"x":268,"y":316,"wires":[["6de6b906.921948"]]},{"id":"c3965235.3c69b","type":"function","z":"92d89c48.6d276","name":"grey ring","func":"msg = { shape: \"ring\", fill: \"grey\", text: msg.payload }\nreturn msg;","outputs":1,"noerr":0,"x":268,"y":394,"wires":[["6de6b906.921948"]]}]
```

![alt tag](https://cloud.githubusercontent.com/assets/18165555/14586797/49f684d2-04a4-11e6-890d-68a09b1ef5ab.png)

## Author

  - Jacques W

## License

This code is Open Source under an Apache 2 License.

You may not use this code except in compliance with the License. You may obtain an original copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. Please see the
License for the specific language governing permissions and limitations under the License.

## Feedback and Support

Please report any issues or suggestions via the [Github Issues list for this repository](https://github.com/Jacques44/node-red-contrib-bigline/issues).

For more information, feedback, or community support see the Node-Red Google groups forum at https://groups.google.com/forum/#!forum/node-red


