// Simulating Database for staff, items, and customers
const staff = [
    { id: 1, name: 'John Doe', role: 'Manager', email: 'manager@example.com' },
    { id: 2, name: 'Jane Smith', role: 'Assistant', email: 'assistant@example.com' }
];

// Load Staff Data
function loadStaffData() {
    const staffData = staff;
    const staffTableBody = document.querySelector('#staffTable tbody');
    staffTableBody.innerHTML = '';

    staffData.forEach(staff => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${staff.name}</td>
            <td>${staff.role}</td>
            <td>${staff.email}</td>
            <td>
                <button onclick="editStaff(${staff.id})" class="btn btn-secondary">Edit</button>
                <button onclick="deleteStaff(${staff.id})" class="btn btn-danger">Delete</button>
            </td>
        `;
        staffTableBody.appendChild(row);
    });
}

// Show a specific section
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
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
    }
}

// Hide the Modal
function hideModal() {
    document.getElementById('modal').style.display = 'none';
}

// Add new staff functionality
document.getElementById('modalForm').onsubmit = function(event) {
    event.preventDefault();

    const name = document.getElementById('staffName').value;
    const role = document.getElementById('staffRole').value;
    const email = document.getElementById('staffEmail').value;

    // Add new staff to database (array in this case)
    const newStaff = { id: staff.length + 1, name, role, email };
    staff.push(newStaff);

    loadStaffData();  // Reload staff data

    hideModal();  // Close the modal
};

// On document load, show the homepage
document.addEventListener('DOMContentLoaded', () => {
    showSection('homepage');
});
