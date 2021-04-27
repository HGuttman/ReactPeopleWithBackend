import React from 'react';
function AddPersonForm({person, onFirstNameChange, onLastNameChange, onAgeChange,onAddClick, isAdding, isEditing, onCancelClick, onUpdateClick}){
    return(
        <div className='row-jumbotron'>
            <div className='col-md-3'>
                <input type='text' value ={person.firstName} onChange ={onFirstNameChange} name='firstName'className='form-control' placeholder= 'First Name'/>
                {isEditing &&
                <input type='hidden' value={person.Id} name='Id'className='form-control' />
                }
            </div>
            <div className="col-md-3">
                <input value={person.lastName} onChange={onLastNameChange} name='lastName' type="text" className="form-control" placeholder="Last Name" />
            </div>
            <div className="col-md-3">
                <input value={person.age} onChange={onAgeChange} name='age' type="text" className="form-control" placeholder="Age" />
            </div>
            <div className = 'col-md-3'>
                <button disabled={isAdding}className='btn btn-primary btn-block' onClick={!isEditing? onAddClick: onUpdateClick}>
                    {!isEditing? 'Add': 'Update'}
                </button>
                {isEditing&&
                <button className ='btn btn-warning btn-block' onClick={onCancelClick}>
                    Cancel
                </button>
                }
            </div>
        </div>
    )
}
export default AddPersonForm;