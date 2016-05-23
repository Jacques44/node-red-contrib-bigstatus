# node-red-contrib-bigstatus

Big "Status" node for node-red. 

![alt tag](https://cloud.githubusercontent.com/assets/18165555/15453794/e55a9f96-2022-11e6-8060-3b64ba212d81.png)

![alt tag](https://cloud.githubusercontent.com/assets/18165555/15453796/e95c6bf6-2022-11e6-908a-50b90fbd86da.png)

## Installation
```bash
npm install node-red-contrib-bigstatus
```

## Principles for Big Nodes
 
See [biglib](https://www.npmjs.com/package/node-red-biglib) for details on Big Nodes.
`Big Lib` and subsequent `Big Nodes` are a family of nodes built for my own purpose. They are all designed to help me build a complete process for **production purposes**. For that I needed nodes able to:

* Flow **big volume** of data (memory control, work with buffers)
* Work with *a flow of blocks* (buffers) (multiple payload within a single job)
* Tell what *they are doing* with extended use of statuses (color/message)
* Use their *second output for flow control* (start/stop/running/status)
* *Reuse messages* in order to propagate _msgid, topic
* Depends on **state of the art** libraries for parsing (csv, xml, xlsxs, line, ...)
* Acts as **filters by default** (1 payload = 1 action) or **data generators** (block flow)

All functionnalities are built under a library named `biglib` and all `Big Nodes` rely on it

## Usages

`Big Status` is a *debug node* for **Big Nodes**. It acts as a **filter** for control messages and resend them as payloads suitable for debug

It works both ways:

* Connected to the second output of a *Big Node*, it **shows visually the control data**
* Controlled **by messages**, it can be used to show custom informations. It can be useful used with *status node* for triggering something elsewhere

## Configuration

This node has several properties

* `Locale` is used to compute durations in human form. You can tell which locale, the moment library will use
* `Show duration` is used to add a computed duration base on `control start/stop/running` informations sent by `Big Nodes`

You can control the node by sending custom messages:

See [Node Status](http://nodered.org/docs/creating-nodes/status) node-red documentation page for details.

* `payload` or `text` is the text shown under the node
* `shape` (`ring` or `dot`): if defined, draws an icon
* `fill` (`blue`, `red`, `yellow`, `grey` or `green`): the color for the icon. If none is set and shape defined, the color will be `black`

![alt tag](https://cloud.githubusercontent.com/assets/18165555/15453875/43bc8b32-2026-11e6-891c-6fd64e16c0a0.png)


## Dependencies

[moment](https://github.com/moment/moment) Parse, validate, manipulate, and display dates in javascript

## Example flow files

  Try pasting in the flow file below that shows the node behaviour 

```json
[{"id":"85ae4fd9.7a51b","type":"bigstatus","z":"f14e3f02.0eb1c","name":"final status","locale":"fr","show_duration":true,"x":470,"y":1160,"wires":[[]]},{"id":"1c132ddd.e3ecd2","type":"inject","z":"f14e3f02.0eb1c","name":"manual","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":90,"y":1200,"wires":[["66f14cb0.990eb4"]]},{"id":"66f14cb0.990eb4","type":"function","z":"f14e3f02.0eb1c","name":"manual","func":"msg.control = { \"start\": msg.payload, \"end\": new Date(), \"state\": \"end\", \"message\": \"Le travail est fait en ... \" };\nreturn msg;","outputs":1,"noerr":0,"x":260,"y":1200,"wires":[["85ae4fd9.7a51b"]]},{"id":"29478e0f.d6b872","type":"inject","z":"f14e3f02.0eb1c","name":"reset","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"x":90,"y":1160,"wires":[["85ae4fd9.7a51b"]]},{"id":"52c20565.ad3dfc","type":"bigstatus","z":"f14e3f02.0eb1c","name":"","locale":"","x":470,"y":1440,"wires":[["c7867de3.38798"]]},{"id":"b2230bc0.4ddcf8","type":"inject","z":"f14e3f02.0eb1c","name":"ok!","topic":"","payload":"Everything if fine!","payloadType":"str","repeat":"","crontab":"","once":false,"x":90,"y":1280,"wires":[["33ced4cb.cc312c"]]},{"id":"33ced4cb.cc312c","type":"function","z":"f14e3f02.0eb1c","name":"green dot","func":"msg = { shape: \"dot\", fill: \"green\", text: msg.payload }\nreturn msg;","outputs":1,"noerr":0,"x":260,"y":1280,"wires":[["52c20565.ad3dfc"]]},{"id":"c7867de3.38798","type":"debug","z":"f14e3f02.0eb1c","name":"text","active":true,"console":"false","complete":"payload","x":630,"y":1440,"wires":[]},{"id":"6dd4ca24.922b34","type":"inject","z":"f14e3f02.0eb1c","name":"warn!","topic":"","payload":"Beware, this is a warning!","payloadType":"str","repeat":"","crontab":"","once":false,"x":90,"y":1400,"wires":[["5ffc6fc7.a0039"]]},{"id":"5ffc6fc7.a0039","type":"function","z":"f14e3f02.0eb1c","name":"yellow !","func":"msg = { shape: \"ring\", fill: \"yellow\", text: msg.payload }\nreturn msg;","outputs":1,"noerr":0,"x":260,"y":1400,"wires":[["52c20565.ad3dfc"]]},{"id":"447f3aa6.bb80c4","type":"inject","z":"f14e3f02.0eb1c","name":"error!","topic":"","payload":"Something went wrong, oh damn!","payloadType":"str","repeat":"","crontab":"","once":false,"x":90,"y":1340,"wires":[["42faad24.bd0554"]]},{"id":"42faad24.bd0554","type":"function","z":"f14e3f02.0eb1c","name":"red ring","func":"msg = { shape: \"ring\", fill: \"red\", text: msg.payload }\nreturn msg;","outputs":1,"noerr":0,"x":260,"y":1340,"wires":[["52c20565.ad3dfc"]]},{"id":"364464d9.c9bb9c","type":"inject","z":"f14e3f02.0eb1c","name":"blue!","topic":"","payload":"I'm blue!","payloadType":"str","repeat":"","crontab":"","once":false,"x":90,"y":1480,"wires":[["4dd3bd6f.b22c44"]]},{"id":"fba5ceac.045a3","type":"inject","z":"f14e3f02.0eb1c","name":"grey!","topic":"","payload":"I'm grey!","payloadType":"str","repeat":"","crontab":"","once":false,"x":90,"y":1540,"wires":[["67e5971c.981a68"]]},{"id":"4dd3bd6f.b22c44","type":"function","z":"f14e3f02.0eb1c","name":"blue ring","func":"msg = { shape: \"ring\", fill: \"blue\", text: msg.payload }\nreturn msg;","outputs":1,"noerr":0,"x":260,"y":1480,"wires":[["52c20565.ad3dfc"]]},{"id":"67e5971c.981a68","type":"function","z":"f14e3f02.0eb1c","name":"grey ring","func":"msg = { shape: \"ring\", fill: \"grey\", text: msg.payload }\nreturn msg;","outputs":1,"noerr":0,"x":260,"y":1540,"wires":[["52c20565.ad3dfc"]]},{"id":"57cf2558.a830dc","type":"comment","z":"f14e3f02.0eb1c","name":"Big Status sample","info":"","x":120,"y":1120,"wires":[]},{"id":"be20898b.41df78","type":"inject","z":"f14e3f02.0eb1c","name":"Black","topic":"","payload":"Black!","payloadType":"str","repeat":"","crontab":"","once":false,"x":90,"y":1600,"wires":[["931d9e22.6ce26"]]},{"id":"931d9e22.6ce26","type":"function","z":"f14e3f02.0eb1c","name":"grey ring","func":"msg = { shape: \"ring\", text: msg.payload }\nreturn msg;","outputs":1,"noerr":0,"x":260,"y":1600,"wires":[["52c20565.ad3dfc"]]}]
```

![alt tag](https://cloud.githubusercontent.com/assets/18165555/15453797/f05840f6-2022-11e6-9067-fc632fbf3da9.png)

  Another example using a Big Node

  ```json
  [{"id":"989581aa.676a8","type":"comment","z":"f14e3f02.0eb1c","name":"Status sample with Big Nodes","info":"","x":160,"y":860,"wires":[]},{"id":"62543d4d.9dabc4","type":"inject","z":"f14e3f02.0eb1c","name":"cron","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":110,"y":960,"wires":[["6212bdba.9ded44","54baa663.ab4558"]]},{"id":"6212bdba.9ded44","type":"moment","z":"f14e3f02.0eb1c","name":"last","topic":"","input":"payload","format":"fromNow","locale":"fr","output":"payload","x":270,"y":900,"wires":[["2ac993de.d5366c"]]},{"id":"2ac993de.d5366c","type":"bigstatus","z":"f14e3f02.0eb1c","name":"last run","locale":"","x":420,"y":900,"wires":[[]]},{"id":"f203749d.0dfc88","type":"bigstatus","z":"f14e3f02.0eb1c","name":"final status","locale":"","x":690,"y":1020,"wires":[["52cb0970.ad34f8"]]},{"id":"ef05ac63.10fa5","type":"status","z":"f14e3f02.0eb1c","name":"reset","scope":["4f77483e.b088b8","2ac993de.d5366c"],"x":530,"y":1060,"wires":[["f203749d.0dfc88"]]},{"id":"54baa663.ab4558","type":"bigexec","z":"f14e3f02.0eb1c","name":"Some job","command":"sh","commandArgs":"-c 'sleep 2; exit $(expr $(date +%s) % 2);'","minError":1,"minWarning":1,"cwd":"","shell":"","extraArgumentProperty":"","envProperty":"","format":"utf8","limiter":true,"payloadIs":"triggerNoStdin","x":280,"y":1020,"wires":[[],["f203749d.0dfc88"],[]]},{"id":"52cb0970.ad34f8","type":"debug","z":"f14e3f02.0eb1c","name":"","active":true,"console":"false","complete":"true","x":850,"y":1020,"wires":[]},{"id":"71872656.8e78d8","type":"comment","z":"f14e3f02.0eb1c","name":"Big Status is connected to the second output","info":"","x":530,"y":980,"wires":[]}]
  ```

  ![alt tag](https://cloud.githubusercontent.com/assets/18165555/15453798/f35664ae-2022-11e6-98df-ca35d6d5e32a.png)

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


