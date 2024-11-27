import React, { useState } from 'react'

function ExpenseModal({closeExpenseModal, expenseModalOpen, addExpensesHere}) {
    const [expenses, setExpenses] = useState({});


    if (!expenseModalOpen) {
        return null;
    }

    const handleInputs = (e) => {
        // here we create an array of objects with all the expenses
        const newExpense = {...expenses, [e.target.name]: e.target.value}
        setExpenses(newExpense)
        

    }

    const addExpenses = () => {
        // when called the data must be saved and shown on the main page
        addExpensesHere(expenses);


    }


    return (

        <div className="mdl-overlay">
            <div className="mdl-container" onClick={(e) => e.stopPropagation()}>
                <div className="mdl-header">
                    <button onClick={closeExpenseModal} className="close-button">X</button>
                </div>
                <div className="mdl-body">
                    <h5>Add Expense</h5>
                    <div className='form-group'>
                    <form onSubmit={(e) => e.preventDefault()}>
                            <input type='number' onChange={handleInputs} className='form-control mb-3' name='expense' placeholder='Expense' />
                            <input type='date' onChange={handleInputs} className='form-control mb-3' name='date' placeholder='Select Date' />
                            <select className='form-select mb-3' name='category'onChange={handleInputs}>
                                <option value="-">- Select Category -</option>
                                <option value='grocery'>Grocery</option>
                                <option value='personal'>Personal</option>
                                <option value='rent'>Rent</option>
                                <option value='medical'>Medical</option>
                                <option value='fee'>Fee</option>
                            </select>
                            <textarea onChange={handleInputs} className='form-control mb-3' placeholder='description' name='detail'></textarea>
                            <button className='btn btn-sm w-100 btn-warning py-2' onClick={addExpenses}>Add Expense</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ExpenseModal