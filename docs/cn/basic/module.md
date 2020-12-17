
Valkyrie 中的导入非常简单, 一共就一个 import

```
import paclet.utils.{
    a.*
    b as c
    d.e.{self, f.g as h}
    i.{self, j}
}
```

或者你可能觉得全部展开比较爽

```
import paclet.utils.a.*
import paclet.utils.b as c
import paclet.utils.b.d.e
import paclet.utils.b.d.e.f.g as h
import paclet.utils.i
import paclet.utils.i.j
```

不支持直接 import 然后一个括号

你至少得有一级包名

也不能直接一个路径或者 url

那也太大道至简了

```
//! 想啥呢, 不存在的
@go import (
    "fmt" as fmt
    "github.com/go/die" as die
)
```

Valkyrie 中你确实可以用一个网络包, 不过不是这种形式

---

导出就更简单了, 连 public 和 export 都不用

module 标记存在一个包, `!` 表示可以导出, 完事

```
module a;
import! a.f as g
module! b;
```
