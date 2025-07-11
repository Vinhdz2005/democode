// Global data object
let profileData = {};

// Initialize the admin page
document.addEventListener('DOMContentLoaded', function () {
    loadData();
    loadSocialItems();
    loadCertificateItems();
    previewData();
});

// Tab functionality
function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));

    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Show selected tab content
    document.getElementById(tabName).classList.add('active');

    // Add active class to selected tab
    event.target.classList.add('active');
}

// Load data from data.json
async function loadData() {
    try {
        const response = await fetch('data.json');
        profileData = await response.json();
        populateForm();
    } catch (error) {
        console.log('Không thể tải dữ liệu từ data.json, sử dụng dữ liệu mặc định');
        loadDefaultData();
    }
}

// Load default data if data.json doesn't exist
function loadDefaultData() {
    profileData = {
        profile: {
            name: "Đào Văn Vinh",
            nickname: "Công Vinh",
            title: "Sinh viên",
            school: "Trường đại học Công Nghệ Giao Thông Vận Tải",
            avatar: "/img/avatar.jpg",
            banner: "/img/banner.jpg"
        },
        contact: {
            phones: [
                { number: "0389783619", label: "Số điện thoại 1" },
                { number: "0876787950", label: "Số điện thoại 2" }
            ],
            email: "daovinhgm2005@gmail.com",
            address: {
                text: "27/163, Chiến Thắng,Văn Quán,Hà Đông,HN",
                link: "https://maps.app.goo.gl/RcpHMYBpK2kUWnHw9"
            }
        },
        social: [
            {
                name: "Facebook",
                url: "https://www.facebook.com/sadoa.trum/",
                icon: "/img/facebook.png"
            },
            {
                name: "TikTok",
                url: "https://www.tiktok.com/@vinhzuize05",
                icon: "/img/tiktok.png"
            },
            {
                name: "Zalo",
                url: "https://zalo.me/0389783619",
                icon: "/img/zalo.webp"
            },
            {
                name: "YouTube",
                url: "https://www.youtube.com/@Chaoxiaoz",
                icon: "/img/youtube.jpg"
            },
            {
                name: "Messenger",
                url: "https://www.facebook.com/messages/t/100029725782382",
                icon: "/img/messenger.png"
            },
            {
                name: "Instagram",
                url: "https://www.instagram.com/vinhdz.05/",
                icon: "/img/instagram.png"
            },
            {
                name: "Locket",
                url: "https://locket.camera/links/ixQxA2mWqeMH4oCA8",
                icon: "/img/locket.png"
            },
            {
                name: "MBBank",
                url: "#",
                icon: "/img/mbbank.png",
                isBank: true,
                bankInfo: {
                    name: "(MB)Ngân hàng Quân Đội",
                    accountNumber: "0389783619",
                    accountName: "Đào Văn Vinh",
                    qrCode: "/img/QRmbbank.jpg"
                }
            }
        ],
        certificates: [
            {
                id: "sql",
                title: "Chứng chỉ SQL",
                displayName: "Chứng chỉ SQL",
                image: "/img/sql.jpg"
            },
            {
                id: "health",
                title: "Chứng nhận sức khỏe",
                displayName: "Chứng nhận sức khỏe",
                image: "/img/suckhoe.jpg"
            },
            {
                id: "scholarship",
                title: "Chứng nhận học bổng",
                displayName: "Chứng nhận học bổng",
                image: "/img/hocbong.jpg"
            },
            {
                id: "ai",
                title: "Giải nhất cuộc thi AI",
                displayName: "Giải nhất AI social For Challenge 2025 UTT",
                image: "/img/giainhatAI.jpg"
            }
        ],
        qrCode: {
            image: "/img/qr-code.jpg",
            title: "Quét mã QR"
        }
    };
    populateForm();
}

// Populate form with data
function populateForm() {
    // Profile data
    document.getElementById('profileName').value = profileData.profile.name;
    document.getElementById('profileNickname').value = profileData.profile.nickname;
    document.getElementById('profileTitle').value = profileData.profile.title;
    document.getElementById('profileSchool').value = profileData.profile.school;
    document.getElementById('profileAvatar').value = profileData.profile.avatar;
    document.getElementById('profileBanner').value = profileData.profile.banner;

    // Contact data
    document.getElementById('contactEmail').value = profileData.contact.email;
    document.getElementById('contactAddress').value = profileData.contact.address.text;
    document.getElementById('contactAddressLink').value = profileData.contact.address.link;

    // Populate phones
    const phonesContainer = document.getElementById('phonesContainer');
    phonesContainer.innerHTML = '';
    profileData.contact.phones.forEach(phone => {
        addPhoneItem(phone.number, phone.label);
    });
}

// Phone management
function addPhone() {
    addPhoneItem('', '');
}

