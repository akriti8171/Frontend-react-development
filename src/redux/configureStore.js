import {createStore} from 'redux'
import {Reducer,intialstate} from './reducer'

export const ConfigureStore=()=>{
     const store=createStore(
         Reducer,
         intialstate
     ) 

     return store
}