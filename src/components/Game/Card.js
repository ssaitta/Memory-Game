import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from '../Game/Game.scss'
import chosenCards from '../../store/chosenCards';
import { chooseCard1, chooseCard2, resetChoices } from '../../store'

const mapStateToProps = state => ({
    chosenCards: state.chosenCards,
    board: state.board
})

const mapDisptchToProps = dispatch => ({
    pickCard(card, row, col, turn) {
        if (turn === 1) {
            dispatch(chooseCard1(card, row, col))
        }
        else {
            dispatch(chooseCard2(card, row, col))
        }
    },
    resetCards() {
        dispatch(resetChoices())
    }
})


class Card extends Component {
    constructor(props) {
        super(props);
        this.state = { cardHidden: true }
    }

    onClick(e, card) {
        if (!this.props.chosenCards.card1) {
            this.props.pickCard(card, 1)
            this.setState({ cardHidden: false })
        }
        else if (!this.props.chosenCards.card2) {
            if (row !== this.props.chosenCards.card1.row || col !== this.props.chosenCards.card1.column) {
                this.props.pickCard(card, 2)
                this.setState({ cardHidden: false })
            }
        }
        else if (this.props.chosenCards.card1 && this.props.chosenCards.card2) {
            this.props.resetCards()
            this.props.pickCard(card, 1)
            this.setState({ cardHidden: false })
        }
    }
    render() {
        let { card } = this.props
        let classes = [styles.card]
        if (this.state.cardHidden) {
            classes.push(styles.backOfCard)
        }
        return (
            <div>
                {card &&
                    <div className={classes.join(' ')}
                        onClick={e => this.onClick(e, card)}
                    >
                        <span className={styles.innerCard}>
                            {card.value}
                        </span>
                    </div>
                }
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDisptchToProps)(Card)