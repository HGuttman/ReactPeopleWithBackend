import axios from 'axios';
import React from 'react';
import PersonRow from './PersonRow';
import AddPersonForm from './AddPersonForm';

class PeopleTable extends React.Component {
state = {
    people: [],
    person:{
        firstName:'', 
        lastName:'',
        age:''
    },
    iaAdding: false,
    isEditing: false,
    editingId: false,
    checkedPeople: []
}
componentDidMount = () =>{
    axios.get('/api/people/getall').then(({data})=>{
        this.setState({people: data});
    });
}

onTextChange= e =>{
        const personCopy = {...this.state.person};
        personCopy[e.target.name] = e.target.value;
        this.setState({person: personCopy});
    }
    onAddClick = () =>{
        this.setState({isAdding: true});
        axios.post('/api/people/add', this.state.person).then(() => {
            axios.get('api/people/getall').then(({data}) =>{
                this.setState({
                    people: data,
                    person:{firstName:'', lastName:'', age:''},
                    isAdding: false
                });
            });
        });
    }
    onDeleteClick = person =>{
        axios.post('api/people/delete', person).then(()=>{
            axios.get('/api/people/getall').then(({data})=>{
                this.setState({people: data});
            });
        });
    }
    onEditClick = person =>{
        this.setState({person:{firstName: person.firstName, lastName: person.lastName, age: person.age}, isEditing: true, editingId: person.Id});
    }
    onCancelClick = () =>{
        this.setState({person:{firstName:'', lastName:'', age:''}, isEditing: false})
    }
    onUpdateClick = ()=>{
        this.setState({isAdding:true})
        const person = this.state.person;
        person.Id = this.state.editingId;
        axios.post('/api/people/update', person).then(()=>{
            axios.get('/api/people/getall').then(({data})=>{
                    this.setState({
                        people: data,
                        person:{firstName:'', lastName:'', age:''},
                        isAdding: false,
                        isEditing: false
                    });
            });
        });
    }
    onCheckboxChange = person => {
        let { checkedPeople } = this.state;
        if (checkedPeople.includes(person)) {
            this.setState({checkedPeople: checkedPeople.filter(p => p.Id !== person.Id)});
        }
        else{
            this.setState({checkedPeople: [...checkedPeople, person]});
        }
    }
    checkAll = () => {
        this.setState({ checkedPeople: [...this.state.people] });
    }

    uncheckAll = () => {
        this.setState({ checkedPeople: [] })
    }
    deleteAll = () =>{
        axios.post('/api/people/deleteall', this.state.checkedPeople).then(()=>{
            axios.get('/api/people/getall').then(({data})=>{
                this.setState({
                    people: data
                });
            });
        });
    }
render() {
    const {person, people, isAdding, isEditing, checkedPeople} = this.state;
    return(
<div className = 'container'>
<AddPersonForm
                    person={person}
                    onFirstNameChange={this.onTextChange}
                    onLastNameChange={this.onTextChange}
                    onAgeChange={this.onTextChange}
                    onAddClick={this.onAddClick}
                    isAdding={isAdding}
                    isEditing={isEditing}
                    onUpdateClick={this.onUpdateClick}
                    onCancelClick={this.onCancelClick}
                />
    <div className = 'row'>
        <div className = 'col-md-12'>
            <table className = 'table table-bordered table-hover table-striped'>
                <thead>
                    <tr>
                         <th>
                            <button className='btn btn-warning mt-2' onClick={this.deleteAll}>Delete all</button> <br />
                            <button className='btn btn-info mt-2' onClick={this.checkAll}>Check all</button> <br />
                            <button className='btn btn-info mt-2' onClick={this.uncheckAll}>Uncheck all</button>
                        </th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {!!people.length && people.map(p =>{
                        return<PersonRow person = {p}
                        key = {p.Id}
                        onDeleteClick = {() =>{this.onDeleteClick(p)}}
                        onEditClick = {()=>{this.onEditClick(p)}}
                        isChecked= {checkedPeople.includes(p)}
                        onCheckboxChange = {()=>{this.onCheckboxChange(p)}}
                        />
                    })}
                </tbody>
            </table>
        </div>
    </div>
</div>
    )
  }
}

export default PeopleTable;