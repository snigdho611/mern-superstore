const success = (message, data = []) => {
    return {
        success: true,
        message: message,
        results: data
    }
}


const failure = (message, error = {}) => {
    return {
        success: false,
        message: message,
        errors: error
    }
}

module.exports = {
    success, failure
}