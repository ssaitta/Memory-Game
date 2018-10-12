import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCards, setDifficulty } from '../../store';
import CardRow from './CardRow'

const mapStateToProps = state => ({
    board: state.board,
    difficulty: state.difficulty
})

const mapDispatchToProps = dispatch => ({
    setDifficulty(difficulty){
        dispatch(setDifficulty(difficulty))
    },
    newBoard(difficulty){
        dispatch(fetchCards(difficulty))
    }
})

class Board extends Component{
    constructor(props){
        super(props)
    }

    layoutCards(cardArray, difficulty){
        if(cardArray){
            let numOfRows = difficulty==='easy' ? 2 : 4
            let layout = []
            let pnt = 0
            for(let i=0; i<numOfRows; i++){
                layout[i]=[]
                for(let j=0;j<4;j++){
                    layout[i].push(cardArray[pnt])
                    pnt++
                }
            }
        return layout
        }
    }

    componentDidMount(){
        this.props.setDifficulty('easy')
        this.props.newBoard(this.props.difficulty)
    }

    componentDidUpdate(prevProps){
        console.log("Board component did update")
        if(this.props.difficulty !== prevProps.difficulty){
            this.props.newBoard(this.props.difficulty)
        }
    }

    render(){
        let {board, difficulty, newBoard,} = this.props
        const layout = this.layoutCards(board, difficulty)
        return (
            <div>
                {board && 
                    <div>
                    {layout.map((cardRow, ind) => <CardRow key={ind} cardRow={cardRow} />)}
                    </div>
                }
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
