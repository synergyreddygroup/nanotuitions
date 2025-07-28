// A simple ID generator. For production, consider using a UUID library or Firebase's built-in IDs.
const idGenerator = {
  generateStudentId: (branchCode = 'NT') => {
    const timestamp = Date.now().toString().slice(-6); // Last 6 digits of timestamp
    const random = Math.floor(1000 + Math.random() * 9000); // 4 random digits
    return `${branchCode}-${timestamp}-${random}`;
  },
  generateEmployeeId: (prefix = 'EMP') => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(100 + Math.random() * 900); // 3 random digits
    return `${prefix}-${timestamp}-${random}`;
  },
  generateBranchId: (prefix = 'BR') => {
    const timestamp = Date.now().toString().slice(-5);
    const random = Math.floor(10 + Math.random() * 90); // 2 random digits
    return `${prefix}-${timestamp}-${random}`;
  },
  generateReceiptId: (prefix = 'REC') => {
    const timestamp = Date.now().toString().slice(-7);
    const random = Math.floor(10000 + Math.random() * 90000); // 5 random digits
    return `${prefix}-${timestamp}-${random}`;
  },
  // Add more ID generators as needed
};

export default idGenerator;