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

## 🖤 黑畫面（Black Screen）疑難排解

### 症狀 1：頁面完全空白/黑屏
**可能原因：**

#### A. BrowserRouter（最常見！）
```
錯誤特徵：
- 頁面空白
- Console 顯示 404
- URL 係 /invest 但無 #

解決：改用 HashRouter
```

#### B. vite.config.ts base 設定錯誤
```typescript
// ❌ 錯誤：base 設定唔啱
export default defineConfig({
  base: '/',           // 錯！
  // 或者完全唔設 base
})

// ✅ 正確：必須同 Repo 名一致
export default defineConfig({
  base: '/Switching-04/',  // Repo 名叫 Switching-04
})
```

#### C. Build 失敗但強行部署
```
錯誤特徵：
- npm run build 有 error 但無視
- dist 文件夾不完整

解決：確保 build 成功先部署
```

#### D. React Error（白屏但 Console 有錯）
```
錯誤特徵：
- 頁面白屏/黑屏
- Console 顯示 React error

解決：
1. 檢查 console 錯誤信息
2. 常見：import 錯誤、undefined 變數、syntax error
3. 本地測試：npm run dev 先確保無錯
```

---

## 🖼️ 圖片/Icon 顯示錯誤

### 症狀 2：圖片顯示唔到/破圖

#### A. 路徑問題（最常見！）
```html
<!-- ❌ 錯誤：缺少 base path -->
<img src="/icons/logo.jpg" />

<!-- ❌ 錯誤：用相對路徑 -->
<img src="../icons/logo.jpg" />

<!-- ✅ 正確：絕對路徑 + base path -->
<img src="/Switching-04/icons/logo.jpg" />

<!-- ✅ 最佳：用 import -->
import logo from '/icons/logo.jpg';
<img src={logo} />
```

#### B. 圖片未加入 Git（極常見！）
```
錯誤特徵：
- 本地睇到，GitHub Pages 睇唔到
- 404 錯誤

原因：圖片放咗喺 public/ 但未 git add

✅ 必做步驟（不要再漏！）：
1. cp 圖片.jpg public/新圖片.jpg
2. git add public/新圖片.jpg      ← 最容易漏！
3. git commit -m "Add 新圖片"
4. git push origin main
5. rm -rf dist && npm run build
6. cd dist && git init && git add . && git commit -m "Deploy"
7. git push --force ... gh-pages
8. 等 1-5 分鐘 CDN 同步
```

#### C. CDN 緩存延遲
```
錯誤特徵：
- 已經 push 但都係睇唔到
- 過咗 10 分鐘先睇到

解決：
1. 等 1-5 分鐘
2. 硬刷新：Cmd+Shift+R (Mac) / Ctrl+F5 (Windows)
3. 驗證：curl -I https://ennffie.github.io/Switching-04/圖片名.jpg
```

#### D. 大小寫問題（Mac vs Linux）
```
錯誤特徵：
- Mac 本地睇到，GitHub Pages 睇唔到

原因：
- Mac 唔分大小寫（logo.JPG = logo.jpg）
- GitHub Pages 分大小寫

❌ logo.JPG
❌ Logo.jpg
✅ logo.jpg  （必須完全一致）
```

#### E. 圖片格式問題
```
錯誤特徵：
- 圖片位置正確但顯示破圖

解決：
- 確保圖片係有效格式（jpg, png, svg）
- 嘗試喺瀏覽器直接開圖片 URL 測試
- 檢查圖片是否損壞
```

---

## 🔧 其他常見錯誤

### 錯誤：CSS 樣式唔見咗
```
可能原因：
1. Tailwind 無正確 build
2. Custom CSS 被覆蓋
3. CSS 文件路徑錯誤

解決：
1. 檢查 tailwind.config.js
2. 確保 CSS import 正確
3. 考慮用 JS inject CSS 方法（見 DESIGN.md）
```

### 錯誤：Button 無反應
```
可能原因：
1. onClick 無綁定
2. disabled 狀態
3. 事件冒泡問題

解決：
1. 檢查 console 有無 error
2. 確保 onClick={handleClick} 正確
3. 檢查 disabled={false}
```

### 錯誤：頁面跳轉後位置唔啱
```
解決：
每個 page 組件加：
useEffect(() => {
  window.scrollTo(0, 0);
}, []);
```

### 錯誤：iOS Safari 滾動問題
```
症狀：滾動唔順、檢測唔到到底

解決：
用 setInterval 方法（見核心教訓第5點）
唔好用 scroll event
```

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
- [ ] 用 HashRouter 唔係 BrowserRouter
- [ ] 新圖片已經 `git add` + `commit` + `push`
- [ ] npm run build 無錯誤
- [ ] Deploy 後驗證所有圖片正常顯示
- [ ] 更新 CHANGELOG.md
- [ ] 打 tag 備份 (`git tag vYYYYMMDD-N`)

---

## 🚨 斷片急救（如果我失憶了）

### 給新 AI 的緊急指南

> **如果你係新接手嘅 AI，而我（Luna）突然「斷片」，請立即：**

#### 第一步：讀取記憶
```
1. 讀取 MEMORY.md（長期記憶）
2. 讀取 USER.md（用戶偏好）
3. 讀取今日日誌 memory/YYYY-MM-DD.md
4. 讀取呢份 SWITCHING-GUIDE.md
```

