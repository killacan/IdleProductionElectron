import React from 'react'
import IronMine from "./ironMine";
import IronSmelter from "./ironSmelter";
import SteelMill from "./steelMill";
import CopperMine from "./copperMine";
import CopperSmelter from "./copperSmelter";
import CopperExtruder from "./copperExtruder";
import ToolFactory from "./toolFactory";
import Market from "./market";
import WindMill from "./windMill";

function HoverMenu ({isHovering, hoverInfo, selectedBuilding}) {

  const buildingInfoHolder = {
    ironMine: new IronMine(),
    ironSmelter: new IronSmelter(),
    steelMill: new SteelMill(),
    copperMine: new CopperMine(),
    copperSmelter: new CopperSmelter(),
    copperExtruder: new CopperExtruder(),
    toolFactory: new ToolFactory(),
    market: new Market(),
    windMill: new WindMill()
  }

  const setTooltip = () => {
      
  }

  if (isHovering) {
    return (
      <div id='tooltip' >
        <p id="tooltip-text"></p>
        <p id="tooltip-text2"></p>
        <p id="tooltip-text3"></p>
        <p id="tooltip-text4"></p>
      </div>
    )
  } else {
    return (
      <>
      </>
    )
  }

  return (
    <div >

    </div>
  )
}

module.exports = HoverMenu