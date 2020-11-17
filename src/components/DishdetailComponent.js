import React,{Component} from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle,Modal,ModalBody,ModalHeader,
    BreadcrumbItem,Breadcrumb, Button,Col,Row,Label
  } from 'reactstrap';
import {Control,Errors,LocalForm} from 'react-redux-form'
import {Link} from 'react-router-dom'
    
const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;

class SubmitComment extends Component {
        
        state = {
            isModalOpen: false
        }

        toggleModal() {
            this.setState({
            isModalOpen: !this.state.isModalOpen
            });
        }

        handleSubmit(values) {
            this.toggleModal();
            alert("Current state is:" + JSON.stringify(values))
        }

        render() {
            return (
            <div>
                <Button outline onClick={this.toggleModal.bind(this)}>
                <span className="fa fa-pencil" /> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal.bind(this)}>
                <ModalHeader toggle={this.toggleModal.bind(this)}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="rating" md={12}>Rating</Label>
                            <Col md={12}>
                                <Control.select model=".rating" name="rating" className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="author" md={12}>Your Name</Label>
                            <Col md={12}>
                                <Control.text model=".author" id="author" name="author" placeholder="Author Name"
                                    className="form-control"
                                    validators={{required,minLength: minLength(3),maxLength: maxLength(15)
                                    }}
                                />
                                <Errors className="text-danger" model=".author" show="touched"
                                    messages={{
                                    required: "Required",
                                    minLength: "Must be greater than 2 characters",
                                    maxLength: "Must be 15 characters or less"
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="comment" md={12}>Comment</Label>
                            <Col md={12}>
                                <Control.textarea model=".comment" id="comment" name="comment" rows={6} 
                                className="form-control" />
                            </Col>
                        </Row>
                        <Button type="submit" value="submit" color="primary">Submit</Button>
                    </LocalForm>
                </ModalBody>
                </Modal>
            </div>
            );
        }
    }

    function RenderDish({dish}) {
        if (dish === null) {
            return (
                <div></div>
            );
        }

        return (
            <div>
                <Card>
                    <CardImg top width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

    function RenderComments({comments}) {
        if (comments!=null){
            const dishes=comments.map(ct=>{
                return(
                <ul key={ct.id} className="list-unstyled">
                    <li>{ct.comment}</li>
                    <li className="mt-3 mb-3">-- {ct.author} , {new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(ct.date)))}</li>
                </ul>
                )
        })
        return(
            <div>
                <h4>Comments</h4>
                {dishes}
                <SubmitComment />
            </div>
        )
    }
    else{
        return <div></div>
        }
       
    }

    function DishdetailComponent(props) {
        
        if (props.dish === undefined) {
            return (
                <div></div>
            );
        }
        console.log(props)
        return (
            
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />                        
                    </div>
                </div>
            </div>
        );
    }


export default DishdetailComponent;