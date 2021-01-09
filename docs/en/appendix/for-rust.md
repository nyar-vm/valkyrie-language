# Rust user migration guide

| rs type           | vk type        | description       |
|:------------------|:---------------|-------------------|
| `bool`            | `Boolean`,     | alias is `bool`   |
| `char`            | `Unicode`,     | alias is `char`   |
| `&str`            | `UTF8View`,    | alias is `str`    |
| `String`          | `UTF8Text`,    | alias is `String` |
| `&[T]`            | `ArrayView<T>` |
| `Vec<T>`          | `Array<T>`     |
| `&T`              | `Reference<T>` |
| `Box<T>`          | `Pointer<T>`   |
| `Rc<T>`, `Arc<T>` | `Shared<T>`    |
| `Option<T>`       | `Option<T>`    |
| `Result<T, E>`    | `Result<T, E>` |

| rs variant | vk variant   | description |
|:-----------|:-------------|-------------|
| `Some(T)`  | `Some(T)`    |
| `None`     | `None`       |
| `Ok(T)`    | `Success(T)` |
| `Err(E)`   | `Failure(E)` |
