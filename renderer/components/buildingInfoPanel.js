import React from "react";
import IronMine from "./ironMine";
import IronSmelter from "./ironSmelter";
import SteelMill from "./steelMill";
import CopperMine from "./copperMine";
import CopperSmelter from "./copperSmelter";
import CopperExtruder from "./copperExtruder";
import ToolFactory from "./toolFactory";
import Market from "./market";
import WindMill from "./windMill";

function BuildingInfoPanel({ selectedBuilding }) {

    const buildingInfoHolder = {
        IronMine: new IronMine(),
        IronSmelter: new IronSmelter(),
        SteelMill: new SteelMill(),
        CopperMine: new CopperMine(),
        CopperSmelter: new CopperSmelter(),
        CopperExtruder: new CopperExtruder(),
        ToolFactory: new ToolFactory(),
        Market: new Market(),
        WindMill: new WindMill()
    }

    return (
        <div className="info-panel">
            {selectedBuilding && <h3 id="selected-building">{selectedBuilding}</h3>}
            {!selectedBuilding && <h3 id="selected-building">Selected Building</h3>}
            <canvas id="info-canvas" width="180px" height="675px"></canvas>
            <div className="description-holder"><p id="description">{selectedBuilding && buildingInfoHolder[selectedBuilding].description}</p></div>
            <div className="cost-holder"><p>Build Cost:</p><span id="build-cost">{selectedBuilding && buildingInfoHolder[selectedBuilding].cost}</span></div>
            <div className="power-cost-holder"><p>Power Cost:</p><span id="power-cost">{selectedBuilding && buildingInfoHolder[selectedBuilding].powerCost}</span></div>
        </div>
    )
}

module.exports = BuildingInfoPanel;