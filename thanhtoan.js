let selectedSize = null;  // Biến toàn cục để lưu kích thước đã chọn
const cart = JSON.parse(localStorage.getItem('cart')) || []; // Lấy giỏ hàng từ localStorage

// Hàm khởi tạo giỏ hàng khi trang được tải
function initializeCart() {
    const cartItemsList = document.getElementById('cartItems');
    if (!cartItemsList) return; // Kiểm tra nếu phần tử tồn tại

    cart.forEach(item => {
        const listItem = createCartItemElement(item);
        cartItemsList.appendChild(listItem);
    });
    updateCartUI();
}

// Tạo phần tử danh sách cho giỏ hàng
function createCartItemElement(item) {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.name} - Size: ${item.size} - Số lượng: ${item.quantity}`;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Xóa';
    removeButton.style.marginLeft = '10px';
    removeButton.onclick = () => removeFromCart(cart.indexOf(item));

    listItem.appendChild(removeButton);
    return listItem;
}

// Hàm lưu giỏ hàng vào localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function selectSize(element) {
    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(option => option.classList.remove('selected'));
    element.classList.add('selected');
    selectedSize = element.textContent;
    alert(`Kích thước ${selectedSize} đã được chọn.`);
}

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(productName, price) {
    const quantityInput = document.getElementById('quantityInput');
    let quantity = parseInt(quantityInput.value, 10);

    if (selectedSize === null) {
        alert('Vui lòng chọn kích thước trước khi thêm vào giỏ hàng.');
        return;
    }

    if (isNaN(quantity) || quantity <= 0) {
        alert('Số lượng không hợp lệ. Vui lòng nhập số lượng lớn hơn 0.');
        return;
    }

    cart.push({ name: productName, price: price, size: selectedSize, quantity: quantity });
    updateCartUI();
    saveCart(); // Lưu giỏ hàng vào localStorage
    alert(`${productName} với kích thước ${selectedSize} và số lượng ${quantity} đã được thêm vào giỏ hàng.`);
    resetSelection();
}

// Hàm thêm sản phẩm vào giỏ hàng từ DOM
function addToCartFromDOM() {
    const productName = document.getElementById('productName').textContent; // Lấy tên sản phẩm từ <h3>
    const priceText = document.getElementById('productPrice').textContent; // Lấy giá từ <span>
    
    // Chuyển đổi giá từ chuỗi sang số (xóa ký tự '₫' và dấu phẩy)
    const price = parseInt(priceText.replace(/₫/g, '').replace(/,/g, ''), 10);

    // Gọi hàm addToCart với thông tin vừa lấy được
    addToCart(productName, price);
}

function updateCartUI() {
    const cartItemsList = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');

    if (!cartItemsList || !totalPriceElement) return; // Kiểm tra nếu phần tử tồn tại

    cartItemsList.innerHTML = ''; // Xóa nội dung trước đó

    let totalPrice = 0;

    cart.forEach((item) => {
        const listItem = createCartItemElement(item);
        cartItemsList.appendChild(listItem);
        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }); // Định dạng giá tiền
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
    saveCart(); // Lưu giỏ hàng vào localStorage
}

function checkout() {
    if (cart.length === 0) {
        alert('Giỏ hàng của bạn trống!');
        return;
    }

    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const confirmMessage = `Tổng giá: ${totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}\nBạn có muốn thanh toán không?`;
    const confirmed = confirm(confirmMessage);

    if (confirmed) {
        alert('Thanh toán thành công! Cảm ơn bạn đã mua sắm.');
        cart.length = 0; // Xóa giỏ hàng sau khi thanh toán
        saveCart(); // Lưu giỏ hàng vào localStorage
        updateCartUI();
        window.location.href = 'index.html'; // Chuyển hướng về trang chủ sau khi thanh toán thành công
    } else {
        alert('Thanh toán đã bị hủy.');
    }
}

// Hàm để đặt lại lựa chọn
function resetSelection() {
    selectedSize = null;
    document.getElementById('quantityInput').value = ''; // Đặt lại số lượng
}

// Khởi tạo giỏ hàng khi trang được tải
document.addEventListener('DOMContentLoaded', initializeCart);
