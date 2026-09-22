const fs = require("fs");
const EventEmitter = require("events");

const event = new EventEmitter();

let text1 = "";
let text2 = "";
let count = 0;

event.on("filesReady", () => {
    const result = text1 + "\n" + text2;

    fs.writeFile("output.txt", result, (err) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log("Files merged successfully!");
    });
});

fs.readFile("test1.txt", "utf8", (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    text1 = data;
    count++;

    if (count === 2) {
        console.log("Both files are ready!");
        event.emit("filesReady");
    }
});

fs.readFile("test2.txt", "utf8", (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    text2 = data;
    count++;

    if (count === 2) {
        console.log("Both files are ready!");
        event.emit("filesReady");
    }
}); 
