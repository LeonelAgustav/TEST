const inventory = [
    { id: 1, productName: 'Laptop', location: 'Warehouse A', onHand: 50, toOrder: 20 },
    { id: 2, productName: 'Mouse', location: 'Warehouse B', onHand: 150, toOrder: 100 }
];

const customers = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' }
];

const staff = [
    { id: 1, role: 'Manager', email: 'manager@example.com' },
    { id: 2, role: 'Assistant', email: 'assistant@example.com' }
];

// Sample functions to fetch the data for each section (items, customers, staff)
function getInventory() {
    return inventory;
}

function getCustomers() {
    return customers;
}

function getStaff() {
    return staff;
}
