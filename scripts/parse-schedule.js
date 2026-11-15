import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const NOTES_DIR = path.join(rootDir, 'docs', 'notes');

// 從東華大學 115-1 課表圖片辨識解析出的課程清單
const subjects = [
  {
    slug: 'english-communication',
    title: '英語溝通二級 AI',
    time: '星期一 10~11 節 (15:10~17:00)',
    location: '人社三館 B111',
    category: '語文通識'
  },
  {
    slug: 'object-oriented-programming',
    title: '物件導向技術',
    time: '星期二 9~11 節 (14:10~17:00)',
    location: '圖資中心 PC2 (B106)',
    category: '專業必選修'
  },
  {
    slug: 'database-programming',
    title: '資料庫程式設計與管理 AB',
    time: '星期三 4~6 節 (09:10~12:00)',
    location: '管理學院 C203 / C209',
    category: '專業核心'
  },
  {
    slug: 'introduction-to-computer-science',
    title: '計算機概論 AB',
    time: '星期三 9~11 節 (14:10~17:00)',
    location: '理工二館 A337',
    category: '基礎核心'
  },
  {
    slug: 'enterprise-resource-planning',
    title: '企業資源規劃功能模組導論 AB',
    time: '星期四 4~6 節 (09:10~12:00)',
    location: '管理學院 C203 / C209',
    category: '專業選修'
  },
  {
    slug: 'data-mining',
    title: '資料探勘 AA',
    time: '星期四 9~11 節 (14:10~17:00)',
    location: '管理學院 D117',
    category: '專業進階'
  },
  {
    slug: 'ai-assisted-english',
    title: 'AI與科技輔助英語學習二級 AA',
    time: '星期五 3~4 節 (08:10~10:00)',
    location: '人社一館 D113',
    category: '科技語文'
  },
  {
    slug: 'business-ethics',
    title: '企業倫理講座 AC',
    time: '星期五 5~6 節 (10:10~12:00)',
    location: '管理學院 第一講堂 B210',
    category: '通識講座'
  },
  {
    slug: 'systems-analysis-and-design',
    title: '系統分析與設計',
    time: '星期五 9~11 節 (14:10~17:00)',
    location: '管理學院 B119',
    category: '專業核心'
  },
  {
    slug: 'mis-project',
    title: '資訊管理專題 AC',
    time: '與教師另行約定',
    location: '其他',
    category: '畢業專題'
  }
];

function initSubject(sub) {
  const targetDir = path.join(NOTES_DIR, sub.slug);
  const imagesDir = path.join(targetDir, 'images');

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
    fs.writeFileSync(path.join(imagesDir, '.gitkeep'), '', 'utf-8');
  }

  const today = new Date().toISOString().split('T')[0];
  const indexContent = `---
title: ${sub.title}
date: ${today}
tags: [${sub.title.split(' ')[0]}, ${sub.category}]
summary: ${sub.title} 課堂筆記、複習重點與專案紀錄
---

# 📖 ${sub.title}

本頁為 **${sub.title}** 的課程入口首頁。

## 📍 課程基本資訊
- **上課時間**：${sub.time}
- **教室地點**：${sub.location}
- **課程屬性**：${sub.category}

---

## 🎯 學期目標與評分標準
- 課堂出席與課前預習
- 實作演練與隨堂小考
- 期中 / 期末評量與專題實作

---

## 📝 章節筆記列表
- [01. 課程導論與環境建置](./01-introduction.md)
- *(待新增後續章節筆記)*

---

## 🔗 相關資源與講義
- [授課平台 / e-Learning](https://sys.ndhu.edu.tw/)
- [回到全站首頁](/)
`;

  const introContent = `---
title: 01. 課程導論與基礎概論
date: ${today}
tags: [${sub.title.split(' ')[0]}, 導論]
summary: ${sub.title} 第一週課程說明、評分方式與預習重點
---

# 01. 課程導論與基礎概論

本篇為 **${sub.title}** 第一週上課筆記。

---

## 1. 課程大綱
1. 課程進度規劃與核心理論
2. 常用工具、軟體與開發環境建置
3. 期中 / 期末評分標準與分組討論

---

## 2. 重點筆記與提要
> 💡 可以在此記錄課堂重點概念、架構圖或程式碼片段。

### 圖片引用範例
\`\`\`markdown
![課堂架構示意圖](./images/architecture.png)
\`\`\`

---

## 3. 課後待辦與參考連結
- [ ] 複習第一週授課講義
- [ ] 完成課前環境設定
- [回科目首頁](./index.md)
`;

  fs.writeFileSync(path.join(targetDir, 'index.md'), indexContent, 'utf-8');
  const introPath = path.join(targetDir, '01-introduction.md');
  if (!fs.existsSync(introPath)) {
    fs.writeFileSync(introPath, introContent, 'utf-8');
  }

  console.log(`✅ 已初始化科目: [${sub.title}] -> docs/notes/${sub.slug}/`);
}

for (const sub of subjects) {
  initSubject(sub);
}

console.log('\n🎉 所有 10 門科目目錄與初始筆記已全數建立完成！');
