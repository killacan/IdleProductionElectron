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