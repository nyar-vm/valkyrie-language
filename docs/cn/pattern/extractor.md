# Extractor

提取器模式代表 case 左边的 `Name()`


```scala
trait Extractor {
    type Output: TupleType;
    @overloaded(in, out)
    extractor(object): Self::Output?
}
```

该函数入参和返回值都可以重载, 但是返回值需要是 tuple

---

# 常规提取器

加入我们想实现以下功能:

```scala
# a = ['A', 'B', 'C']
let MyName(a) := 'A.B.C'
```

那么可以定义如下提取器:

```scala
class MyName {}

extends MyName: Extractor<Output: (String,)> {
    extract(string: String): Extractor::Output?{
        return string.split('.')
    }
}
```

由于 Extractor 已被注册为 `auto_trait`, 所以也可以直接定义 extract 函数

上面的代码等价于:

```scala
class MyName {
    @never_null # skip null check
    extract(string: String): (String,)? {
        return string.split('.')
    }
}
```

展开过程等价于如下代码

```scala
let MyName(a) := 'A.B.C'

# _tml = (['A', 'B', 'C'],)
let _tmp = MyName::extract('A::B::C')
# a = ['A', 'B', 'C']
let a = _tmp!.1
```



---

# 不交并的提取器


```scala
# 定义不交并
union Result<T, E> {
    Success {
        value: E
    }
    Failure {
        error: T
    }
}

# 定义成功情况的提取器
extends<T, E> Result::Success<T, E>: Extractor<Output=(T,)> {
    extractor(result: Result<T, E>) -> (T,)? {
        result.match {
            case Result::Success { value }:
                value
            else:
                null
        }
    }
}

# 定义失败情况的提取器
extends<T, E> Result::Failure<T, E>: Extractor<Output=(E,)> {
    extractor(result: Result<T, E>) -> (E,)? {
        result.match {
            case Result::Success { value: _ }:
                null
            case Result::Failure { error }:
                error
        }
    }
}

# 于是可以写出如下调用

result.match {
    case Success(v): print(v)
    case Failure(e): print(e)
}

# 等价于
let v = Result::Success::extractor(result);
if v != null {
    return print(v)
}
let e = Result::Failure::extractor(result);
if e != null {
    return print(e)
}
```

该过程较为繁琐, 可以使用宏来简化

```
union Result<T, E> {
    @extract(value)
    Success {
        value: E
    }
    @extract(error)
    Failure {
        error: T
    }
}
```

