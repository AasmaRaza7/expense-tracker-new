import { useEffect, useState } from 'react'
import './App.css'
import IncomeModal from './components/IncomeModal'
import ExpenseModal from './components/ExpenseModal';
import ExpenseCard from './components/ExpenseCard';

import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function App() {
  const [income, setIncome] = useState(() => {
    const storedIncome = JSON.parse(localStorage.getItem("income"));
    return (storedIncome) ? storedIncome : 0;

  });
  const [balance, setBalance] = useState(0);
  const [expenses, setExpenses] = useState(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses"));
    return (storedExpenses) ? storedExpenses : [];

  });
  const [totalExpense, setTotalExpense] = useState(0);
  const [incomeModalOpen, setIncomeModalOpen] = useState(false);
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);


  const openIncomeModal = () => {
    setIncomeModalOpen(true);
  };

  const closeIncomeModal = () => {
    setIncomeModalOpen(false);
  };

  const showTotalIncome = (salary) => {
    // add the next amount of salary in previous one
    setIncome(income + +salary); // +salary will parse the string to number
    closeIncomeModal();
  };

  const openExpenseModal = () => {
    setExpenseModalOpen(true);

  };

  const closeExpenseModal = () => {
    setExpenseModalOpen(false);
  };

  const addExpensesHere = (expense) => {
    const newExpArray = [...expenses, expense]
    setExpenses(newExpArray);
    setExpenseModalOpen(false);

  }

  const deleteExpense = (exp) => {
    // here we will filter out the expense recieved in the argument

    if (confirm("Do you really want to delete?")) {
      //  this will filter out/remove the index and element of the deleted item 
      const updatedExp = expenses.filter((element, i) => i != exp);
      // re-render with the remaining items
      setExpenses(updatedExp);
      deleteNotify();
    }
  }

  const editExpense = (exp) => {
    // first we display the item in the expense card with index passed in argument,
    console.log("edit called");
    setIsEditing(true);
    // this will open expense card
    setExpenseModalOpen(true);
  
  }

  const deleteNotify =  () => toast.success('Successfully deleted!', {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Slide,
    });

  // this is called only first time the page loads
  // it has 2 parameters, 1 call back func & 1 dependency array
  // if dependency array is empty, it will run once page is loaded
  // if dependency array has value, it is called when array changess
  useEffect(() => {
    // here we will do all the calculations
    let allExpenses = 0;
    expenses.forEach((expObj) => {
      allExpenses += +expObj.expense;
    });
    // now we display remaining balance
    setBalance(income - allExpenses);
    // and display the totla of all expenses
    setTotalExpense(allExpenses);

    // this is to save data in local storage
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("income", JSON.stringify(income));

  }, [expenses, income]);

  return (
    <>
      <div className='container'>
        <div className='bg-dark text-white p-3'>
          <h1 className='text-center mb-5'>Expense Tracker</h1>
          <div className='row'>
            <div className='col-md-4 text-center'>
              <h3>Amount In</h3>
              <h5 className='text-success'>${income}</h5>
              <button className='btn btn-success' onClick={openIncomeModal}>Add Income</button>

              <IncomeModal incomeModalOpen={incomeModalOpen} handleClose={closeIncomeModal} showTotalIncome={showTotalIncome} />
            </div>
            <div className='col-md-4 text-center'>
              <h3>Expenses</h3>
              <h5 className='text-warning'>${totalExpense}</h5>
            </div>

            <div className='col-md-4 text-center'>
              <h3>Balance</h3>
              <h5 className='text-danger'>${balance}</h5>
              <button className='btn btn-danger' onClick={openExpenseModal}>Add Expense</button>
              <ExpenseModal closeExpenseModal={closeExpenseModal} expenseModalOpen={expenseModalOpen} addExpensesHere={addExpensesHere} />
            </div>
          </div>
        </div>
        <div className='p-3 bg-white'>
          <table className='table'>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                expenses.map((exp, index) => {
                  // here we will use map method and pass it to ExpenseCard.jsx and draw <tr> there
                  // all the expenses are in state [expenses, setExpenses]
                  if (!isEditing) {
                    return (

                      <ExpenseCard exp={exp} index={index} deleteExpense={deleteExpense} isEditing={isEditing} editExpense={editExpense} key={index} />

                    )
                  }
                  else if (isEditing) {
                    return 0;
                  }

                })

              }
            </tbody>
          </table>
        </div>
      </div >
      <ToastContainer />
    </>
  )
}

export default App