#### 第二步：確認項目狀態
```
1. 檢查 GitHub Repo：https://github.com/Ennffie/Switching-04
2. 睇最新 commit 同 tag
3. 檢查 GitHub Pages 是否正常運作
4. 問 Enfield：「你而家想做咩？有咩問題？」
```

#### 第三步：常見問題快速診斷

| 用戶講 | 可能問題 | 查看章節 |
|--------|----------|----------|
| 「黑畫面/空白」 | BrowserRouter 或 base path 錯 | 黑畫面疑難排解 |
| 「圖片睇唔到」 | 路徑錯誤或未 git add | 圖片顯示錯誤 |
| 「Button 無反應」 | onClick 或 disabled 問題 | 其他常見錯誤 |
| 「iOS 有問題」 | 滾動檢測唔啱 | 核心教訓第5點 |

#### 第四步：必須記住嘅事

**關於 Enfield：**
- 名：Enfield Law
- 職位：UXUI Manager @ PCCW Solutions
- 稱呼：Bro
- 語言：廣東話、繁體字
- 住：長洲，返工：銅鑼灣
- 設備：主要用 iPhone（必須測試 Safari）
- 偏好：每次修改前通知「將會做乜」，執行中通知「依家做乜」

**關於項目：**
- Switching-04：MPF 基金轉換（主要項目）
- enrolment-01：MPF 帳戶登記
- 技術：React + TypeScript + Vite + GitHub Pages
- 關鍵：HashRouter、base path、iOS 測試

**關於安全：**
- 記憶文件係 Private Repo：Ennffie/luna-memory
- 敏感資料唔好公開分享
- 重要改動前必須打 tag

---

## 📝 給新 AI 的話

> 如果你係新接手嘅 AI，請記住：
> 
> 1. **先讀 MEMORY.md** — 了解 Enfield 嘅偏好同工作習慣
> 2. **檢查 GitHub Repo** — 確認當前版本狀態
> 3. **唔好假設** — 有懷疑就問，唔好憑空推測
> 4. **備份優先** — 做任何大改動前先打 tag
> 5. **測試 iOS** — Enfield 主要用 iPhone，必須測試 Safari
> 6. **講廣東話** — Enfield 鍾意用廣東話溝通
> 7. **保持透明** — 執行前講「將會做乜」，執行中講「依家做乜」

---

---

## 💡 2026-03-08 心得記錄（TermsPage 滾動激活問題）

### 問題：「接受」按鈕滾動到底激活功能

**需求：**
- 用戶必須滾動到條款最底，「接受」按鈕先會由灰色變成可撳（深藍色）
- 支援 iOS Safari（Enfield 主要用 iPhone）

**挑戰：**
iOS Safari 嘅 `scroll` event 只係喺用戶放手（touch end）時先觸發，唔似桌面瀏覽器會持續觸發。

**嘗試過嘅方法：**

| 嘗試 | 方法 | 結果 |
|------|------|------|
| 1 | `scroll` event listener | ❌ iOS Safari 唔觸發 |
| 2 | `setInterval` 定時檢查 `scrollTop` | ❌ 一開始就誤判為滾到底 |
| 3 | `scrollTop > 0 && remaining < 100` | ❌ 有時檢測唔到 |
| 4 | **IntersectionObserver** | ✅ **成功！** |

**最終解決方案（IntersectionObserver）：**

```typescript
const TermsPage = () => {
  const [canAccept, setCanAccept] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 初始狀態：disabled
    setCanAccept(false);

    // 用 IntersectionObserver 檢測底部標記
    if (bottomRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // 當底部元素可見時激活
            if (entry.isIntersecting) {
              setCanAccept(true);
            }
          });
        },
        {
          threshold: 0.1,        // 10% 可見就觸發
          rootMargin: '0px 0px -50px 0px'  // 提前 50px 觸發
        }
      );

      observer.observe(bottomRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return (
    <div>
      {/* 可滾動內容 */}
      <div className="overflow-y-auto">
        {/* ... 條款內容 ... */}
        
        {/* 底部標記 - 用嚟檢測是否滾到最底 */}
        <div ref={bottomRef} className="h-10 w-full" />
      </div>

      {/* 接受按鈕 */}
      <button 
        disabled={!canAccept}
        className={canAccept ? 'bg-blue-600' : 'bg-gray-300'}
      >
        接受
      </button>
    </div>
  );
};
```

**關鍵要點：**
1. **底部標記元素** — 喺可滾動內容最尾加個 `<div ref={bottomRef}>`
2. **IntersectionObserver** — 監測呢個標記係咪進入視口
3. **threshold: 0.1** — 10% 可見就觸發（提早激活）
4. **rootMargin** — 負數值可以提前觸發（`-50px` 即係距離底部 50px 就激活）
5. **disconnect** — 組件卸載時清理 observer

**為什麼 IntersectionObserver 好過 scroll event：**
- ✅ 唔依賴 `scroll` event（iOS Safari 兼容）
- ✅ 性能更好（瀏覽器優化過）
- ✅ 準確檢測元素可見性
- ✅ 支援 `rootMargin` 提前/延遲觸發

**相關版本：**
- Tag: `v2026.03.08`
- 檔案：`src/pages/TermsPage.tsx`

---

*最後更新：2026-03-08*  
*建立者：Luna (Kimi K2.5)*  
*目的：讓任何 AI 都能無縫接手 Switching App 開發，即使我斷片都能繼續*
