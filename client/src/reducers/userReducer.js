const initialState = [
  {
    id: null,
  },
];

let copyState = null;

const userReducer = (state = initialState, action) => {
  console.log("state" + state);

  const { type, payload } = action;

  switch (type) {
    case "INITIALIZE_USER":
      return [
        {
          id: payload.id,
        },
      ];

    case "ADD_USER":
      console.log(payload.id);
      return [(state[0].id = payload.id)];

    case "GET_USER":
      return [...state];

    case "DELETE_USER":
      state[0].id = null;
      // copyState = copyState.filter((x) => x.id !== payload.id);
      return [...state];

    default:
      return state;
  }
};

export default userReducer;
