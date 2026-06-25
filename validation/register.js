const validator = require('validator');
const isEmpty = require('is-empty');

const validateRegisterInput = (data) => {
    let errors = {};

    // Convert empty fields to empty strings
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    // Name checks
    if (validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }

    // Email checks
    if (validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    // Password checks
    if (validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    } else if (!validator.isLength(data.password, { min: 8 })) {
        errors.password = "Password must be at least 8 characters";
    }

    // Confirm password checks
    if (validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required";
    } else if (!validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords do not match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = validateRegisterInput;