function addPhoneItem(number = '', label = '') {
    const container = document.getElementById('phonesContainer');
    const phoneItem = document.createElement('div');
    phoneItem.className = 'phone-item';
    phoneItem.innerHTML = `
        <input type="text" placeholder="Số điện thoại" value="${number}">
        <input type="text" placeholder="Nhãn" value="${label}">
        <button class="btn btn-danger" onclick="removePhone(this)"><i class="fas fa-trash"></i></button>
    `;
    container.appendChild(phoneItem);
}

function removePhone(button) {
    button.parentElement.remove();
}

// Social media management
function loadSocialItems() {
    const container = document.getElementById('socialContainer');
    container.innerHTML = '';

    profileData.social.forEach((social, index) => {
        addSocialItem(social, index);
    });
}

function addSocial() {
    addSocialItem({
        name: '',
        url: '',
        icon: '',
        isBank: false,
        bankInfo: {
            name: '',
            accountNumber: '',
            accountName: '',
            qrCode: ''
        }
    }, profileData.social.length);
}

function addSocialItem(social, index) {
    const container = document.getElementById('socialContainer');
    const socialItem = document.createElement('div');
    socialItem.className = 'social-item';
    socialItem.innerHTML = `
        <div class="item-header">
            <span class="item-title">Mạng xã hội ${index + 1}</span>
            <button class="btn btn-danger" onclick="removeSocial(this)"><i class="fas fa-trash"></i></button>
        </div>
        <div class="form-group">
            <label>Tên:</label>
            <input type="text" class="social-name" value="${social.name}" placeholder="Facebook, TikTok, etc.">
        </div>
        <div class="form-group">
            <label>URL:</label>
            <input type="url" class="social-url" value="${social.url}" placeholder="https://...">
        </div>
        <div class="form-group">
            <label>Icon (đường dẫn ảnh):</label>
            <input type="text" class="social-icon" value="${social.icon}" placeholder="/img/icon.png">
        </div>
        <div class="form-group">
            <label>
                <input type="checkbox" class="social-is-bank" ${social.isBank ? 'checked' : ''}>
                Đây là thông tin ngân hàng
            </label>
        </div>
        <div class="bank-info" style="${social.isBank ? '' : 'display: none;'}">
            <div class="form-group">
                <label>Tên ngân hàng:</label>
                <input type="text" class="bank-name" value="${social.bankInfo?.name || ''}" placeholder="(MB)Ngân hàng Quân Đội">
            </div>
            <div class="form-group">
                <label>Số tài khoản:</label>
                <input type="text" class="bank-account" value="${social.bankInfo?.accountNumber || ''}" placeholder="0389783619">
            </div>
            <div class="form-group">
                <label>Tên chủ tài khoản:</label>
                <input type="text" class="bank-account-name" value="${social.bankInfo?.accountName || ''}" placeholder="Đào Văn Vinh">
            </div>
            <div class="form-group">
                <label>QR Code (đường dẫn ảnh):</label>
                <input type="text" class="bank-qr" value="${social.bankInfo?.qrCode || ''}" placeholder="/img/QRmbbank.jpg">
            </div>
        </div>
    `;
    container.appendChild(socialItem);

    // Add event listener for bank checkbox
    const checkbox = socialItem.querySelector('.social-is-bank');
    const bankInfo = socialItem.querySelector('.bank-info');
    checkbox.addEventListener('change', function () {
        bankInfo.style.display = this.checked ? 'block' : 'none';
    });
}

function removeSocial(button) {
    button.closest('.social-item').remove();
}

// Certificate management
function loadCertificateItems() {
    const container = document.getElementById('certificatesContainer');
    container.innerHTML = '';

    profileData.certificates.forEach((cert, index) => {
        addCertificateItem(cert, index);
    });
}

function addCertificate() {
    addCertificateItem({
        id: '',
        title: '',
        displayName: '',
        image: ''
    }, profileData.certificates.length);
}

function addCertificateItem(cert, index) {
    const container = document.getElementById('certificatesContainer');
    const certItem = document.createElement('div');
    certItem.className = 'certificate-item';
    certItem.innerHTML = `
        <div class="item-header">
            <span class="item-title">Chứng chỉ ${index + 1}</span>
            <button class="btn btn-danger" onclick="removeCertificate(this)"><i class="fas fa-trash"></i></button>
        </div>
        <div class="form-group">
            <label>ID (để JavaScript):</label>
            <input type="text" class="cert-id" value="${cert.id}" placeholder="sql, health, etc.">
        </div>
        <div class="form-group">
            <label>Tiêu đề (trong modal):</label>
            <input type="text" class="cert-title" value="${cert.title}" placeholder="Chứng chỉ SQL">
        </div>
        <div class="form-group">
            <label>Tên hiển thị:</label>
            <input type="text" class="cert-display-name" value="${cert.displayName}" placeholder="Chứng chỉ SQL">
        </div>
        <div class="form-group">
            <label>Ảnh (đường dẫn):</label>
            <input type="text" class="cert-image" value="${cert.image}" placeholder="/img/sql.jpg">
        </div>
    `;
    container.appendChild(certItem);
}

