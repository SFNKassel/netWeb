/**
 * Created by jaro on 24.06.16.
 * this is the main JS File...
 */
first = true;
console.log("started...");

var size = {
    width: document.body.clientWidth - 20,
    height: document.body.clientHeight - 20
};

var color = d3.scale.category20();

var svg = d3.select("body").append("svg")
    .attr("width", size.width)
    .attr("height", size.height);

var force = d3.layout.force()
    .charge(-120)
    .linkDistance(200)
    .size([size.width, size.height]);

var ws = new WebSocket("ws://10.0.2.35:8888");

ws.onmessage = function (evt)
{
    var received_msg = evt.data;
    update(evt.data, force);
};
/*
var client = new XMLHttpRequest();
client.open('GET', '/testNetwork.json');
client.onreadystatechange = function() {
    if (client.readyState == 4 && client.status == 200) {
        update(client.responseText, force);
    }
};

client.send();
 */