import React, { Component } from 'react'
import Menu from './MenuComponent'
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import {Redirect,Route,Switch,withRouter} from 'react-router-dom'
import HomeComponent from './HomeComponent';
import ContactComponent from './ContactComponent';
import DishdetailComponent from './DishdetailComponent'
import AboutComponent from './AboutComponent'
import {connect} from 'react-redux'

const mapStateToProps= state=>{
    return {
        dishes: state.dishes,
        comments: state.comments,
        leaders: state.leaders,
        promotion: state.promotion
    }
}

class MainComponent extends Component {

   
    onDishSelect(dishID){
        this.setState({
            selectedDish:dishID
        })
    }
    render() {

        const Homepage=()=>{
            return(
                <HomeComponent dish={this.props.dishes.filter((dish)=>dish.featured)[0]} 
                promotion={this.props.promotion.filter((promo)=>promo.featured)[0]} 
                leader={this.props.leaders.filter(lead=>lead.featured)[0]} />
            )
        }

        const DishWithId=({match})=>{
            
            return(
                <DishdetailComponent dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
                  comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
            );
        }
        return (
            <div>
                <HeaderComponent />               
                    <Switch>
                        <Route path="/home" component={Homepage} />
                        <Route exact path="/menu" component={()=> <Menu dishes={this.props.dishes} />} />
                        <Route path="/menu/:dishId" component={DishWithId} />
                        <Route exact path="/contactus" component={ContactComponent} />
                        <Route exact path="/aboutus" component={()=><AboutComponent leaders={this.props.leaders} />} />
                        <Redirect to="/home" />
                    </Switch>
                <FooterComponent />
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps)(MainComponent))
