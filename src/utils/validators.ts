export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[0-9]{10}$/;
  return re.test(phone);
};

export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return re.test(password);
};

export const validateFeeAmount = (amount, due) => {
  return amount > 0 && amount <= due;
};

export const validateStudentData = (data) => {
  const errors = {};
  if (!data.name) errors.name = 'Name is required';
  if (!data.parentName) errors.parentName = 'Parent name is required';
  if (!validatePhone(data.parentPhone)) errors.parentPhone = 'Invalid phone number';
  if (!data.course) errors.course = 'Course is required';
  if (!data.batch) errors.batch = 'Batch is required';
  if (!data.address) errors.address = 'Address is required';
  if (isNaN(data.initialPayment) || data.initialPayment <= 0) errors.initialPayment = 'Invalid payment amount';
  return errors;
};