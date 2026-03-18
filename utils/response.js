const response = {

    success: (res, data, message = "Success") => {
        return res.status(200).json({
            status: "success",
            message: message,
            data: data
        });
    },

    created: (res, data, message = "Created successfully") => {
        return res.status(201).json({
            status: "success",
            message: message,
            data: data
        });
    },

    error: (res, message = "Server error", code = 500) => {
        return res.status(code).json({
            status: "error",
            message: message
        });
    }

};

module.exports = response;