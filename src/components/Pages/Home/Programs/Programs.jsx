import React from 'react'
import './Programs.css'
import program_1 from '../../../../assets/web-dev.jpg'
import program_2 from '../../../../assets/UI-UX.png'
import program_3 from '../../../../assets/graphic-design.jpg'
import program_1_icon from '../../../../assets/program-1-icon.png'
import program_2_icon from '../../../../assets/uiux-icon.png'
import program_3_icon from '../../../../assets/program-3-icon.png'

const Programs = () => {
  return (
    <div className='programs'>
        <div className="program">
            <img src={program_1} alt="" />
            <div className="caption">
                <img src={program_1_icon} alt="" />
                <p>Software Development</p>
            </div>
        </div>
        <div className="program">
            <img src={program_2} alt="" />
            <div className="caption">
                <img src={program_2_icon} alt="" />
                <p>UI/UX Design</p>
            </div>
        </div>
        <div className="program">
            <img src={program_3} alt="" />
            <div className="caption">
                <img src={program_3_icon} alt="" />
                <p>Graphic Design</p>
            </div>
        </div>
        
    </div>
  )
}

export default Programs
