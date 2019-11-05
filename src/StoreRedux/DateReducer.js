const DateReducer = (state = [], action) => {

    switch (action.type) {
        case 'ADD_DATE':
            return state.concat([action.d]);
        default:
            return state;
    }
}

export default DateReducer;