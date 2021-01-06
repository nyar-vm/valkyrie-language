import {SidebarConfig, SiteLocaleConfig} from "vuepress";
import {SidebarConfigArray} from "@vuepress/theme-default/lib/shared/nav";

import {defineUserConfig, defaultTheme} from 'vuepress'


const locales: SiteLocaleConfig = {
    '/cn/': {
        lang: 'zh-CN',
        title: 'Valkyrie 语言教程',

    },
    '/en/': {
        lang: 'en-US',
        title: 'Valkyrie Tutorial',
    }
};

const sidebar: SidebarConfigArray = [
    {
        text: 'Literal',
        // collapsable: false,
        children: [
            'literal/readme.md',
            'literal/number.md',
            'literal/string.md',
            'literal/string.md',

            // ['literal/operators', 'Operator'],
            // ['basic/variable', 'Variable'],
            // ['basic/function', 'Function'],
            // ['basic/class', 'Class'],
            // ['basic/trait', 'Trait'],
            // ['basic/enumerate', 'Enumerate'],
            // ['basic/pattern-match', 'Pattern Match'],
            // ['basic/control-flow', 'Control Flow'],
            // ['basic/error-handling', 'Error Handling'],
            // ['basic/unit-testing', 'Testing'],
            // ['basic/module', 'Module'],
            // ['basic/paclet', 'Paclet'],
        ]
    },
    // {
    //     text: 'Collections',
    //     collapsable: false,
    //     children: [
    //         ['collection/readme.md', 'Collection'],
    //         ['advance/', 'Handler Operators'],
    //         ['advance/operator-overloading', 'Operator Overloading'],
    //
    //         ['advance/collections', 'Collections'],
    //         ['advance/closure', 'Closure'],
    //         ['advance/iterators', 'Iterator'],
    //         ['advance/adhoc-polymorphism', 'Ad-hoc Polymorphism'],
    //         ['advance/generic-type', 'Generic Type'],
    //         ['advance/higher-kinded-type', 'Higher Kinded Type'],
    //         ['advance/algebraic-data-type', 'Algebraic Data Type'],
    //     ]
    // },
    // {
    //     title: 'Appendix',
    //     collapsable: false,
    //     children: [
    //         ['appendix/', 'Keywords'],
    //         ['appendix/identifier', 'Identifiers'],
    //     ]
    // }
]

const theme = defaultTheme(
    {
        repo: 'nyar-lang/ValkyrieTutorial',
        // editLinks: true,
        docsDir: 'docs',
        // markdown: {
        //     lineNumbers: true
        // },
        locales: {
            '/cn/': {
                // selectText: '选择语言',
                // label: '简体中文',
                editLinkText: '在 GitHub 上编辑此页',
                // serviceWorker: {
                //     updatePopup: {
                //         message: "发现新内容可用.",
                //         buttonText: "刷新"
                //     }
                // },
                sidebar: {
                    "/cn/": sidebar,
                },
            },
            '/en/': {
                // selectText: 'Languages',
                // label: 'English',
                // ariaLabel: 'Languages',
                editLinkText: 'Edit this page on GitHub',
                // serviceWorker: {
                //     updatePopup: {
                //         message: "New content is available.",
                //         buttonText: "Refresh"
                //     }
                // },
                sidebar: {
                    "/en/": sidebar
                }
            },
        },
    }
)


export default defineUserConfig({
    dest: 'docs/.build',
    lang: 'en-US',
    title: 'Hello VuePress',
    description: 'Just playing around',
    locales: locales,
    head: [
        ['link', {rel: 'shortcut icon', type: "image/x-icon", href: './favicon.png'}]
    ],
    theme: theme,
    // serviceWorker: true,
    markdown: {
        // config: md => {
        //
        // }
    },
    // plugins: {
    // mathjax: {
    //     target: 'chtml',
    //     presets: [],
    // },
    // }
})
