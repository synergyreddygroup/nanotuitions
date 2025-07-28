const validators = {
  isValidEmail: (email) => {
    // Basic email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  isStrongPassword: (password) => {
    // Password must be at least 6 characters (Firebase Auth default)
    // You can add more complex rules (e.g., uppercase, lowercase, number, special character)
    return password.length >= 6;
  },

  isValidPhoneNumber: (phone) => {
    // Basic phone number validation for 10 digits (common in India)
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  },

  isPositiveNumber: (value) => {
    return !isNaN(value) && parseFloat(value) > 0;
  },

  isNotEmpty: (value) => {
    return value !== null && value.trim() !== '';
  },
  // Add more validators as needed for various form inputs
};

export default validators;