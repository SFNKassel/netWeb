/**
 * Created by jaro on 24.06.16.
 */

function update(netString, force) {
    //parse the network object, we are getting...
    var network = JSON.parse(netString);
    console.log(network);

    var nodeList = [];
    var linkList = [];
    
    appendToList(network, nodeList, linkList, 0);

    console.log(nodeList);
    console.log(linkList);

    var graph = {
        nodes: nodeList,
        links: linkList
    };

    force
        .nodes(graph.nodes)
        .links(graph.links)
        .linkStrength(function(d){return 100 / Math.pow(d.value, 2)})
        .gravity(.05)
        .start();


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
        .enter().append("circle")
        .attr("class", "node")
        .attr("r", 10)
        .style("fill", function (d) {
            return color(d.group);
        })
        .call(force.drag);

    node.append("title")
        .text(function (d) {
            return d.name;
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
                return d.x;
            })
            .attr("cy", function (d) {
                return d.y;
            });
    });
}