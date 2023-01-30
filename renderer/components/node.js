import React from 'react'

class Node extends React.Component {

    constructor(pos) {
        super(pos)
        // this.pos = pos
        this.resources = {};
        this.sortedChildren = [];
        // this.map = map
        // this.tuna = "tuna"
    }

    get pos () {
        return this.pos
    }

    

}

module.exports = Node