import React from 'react';

function BuildMenu ({selectedBuilding, setSelectedBuilding, possibleBuildings, imgPaths}) {



    const handleClick = (e) => {
        e.preventDefault();
        console.log(e.target.getAttribute("data-value"));
        setSelectedBuilding(e.target.getAttribute("data-value"));
    }


    return (
        <ul>
            {possibleBuildings.map((building, i) => {
                return (
                    <li key={i}><img data-value={`${possibleBuildings[i]}`} onClick={(e) => handleClick(e)} src={`${Object.values(imgPaths)[i]}`} ></img></li>
                )

            })}
        </ul>
    )
}

module.exports = BuildMenu;