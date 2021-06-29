import { useState, useEffect } from 'react'
import './App.css'
import Square from './Components/Square';
import { Patterns } from './Components/Patterns'

function App() {
  const player1 = 'X'
  const player2 = 'O'

  const [board, setBoard] = useState(['', '', '', '', '', '', '', '', ''])
  const [player, setPlayer] = useState(player2)
  const [result, setResult] = useState({ winner: 'none', status: 'none' })

  useEffect(() => {
    checkTie() 
    checkWin()

    if (player === player1){
      setPlayer(player2)
    } else {
      setPlayer(player1)
    }
  },
  // eslint-disable-next-line
  [board])

  useEffect(() => {
    if(result.winner !== 'none'){
      alert(`Game Finished ! Winning Player: ${result.winner}`)
    }
    resetGame()
  },
  // eslint-disable-next-line
  [result])

  const choosedSquare = (sqaure) => {
    setBoard(
      board.map((val, idx) => {
        if(idx === sqaure && val === ""){
          return player
        }

        return val
      })
    )
  }

  const checkWin = () => {
    Patterns.forEach((eachPatterns) => {
      const firstPlayer = board[eachPatterns[0]]
      if(firstPlayer === '') return;
      let foundWinPattern = true

      eachPatterns.forEach((idx) => {
        if(board[idx] !== firstPlayer){
          foundWinPattern = false
        }
      })

      if(foundWinPattern){
        setResult({ winner: player, status: 'win' })
      }
    })
  }

  const checkTie = () => {
    let filled = true
    board.forEach((sqaure) => {
      if(sqaure === ''){
        filled = false
      }
    })

    if(filled){
      setResult({ winner: 'No One !', status: 'Tie' })
    }
  }

  const resetGame = () => {
    setBoard(['', '', '', '', '', '', '', '', '', ])
    setPlayer('O')
  }

  return (
    <div className="App">
      <h1 style={{color: player === player1 ? 'green' : 'red'}}>Player {player} turn</h1>

      <h1 className='board'>
        <div className="row">
          <Square val={board[0]} choosedSquare={() => choosedSquare(0)} />
          <Square val={board[1]} choosedSquare={() => choosedSquare(1)} />
          <Square val={board[2]} choosedSquare={() => choosedSquare(2)} />
        </div>
        <div className="row">
          <Square val={board[3]} choosedSquare={() => choosedSquare(3)} />
          <Square val={board[4]} choosedSquare={() => choosedSquare(4)} />
          <Square val={board[5]} choosedSquare={() => choosedSquare(5)} />
        </div>
        <div className="row">
          <Square val={board[6]} choosedSquare={() => choosedSquare(6)} />
          <Square val={board[7]} choosedSquare={() => choosedSquare(7)} />
          <Square val={board[8]} choosedSquare={() => choosedSquare(8)} />
        </div>

      </h1>
    </div>
  );
}

export default App;
