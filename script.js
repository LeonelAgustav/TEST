// Mock Data (Database Simulation)
const inventory = [
    { id: 1, productName: 'Laptop', location: 'Warehouse A', onHand: 50, toOrder: 20 },
    { id: 2, productName: 'Mouse', location: 'Warehouse B', onHand: 150, toOrder: 100 }
];

const customers = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' }
];

const staff = [
    { id: 1, name: 'Alice Johnson', role: 'Manager', email: 'alice.johnson@example.com' },
    { id: 2, name: 'Bob Brown', role: 'Assistant', email: 'bob.brown@example.com' }
];

// Function to show a section based on the selected category
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.add('hidden'));

    // Show the selected section
    document.getElementById(sectionId).classList.remove('hidden');

    // Update table data based on the section selected
    if (sectionId === 'items') {
        renderTable('items', inventory);
    } else if (sectionId === 'customers') {
        renderTable('customers', customers);
    } else if (sectionId === 'staff') {
        renderTable('staff', staff);
    }
}

// Function to render data in a table
function renderTable(type, data) {
    const tableBody = document.querySelector(`#${type} tbody`);
    tableBody.innerHTML = ''; // Clear existing rows

    data.forEach(item => {
        const row = document.createElement('tr');
        if (type === 'items') {
            row.innerHTML = `
                <td>${item.productName}</td>
                <td>${item.location}</td>
                <td>${item.onHand}</td>
                <td>${item.toOrder}</td>
                <td>
                    <button onclick="editItem(${item.id})">Edit</button>
                    <button onclick="deleteItem(${item.id})">Delete</button>
                </td>
            `;
        } else if (type === 'customers') {
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td>
                    <button onclick="editCustomer(${item.id})">Edit</button>
                    <button onclick="deleteCustomer(${item.id})">Delete</button>
                </td>
            `;
        } else if (type === 'staff') {
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.role}</td>
                <td>${item.email}</td>
                <td>
                    <button onclick="editStaff(${item.id})">Edit</button>
                    <button onclick="deleteStaff(${item.id})">Delete</button>
                </td>
            `;
        }
        tableBody.appendChild(row);
    });
}

// Function to go back to the homepage
function goBack() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.add('hidden'));
    document.getElementById('homepage').classList.remove('hidden');
}

// Add Modal Functionality
function showAddModal(type) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalFields = document.getElementById('modalFields');

    modal.style.display = 'flex';

    if (type === 'items') {
        modalTitle.textContent = 'Add New Item';
        modalFields.innerHTML = `
            <label for="productName">Product Name</label>
            <input type="text" id="productName" name="productName" required>
            <label for="location">Location</label>
            <input type="text" id="location" name="location" required>
            <label for="onHand">On Hand</label>
            <input type="number" id="onHand" name="onHand" required>
            <label for="toOrder">To Order</label>
            <input type="number" id="toOrder" name="toOrder" required>
        `;
    } else if (type === 'customers') {
        modalTitle.textContent = 'Add New Customer';
        modalFields.innerHTML = `
            <label for="customerName">Customer Name</label>
            <input type="text" id="customerName" name="customerName" required>
            <label for="customerEmail">Email</label>
            <input type="email" id="customerEmail" name="customerEmail" required>
        `;
    } else if (type === 'staff') {
        modalTitle.textContent = 'Add New Staff';
        modalFields.innerHTML = `
            <label for="staffName">Staff Name</label>
            <input type="text" id="staffName" name="staffName" required>
            <label for="staffRole">Role</label>
            <input type="text" id="staffRole" name="staffRole" required>
            <label for="staffEmail">Email</label>
            <input type="email" id="staffEmail" name="staffEmail" required>
        `;
    }

    document.getElementById('modalForm').onsubmit = function(event) {
        event.preventDefault();
        // Handle form submission for adding data to respective sections
        if (type === 'items') {
            // Add item logic
        } else if (type === 'customers') {
            // Add customer logic
        } else if (type === 'staff') {
            // Add staff logic
        }
        hideModal();
    };
}

// Function to hide the modal
function hideModal() {
    document.getElementById('modal').style.display = 'none';
}

// Function to search a table for specific text
function searchTable(type) {
    const searchTerm = document.querySelector(`#${type} .search-input`).value.toLowerCase();
    const table = document.querySelector(`#${type} table`);
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName('td');
        let match = false;

        for (let j = 0; j < cells.length; j++) {
            if (cells[j].innerText.toLowerCase().includes(searchTerm)) {
                match = true;
                break;
            }
        }

        rows[i].style.display = match ? '' : 'none';
    }
}

// Edit and Delete Functions
function editItem(id) {
    const item = inventory.find(i => i.id === id);
    if (item) {
        // Edit logic for item
    }
}

function deleteItem(id) {
    const index = inventory.findIndex(i => i.id === id);
    if (index !== -1) {
        inventory.splice(index, 1);
        renderTable('items', inventory);
    }
}

function editCustomer(id) {
    const customer = customers.find(c => c.id === id);
    if (customer) {
        // Edit logic for customer
    }
}

function deleteCustomer(id) {
    const index = customers.findIndex(c => c.id === id);
    if (index !== -1) {
        customers.splice(index, 1);
        renderTable('customers', customers);
    }
}

function editStaff(id) {
    const staffMember = staff.find(s => s.id === id);
    if (staffMember) {
        // Edit logic for staff
    }
}

function deleteStaff(id) {
    const index = staff.findIndex(s => s.id === id);
    if (index !== -1) {
        staff.splice(index, 1);
        renderTable('staff', staff);
    }
}
