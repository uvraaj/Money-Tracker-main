const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost/moneyTrackerDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define expense schema
const expenseSchema = new mongoose.Schema({
    title: String,
    amount: Number,
    category: String,
    type: String, // 'expense' or 'income'
    date: { type: Date, default: Date.now }
});

// Define expense model
const Expense = mongoose.model('Expense', expenseSchema);

// Routes
app.get('/expenses', (req, res) => {
    Expense.find({}, (err, expenses) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(expenses);
        }
    });
});

app.post('/expenses', (req, res) => {
    const newExpense = new Expense({
        title: req.body.title,
        amount: req.body.amount,
        category: req.body.category,
        type: req.body.type
    });

    newExpense.save((err, expense) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(201).json(expense);
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
