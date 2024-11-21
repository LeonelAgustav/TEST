const apiUrlItems = 'http://localhost:3000/items';
const apiUrlCustomers = 'http://localhost:3000/customers';
const apiUrlStaff = 'http://localhost:3000/staff';

let currentSection = 'items';

// Show the section based on menu selection
function showSection(section) {
    currentSection = section;
    document.querySelectorAll('.section').forEach(sec => sec.classList.add('hidden'));
    document.getElementById(section).classList.remove('hidden');
    fetchData(section);
}

// Go back to the homepage
function goBack() {
    document.querySelectorAll('.section').forEach(sec => sec.classList.add('hidden'));
    document.getElementById('homepage').classList.remove('hidden');
}

// Fetch data from the API
function fetchData(section) {
    let url;
    switch (section) {
        case 'items':
            url = apiUrlItems;
            break;
        case 'customers':
            url = apiUrlCustomers;
            break;
        case 'staff':
            url = apiUrlStaff;
            break;
        default:
            return;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            populateTable(section, data);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Populate the table with data
function populateTable(section, data) {
    const tableBody = document.querySelector(`#${section}Table tbody`);
    tableBody.innerHTML = '';

    data.forEach(item => {
        let row = document.createElement('tr');
        Object.keys(item).forEach(key => {
            if (key !== 'id') {
                let cell = document.createElement('td');
                cell.textContent = item[key];
                row.appendChild(cell);
            }
        });

        let actionsCell = document.createElement('td');
        actionsCell.innerHTML = `
            <button onclick="showEditModal('${section}', ${item.id})">Edit</button>
            <button onclick="deleteItem('${section}', ${item.id})">Delete</button>
        `;
        row.appendChild(actionsCell);

        tableBody.appendChild(row);
    });
}

// Add event listener for the close button
document.addEventListener('DOMContentLoaded', () => {
    const closeButton = document.querySelector('.modal__close');
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
});

// Show add modal
function showAddModal(type) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalFields = document.getElementById('modalFields');

    modal.style.display = 'flex';

    if (type === 'items') {
        modalTitle.textContent = 'Add New Item';
        modalFields.innerHTML = `
            <label for="name">Name</label>  
            <input type="text" id="name" name="name" required>
            <label for="quantity">Quantity</label>
            <input type="number" id="quantity" name="quantity" required>
            <label for="description">Description</label>
            <input type="text" id="description" name="description" required>
        `;
    } else if (type === 'customers') {
        modalTitle.textContent = 'Add New Customer';
        modalFields.innerHTML = `
            <label for="name">Name</label>
            <input type="text" id="name" name="name" required>
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
            <label for="phone">Phone</label>
            <input type="number" id="phone" name="phone" required>
            <label for="address">Address</label>
            <input type="text" id="address" name="address" required>
        `;
    } else if (type === 'staff') {
        modalTitle.textContent = 'Add New Staff';
        modalFields.innerHTML = `
            <label for="name">Name</label>
            <input type="text" id="name" name="name" required>
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
            <label for="role">Role</label>
            <input type="text" id="role" name="role" required>
            <label for="phone">Phone</label>
            <input type="number" id="phone" name="phone" required>
        `;
    }

    document.getElementById('modalForm').onsubmit = function(event) {
        event.preventDefault();
        handleAdd(event, type);
        closeModal();
    };
}

// Close modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// Handle add action
function handleAdd(event, section) {
    const form = new FormData(event.target);
    const data = {};
    form.forEach((value, key) => {
        data[key] = value;
    });

    let url;
    switch (section) {
        case 'items':
            url = apiUrlItems;
            break;
        case 'customers':
            url = apiUrlCustomers;
            break;
        case 'staff':
            url = apiUrlStaff;
            break;
        default:
            return;
    }

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(() => {
        fetchData(section);
    })
    .catch(error => console.error('Error adding data:', error));
}

// Show edit modal
function showEditModal(section, id) {
    fetch(`http://localhost:3000/${section}/${id}`)
        .then(response => response.json())
        .then(item => {
            const modal = document.getElementById('modal');
            modal.style.display = 'flex';
            document.getElementById('modalTitle').textContent = `Edit ${section.slice(0, -1).toUpperCase()}`;
            setupFormFields(section);
            fillFormFields(item);
            document.getElementById('modalForm').onsubmit = (e) => handleEdit(e, section, id);
        })
        .catch(error => console.error('Error fetching item:', error));
}

// Fill the form fields with item data for editing
function fillFormFields(item) {
    for (const key in item) {
        if (item.hasOwnProperty(key) && document.getElementById(key)) {
            document.getElementById(key).value = item[key];
        }
    }
}

// Handle edit action
function handleEdit(event, section, id) {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {};
    form.forEach((value, key) => {
        data[key] = value;
    });

    let url = `http://localhost:3000/${section}/${id}`;

    fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(() => {
        closeModal();
        fetchData(section);
    })
    .catch(error => console.error('Error updating data:', error));
}

// Delete item
function deleteItem(section, id) {
    if (confirm('Are you sure you want to delete this item?')) {
        let url = `http://localhost:3000/${section}/${id}`;

        fetch(url, { method: 'DELETE' })
        .then(response => response.json())
        .then(() => {
            fetchData(section);
        })
        .catch(error => console.error('Error deleting data:', error));
    }
}

// Search table based on input
function searchTable(section) {
    const input = document.getElementById(`search${capitalizeFirstLetter(section)}`);
    const filter = input.value.toLowerCase();
    const table = document.getElementById(`${section}Table`);
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        let row = rows[i];
        let found = false;

        for (let j = 0; j < row.cells.length - 1; j++) {
            let cell = row.cells[j];
            if (cell.textContent.toLowerCase().includes(filter)) {
                found = true;
                break;
            }
        }

        row.style.display = found ? '' : 'none';
    }
}

// Capitalize first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
