namespace documentation {

  const initialState = {
    value: 0
  }

  function reducer(state = initialState, action) {
    switch (action.type) {
      default:
        return state;
    }
  }

  export const store = Redux.createStore(reducer);

}
