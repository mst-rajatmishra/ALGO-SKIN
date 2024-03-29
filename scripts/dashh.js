document.addEventListener('DOMContentLoaded', function() {
  // Mock data for account list (you can replace it with actual data)
  let accountListData = [
    { id: 1, name: 'Account 1', status: 'Active', primary: true },
    { id: 2, name: 'Account 2', status: 'Inactive', primary: false },
    // Add more account data as needed
  ];

  let selectedAccount = accountListData[0]; // Initialize with the first account

  // Function to generate account list table dynamically
  function generateAccountList() {
    const table = document.getElementById('accountListTable');
    table.innerHTML = ''; // Clear previous content
    const tbody = document.createElement('tbody');

    accountListData.forEach(account => {
      const row = document.createElement('tr');
      const cellName = document.createElement('td');
      const cellStatus = document.createElement('td');
      const cellPrimary = document.createElement('td');
      const cellActions = document.createElement('td');

      cellName.textContent = account.name;
      cellStatus.textContent = account.status;
      cellPrimary.textContent = account.primary ? 'Primary' : 'Non-Primary'; // Display Primary or Non-Primary

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.className = 'btn btn-danger';
      deleteBtn.addEventListener('click', function() {
        deleteAccount(account.id);
      });

      cellActions.appendChild(deleteBtn);

      row.appendChild(cellName);
      row.appendChild(cellStatus);
      row.appendChild(cellPrimary);
      row.appendChild(cellActions);

      // Add click event listener to each row
      row.addEventListener('click', function() {
        selectedAccount = account;
        updateCurrentAccount(selectedAccount);
      });

      tbody.appendChild(row);
    });

    table.appendChild(tbody);

    // Update the current account details after generating the list
    updateCurrentAccount(selectedAccount);
  }

  // Function to update current account details
  function updateCurrentAccount(account) {
    document.getElementById('currentAccountName').textContent = account.name;
    document.getElementById('currentAccountStatus').textContent = account.status;
  }

  // Function to update account status
  function updateAccountStatus(status) {
    selectedAccount.status = status;
    generateAccountList(); // Update the account list table after status change
  }

  // Function to update primary account
  function updatePrimaryAccount(accountName) {
    accountListData.forEach(account => {
      if (account.name === accountName) {
        account.primary = true;
      } else {
        account.primary = false;
      }
    });
    generateAccountList(); // Update the account list table after primary status change
  }

  // Function to delete account
  function deleteAccount(accountId) {
    accountListData = accountListData.filter(account => account.id !== accountId);
    generateAccountList(); // Update the account list table after deletion
  }

  // Function to add new account
  function addAccount(apiKey, apiSecret, accountName) {
    const newAccountId = accountListData.length + 1; // Generate a unique ID for the new account
    const newAccount = {
      id: newAccountId,
      name: accountName,
      status: 'Active', // Assuming newly added accounts are always active
      primary: false, // New accounts are initially non-primary
      apiKey: apiKey,
      apiSecret: apiSecret,
    };
    accountListData.push(newAccount);
    generateAccountList(); // Update the account list table after addition
  }

  // Execute the function when the document is ready
  generateAccountList();

  // Event listeners for status buttons
  document.getElementById('activateBtn').addEventListener('click', function() {
    updateAccountStatus('Active');
  });

  document.getElementById('deactivateBtn').addEventListener('click', function() {
    updateAccountStatus('Inactive');
  });

  // Event listener for primary button
  document.getElementById('primaryBtn').addEventListener('click', function() {
    updatePrimaryAccount(selectedAccount.name);
  });

  // Event listener for add account button
  document.getElementById('addAccountBtn').addEventListener('click', function() {
    const apiKey = document.getElementById('apiInput').value.trim();
    const apiSecret = document.getElementById('apiSecretInput').value.trim();
    const accountName = document.getElementById('accountNameInput').value.trim();
    if (apiKey !== '' && apiSecret !== '' && accountName !== '') {
      addAccount(apiKey, apiSecret, accountName);
      // Clear input fields after adding account
      document.getElementById('apiInput').value = '';
      document.getElementById('apiSecretInput').value = '';
      document.getElementById('accountNameInput').value = '';
    } else {
      alert('Please enter valid values for API Key, API Secret, and Account Name.');
    }
  });
});
