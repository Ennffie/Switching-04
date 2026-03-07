# 🏦 Switching App 完全開發指南

> **給新 AI 的快速上手手冊**  
> 閱讀此文件後，你應該能立即接手 Switching App 的開發工作，無需重新試錯。

---

## 📋 項目概覽

| 項目 | 說明 |
|------|------|
| **項目名稱** | Switching-MPF（強積金基金轉換平台） |
| **技術棧** | React + TypeScript + Vite |
| **部署目標** | GitHub Pages |
| **路由方式** | HashRouter（必須！） |
| **樣式方案** | Tailwind CSS + Inline CSS |
| **當前 Repo** | https://github.com/Ennffie/Switching-04 |
| **Live URL** | https://ennffie.github.io/Switching-04/ |

---

## 🎯 核心教訓（不要再犯！）

### 1️⃣ GitHub Pages SPA Routing — 最重要！

**❌ 錯誤做法：**
```javascript
// BrowserRouter 會導致 404！
<BrowserRouter>
  <Route path="/invest" element={<InvestPage />} />
</BrowserRouter>
```

**✅ 正確做法：**
```javascript
import { HashRouter, Routes, Route } from 'react-router-dom';

<HashRouter>
  <Routes>
    <Route path="/" element={<MyMPFPage />} />
    <Route path="/invest" element={<InvestPage />} />
    <Route path="/select-plan" element={<SelectPlanPage />} />
  </Routes>
</HashRouter>
```

**為什麼：** GitHub Pages 唔支援 server-side routing，HashRouter 用 `#` 避開呢個問題。

---

### 2️⃣ 圖片路徑 — 每次都會錯！

**❌ 錯誤路徑：**
```html
<img src="/icons/logo.jpg" />  <!-- 會 404 -->
```

**✅ 正確路徑：**
```typescript
// vite.config.ts 入面有 base: '/Switching-04/'
<img src="/Switching-04/icons/logo.jpg" />

// 或者用 import（推薦）
import logo from '/icons/logo.jpg';
<img src={logo} />
```

**⚠️ 關鍵：** 每次加新圖片，必須檢查 vite.config.ts 入面嘅 `base` 設定！

---

### 3️⃣ Git 圖片部署必做步驟

**問題：** 圖片放咗喺 `public/` 但 GitHub Pages 睇唔到

**正確流程：**
```bash
# 1. 圖片放 public/
cp 圖片.jpg public/新圖片.jpg

# 2. 必須加入 git！（最容易漏）
git add public/新圖片.jpg
git commit -m "Add 新圖片"
git push origin main

# 3. 先 rebuild + 部署
rm -rf dist && npm run build

# 4. 手動推 dist → gh-pages
cd dist && git init && git add . && git commit -m "Deploy"
git push --force https://github.com/Ennffie/Switching-04.git main:gh-pages

# 5. 等 1-5 分鐘 CDN 同步
```

**驗證部署：**
```bash
curl -I https://ennffie.github.io/Switching-04/圖片名.jpg
# 應該返回 HTTP/2 200
```

---

### 4️⃣ React 頁面滾動到頂（不要再提！）

**每個頁面組件開頭必須加：**
```typescript
import { useEffect } from 'react';

function SomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // ... rest of component
}
```

**Back button 都要加：**
```typescript
const handleBack = () => {
  navigate(-1);
  setTimeout(() => window.scrollTo(0, 0), 0);
};
```

---

### 5️⃣ iOS Safari 滾動檢測 — 不要再提！

**問題：** iOS Safari 嘅 `scroll` 事件唔會即時觸發

**解決方案：**
```typescript
useEffect(() => {
  const checkScroll = () => {
    const scrollTop = window.pageYOffset || document.body.scrollTop || 0;
    const windowHeight = window.innerHeight;
    const docHeight = document.body.scrollHeight;
    const remaining = docHeight - (scrollTop + windowHeight);
    
    if (remaining <= 200) {
      setCanAccept(true);  // 用戶已經滾到底
    }
  };
  
  const intervalId = setInterval(checkScroll, 200);
  return () => clearInterval(intervalId);
}, []);
```

**關鍵點：**
- 用 `setInterval` 每 200ms 檢查一次（唔好用 scroll event）
- 用 `document.body.scrollHeight`（iOS Safari 最準確）
- 剩餘距離少於 200px 就當係到底

---

### 6️⃣ 按鈕顏色規則（根據設計圖）

| 用途 | 顏色 | 色碼 |
|------|------|------|
| 一般操作 | 橙色 | `#E67E22` |
| 主要行動（下一步/提交） | 深藍色 | `#2c3e50` |
| 禁用狀態 | 灰色 | `#ccc` |

---

## 🎨 設計規範

### 顏色系統
```css
--primary-orange: #E67E22;    /* 主色 */
--primary-blue: #2c3e50;      /* 主要行動 */
--disabled: #ccc;             /* 禁用 */
--bg-gray: #f5f5f5;           /* 背景 */
--text-dark: #333;            /* 主要文字 */
--text-muted: #666;           /* 輔助文字 */
```

### 字體規範
- **標題：** 20-22px, fontWeight: 700
- **正文：** 14-16px, fontWeight: 400-600  
- **輔助文字：** 12-13px, color: #666

