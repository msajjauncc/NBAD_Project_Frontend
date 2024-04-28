import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";
import reducers from "./reducers";
import saga from "./sagas";


let sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(saga);

export default store;