import React from 'react';

class BuildMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null,
        }
    }


    handleClick(e) {
        e.preventDefault();
        this.props.setSelectedBuilding(e.target.getAttribute("data-value"));
    }


    render() {
        return (
            <ul>
                {this.props.possibleBuildings.map((building, i) => {
                    return (
                        <li key={i}><img data-value={`${this.props.possibleBuildings[i]}`} onClick={(e) => this.handleClick(e)} src={`${Object.values(this.props.imgPaths)[i]}`} ></img></li>
                    )

                })}
            </ul>
        )
    }
}

module.exports = BuildMenu;