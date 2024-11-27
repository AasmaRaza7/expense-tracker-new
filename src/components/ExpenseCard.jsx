import React, { useState } from 'react'


function ExpenseCard({ exp, index, deleteExpense, editExpense, isEditing }) {
    const [expenses, setExpenses] = useState({});

    const delExpense = (index) => {
        deleteExpense(index);
        

    }

    const editedExpense = (index) => {
        editExpense(index);
        
    }

   
    return (
        <tr>
            <td>{exp.date}</td>
            <td>{exp.detail}</td>
            <td>{exp.category}</td>
            <td>${exp.expense}</td>
            <td className='d-flex gap-2'><button onClick={() => { delExpense(index) }} className='btn btn-sm btn-danger'>Delete</button>
            <button onClick={() => { editedExpense(index) }} className='btn btn-sm btn-warning'>Edit</button></td>
        </tr>
    )
}

export default ExpenseCard