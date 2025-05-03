let balance = 0;
let transactions = [];

const budgetInput = document.getElementById('budget-input');
const balanceDisplay = document.getElementById('balance');
const budgetSetup = document.getElementById('budget-setup');
const tracker = document.getElementById('tracker');
const form = document.getElementById('form');
const descInput = document.getElementById('desc');
const amountInput = document.getElementById('amount');
const list = document.getElementById('transaction-list');

function setBudget() {
  const value = parseFloat(budgetInput.value);
  if (isNaN(value) || value <= 0) {
    alert("Please enter a valid budget");
    return;
  }

  balance = value;
  updateBalance();
  budgetSetup.style.display = 'none';
  tracker.style.display = 'block';
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const desc = descInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (desc === '' || isNaN(amount) || amount <= 0) {
    alert("Please enter valid description and amount");
    return;
  }

  if (amount > balance) {
    alert("Budget not enough!");
    return;
  }

  const transaction = {
    id: Date.now(),
    desc,
    amount
  };

  transactions.push(transaction);
  balance -= amount;
  updateBalance();
  renderTransaction(transaction);

  descInput.value = '';
  amountInput.value = '';
});

function updateBalance() {
  balanceDisplay.innerText = `₱${balance.toFixed(2)}`;
}

function addMoreBudget() {
    const input = document.getElementById('add-budget-input');
    const extra = parseFloat(input.value);
  
    if (isNaN(extra) || extra <= 0) {
      alert("Please enter a valid amount");
      return;
    }
  
    balance += extra;
    updateBalance();
    input.value = '';
  }
  

function renderTransaction(tx) {
  const li = document.createElement('li');
  li.innerText = `${tx.desc} - ₱${tx.amount.toFixed(2)}`;
  list.appendChild(li);
}
