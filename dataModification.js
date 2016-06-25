
/**
 * Created by jaro on 24.06.16.
 */
var stack = [1];

function appendToList(node, list, links, it) {

    stack.push(links.length + 1 + it);

    list.push({"name": node.ip, mac: node.mac, "group": ipToDada(node.ip)});

    if(stack.length > 2) {
        links.push({"source":stack[stack.length - 2] - 1,"target":list.length - 1,"value":300 / node.ping});
    }

    for (var i = 0; i < node.nodes.length; i++) {
        var n = node.nodes[i];
        appendToList(n, list, links, it + 1);
    }

    stack.pop();
}

function ipToDada(ip) {
    switch (ip) {
        case "10.0.2.2":
            return 1;
        case "10.0.24.90":
            return 2;
        case "10.0.23.192":
            return 3;
        default:
            return 0;
    }
}

/*function generateLinks(topNode, list, links) {

    stack.push()

    for (var i = 0; i < topNode.nodes.length; i++) {
        var n = topNode.nodes[i];

        generateLinks(n, list, links);
    }
}
*/