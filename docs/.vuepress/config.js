module.exports = {
    dest: 'docs/.build',
    locales: {
        '/': {
            lang: 'zh-CN',
            title: 'TemplateVuepress',
            lastUpdated: 'Last Updated',
        }
    },
    head: [
        ['link', { rel: 'shortcut icon', type: "image/x-icon", href: './favicon.png' }]
    ],
    themeConfig: {
        repo: 'GalAster/TemplateVuepress',
        editLinks: true,
        docsDir: 'docs',
        markdown: {
            lineNumbers: true
        },
        sidebar: [
            {
                title: '附录',
                collapsable: true,
                children: [
                    ['/appendix', 'Appendix'],
                ]
            },
        ]
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
