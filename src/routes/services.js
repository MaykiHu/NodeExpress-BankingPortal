const express = require('express');
const { accounts, writeJSON } = require('../data');

const router = express.Router();

router.get('/transfer', (req, res) => {
  res.render('transfer')
});
router.post('/transfer', (req, res) => {
  const { from, to, amount } = req.body; // destructure to get from, to, amount
  accounts[from].balance -= amount;  // update balance "from" acc
  accounts[to].balance += parseInt(amount);  // update balance of "to" acc
  writeJSON();
  res.render('transfer', { message: "Transfer Completed" });
});

router.get('/payment', (req, res) => {
  res.render(
    'payment', 
    {
      account: accounts.credit,
    }
  );
});
router.post('/payment', (req, res) => {
  const { amount } = req.body;
  accounts.credit.balance -= amount;
  accounts.credit.available += parseInt(amount);
  writeJSON();
  res.render('payment', 
    { 
      message: "Payment Successful",
      account: accounts.credit 
    }
  );
});

module.exports = router;