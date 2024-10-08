import React, { useRef } from 'react'
import './Tips.css'
import lightbulb from '../../../../assets/lightbulb-tips.png'

const Tips = () => {
    return (
        <div className='tips-block'>
            <div className='tips-img'>
                <img src={lightbulb} />
            </div>
            <div className='tips-details'>
                <h2>Here's a TIP!</h2>
                <p>Check out community for fun skinversations!</p>
            </div>
        </div>
    )
}

export default Tips 