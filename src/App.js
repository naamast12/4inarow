import logo from './logo.svg';
import React from 'react';
import './App.css';
import Square from "./Square";


// eslint-disable-next-line no-undef
class App extends React.Component {
    state={
        squares : Array.from({length: 42}, (_,index ) => ({player: 0})),
        playerNumber : 1,
        start: false,
        winner : null,
        width:"",
        height:"",
        selectedColorPlayer1: "",
        selectedColorPlayer2: "",
        colorOptions: [ "red", "yellow", "green","pink","gray","brown","purple","black"],
        clicked:false
    }

    turn = () => {
        const newPlayerNumber = this.state.playerNumber === 1 ? 2 : 1;
        this.setState({ playerNumber: newPlayerNumber });

    }
    onChangeWidth = (event) => {
        this.setState({
            width:event.target.value
        })
    }
    onChangeHeight = (event) => {
        this.setState({
            height:event.target.value
        })
    }

    setColor = (index) =>{
        if ((index>=35||(index<35&&this.state.squares[index+7].player!==0)) &&this.state.squares[index].player===0&&this.state.winner===null) {
            this.state.squares[index].player = this.state.playerNumber;
            this.turn();
        }
    }
    colorChoose = (event, player) => {
        const selectedColor = event.target.value;

        this.setState(prevState => {
            if (player === 1) {
                return { selectedColorPlayer1: selectedColor };
            } else if (player === 2) {
                return { selectedColorPlayer2: selectedColor };
            }
        });
    };

    checkWinner = () => {
        const squares = this.state.squares;
        const player = this.state.playerNumber
        // אופקית
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 4; col++) {
                if (squares[row * 7 + col].player === player &&
                    squares[row * 7 + col + 1].player === player &&
                    squares[row * 7 + col + 2].player === player &&
                    squares[row * 7 + col + 3].player === player) {
                    this.state.winner = player;
                }
            }
        }

        // אנכית
        for (let col = 0; col < 7; col++) {
            for (let row = 0; row < 3; row++) {
                if (squares[row * 7 + col].player === player &&
                    squares[(row + 1) * 7 + col].player === player &&
                    squares[(row + 2) * 7 + col].player === player &&
                    squares[(row + 3) * 7 + col].player === player) {
                    this.state.winner = player;
                }
            }
        }

        // אלכסונית משמאל למעלה לימין למטה
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 4; col++) {
                if (squares[row * 7 + col].player === player &&
                    squares[(row + 1) * 7 + col + 1].player === player &&
                    squares[(row + 2) * 7 + col + 2].player === player &&
                    squares[(row + 3) * 7 + col + 3].player === player) {
                    this.state.winner = player;
                }
            }
        }

        // אלכסונית מימין למעלה לשמאל למטה
        for (let row = 0; row < 3; row++) {
            for (let col = 3; col < 7; col++) {
                if (squares[row * 7 + col].player === player &&
                    squares[(row + 1) * 7 + col - 1].player === player &&
                    squares[(row + 2) * 7 + col - 2].player === player &&
                    squares[(row + 3) * 7 + col - 3].player === player) {
                    this.state.winner = player;
                }
            }
        }

        // אין ניצחון
    }
    reFresh = () => {
        const newSquares= this.state.squares.map(square => ({ player: 0 }));
        this.setState({
            squares: newSquares,
            playerNumber: 1,
            winner: null,
            width :"",
            height:"",
            selectedColorPlayer1: "",
            selectedColorPlayer2: "",
            start:false,
            clicked:false
        });
    };
    startGame=()=> {
       if (this.state.width!==""&&
           this.state.height!==""&&
           this.state.selectedColorPlayer1!==""&&
           this.state.selectedColorPlayer2!==""
       ) {
           return true;
       }
       else return false;

    }


    render() {
        return (
            <div>
                <div style={{fontSize: "25px"}}>
                    board width:
                    <input onChange={this.onChangeWidth} value={this.state.width}
                           disabled={this.state.start}
                    />
                </div>
                <div style={{fontSize: "25px"}}>
                    board height:
                    <input onChange={this.onChangeHeight} value={this.state.height}
                           disabled={this.state.start}
                    />
                </div>
                <div>
                    Player 1 :
                    <select value={this.state.selectedColorPlayer1} onChange={(event) => this.colorChoose(event, 1)}>
                        <option value="" disabled hidden>Choose color</option>
                        {this.state.colorOptions.map((color, index) => (
                            <option key={index} value={color}>{color}</option>
                        ))}
                    </select>
                </div>
                <div>
                    Player 2 :
                    <select value={this.state.selectedColorPlayer2} onChange={(event) => this.colorChoose(event, 2)}
                            disabled={!this.state.selectedColorPlayer1}>
                        <option value="" disabled hidden>Choose color</option>
                        {this.state.colorOptions.map((color, index) => (
                            <option key={index} value={color}
                                    disabled={color === this.state.selectedColorPlayer1}>{color}</option>
                        ))}
                    </select>
                </div>
                <button onClick={() => this.setState({start: true,clicked:true})}
                        disabled={!this.startGame()||this.state.clicked} >
                    Start
                </button>
                {this.state.width !== "" && this.state.height !== "" && this.state.winner === null &&this.state.start ? (
                    <div style={{fontSize: "24px", fontWeight: "bold", color: "darkblue"}}>
                        it's player {this.state.playerNumber} turn
                    </div>
                ) : this.state.winner !== null ? (
                    <div style={{fontSize: "50px", fontWeight: "bold", color: "red"}}>Winner:
                        Player {this.state.winner}</div>
                ) : null}

                {this.state.start && (
                <table>
                    <tbody>
                    {Array.from({length: 6}).map((_, rowIndex) => (
                        <tr key={rowIndex}>
                            {this.state.squares.slice(rowIndex * 7, rowIndex * 7 + 7).map((square, colIndex) => (
                                <td key={rowIndex * 7 + colIndex}
                                    onClick={() => {
                                        this.setColor(rowIndex * 7 + colIndex);
                                        this.checkWinner()
                                    }
                                    }
                                >
                                    <Square
                                        color={
                                            square.player === 1
                                                ? this.state.selectedColorPlayer1
                                                : square.player === 2
                                                    ? this.state.selectedColorPlayer2
                                                    : "blue"
                                        }
                                        width={this.state.width / 7}
                                        height={this.state.height / 6}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
                )}
                {this.state.width !== "" && this.state.height !== "" && this.state.start ? (
                    <button onClick={this.reFresh}
                            disabled={!this.state.start}
                            style={{fontSize: "25px", fontWeight: "bold", color: "darkblue"}}>
                        restart
                    </button>
                ) : null}
            </div>
        );
    }
}

export default App;
