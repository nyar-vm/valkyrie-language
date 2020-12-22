# Valkyrie Language
[![discord](https://img.shields.io/discord/794446776232443955.svg?logo=discord&style=flat-square)](https://discord.gg/rDScD9GyUC)


## Design goals

Valkyrie Language is a dynamic language with progressive types,

Valkyrie’s design goals are flexible, concise and highly consistent.

Its blood comes from Rust, Scala and Swift.

(Originally called vlang, but then vlang was occupied :)

Next, we'll introduce the main features of Valkyrie Language

## Extension

If there is no extension, then Valkyrie is a very rigid and strict language.

Strictly uncomfortable, `1 + 1.0`, `"a" +'b'`, `[1] ++ 2`, none of them works.

Extensions gives Valkyrie a high degree of flexibility and possibility.

The extension named `Prelude` will be loaded by default. `Prelude` defines some common and reasonable arithmetic rules.

Extension can be inherited and rewritten, you can also define your own `Prelude`, and then form your own code style.

All the syntactic sugars in Valkyrie are statically determined by the corresponding traits to avoid unnecessary runtime overhead.



