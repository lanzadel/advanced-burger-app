import React, {Component} from 'react';

import Auxliary from '../../hoc/Auxliary';

class BurgerBuilder extends Component {
    render() {
        return (
            <Auxliary>
                <div>Burger</div>
                <div>Build Controls</div>
            </Auxliary>
        );
    }
}

export default BurgerBuilder;