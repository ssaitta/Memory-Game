import React, { Component } from 'react'
import { resetChoices } from '../../store'
import DifficultyPicker from './DifficultyPicker'
import ResetButton from './ResetButton'

const buttonContainer = () => (
    <div>
        <ResetButton />
        <DifficultyPicker />
    </div>
)

export default buttonContainer