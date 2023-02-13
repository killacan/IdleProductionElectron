  
  const buildingsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = {...state};
    if (action.type === 'UPDATE_BUILDINGS') {
    }
    console.log(newState, action, "buildingsReducer hit")
    switch (action.type) {
      case 'UPDATE_BUILDINGS':
        newState = {...newState, ...action.payload}
        return newState
      default:
        return state;
    }
  };
  
  export default buildingsReducer;