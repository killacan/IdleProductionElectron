import React from 'react';
import BuildLi from './buildLi';

function BuildMenu ({selectedBuilding, setSelectedBuilding, possibleBuildings, imgPaths, tooltipHoverEnter, tooltipHoverLeave}) {

    const handleClick = (e) => {
        e.preventDefault();
        console.log(e.target.getAttribute("data-value"));
        setSelectedBuilding(e.target.getAttribute("data-value"));
    }

    return (
        <ul>
            {possibleBuildings.map((building, i) => {
                return <BuildLi possibleBuildings={possibleBuildings} imgPaths={imgPaths} i={i} handleClick={handleClick} building={building} selectedBuilding={selectedBuilding} tooltipHoverEnter={tooltipHoverEnter} tooltipHoverLeave={tooltipHoverLeave} />
            })}
        </ul>
    )
}

module.exports = BuildMenu;