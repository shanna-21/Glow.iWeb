import React from 'react'
import './Recommendation.css'
import program_1_icon from '../../../../assets/program-1-icon.png'
import program_2_icon from '../../../../assets/uiux-icon.png'
import program_3_icon from '../../../../assets/program-3-icon.png'

import dryskin from '../../../../assets/dry-skin-icon.png'
import acne from '../../../../assets/pimple-icon.png'
import eyebag from '../../../../assets/dark-eye-icon.png'
import necessities from '../../../../assets/more-icon.png'

const Programs = () => {
  return (
    <div className='programs'>
        <div className="program">
            <img src={dryskin} alt="" />
            <div className="caption">
                <img src={program_1_icon} alt="" />
                <p>Dry Skin</p>
            </div>
        </div>
        <div className="program">
            <img src={acne} alt="" />
            <div className="caption">
                <img src={program_2_icon} alt="" />
                <p>Acne</p>
            </div>
        </div>
        <div className="program">
            <img src={eyebag} alt="" />
            <div className="caption">
                <img src={program_3_icon} alt="" />
                <p>Eyebag</p>
            </div>
        </div>
        <div className="program">
            <img src={necessities} alt="" />
            <div className="caption">
                <img src={program_3_icon} alt="" />
                <p>Necessities</p>
            </div>
        </div>
        
    </div>
  )
}

export default Programs
