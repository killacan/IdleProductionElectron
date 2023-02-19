import React from 'react';
import BuildLi from './buildLi';

function BuildMenu ({selectedBuilding, setSelectedBuilding, possibleBuildings, imgPaths}) {

    const handleClick = (e) => {
        e.preventDefault();
        console.log(e.target.getAttribute("data-value"));
        setSelectedBuilding(e.target.getAttribute("data-value"));
    }

    console.log(possibleBuildings)


    return (
        <ul>
            {possibleBuildings.map((building, i) => {
                return <BuildLi possibleBuildings={possibleBuildings} imgPaths={imgPaths} i={i} handleClick={handleClick} building={building} selectedBuilding={selectedBuilding} />
            })}
        </ul>
    )
}

module.exports = BuildMenu;