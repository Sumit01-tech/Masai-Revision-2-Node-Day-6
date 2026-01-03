const FileWatcher = require("./fileWatcher");

const watcher = new FileWatcher("./watched");

const logWithTime = (message) => {
    console.log(`[${new Date().toLocaleString()}] ${message}`);
};

watcher.on("file-added", (file) => {
    logWithTime(`File added: ${file}`);
});

watcher.on("file-modified", (file) => {
    logWithTime(`File modified: ${file}`);
});

watcher.on("file-deleted", (file) => {
    logWithTime(`File deleted: ${file}`);
});

watcher.on("error", (err) => {
    logWithTime(`Error: ${err.message}`);
});
