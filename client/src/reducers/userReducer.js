const initialState = [
  {
    id: null,
  },
];

let copyState = null;

const tripsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_USER":
      return [
        ...state,
        {
          id: payload.id,
        },
      ];

    case "GET_USER":
      return [...state];

    case "DELETE_USER":
      copyState = [...state];
      copyState = copyState.filter((x) => x.id !== payload.id);
      return [...copyState];

    default:
      return state;
  }
};
