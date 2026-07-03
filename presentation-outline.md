# 🚀 Antigravity Kit — Hướng Dẫn Sử Dụng Cho Team

> **Thời lượng dự kiến:** 45–60 phút | **Đối tượng:** Developers trong team

---

## 📑 Agenda

| # | Phần | Thời lượng | Mô tả |
|---|------|-----------|-------|
| 1 | Giới thiệu & Tại sao cần Antigravity Kit | 5 phút | Vấn đề hiện tại, giải pháp |
| 2 | Kiến trúc tổng quan (3 Layers) | 10 phút | Rules → Agents → Workflows |
| 3 | Hệ thống Skills | 5 phút | Progressive Disclosure, 37 skills |
| 4 | Setup & Cấu hình ban đầu | 5 phút | Copy `.agent/`, config rules, .gitignore |
| 5 | Các Workflow thường dùng (Demo) | 15 phút | plan, code, fix, git, docs |
| 6 | Development Flows thực tế | 10 phút | Greenfield vs Brownfield |
| 7 | Best Practices & Anti-Patterns | 5 phút | Dos and Don'ts |
| 8 | Q&A | 5 phút | |

---

## 1. Giới Thiệu & Tại Sao Cần Antigravity Kit (5')

### Talking Points

- **Vấn đề hiện tại:**
  - AI coding assistants thiếu cấu trúc → output không nhất quán
  - Mỗi người dùng AI theo cách riêng → không có chuẩn chung cho team
  - Context window bị lãng phí khi load tất cả rules cùng lúc

- **Antigravity Kit là gì:**
  - Bộ khung **AI Orchestration** chuẩn hóa quy trình phát triển
  - Biến AI thành **đội ngũ agent chuyên biệt** làm việc theo quy trình rõ ràng
  - Portable — copy thư mục `.agent/` vào bất kỳ project nào

- **Lợi ích cụ thể:**
  - ✅ Quy trình phát triển nhất quán (Plan → Code → Test → Review → Deploy)
  - ✅ Tiết kiệm 80-90% context window nhờ Skills system
  - ✅ Tự động hóa các tác vụ lặp lại (git, docs, testing)
  - ✅ Chất lượng code cao hơn nhờ code review tự động

---

## 2. Kiến Trúc Tổng Quan — 3 Layers (10')

### Layer 1: Rules — Luật Quản Trị

```
.agent/rules/
├── primary-workflow.md         → Quy trình phát triển chính (Plan → Test → Review → Integration → Debug)
├── development-rules.md        → Chuẩn code: YAGNI/KISS/DRY, kebab-case, file <200 dòng
├── orchestration-protocol.md   → Phối hợp agents: Sequential vs Parallel
└── documentation-management.md → Quản lý docs, plan structure
```

> 💡 **Nhấn mạnh:** Rules luôn được load → không cần nhớ → AI tự tuân thủ

### Layer 2: Agents — 15 Agent Chuyên Biệt

| Nhóm | Agents | Vai trò |
|------|--------|---------|
| **Planning** | `planner`, `researcher`, `scout`, `brainstormer` | Nghiên cứu, phân tích, lên kế hoạch |
| **Development** | `fullstack-developer`, `ui-ux-designer`, `database-admin` | Viết code, thiết kế |
| **QA** | `tester`, `debugger`, `code-reviewer` | Test, debug, review |
| **Project Mgmt** | `project-manager`, `docs-manager`, `git-manager`, `journal-writer` | Quản lý project, docs, git |

> 💡 **Point chính:** Agent tự phối hợp qua delegation pattern — developer chỉ cần gọi workflow

### Layer 3: Workflows — 32 Workflow Tự Động

```
Workflows chính:
├── /plan, /plan-hard, /plan-fast  → Lập kế hoạch (nhanh hoặc sâu)
├── /code                          → Triển khai theo plan
├── /fix, /fix-fast, /fix-test     → Sửa bug
├── /test                          → Chạy tests
├── /review-codebase               → Kiểm tra sức khỏe codebase
├── /docs-init, /docs-update       → Quản lý documentation
├── /git-cp, /git-pr               → Git operations
├── /bootstrap                     → Khởi tạo project mới
└── /ui-ux-pro-max                 → Thiết kế UI premium
```

---

## 3. Hệ Thống Skills (5')

### Talking Points

- **Progressive Disclosure:** Chỉ load kiến thức khi cần, tiết kiệm context
- **37 Skills** sẵn có, phân theo 7 nhóm:
  - 🔧 Dev & Coding (12): `clean-code`, `api-patterns`, `architecture`…
  - 🏛️ Design (6): `frontend-design`, `mobile-design`…
  - 🧪 Testing (5): `systematic-debugging`, `tdd-workflow`…
  - 🔐 Security (2): `vulnerability-scanner`, `red-team-tactics`
  - 📚 Docs (4): `plan-writing`, `documentation-templates`…
  - ⚙️ DevOps (4): `deployment-procedures`, `performance-profiling`…
  - 🌐 Specialized (4): `i18n-localization`, `seo-fundamentals`…

- **Cách hoạt động:**
  ```
  User Request → AI phân tích → Match skill description → Load SKILL.md → Apply → Response
  ```

- **Hiệu quả:** Từ 50K tokens khả dụng → 185K+ tokens khả dụng cho task

---

## 4. Setup & Cấu Hình Ban Đầu (5')

### Demo Steps

