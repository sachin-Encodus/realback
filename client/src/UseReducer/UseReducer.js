export const initialState = null;

export const reducer = (state, action) => {
  if (action.type === "AuthUser") {
    return action.payload;
  }
  return state;
};
