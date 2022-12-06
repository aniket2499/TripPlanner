const initialState = [{
    location_id: null,
    name: null,
    imageUrl: null,
    rating: null,
    latitude: null,
    longitude: null,
}]

let copyState = null;

const hotelReducer = (state = initialState, action) =>{
    const {type, payload} = action;

    switch(type){
        case 'ADD_HOTEL':
            return [...state, {location_id:payload.location_id, name: payload.name, imageUrl: payload.imageUrl, rating: payload.rating, latitude: payload.latitude, longitude: payload.longitude}];
        
        case 'DELETE_HOTEL':
            copyState = [...state];
            copyState = copyState.filter((x)=> x.location_id!==payload.location_id);
            return [...copyState];

        default: return state;
    }
}

export default hotelReducer;