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
// import { useSelector, useDispatch } from "react-redux";


const Dot = require("./dot"); 

function Map ({ possibleBuildings, imgPaths, allRss, allBuildings, setAllBuildings, selectedBuilding, setAllRss, setError, setErrorMessage, toggleGameSounds, gameSounds }) {
  // const dispatch = useDispatch();

  const [grid, setGrid] = useState(Array(10).fill(Array(10).fill(null)));
  // const allBuildings = useSelector(state => state.allBuildings);
  // const allRss = useSelector(state => state.allRss);
  const [buildDidRun, setBuildDidRun] = useState(false);





  // const setupGrid = () => {
  //   // initial buildings with resources next
  //   let tempGrid = [];
  //   console.log("setupGrid");

  //   for (let i = 0; i < 10; i++) {
  //     tempGrid.push([]);
  //     for (let j = 0; j < 10; j++) {
  //       tempGrid[i].push(null);
  //     }
  //   }


  //   return grid;
  // }

  const buildingsSetup = () => {
    if (buildDidRun) return;
    let buildingsObject = {};
    for (let i = 0; i < possibleBuildings.length; i++) {
        buildingsObject[possibleBuildings[i]] = [possibleBuildings[i]] = [];
    }
    setBuildDidRun(true);
    // setAllBuildings(buildingsObject);

  }

  const getBuilding = (pos) => {
    return grid[pos[0]][pos[1]]
  }

  const isEmptyPos = (pos) => {
    if (!isValidPos(pos)) {
      alert("Not a valid position!");
      // throw new BuildError("Is not a valid spot!");
    }

    return grid[pos[0]][pos[1]] === null;
  }

  const isValidPos = (pos) => {
    return 0 <= pos[0] && pos[0] < 10 && 0 <= pos[1] && pos[1] < 10;
  }

  const handleClick = (e) => {
    e.preventDefault();
    let pos = [Number(e.target.getAttribute("data-value")[0]), Number(e.target.getAttribute("data-value")[2])];
    if (selectedBuilding && isEmptyPos(pos)) {
      // we have a pos and a name of building. building name is a string.
      if (selectedBuilding === "IronMine") {
        placeBuilding(pos, new IronMine(pos));
      } else if (selectedBuilding === "IronSmelter") {
        placeBuilding(pos, new IronSmelter(pos));
      } else if (selectedBuilding === "SteelMill") {
        placeBuilding(pos, new SteelMill(pos));
      } else if (selectedBuilding === "CopperMine") {
        placeBuilding(pos, new CopperMine(pos));
      } else if (selectedBuilding === "CopperSmelter") {
        placeBuilding(pos, new CopperSmelter(pos));
      } else if (selectedBuilding === "CopperExtruder") {
        placeBuilding(pos, new CopperExtruder(pos));
      } else if (selectedBuilding === "ToolFactory") {
        placeBuilding(pos, new ToolFactory(pos));
      } else if (selectedBuilding === "Market") {
        placeBuilding(pos, new Market(pos));
      } else if (selectedBuilding === "WindMill") {
        placeBuilding(pos, new WindMill(pos));
      } else if (selectedBuilding === "CoalMine") {
        
      }
      if (toggleGameSounds) {
        gameSounds.volume = 0.1;
        gameSounds.play();
      }
    } else if (!isEmptyPos(pos)) {
      removeBuilding(pos);
    }
  }

  const placeBuilding = (pos, type) => {
    // take in the type of building. Create the building and place it on the map.
    if (!isEmptyPos(pos)) {
      
    } else if (allRss.money < type.cost) {
      setError(true);
      setErrorMessage("Not Enough Money!");
      // BuildError("Not Enough Money!");
      // throw new BuildError("Not Enough Money!");
    } else {
      let tempGrid = JSON.parse(JSON.stringify(grid));
      tempGrid[pos[0]][pos[1]] = type;
      setGrid(tempGrid);

      setAllBuildings((prevState) => ({
        ...prevState,
        [type.name]: [...(prevState[type.name] || []), type]
      }));
      
      setAllRss((prevState) => ({
        ...prevState,
        money: prevState.money - type.cost
        }));
      // here is where we need to save a sorted array of all the children by distance on the parent buildings. 
      if (type.parentNames) {
        let allParents = [];
        type.parentNames.forEach((parent) => {
          if (allBuildings[parent]) {
            allParents = allParents.concat(allBuildings[parent]);
          }
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
          if (allBuildings[child]) {
            allChildren = allChildren.concat(allBuildings[child]);
          }
        });
        allChildren.sort((a, b) => {
          return dist(a.nodepos, type.nodepos) - dist(b.nodepos, type.nodepos);
        });
        type.sortedChildren = allChildren;
      }
    }
  }

  const removeBuilding = (pos) => {
    if (isEmptyPos(pos)) {

      // throw new BuildError("Empty spot!");
    } else {
      let type = getBuilding(pos);
      let currentArr = allBuildings[type.name];
      // Here I need to access allRss and setAllRss to add the cost of the building back to the money.
      
      // console.log(this.allBuildings[type.name], "in remove building");
      let buildidx = currentArr.findIndex((ele) => {
        return (ele.nodepos[0] === type.nodepos[0] && ele.nodepos[1] === type.nodepos[1]);
      });
      // console.log(buildidx, "idx in remove building")

    currentArr = currentArr
      .slice(0, buildidx)
      .concat(currentArr.slice(buildidx + 1));
    
    // Here I need to create a deep duplicate of the grid.
    let tempGrid = grid.map((row) => {
      return row.map((ele) => {
        return ele;
      });
    });
    tempGrid[pos[0]][pos[1]] = null;

    setGrid(tempGrid)
    setAllBuildings((prevState) => ({
      ...prevState,
      [type.name]: currentArr
      }));
    setAllRss((prevState) => ({
      ...prevState,
      money: prevState.money + type.cost
    }));
    // this.state.grid[pos[0]][pos[1]] = null;
    // setAllBuildings({...allBuildings, [type.name]: allCurrBuildings[type.name]});

      if (type.parentNames) {
        let allParents = [];
        type.parentNames.forEach((parent) => {
          allParents = allParents.concat(currentArr);
        });
        allParents.forEach((parent) => {
          let childidx = parent.sortedChildren.findIndex((ele) => {
            return ele === type;
          });
          parent.sortedChildren = parent.sortedChildren
            .slice(0, childidx)
            .concat(parent.sortedChildren.slice(childidx + 1));
        });
      }
    }
  }

  const dist = (pos1, pos2) => {
    return Math.sqrt(((pos2[0] - pos1[0]) ** 2) + ((pos2[1] - pos1[1]) ** 2 ))
  }

  useEffect(() => {
    if (!buildDidRun) {
      buildingsSetup();
    }
  }, [])

  // useEffect(() => {
  //   console.log(grid, "grid in useEffect")
  //   console.log(allBuildings, "allBuildings in useEffect")
  // }, [grid, allBuildings])

  // updateRSS() {
  //   // console.log(this.allBuildings.length > 0)
  //   let tempAllRSS = {};
  //   // console.log(Object.values(this.allBuildings))
  //   let allBuildingsValues = Object.values(this.state.allBuildings);
  //   if (allBuildingsValues.flat().length > 0) {
  //     for (let i = 0; i < allBuildingsValues.flat().length; i++) {
  //       this.totalPower -= allBuildingsValues.flat()[i].powerCost //subtract power
  //       // console.log(allBuildingsValues.flat())
  //       let obRSS = Object.entries(
  //         allBuildingsValues.flat()[i].resources
  //       );
  //       // console.log(obRSS, "obRSS")
  //       if (obRSS)
  //         for (let k = 0; k < obRSS.length; k++) {
  //           if (!tempAllRSS[obRSS[k][0]]) tempAllRSS[obRSS[k][0]] = 0;
  //           tempAllRSS[obRSS[k][0]] += parseInt(obRSS[k][1]);
  //         }
  //     }
  //   }
  //   this.props.setAllRss(tempAllRSS);
  // }
  
  
  return (
    <>
      <ul>
        {Object.values(grid).map((row, rowIndex) => (
          <>
          {row.map((building, colIndex) => (
            <li onClick={(e) => handleClick(e)} data-value={[rowIndex, colIndex]} key={`${rowIndex}-${colIndex}`}>
              {building && <img data-value={building.nodepos} src={`${imgPaths[building.name]}`} /> }
            </li>
          ))}
          </>
        ))}
      </ul>
    </>
  )
  


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

module.exports = Map;


// module.exports = BuildError;
