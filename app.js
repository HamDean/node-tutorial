const EventEmitter = require("events");

const emitter = new EventEmitter();

//* Registering an event listener, function to be called when an event is raised
emitter.on("messageLogged", (args) => {
  console.log("Listener called", args);
});

//* Raising an event
emitter.emit("messageLogged", { id: 1, url: "https://" });
