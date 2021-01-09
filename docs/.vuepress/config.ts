import {SidebarConfig, SiteLocaleConfig} from "vuepress";
import {SidebarConfigArray} from "@vuepress/theme-default/lib/shared/nav";

import {defineUserConfig, defaultTheme} from 'vuepress'
import {shikiPlugin} from "@vuepress/plugin-shiki";
import {IGrammar} from "vscode-textmate";
import * as path from "path";


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
        text: 'Literals',
        collapsible: false,
        children: [
            {
                text: "Overview",
                link: "/en/literal/readme.md",
            },
            {
                text: "Number Literal",
                link: "/en/literal/number.md",
            },
            {
                text: "String Formatted",
                link: "/en/literal/string.md",
            },
            {
                text: "String Templated",
                link: "/en/literal/template.md",
            },
        ]
    },
    {
        text: 'Collections',
        collapsible: false,
        children: [
            {
                text: "Overview",
                link: "/en/collection/readme.md",
            },

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
        ]
    },
    {
        text: 'Definitions',
        collapsible: false,
        children: [
            {
                text: "Overview",
                link: "/en/definition/readme.md",
            },
            {
                text: "Let Bind",
                link: "/en/definition/let-binding.md",
            },
            {
                text: "Micro Process",
                link: "/en/definition/def-micro.md",
            },
            {
                text: "Macro Process",
                link: "/en/definition/def-macro.md",
            },
            {
                text: "Aliased Type",
                link: "/en/definition/readme.md",
            },
            {
                text: "Structures",
                link: "/en/definition/structure.md",
            },
            {
                text: "Inheritance",
                link: "/en/definition/readme.md",
            },
            {
                text: "Interfaces",
                link: "/en/definition/interface.md",
            },
            {
                text: "Association Type",
                link: "/en/definition/readme.md",
            },
            {
                text: "Enumerations",
                link: "/en/definition/enumerate.md",
            },
            {
                text: "Flags",
                link: "/en/definition/flags.md",
            },
            {
                text: "Unions",
                link: "/en/definition/union.md",
            },
            {
                text: "Unites",
                link: "/en/definition/disjoint-union.md",
            },
        ]
    },
    {
        text: 'Invokes',
        collapsible: false,
        children: [
            {
                text: "Overview",
                link: "/en/definition/readme.md",
            },
            {
                text: "Function Call",
                link: "/en/definition/readme.md",
            },
            {
                text: "Function Dot Call",
                link: "/en/definition/readme.md",
            },
            {
                text: "Index Call",
                link: "/en/definition/readme.md",
            },
            {
                text: "Slice Call",
                link: "/en/definition/readme.md",
            },
            {
                text: "Lambda Call",
                link: "/en/definition/readme.md",
            },
            {
                text: "Lambda Dot Call",
                link: "/en/definition/readme.md",
            }

        ]
    },
    {
        text: 'Appendix',
        collapsible: false,
        children: [
            {
                text: "Rust User Guide",
                link: "/en/appendix/for-rust.md",
            },
        ]
    }
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
    plugins: [
        shikiPlugin({
            theme: "monokai",
            langs: [
                "hs",
                "typescript",
                "python",
                "rust",
                "yaml",
                {
                    id: "Valkyrie",
                    scopeName: "source.vk",
                    aliases: ["vk", "valkyrie"],
                    // samplePath? : string;
                    // embeddedLangs? : Lang[];
                    // balancedBracketSelectors? : string[];
                    // unbalancedBracketSelectors? : string[];
                    path: path.resolve("./docs/.vuepress/styles/valkyrie.tmLanguage.json"),
                    // grammar? : IGrammar;
                }
            ]
        }),
    ],
})
