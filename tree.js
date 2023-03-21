function Node(data){
    this.data = data; //string
    this.children = []; //array
}
    
// evo tree data structure, holds evolution chain
// used tree bc some pokes have varying evolutions
class evoChain{
    // initialize tree
    constructor(pkm){
        this.root = null; // node at top is empty
    }
    // add new evos
    add(data, toNodeData){
        const node = new Node(data);
        const parent = toNodeData ? this.findBFS(toNodeData) : null; //this node data is true then it will findbfs
        if(parent) parent.children.push(node); // find parent, push new evo to prev evo
        else{
            if(!this.root) this.root = node; // make this node the root
            else return 'tried to store node at root when root already exists'
        }
    }
    findBFS(data){
        const queue = [this.root];
        let n = null; 

        this.traverseBFS((node) =>{
            if(node.data == data) n = node; //found data
        })
        return n;
    }
    traverseBFS(callback){
        const queue = [this.root]
        if(callback){ // goes through all nodes in tree
            while(queue.length){
                const node = queue.shift();
                callback(node);
                for(const child of node.children) queue.push(child);
            }
        }
    }
}

/*
// build tree
function test(){
    let tree = new evoChain();
    tree.add('node1');
    tree.add('node2', 'node1');
    tree.add('node3', 'node2');
    tree.add('node4', 'node1');

    tree.traverseBFS((node) => console.log('current node: ', node));
}

test(); */