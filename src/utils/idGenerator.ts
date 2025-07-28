export const generateEmployeeId = async (roleCode, lastId) => {
  const increment = lastId ? parseInt(lastId.slice(-3)) + 1 : 1;
  const paddedIncrement = increment.toString().padStart(3, '0');
  return `NT${roleCode}${paddedIncrement}`;
};

export const generateStudentId = async (branchId, lastId) => {
  const paddedBranchId = branchId.padStart(3, '0');
  const increment = lastId ? parseInt(lastId.slice(-3)) + 1 : 1;
  const paddedIncrement = increment.toString().padStart(3, '0');
  return `NT${paddedBranchId}${paddedIncrement}`;
};

export const generateReceiptId = async (branchId, lastId) => {
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const paddedBranchId = branchId.padStart(3, '0');
  const increment = lastId ? parseInt(lastId.split('-')[3]) + 1 : 1;
  const paddedIncrement = increment.toString().padStart(3, '0');
  return `RCP-${paddedBranchId}-${today}-${paddedIncrement}`;
};

export const generateSalaryPaymentId = (employeeId, month, year) => {
  const paddedMonth = month.padStart(2, '0');
  return `SAL-${year}${paddedMonth}-${employeeId}`;
};