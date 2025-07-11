// Global data object
let profileData = {};

// Load data from JSON file
async function loadProfileData() {
    try {
        // Thử load từ Node.js API trước
        const response = await fetch('/api/get-data');
        if (response.ok) {
            const result = await response.json();
            if (result.success) {
                profileData = result.data;
                console.log('Dữ liệu đã tải thành công từ API:', profileData);
                updatePageContent();
                return;
            }
        }

        // Fallback: load trực tiếp từ file data.json
        const fileResponse = await fetch('data.json');
        profileData = await fileResponse.json();
        console.log('Dữ liệu đã tải thành công từ file:', profileData);
        updatePageContent();

    } catch (error) {
        console.log('Không thể tải dữ liệu từ API hoặc file, sử dụng dữ liệu mặc định');
        console.error('Lỗi:', error);
        // Fallback to default data if JSON file doesn't exist
    }
}

// Update page content with loaded data
function updatePageContent() {
    if (!profileData) {
        console.log('Không có dữ liệu để cập nhật');
        return;
    }

    console.log('Đang cập nhật nội dung trang...');

    // Update profile information
    if (profileData.profile) {
        document.querySelector('h2').innerHTML = `${profileData.profile.name} <i class="fa-regular fa-square-check"></i>`;
        document.querySelector('p').innerHTML = `${profileData.profile.nickname}<br>${profileData.profile.title}<br>${profileData.profile.school}`;

        // Update avatar and banner
        if (profileData.profile.avatar) {
            document.querySelector('.avatar img').src = profileData.profile.avatar;
        }
        if (profileData.profile.banner) {
            document.querySelector('.banner img').src = profileData.profile.banner;
        }
    }

    // Update contact information
    if (profileData.contact) {
        // Update email
        if (profileData.contact.email) {
            const emailLink = document.querySelector('.item_gmail a');
            emailLink.href = `mailto:${profileData.contact.email}`;
            emailLink.textContent = profileData.contact.email;
        }

        // Update address
        if (profileData.contact.address) {
            console.log('Cập nhật địa chỉ:', profileData.contact.address.text);
            const addressLink = document.querySelector('.item_ggmap a');
            addressLink.href = profileData.contact.address.link;
            addressLink.textContent = profileData.contact.address.text;
        }

        // Update phone numbers
        if (profileData.contact.phones && profileData.contact.phones.length > 0) {
            const phone1 = document.querySelector('.phone1');
            const phone2 = document.querySelector('.phone2');

            if (profileData.contact.phones[0]) {
                phone1.textContent = profileData.contact.phones[0].number;
                phone1.onclick = () => showCallModal(profileData.contact.phones[0].number);
            }

            if (profileData.contact.phones[1]) {
                phone2.textContent = profileData.contact.phones[1].number;
                phone2.onclick = () => showCallModal2(profileData.contact.phones[1].number);
            }
        }
    }

    // Update social media
    if (profileData.social) {
        updateSocialMedia();
    }

    // Update certificates
    if (profileData.certificates) {
        updateCertificates();
    }

    console.log('Cập nhật nội dung hoàn tất');
}

// Update social media section
function updateSocialMedia() {
    const socialContainer = document.querySelector('.social-icons');
    socialContainer.innerHTML = '';

    profileData.social.forEach(social => {
        const socialItem = document.createElement('div');
        socialItem.className = 'item';
        socialItem.innerHTML = `
            <a href="${social.url}" target="_blank" ${social.isBank ? 'onclick="showMbbankModal(); return false;"' : ''}>
                <img src="${social.icon}" alt="${social.name}">
            </a>
        `;
        socialContainer.appendChild(socialItem);
    });
}

// Update certificates section
function updateCertificates() {
    console.log('🔄 Đang cập nhật certificates...');
    const certContainer = document.querySelector('.cetiifica_list');

    if (!certContainer) {
        console.error('❌ Không tìm thấy container .cetiifica_list');
        return;
    }

    if (!profileData.certificates || profileData.certificates.length === 0) {
        console.warn('⚠️ Không có dữ liệu certificates');
        certContainer.innerHTML = '<p style="color: #999; text-align: center;">Chưa có chứng chỉ</p>';
        return;
    }

    console.log('📋 Dữ liệu certificates:', profileData.certificates);
    certContainer.innerHTML = '';

    profileData.certificates.forEach((cert, index) => {
        console.log(`📄 Tạo certificate ${index + 1}:`, cert);
        const certItem = document.createElement('div');
        certItem.className = 'cetificate_item';
        certItem.onclick = () => showCertificateModal(cert.id);
        certItem.textContent = cert.displayName;
        certContainer.appendChild(certItem);
    });

    console.log(`✅ Đã tạo ${profileData.certificates.length} certificates`);
}

// Load data when page loads
document.addEventListener('DOMContentLoaded', function () {
    loadProfileData();
});

// đóng mở phone 1
function showCallModal(phoneNumber = '0389783619') {
    const modal = document.getElementById('callModal');
    const modalText = modal.querySelector('.modal-text');
    const callBtn = modal.querySelector('.modal-call-btn');

    modalText.textContent = `Gọi ${phoneNumber}`;
    callBtn.textContent = `Gọi ${phoneNumber}`;
    callBtn.href = `tel:${phoneNumber}`;

    modal.style.display = 'flex';
}

function closeCallModal() {
    document.getElementById('callModal').style.display = 'none';
}

// đóng mở phone 2
function showCallModal2(phoneNumber = '0876787950') {
    const modal = document.getElementById('callModal2');
    const modalText = modal.querySelector('.modal-text');
    const callBtn = modal.querySelector('.modal-call-btn');

    modalText.textContent = `Gọi ${phoneNumber}`;
    callBtn.textContent = `Gọi ${phoneNumber}`;
    callBtn.href = `tel:${phoneNumber}`;

    modal.style.display = 'flex';
}

