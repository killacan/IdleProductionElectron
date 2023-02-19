import React from "react";

function BuildLi({possibleBuildings, imgPaths, i, handleClick, building, selectedBuilding}) {

    if (selectedBuilding === building) {
        return (
            <li className="selected" key={i}><img data-value={`${possibleBuildings[i]}`} onClick={(e) => handleClick(e)} src={`${Object.values(imgPaths)[i]}`} ></img></li>
        )
    } else {
        return (
            <li key={i}><img data-value={`${possibleBuildings[i]}`} onClick={(e) => handleClick(e)} src={`${Object.values(imgPaths)[i]}`} ></img></li>
        )
    }


}

module.exports = BuildLi;