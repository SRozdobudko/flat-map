import React from 'react';
import ReactDOM from 'react-dom';
import RootDev from './Root.dev';
import RootProd from './Root.prod';


const Root = process.env.NODE_ENV === 'production' ? RootProd : RootDev;
ReactDOM.render(<Root />, document.getElementById('app'));