```bash
# Bước 1: Copy .agent/ vào project
cp -r ~/.antigravity-kit/.agent /path/to/your-project/

# Bước 2: Chỉnh development-rules.md cho phù hợp tech stack
# Ví dụ: thay "Laravel/React" → "Spring Boot/Angular"

# Bước 3: Thêm vào .gitignore (nếu không share cho team)
echo ".agent/" >> .gitignore

# Bước 4: Tạo thư mục docs (nếu chưa có)
mkdir -p docs plans
```

### Cấu trúc docs chuẩn

```
docs/
├── project-overview-pdr.md
├── code-standards.md
├── codebase-summary.md
├── system-architecture.md
└── project-roadmap.md
```

---

## 5. Các Workflow Thường Dùng — Live Demo (15')

### 5.1 Planning: `/plan-hard`

```bash
/plan-hard "Implement user authentication with OAuth2"
```

**Output:** Plan directory với phases, research files, todo checklist

### 5.2 Implementation: `/code`

```bash
/code "./plans/250105-1410-oauth-authentication/phase-01-setup-environment.md"
```

**Flow:** Plan Detection → Analysis → Implementation → Testing → Code Review → User Approval → Finalization

### 5.3 Bug Fixing: `/fix-fast`

```bash
/fix-fast "API returns 500 on login endpoint"
```

**Flow:** Analyze → Debug → Fix → Test → Report

### 5.4 Git Operations: `/git-cp`

```bash
/git-cp "OAuth authentication implementation"
```

**Flow:** Stage → Conventional Commit → Push

### 5.5 Documentation: `/docs-update`

```bash
/docs-update "OAuth feature completed"
```

**Flow:** Read implementation → Update docs → Update roadmap

> 💡 **Demo tip:** Chọn 2-3 workflows có liên quan đến dự án thực tế của team để demo

---

## 6. Development Flows Thực Tế (10')

### Greenfield (Dự án mới)

```
/bootstrap → /plan-hard → /code (per phase) → /fix-test → /review-codebase → /docs-update → /git-cp
```

### Brownfield (Dự án cũ)

```
/docs-init → /review-codebase → /plan-hard → /code → /fix-test → /docs-update → /git-cp
```

### Workflow Decision Matrix

| Scenario | Workflow | Thời gian |
|----------|----------|-----------|
| Feature phức tạp | `/plan-hard` → `/code` | 4-8h |
| Feature đơn giản | `/plan-fast` → `/code` | 1-3h |
| Bug fix nhanh | `/fix-fast` | 15-30' |
| Bug fix phức tạp | `/fix-hard` | 2-4h |
| Test failures | `/fix-test` | 30'-2h |
| UI issues | `/fix-ui` | 30'-2h |
| Code review | `/review-codebase` | 15-30' |
| Git operations | `/git-cp` hoặc `/git-pr` | 2-5' |

---

## 7. Best Practices & Anti-Patterns (5')

### ✅ Nên Làm

1. **Luôn bắt đầu bằng plan** — `/plan-hard` hoặc `/plan-fast` trước khi code
2. **Mô tả task cụ thể** — "Fix pagination bug in candidates table" thay vì "fix bug"
3. **Dùng đúng workflow** — Tham khảo Decision Matrix ở trên
4. **Review plan trước khi `/code`** — Đảm bảo hướng đi đúng trước khi triển khai
5. **Chạy `/docs-update` sau mỗi feature** — Giữ docs luôn cập nhật
6. **Customize [development-rules.md](file:///Users/macbook/.antigravity-kit/.agent/rules/development-rules.md)** cho tech stack của project

### ❌ Không Nên

1. ❌ Bỏ qua planning, nhảy thẳng vào code
2. ❌ Dùng mô tả chung chung ("fix this", "add feature")
3. ❌ Ignore test failures để pass build
4. ❌ Dùng fake data/mocks chỉ để pass tests
5. ❌ Quên update docs sau khi code xong
6. ❌ Commit thư mục `.agent/` vào repo chung (trừ khi team đồng ý share)

---

## 8. Q&A (5')

### Câu hỏi dự kiến

- **Q:** Có thể tùy chỉnh hoặc thêm agent mới không?
  - **A:** Có. Tạo file [.md](file:///Users/macbook/.antigravity-kit/GEMINI.md) mới trong `.agent/agents/` với metadata YAML frontmatter

- **Q:** Có thể tạo workflow riêng không?
  - **A:** Có. Tạo file [.md](file:///Users/macbook/.antigravity-kit/GEMINI.md) trong `.agent/workflows/` theo format chuẩn (YAML frontmatter + markdown steps)

- **Q:** Skills có thể thêm riêng cho project không?
  - **A:** Có. Tạo thư mục trong `.agent/skills/` với file `SKILL.md` bên trong

- **Q:** Hoạt động với AI nào?
  - **A:** Tương thích với Gemini, Claude, và các AI coding assistants hỗ trợ agent mode

---

## 📎 Tài Liệu Tham Khảo

- [QuickStartKit.md](file:///Users/macbook/.antigravity-kit/.agent/QuickStartKit.md) — Hướng dẫn nhanh đầy đủ
- [antigravity_tools.md](file:///Users/macbook/.antigravity-kit/.agent/antigravity_tools.md) — Tài liệu tools
- [antigravity-skills-analysis.md](file:///Users/macbook/.antigravity-kit/docs/antigravity-skills-analysis.md) — Phân tích hệ thống Skills
- [primary-workflow.md](file:///Users/macbook/.antigravity-kit/.agent/rules/primary-workflow.md) — Quy trình chính
- **GitHub:** [vudovn/antigravity-kit](https://github.com/vudovn/antigravity-kit)
