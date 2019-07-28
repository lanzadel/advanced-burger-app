import React from 'react';
import Auxliary from "../../hoc/Auxliary";

const layout = (props) => (
    <Auxliary>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main>
            { props.children }
        </main>
    </Auxliary>
)


export default layout;