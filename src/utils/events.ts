import fs from "fs";

function run(client) {
  fs.readdir("./src/events/", (err, files) => {
    files.forEach((file) => {
      let eventName = file.split(".")[0];
      client.on(
        eventName,
        require(`../events/${eventName}`).bind(null, client)
      );
    });
  });
}

export default { run };
