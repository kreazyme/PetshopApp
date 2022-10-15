import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga";
import rootReducer from "../reducer";
import rootSaga from "../sagas/rootSaga";

const SagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(SagaMiddleware));
SagaMiddleware.run(rootSaga);
export default {
    store
}
