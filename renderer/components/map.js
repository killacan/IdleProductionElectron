import React, { Component, useState, useEffect } from "react";
import CoalMine from "./coalMine";
import IronMine from "./ironMine";
import IronSmelter from "./ironSmelter";
import SteelMill from "./steelMill";
import CopperMine from "./copperMine";
import CopperSmelter from "./copperSmelter";
import CopperExtruder from "./copperExtruder";
import ToolFactory from "./toolFactory";
import Market from "./market";
import WindMill from "./windMill";


const Dot = require("./dot"); 

class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      grid: [],
    };
    this.setupGrid = this.setupGrid.bind(this);
    this.placeBuilding = this.placeBuilding.bind(this);
    this.setupGrid();
    console.log(props);
  }

  setupGrid() {
    // initial buildings with resources next
    const grid = [];
    console.log("setupGrid");

    for (let i = 0; i < 10; i++) {
      grid.push([]);
      for (let j = 0; j < 10; j++) {
        grid[i].push(null);
      }
    }

    for (let i = 0; i < this.props.possibleBuildings.length; i++) {
      this.props.allBuildings[this.props.possibleBuildings[i]] = [];
    }
    this.state = ({ grid: grid });
    console.log(this.state.grid);
    return grid;
  }

  getBuilding (pos) {
    return this.state.grid[pos[0]][pos[1]]
  }

  isEmptyPos(pos) {
    if (!this.isValidPos(pos)) {
      alert("Not a valid position!");
      // throw new BuildError("Is not a valid spot!");
    }

    return this.state.grid[pos[0]][pos[1]] === null;
  }

  isValidPos(pos) {
    return 0 <= pos[0] && pos[0] < 10 && 0 <= pos[1] && pos[1] < 10;
  }

  handleClick(e) {
    e.preventDefault();
    let pos = [Number(e.target.getAttribute("data-value")[0]), Number(e.target.getAttribute("data-value")[2])];
    if (this.props.selectedBuilding) {
      // we have a pos and a name of building. building name is a string.
      if (this.props.selectedBuilding === "IronMine") {
        this.placeBuilding(pos, new IronMine(pos));
      } else if (this.props.selectedBuilding === "IronSmelter") {
        this.placeBuilding(pos, new IronSmelter(pos));
      } else if (this.props.selectedBuilding === "SteelMill") {
        this.placeBuilding(pos, new SteelMill(pos));
      } else if (this.props.selectedBuilding === "CopperMine") {
        this.placeBuilding(pos, new CopperMine(pos));
      } else if (this.props.selectedBuilding === "CopperSmelter") {
        this.placeBuilding(pos, new CopperSmelter(pos));
      } else if (this.props.selectedBuilding === "CopperExtruder") {
        this.placeBuilding(pos, new CopperExtruder(pos));
      } else if (this.props.selectedBuilding === "ToolFactory") {
        this.placeBuilding(pos, new ToolFactory(pos));
      } else if (this.props.selectedBuilding === "Market") {
        this.placeBuilding(pos, new Market(pos));
      } else if (this.props.selectedBuilding === "WindMill") {
        this.placeBuilding(pos, new WindMill(pos));
      } else if (this.props.selectedBuilding === "CoalMine") {
        
      }
    }
  }

  placeBuilding(pos, type) {
    // take in the type of building. Create the building and place it on the map.
    if (!this.isEmptyPos(pos)) {
      
    } else if (this.money < type.cost) {
      this.BuildError("Not Enough Money!");
      // throw new BuildError("Not Enough Money!");
    } else {
      this.state.grid[pos[0]][pos[1]] = type;
      let buildingName = type.name;
      this.props.setAllBuildings({...this.props.allBuildings, buildingName: this.props.allBuildings[type.name].push(type)});
      console.log(this.props.allBuildings, "allBuildings");
      this.money -= type.cost;
      // here is where we need to save a sorted array of all the children by distance on the parent buildings. 
      if (type.parentNames) {
        let allParents = [];
        type.parentNames.forEach((parent) => {
          allParents = allParents.concat(this.props.allBuildings[parent]);
        });
        allParents.forEach((parent) => {
          parent.sortedChildren = parent.sortedChildren.concat(type);
          parent.sortedChildren.sort((a, b) => {
            // console.log(a.nodepos, building.nodepos, b.nodepos, building.nodepos,"inside sort")
            return dist(a.nodepos, parent.nodepos) - dist(b.nodepos, parent.nodepos);
          });
        });
      } 
      if (type.childNames) {
        // this needs to create a sorted array of all the children by distance on the parent buildings.
        // we need to make an array of all the children of the building. then sort.
        let allChildren = [];
        type.childNames.forEach((child) => {
          allChildren = allChildren.concat(this.props.allBuildings[child]);
        });
        allChildren.sort((a, b) => {
          return dist(a.nodepos, type.nodepos) - dist(b.nodepos, type.nodepos);
        });
        type.sortedChildren = allChildren;
      }
    }
  }

  render () {
    return (
      <>
        <ul>
          {Object.values(this.state.grid).map((row, rowIndex) => (
            <>
            {row.map((building, colIndex) => (
              <li onClick={(e) => this.handleClick(e)} data-value={[rowIndex, colIndex]} key={`${rowIndex}-${colIndex}`}>
                {building && <img data-value={building.nodepos} src={`${this.props.imgPaths[building.name]}`} /> }
              </li>
            ))}
            </>
          ))}
        </ul>
      </>
    )
  }


  // startingMarket () {
  //     this.placeBuilding([5,5], new Market([5,5], this))
  // }

  // put in a building checker.

  // setupBoard() {
  //   testBox = document.querySelector(".grid-boxes");
  //   if (testBox) {
  //     testBox.remove();
  //   }
  //   let ul = document.createElement("ul");
  //   ul.classList.add("grid-boxes");
  //   for (let i = 0; i < 10; i++) {
  //     for (let j = 0; j < 10; j++) {
  //       let li = document.createElement("li");
  //       li.dataset.pos = JSON.stringify([i, j]);
  //       li.dataset.building = JSON.stringify(this.grid[i][j]);
  //       if (this.getBuilding([i, j])) {
  //         let img = new Image();
  //         img.src = this.imgPaths[this.getBuilding([i, j]).name];
  //         li.append(img);
  //         // console.log([i,j], this.imgPaths[this.getBuilding([i,j]).name] , "see meeeeee")
  //       }
  //       // console.log(li.dataset.building)
  //       ul.append(li);
  //     }
  //   }

  //   this.el.append(ul);
  // }

  // updateRSS() {
  //   // console.log(this.allBuildings.length > 0)
  //   this.allRSS = {};
  //   // console.log(Object.values(this.allBuildings))

  //   if (Object.values(this.allBuildings).flat().length > 0) {
  //     for (let i = 0; i < Object.values(this.allBuildings).flat().length; i++) {
  //       this.totalPower -= Object.values(this.allBuildings).flat()[i].powerCost //subtract power
  //       // console.log(Object.values(this.allBuildings).flat())
  //       let obRSS = Object.entries(
  //         Object.values(this.allBuildings).flat()[i].resources
  //       );
  //       // console.log(obRSS, "obRSS")
  //       if (obRSS)
  //         for (let k = 0; k < obRSS.length; k++) {
  //           if (!this.allRSS[obRSS[k][0]]) this.allRSS[obRSS[k][0]] = 0;
  //           this.allRSS[obRSS[k][0]] += parseInt(obRSS[k][1]);
  //         }
  //     }
  //   }
  // }

  // updatePower() {
  //   if (this.totalPower >= 100) {
  //     this.money += Math.floor(this.totalPower / 200)
  //   }
  //   this.totalPower = 0;
  //   this.allBuildings["WindMill"].forEach((powerplant) => {
  //     this.totalPower += powerplant.power;
  //   });
  // }

  // // could set a variable for able to produce based on if there was extra
  // //power when iterating, set to true when rss update.

  // // could just do power check when buildings update. rss. 



  // removeBuilding(pos) {
  //   if (this.isEmptyPos(pos)) {

  //     // throw new BuildError("Empty spot!");
  //   } else {
  //     let type = this.getBuilding(pos);
  //     this.money += type.cost;

  //     // console.log(this.allBuildings[type.name], "in remove building");
  //     let buildidx = this.allBuildings[type.name].findIndex((ele) => {
  //       return ele === type;
  //     });

  //     this.allBuildings[type.name] = this.allBuildings[type.name]
  //       .slice(0, buildidx)
  //       .concat(this.allBuildings[type.name].slice(buildidx + 1));
  //     this.grid[pos[0]][pos[1]] = null;
  //     // console.log(this.allBuildings[type.name], "in remove building");

  //     if (type.parentNames) {
  //       let allParents = [];
  //       type.parentNames.forEach((parent) => {
  //         allParents = allParents.concat(this.allBuildings[parent]);
  //       });
  //       allParents.forEach((parent) => {
  //         let childidx = parent.sortedChildren.findIndex((ele) => {
  //           return ele === type;
  //         });
  //         parent.sortedChildren = parent.sortedChildren
  //           .slice(0, childidx)
  //           .concat(parent.sortedChildren.slice(childidx + 1));
  //       });
  //     }
  //   }
  // }

  // getBuilding(pos) {
  //   return this.grid[pos[0]][pos[1]];
  // }

  // makeDot (pos1, pos2) {
  //   let dot = new Dot(pos1, pos2);
  //   this.movingDots.push(dot);
  //   return dot;
  // }
  
  // BuildError (msg) {
  //   this.errorTooltip.innerText = msg;
  //   this.errorTooltip.style.visibility = "visible";
  //   if (msg === "Not Enough Money!") {
  //     setTimeout(() => {
  //         this.errorTooltip.style.visibility = "hidden";
  //     }, 5000);
  //   }
  //   this.errorTooltip.addEventListener("click", () => {
  //       this.errorTooltip.style.visibility = "hidden";
  //   });
  // };

  // going to have to update grid with building then
  // have map re-render when building is built.


}



// module.exports = BuildError;
module.exports = Map;
