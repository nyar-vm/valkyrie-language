### Type Cast Hook

```scala
@type_cast.implicit: Graph
@type_cast.implicit.clear: ()
@type_cast.implicit.try {Integer => Decimal} : bool
@type_cast.implicit.insert {Integer8 => Integer => Decimal}: ()
@type_cast.implicit.remove {Integer => Decimal}: ()
```


类型转换是一个有向图, 前后节点之间实现了 `After: From[Before]`.

转换选取的函数会是节点中的最短路径, 该选取在编译期发生.

```
class macro type_cast {
    implicit_graph: Graph[Type]
    constructor() {
        this.implicit_graph = Graph()
    }
    @inline
    def implicit(): Graph { implicit_graph }
    def implicit.clear() { }
    def implicit.try(input: Expression): bool { }
    def implicit.insert(input: Expression) { }
    def implicit.remove(input: Expression) { }
}
```
