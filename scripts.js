document.getElementById('expenseForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const type = document.querySelector('input[name="type"]:checked').value;

    fetch('/expenses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            amount: amount,
            category: category,
            type: type
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Expense/Income added:', data);
        // Optionally, you can update the UI to display the newly added expense/income
    })
    .catch(error => console.error('Error:', error));
});

// Fetch and display expenses/income
fetch('/expenses')
    .then(response => response.json())
    .then(expenses => {
        console.log('Expenses/Income:', expenses);
        // Loop through expenses and render each expense/income
        expenses.forEach(expense => {
            const expenseElement = document.createElement('div');
            expenseElement.innerHTML = `
                <p><strong>${expense.title}</strong>: ${expense.amount} (${expense.type})</p>
                <p>Category: ${expense.category}</p>
                <p>Date: ${new Date(expense.date).toLocaleDateString()}</p>
            `;
            document.getElementById('expenses').appendChild(expenseElement);
        });
    })
    .catch(error => console.error('Error:', error));
