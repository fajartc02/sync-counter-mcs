var express = require("express");
var fs = require("fs");
var app = express();
const http = require("http");
const server = http.createServer(app);
const WebSocket = require("ws");
const wsGlobal = new WebSocket.Server({ noServer: true });
const url = require("url");
const Counter = require("./models/counter");

try {
    wsGlobal.on("connection", function connection(ws, request) {
        console.log(
            "Connected :    " +
            request.socket.remoteAddress +
            ":" +
            request.socket.remotePort
        );
        const query = url.parse(request.url, true).query;

        const jsonData = {
            machine_nm: query.machine_nm,
        };

        ws.id = jsonData;
        ws.send(
            JSON.stringify({
                message: "Connected",
                data: {
                    identifier: ws.id,
                },
            })
        );

        const intervalId = setInterval(async() => {
            wsGlobal.clients.forEach(async(client) => {
                console.log(client.id.machine_nm);
                console.log(ws.id.machine_nm);
                if (client.id.machine_nm == ws.id.machine_nm) {
                    const counters = await Counter.getByMcName(jsonData.machine_nm);
                    client.send(JSON.stringify(counters));
                }
            });
        }, 2000);

        ws.on("message", async function incoming(message) {
            const data = JSON.parse(message);
            console.log(data);
            // wsGlobal.clients.forEach(async(client) => {
            //     if (
            //         client.id.machine_nm == ws.id.machine_nm &&
            //         client.id.device == data.target
            //     ) {
            //         wsGlobal.clients.forEach((client) => {
            //             if (
            //                 client.id.machine_nm == ws.id.machine_nm &&
            //                 client.id.device == data.target
            //             ) {
            //                 switch (data.event) {

            //                 }
            //             }
            //         });
            //     }
            // });
        });

        ws.on("close", function close() {
            console.log(
                "Disconnected :    " +
                request.socket.remoteAddress +
                ":" +
                request.socket.remotePort
            );
            const query = url.parse(request.url, true).query;
            clearInterval(intervalId);
            const jsonData = {
                machine_nm: query.machine_nm,
                device: query.device,
            };

            ws.id = jsonData;
            ws.send(
                JSON.stringify({
                    message: "Connected",
                    data: {
                        identifier: ws.id,
                    },
                })
            );
        });
    });

    server.on("upgrade", function upgrade(request, socket, head) {
        const pathname = url.parse(request.url).pathname;

        if (pathname) {
            wsGlobal.handleUpgrade(request, socket, head, function done(ws) {
                wsGlobal.emit("connection", ws, request);
            });
        } else {
            socket.destroy();
        }
    });

    server.listen(4444, function listening() {
        console.log("WS Listening on %d", server.address().port);
    });
} catch (error) {
    console.log(error);
}

module.exports = {
    wss: wsGlobal,
};