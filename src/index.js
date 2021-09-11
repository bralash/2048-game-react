import React from 'react'
import ReactDom from 'react-dom'
import BoardView from './components/BoardView';
import './main.scss'
import './styles.scss'

const App = () => {
    return <BoardView />
};

ReactDom.render(<App/>, document.getElementById('root'));