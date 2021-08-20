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

const sidebar_en: SidebarConfigArray = [
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
            {
                text: "List",
                link: "/en/collection/list.md",
            },
            {
                text: "Dict",
                link: "/en/collection/dict.md",
            },
            {
                text: "Map",
                link: "/en/collection/map.md",
            },
            {
                text: "Set",
                link: "/en/collection/set.md",
            },
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
                text: "Types",
                link: "/en/definition/typing.md",
            },
            {
                text: "Structures",
                link: "/en/definition/structure.md",
            },
            {
                text: "Inheritance",
                link: "/en/definition/subtyping.md",
            },
            {
                text: "Interfaces",
                link: "/en/definition/interface.md",
            },
            {
                text: "Association Type",
                link: "/en/definition/associated.md",
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
                link: "/en/invoke/readme.md",
            },
            {
                text: "Function Call",
                link: "/en/invoke/apply.md",
            },
            {
                text: "Function Dot Call",
                link: "/en/invoke/apply-dot.md",
            },
            {
                text: "Index Call",
                link: "/en/invoke/subscript.md",
            },
            {
                text: "Slice Call",
                link: "/en/invoke/slice.md",
            },
            {
                text: "Lambda Call",
                link: "/en/invoke/lambda.md",
            },
            {
                text: "Lambda Dot Call",
                link: "/en/invoke/lambda-dot.md",
            }
        ]
    },
    {
        text: 'Control Flow',
        collapsible: false,
        target: "/en/control/readme.md",
        children: [
            {
                text: "Overview",
                link: "/en/control/readme.md"
            },
            {
                text: "If Statement",
                link: "/en/control/jump-if.md"
            },
            {
                text: "Switch Statement",
                link: "/en/control/jump-switch.md"
            },
            {
                text: "Non Locally Return",
                link: "/en/control/jump-control.md"
            },
            {
                text: "While Loop",
                link: "/en/control/loop-while.md"
            },
            {
                text: "For Loop",
                link: "/en/control/loop-for.md"
            },
            {
                text: "Auto Handler",
                link: "/en/control/handle-try.md"
            },
            {
                text: "Effect Handler",
                link: "/en/control/handle-catch.md"
            },
            {
                text: "Typing Handler",
                link: "/en/control/handle-match.md"
            },
        ]
    },
    {
        text: 'Advance',
        collapsible: false,
        children: [
            {
                text: "Overview",
                link: "/en/advance/readme.md",
            },
            {
                text: "Pattern Match",
                link: "/en/advance/pattern-match.md",
            },
            {
                text: "Extractor",
                link: "/en/advance/extractor.md",
            },
            {
                text: "Builder",
                link: "/en/advance/builder.md",
            },
            {
                text: "Logger",
                link: "/en/advance/logger.md",
            },
            {
                text: "Effect System",
                link: "/en/advance/effect-system.md",
            },
        ]
    },
    {
        text: 'Appendix',
        collapsible: false,
        children: [
            {
                text: "Keywords Summary",
                link: "/en/appendix/readme.md",
            },
            {
                text: "Rust User Guide",
                link: "/en/appendix/for-rust.md",
            },
        ]
    }
]

const theme = defaultTheme(
    {
        repo: 'nyar-lang/valkyrie-language',
        colorModeSwitch: true,
        docsBranch: "dev",
        editLink: true,
        docsDir: 'docs',
        lastUpdated: true,
        locales: {
            '/cn/': {
                selectLanguageText: '选择语言',
                selectLanguageName: "简体中文",
                editLinkText: '在 GitHub 上编辑此页',
                sidebar: {
                    "/cn/": sidebar_en,
                },
            },
            '/en/': {
                selectLanguageText: 'Languages',
                selectLanguageName: 'English',
                editLinkText: 'Edit this page on GitHub',
                sidebar: {
                    "/en/": sidebar_en
                },
                navbar: []
            },
        },
    }
)


export default defineUserConfig({
    dest: 'docs/.build',
    lang: 'en-US',
    title: 'Valkyrie Tutorial',
    description: 'A multi-stage gradual typed language',
    locales: locales,
    head: [
        ['link', {rel: 'shortcut icon', type: "image/x-icon", href: './favicon.png'}]
    ],
    theme: theme,
    // serviceWorker: true,
    markdown: {
        toc: {}

        // config: md => {
        //
        // }
    },
    plugins: [
        shikiPlugin({
            theme: "one-dark-pro",
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
