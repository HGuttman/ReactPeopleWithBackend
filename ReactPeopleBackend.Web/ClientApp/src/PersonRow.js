import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function PersonRow({person, onDeleteClick, onEditClick, isChecked, onCheckboxChange}){
    const {firstName, lastName, age} = person;
    return(
        <tr>
            <td>
                <input 
                type = 'checkbox'
                className ='form-check-input'
                checked = {isChecked}
                onChange = {onCheckboxChange}
                />
            </td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>
                <button className = 'btn btn-success' onClick ={onDeleteClick}>Delete</button>
                <button className='btn btn-danger' onClick = {onEditClick}>Edit</button>
            </td>
        </tr>
    );
}
export default PersonRow;