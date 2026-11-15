# 📚 個人科目學習筆記 (Personal Study Notes)

基於 [VitePress](https://vitepress.dev/) 與 GitHub Pages 的自用多科目學習筆記知識庫。支援按科目分類、Markdown 寫作、LaTeX 數學公式、本地預覽與 GitHub Actions 自動化部署。

完整開發規範、檔案架構與新增流程請參閱 [agent.md](./agent.md)。

---

## 🚀 快速上手 (Quick Start)

### 1. 安裝相依套件
在專案根目錄執行：
```bash
npm install
```

### 2. 啟動本地即時預覽
```bash
npm run dev
```
瀏覽器打開 `http://localhost:5173` 即可查看與編輯筆記。

### 3. 本地打包測試
```bash
npm run build
npm run preview
```

---

## 📷 課表讀取與科目初始化

若要自動新增科目，可將課表截圖命名為 `timetable.png` 並放入 `docs/public/schedule/` 目錄，然後執行：
```bash
npm run schedule:import
```
或直接由 AI Agent 協助解析課表並建立相應章節。

---

## 🌐 部署至 GitHub Pages 指南

1. **建立 GitHub 儲存庫**：在 GitHub 上建立一個新的 Public 或 Private Repository（例如命名為 `study-notes`）。
2. **初始化並推播代碼**：
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit for study notes"
   git branch -M main
   git remote add origin https://github.com/<你的使用者名稱>/<你的儲存庫名稱>.git
   git push -u origin main
   ```
3. **開啟 GitHub Pages 權限**：
   - 進入儲存庫頁面 $\rightarrow$ **Settings** $\rightarrow$ **Pages**。
   - 在 **Build and deployment** $\rightarrow$ **Source** 選取 **GitHub Actions**。
4. **確認 Base 路徑**：
   - 若儲存庫名稱為 `study-notes`，請確認 `docs/.vitepress/config.ts` 中的 `base: '/study-notes/'` 與儲存庫名稱完全一致。
