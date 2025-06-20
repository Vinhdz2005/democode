// đóng mở phone 1
function showCallModal() {
    document.getElementById('callModal').style.display = 'flex';
}
function closeCallModal() {
    document.getElementById('callModal').style.display = 'none';
}
// đóng mở phone 2
function showCallModal2() {
    document.getElementById('callModal2').style.display = 'flex';
}
function closeCallModal2() {
    document.getElementById('callModal2').style.display = 'none';
}

// lưu danh bạ
function showSaveContactModal() {
    document.getElementById('saveContactModal').style.display = 'flex';
}
function closeSaveContactModal() {
    document.getElementById('saveContactModal').style.display = 'none';
}
function downloadVCard() {
    const vCardData = `BEGIN:VCARD\nVERSION:3.0\nFN:Đào Văn Vinh\nTEL;TYPE=CELL:0389783619\nEND:VCARD`;
    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'DaoVanVinh.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    closeSaveContactModal();
}

// modal mbbank
function showMbbankModal() {
    document.getElementById('mbbankModal').style.display = 'flex';
}
function closeMbbankModal() {
    document.getElementById('mbbankModal').style.display = 'none';
}
function copyMbbankInfo() {
    const info = '(MB)Ngân hàng Quân Đội\n0389783619 | Đào Văn Vinh';
    navigator.clipboard.writeText(info);
    alert('Đã sao chép thông tin tài khoản!');
}
function saveMbbankQR() {
    const img = document.getElementById('mbbankQRImg');
    const url = img.src;
    const link = document.createElement('a');
    link.href = url;
    link.download = 'mbbank_qr.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Modal QR Code
function scanQR() {
    document.getElementById('qrModal').style.display = 'flex';
}

function closeQRModal() {
    document.getElementById('qrModal').style.display = 'none';
}

function saveQRCode() {
    const img = document.getElementById('qrImg');
    const url = img.src;
    const link = document.createElement('a');
    link.href = url;
    link.download = 'qr_code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}