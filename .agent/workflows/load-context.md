---
description: Load working context for new chat session
---

# 📥 Load Working Context Workflow (Smart Load)

Quy trình để AI "hội nhập" nhanh nhất vào dự án khi bắt đầu chat mới.

---

## 🚀 Execution Steps

### 1. Read The Brain (Core Context)

**Action:** Luôn đọc file này đầu tiên.

```bash
cat working_context.md
```

### 2. Understand The Structure

**Action:** List các thư mục quan trọng để nắm cấu trúc hiện tại.

```bash
ls -F backend/app/Http/Controllers/Api/
ls -F frontend/app/lib/
```

### 3. Load Specific Domain Knowledge (On Demand)

Dựa vào yêu cầu users, hãy đọc thêm docs chi tiết tương ứng:

- **Nếu làm Backend API:**

  - `docs/v2/02-API-DOCUMENTATION.md`
  - `docs/v2/03-DATABASE-SCHEMA.md`

- **Nếu làm Frontend UI:**

  - `docs/frontend-v2/02-COMPONENT-GUIDE.md`
  - `frontend/app/lib/api.ts` (xem cấu trúc gọi API)

- **Nếu làm Security/Deployment:**
  - `docs/v2/06-DEPLOYMENT-GUIDE.md`
  - `docs/v2/04-AUTHENTICATION-AUTHORIZATION.md`

---

## 🧠 Mental Checklist cho AI

Sau khi load, AI cần tự trả lời được:

1. Dự án này làm về cái gì? (Business Verification)
2. Tech stack chính là gì? (Laravel + Next.js)
3. Status hiện tại ra sao? (Đang dev E2E encryption)
4. File nào chứa API definition? (`routes/api.php`)

---

## 💡 Quick Start Command

Copy dòng này và paste vào chat mới:

```text
/load-context
```

_(AI sẽ tự động thực hiện Step 1 và hỏi bạn muốn làm gì tiếp theo để thực hiện Step 3)_
