exports.response = {

    getErrorResponse: function(status, errorMessage) {
        var error = {
            status: status,
            isError: true,
            errorMessage: errorMessage
        };

        if (status === 500)
            error.errorMessage = error.errorMessage || "Internal Server Error";

        return error;
    }

};