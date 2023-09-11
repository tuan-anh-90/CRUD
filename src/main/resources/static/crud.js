// Function to fetch and display the user list in a table
function fetchUsers() {
    fetch('http://localhost:8081/api/users/') // Thay đổi URL tới API của bạn
        .then(response => response.json())
        .then(users => {
            const tableBody = document.getElementById('user-list');
            tableBody.innerHTML = ''; // Xóa nội dung tbody hiện có
            users.forEach(user => {
                const row = document.createElement('tr'); // Tạo một hàng mới

                // Tạo các ô dữ liệu cho mỗi trường người dùng
                const idCell = document.createElement('td');
                idCell.textContent = user.id;
                const usernameCell = document.createElement('td');
                usernameCell.textContent = user.username;
                const nameCell = document.createElement('td');
                nameCell.textContent = user.name;

                // Thêm các ô vào hàng
                row.appendChild(idCell);
                row.appendChild(usernameCell);
                row.appendChild(nameCell);

                // Tạo ô chứa các thẻ <a> "View", "Edit", và "Delete" và thêm chúng vào ô thích hợp
                const actionsCell = document.createElement('td');
                
                const viewLink = document.createElement('a');
                viewLink.href = '#';
                viewLink.className = 'view';
                viewLink.title = 'View';
                const viewIcon = document.createElement('i');
                viewIcon.className = 'material-icons';
                viewIcon.textContent = 'visibility';
                viewLink.appendChild(viewIcon);
                actionsCell.appendChild(viewLink);

                const editLink = document.createElement('a');
                editLink.href = '#';
                editLink.className = 'edit';
                editLink.title = 'Edit';
                const editIcon = document.createElement('i');
                editIcon.className = 'material-icons';
                editIcon.textContent = 'edit';
                editLink.appendChild(editIcon);
                actionsCell.appendChild(editLink);

                const deleteLink = document.createElement('a');
                deleteLink.href = '#';
                deleteLink.className = 'delete';
                deleteLink.title = 'Delete';
                const deleteIcon = document.createElement('i');
                deleteIcon.className = 'material-icons';
                deleteIcon.textContent = 'delete';
                deleteLink.appendChild(deleteIcon);
                actionsCell.appendChild(deleteLink);
                // Thêm ô chứa vào hàng
                row.appendChild(actionsCell);

                // Thêm hàng vào tbody
                tableBody.appendChild(row);


				editLink.addEventListener('click', () => {
					editUser(user); // Gọi hàm editUser với thông tin người dùng
				});



				deleteLink.addEventListener('click', () => {
					const userId = user.id;
			
					// Hiển thị hộp thoại xác nhận xóa
					const confirmDelete = confirm('Bạn có chắc chắn muốn xóa người dùng này?');
			
					if (confirmDelete) {
						// Gửi yêu cầu xóa người dùng
						fetch(`http://localhost:8081/api/users/${userId}`, {
							method: 'DELETE',
						})
						.then(response => {
							if (!response.ok) {
								throw new Error('Network response was not ok');
							}
							return response.text();
						})
						.then(responseText => {
							// Xóa hàng bảng tương ứng trên giao diện người dùng
							row.remove();
							alert('Xóa thành công');
						})
						.catch(error => {
							console.error('Lỗi khi xóa: ' + error.message);
							alert('Lỗi khi xóa');
						});
					}
				});	

            });
			
			const createUserBtn = document.getElementById('createUserBtn');
			createUserBtn.addEventListener('click', () => {
				const newUsername = prompt('Enter Username:');
				const newName = prompt('Enter Name:');
				const newPassword = prompt('Enter Password:'); // Nhập mật khẩu
				
				if (newUsername !== null && newName !== null && newPassword !== null) {
					const data = {
						username: newUsername,
						name: newName,
						password: newPassword, // Bao gồm trường password
					};
			
					fetch('http://localhost:8081/api/users/', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(data),
					})
					.then(response => {
						if (!response.ok) {
							throw new Error('Network response was not ok');
						}
						return response.json();
					})
					.then(newUser => {
						alert('Tạo mới người dùng thành công');
						fetchUsers();
					})
					.catch(error => {
						console.error('Lỗi khi tạo mới người dùng: ' + error.message);
						alert('Lỗi khi tạo mới người dùng');
					});
				}
			}
			);

        })
        .catch(error => {
            console.error('Lỗi: ' + error.message);
        });
}

// Initial fetch to display the user list in the table
fetchUsers();


function editUser(user) {
    const userId = user.id;
    const editedUsername = prompt('Edit Username:', user.username);
    const editedName = prompt('Edit Name:', user.name);
    if (editedUsername !== null && editedName !== null) {
        const data = {
            id: userId,
            username: editedUsername,
            name: editedName,
        };

        // Gửi yêu cầu cập nhật thông tin người dùng
        
        fetch(`http://localhost:8081/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(updatedUser => {
            // Cập nhật thông tin trên giao diện người dùng
            usernameCell.textContent = updatedUser.username;
            nameCell.textContent = updatedUser.name;
            alert('Cập nhật thành công');
        })
        .catch(error => {
            console.error('Lỗi khi cập nhật: ' + error.message);
            alert('Lỗi khi cập nhật');
        });
    }
}

