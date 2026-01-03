## Day 6: Node.js Core Modules & Event Emitter

### Theoretical Questions

1. What are core modules in Node.js? Name at least 10.
--> Core modules are built-in modules provided by Node.js.
They do not require installation via npm.

Examples (10+):
1. fs
2. path
3. http
4. https
5. os
6. events
7. stream
8. buffer
9. cluster
10. child_process

2. Explain the fs module. Difference between fs and fs/promises.
--> fs module
Used for file system operations:
Read/write files
Create/delete files or directories
Streams for large files

fs.readFile("data.txt", "utf8", (err, data) => {});

Key Difference:
fs	                   
It's a Callback-based.       
It's having Older style.           
More nesting is needed in fs module.	       

fs/promises
It's a Promise-based.
It's having Modern async/await style
It provides Cleaner code

3. What is the 'path' module used for?
--> 'path' module used to handle and transform file paths safely across OSes.
Common methods:
path.join(__dirname, "files", "a.txt");
path.resolve("a", "b");
path.basename("/test/file.txt"); // file.txt
path.extname("file.js"); // .js

4. Explain the EventEmitter class. How do you use it?
--> EventEmitter enables event-driven programming in Node.js.
Steps:
Create emitter
Listen to events
Emit events

Code Example: 
const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("order", (id) => {
  console.log("Order received:", id);
});

emitter.emit("order", 101);

It's used in streams, servers, custom events, logging, etc.

5. What is the difference between on() and once() in EventEmitter?
--> on() - Executes every time event is emitted.
once() - Executes only one time.

6. How does error handling work with EventEmitters?
--> Errors are handled via the special "error" event and If "error" is emitted without a listener, Node crashes.

Code Example:
emitter.on("error", (err) => {
  console.error("Handled error:", err.message);
});

emitter.emit("error", new Error("Something went wrong"));

7. What is the cluster module? Why use it?
--> * It allows multiple Node.js processes to run on multiple CPU cores.
* It Improves performance for CPU-heavy apps.

Code Example:
const cluster = require("cluster");
const os = require("os");

if (cluster.isPrimary) {
  os.cpus().forEach(() => cluster.fork());
}

Used for:
* High traffic servers.
* Load balancing.

8. What are child processes? When would you spawn one?
--> Child processes allow Node.js to run external programs or heavy tasks.
We spawn one when:
1. CPU-intensive work.
2. Running shell commands and Background jobs.

9. Difference between spawn, exec, and fork.
--> spawn - Large output, streams data.
exec - Small commands, buffers output.
fork - Spawn Node.js scripts with IPC.
