---
description: Save current working context fully and safely
---

# 💾 Save Working Context Workflow (Enhanced)

Quy trình chuẩn để lưu lại trạng thái làm việc, đảm bảo không mất mát thông tin quan trọng cho lần sau.

---

## 📋 Pre-Save Checklist

1. **Review Changes:**

   - Run `git status` để xem file nào đã thay đổi.
   - Run `git diff --stat` để xem ước lượng thay đổi.

2. **Identify Key Achievements:**
   - Liệt kê 1-3 việc quan trọng nhất đã làm được trong session này.
   - Note lại bất kỳ "Gotchas" (lỗi, vấn đề) nào gặp phải.

---

## 🚀 Execution Steps

### 1. Update working_context.md

Chạy lệnh script tiện ích (hoặc edit tay nếu cần chi tiết hơn):

```bash
# Cú pháp: ./scripts/update-context.sh "Nội dung tóm tắt session"
./scripts/update-context.sh "Implemented E2E Encryption Phase 1"
```

**Hoặc manual edit:**

- Update `Last Updated` date.
- Thêm entry vào `Recent Session History` (giữ lại 3-5 sessions gần nhất).
- Update `Active Roadmap` (tick vào các checkbox đã xong).

### 2. Snapshot (Optional)

Nếu đây là một mốc quan trọng (Milestone), hãy tạo snapshot riêng:

```bash
cp working_context.md context_snapshots/context_$(date +%Y%m%d).md
```

### 3. Commit Context

Luôn commit file context riêng hoặc cùng với code thay đổi:

```bash
git add working_context.md
git commit -m "docs: update working context [Session Topic]"
```

---

## 📝 Template cho Session Note

Khi thêm vào `working_context.md`, hãy dùng format này:

```markdown
### [YYYY-MM-DD] - [Topic Chính]

- **Done:**
  - Implemented X feature
  - Fixed Y bug
- **Pending:**
  - Z is half-done
- **Notes:**
  - API key needs rotation
  - Database migration required
```

---

## ⚠️ Do Not Forget

- [ ] Check `.env` nếu có biến môi trường mới (note vào context, ko commit .env).
- [ ] Xóa bớt các session cũ quá 1 tháng để giữ file gọn nhẹ.

---

**Trigger:** Dùng khi kết thúc phiên làm việc hoặc chuyển sang task hoàn toàn khác.
