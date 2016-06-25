/**
 * Created by jaro on 24.06.16.
 */

function update(netString, force) {
    console.log("got message: \n" + netString);
    //parse the network object, we are getting...
    var network = JSON.parse(netString);
    console.log(network);

    var nodeList = [];
    var linkList = [];
    
    appendToList(network, nodeList, linkList, 0);

    var graph = {
        nodes: nodeList,
        links: linkList
    };
    
    if(first) {
        force
            .nodes(graph.nodes)
            .links(graph.links)
            .linkDistance(function(d){return 500 / Math.pow(d.value, .2)})
            .gravity(.05)
            .start();
        first = false;
    } else {
        return;
    }


    //let the lib do the voodo!
    var link = svg.selectAll(".link")
        .data(graph.links)
        .enter().append("line")
        .attr("class", "link")
        .style("stroke-width", function (d) {
            return Math.sqrt(d.value);
        });

    var node = svg.selectAll(".node")
        .data(graph.nodes)
        .enter().append("g")
        .attr("class", "node")
        .call(force.drag);

    node.append("circle")
        .attr("r", 10)
        .style("fill", function (d) {
            return color(d.group);
        })


    node.append("text")
        .attr("dx", 12)
        .attr("dy", ".35em")
        .text(function(d) {
            return d.name;
        });


    node.append("title")
        .text(function (d) {
            return d.mac;
        });

    force.on("tick", function () {
        link.attr("x1", function (d) {
                return d.source.x;
            })
            .attr("y1", function (d) {
                return d.source.y;
            })
            .attr("x2", function (d) {
                return d.target.x;
            })
            .attr("y2", function (d) {
                return d.target.y;
            });

        node.attr("cx", function (d) {
            node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        });
    });
}