import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';


function Home() {

    let [musicToggle, setMusicToggle] = useState(true);
    let [volume, setVolume] = useState(0.3);
    let [soundsToggle, setSoundsToggle] = useState(false);
    let [allRss, setAllRss] = useState({
        ironOre: 0,
        ironIngots: 0,
        steelIngots: 0,
        copperOre: 0,
        copperIngots: 0,
        copperWire: 0,
        tools: 0,
        power: 0,
    });
    let [allBuildings, setAllBuildings] = useState({});
    let [gameMoney, setGameMoney] = useState(800);
    let [backgroundMusic, setBackgroundMusic] = useState();
    let [tutorial, setTutorial] = useState(1);



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
        backgroundMusic.loop = true;
        setMusicToggle(!musicToggle);
        if (musicToggle) {
            backgroundMusic.play();
        } else {
            backgroundMusic.pause();
        }
    }


    const dist = (pos1, pos2) => {
        return Math.sqrt(((pos2[0] - pos1[0]) ** 2) + ((pos2[1] - pos1[1]) ** 2 ))
    }

    const updateRSS = () => {
        allRss = {};
    
        if (Object.values(allBuildings).flat().length > 0) {
          for (let i = 0; i < Object.values(allBuildings).flat().length; i++) {
            allRss.power -= Object.values(allBuildings).flat()[i].powerCost //subtract power
            let obRSS = Object.entries(
              Object.values(allBuildings).flat()[i].resources
            );
            if (obRSS)
              for (let k = 0; k < obRSS.length; k++) {
                if (!allRSS[obRSS[k][0]]) allRSS[obRSS[k][0]] = 0;
                allRSS[obRSS[k][0]] += parseInt(obRSS[k][1]);
              }
          }
        }
    }

    useEffect(() => {
        setBackgroundMusic(new Audio("/4Harris Heller-Not-Enough-Movement.wav"), ()=> {
            backgroundMusic.volume = volume;
         });


        
        // setup the game
        // setup the canvas
        // setup the game loop

    }, []);


  return (
    <React.Fragment>
      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="dist/bundle.js"></script>
        <link rel="manifest" href="images/site.webmanifest" />
        <script src="https://kit.fontawesome.com/2687a23fd5.js" crossorigin="anonymous"></script>
        <title>Idle Production</title>
      </Head>
      <header className="nav">
        <nav className="main-nav">
            <div className="div-box" >
                { musicToggle && <button onClick={() => handleMusic()} className="music1 grow"><img src="/images/MusicNote2.png" /></button>}
                { !musicToggle && <button onClick={() => handleMusic()} className="music2 grow"><img src="/images/MusicNote1.png" /></button>}
                <button onClick={e => handleVolume(e)} className="volume-up grow" data-value={0.1}><img data-value={0.1} src="images/volumeUp.png" /></button>
                <button onClick={e => handleVolume(e)} className="volume-down grow" data-value={-0.1}><img data-value={-0.1} src="images/volumeDown.png" /></button>
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
                    <li><button className="sell">Sell Goods</button></li>
                    <li>Money: <span id="total-money">0</span></li>
                    <li>Iron Ore: <span id="total-iron-ore">0</span></li>
                    <li>Iron Ingots: <span id="total-iron-ingots">0</span></li>
                    <li>Steel Ingots: <span id="total-steel-ingots">0</span></li>
                </ul>
            </div>
    
            <div className="rss-right">
                <ul>
                    <li>Copper Ore: <span id="total-copper-ore">0</span></li>
                    <li>Copper Ingots: <span id="total-copper-ingots">0</span></li>
                    <li>Copper Wire: <span id="total-copper-wire">0</span></li>
                    <li>Tools: <span id="total-tools">0</span></li>
                    <li>Power: <span id="total-power">0</span></li>
                    
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
                

            </div>

                <canvas id="circle-canvas" width="620px" height="620px"></canvas>

        </div>
            <div className="info-panel">
                <h3 id="selected-building">Selected Building</h3>
                <canvas id="info-canvas" width="180px" height="675px"></canvas>
                <div className="description-holder"><p id="description"></p></div>
                <div className="cost-holder"><p>Build Cost:</p><span id="build-cost"></span></div>
                <div className="power-cost-holder"><p>Power Cost:</p><span id="power-cost"></span></div>
            </div>
    </div>

    

    <div>
        <ul>
        </ul>
    </div>
    </React.Fragment>
  );
};

export default Home;
