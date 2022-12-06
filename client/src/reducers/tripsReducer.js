const initialState = [{
    name: null,
    users: [],
    cur_location: null,
    destination: null,
    destination_lat: null,
    destination_long: null,
    start_date: null,
    end_date: null,
}]

let copyState = null;

const tripsReducer = (state = initialState, action) =>{
    const {type, payload} = action;

    switch(type){
        case 'ADD_TRIP':
            state.users.push(payload.userId);
            return [...state, {name: payload.name, users: state.users, cur_location: payload.cur_location, destination: payload.destination, start_date: payload.start_date, end_date: payload.end_date, destination_lat: payload.destination_lat, destination_long: payload.destination_long}];
        
        case 'DELETE_TRIP':
            copyState = [...state];
            copyState = copyState.filter((x)=> x.name!==payload.name);
            return [...copyState];

        default: return state;
    }
}

export default tripsReducer;