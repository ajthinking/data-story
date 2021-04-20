fs = require('fs');

const nodeName = process.argv[2]

// Create ServerNode file
fs.writeFile(
    __dirname + '/../server/nodes/' + nodeName + '.ts', 
    fs.readFileSync(__dirname + '/add-node.stub').toString().replace(/NODE_NAME/g, nodeName),
    {},
    () => {}
)

// Add ServerNode file to ServerNodeFactory
// TODO

// Create Test file
fs.writeFile(
    __dirname + '/../../tests/unit/server/nodes/' + nodeName + '.test.ts', 
    fs.readFileSync(__dirname + '/add-node-test.stub').toString().replace(/NODE_NAME/g, nodeName),
    {},
    () => {}
)

console.log(nodeName + " NodeFile and test created. Remember to add your node in ServerNodeFactory.")