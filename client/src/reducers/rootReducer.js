import {combineReducers} from 'redux';
import attractionReducer from './attractionReducer';
import hotelReducer from './hotelReducer';
import restReducer from './restReducer';
import tripsReducer from './tripsReducer';

const rootReducer = combineReducers({
    attractions: attractionReducer,
    hotels: hotelReducer,
    restaurants: restReducer,
    trips: tripsReducer,
});

export default rootReducer;