exports.validateStudent = (req, res, next) => {

    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            message: "Name and email are required"
        });
    }

    next();
};

exports.validateTutor = (req, res, next) => {

    const { name, subject } = req.body;

    if (!name || !subject) {
        return res.status(400).json({
            message: "Name and subject are required"
        });
    }

    next();
};

exports.validatePayment = (req, res, next) => {

    const { assignment_id, amount } = req.body;

    if (!assignment_id || !amount) {
        return res.status(400).json({
            message: "Assignment ID and amount are required"
        });
    }

    next();
};