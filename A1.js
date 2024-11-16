document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("studentForm");
    const studentRecords = document.getElementById("studentRecords");
    const recordsContainer = document.querySelector(".records-container");
  
    // Load data from localStorage
    const loadRecords = () => {
      const records = JSON.parse(localStorage.getItem("students")) || [];
      studentRecords.innerHTML = "";
      records.forEach((student, index) => addRecordToTable(student, index));
      updateScrollbar();  // Update the scrollbar after loading records
    };
  
    // Save data to localStorage
    const saveRecords = (records) => {
      localStorage.setItem("students", JSON.stringify(records));
    };
  
    // Add a record to the table
    const addRecordToTable = (student, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.id}</td>
        <td>${student.email}</td>
        <td>${student.contact}</td>
        <td>
          <button onclick="editRecord(${index})">Edit</button>
          <button onclick="deleteRecord(${index})">Delete</button>
        </td>
      `;
      studentRecords.appendChild(row);
    };
  
    // Update scrollbar dynamically based on the number of records
    const updateScrollbar = () => {
      const recordsCount = studentRecords.children.length;
      const maxRecords = 10;  // Adjust this to control when the scrollbar appears
      
      if (recordsCount > maxRecords) {
        recordsContainer.style.maxHeight = '300px';  // Set max-height to enable scrolling
        recordsContainer.style.overflowY = 'auto';  // Enable vertical scrollbar
      } else {
        recordsContainer.style.maxHeight = '';  // Remove max-height when there's enough space
        recordsContainer.style.overflowY = '';  // Disable vertical scrollbar
      }
    };
  
    // Add new record
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.studentName.value.trim();
      const id = form.studentID.value.trim();
      const email = form.email.value.trim();
      const contact = form.contactNo.value.trim();
  
      // Validate inputs
      if (!/^[a-zA-Z\s]+$/.test(name)) {
        alert("Name must contain only letters and spaces.");
        return;
      }
      if (!/^\d+$/.test(id)) {
        alert("Student ID must contain only numbers.");
        return;
      }
      if (!/^\d{10}$/.test(contact)) {
        alert("Contact No must be a valid 10-digit number.");
        return;
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        alert("Invalid email address.");
        return;
      }
  
      const newStudent = { name, id, email, contact };
      const records = JSON.parse(localStorage.getItem("students")) || [];
      records.push(newStudent);
      saveRecords(records);
      addRecordToTable(newStudent, records.length - 1);
      form.reset();
      updateScrollbar();  // Update the scrollbar after adding a new record
    });
  
    // Edit record
    window.editRecord = (index) => {
      const records = JSON.parse(localStorage.getItem("students")) || [];
      const student = records[index];
      form.studentName.value = student.name;
      form.studentID.value = student.id;
      form.email.value = student.email;
      form.contactNo.value = student.contact;
  
      records.splice(index, 1); // Remove the record temporarily
      saveRecords(records);
      loadRecords(); // Reload the table
    };
  
    // Delete record
    window.deleteRecord = (index) => {
      const records = JSON.parse(localStorage.getItem("students")) || [];
      records.splice(index, 1);
      saveRecords(records);
      loadRecords();
    };
  
    // Load records on page load
    loadRecords();
  });
  