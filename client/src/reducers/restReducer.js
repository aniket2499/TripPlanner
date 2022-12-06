const initialState = [{
    location_id: null,
    name: null,
    latitude: null,
    longitude: null,
    rating: null,
    web_url: null,
    address: null,
    price_level: null,
    image: null,
}]

let copyState = null;

const restReducer = (state = initialState, action) =>{
    const {type, payload} = action;

    switch(type){
        case 'ADD_RESTAURANT':
            console.log("add rest action")
            return [...state, {location_id:payload.location_id, name: payload.name, rating: payload.rating, web_url: payload.web_url, address: payload.address, price_level: payload.price_level, latitude: payload.latitude, longitude: payload.longitude, image: payload.image}];
        
        case 'DELETE_RESTAURANT':
            copyState = [...state];
            copyState = copyState.filter((x)=> x.location_id!==payload.location_id);
            return [...copyState];

        default: return state;
    }
}

export default restReducer;