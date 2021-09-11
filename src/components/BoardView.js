import React, { useState } from 'react'
import { Board } from '../helper'
import useEvent from '../hooks/useEvent'
import Cell from './Cell'
import GameOverlay from './GameOverlay'
import Tile from './Tile'

const BoardView = () => {

    const [board, setboard] = useState(new Board());

    

    const handleKeyDown = (event) => {
        if(board.hasWon()) {
            return;
        }

        if(event.keyCode >=37 && event.keyCode <= 40) {
            let direction = event.keyCode - 37;
            let boardClone = Object.assign(Object.create(Object.getPrototypeOf(board)),board)
            let newBoard = boardClone.move(direction)
            setboard(newBoard)
        }
    }

    useEvent('keydown',handleKeyDown)
    
    const cells = board.cells.map((row, rowIndex) => {
        return (
            <div key={rowIndex}>
                {row.map((col,colIndex) => {
                    return <Cell key={rowIndex * board.size + colIndex} />
                })}
            </div>
        )
    })

    const tiles = board.tiles.filter(tile => tile.value !== 0).map((tile,tileIndex) => {
        return <Tile key={tileIndex} tile={tile} />
    })

    const resetGame = () => {
        setboard(new Board())
    }
    return (
        <div>
            <div className="details-box">
                <div className="resetButton" onClick={resetGame}>New Game</div>
                <div className="score-box">
                    <div className="score-header">Score</div>
                    <div>{board.score}</div>
                </div>  
            </div>
            <div className="board">
                {cells} 
                {tiles}
                <GameOverlay onRestart={resetGame} board={board} />
            </div>
        </div>
    )
}

export default BoardView
