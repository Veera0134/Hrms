const CLAIMS_STORAGE_KEY = 'claimsData';

function initializeClaimsData() {
  if (!localStorage.getItem(CLAIMS_STORAGE_KEY)) {
    const initialClaims = [
      {
        id: 1,
        employeeId: 'EMP001',
        employeeName: 'John Doe',
        title: 'Travel Expense Reimbursement',
        date: '2025-05-15',
        amount: 450.75,
        category: 'Travel',
        description: 'Expenses for client meeting in New York including flight, hotel, and meals.',
        status: 'pending',
        response: '',
        attachments: []
      },
      {
        id: 2,
        employeeId: 'EMP002',
        employeeName: 'Jane Smith',
        title: 'Office Supplies Purchase',
        date: '2025-05-10',
        amount: 125.30,
        category: 'Office Supplies',
        description: 'Purchased notebooks, pens, and printer paper for the marketing department.',
        status: 'approved',
        response: 'Approved. Reimbursement will be processed in the next payroll cycle.',
        attachments: []
      },
      {
        id: 3,
        employeeId: 'EMP001',
        employeeName: 'John Doe',
        title: 'Training Course Fee',
        date: '2025-05-05',
        amount: 750.00,
        category: 'Training',
        description: 'Fee for Advanced Project Management certification course.',
        status: 'rejected',
        response: 'Rejected. This training was not pre-approved by your department manager.',
        attachments: []
      }
    ];
    
    localStorage.setItem(CLAIMS_STORAGE_KEY, JSON.stringify(initialClaims));
  }
}

function getAllClaims() {
  const claimsData = localStorage.getItem(CLAIMS_STORAGE_KEY);
  return claimsData ? JSON.parse(claimsData) : [];
}

function getEmployeeClaims(employeeId) {
  const claims = getAllClaims();
  return claims.filter(claim => claim.employeeId === employeeId);
}

function addClaim(claimData) {
  const claims = getAllClaims();
  const newId = claims.length > 0 ? Math.max(...claims.map(c => c.id)) + 1 : 1;
  
  const newClaim = {
    id: newId,
    ...claimData,
    status: 'pending',
    response: '',
    date: new Date().toISOString().split('T')[0]
  };
  
  claims.push(newClaim);
  localStorage.setItem(CLAIMS_STORAGE_KEY, JSON.stringify(claims));
  
  return newClaim;
}

function updateClaimStatus(claimId, status, response) {
  const claims = getAllClaims();
  const claimIndex = claims.findIndex(c => c.id === claimId);
  
  if (claimIndex !== -1) {
    claims[claimIndex].status = status;
    claims[claimIndex].response = response;
    localStorage.setItem(CLAIMS_STORAGE_KEY, JSON.stringify(claims));
    return true;
  }
  
  return false;
}

function getClaimById(claimId) {
  const claims = getAllClaims();
  return claims.find(c => c.id === claimId);
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function showNotification(message, isError = false) {
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  const notification = document.createElement('div');
  notification.className = `notification ${isError ? 'error' : ''}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

document.addEventListener('DOMContentLoaded', initializeClaimsData);