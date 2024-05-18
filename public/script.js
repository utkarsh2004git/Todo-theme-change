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

    // Define the cells
    const nameCell = document.createElement('td');
    const emailCell = document.createElement('td');
    const ageCell = document.createElement('td');
    const actionCell = document.createElement('td');

    // Add Tailwind classes to table row and cells
    tableRow.classList.add('border-b', 'text-gray-700');
    nameCell.classList.add('px-3', 'sm:px-6', 'py-4', 'whitespace-nowrap', 'overflow-hidden', 'max-w-xs');
    emailCell.classList.add('px-3', 'sm:px-6', 'py-4', 'whitespace-nowrap', 'overflow-hidden', 'max-w-xs');
    ageCell.classList.add('px-3', 'sm:px-6', 'py-4', 'whitespace-nowrap');
    actionCell.classList.add('px-3', 'sm:px-6', 'py-4', 'whitespace-nowrap', 'text-center');

    // Create divs inside the cells with text-ellipsis and width classes
    const nameDiv = document.createElement('div');
    const emailDiv = document.createElement('div');
    const ageDiv = document.createElement('div');

    nameDiv.classList.add('text-ellipsis', 'w-[5.2rem]', 'sm:w-full');
    emailDiv.classList.add('text-ellipsis', 'w-[5.2rem]', 'sm:w-full');
    ageDiv.classList.add('text-center');

    // Set the text content of the divs
    nameDiv.textContent = employee.name;
    emailDiv.textContent = employee.email;
    ageDiv.textContent = employee.age;

    // Append divs to cells
    nameCell.appendChild(nameDiv);
    emailCell.appendChild(emailDiv);
    ageCell.appendChild(ageDiv);

    // Create the delete button for the action cell
    const deleteButton = document.createElement('img');
    deleteButton.src = '../images/delete.svg';
    deleteButton.alt = 'Delete';
    deleteButton.classList.add('w-6', 'mx-auto', 'cursor-pointer', 'hover:scale-125', 'duration-200');

    // Add delete functionality
    deleteButton.addEventListener('click', function () {
        tableRow.classList.add('delete-animation');
        tableRow.addEventListener('animationend', function() {
            tableRow.remove();
        });
        // Remove the employee from localStorage
        removeEmployeeFromLocalStorage(employee);
    });

    actionCell.appendChild(deleteButton);

    // Append cells to the row
    tableRow.appendChild(nameCell);
    tableRow.appendChild(emailCell);
    tableRow.appendChild(ageCell);
    tableRow.appendChild(actionCell);

    // Append the row to the table
    const employeeTable = document.getElementById('employeeTable');
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
