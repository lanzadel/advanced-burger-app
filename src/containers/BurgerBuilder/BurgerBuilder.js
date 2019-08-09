import React, {Component} from 'react';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import Auxliary from '../../hoc/Auxliary/Auxliary';
import Burger from './../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {

    state = {
        //ingredients: null,
        //totalPrice: 4,
        //purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }
    componentDidMount() {
        console.log(this.props)
        /*
        axios.get('https://advanced-react-app-78b59.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
            })
            .catch(error => {
                this.setState({error: true})
            });
        */
    }
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }
    updatePurchaseState (ingredients){
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }
    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }
    render() {
        console.log(this.props.ings)
        const disabledINfo = {
            //...this.state.ingredients
            ...this.props.ings
        };
        for(let key in disabledINfo) {
            disabledINfo[key] = disabledINfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be load</p> : <Spinner/>;

        //if(this.state.ingredients) {
        if(this.props.ings){
            burger = (
                <Auxliary>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientSubbed={this.props.onIngredientRemoved}
                        disabled={disabledINfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.price}
                    />
                </Auxliary>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                price={this.props.price}
            />;
        }
        if(this.state.loading) {
            orderSummary = <Spinner/>;
        }

        return (
            <div>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log('mapStateToProps')
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}
const mapDispatchToProps = dispatch => {
    console.log('mapDispatchToProps')
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));