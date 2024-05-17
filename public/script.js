const employeeForm = document.getElementById('add');
const employeeTable = document.querySelector('#view tbody');

// Load existing employees from localStorage when the page loads
document.addEventListener('DOMContentLoaded', function () {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    employees.forEach(addEmployeeToTable);
});

employeeForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;

    const newEmployee = {
        name: name,
        email: email,
        age: age
    };

    addEmployeeToTable(newEmployee);

    // Reset form fields
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('age').value = '';

    // Save employees to localStorage
    saveEmployeesToLocalStorage(newEmployee);

    employeeForm.reset();
});


function addEmployeeToTable(employee) {
    const tableRow = document.createElement('tr');

    const nameCell = document.createElement('td');
    const emailCell = document.createElement('td');
    const ageCell = document.createElement('td');
    const actionCell = document.createElement('td');

    // Add Tailwind classes to elements
    tableRow.classList.add('border-b', 'text-gray-700',); // For table row
    nameCell.classList.add('px-3', 'sm:px-6', 'py-4'); // For name cell
    emailCell.classList.add('px-3', 'sm:px-6', 'py-4'); // For email cell
    ageCell.classList.add('px-3', 'sm:px-6', 'py-4'); // For age cell
    actionCell.classList.add('px-3', 'sm:px-6', 'py-4', 'hover:scale-125', 'duration-200'); // For action cell

    nameCell.textContent = employee.name;
    emailCell.textContent = employee.email;
    ageCell.textContent = employee.age;

    const deleteButton = document.createElement('img');
    deleteButton.src = '../images/delete.svg';
    deleteButton.alt = 'Delete';
    deleteButton.classList.add('w-6', 'mx-auto', 'cursor-pointer');

    deleteButton.addEventListener('click', function () {
        
        tableRow.classList.add('delete-animation');
        tableRow.addEventListener('animationend', function() {
            tableRow.remove();
        });
        // Remove the employee from localStorage
        removeEmployeeFromLocalStorage(employee);
    });

    actionCell.appendChild(deleteButton);

    tableRow.appendChild(nameCell);
    tableRow.appendChild(emailCell);
    tableRow.appendChild(ageCell);
    tableRow.appendChild(actionCell);

    employeeTable.appendChild(tableRow);
}

function saveEmployeesToLocalStorage(employee) {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    employees.push(employee);
    localStorage.setItem('employees', JSON.stringify(employees));
}

function removeEmployeeFromLocalStorage(employeeToRemove) {
    let employees = JSON.parse(localStorage.getItem('employees')) || [];
    employees = employees.filter(employee => employee.name !== employeeToRemove.name ||
        employee.email !== employeeToRemove.email ||
        employee.age !== employeeToRemove.age);
    localStorage.setItem('employees', JSON.stringify(employees));
}
