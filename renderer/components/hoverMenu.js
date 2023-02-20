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

function HoverMenu ({isHovering, hoverInfo}) {

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

  buildingInfoHolder["WindMill"].powerCost = 0;

  if (isHovering) {
    return (
      <div id='tooltip' >
        <p id="tooltip-text">{buildingInfoHolder[hoverInfo].name}</p>
        <p id="tooltip-text2">{buildingInfoHolder[hoverInfo].description}</p>
        <p id="tooltip-text3">Cost: {buildingInfoHolder[hoverInfo].cost}</p>
        <p id="tooltip-text4">Power Cost: {buildingInfoHolder[hoverInfo].powerCost}</p>
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