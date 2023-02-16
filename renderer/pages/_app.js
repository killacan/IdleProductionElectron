import '../components/main.scss'
import '../components/_grid.scss'
import '../components/_main_nav.scss'
import '../components/_resource_bar.scss'
import '../components/_welcome_message.scss'
import '../components/reset.scss'
// import { Provider } from 'react-redux'
import { createContext, useState } from 'react'

const AppContext = createContext(null)

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {

  const [allRss, setAllRss]= useState( {
    ironOre: 0,
    ironIngots: 0,
    steelIngots: 0,
    copperOre: 0,
    copperIngots: 0,
    copperWire: 0,
    tools: 0,
    power: 0,
    money: 800,
  })

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
  })

  const [selectedBuilding, setSelectedBuilding] = useState("")


  return (
    <AppContext value={{ allRss, setAllRss, allBuildings, setAllBuildings, selectedBuilding, setSelectedBuilding}}>
      <Component {...pageProps} />
    </AppContext>
  ) 
}
