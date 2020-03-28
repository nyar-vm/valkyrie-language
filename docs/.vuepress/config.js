const sidebar = [
    {
        title: 'Basic',
        collapsable: false,
        children: [
            ['basic/', 'Literal'],
            ['basic/types', 'Type'],
        ]
    },
    {
        title: 'Advance',
        collapsable: false,
        children: [
            ['advance/', 'Handler Operators'],
        ]
    },
    {
        title: 'Appendix',
        collapsable: false,
        children: [
            ['appendix/', 'Appendix A'],
            ['appendix/other', 'Appendix B'],
        ]
    }
]

module.exports = {
    dest: 'docs/.build',
    locales: {
        '/cn/': {
            lang: 'zh-CN',
            title: 'Valkyrie 语言教程',
            lastUpdated: 'Last Updated',
        },
        '/en/': {
            lang: 'en-US',
            title: 'Valkyrie Tutorial',
            lastUpdated: 'Last Updated',
        }
    },
    head: [
        ['link', { rel: 'shortcut icon', type: "image/x-icon", href: './favicon.png' }]
    ],
    themeConfig: {
        repo: 'nyar-lang/ValkyrieTutorial',
        editLinks: true,
        docsDir: 'docs',
        markdown: {
            lineNumbers: true
        },
        locales: {
            '/cn/': {
                selectText: '选择语言',
                label: '简体中文',
                editLinkText: '在 GitHub 上编辑此页',
                serviceWorker: {
                    updatePopup: {
                        message: "发现新内容可用.",
                        buttonText: "刷新"
                    }
                },
                sidebar: {
                    "/cn/": sidebar,
                }
            },
            '/en/': {
                selectText: 'Languages',
                label: 'English',
                ariaLabel: 'Languages',
                editLinkText: 'Edit this page on GitHub',
                serviceWorker: {
                    updatePopup: {
                        message: "New content is available.",
                        buttonText: "Refresh"
                    }
                },
                sidebar: {
                    "/en/": sidebar
                }
            },
        },
    },
    serviceWorker: true,
    markdown: {
        config: md => {
        }
    },
    plugins: {
        mathjax: {
            target: 'chtml',
            presets: [],
        },
    }
};
