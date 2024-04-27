const EventEmitter = require("events");

const emitter = new EventEmitter();

//* Registering an event listener, function to be called when an event is raised
emitter.on("messageLogged", () => {
  console.log("Listener called");
});

//* Raising an event
emitter.emit("messageLogged");
