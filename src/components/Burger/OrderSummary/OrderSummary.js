import React, {Component} from 'react';

import Auxiliary from '../../../hoc/Auxliary';
import  Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    componentWillUpdate() {

    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={{textTransform:'capitalize'}}>{igKey}</span>:
                        {this.props.ingredients[igKey]}
                    </li>
                );
            })
        return (
            <Auxiliary>
                <h3>Your Order:</h3>
                <p>A delicious ...</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p> <strong>Total Price: </strong>{this.props.price.toFixed(2)}</p>
                <p>Continue to checkout ?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Auxiliary>
        )
    }
}

export default OrderSummary;