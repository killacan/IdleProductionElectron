import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
// import music from '../public/4Harris Heller-Not-Enough-Movement.wav'


function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-javascript)</title>
      </Head>
      <header className="nav">
        <nav className="main-nav">
            <div className="div-box" >
                <button className="music1 grow"><img src="src/assets/MusicNote2.png" /></button>
                <button className="music2 grow hidden"><img src="src/assets/MusicNote1.png" /></button>
                <button className="volume-up grow"><img src="src/assets/volumeUp.png" /></button>
                <button className="volume-down grow"><img src="src/assets/volumeDown.png" /></button>
                <button className="sound">GAME SOUNDS</button>
            </div>
            <div className="main-title">
                <h2>Idle Production</h2>
            </div>
            <ul className="logo-list">
                <a href="https://github.com/killacan" target="_blank" ><img className="logo grow" src="src/assets/GitHub-Mark-64px.png" /></a>
                <a href="https://www.linkedin.com/in/cameron-sands-a97183169/"  target="_blank"><img className="logo grow" src="src/assets/In-Blue-34@2x.png" /></a>
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
        <div className="tutorial-holder1 tut-hold">
            <div id="box-wrap">
                <div id="tutorial-text">
                    
                    <p>Hello and welcome to the Game! This is an Idle factory game. The Gameplay can seem pretty complicated so I will try to beak it down simply.</p>
                    
                
                </div>
                <input className="tut-button" type="button" value="Next" id="tut-button1"/>
                <input className="tut-button" type="button" value="Skip Tutorial" id="tut-button5" />

            </div>
        </div>

        <div className="tutorial-holder2 tut-hold hidden">
            <div id="box-wrap">
                <div id="tutorial-text">
                    <p>Over here we have all the buildings that you can build. Each one has a money cost and a power cost. click on the building to select it</p>
                </div>
                <input className="tut-button" type="button" value="Next" id="tut-button2"/>

            </div>
        </div>
        <div className="tutorial-holder3 tut-hold hidden">
            <div id="box-wrap">
                <div id="tutorial-text">
                    <p>Next click over here on the board to place the building. If you have power, the building will produce resources. I would recommend placing 1 windmill and 3 iron mines to get started.
                        Also Click a building again in the build area to sell the building for 100% refund.
                    </p>
                </div>
                <input className="tut-button" type="button" value="Next" id="tut-button3"/>

            </div>
        </div>
        <div className="tutorial-holder4 tut-hold hidden">
            <div id="box-wrap">
                <div id="tutorial-text">
                    <p>Hit the sell goods button to sell everything for more money. Thats it! Have Fun!</p>
                </div>
                <input className="tut-button" type="button" value="LETS GO" id="tut-button4"/>

            </div>
        </div>
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
