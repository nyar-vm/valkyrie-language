


| Type   | Heterogeneous | Extensible |
|--------|---------------|------------|
| Array   | Yes           | Yes        |
| Tuple   | Yes           | Yes        |
| Vector  | Yes           | Yes        |
| List | Yes           | Yes        |

## Array

`IndexMap` is a Map that preserves the order of the keys.

## Tuple

Aka `Heterogeneous Array`

Tuple 能够储存不同的类型


## Vector

Aka `Extensible Array`

`BTreeMap` is a Map that preserves the order of the keys.

## List

Aka `Heterogeneous Vector`


## Dict

`Dict` is a `OrderedMap` with string keys.

```vk
type Dict[T] = OrderedMap[String, T]
```
