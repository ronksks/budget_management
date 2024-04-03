// Import the Transaction model
// const Transaction = require("../models/budgetModel.model");
// Import the Budget Service
const BudgetService = require("../services/budget.service");

// Create new transaction
exports.createTransaction = async (req, res, next) => {
  try {
    const transaction = req.body;
    const transactionAdded =
      await BudgetService.createTransactionService(transaction);

    return res.status(200).send({ transactionAdded });
  } catch (err) {
    res.status(400).json({ Error: err.message });
    next(err);
    return err;
  }
};
// Get all transaction Controller
exports.getAllTransactions = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const transactions = await BudgetService.getAllTransactionsService(userId);
    return res.status(200).send({ transactions });
  } catch (err) {
    res.status(400).json({ Error: err.message });
    next(err);
    return err;
  }
};
// Delete transaction by transaction ID
exports.deleteTransactionsByIds = async (req, res, next) => {
  try {
    const transactionIds = req.body.transactionIds;
    const affectedRows =
      await BudgetService.deleteTransactionsByIdsService(transactionIds);
    if (affectedRows === 0) {
      // No rows were deleted, so the transactionIds must not exist
      res.status(404).json({ message: "Transactions not found" });
      return;
    } else {
      // The transactions were successfully deleted
      res.status(200).json({
        message: "Transactions successfully deleted",
        transactionIds: transactionIds,
      });

      return;
    }
  } catch (err) {
    res.status(400).json({ Error: err.message });
    next(err);
    return err;
  }
};

// Edit transaction by transaction ID
exports.updateTransactionById = async (req, res, next) => {
  try {
    const transaction = req.body;

    const affectedRows =
      await BudgetService.updateTransactionByIdService(transaction);
    if (affectedRows === 0) {
      // No rows were deleted, so the transactionIds must not exist
      res.status(404).json({ message: "Transaction not found" });
      return;
    } else {
      // The transactions were successfully deleted
      res.status(200).json({ message: "Transactions successfully updated" });
      return;
    }
  } catch (err) {
    res.status(400).json({ Error: err.message });
    next(err);
    return err;
  }
};