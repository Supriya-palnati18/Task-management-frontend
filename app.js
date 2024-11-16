// Create a new task
document.getElementById('create-task-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const priority = document.getElementById('task-priority').value;
    const status = document.getElementById('task-status').value;
    const deadline = document.getElementById('task-deadline').value;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, description, priority, status, deadline })
        });

        // Check if response is OK
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error Response:', errorData);
            alert(`Error creating task: ${errorData.detail || 'Unknown error'}`);
            return;
        }

        const newTask = await response.json();
        alert('Task created successfully!');

        // Update task list dynamically
        fetchTasks();

        // Reset the form and close the modal
        document.getElementById('create-task-form').reset();
        const modal = document.getElementById('createTaskModal');
        const modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance.hide();
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred while creating the task. Please try again later.');
    }
});
