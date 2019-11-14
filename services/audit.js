const NotesService = require("./notes");
const TransactionService = require("./transaction");

module.exports = async ({ user, month, year }) => {
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 1);

    const completedNotes = await NotesService.findAll({
        user,
        isComplete: true,
        isActive: false,
        updatedAt: { $gte: start, $lt: end }
    });

    const noteTagsFlyweight = [];

    const notesAudit = {};

    completedNotes.forEach(e => {
        if (e.tag && noteTagsFlyweight.includes(e.tag.name)) {
            notesAudit[e.tag.name] += 1;
        } else {
            notesAudit[e.tag.name] = 1;
            noteTagsFlyweight.push(e.tag.name);
        }
    });

    const expenses = await TransactionService.findAll({
        user,
        isProfit: false,
        updatedAt: { $gte: start, $lt: end }
    });

    const expenseTagsFlyweight = [];

    const expenseAudit = {};

    expenses.forEach(e => {
        if (e.tag && expenseTagsFlyweight.includes(e.tag.name)) {
            expenseAudit[e.tag.name] += e.amount;
        } else {
            expenseAudit[e.tag.name] = e.amount;
            expenseTagsFlyweight.push(e.tag.name);
        }
    });

    const earnings = await TransactionService.findAll({
        user,
        isProfit: true,
        updatedAt: { $gte: start, $lt: end }
    });

    const earningTagsFlyweight = [];

    const earningAudit = {};

    earnings.forEach(e => {
        if (earningTagsFlyweight.includes(e.tag.name)) {
            earningAudit[e.tag.name] += e.amount;
        } else {
            earningAudit[e.tag.name] = e.amount;
            earningTagsFlyweight.push(e.tag.name);
        }
    });

    return {
        earnings: earningAudit,
        expenses: expenseAudit,
        tasks: notesAudit
    };
}