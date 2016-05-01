# node-red-contrib-bigline

"Line" parser for Big Nodes. Following the "big csv" and "big file" implementations, here is a node working the same way

![alt tag](https://cloud.githubusercontent.com/assets/18165555/14586804/b4f80634-04a4-11e6-87c3-eed9f66df330.png)

![alt tag](https://cloud.githubusercontent.com/assets/18165555/14586805/b810c810-04a4-11e6-9c0e-6ef07fb75963.png)

![alt tag](https://cloud.githubusercontent.com/assets/18165555/14586807/bb6d2620-04a4-11e6-9a08-10abb99c315f.png)

## Installation
```bash
npm install node-red-contrib-bigline
```

## Principles for Big Nodes
 
###1 can handle big data or block mode

  That means, in block mode, not only "one message is a whole file" and able to manage start/end control messages

###2 send start/end messages as well as statuses

  That means it uses a second output to give control states (start/end/running and error) control messages

###3 tell visually what they are doing

  Visual status on the node tells it's ready/running (blue), all is ok and done (green) or in error (red)

## Usages

Big Line is a filter node for node-red to transform data into lines, one message per line. It uses the "byline" library

It works as a filter node that means it takes in the output of a "big file" node or any block node. It's able to read a file by itself to send lines

It has two options as byline offers them:

- data format (utf8, latin, hexdec, base64, ucs2 and ascii)
- keep empty lines

## Dependencies

[byline](https://www.npmjs.com/package/byline) simple line-by-line stream reader

[biglib](https://www.npmjs.com/package/node-red-biglib) library for building node-red flows that supports blocks, high volume

## Example flow files

  Try pasting in the flow file below that shows the node behaviour 

```json
[{"id":"986f3245.6790d","type":"inject","z":"1a05bf7a.e5fa41","name":"GO","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"x":408,"y":81,"wires":[["e0dada50.1f2528"]]},{"id":"e0dada50.1f2528","type":"function","z":"1a05bf7a.e5fa41","name":"sample data","func":"msg.control = { state: \"standalone\" }\nmsg.payload = \"This is a line\\nThis is a second line\\n\\nThis is a ending line\"\nreturn msg;","outputs":1,"noerr":0,"x":568,"y":187,"wires":[["639ba72b.9c6458"]]},{"id":"639ba72b.9c6458","type":"bigline","z":"1a05bf7a.e5fa41","name":"big line","filename":"","format":"utf8","keepEmptyLines":true,"x":646,"y":378,"wires":[["6c763bc9.9389c4"],["fa1bf3be.05e41"]]},{"id":"6c763bc9.9389c4","type":"debug","z":"1a05bf7a.e5fa41","name":"lines","active":true,"console":"false","complete":"payload","x":849.5,"y":211,"wires":[]},{"id":"fa1bf3be.05e41","type":"debug","z":"1a05bf7a.e5fa41","name":"status","active":true,"console":"false","complete":"control","x":857.5,"y":305,"wires":[]},{"id":"f770faa7.088f08","type":"inject","z":"1a05bf7a.e5fa41","name":"GO keep empty lines","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"x":153.5,"y":236,"wires":[["fa7eddd6.05812"]]},{"id":"36ee47fd.c911b8","type":"inject","z":"1a05bf7a.e5fa41","name":"GO ignore empty lines","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"x":152.5,"y":334,"wires":[["f257642a.0da898"]]},{"id":"f257642a.0da898","type":"function","z":"1a05bf7a.e5fa41","name":"keepEmptyLines=false","func":"msg.config = { keepEmptyLines: false }\nreturn msg;","outputs":1,"noerr":0,"x":353.5,"y":280,"wires":[["e0dada50.1f2528"]]},{"id":"fa7eddd6.05812","type":"function","z":"1a05bf7a.e5fa41","name":"keepEmptyLines=true","func":"msg.config = { keepEmptyLines: true }\nreturn msg;","outputs":1,"noerr":0,"x":355.5,"y":187,"wires":[["e0dada50.1f2528"]]},{"id":"58cf9546.a7306c","type":"comment","z":"1a05bf7a.e5fa41","name":"This node accepts on the fly configuration","info":"","x":187,"y":151,"wires":[]},{"id":"7dc16d9.f823e94","type":"comment","z":"1a05bf7a.e5fa41","name":"4 lines of data with 1 empty line","info":"","x":627.5,"y":150,"wires":[]},{"id":"a0f7c336.5f084","type":"comment","z":"1a05bf7a.e5fa41","name":"control messages (start, stop, ...)","info":"","x":906.5,"y":348,"wires":[]},{"id":"b64b7e09.49b48","type":"comment","z":"1a05bf7a.e5fa41","name":"One message per line","info":"","x":875.5,"y":254,"wires":[]},{"id":"2822fcf.fd7dd04","type":"comment","z":"1a05bf7a.e5fa41","name":"Simple trigger","info":"","x":450.5,"y":42,"wires":[]},{"id":"d2035300.2dfcb","type":"inject","z":"1a05bf7a.e5fa41","name":"GO with an error","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"x":131.5,"y":428,"wires":[["ffa25f8.f005da"]]},{"id":"ffa25f8.f005da","type":"function","z":"1a05bf7a.e5fa41","name":"Non existing file","func":"msg.payload = \"/A/Probably/Non/Existing/File\"\nreturn msg;","outputs":1,"noerr":0,"x":372.5,"y":428,"wires":[["639ba72b.9c6458"]]}]
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


