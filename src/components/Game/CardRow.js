import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from './Card'
import styles from '../Game/Game.scss'

class CardRow extends Component{
   render(){
       let { cardRow } = this.props
       return(
           <div className={styles.cardRow}>
               {cardRow.map((card, ind) => <Card key={ind} card={card}/>)}
            </div>
       )
   }
}

export default CardRow