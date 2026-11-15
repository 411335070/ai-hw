/**
 * 快速新增筆記腳本 (new-note.js)
 * 
 * 使用方式：
 *   node scripts/new-note.js <科目目錄名稱> <筆記名稱>
 * 範例：
 *   node scripts/new-note.js database-programming "關聯式資料庫基本概念"
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const NOTES_DIR = path.join(rootDir, 'docs', 'notes');
const CONFIG_PATH = path.join(rootDir, 'docs', '.vitepress', 'config.ts');

const args = process.argv.slice(2);

const subjectSlug = args[0];
const noteTitle = args[1];

if (!subjectSlug || !noteTitle) {
  console.log('❌ 參數不足！');
  console.log('使用方式：node scripts/new-note.js <科目代碼> <筆記名稱>');
  console.log('可選科目代碼：');
  const subjects = fs.readdirSync(NOTES_DIR).filter(f => fs.statSync(path.join(NOTES_DIR, f)).isDirectory());
  subjects.forEach(s => console.log(`  - ${s}`));
  process.exit(1);
}

const targetSubjectDir = path.join(NOTES_DIR, subjectSlug);
if (!fs.existsSync(targetSubjectDir)) {
  console.log(`❌ 找不到科目目錄: ${subjectSlug}`);
  process.exit(1);
}

// 建立筆記檔名（英文連字號或拼音/中文名）
const sanitizedFileName = noteTitle.replace(/[\\/:*?"<>|]/g, '-').trim();
const filePath = path.join(targetSubjectDir, `${sanitizedFileName}.md`);

if (fs.existsSync(filePath)) {
  console.log(`⚠️ 該筆記檔案已存在: ${filePath}`);
  process.exit(1);
}

const today = new Date().toISOString().split('T')[0];
const template = `---
title: ${noteTitle}
date: ${today}
tags: [${subjectSlug}]
summary: ${noteTitle} 課堂學習筆記
---

# ${noteTitle}

本篇為 **${noteTitle}** 學習筆記。

---

## 1. 核心重點
> 在此記錄重點觀念、理論或公式。

---

## 2. 實作與範例
\`\`\`text
在此記錄代碼或實作過程
\`\`\`

---

## 3. 參考連結
- [回科目首頁](./index.md)
`;

fs.writeFileSync(filePath, template, 'utf-8');
console.log(`✅ 已建立筆記: docs/notes/${subjectSlug}/${sanitizedFileName}.md`);

// 自動同步至 config.ts 側邊欄
if (fs.existsSync(CONFIG_PATH)) {
  let configContent = fs.readFileSync(CONFIG_PATH, 'utf-8');
  const subjectKey = `'/notes/${subjectSlug}/': [`;
  if (configContent.includes(subjectKey)) {
    const itemEntry = `            { text: '${noteTitle}', link: '/notes/${subjectSlug}/${sanitizedFileName}' },\n`;
    const searchTarget = `items: [\n            { text: '科目總覽與章節清單', link: '/notes/${subjectSlug}/' },\n`;
    if (configContent.includes(searchTarget)) {
      configContent = configContent.replace(searchTarget, searchTarget + itemEntry);
      fs.writeFileSync(CONFIG_PATH, configContent, 'utf-8');
      console.log(`✅ 已自動將筆記加入側邊欄導覽！`);
    }
  }
}
