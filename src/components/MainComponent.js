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
import { postComment, fetchDishes, fetchComments, fetchPromos,fetchLeaders,postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const mapStateToProps= state=>{
    return {
        dishes: state.dishes,
        comments: state.comments,
        leaders: state.leaders,
        promotions: state.promotions
    }
}
const mapDispatchToProps = dispatch => ({
  
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => { dispatch(fetchDishes())},
    resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
    postFeedback: (feedback)=>dispatch(postFeedback(feedback))
  });
class MainComponent extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }

    render() {

        const Homepage = () => {
            return(
                <HomeComponent 
                    dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishErrMess={this.props.dishes.errMess}
                    promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                    promoLoading={this.props.promotions.isLoading}
                    promoErrMess={this.props.promotions.errMess}
                    leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                    leaderLoading={this.props.leaders.isLoading}
                    leaderErrMess={this.props.leaders.errMess}
                />
            );
          }

          const DishWithId = ({match}) => {
            return(
                <DishdetailComponent dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                isLoading={this.props.dishes.isLoading}
                errMess={this.props.dishes.errMess}
                comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                commentsErrMess={this.props.comments.errMess}
                postComment={this.props.postComment}
                />
            );
          };
        return (
            <div>
                <HeaderComponent />
                    <TransitionGroup>
                        <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                            <Switch>
                                <Route path="/home" component={Homepage} />
                                <Route exact path="/menu" component={()=> <Menu dishes={this.props.dishes} />} />
                                <Route path="/menu/:dishId" component={DishWithId} />
                                <Route exact path="/contactus" component={() => <ContactComponent resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
                                <Route exact path="/aboutus" component={()=><AboutComponent leaders={this.props.leaders.leaders} />} />
                                <Redirect to="/home" />
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>               
                <FooterComponent />
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));
