// video 1 from chapter 3
import React from 'react';
import ReactDOM from 'react-dom';
//console.log(data);
import App from './components/App';

    ReactDOM.render(
        <App initialData={window.initialData} />,
        document.getElementById('root')
    );