### Step Bar 規範
- 圓圈：40px 直徑
- 連接線：80px 寛，3px 厚
- 已完成：橙色背景 + ✓
- 當前：橙色背景 + 數字
- 未開始：灰色背景 + 數字

---

## 📁 頁面流程

```
Landing (MyMPFPage)
  ↓ 點擊「投資」
InvestPage（選擇現有帳戶/未來供款）
  ↓ 選擇後
Step 1: SelectPlanPage（選擇計劃）
  ↓ 填寫後
Step 2: FundTransferPage（轉出/轉入基金分配）
  ↓ 驗證後
Step 3: ConfirmPage（確認摘要）
  ↓ 提交後
TermsPage（條款及細則）← 用 iOS 滾動檢測
  ↓ 同意後
SuccessPage（成功提交）
  ↓ 查看紀錄
RecordsPage（我嘅紀錄）
```

---

## 🚀 部署流程

### 初次部署
```bash
# 1. 確保 repo 存在（Ennffie/Switching-04）

# 2. 本地 build
npm install
npm run build

# 3. 推去 gh-pages branch
cd dist
git init
git add .
git commit -m "Initial deploy"
git push --force https://github.com/Ennffie/Switching-04.git main:gh-pages

# 4. GitHub Settings → Pages → Source: gh-pages branch
```

### 更新部署
```bash
# 1. 確保 vite.config.ts 入面 base 正確
export default defineConfig({
  base: '/Switching-04/',  // ← 檢查呢度
  // ...
});

# 2. Build
rm -rf dist && npm run build

# 3. Deploy
cd dist
git init
git add .
git commit -m "Deploy: [描述更新內容]"
git push --force https://github.com/Ennffie/Switching-04.git main:gh-pages

# 4. 等 1-5 分鐘 CDN 同步
```

### 版本 Tag（必做！）
```bash
# 每次重要更新後必須打 tag
git tag v2026.03.07-1  # 格式：v年月日-次數
git push origin v2026.03.07-1

# 緊急時可以返去任何版本
git checkout v2026.03.07-1
```

---

## 🐛 常見問題速查

### Q: 頁面顯示空白/404
**A:** 檢查 HashRouter 是否正確使用，唔好用 BrowserRouter

### Q: 圖片顯示唔到
**A:** 
1. 檢查路徑係咪有 `/Switching-04/` 前綴
2. 檢查圖片係咪已經 `git add` + `git commit` + `git push`
3. 等 1-5 分鐘等 CDN 同步

### Q: CSS 樣式唔見咗
**A:** 
1. 檢查 Tailwind 有無正確 build
2. 如果用 custom CSS，考慮用 JS inject 方法

### Q: iOS Safari 滾動檢測唔work
**A:** 必須用 `setInterval` 方法，唔好用 scroll event

### Q: 返去舊頁面無 scroll 到頂
**A:** 確保每個 page 組件都有 `useEffect(() => window.scrollTo(0, 0), [])`

---

## 📚 參考文件

| 文件 | 位置 | 內容 |
|------|------|------|
| DESIGN.md | 項目根目錄 | 設計規範、技術方案 |
| VERSIONS.md | 項目根目錄 | 版本歷史、回滾方法 |
| CHANGELOG.md | 項目根目錄 | 更新記錄 |
| MEMORY.md | ~/.openclaw/workspace/ | Luna 長期記憶 |

---

## 🔄 回滾到舊版本

```bash
cd /Users/z/.openclaw/workspace/projects/Switching-04

# 睇所有 tag
git tag -l

# 睇所有 commit
git log --oneline

# 返去某個 tag
git checkout v2026.03.07-1
npm run build
cd dist && git init && git add . && git commit -m "Rollback"
git push --force https://github.com/Ennffie/Switching-04.git main:gh-pages

# 做完嘢返去最新版本
git checkout main
```

---

## ✅ 開發 Checklist

每次修改前必須檢查：

- [ ] vite.config.ts 入面 `base` 設定正確
- [ ] 新圖片已經 `git add` + `commit` + `push`
- [ ] 新頁面已加 `window.scrollTo(0, 0)`
- [ ] iOS Safari 相關頁面已加 `setInterval` 滾動檢測
- [ ] 按鈕顏色跟隨規範（一般=橙色，主要行動=深藍色）
- [ ] Build 成功 (`npm run build` 無錯誤)
- [ ] Deploy 後驗證所有圖片正常顯示
- [ ] 更新 CHANGELOG.md
- [ ] 打 tag 備份 (`git tag vYYYYMMDD-N`)

---

## 📝 給新 AI 的話

> 如果你係新接手嘅 AI，請記住：
> 
> 1. **先讀 MEMORY.md** — 了解 Enfield 嘅偏好同工作習慣
> 2. **檢查 GitHub Repo** — 確認當前版本狀態
> 3. **唔好假設** — 有懷疑就問，唔好憑空推測
> 4. **備份優先** — 做任何大改動前先打 tag
> 5. **測試 iOS** — Enfield 主要用 iPhone，必須測試 Safari

---

*最後更新：2026-03-07*  
*建立者：Luna (Kimi K2.5)*  
*目的：讓任何 AI 都能無縫接手 Switching App 開發*
