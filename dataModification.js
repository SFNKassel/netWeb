
/**
 * Created by jaro on 24.06.16.
 */
var stack = [1];

function appendToList(node, list, links, it) {

    stack.push(links.length + 1 + it);

    list.push({"name": node.ip,"group": (node.ip == "10.0.2.2" ? 100 : 1)});

    if(stack.length > 2) {
        links.push({"source":stack[stack.length - 2] - 1,"target":list.length - 1,"value":300 / node.ping});
        console.log(links[links.length - 1]);
    }

    for (var i = 0; i < node.nodes.length; i++) {
        var n = node.nodes[i];
        appendToList(n, list, links, it + 1);
    }

    stack.pop();
}


/*function generateLinks(topNode, list, links) {

    stack.push()

    for (var i = 0; i < topNode.nodes.length; i++) {
        var n = topNode.nodes[i];

        generateLinks(n, list, links);
    }
}
*/