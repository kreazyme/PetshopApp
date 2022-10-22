import { INCREAMENT, DECREAMENT, CHANGE_APP_MODE } from './../actions/actionTypes';

const initData = {
    darkMode: false,
}

const appReducer = (state = initData, { type, payload }: any) => {
    switch (type) {
        case CHANGE_APP_MODE:
            return {
                ...state,
                CHANGE_APP_MODE: payload
            }
        default:
            return state
    }
}
export default appReducer