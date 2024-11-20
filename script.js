// Simulating Database for staff, items, and customers
const staff = [
    { id: 1, name: 'John Doe', role: 'Manager', email: 'manager@example.com' },
    { id: 2, name: 'Jane Smith', role: 'Assistant', email: 'assistant@example.com' }
];

const items = [
    { id: 1, product: 'Laptop', location: 'A1', onHand: 50, toOrder: 20 },
    { id: 2, product: 'Phone', location: 'B2', onHand: 30, toOrder: 15 }
];

const customers = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 2, name: 'Bob Lee', email: 'bob@example.com' }
];

// Load Staff, Items, or Customers Data
function loadData(type) {
    let data = [];
    let tableBody = null;
    
    if (type === 'staff') {
        data = staff;
        tableBody = document.querySelector('#staffTable tbody');
    } else if (type === 'items') {
        data = items;
        tableBody = document.querySelector('#itemsTable tbody');
    } else if (type === 'customers') {
        data = customers;
        tableBody = document.querySelector('#customersTable tbody');
    }
    
    tableBody.innerHTML = '';
    
    data.forEach(item => {
        const row = document.createElement('tr');
        
        if (type === 'staff') {
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.role}</td>
                <td>${item.email}</td>
                <td>
                    <button onclick="editItem(${item.id}, '${type}')" class="btn btn-secondary">Edit</button>
                    <button onclick="deleteItem(${item.id}, '${type}')" class="btn btn-danger">Delete</button>
                </td>
            `;
        } else if (type === 'items') {
            row.innerHTML = `
                <td>${item.product}</td>
                <td>${item.location}</td>
                <td>${item.onHand}</td>
                <td>${item.toOrder}</td>
                <td>
                    <button onclick="editItem(${item.id}, '${type}')" class="btn btn-secondary">Edit</button>
                    <button onclick="deleteItem(${item.id}, '${type}')" class="btn btn-danger">Delete</button>
                </td>
            `;
        } else if (type === 'customers') {
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td>
                    <button onclick="editItem(${item.id}, '${type}')" class="btn btn-secondary">Edit</button>
                    <button onclick="deleteItem(${item.id}, '${type}')" class="btn btn-danger">Delete</button>
                </td>
            `;
        }
        
        tableBody.appendChild(row);
    });
}

// Show a specific section
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
    loadData(sectionId);  // Load data when section is shown
}

// Go Back to Homepage
function goBack() {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById('homepage').classList.remove('hidden');
}

// Modal handling
function showAddModal(type) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalFields = document.getElementById('modalFields');

    modal.style.display = 'flex';

    if (type === 'staff') {
        modalTitle.textContent = 'Add New Staff';
        modalFields.innerHTML = `
            <label for="staffName">Name</label>
            <input type="text" id="staffName" name="staffName" required>
            <label for="staffRole">Role</label>
            <input type="text" id="staffRole" name="staffRole" required>
            <label for="staffEmail">Email</label>
            <input type="email" id="staffEmail" name="staffEmail" required>
        `;
    } else if (type === 'items') {
        modalTitle.textContent = 'Add New Item';
        modalFields.innerHTML = `
            <label for="productName">Product</label>
            <input type="text" id="productName" name="productName" required>
            <label for="productLocation">Location</label>
            <input type="text" id="productLocation" name="productLocation" required>
            <label for="onHand">On Hand</label>
            <input type="number" id="onHand" name="onHand" required>
            <label for="toOrder">To Order</label>
            <input type="number" id="toOrder" name="toOrder" required>
        `;
    } else if (type === 'customers') {
        modalTitle.textContent = 'Add New Customer';
        modalFields.innerHTML = `
            <label for="customerName">Name</label>
            <input type="text" id="customerName" name="customerName" required>
            <label for="customerEmail">Email</label>
            <input type="email" id="customerEmail" name="customerEmail" required>
        `;
    }
}

// Hide the Modal
function hideModal() {
    document.getElementById('modal').style.display = 'none';
}

// Add new item functionality
document.getElementById('modalForm').onsubmit = function(event) {
    event.preventDefault();

    // Add new item to database (array in this case)
    if (document.getElementById('staffName')) {
        const name = document.getElementById('staffName').value;
        const role = document.getElementById('staffRole').value;
        const email = document.getElementById('staffEmail').value;

        const newStaff = { id: staff.length + 1, name, role, email };
        staff.push(newStaff);
        loadData('staff');
    } else if (document.getElementById('productName')) {
        const product = document.getElementById('productName').value;
        const location = document.getElementById('productLocation').value;
        const onHand = document.getElementById('onHand').value;
        const toOrder = document.getElementById('toOrder').value;

        const newItem = { id: items.length + 1, product, location, onHand, toOrder };
        items.push(newItem);
        loadData('items');
    } else if (document.getElementById('customerName')) {
        const name = document.getElementById('customerName').value;
        const email = document.getElementById('customerEmail').value;

        const newCustomer = { id: customers.length + 1, name, email };
        customers.push(newCustomer);
        loadData('customers');
    }

    hideModal();
};

// On document load, show the homepage
document.addEventListener('DOMContentLoaded', () => {
    showSection('homepage');
});
