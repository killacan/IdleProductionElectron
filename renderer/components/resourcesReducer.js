const initialState = {
    ironOre: 0,
    ironIngots: 0,
    steelIngots: 0,
    copperOre: 0,
    copperIngots: 0,
    copperWire: 0,
    tools: 0,
    power: 0,
    money: 800,
};
  
  const resourcesReducer = (state = initialState, action) => {
    Object.freeze(state);
    let newState = {...state};
    console.log("resourcesReducer hit")
    switch (action.type) {
      case 'UPDATE_RESOURCES':
          newState.AllResources = action.payload
        return newState 
      default:
        return state;
    }
  };
  
  export default resourcesReducer;