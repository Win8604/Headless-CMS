require('dotenv').config();
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
const CMS_URL = process.env.VITE_CMS_URL || 'http://localhost:3000';
const API_KEY = process.env.VITE_API_KEY || '';

console.log(`[CMS] Proxying to CMS URL: ${CMS_URL}`);

// Helper to handle proxy requests with timeout & mock fallback
async function proxyToCMS(cmsPath, fallbackData, res, reqOptions = {}) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
    
    const headers = {
      'Content-Type': 'application/json',
      ...reqOptions.headers
    };
    
    if (API_KEY) {
      headers['Authorization'] = `Bearer ${API_KEY}`;
    }

    const response = await fetch(`${CMS_URL}${cmsPath}`, {
      method: reqOptions.method || 'GET',
      headers: headers,
      body: reqOptions.body ? JSON.stringify(reqOptions.body) : undefined,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`CMS returned status code: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`[CMS] Successfully fetched ${cmsPath} from CMS`);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  } catch (err) {
    console.warn(`[CMS] Error fetching ${cmsPath} (${err.message}). Using mock fallback.`);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(fallbackData));
  }
}


const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'font/otf',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = req.url.split('?')[0];

  // API Endpoints
  if (url === '/api/fpt/banners' && req.method === 'GET') {
    const fallback = [
      { id: 1, title: 'Main Banner 1', imageUrl: 'assets/images/Main-Banner-1.png', status: true },
      { id: 2, title: 'Main Banner 2', imageUrl: 'assets/images/Main-Banner-2.png', status: true },
      { id: 3, title: 'Main Banner 3', imageUrl: 'assets/images/Main-Banner-3.png', status: true }
    ];
    proxyToCMS('/api/banners', fallback, res);
    return;
  }

  if (url === '/api/fpt/packages' && req.method === 'GET') {
    const fallback = [
      { id: 'giga', name: 'Giga', imageUrl: 'assets/images/Giga-Desktop.png', status: true },
      { id: 'sky', name: 'Sky', imageUrl: 'assets/images/Sky-Desktop.png', status: true },
      { id: 'meta', name: 'Meta', imageUrl: 'assets/images/Meta-Desktop.png', status: true },
      { id: 'combo-giga', name: 'Combo Giga', imageUrl: 'assets/images/Combo-Giga-Desktop.png', status: true },
      { id: 'combo-sky', name: 'Combo Sky', imageUrl: 'assets/images/Combo-Sky-Desktop.png', status: true },
      { id: 'combo-vvip', name: 'Combo VVIP', imageUrl: 'assets/images/Combo-VVIP-Desktop.png', status: true }
    ];
    proxyToCMS('/api/packages', fallback, res);
    return;
  }

  if (url === '/api/fpt/promotions' && req.method === 'GET') {
    const fallback = [
      {
        id: 1,
        title: "<span style='color: #FF7E00;'>SIÊU ƯU ĐÃI</span> THÁNG NÀY",
        imageUrl: "assets/images/banner-uu-dai.png",
        buttonText: "Nhận tư vấn ngay",
        buttonUrl: "https://zalo.me/0324102101",
        status: true
      }
    ];
    proxyToCMS('/api/promotions', fallback, res);
    return;
  }

  if (url === '/api/fpt/menus' && req.method === 'GET') {
    const fallback = [
      { id: 1, title: 'Trang chủ', url: '#', status: true },
      { id: 2, title: 'Bảng giá', url: '#pricing-section', status: true },
      { id: 3, title: 'Wi-Fi 7', url: '#wifi-section', status: true },
      { id: 4, title: 'FPT Play Box', url: '#fpt-play-box', status: true },
      { id: 5, title: 'Tin tức', url: '#trust-section', status: true },
      { id: 6, title: 'FAQ', url: '#faq-section', status: true }
    ];
    proxyToCMS('/api/menus', fallback, res);
    return;
  }

  if (url === '/api/fpt/footer/settings' && req.method === 'GET') {
    const fallback = {
      id: 'fpt-footer-settings-id',
      certNo1: 'Giấy chứng nhận ĐKDN số 0101778163 do Sở Kế hoạch và Đầu tư Thành phố Hà Nội cấp ngày 28/07/1999',
      certNo2: 'Giấy phép cung cấp dịch vụ viễn thông số 255/GP-CVT do Cục Viễn Thông cấp ngày 07/11/2022',
      companyName: 'CÔNG TY CỔ PHẦN VIỄN THÔNG FPT',
      address: 'Tầng 9, Block A, tòa nhà FPT Cầu Giấy, số 10 Phạm Văn Bạch, quận Cầu Giấy, TP. Hà Nội',
      email: 'hotrokhachhang@fpt.com',
      hotline: '024 7300 2222',
      representative: 'Người đại diện: Ông Hoàng Việt Anh',
      socialHi: '#',
      socialYoutube: '#',
      socialInstagram: '#',
      socialZalo: 'https://zalo.me/0324102101',
      socialFacebook: '#',
      logoUrl: 'assets/images/Logo-FPT-Telecom.png',
      badgeUrl: 'assets/images/Chứng-Nhận.png',
      badgeLink: '#',
    };
    proxyToCMS('/api/footer/settings', fallback, res);
    return;
  }

  if (url === '/api/fpt/footer/links' && req.method === 'GET') {
    const fallback = [
      { title: 'Giới thiệu chung', url: '#', category: 'Về FPT Telecom', order: 1, status: true },
      { title: 'Liên kết - Thành viên', url: '#', category: 'Về FPT Telecom', order: 2, status: true },
      { title: 'Khách hàng - Đối tác', url: '#', category: 'Về FPT Telecom', order: 3, status: true },
      { title: 'Quan hệ cổ đông', url: '#', category: 'Về FPT Telecom', order: 4, status: true },
      { title: 'Tập đoàn FPT', url: '#', category: 'Về FPT Telecom', order: 5, status: true },
      { title: 'Tuyển dụng', url: '#', category: 'Về FPT Telecom', order: 6, status: true },

      { title: 'Hướng dẫn sử dụng dịch vụ', url: '#', category: 'Khách hàng FPT Telecom', order: 1, status: true },
      { title: 'Giới thiệu bạn bè', url: '#', category: 'Khách hàng FPT Telecom', order: 2, status: true },
      { title: 'Thanh toán online', url: '#', category: 'Khách hàng FPT Telecom', order: 3, status: true },
      { title: 'Góp ý khách hàng', url: '#', category: 'Khách hàng FPT Telecom', order: 4, status: true },

      { title: 'Dịch vụ Internet Wifi', url: '#', category: 'Sản phẩm dịch vụ', order: 1, status: true },
      { title: 'Internet - Truyền hình FPT Play', url: '#', category: 'Sản phẩm dịch vụ', order: 2, status: true },
      { title: 'FPT Camera', url: '#', category: 'Sản phẩm dịch vụ', order: 3, status: true },
      { title: 'FPT Smart Home', url: '#', category: 'Sản phẩm dịch vụ', order: 4, status: true },
      { title: 'Khuyến mãi', url: '#', category: 'Sản phẩm dịch vụ', order: 5, status: true },
      { title: 'Tìm điểm giao dịch', url: '#', category: 'Sản phẩm dịch vụ', order: 6, status: true },
    ];
    proxyToCMS('/api/footer/links', fallback, res);
    return;
  }

  if (url === '/api/fpt/faqs' && req.method === 'GET') {
    const fallback = [
      {
        question: 'Chi phí lắp mạng Internet wifi FPT ban đầu là bao nhiêu?',
        answer: 'Chi phí lắp mạng wifi FPT ban đầu thường là 299.000 VNĐ cho phí hòa mạng và lắp đặt. Phí này đã bao gồm việc lắp đặt modem wifi và kích hoạt dịch vụ, một số gói còn được trang bị thêm Access Point Wifi 6 giúp mở rộng sóng wifi hiệu quả.<br>Chi tiết<br><br>Lưu ý:<br><ul><li>Mức phí hòa mạng và lắp đặt có thể thay đổi tùy theo các chương trình khuyến mãi, khoảng thời gian hiện hành và khu vực (thay đổi không đáng kể).</li><li>Chi phí lắp đặt mạng internet wifi FPT ở TP.HCM là 300.000đ và 299.000 cho Hà Nội, Đà Nẵng. Các quận, huyện ngoại thành và các tỉnh cũng có mức phí tương tự (không thay đổi nhiều).</li><li>Để có thông tin chính xác nhất về chi phí lắp đặt mạng wifi FPT tại khu vực của bạn, nhấn vào nút TƯ VẤN NGAY bên cạnh, hoặc nhấp vào nút đăng ký gói cước phù hợp, điền thông tin để đội ngũ tư vấn thông tin chính xác nhất giá hiện hành và khuyến mãi đi kèm nhé.</li></ul>',
        order: 1,
        status: true,
      },
      {
        question: 'Thủ tục lắp đặt Internet FPT cần những gì?',
        answer: 'Thủ tục lắp đặt mạng Internet FPT vô cùng đơn giản:<br>- Đối với cá nhân, hộ gia đình: Chỉ cần chuẩn bị hình ảnh 2 mặt của Căn cước công dân (CCCD) hoặc Hộ chiếu.<br>- Đối với doanh nghiệp, tổ chức: Cần có hình ảnh Giấy phép đăng ký kinh doanh và CCCD của người đại diện pháp luật.',
        order: 2,
        status: true,
      },
      {
        question: 'Tôi có thể đăng ký lắp đặt mạng Internet FPT online không? Quy trình như thế nào?',
        answer: 'Hoàn toàn có thể! Bạn có thể điền thông tin đăng ký nhanh ngay tại form đăng ký trên website này. Quy trình gồm:<br>1. Điền thông tin cá nhân (Tên, Số điện thoại) và gửi yêu cầu.<br>2. Nhân viên FPT liên hệ tư vấn gói cước phù hợp và khảo sát hạ tầng khu vực.<br>3. Làm hợp đồng điện tử và thanh toán online qua các cổng thanh toán bảo mật.<br>4. Kỹ thuật viên đến lắp đặt tại nhà trong vòng 12h-24h.',
        order: 3,
        status: true,
      },
      {
        question: 'Thời gian lắp đặt các gói cước FPT là bao lâu?',
        answer: 'Sau khi hoàn tất thủ tục đăng ký hợp đồng, kỹ thuật viên FPT sẽ tiến hành triển khai kéo cáp và cấu hình thiết bị trong vòng tối đa 24h. Thông thường, việc lắp đặt sẽ hoàn tất ngay trong ngày đăng ký nếu thời tiết thuận lợi.',
        order: 4,
        status: true,
      },
      {
        question: 'Khi nào tôi được nhận thiết bị modem WiFi 6 và các thiết bị đi kèm gói cước?',
        answer: 'Thiết bị Modem WiFi 6 và các thiết bị đi kèm (như FPT Play Box, Access Point phụ nếu có) sẽ được kỹ thuật viên mang đến trực tiếp và bàn giao, lắp đặt đồng thời khi triển khai dịch vụ tại địa chỉ của bạn.',
        order: 5,
        status: true,
      },
      {
        question: 'Mạng FPT có nhanh, có ổn định không?',
        answer: 'Đường truyền Internet FPT sử dụng 100% công nghệ cáp quang tiên tiến nhất hiện nay, cho tốc độ download/upload cao và độ trễ cực thấp. Với việc tiên phong trang bị modem thế hệ Wi-Fi 6 và Wi-Fi 7, mạng FPT đảm kết nối luôn mượt mà, ổn định ngay cả khi truy cập nhiều thiết bị cùng lúc.',
        order: 6,
        status: true,
      },
      {
        question: 'Gói mạng FPT có bao gồm truyền hình không?',
        answer: 'Nếu bạn đăng ký các gói cước **Combo Internet - FPT Play**, dịch vụ sẽ bao gồm cả truyền hình thông minh chất lượng cao FPT Play với kho nội dung khổng lồ hơn 170 kênh truyền hình trong nước, quốc tế và các giải thể thao đỉnh cao (Ngoại hạng Anh, Cúp C1, C2...).',
        order: 7,
        status: true,
      },
      {
        question: 'Có những hình thức thanh toán cước Internet FPT nào, có phức tạp không?',
        answer: 'Thanh toán cước vô cùng linh hoạt và đơn giản. Bạn có thể thanh toán qua:<br>- Ứng dụng Hi FPT.<br>- Chuyển khoản ngân hàng trực tuyến, thanh toán qua QR Pay hoặc AutoPay tự động hàng tháng.<br>- Ví điện tử Momo, ZaloPay, VNPay, ShopeePay...<br>- Đóng tiền mặt trực tiếp tại các điểm giao dịch FPT Shop, FPT Telecom hoặc tại nhà (có phụ phí thu ngân).',
        order: 8,
        status: true,
      },
    ];
    proxyToCMS('/api/faqs', fallback, res);
    return;
  }

  if (url === '/api/fpt/registrations' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      console.log('Registration received:', body);
      try {
        const parsedBody = JSON.parse(body);
        proxyToCMS('/api/registrations', { success: true, message: 'Registration saved successfully' }, res, {
          method: 'POST',
          body: parsedBody
        });
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Invalid JSON request body' }));
      }
    });
    return;
  }


  // Serve static files
  let filePath = path.join(__dirname, url === '/' ? 'index.html' : decodeURIComponent(url));
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    res.writeHead(200, { 'Content-Type': contentType });
    const stream = fs.createReadStream(filePath);
    stream.on('error', () => {
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      }
    });
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
