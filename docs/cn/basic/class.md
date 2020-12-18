## Declaration

```ts
class {

}
```



构造体和我们在第三章讨论过的元组类似. 和元组一样, 构造体的每一部分可以是不同类型. 但不同于元组, 构造体需要命名各部分数据以便能清楚的表明其值的意义. 由于有了这些名字, 构造体比元组更灵活: 不需要依赖顺序来指定或访问实例中的值. 

定义构造体, 需要使用 `struct` 关键字并为整个构造体提供一个名字. 构造体的名字需要描述它所组合的数据的意义. 

接着, 在大括号中, 定义每一部分数据的名字和类型, 我们称为 **字段** (*field*) . 例如, 示例 5-1 展示了一个存储用户账号信息的构造体: 

```ts
class User {
    username: str,
    email: str,
    vip: bool,
    score: u64
}
```

## New Object

为了使用构造体, 通过为每个字段指定具体值来创建这个构造体的 **实例**. 

创建一个实例需要以构造体的名字开头, 接着在大括号中使用 `key: value` 键-值对的形式提供字段, 其中 key 是字段的名字, value 是需要存储在字段中的数据值. 实例中字段的顺序不需要和它们在构造体中声明的顺序一致. 换句话说, 构造体的定义就像一个类型的通用模板, 而实例则会在这个模板中放入特定数据来创建这个类型的值. 例如, 可以像示例 5-2 这样来声明一个特定的用户: 

```ts
new User {
    username: "valkyrie",
    email: "valkyrie@nyar.org",
    score: 0,
    vip: false,
};
```


## Constructor

为了从构造体中获取某个特定的值, 可以使用点号. 如果我们只想要用户的邮箱地址, 可以用 `user1.email`. 要更改构造体中的值, 如果构造体的实例是可变的, 我们可以使用点号并为对应的字段赋值. 示例 5-3 展示了如何改变一个可变的 `User` 实例 `email` 字段的值: 

```rust
# struct User {
#     username: String,
#     email: String,
#     sign_in_count: u64,
#     active: bool,
# }
#
let mut user1 = User {
    email: String::from("someone@example.com"),
    username: String::from("someusername123"),
    active: true,
    sign_in_count: 1,
};

user1.email = String::from("anotheremail@example.com");
```

<span class="caption">示例 5-3: 改变 `User` 实例 `email` 字段的值</span>

注意整个实例必须是可变的；Rust 并不允许只将某个字段标记为可变. 另外需要注意同其他任何表达式一样, 我们可以在函数体的最后一个表达式中构造一个构造体的新实例, 来隐式地返回这个实例. 

示例 5-4 显示了一个 `build_user` 函数, 它返回一个带有给定的 email 和用户名的 `User` 构造体实例. `active` 字段的值为 `true`, 并且 `sign_in_count` 的值为 `1`. 

```rust
# struct User {
#     username: String,
#     email: String,
#     sign_in_count: u64,
#     active: bool,
# }
#
fn build_user(email: String, username: String) -> User {
    User {
        email: email,
        username: username,
        active: true,
        sign_in_count: 1,
    }
}
```

<span class="caption">示例 5-4: `build_user` 函数获取 email 和用户名并返回 `User` 实例</span>

为函数参数起与构造体字段相同的名字是可以理解的, 但是不得不重复 `email` 和 `username` 字段名称与变量有些啰嗦. 如果构造体有更多字段, 重复每个名称就更加烦人了. 幸运的是, 有一个方便的简写语法! 

### Shorthand Constructor

因为示例 5-4 中的参数名与字段名都完全相同, 我们可以使用 **字段初始化简写语法** (*field init shorthand*) 来重写 `build_user`, 这样其行为与之前完全相同, 不过无需重复 `email` 和 `username` 了, 如示例 5-5 所示. 

```rust
class User {
    username: str,
    email: str,
    vip: bool,
    score: u64
}

fn new_user(email: String, username: String) -> User {
    User {
        email,
        username,
        active: true,
        sign_in_count: 1,
    }
}
```

<span class="caption">示例 5-5: `build_user` 函数使用了字段初始化简写语法, 因为 `email` 和 `username` 参数与构造体字段同名</span>

这里我们创建了一个新的 `User` 构造体实例, 它有一个叫做 `email` 的字段. 我们想要将 `email` 字段的值设置为 `build_user` 函数 `email` 参数的值. 因为 `email` 字段与 `email` 参数有着相同的名称, 则只需编写 `email` 而不是 `email: email`. 

### Update Constructor

使用旧实例的大部分值但改变其部分值来创建一个新的构造体实例通常是很有帮助的. 这可以通过 **构造体更新语法** (*struct update syntax*) 实现. 

首先, 示例 5-6 展示了不使用更新语法时, 如何在 `user2` 中创建一个新 `User` 实例. 我们为 `email` 和 `username` 设置了新的值, 其他值则使用了实例 5-2 中创建的 `user1` 中的同名值: 

```rust
# struct User {
#     username: String,
#     email: String,
#     sign_in_count: u64,
#     active: bool,
# }
#
# let user1 = User {
#     email: String::from("someone@example.com"),
#     username: String::from("someusername123"),
#     active: true,
#     sign_in_count: 1,
# };
#
let user2 = User {
    email: String::from("another@example.com"),
    username: String::from("anotherusername567"),
    active: user1.active,
    sign_in_count: user1.sign_in_count,
};
```

<span class="caption">示例 5-6: 创建 `User` 新实例, 其使用了一些来自 `user1` 的值</span>

使用构造体更新语法, 我们可以通过更少的代码来达到相同的效果, 如示例 5-7 所示. `..` 语法指定了剩余未显式设置值的字段应有与给定实例对应字段相同的值. 

```ts
# struct User {
#     username: String,
#     email: String,
#     sign_in_count: u64,
#     active: bool,
# }
#
# let user1 = User {
#     email: String::from("someone@example.com"),
#     username: String::from("someusername123"),
#     active: true,
#     sign_in_count: 1,
# };
#
let user2 = new User {
    email: String::from("another@example.com"),
    username: String::from("anotherusername567"),
    ..user1
};
```

<span class="caption">示例 5-7: 使用构造体更新语法为一个 `User` 实例设置新的 `email` 和 `username` 值, 不过其余值来自 `user1` 变量中实例的字段</span>

示例 5-7 中的代码也在 `user2` 中创建了一个新实例, 其有不同的 `email` 和 `username` 值不过 `active` 和 `sign_in_count` 字段的值与 `user1` 相同. 

## Tuple Class

有时候你只想把几个值简单的套在一起, 那么可以使用**元组构造体**

元组构造体有类型名, 但不用标注字段名以及初始化, 只需要标注字段的类型

元组构造体的字段没有访问权限控制也不用默认初始化, 更不用定义构造函数, 随时定义随时使用.

```ts
class public ColorRGB(u8, u8, u8);
class public Point3D(u8, u8, u8);

let black = ColorRGB(0, 0, 0);
let origin = Point3D(0, 0, 0);
```

每一个构造体有其自己的类型, 即使构造体中的字段有着相同的类型. 

一个获取 `Color` 类型的函数不能接受 `Point` 作为参数, 即便这两个类型都由三个 `u8` 值组成

## Empty Class

```ts
class Empty;
class EmptyTuple();
class EmptyClass{};
class EmptyEmpty {
    empty: Empty,
    unit: ()
}
```

这类构造体如果放在内存上并不占据任何字节, 因此也被称为零宽类型 (Zero-Sized Type)

这会导致 Valkyrie 无法正常管理内存, 因此无法初始化.