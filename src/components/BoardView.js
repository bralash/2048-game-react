import React, { useState } from 'react'
import { Board } from '../helper'
import useEvent from '../hooks/useEvent'
import { Tile as TileClass } from '../helper' 
import Cell from './Cell'
import GameOverlay from './GameOverlay'
import Tile from './Tile'
import moveSound from '../assets/audio/move.wav'
import {Howl, Howler} from 'howler'

const BoardView = () => {

    const [board, setboard] = useState(new Board());

    

    const handleKeyDown = (event) => {
        let sound = new Howl({
            src: moveSound
        }).play()
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
            <p className="copyright">
                Game developed by <b>Lashpixel</b> for <b>Maame Esi</b>. <br/>Tutorial and asset from <b>EduWise</b>
            </p>
        </div>
    )
}

export default BoardView
