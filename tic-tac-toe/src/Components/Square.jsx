import '../App.css'

export default function Square({val, choosedSquare}){
    return (
        <div className="square" onClick={choosedSquare}>
            {val}
        </div>
    )
}