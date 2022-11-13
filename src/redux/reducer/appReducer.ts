import { INCREAMENT, DECREAMENT, CHANGE_APP_MODE, SAVE_APP_TOKEN } from './../actions/actionTypes';

const initData = {
    darkMode: false,
    token: "",
}

const appReducer = (state = initData, { type, payload }: any) => {
    switch (type) {
        case CHANGE_APP_MODE:
            return {
                ...state,
                darkMode: payload
            }
        case SAVE_APP_TOKEN:
            return {
                ...state,
                token: payload
            }
        default:
            return state
    }
}
export default appReducer