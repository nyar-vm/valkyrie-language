# Invoke Syntax

| syntax               | description                                                    |
|----------------------|----------------------------------------------------------------|
| `a`                  | get the variable `a`                                           |
| `a::Value`           | get associated constant of `a`                                 |
| `a(b)`               | function `a` applied to `b`                                    |
| `a?(b)`              | apply if a is not null, else null                              |
| `a.b()`              | call method `b` of `a`                                         |
| `a.b`                | same as `a.b()`                                                |
| `a?.b`               | call `b` if `a` is not null, else null                         |
| `a!`                 | unwrap if `a` is not null, else raise error                    |
| `a!!`                | unwrap `a` unchecked                                           |
| `a[index]`           | get the item at index `b` of `a`                               |
| `a?[index]`          | get the item at index `b` of `a` if `a` is not null, else null |
| `a[index] = c`       | set the item at index `b` of `a` to `c`                        |
| `a[start:end]`       | get the slice of `a` from `start` to `end`                     |
| `a[start:]`          | get the slice of `a` from `start` to the end                   |
| `a[:end]`            | get the slice of `a` from the start to `end`                   |
| `a[start:end:step]`  | get the slice of `a` from `start` to `end` with `step`         |
| `a {}`               | call lambda function, same a `a({})`                           |
| `a? {}`              | call lambda function if `a` is not null, else null             |
| `a { lambda (b): T}` | call lambda function complete form                             |
| `a.{ $x + 1 }`       | called by lambda function, same as `{ lambda(x) x + 1}(a)`     |
| `a?.{ $x + 1 }`      | called by lambda function if `a` is not null, else null        |
| `a::<T>`             | Fill generic type of `a`                                       |
| `a?::<T>`            | ❌ No such syntax                                               |
