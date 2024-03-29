// Mock data for tabs (you can replace it with actual data)
const tabsData = [
  { id: 1, name: 'Tab 1', content: [
      { stock: 'Stock A', price: '$100' },
      { stock: 'Stock B', price: '$150' },
      { stock: 'Stock C', price: '$120' }
    ]
  },
  { id: 2, name: 'Tab 2', content: [
      { stock: 'Stock X', price: '$200' },
      { stock: 'Stock Y', price: '$180' },
      { stock: 'Stock Z', price: '$220' }
    ]
  },
  // Add more tab data as needed
  { id: 3, name: 'Tab 3', content: [
      { stock: 'Stock D', price: '$130' },
      { stock: 'Stock E', price: '$110' },
      { stock: 'Stock F', price: '$95' }
    ]
  },
  { id: 4, name: 'Tab 4', content: [
      { stock: 'Stock G', price: '$300' },
      { stock: 'Stock H', price: '$250' },
      { stock: 'Stock I', price: '$280' }
    ]
  },
  { id: 5, name: 'Tab 5', content: [
      { stock: 'Stock J', price: '$70' },
      { stock: 'Stock K', price: '$85' },
      { stock: 'Stock L', price: '$60' }
    ]
  },
  { id: 6, name: 'Tab 6', content: [
      { stock: 'Stock M', price: '$180' },
      { stock: 'Stock N', price: '$200' },
      { stock: 'Stock O', price: '$190' }
    ]
  },
  { id: 7, name: 'Tab 7', content: [
      { stock: 'Stock P', price: '$150' },
      { stock: 'Stock Q', price: '$160' },
      { stock: 'Stock R', price: '$140' }
    ]
  },
  { id: 8, name: 'Tab 8', content: [
      { stock: 'Stock S', price: '$500' },
      { stock: 'Stock T', price: '$480' },
      { stock: 'Stock U', price: '$520' }
    ]
  },
  { id: 9, name: 'Tab 9', content: [
      { stock: 'Stock V', price: '$75' },
      { stock: 'Stock W', price: '$90' },
      { stock: 'Stock X', price: '$80' }
    ]
  },
  { id: 10, name: 'Tab 10', content: [
      { stock: 'Stock Y', price: '$400' },
      { stock: 'Stock Z', price: '$420' },
      { stock: 'Stock A', price: '$380' }
    ]
  }
];

// Function to generate tabs and tab content dynamically
function generateTabs() {
  const tabsContainer = document.getElementById('wishlistTabs');
  const contentContainer = document.getElementById('wishlistContent');

  tabsData.forEach(tab => {
    const tabLink = document.createElement('a');
    tabLink.classList.add('nav-item', 'nav-link');
    tabLink.setAttribute('data-toggle', 'tab');
    tabLink.setAttribute('href', `#tab${tab.id}`);
    tabLink.textContent = tab.name;

    const tabPane = document.createElement('div');
    tabPane.classList.add('tab-pane', 'fade');
    tabPane.setAttribute('id', `tab${tab.id}`);

    // Create table for stocks and prices
    const table = document.createElement('table');
    table.classList.add('table', 'table-bordered', 'mt-3');

    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const thStocks = document.createElement('th');
    thStocks.textContent = 'Stocks';
    const thPrice = document.createElement('th');
    thPrice.textContent = 'Price';
    headerRow.appendChild(thStocks);
    headerRow.appendChild(thPrice);
    thead.appendChild(headerRow);

    // Create table body
    const tbody = document.createElement('tbody');
    tab.content.forEach(item => {
      const row = document.createElement('tr');
      const cellStock = document.createElement('td');
      cellStock.textContent = item.stock;
      cellStock.style.cursor = 'pointer'; // Add cursor pointer for clickable effect
      cellStock.addEventListener('click', function() {
        // Redirect to stock details page
        redirectToStockPage(item);
      });
      const cellPrice = document.createElement('td');
      cellPrice.textContent = item.price;
      row.appendChild(cellStock);
      row.appendChild(cellPrice);
      tbody.appendChild(row);
    });

    // Append header and body to table
    table.appendChild(thead);
    table.appendChild(tbody);
    
    tabPane.appendChild(table);

    tabLink.addEventListener('click', function(event) {
      event.preventDefault();
      closeOtherTabs();
      tabLink.classList.add('active');
      tabPane.classList.add('show', 'active');
    });

    tabsContainer.appendChild(tabLink);
    contentContainer.appendChild(tabPane);
  });

  tabsContainer.firstChild.classList.add('active');
  contentContainer.firstChild.classList.add('show', 'active');
}

// Function to close other tabs
function closeOtherTabs() {
  const tabsContainer = document.getElementById('wishlistTabs');
  const contentContainer = document.getElementById('wishlistContent');

  tabsContainer.querySelectorAll('.nav-link').forEach(tab => {
    tab.classList.remove('active');
  });

  contentContainer.querySelectorAll('.tab-pane').forEach(tabPane => {
    tabPane.classList.remove('show', 'active');
  });
}

// Function to redirect to stock details page
function redirectToStockPage(stockData) {
  // Redirect to stock.html and pass stock data as query parameters
  const queryString = new URLSearchParams(stockData).toString();
  window.location.href = `stock.html?${queryString}`;
}

// Function to get stock data from query parameters and populate the page
function populateStockPage() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const stockName = urlParams.get('stock');
  const currentPrice = urlParams.get('price');

  // Populate stock details on the page
  document.getElementById('stockName').value = stockName || '';
  document.getElementById('currentPrice').value = currentPrice || '';
}

// Function to simulate buying/selling stock
function buySellStock() {
  // Implement buy/sell logic as needed
  alert('Buy/Sell functionality to be implemented.');
}

// Execute the function when the document is ready
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.includes('stock.html')) {
    // Populate stock page if on stock.html
    populateStockPage();
  } else {
    // Generate tabs if on dashboard.html
    generateTabs();
  }
});
