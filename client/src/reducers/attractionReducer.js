const initialState = [{
    location_id: null,
    name: null,
    latitude: null,
    longitude: null,
    rating: null,
    web_url: null,
    address: null,
    image: null,
}]

let copyState = null;

const attractionReducer = (state = initialState, action) =>{
    const {type, payload} = action;

    switch(type){
        case 'ADD_ATTRACTION':
            return [...state, {location_id:payload.location_id, name: payload.name, rating: payload.rating, web_url: payload.web_url, address: payload.address, image: payload.image, latitude: payload.latitude, longitude: payload.longitude}];
        
        case 'DELETE_ATTRACTION':
            copyState = [...state];
            copyState = copyState.filter((x)=> x.location_id!==payload.location_id);
            return [...copyState];

        default: return state;
    }
}

export default attractionReducer;