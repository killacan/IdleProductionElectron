import { combineReducers, createStore } from 'redux';
import allBuildings from './buildingsReducer';
import allRss from './resourcesReducer';

const rootReducer = combineReducers({
    allBuildings,
    allRss
});

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState);
}

export default configureStore;