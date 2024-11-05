document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra trạng thái đăng nhập khi trang tải
    const isLoggedIn = localStorage.getItem('loggedIn');
    const username = localStorage.getItem('username');

    if (isLoggedIn === 'true' && username) {
        updateLoginUI(username);
    }
});

// Lắng nghe sự kiện click cho nút đăng nhập
document.getElementById('loginButton').addEventListener('click', function() {
    const username = document.getElementById('usernameInput').value.trim();
    const password = document.getElementById('passwordInput').value.trim();
    const rememberMe = document.getElementById('rememberMe').checked;

    // Kiểm tra tên đăng nhập và mật khẩu
    if (username === 'minhnhi' && password === '12345') {
        alert('Đăng nhập thành công!');

        // Lưu thông tin đăng nhập vào localStorage nếu chọn "Nhớ mật khẩu"
        if (rememberMe) {
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('username', username);
        }

        // Ẩn modal đăng nhập
        const loginModal = bootstrap.Modal.getInstance(document.getElementById('modalId'));
        if (loginModal) {
            loginModal.hide();
        }

        // Cập nhật giao diện sau khi đăng nhập
        updateLoginUI(username);
    } else {
        alert('Tên đăng nhập hoặc mật khẩu không chính xác!');
    }
});

function updateLoginUI(username) {
    const loginLink = document.getElementById('loginLink'); // Sử dụng ID
    if (loginLink) {
        loginLink.innerHTML = `Xin chào, ${username} <button class="btn btn-link" onclick="logout()">Đăng xuất</button>`;
        loginLink.removeAttribute('data-bs-toggle');
        loginLink.removeAttribute('data-bs-target');
    }
}

function logout() {
    // Xóa thông tin đăng nhập trong localStorage
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');

    // Cập nhật lại giao diện về trạng thái chưa đăng nhập
    const loginLink = document.getElementById('loginLink'); // Sử dụng ID
    if (loginLink) {
        loginLink.innerHTML = 'ĐĂNG NHẬP';
        loginLink.setAttribute('data-bs-toggle', 'modal');
        loginLink.setAttribute('data-bs-target', '#modalId');
    }
    alert('Bạn đã đăng xuất!');
}
