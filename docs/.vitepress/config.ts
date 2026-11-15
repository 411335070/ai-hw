import { defineConfig } from 'vitepress'

export default defineConfig({
  // 設定 GitHub Pages 儲存庫路徑
  base: '/ai-hw/',
  title: '資管系學習筆記',
  description: '國立東華大學 115-1 資訊管理學系 個人課程學習筆記知識庫',
  
  // 全面啟用暗色系主題
  appearance: 'force-dark',

  markdown: {
    math: true
  },

  themeConfig: {
    siteTitle: '🎓 資管學習筆記庫',
    logo: '📚',

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜尋全站筆記',
                buttonAriaLabel: '搜尋全站筆記'
              },
              modal: {
                noResultsText: '找不到相關結果',
                resetButtonTitle: '清除查詢',
                footer: {
                  selectText: '選擇',
                  navigateText: '切換',
                  closeText: '關閉'
                }
              }
            }
          }
        }
      }
    },

    // 頂部導航
    nav: [
      { text: '首頁課表', link: '/' },
      { text: '📤 上傳與線上修改', link: '/upload' },
      { text: '專案規範指南 (agent.md)', link: '/agent' },
      {
        text: '核心專業科目',
        items: [
          { text: '資料庫程式設計與管理', link: '/notes/database-programming/' },
          { text: '物件導向技術', link: '/notes/object-oriented-programming/' },
          { text: '計算機概論', link: '/notes/introduction-to-computer-science/' },
          { text: '資料探勘', link: '/notes/data-mining/' },
          { text: '系統分析與設計', link: '/notes/systems-analysis-and-design/' }
        ]
      },
      {
        text: '管理與專題',
        items: [
          { text: '企業資源規劃 (ERP)', link: '/notes/enterprise-resource-planning/' },
          { text: '企業倫理講座', link: '/notes/business-ethics/' },
          { text: '資訊管理專題', link: '/notes/mis-project/' }
        ]
      },
      {
        text: '語文通識',
        items: [
          { text: '英語溝通二級 AI', link: '/notes/english-communication/' },
          { text: 'AI與科技輔助英語學習', link: '/notes/ai-assisted-english/' }
        ]
      }
    ],

    // 側邊欄配置
    sidebar: {
      '/upload': [
        {
          text: '筆記管理指引',
          items: [
            { text: '線上上傳與修改說明', link: '/upload' }
          ]
        }
      ],
      '/agent': [
        {
          text: '專案最高規範',
          items: [
            { text: 'agent.md 規格指南', link: '/agent' }
          ]
        }
      ],
      '/notes/database-programming/': [
        {
          text: '資料庫程式設計與管理',
          items: [
            { text: '科目總覽與章節清單', link: '/notes/database-programming/' }
          ]
        }
      ],
      '/notes/object-oriented-programming/': [
        {
          text: '物件導向技術',
          items: [
            { text: '科目總覽與章節清單', link: '/notes/object-oriented-programming/' }
          ]
        }
      ],
      '/notes/introduction-to-computer-science/': [
        {
          text: '計算機概論',
          items: [
            { text: '科目總覽與章節清單', link: '/notes/introduction-to-computer-science/' }
          ]
        }
      ],
      '/notes/enterprise-resource-planning/': [
        {
          text: '企業資源規劃功能模組導論',
          items: [
            { text: '科目總覽與章節清單', link: '/notes/enterprise-resource-planning/' }
          ]
        }
      ],
      '/notes/data-mining/': [
        {
          text: '資料探勘',
          items: [
            { text: '科目總覽與章節清單', link: '/notes/data-mining/' }
          ]
        }
      ],
      '/notes/ai-assisted-english/': [
        {
          text: 'AI與科技輔助英語學習二級',
          items: [
            { text: '科目總覽與章節清單', link: '/notes/ai-assisted-english/' }
          ]
        }
      ],
      '/notes/business-ethics/': [
        {
          text: '企業倫理講座',
          items: [
            { text: '科目總覽與章節清單', link: '/notes/business-ethics/' }
          ]
        }
      ],
      '/notes/systems-analysis-and-design/': [
        {
          text: '系統分析與設計',
          items: [
            { text: '科目總覽與章節清單', link: '/notes/systems-analysis-and-design/' }
          ]
        }
      ],
      '/notes/english-communication/': [
        {
          text: '英語溝通二級 AI',
          items: [
            { text: '科目總覽與章節清單', link: '/notes/english-communication/' }
          ]
        }
      ],
      '/notes/mis-project/': [
        {
          text: '資訊管理專題',
          items: [
            { text: '科目總覽與章節清單', link: '/notes/mis-project/' }
          ]
        }
      ]
    },

    outline: {
      level: [2, 3],
      label: '本頁目錄'
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    // 支援每頁線上直接編輯
    editLink: {
      pattern: 'https://github.com/411335070/ai-hw/edit/main/docs/:path',
      text: '✏️ 在 GitHub 上直接編輯此頁'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ]
  }
})