function removeCertificate(button) {
    button.closest('.certificate-item').remove();
}

// Collect data from form
function collectData() {
    const data = {
        profile: {
            name: document.getElementById('profileName').value,
            nickname: document.getElementById('profileNickname').value,
            title: document.getElementById('profileTitle').value,
            school: document.getElementById('profileSchool').value,
            avatar: document.getElementById('profileAvatar').value,
            banner: document.getElementById('profileBanner').value
        },
        contact: {
            phones: [],
            email: document.getElementById('contactEmail').value,
            address: {
                text: document.getElementById('contactAddress').value,
                link: document.getElementById('contactAddressLink').value
            }
        },
        social: [],
        certificates: [],
        qrCode: profileData.qrCode || {
            image: "/img/qr-code.jpg",
            title: "Quét mã QR"
        }
    };

    // Collect phones
    const phoneItems = document.querySelectorAll('.phone-item');
    phoneItems.forEach(item => {
        const inputs = item.querySelectorAll('input');
        if (inputs[0].value.trim()) {
            data.contact.phones.push({
                number: inputs[0].value,
                label: inputs[1].value
            });
        }
    });

    // Collect social media
    const socialItems = document.querySelectorAll('.social-item');
    socialItems.forEach(item => {
        const social = {
            name: item.querySelector('.social-name').value,
            url: item.querySelector('.social-url').value,
            icon: item.querySelector('.social-icon').value
        };

        if (item.querySelector('.social-is-bank').checked) {
            social.isBank = true;
            social.bankInfo = {
                name: item.querySelector('.bank-name').value,
                accountNumber: item.querySelector('.bank-account').value,
                accountName: item.querySelector('.bank-account-name').value,
                qrCode: item.querySelector('.bank-qr').value
            };
        }

        if (social.name && social.url) {
            data.social.push(social);
        }
    });

    // Collect certificates
    const certItems = document.querySelectorAll('.certificate-item');
    certItems.forEach(item => {
        const cert = {
            id: item.querySelector('.cert-id').value,
            title: item.querySelector('.cert-title').value,
            displayName: item.querySelector('.cert-display-name').value,
            image: item.querySelector('.cert-image').value
        };

        if (cert.id && cert.title) {
            data.certificates.push(cert);
        }
    });

    return data;
}

// Preview data
function previewData() {
    const data = collectData();
    const jsonPreview = document.getElementById('jsonPreview');
    jsonPreview.textContent = JSON.stringify(data, null, 2);
}

// Save data
async function saveData() {
    const data = collectData();
    const jsonString = JSON.stringify(data, null, 2);

    try {
        // Hiển thị loading
        const saveBtn = event.target;
        const originalText = saveBtn.innerHTML;
        saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang lưu...';
        saveBtn.disabled = true;

        // Gửi dữ liệu đến Node.js API
        const response = await fetch('/api/save-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonString
        });

        const result = await response.json();

        if (result.success) {
            alert('✅ ' + result.message + '\n\nDữ liệu đã được lưu vào file data.json!\nBây giờ bạn có thể refresh trang chính để thấy thay đổi.');
        } else {
            throw new Error(result.error || 'Lỗi không xác định');
        }

    } catch (error) {
        console.error('Lỗi khi lưu dữ liệu:', error);

        // Fallback: copy to clipboard
        navigator.clipboard.writeText(jsonString).then(function () {
            alert('❌ Không thể lưu tự động!\n\nDữ liệu đã được copy vào clipboard.\n\nHãy:\n1. Mở file data.json trong editor\n2. Xóa toàn bộ nội dung cũ\n3. Paste dữ liệu mới vào\n4. Lưu file');
        }).catch(function (err) {
            alert('❌ Lỗi: ' + error.message + '\n\nDữ liệu JSON:\n\n' + jsonString + '\n\nHãy copy dữ liệu trên và paste vào file data.json');
        });
    } finally {
        // Khôi phục nút
        const saveBtn = document.querySelector('.btn-success');
        saveBtn.innerHTML = '<i class="fas fa-save"></i> Lưu dữ liệu';
        saveBtn.disabled = false;
    }
}

// Copy JSON to clipboard
function copyJSON() {
    const data = collectData();
    const jsonString = JSON.stringify(data, null, 2);

    navigator.clipboard.writeText(jsonString).then(function () {
        alert('✅ Dữ liệu JSON đã được copy vào clipboard!');
    }).catch(function (err) {
        alert('Không thể copy tự động. Vui lòng copy thủ công từ tab "Xem trước JSON"');
    });
} 