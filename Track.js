document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('select');
  const incomeSection = document.getElementById('inc');
  const expenseSection = document.getElementById('exp');
  const form = document.getElementById('expenseForm');
  const tinc = document.getElementById('tinc');
  const texp = document.getElementById('texp');
  const tbal = document.getElementById('tbal');
  const list = document.getElementById('list');

  let totalIncome = 0;
  let totalExpense = 0;

  function toggleSections() {
    const selected = select.value;
    if (selected === 'income') {
      incomeSection.style.display = 'block';
      expenseSection.style.display = 'none';
      setDisabled(incomeSection, false);
      setDisabled(expenseSection, true);
    } else if (selected === 'expense') {
      incomeSection.style.display = 'none';
      expenseSection.style.display = 'block';
      setDisabled(incomeSection, true);
      setDisabled(expenseSection, false);
    } else {
      incomeSection.style.display = 'none';
      expenseSection.style.display = 'none';
      setDisabled(incomeSection, true);
      setDisabled(expenseSection, true);
    }
  }

  function setDisabled(section, disabled) {
    const inputs = section.querySelectorAll('input');
    inputs.forEach(input => input.disabled = disabled);
  }

  select.addEventListener('change', toggleSections);
  toggleSections(); // Run initially

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (select.value === 'income') {
      const source = document.getElementById('incomeSource').value.trim();
      const amount = parseFloat(document.getElementById('incomeAmount').value);
      const date = document.getElementById('incomeDate').value;

      if (!source || isNaN(amount) || !date) return;

      totalIncome += amount;
      addTransaction("INCOME", source, amount, date, "green");

    } else if (select.value === 'expense') {
      const purpose = document.getElementById('expensePurpose').value.trim();
      const amount = parseFloat(document.getElementById('expenseAmount').value);
      const date = document.getElementById('expenseDate').value;

      if (!purpose || isNaN(amount) || !date) return;

      totalExpense += amount;
      addTransaction("EXPENSE", purpose, amount, date, "red");
    }

    updateTotals();
    form.reset();
    toggleSections(); // Reset section visibility
  });

  function updateTotals() {
    tinc.textContent = `₹${totalIncome.toFixed(2)}`;
    texp.textContent = `₹${totalExpense.toFixed(2)}`;
    tbal.textContent = `₹${(totalIncome - totalExpense).toFixed(2)}`;
  }

  function addTransaction(type, label, amount, date, color) {
    const li = document.createElement('li');
    li.innerHTML = `<span style="color: ${color}; font-weight: bold;">[${type}]</span> ${label} - ₹${amount} on ${date}`;
    list.appendChild(li);
  }
});
