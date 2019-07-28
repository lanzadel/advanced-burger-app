import React from 'react';
import Auxliary from "../../hoc/Auxliary";
import classes from './Layout.css';

const layout = (props) => (
    <Auxliary>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>
            { props.children }
        </main>
    </Auxliary>
)


export default layout;