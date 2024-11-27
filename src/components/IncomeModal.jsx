import React, { useState } from 'react'

function IncomeModal({ incomeModalOpen, handleClose, showTotalIncome }) {
    const [salary, setSalary] = useState (0);

    if (!incomeModalOpen) {
        return null;
    }

    const addSalary = () => {
        showTotalIncome(salary);
        setSalary(0);

    }

    return (
        <div className="mdl-overlay" onClick={handleClose}>
            <div className="mdl-container" onClick={(e) => e.stopPropagation()}>
                <div className="mdl-header">
                    <button onClick={handleClose} className="close-button">X</button>
                </div>
                <div className="mdl-body">
                    <h5>Add Income</h5>
                    <div className='form-group d-flex gap-2'>
                        <input type="text" onChange={ (e) => setSalary(e.target.value) } className='form-control' placeholder="Enter Income" />
                        <button className="btn btn-primary btn-sm" onClick={addSalary}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IncomeModal