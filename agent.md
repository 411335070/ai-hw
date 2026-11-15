# Agent Guide & Project Specification: Personal Subject Notes System

這份文件是本專案的最高規範與指南。無論是人類開發者或是協作的 AI Agent，在維護、擴充功能、新增科目或編寫筆記時，都必須嚴格遵循本文件的定義與原則。

---

## 1. 專案目的 (Project Purpose)

- **核心定位**：個人自用、多科目分類導向的靜態學習筆記知識庫。
- **核心目標**：
  1. **結構化管理**：依據學校課程/自學科目分類，提供階層化樹狀導航與清晰章節大綱。
  2. **輕量極速**：基於純 Markdown 撰寫，無後端負擔，載入快速且支援全文搜尋。
  3. **自動化發布**：串接 GitHub Actions，推播（`git push`）即自動構建並免費發布至 GitHub Pages。
  4. **課表與自動化**：支援「手動新增」與「讀取課表圖片自動初始化科目目錄」，加速每學期課程設定。
  5. **富文字擴充**：支援數學公式（LaTeX/KaTeX）、程式碼語法高亮、本地圖片與外部/內部超連結引用。

---

## 2. 系統運作方式 (Operational Workflow)

- **基礎架構**：採用 [VitePress](https://vitepress.dev/) 作為靜態站點生成器（SSG），全站啟用沉浸式深色夜間模式（Dark Theme）。
- **工作流程**：
  1. **本地編輯 (Local Authoring)**：在本地使用 Markdown 編輯器（如 VS Code、Obsidian 或 Typora）撰寫各科筆記。
  2. **本機預覽 (Local Preview)**：執行 `npm run dev` 啟動本地開發伺服器，支援熱重載（Hot Reload）即時查看排版。
  3. **自動化部屬 (CI/CD)**：
     - 開發者將變更推播至 GitHub 的 `main` 分支。
     - GitHub Actions 自動執行 `.github/workflows/deploy.yml` 進行靜態打包（`npm run build`）。
     - 打包產物直接部屬至 GitHub Pages。
  4. **課表分析 (Timetable Automation)**：放置課表截圖至指定路徑，執行輔助腳本即可自動解析科目並生成目錄結構。

---

## 3. 檔案架構與命名規範 (File Structure & Naming Conventions)

### 3.1 目錄結構總覽

```text
study-notes/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 自動部署工作流
├── docs/                       # VitePress 內容根目錄
│   ├── .vitepress/
│   │   ├── config.ts           # 網站核心設定（標題、導覽列、側邊欄、搜尋）
│   │   └── theme/              # 自訂主題或樣式（可選）
│   ├── public/                 # 靜態資源（不經 Vite 編譯直接公開）
│   │   └── schedule/           # 課表原始圖片存放處
│   ├── index.md                # 網站首頁（儀表板、課表總覽、快捷入口）
│   └── notes/                  # 筆記存放主目錄
│       ├── calculus/           # 科目目錄（例如：微積分）
│       │   ├── index.md        # 科目總覽（大綱、計分方式、章節索引）
│       │   ├── 01-limits.md    # 章節筆記
│       │   └── images/         # 該科目筆記專屬圖片
│       └── computer-networks/  # 科目目錄（例如：計算機網路）
│           ├── index.md
│           ├── 01-osi-model.md
│           └── images/
├── scripts/                    # 自動化輔助腳本
│   └── parse-schedule.js       # 課表圖片解析與科目生成腳本
├── agent.md                    # 本規範文件
├── package.json                # 專案依賴與腳本定義
├── .gitignore
└── README.md
```

### 3.2 命名規則

1. **科目目錄名稱**：一律使用**全小寫英文字母與連字號（kebab-case）**，例如 `linear-algebra`、`data-structures`、`physics`。
2. **筆記檔案名稱**：
   - 章節型筆記：`序號-主題簡稱.md`（例如：`01-limits-and-derivatives.md`、`02-integration.md`）。
   - 日期記錄型筆記：`YYYY-MM-DD-主題.md`（例如：`2026-11-15-lab-notes.md`）。
3. **圖片檔案名稱**：一律放置於該科目的 `images/` 子目錄中，命名格式為 `kebab-case.png` 或 `主題-序號.png`（例如：`derivative-tangent-line.png`）。

### 3.3 Frontmatter 規範

每篇筆記檔案頂部**必須**包含標準 YAML Frontmatter，以便首頁與搜尋引擎提取資訊：

```yaml
---
title: 微積分：極限與連續
date: 2026-11-15
tags: [微積分, 基礎數學]
summary: 記錄第一單元極限的概念、常見計算技巧與連續性定理
---
```

---

## 4. 媒體與超連結規範 (Media & Links Guide)

### 4.1 圖片加入方式

1. **科目專屬圖片（推薦）**：
   - 存放位置：`docs/notes/<科目名稱>/images/`
   - **標準 Markdown 插入**：
     ```markdown
     ![極限切線示意圖](./images/derivative-tangent-line.png)
     ```
   - **自訂尺寸與置中（HTML 語法）**：
     ```html
     <p align="center">
       <img src="./images/derivative-tangent-line.png" alt="極限切線示意圖" width="550" />
       <br>
       <em>圖 1.1：函數在臨界點之切線斜率</em>
     </p>
     ```
2. **全站通用圖片（如 Logo、首頁 Banner）**：
   - 存放位置：`docs/public/images/`
   - 引用語法：直接以 `/images/...` 開頭，例如 `![Site Logo](/images/logo.png)`。

### 4.2 網址與連結加入方式

1. **外部網址**：
   ```markdown
   [微積分開放課程（MIT OCW）](https://ocw.mit.edu)
   ```
   *VitePress 會自動在外鏈附加小圖示，並預設於新分頁開啟。*
2. **同科目章節跳轉**：
   ```markdown
   [上一章：極限定理](./01-limits.md)
   ```
3. **跨科目雙向連結**：
   ```markdown
   [參考資料：計算機網路 OSI 模型](/notes/computer-networks/01-osi-model.md)
   ```
4. **註腳與參考文獻（Footnotes）**：
   ```markdown
   這一定理在近代分析學中扮演關鍵角色[^1]。

   [^1]: 參見 Stewart Calculus 第八版第 2 章。
   ```

---

## 5. 新增與操作流程指南 (How-To Guide)

### 5.1 方式一：讀取課表圖片自動新增科目（開學/新學期推薦）
1. 將課表截圖儲存至 `docs/public/schedule/timetable.png`。
2. 執行指令：
   ```bash
   npm run schedule:import
   ```
   *(或由 AI Agent 檢視圖片內容直接執行解析)*
3. 腳本或 Agent 會自動：
   - 辨識圖片中的科目名稱、星期幾與節次。
   - 在 `docs/notes/` 建立對應的科目目錄與初始 `index.md`。
   - 在 `docs/.vitepress/config.ts` 更新側邊欄（Sidebar）配置。
   - 在 `docs/index.md` 更新視覺化課表。

### 5.2 方式二：手動新增科目
1. 在 `docs/notes/` 下建立新科目目錄，例如 `docs/notes/physics/`。
2. 在該目錄下建立 `index.md`，作為該科目的首頁。
3. 同時建立 `docs/notes/physics/images/` 以供未來存放圖片。
4. 打開 `docs/.vitepress/config.ts`，在 `themeConfig.sidebar` 中加入此科目的側邊欄路由。

### 5.3 方式三：線上直接編輯既有筆記（推薦！免本機環境）
1. 在瀏覽網站時，滑動至任何筆記或科目總覽頁面最底部。
2. 點擊 **「✏️ 在 GitHub 上直接編輯此頁」** 按鈕。
3. 瀏覽器將直接開啟 GitHub 線上 Markdown 編輯器，可直接修改文字、補充筆記與修正公式。
4. 編輯完成後，點擊右上角 **「Commit changes...」** 提交變更。
5. GitHub Actions 將在 1~2 分鐘內自動重新構建，線上網站即時更新。

### 5.4 方式四：線上直接上傳筆記檔案（拖曳上傳）
1. 前往 GitHub 儲存庫的筆記目錄：`docs/notes/<科目名稱>/`。
2. 點選右上角的 **「Add file」 $\rightarrow$ 「Upload files」**。
3. 將電腦中寫好的 `.md` 筆記檔案拖曳至上傳區塊。
4. 點擊 **「Commit changes」** 完成上傳。
5. 線上網站將自動整合新上傳的檔案。

### 5.5 方式五：本地端新增筆記
- **檔案拖曳**：直接將 `.md` 筆記放進 `docs/notes/<科目名稱>/` 目錄。
- **終端機快速生成**：在專案目錄執行：
  ```bash
  node scripts/new-note.js <科目目錄英文名> "<筆記名稱>"
  ```
  *(腳本將自動建立帶有標準 Frontmatter 模板的檔案，並同步更新側邊欄導覽)*

---

## 6. GitHub 建立與部署指南 (GitHub Setup & Deployment)

### 6.1 GitHub 儲存庫初始化指令
在本地專案目錄執行：
```bash
git init
git add .
git commit -m "chore: initial commit with vitepress setup and agent guide"
git branch -M main
git remote add origin https://github.com/411335070/ai-hw.git
git push -u origin main
```

### 6.2 GitHub Pages 權限設定（關鍵步驟）
1. 進入 GitHub 儲存庫頁面，點選 **Settings** $\rightarrow$ **Pages**。
2. 在 **Build and deployment** $\rightarrow$ **Source** 下拉選單中，選擇 **GitHub Actions**。
3. 往後每次 `git push origin main`，GitHub Actions 就會自動構建並完成發布。

### 6.3 專案路徑配置注意事項（Base URL）
儲存庫名稱為 `ai-hw`（存取網址為 `https://411335070.github.io/ai-hw/`），已在 `docs/.vitepress/config.ts` 中設定：
```ts
export default defineConfig({
  base: '/ai-hw/', // 與 GitHub 儲存庫名稱一致
  // ...
})
```
*(若為 `<username>.github.io` 根網域名稱，則設為 `'/'`)*

---

## 7. AI Agent 行為準則 (Rules for AI Agents)

1. **目錄規範維持**：任何時候不得在根目錄散落筆記檔案；所有筆記必須位於 `docs/notes/<subject>/` 內。
2. **導航同步更新**：新增、刪除或重命名筆記時，必須主動檢查並同步更新 `docs/.vitepress/config.ts` 中的 `sidebar` 設定。
3. **保持純靜態相容**：不得安裝需要 Node 後端伺服器（Express/NestJS/資料庫驅動）才能運行的套件，所有功能必須能在靜態 HTML/JS 運行環境下被打包。
4. **公式與代碼防護**：確保 LaTeX 公式（`$...$` 或 `$$...$$`）內的特殊字元不被 Markdown 轉義損壞。
