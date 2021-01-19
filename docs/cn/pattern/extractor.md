# Extractor

提取器模式代表类被写在 `let` 或者 `case` 之后的行为.


```valkyrie
trait Extractor {
    type Input;
    type Output: TupleType;
    extractor(object: Self::Input): Self::Output?
}
```

输入值为任意类型, 但是返回值需要是 tuple

---

## 常规提取器
假如我们想实现以下功能:

```valkyrie
# a = ['A', 'B', 'C']
let MyName(a) := 'A.B.C'
```

那么可以定义如下提取器:

```valkyrie
class MyName {}

extends MyName: Extractor<Input: StringView, Output: (String,)> {
    @never_null
    extract(string: StringView): Extractor::Output? {
        return string.split('.')
    }
}
```

由于 Extractor 已被注册为 `auto_trait`, 所以也可以直接定义 extract 函数

上面的代码可以简写为:

```valkyrie
class MyName {
    extract(string: StringView): String {
        return string.split('.')
    }
}
```

展开过程等价于如下代码

```valkyrie
let MyName(a) := 'A.B.C'

# _tmp = (['A', 'B', 'C'],)
let _tmp = MyName::extract('A::B::C')!
# a = ['A', 'B', 'C']
let a: [String] = _tmp.1
```

如果不加 `@never_null`, let 下的返回值会是可空值, case 下没有返回值.

```valkyrie
class MyName {
    extract(one: String): (String, String)? {
        let [one, two, **rest] = string.split('::');
        if rest.is_empty() {
            return (one, two)
        }
        else {
            return null
        }
    }
}
```

注意结果可能为空, 此时展开过程为:

```valkyrie
let MyName(a, b) := 'A::B'
let _tmp: (String, String)? = MyName::extract('A::B');
let a: String? = _tmp.map { $1.1 }
let b: String? = _tmp.map { $1.2 }
```

---

## 不交并的提取器


```valkyrie
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
extends<T, E> Result::Success<T, E>: Extractor<Input: Result<T, E>, Output=(T,)> {
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
extends<T, E> Result::Failure<T, E>: Extractor<Input: Result<T, E>, Output=(E,)> {
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
    case Success(v): print("success: {v}")
    case Failure(e): print("failure: {e}")
}
```

展开过程等价于如下代码:

```valkyrie
let v = Result::Success::extract(result);
if v != null {
    return print("success: {v}")
}
let e = Result::Failure::extract(result);
if e != null {
    return print("failure: {e}")
}
```

该实现较为繁琐, 可以使用宏来简化

```valkyrie
union Result<T, E> {
    @construct(value)
    @extract(value)
    Success {
        value: E
    }
    @construct(error)
    @extract(error)
    Failure {
        error: T
    }
}
```

