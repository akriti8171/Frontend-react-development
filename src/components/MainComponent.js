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
import { addComment, fetchDishes } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
const mapStateToProps= state=>{
    return {
        dishes: state.dishes,
        comments: state.comments,
        leaders: state.leaders,
        promotions: state.promotions
    }
}
const mapDispatchToProps = dispatch => ({
  
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => { dispatch(fetchDishes())},
    resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}
  
  });
class MainComponent extends Component {

    componentDidMount() {
        this.props.fetchDishes();
    }

    onDishSelect(dishID){
        this.setState({
            selectedDish:dishID
        })
    }
    render() {

        const Homepage = () => {
            return(
                <HomeComponent 
                dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                dishesLoading={this.props.dishes.isLoading}
                dishesErrMess={this.props.dishes.errMess}
                promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                />
            );
          }

          const DishWithId = ({match}) => {
            return(
                <DishdetailComponent dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                  isLoading={this.props.dishes.isLoading}
                  errMess={this.props.dishes.errMess}
                  comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                  addComment={this.props.addComment}
                />
            );
          };
        return (
            <div>
                <HeaderComponent />               
                    <Switch>
                        <Route path="/home" component={Homepage} />
                        <Route exact path="/menu" component={()=> <Menu dishes={this.props.dishes} />} />
                        <Route path="/menu/:dishId" component={DishWithId} />
                        <Route exact path="/contactus" component={() => <ContactComponent resetFeedbackForm={this.props.resetFeedbackForm} />} />
                        <Route exact path="/aboutus" component={()=><AboutComponent leaders={this.props.leaders} />} />
                        <Redirect to="/home" />
                    </Switch>
                <FooterComponent />
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));
