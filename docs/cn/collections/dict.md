



## OrderedMap

在其他语言中也被叫做 [IndexMap (Rust)](https://hackage.haskell.org/package/ordered-containers),

有序表

```valkyrie
let mut map: OrderedMap[String, Int] = []
map.insert("a", 1)
map.insert("z", 26)
map.insert("c", 3)
print_line("${map}{:?}")
# OrderedMap { "a" => 1, "z" => 26, "c" => 3 }
```


## SortedMap

在其他语言中也被叫做 [BTreeMap (Rust)](https://hackage.haskell.org/package/ordered-containers)

排序表

```valkyrie
let mut map: SortedMap[String, Int] = []
map.insert("a", 1)
map.insert("z", 26)
map.insert("c", 3)
print_line("${map}{:?}")
# SortedMap { "a" => 1, "c" => 3, "z" => 26 }
```

## HashMap

哈希表

## Dict

`Dict` is a `OrderedMap` with string keys.

```valkyrie
type Dict[T] = OrderedMap[String, T]
```


```valkyrie
let map = [
    a: 1,
    z: 26,
    c: 3
]
print_line("${map}{:?}")
# OrderedMap { "a" => 1, "c" => 3, "z" => 26 }
```
