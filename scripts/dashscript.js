// Mock data for tabs (you can replace it with actual data)
const tabsData = [
  { id: 1, name: 'Tab 1', content: [
      { stock: 'Stock A', price: '100' },
      { stock: 'Stock B', price: '150' },
      { stock: 'Stock C', price: '120' }
    ]
  },
  { id: 2, name: 'Tab 2', content: [
      { stock: 'Stock X', price: '200' },
      { stock: 'Stock Y', price: '180' },
      { stock: 'Stock Z', price: '220' }
    ]
  },
  // Add more tab data as needed
  { id: 3, name: 'Tab 3', content: [
      { stock: 'Stock D', price: '130' },
      { stock: 'Stock E', price: '110' },
      { stock: 'Stock F', price: '95' }
    ]
  },
  { id: 4, name: 'Tab 4', content: [
      { stock: 'Stock G', price: '300' },
      { stock: 'Stock H', price: '250' },
      { stock: 'Stock I', price: '280' }
    ]
  },
  { id: 5, name: 'Tab 5', content: [
      { stock: 'Stock J', price: '70' },
      { stock: 'Stock K', price: '85' },
      { stock: 'Stock L', price: '60' }
    ]
  },
  { id: 6, name: 'Tab 6', content: [
      { stock: 'Stock M', price: '180' },
      { stock: 'Stock N', price: '200' },
      { stock: 'Stock O', price: '190' }
    ]
  },
  { id: 7, name: 'Tab 7', content: [
      { stock: 'Stock P', price: '150' },
      { stock: 'Stock Q', price: '160' },
      { stock: 'Stock R', price: '140' }
    ]
  },
  { id: 8, name: 'Tab 8', content: [
      { stock: 'Stock S', price: '500' },
      { stock: 'Stock T', price: '480' },
      { stock: 'Stock U', price: '520' }
    ]
  },
  { id: 9, name: 'Tab 9', content: [
      { stock: 'Stock V', price: '75' },
      { stock: 'Stock W', price: '90' },
      { stock: 'Stock X', price: '80' }
    ]
  },
  { id: 10, name: 'Tab 10', content: [
      { stock: 'Stock Y', price: '400' },
      { stock: 'Stock Z', price: '420' },
      { stock: 'Stock A', price: '380' }
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

      // Add click event listener to show stock details
      cellStock.addEventListener('click', function() {
        showStockDetails(item);
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

    tabsContainer.appendChild(tabLink);
    contentContainer.appendChild(tabPane);

    // Add event listener to tab link
    tabLink.addEventListener('click', function(event) {
      event.preventDefault();
      
      // Remove active class from all tab links
      tabsContainer.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
      });

      // Remove active class from all tab panes
      contentContainer.querySelectorAll('.tab-pane').forEach(tab => {
        tab.classList.remove('show', 'active');
        tab.style.opacity = '0'; // Start fading out
      });

      // Add active class to the clicked tab link and corresponding tab pane
      tabLink.classList.add('active');
      tabPane.classList.add('show', 'active');
      
      // Fade in the clicked tab pane
      setTimeout(() => {
        tabPane.style.opacity = '1'; // Fade in after a short delay
      }, 50);
    });
  });

  // Add active class to the first tab initially
  tabsContainer.firstChild.classList.add('active');
  contentContainer.firstChild.classList.add('show', 'active');
}



// Function to show stock details
function showStockDetails(stock) {
  const detailsContainer = document.getElementById('stockDetails');
  detailsContainer.innerHTML = `
    <div class="stock-details">
      <h4>${stock.stock} Details</h4>
      <table class="table">
        <tr>
          <td>Current Price:</td>
          <td>${stock.price}</td>
        </tr>
        <tr>
          <td>Quantity:</td>
          <td><input type="number" id="quantityInput" value="${stock.quantity}"></td>
        </tr>
        <tr>
          <td>Margin:</td>
          <td><input type="number" id="marginInput" value="${stock.margin}"></td>
        </tr>
        <tr>
          <td>Market Depth:</td>
          <td><input type="checkbox" id="marketDepthCheckbox"></td>
        </tr>
        <tr>
          <td>Final Price:</td>
          <td><input type="number" id="finalPriceInput" value="${calculateFinalPrice(stock.quantity, stock.price, stock.margin)}" readonly></td>
        </tr>
      </table>
      <button class="btn btn-primary mt-3" onclick="buyOrSell('buy')">Buy</button>
      <button class="btn btn-danger mt-3 ml-3" onclick="buyOrSell('sell')">Sell</button>
    </div>
  `;

  // Add event listeners for quantity and margin inputs
  const quantityInput = document.getElementById('quantityInput');
  const marginInput = document.getElementById('marginInput');
  const finalPriceInput = document.getElementById('finalPriceInput');
  const marketDepthCheckbox = document.getElementById('marketDepthCheckbox');

  quantityInput.addEventListener('input', updateFinalPrice);
  marginInput.addEventListener('input', updateFinalPrice);
  marketDepthCheckbox.addEventListener('change', updateFinalPrice);

  function updateFinalPrice() {
    if (marketDepthCheckbox.checked) {
      marginInput.disabled = true;
      finalPriceInput.value = calculateFinalPrice(parseInt(quantityInput.value), parseInt(stock.price), 0); // 0 margin
    } else {
      marginInput.disabled = false;
      finalPriceInput.value = calculateFinalPrice(parseInt(quantityInput.value), parseInt(stock.price), parseInt(marginInput.value));
    }
  }
}

// Function to calculate final price
function calculateFinalPrice(quantity, price, margin) {
  return (quantity * price) * (1 + (margin / 100));
}

// Function to handle buy or sell button click
function buyOrSell(action) {
  const quantity = document.getElementById('quantityInput').value;
  const margin = document.getElementById('marginInput').value;
  const marketDepthChecked = document.getElementById('marketDepthCheckbox').checked;

  // Perform actions based on the selected action (buy or sell)
  if (action === 'buy') {
    // Add your buy logic here
    console.log(`Buying ${quantity} stocks with margin ${margin}, Market Depth: ${marketDepthChecked}`);
  } else if (action === 'sell') {
    // Add xyour sell logic here
    console.log(`Selling ${quantity} stocks with margin ${margin}, Market Depth: ${marketDepthChecked}`);
  }
}

// Execute the function when the document is ready
document.addEventListener('DOMContentLoaded', function() {
  generateTabs();
});
