import React, { useState } from 'react';
import './Recommendation.css';

import dryskin from '../../../../assets/dry-skin-icon.png';
import acne from '../../../../assets/pimple-icon.png';
import eyebag from '../../../../assets/dark-eye-icon.png';
import necessities from '../../../../assets/more-icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}><FontAwesomeIcon icon={faX} /></button>
        <h4>What you can do</h4>
        <h2>{content.title}</h2>
        <ul>
          {content.description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Programs = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);

  const programs = [
    { 
      img: dryskin, 
      title: 'Dry Skin', 
      description: ['Use a humidifier', 
        'Use a moisturizing soap', 
        'Add moisture daily',
        'Moisture right after washing',
        'Drink plenty of water', 
        'Avoid hot showers',
        'Avoid using harsh soap',
        'Gently wash your face'] 
    },
    { 
      img: acne, 
      title: 'Acne', 
      description: ['Wash your face twice a day and after sweating', 
        'Stop scrubbing your face and other acne-prone skin', 
        'Resist touching, picking, and popping your acne',
        'Properly wash your face',
        'Stay hydrated',
        'Limit makeup',
        'Try not to touch face',
        'Limit sun exposure',] 
    },
    { 
      img: eyebag, 
      title: 'Eyebag', 
      description: ['Use a cool compress on your eyes', 
        'Make sure you get enough sleep', 
        'Sleep with your head raised slightly',
        'Try to avoid drinking fluids before bed',
        'Limit salt in your diet',
        'Try to reduce your allergy symptoms',
        'Don\'t smoke',
        'Wear sunscreen every day',]  
    },
    { 
      img: necessities, 
      title: 'Necessities', 
      description: ['Cleanser', 'Moisturizer', 'Sunscreen', 'Exfoliant'] 
    }
  ];

  const openModal = (program) => {
    setSelectedProgram(program);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProgram(null);
  };

  return (
    <div className="programs">
      {programs.map((program, index) => (
        <div key={index} className="program" onClick={() => openModal(program)}>
          <img src={program.img} alt={program.title} />
          <div className="caption">
            <p>{program.title}</p>
          </div>
        </div>
      ))}

      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        content={selectedProgram || {}} 
      />
    </div>
  );
};

export default Programs;