function closeCallModal2() {
    document.getElementById('callModal2').style.display = 'none';
}

// lưu danh bạ
function showSaveContactModal() {
    const modal = document.getElementById('saveContactModal');
    const modalText = modal.querySelector('.modal-text');

    if (profileData && profileData.profile && profileData.contact && profileData.contact.phones.length > 0) {
        modalText.innerHTML = `
            <strong>${profileData.profile.name}</strong><br>
            Số điện thoại: <span style="color:#3498db">${profileData.contact.phones[0].number}</span>
        `;
    }

    modal.style.display = 'flex';
}

function closeSaveContactModal() {
    document.getElementById('saveContactModal').style.display = 'none';
}

function downloadVCard() {
    if (!profileData || !profileData.profile || !profileData.contact || !profileData.contact.phones.length) {
        alert('Không có dữ liệu để tạo vCard');
        return;
    }

    const vCardData = `BEGIN:VCARD\nVERSION:3.0\nFN:${profileData.profile.name}\nTEL;TYPE=CELL:${profileData.contact.phones[0].number}\nEND:VCARD`;
    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${profileData.profile.name.replace(/\s+/g, '')}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    closeSaveContactModal();
}

// modal mbbank
function showMbbankModal() {
    const modal = document.getElementById('mbbankModal');
    const title = modal.querySelector('.mbbank-title');
    const info = modal.querySelector('.mbbank-info');
    const qrImg = modal.querySelector('.mbbank-qr-img');

    // Find bank info from social data
    const bankSocial = profileData.social.find(social => social.isBank);

    if (bankSocial && bankSocial.bankInfo) {
        title.textContent = bankSocial.bankInfo.name;
        info.textContent = `STK: ${bankSocial.bankInfo.accountNumber} | ${bankSocial.bankInfo.accountName}`;
        qrImg.src = bankSocial.bankInfo.qrCode;
    }

    modal.style.display = 'flex';
}

function closeMbbankModal() {
    document.getElementById('mbbankModal').style.display = 'none';
}

function copyMbbankInfo() {
    const bankSocial = profileData.social.find(social => social.isBank);
    if (bankSocial && bankSocial.bankInfo) {
        const info = `${bankSocial.bankInfo.name}\n${bankSocial.bankInfo.accountNumber} | ${bankSocial.bankInfo.accountName}`;
        navigator.clipboard.writeText(info);
        alert('Đã sao chép thông tin tài khoản!');
    }
}

function saveMbbankQR() {
    const bankSocial = profileData.social.find(social => social.isBank);
    if (bankSocial && bankSocial.bankInfo) {
        const img = document.getElementById('mbbankQRImg');
        const url = img.src;
        const link = document.createElement('a');
        link.href = url;
        link.download = 'mbbank_qr.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Modal QR Code
function scanQR() {
    const modal = document.getElementById('qrModal');
    const title = modal.querySelector('.qr-title');
    const qrImg = modal.querySelector('.qr-img');

    if (profileData && profileData.qrCode) {
        title.textContent = profileData.qrCode.title;
        qrImg.src = profileData.qrCode.image;
    }

    modal.style.display = 'flex';
}

function closeQRModal() {
    document.getElementById('qrModal').style.display = 'none';
}

function saveQRCode() {
    if (profileData && profileData.qrCode) {
        const img = document.getElementById('qrImg');
        const url = img.src;
        const link = document.createElement('a');
        link.href = url;
        link.download = 'qr_code.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Modal Chứng chỉ
function showCertificateModal(certificateType) {
    const modal = document.getElementById('certificateModal');
    const title = document.getElementById('certificateTitle');
    const img = document.getElementById('certificateImg');

    // Find certificate from data
    const certificate = profileData.certificates.find(cert => cert.id === certificateType);

    if (certificate) {
        title.textContent = certificate.title;
        img.src = certificate.image;
        img.alt = certificate.title;
        modal.style.display = 'flex';
    }
}

function closeCertificateModal() {
    document.getElementById('certificateModal').style.display = 'none';
}

function saveCertificate() {
    const img = document.getElementById('certificateImg');
    const url = img.src;
    const title = document.getElementById('certificateTitle').textContent;

    if (url && !url.includes('certificate-')) {
        const link = document.createElement('a');
        link.href = url;
        link.download = `${title.toLowerCase().replace(/\s+/g, '_')}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert('Chưa có ảnh chứng chỉ. Vui lòng thêm ảnh vào thư mục img/');
    }
}

// Modal Avatar/Banner
function showImageModal(imageType) {
    const modal = document.getElementById('imageModal');
    const title = document.getElementById('imageTitle');
    const img = document.getElementById('modalImage');

    if (profileData && profileData.profile) {
        if (imageType === 'avatar') {
            title.textContent = 'Ảnh đại diện';
            img.src = profileData.profile.avatar;
        } else if (imageType === 'banner') {
            title.textContent = 'Ảnh bìa';
            img.src = profileData.profile.banner;
        }

        img.alt = title.textContent;
        modal.style.display = 'flex';
    }
}

function closeImageModal() {
    document.getElementById('imageModal').style.display = 'none';
}

function saveImage() {
    const img = document.getElementById('modalImage');
    const url = img.src;
    const title = document.getElementById('imageTitle').textContent;

    if (url) {
        const link = document.createElement('a');
        link.href = url;
        link.download = `${title.toLowerCase().replace(/\s+/g, '_')}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
} 