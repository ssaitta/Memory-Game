import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCards } from '../../client/store';

const mapState = state => ({
    board: state.board,
})

const mapDispatch = dispatch => ({
    newBoard(){
        // dispatch(setDifficulty(easy))
        dispatch(fetchCards())
    },
})

class Board extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.newBoard()
    }

    render(){
        // console.log(this)
        let { board } = this.props

        return (
            <div>
            <h1>SIERRA</h1>
            </div>
        )
    }
}

export default connect(mapState, mapDispatch)(Board)
