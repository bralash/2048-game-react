import React from 'react'
import TryAgainLogo from '../assets/img/try-again.gif'
import gameWonSound from '../assets/audio/game-won.wav'
import gameLostSound from '../assets/audio/game-lost.wav'
import {Howl, Howler} from 'howler'

const GameOverlay = ({onRestart, board}) => {
    if(board.hasWon()) {
        new Howl({
            src: gameWonSound
        }).play()
        return <div className="tile2048"></div>
    } else if(board.hasLost()) {
        new Howl({
            src: gameLostSound
        }).play()
        return <div onClick={onRestart} className="gameOver"><img src={TryAgainLogo} alt="Try Again" style={{
            width: '100%',
            height: '100%',
            cursor: 'pointer'
        }} /></div>
    } 

    return (
        null
    )
}

export default GameOverlay
