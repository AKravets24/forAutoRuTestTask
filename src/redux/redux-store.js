import { createStore, combineReducers,applyMiddleware } from "redux";
import thunkMiddleWare from 'redux-thunk';
import { bookFinderReducer, bookFinderACs} from './bookFinderReducer'

let rootReducer = combineReducers({ bookFinderReducer, bookFinderACs });

export let store = createStore(rootReducer, applyMiddleware(thunkMiddleWare))
