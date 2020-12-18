(* ::Package:: *)

SetDirectory@FileNameJoin[{ParentDirectory@NotebookDirectory[], "docs"}];


files = FileNames["*.md", ".", Infinity];
halfwidth[path_] := Export[path,
    StringReplace[
        Import[path, "Text"],
        {
            "\:ff08" -> " (",
            "\:ff09" -> ") ",
            "\[OpenCurlyDoubleQuote]" -> "\"",
            "\[CloseCurlyDoubleQuote]" -> "\"",
            "\:ff01" -> "! ",
            "\:3002" -> ". ",
            "\:ff0c" -> ", ",
            "\:ff1a" -> ": "
        }
    ],
    "Text"
];


halfwidth /@ files
