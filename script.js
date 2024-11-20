// Function to show a section based on the selected category
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.add('hidden'));

    // Show the selected section
    document.getElementById(sectionId).classList.remove('hidden');
}

// Function to go back to the homepage
function goBack() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.add('hidden'));
    document.getElementById('homepage').classList.remove('hidden');
}

// Function to show the modal for adding items, customers, or staff
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
            <label for="staffRole">Role</label>
            <input type="text" id="staffRole" name="staffRole" required>
            <label for="staffEmail">Email</label>
            <input type="email" id="staffEmail" name="staffEmail" required>
        `;
    }

    document.getElementById('modalForm').onsubmit = function(event) {
        event.preventDefault();
        // You would save the data here by calling a function to update your database (or local storage)
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

