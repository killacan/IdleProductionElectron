import React, { useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, createContext } from 'react';
import Map from '/components/map.js';
import BuildMenu from '/components/buildMenu.js';
import HoverMenu from '/components/hoverMenu.js';
import BuildingInfoPanel from '/components/buildingInfoPanel.js';
import { Connect, useSelector, useDispatch } from 'react-redux';
import { CONFIG_FILES } from 'next/dist/shared/lib/constants';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';



function Home() {

    const [musicToggle, setMusicToggle] = useState(true);
    const [backgroundMusic, setBackgroundMusic] = useState(null);
    const [volume, setVolume] = useState(0.3);
    const [soundsToggle, setSoundsToggle] = useState(false);
    const [allRss, setAllRss] = useState({
        ironOre: 0,
        ironIngots: 0,
        steelIngots: 0,
        copperOre: 0,
        copperIngots: 0,
        copperWire: 0,
        tools: 0,
        power: 0,
        money: 800,
    });
    const [allBuildings, setAllBuildings] = useState({
        "windMill": [],
        "ironMine": [],
        "ironSmelter": [],
        "steelSmelter": [],
        "copperMine": [],
        "copperSmelter": [],
        "copperExtruder": [],
        "toolFactory": [],
        "market": [],
    });
    const [backgroundMusicToggle, setBackgroundMusicToggle] = useState(false);
    const [tutorial, setTutorial] = useState(1);
    const [selectedBuilding, setSelectedBuilding] = useState(null);
    const [isHovering, setIsHovering] = useState(false);
    const [hoverInfo, setHoverInfo] = useState(null);

    // I think that game logic should go here, which updates the state of the game and visuals on the screen. 

    let possibleBuildings = [
        "WindMill",
        "IronMine",
        "IronSmelter",
        "SteelMill",
        "CopperMine",
        "CopperSmelter",
        "CopperExtruder",
        "ToolFactory",
        "Market"
    ];
    
    let imgPaths = {
        WindMill: "/images/WindMill1.png",
        IronMine: "/images/ironMine3.png",
        IronSmelter: "/images/ironIngot2.png",
        SteelMill: "/images/Smelter2.png",
        CopperMine: "/images/CopperIHardlyKnowHer.png",
        CopperSmelter: "/images/CopperIngot.png",
        CopperExtruder: "/images/CopperWireIHardlyKnonwHer.png",
        ToolFactory: "/images/Wrench.png",
        Market: "/images/Market1.png",
    };

    const handleVolume = (e) => {
        e.preventDefault();
        if (e.target.getAttribute("data-value") === "0.1" && volume <= 0.9) {
            setVolume(volume + 0.1);
            backgroundMusic.volume = volume;
        } else if (e.target.getAttribute("data-value") === "-0.1" && volume >= 0.1) {
            setVolume(volume - 0.1);
            backgroundMusic.volume = volume;
        }
    }

    const handleMusic = () => {
        if (!backgroundMusicToggle) {
            console.log("new audio")
            backgroundMusic.volume = volume;
            backgroundMusic.loop = true;
        }
        setMusicToggle(!musicToggle);
        if (musicToggle) {
            backgroundMusic.play();
        } else {
            backgroundMusic.pause();
        }
        setBackgroundMusicToggle(true);
    }

    const dist = (pos1, pos2) => {
        return Math.sqrt(((pos2[0] - pos1[0]) ** 2) + ((pos2[1] - pos1[1]) ** 2 ))
    }

    const updateRSS = () => {
        let tempAllRSS = {
            ironOre: 0,
            ironIngots: 0,
            steelIngots: 0,
            copperOre: 0,
            copperIngots: 0,
            copperWire: 0,
            tools: 0,
            power: 0,
        };

        tempAllRSS.money = allRss.money;
        let bldgs = Object.values(allBuildings).flat();
        let totalPower = 0;
        bldgs.forEach(bldg => {
            totalPower -= bldg.powerCost;
        })
        tempAllRSS.power = totalPower;
        if (tempAllRSS.power > 0) {
            bldgs.forEach(bldg => {
                if (bldg.updateRSS) {
                    bldg.updateRSS();
                }
            })
        }
    
        if (bldgs.length > 0) {
          for (let i = 0; i < bldgs.length; i++) {
            let obRSS = Object.entries(
              bldgs[i].resources
            );
            if (obRSS)
            console.log(obRSS, allBuildings, "obRSS")
                for (let k = 0; k < obRSS.length; k++) {
                    if (!tempAllRSS[obRSS[k][0]]) tempAllRSS[obRSS[k][0]] = 0;
                    tempAllRSS[obRSS[k][0]] += parseInt(obRSS[k][1]);
                }
            }
        }
        
        setAllRss(tempAllRSS);

    }

    const transferToChildren = () => {
        let bldgArr = Object.values(allBuildings).flat();
        bldgArr.forEach((building) => {
        let bldChild = building.sortedChildren;
        for (let i = 0; i < bldChild.length; i++) {
            let currChild = bldChild[i];
            let requestTotal = Object.entries(currChild.requestTotal);
            requestTotal.forEach((req) => {
            let requestRSS = req[0];
            if (!currChild.resources[requestRSS]) {
                currChild.resources[requestRSS] = 0;
            }
            let requestAmount = req[1] - currChild.resources[requestRSS];
            
            if (!building.resources[requestRSS]) {
            } else if (building.resources[requestRSS] < requestAmount) {
                currChild.resources[requestRSS] += building.resources[requestRSS];
                building.resources[requestRSS] = 0;
                // this.map.makeDot(toGrid(building.nodepos), toGrid(currChild.nodepos));
            } else if (building.resources[requestRSS] > requestAmount) {
                currChild.resources[requestRSS] += requestAmount;
                building.resources[requestRSS] -= requestAmount;
                // this.map.makeDot(toGrid(building.nodepos), toGrid(currChild.nodepos));
            }
            });
        }
        });
    }

    const transferToMarket = () => {
        let money = allRss.money;
        Object.values(allBuildings)
            .flat()
            .forEach((building) => {
            let rssArr = Object.entries(building.resources);
            let marketfactor = 1;
            if (allBuildings["Market"]) {
                marketfactor += allBuildings["Market"].length / 5;
            }
            rssArr.forEach((sub) => {
                if (sub[0] === "ironOre") {
                building.resources["ironOre"] = 0;
                money += Math.floor((sub[1] * 1.1 ) * marketfactor);
                } 
                if (sub[0] === "ironIngots") {
                building.resources["ironIngots"] = 0;
                money += Math.floor(sub[1] * 7 * marketfactor);
                } 
                if (sub[0] === "steelIngots") {
                building.resources["steelIngots"] = 0;
                money += Math.floor(sub[1] * 85 * marketfactor);
                } 
                if (sub[0] === "copperOre") {
                building.resources["copperOre"] = 0;
                money += Math.floor(sub[1] * 9 * marketfactor);
                } 
                if (sub[0] === "copperIngots") {
                building.resources["copperIngots"] = 0;
                money += Math.floor(sub[1] * 90 * marketfactor);
                } 
                if (sub[0] === "copperWire") {
                building.resources["copperWire"] = 0;
                money += Math.floor(sub[1] * 200 * marketfactor);
                } 
                if (sub[0] === "tools") {
                building.resources["tools"] = 0;
                money += Math.floor(sub[1] * 450 * marketfactor);
                }
            });
        });

        setAllRss((prevState) => ({
            ...prevState,
            money: money
        }));
    }


    useEffect(() => {


        // setup the game
        // setup the canvas
        // setup the game loop

        let gameLoop = setInterval(() => {
            // I am going to have to update RSS in this function
            updateRSS();
            transferToChildren();
            // console.log(tempState, "tempState")
            // console.log(allBuildings, "allBuildings")
        }, 1000);

        return () => {
            clearInterval(gameLoop);
            // console.log("Hit the Clear")
        }

    }, [allRss, allBuildings]);

    useEffect(() => {
        setBackgroundMusic(new Audio("/4Harris Heller-Not-Enough-Movement.wav"))
    }, [])

  return (
    <React.Fragment>
      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* <script src="dist/bundle.js"></script>
        <script src="https://kit.fontawesome.com/2687a23fd5.js" crossorigin="anonymous"></script> */}
      </Head>
      <header className="nav">
        <nav className="main-nav">
            <div className="div-box" >
                { musicToggle && <button onClick={() => handleMusic()} className="music1 grow"><img src="/images/MusicNote2.png" /></button>}
                { !musicToggle && <button onClick={() => handleMusic()} className="music2 grow"><img src="/images/MusicNote1.png" /></button>}
                <button onClick={(e) => handleVolume(e)} className="volume-up grow" data-value={0.1}><img data-value={0.1} src="images/volumeUp.png" /></button>
                <button onClick={(e) => handleVolume(e)} className="volume-down grow" data-value={-0.1}><img data-value={-0.1} src="images/volumeDown.png" /></button>
                <button onClick={() => setSoundsToggle(!soundsToggle)} className="sound">GAME SOUNDS</button>
            </div>
            <div className="main-title">
                <h2>Idle Production</h2>
            </div>
            <ul className="logo-list">
                <a href="https://github.com/killacan" target="_blank" ><img className="logo grow" src="images/GitHub-Mark-64px.png" /></a>
                <a href="https://www.linkedin.com/in/cameron-sands-a97183169/"  target="_blank"><img className="logo grow" src="images/In-Blue-34@2x.png" /></a>
            </ul>

        </nav>

        <div id="error-container">

        </div>

        <nav className="resources-bar">
            <div className="rss-left">
                <ul>
                    <li><button onClick={transferToMarket} className="sell">Sell Goods</button></li>
                    <li>Money: <span id="total-money">{allRss.money}</span></li>
                    <li>Iron Ore: <span id="total-iron-ore">{allRss.ironOre}</span></li>
                    <li>Iron Ingots: <span id="total-iron-ingots">{allRss.ironIngots}</span></li>
                    <li>Steel Ingots: <span id="total-steel-ingots">{allRss.steelIngots}</span></li>
                </ul>
            </div>
    
            <div className="rss-right">
                <ul>
                    <li>Copper Ore: <span id="total-copper-ore">{allRss.copperOre}</span></li>
                    <li>Copper Ingots: <span id="total-copper-ingots">{allRss.copperIngots}</span></li>
                    <li>Copper Wire: <span id="total-copper-wire">{allRss.copperWire}</span></li>
                    <li>Tools: <span id="total-tools">{allRss.tools}</span></li>
                    <li>Power: <span id="total-power">{allRss.power}</span></li>
                    
                </ul>
            </div>
        </nav>

    </header>

    <div className="container">
        {tutorial === 1 && <div className="tutorial-holder1 tut-hold">
            <div id="box-wrap">
                <div id="tutorial-text">
                    
                    <p>Hello and welcome to the Game! This is an Idle factory game. The Gameplay can seem pretty complicated so I will try to beak it down simply.</p>
                    
                
                </div>
                <input onClick={() => setTutorial(2)} className="tut-button" type="button" value="Next" id="tut-button1"/>
                <input  onClick={() => setTutorial(5)} className="tut-button" type="button" value="Skip Tutorial" id="tut-button5" />

            </div>
        </div>}

        {tutorial === 2 && <div className="tutorial-holder2 tut-hold">
            <div id="box-wrap">
                <div id="tutorial-text">
                    <p>Over here we have all the buildings that you can build. Each one has a money cost and a power cost. click on the building to select it</p>
                </div>
                <input onClick={() => setTutorial(3)} className="tut-button" type="button" value="Next" id="tut-button2"/>

            </div>
        </div>}
        {tutorial === 3 && <div className="tutorial-holder3 tut-hold">
            <div id="box-wrap">
                <div id="tutorial-text">
                    <p>Next click over here on the board to place the building. If you have power, the building will produce resources. I would recommend placing 1 windmill and 3 iron mines to get started.
                        Also Click a building again in the build area to sell the building for 100% refund.
                    </p>
                </div>
                <input onClick={() => setTutorial(4)} className="tut-button" type="button" value="Next" id="tut-button3"/>

            </div>
        </div>}
        {tutorial === 4 && <div className="tutorial-holder4 tut-hold">
            <div id="box-wrap">
                <div id="tutorial-text">
                    <p>Hit the sell goods button to sell everything for more money. Thats it! Have Fun!</p>
                </div>
                <input onClick={() => setTutorial(5)} className="tut-button" type="button" value="LETS GO" id="tut-button4"/>

            </div>
        </div>}
        <div className="builder-menu">
            <h3>Build Menu</h3>
            <canvas id="builder-canvas" width="180px" height="675px"></canvas>
            <BuildMenu possibleBuildings={possibleBuildings} imgPaths={imgPaths} setSelectedBuilding={setSelectedBuilding} selectedBuilding={selectedBuilding} />
            <HoverMenu isHovering={isHovering} hoverInfo={hoverInfo} selectedBuilding={selectedBuilding} />
            <div id="tooltip">
                <p id="tooltip-text"></p>
                <p id="tooltip-text2"></p>
                <p id="tooltip-text3"></p>
                <p id="tooltip-text4"></p>
            </div>
        </div>
        <div className="grid-container" width="620px"height="675px">
            
            <canvas id="game-canvas" width="620px" height="675px">

            </canvas>
            <div className="build-area-title">
                <h3>Build Area</h3>
            </div>
            <div className="grid">
                <Map possibleBuildings={possibleBuildings} selectedBuilding={selectedBuilding} imgPaths={imgPaths} allRss={allRss} setAllRss={setAllRss} allBuildings={allBuildings} setAllBuildings={setAllBuildings} />

            </div>

                <canvas id="circle-canvas" width="620px" height="620px"></canvas>

        </div>
        <BuildingInfoPanel selectedBuilding={selectedBuilding} />
    </div>

    

    <div>
        <ul>
        </ul>
    </div>
    </React.Fragment>
  );
};

export default Home;
