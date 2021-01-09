


| 类型       | 异质  | 扩张  |
|----------|-----|-----|
| `Array`  | Yes | Yes |
| `Tuple`  | Yes | Yes |
| `Vector` | Yes | Yes |
| `List`   | Yes | Yes |

## Array

`IndexMap` is a Map that preserves the order of the keys.

## Tuple

Aka `Heterogeneous Array`

Tuple 能够储存不同的类型


## Vector

Aka `Extensible Array`

`BTreeMap` is a Map that preserves the order of the keys.

## List

在其他语言里也被叫做 [HList (Haskell)](https://hackage.haskell.org/package/HList), [HList (Scala)](https://www.scala-exercises.org/shapeless/heterogenous_lists).


## Dict

`Dict` is a `OrderedMap` with string keys.

```vk
type Dict[T] = OrderedMap[String, T]
```
