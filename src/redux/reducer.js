import { DISHES } from '../shared/dishes'
import { COMMENTS} from '../shared/comments'
import {LEADERS} from '../shared/leaders'
import {PROMOTIONS} from '../shared/promotions'

export const intialstate={
    dishes:DISHES,
    comments: COMMENTS,
    leaders:LEADERS,
    promotion:PROMOTIONS
}

export const Reducer=( state=intialstate,action)=>{
    return state
}