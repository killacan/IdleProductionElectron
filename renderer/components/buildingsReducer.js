const initialState = {

  };
  
  const buildingsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_BUILDINGS':
        return {
          ...state,
          allBuildings: action.payload
        };
      default:
        return state;
    }
  };
  
  export default buildingsReducer;