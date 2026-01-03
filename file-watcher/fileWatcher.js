const fs = require("fs");
const path = require("path");
const EventEmitter = require("events");

class FileWatcher extends EventEmitter {
    constructor(directoryPath) {
        super();
        this.directoryPath = directoryPath;
        this.files = new Set();

        this.initialize();
        this.watch();
    }
    initialize() {
        try {
            const existingFiles = fs.readdirSync(this.directoryPath);
            existingFiles.forEach(file => this.files.add(file));
        } catch (err) {
            this.emit("error", err);
        }
    }

    watch() {
        try {
            fs.watch(this.directoryPath, (eventType, filename) => {
                if (!filename) return;

                const filePath = path.join(this.directoryPath, filename);

                fs.stat(filePath, (err) => {
                    if (err) {
                        if (this.files.has(filename)) {
                            this.files.delete(filename);
                            this.emit("file-deleted", filename);
                        }
                        return;
                    }
                    if (!this.files.has(filename)) {
                        this.files.add(filename);
                        this.emit("file-added", filename);
                    }
                    else {
                        this.emit("file-modified", filename);
                    }
                });
            });
        } catch (err) {
            this.emit("error", err);
        }
    }
}

module.exports = FileWatcher;
