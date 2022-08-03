module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
  ) => {
    const errors = [];
    if (username === "") {
      errors.push({username: "Please add a username."});
    }
    if (email === "") {
      errors.push({username: "Please add an email."});
    } else {
      const regEx =
        /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
      if (!email.match(regEx)) {
        errors.push({email: "Please enter a valid email address."});
      }
    }
    if (password === "") {
      errors.push({password: "Please enter a valid password."});
    } else if (password !== confirmPassword) {
      errors.push({confirmPassword: "Passwords do not match."});
    }
  
    return {
      errors,
      valid: Object.keys(errors).length < 1,
    };
  };