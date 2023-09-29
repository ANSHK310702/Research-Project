import React, { useState } from 'react'
import classes from './Dropdown.module.css'

const Dropdown = ({ onOptionSelected }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const options = ['CNN', 'Random Forest', 'Decision Tree', 'Logistic Regression', 'Linear Discriminant Analysis', 'Support Vector Machine'];
    const handleOptionClick = (e,option) => {
        if (onOptionSelected) {
            e.preventDefault();
            onOptionSelected(option);
            setSelectedOption(option)
        }
        setIsOpen(false);
    };
  return (
    <div className={classes.dropdown}>
    <button onClick={(e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    }}>
        {selectedOption || 'Model'}
        <span className={`${classes.arrow} ${isOpen ? `${classes.up}` : `${classes.down}`}`}></span>
    </button>
    {isOpen && (
        <ul className={classes["dropdown-menu"]}>
            {options.map(option => (
                <li 
                onClick={(e) => handleOptionClick(e,option)}
                    key={option} 
                    >
                    {option}
                </li>
            ))}
        </ul>
    )}
</div>
  )
}

export default Dropdown