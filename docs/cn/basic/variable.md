


### 声明可变量与不变量

*常量*的值一旦设定就不能改变, 而*变量*的值可以随意更改.

常量和变量必须在使用前声明, 用 `let` 来声明常量, 用 `var` 来声明变量. 下面的例子展示了如何用常量和变量来记录用户尝试登录的次数:

```valkyrie
let maximumNumberOfLoginAttempts = 10
let mut currentLoginAttempt = 0
```

这两行代码可以被理解为:


V 和别的 ML 系语言都不太一样, let 实际上不进行绑定, let 只声明变量的属性, 变量仍然是未初始化的.

实际上由 case 解构, 匹配, 并做实际的绑定, 同时进行初始化.

let $vars = $expr;

实际是一个语法糖


let $vars;
case $vars = $expr;


let (x: String, mut y, __) = (1, 2, 3, 4)

let x: String;
let mut y: Any;


let perfer x: Integer;

let x = 1



case (x, y, __) = (1, 2, 3, 4)


if case None = a {

}
else {

}


## 字面量

字面量

常量和变量把一个名字 (比如 `maximumNumberOfLoginAttempts` 或者 `welcomeMessage` ) 和一个指定类型的值 (比如数字 `10` 或者字符串 `"Hello"` ) 关联起来.

"声明一个名字是 `maximumNumberOfLoginAttempts` 的新常量, 并给它一个值 `10` . 然后, 声明一个名字是 `currentLoginAttempt` 的变量并将它的值初始化为 `0` . "

在这个例子中, 允许的最大尝试登录次数被声明为一个常量, 因为这个值不会改变. 当前尝试登录次数被声明为一个变量, 因为每次尝试登录失败的时候都需要增加这个值.

你可以在一行中声明多个常量或者多个变量, 用逗号隔开:

```valkyrie
var x = 0.0, y = 0.0, z = 0.0
```

> 注意
>
> 如果你的代码中有不需要改变的值, 请使用 `let` 关键字将它声明为常量. 只将需要改变的值声明为变量.


### 字面量多态

### 类型注解 {#type-annotations}

当你声明常量或者变量的时候可以加上*类型注解 (type annotation) *, 说明常量或者变量中要存储的值的类型. 如果要添加类型注解, 需要在常量或者变量名后面加上一个冒号和空格, 然后加上类型名称.

这个例子给 `welcomeMessage` 变量添加了类型注解, 表示这个变量可以存储 `String` 类型的值:

```valkyrie
var welcomeMessage: String
```

声明中的冒号代表着*"是...类型"*, 所以这行代码可以被理解为:

"声明一个类型为 `String` , 名字为 `welcomeMessage` 的变量. "

"类型为 `String` "的意思是"可以存储任意 `String` 类型的值. "

`welcomeMessage` 变量现在可以被设置成任意字符串:

```valkyrie
welcomeMessage = "Hello"
```

你可以在一行中定义多个同样类型的变量, 用逗号分割, 并在最后一个变量名之后添加类型注解:

```valkyrie
var red, green, blue: Double
```

> 注意
>
> 一般来说你很少需要写类型注解. 如果你在声明常量或者变量的时候赋了一个初始值, Swift 可以推断出这个常量或者变量的类型, 请参考 [类型安全和类型推断](#type-safety-and-type-inference). 在上面的例子中, 没有给 `welcomeMessage` 赋初始值, 所以变量 `welcomeMessage` 的类型是通过一个类型注解指定的, 而不是通过初始值推断的.

### 常量和变量的命名

常量和变量名可以包含任何字符, 包括 Unicode 字符:

```valkyrie
let π = 3.14159
let 你好 = "你好世界"
let 🐶🐮 = "dogcow"
```

常量与变量名不能包含数学符号, 箭头, 保留的 (或者非法的) Unicode 码位, 连线与制表符. 也不能以数字开头, 但是可以在常量与变量名的其他地方包含数字.

一旦你将常量或者变量声明为确定的类型, 你就不能使用相同的名字再次进行声明, 或者改变其存储的值的类型. 同时, 你也不能将常量与变量进行互转.


### 输出常量和变量 {#printing}

你可以用 `print(_:separator:terminator:)` 函数来输出当前常量或变量的值:

```valkyrie
print(friendlyWelcome)
// 输出"Bonjour!"
```

`print(_:separator:terminator:)` 是一个用来输出一个或多个值到适当输出区的全局函数.

如果你用 Xcode, `print(_:separator:terminator:)` 将会输出内容到"console"面板上.

`separator` 和 `terminator` 参数具有默认值, 因此你调用这个函数的时候可以忽略它们.

默认情况下, 该函数通过添加换行符来结束当前行.

如果不想换行, 可以传递一个空字符串给 `terminator` 参数--例如, `print(someValue, terminator:"")`.

关于参数默认值的更多信息, 请参考 [默认参数值](./06_Functions.md#default-parameter-values).

Swift 用*字符串插值 (string interpolation)*的方式把常量名或者变量名当做占位符加入到长字符串中, Swift 会用当前常量或变量的值替换这些占位符.

将常量或变量名放入圆括号中, 并在开括号前使用反斜杠将其转义:

```valkyrie
print("The current value of friendlyWelcome is ${friendlyWelcome}")
// 输出"The current value of friendlyWelcome is Bonjour!"
```

> 注意
>
> 字符串插值所有可用的选项, 请参考 [字符串插值](./03_Strings_and_Characters.md#string-interpolation).

## 数值型字面量 {#numeric-literals}

整数字面量可以被写作:

* 一个*十进制*数, 没有前缀
* 一个*二进制*数, 前缀是 `0b`
* 一个*八进制*数, 前缀是 `0o`
* 一个*十六进制*数, 前缀是 `0x`

下面的所有整数字面量的十进制值都是 `17`:

```valkyrie
let decimalInteger = 17
let binaryInteger = 0b10001       // 二进制的17
let octalInteger = 0o21           // 八进制的17
let hexadecimalInteger = 0x11     // 十六进制的17
```

浮点字面量可以是十进制 (没有前缀) 或者是十六进制 (前缀是 `0x` ) . 小数点两边必须有至少一个十进制数字 (或者是十六进制的数字) . 十进制浮点数也可以有一个可选的指数 (exponent), 通过大写或者小写的 `e` 来指定；十六进制浮点数必须有一个指数, 通过大写或者小写的 `p` 来指定.

如果一个十进制数的指数为 `exp`, 那这个数相当于基数和10^exp 的乘积:

* `1.25e2` 表示 1.25 × 10^2, 等于 `125.0`.
* `1.25e-2` 表示 1.25 × 10^-2, 等于 `0.0125`.

如果一个十六进制数的指数为 `exp`, 那这个数相当于基数和2^exp 的乘积:

* `0xFp2` 表示 15 × 2^2, 等于 `60.0`.
* `0xFp-2` 表示 15 × 2^-2, 等于 `3.75`.

下面的这些浮点字面量都等于十进制的 `12.1875`:

```valkyrie
let decimalDouble = 12.1875
let exponentDouble = 1.21875e1
let hexadecimalDouble = 0xC.3p0
```

数值类字面量可以包括额外的格式来增强可读性. 整数和浮点数都可以添加额外的零并且包含下划线, 并不会影响字面量:

```valkyrie
let paddedDouble = 000123.456
let oneMillion = 1_000_000
let justOverOneMillion = 1_000_000.000_000_1
```

## 数值型类型转换 {#numeric-type-conversion}

通常来讲, 即使代码中的整数常量和变量已知非负, 也请使用 `Int` 类型. 总是使用默认的整数类型可以保证你的整数常量和变量可以直接被复用并且可以匹配整数类字面量的类型推断.

只有在必要的时候才使用其他整数类型, 比如要处理外部的长度明确的数据或者为了优化性能、内存占用等等. 使用显式指定长度的类型可以及时发现值溢出并且可以暗示正在处理特殊数据.

### 整数转换 {#integer-conversion}

不同整数类型的变量和常量可以存储不同范围的数字. `Int8` 类型的常量或者变量可以存储的数字范围是 `-128`~`127`, 而 `UInt8` 类型的常量或者变量能存储的数字范围是 `0`~`255`. 如果数字超出了常量或者变量可存储的范围, 编译的时候会报错:

```valkyrie
let cannotBeNegative: UInt8 = -1
// UInt8 类型不能存储负数, 所以会报错
let tooBig: Int8 = Int8.max + 1
// Int8 类型不能存储超过最大值的数, 所以会报错
```

由于每种整数类型都可以存储不同范围的值, 所以你必须根据不同情况选择性使用数值型类型转换. 这种选择性使用的方式, 可以预防隐式转换的错误并让你的代码中的类型转换意图变得清晰.

要将一种数字类型转换成另一种, 你要用当前值来初始化一个期望类型的新数字, 这个数字的类型就是你的目标类型. 在下面的例子中, 常量 `twoThousand` 是 `UInt16` 类型, 然而常量 `one` 是 `UInt8` 类型. 它们不能直接相加, 因为它们类型不同. 所以要调用 `UInt16(one)` 来创建一个新的 `UInt16` 数字并用 `one` 的值来初始化, 然后使用这个新数字来计算:

```valkyrie
let twoThousand: UInt16 = 2_000
let one: UInt8 = 1
let twoThousandAndOne = twoThousand + UInt16(one)
```

现在两个数字的类型都是 `UInt16`, 可以进行相加. 目标常量 `twoThousandAndOne` 的类型被推断为 `UInt16`, 因为它是两个 `UInt16` 值的和.

`SomeType(ofInitialValue)` 是调用 Swift 构造器并传入一个初始值的默认方法. 在语言内部, `UInt16` 有一个构造器, 可以接受一个 `UInt8` 类型的值, 所以这个构造器可以用现有的 `UInt8` 来创建一个新的 `UInt16`. 注意, 你并不能传入任意类型的值, 只能传入 `UInt16` 内部有对应构造器的值. 不过你可以扩展现有的类型来让它可以接收其他类型的值 (包括自定义类型) , 请参考 [扩展](./20_Extensions.md).

### 整数和浮点数转换 {#integer-and-floating-point-conversion}

整数和浮点数的转换必须显式指定类型:

```valkyrie
let three = 3
let pointOneFourOneFiveNine = 0.14159
let pi = Double(three) + pointOneFourOneFiveNine
// pi 等于 3.14159, 所以被推测为 Double 类型
```

这个例子中, 常量 `three` 的值被用来创建一个 `Double` 类型的值, 所以加号两边的数类型须相同. 如果不进行转换, 两者无法相加.

浮点数到整数的反向转换同样行, 整数类型可以用 `Double` 或者 `Float` 类型来初始化:

```valkyrie
let integerPi = Int(pi)
// integerPi 等于 3, 所以被推测为 Int 类型
```

当用这种方式来初始化一个新的整数值时, 浮点值会被截断. 也就是说 `4.75` 会变成 `4`, `-3.9` 会变成 `-3`.

> 注意
>
> 结合数字类常量和变量不同于结合数字类字面量. 字面量 `3` 可以直接和字面量 `0.14159` 相加, 因为数字字面量本身没有明确的类型. 它们的类型只在编译器需要求值的时候被推测.

## 类型别名 {#type-aliases}

*类型别名 (type aliases) *就是给现有类型定义另一个名字. 你可以使用 `typealias` 关键字来定义类型别名.

当你想要给现有类型起一个更有意义的名字时, 类型别名非常有用. 假设你正在处理特定长度的外部资源的数据:

```valkyrie
typealias AudioSample = UInt16
```

定义了一个类型别名之后, 你可以在任何使用原始名的地方使用别名:

```valkyrie
var maxAmplitudeFound = AudioSample.min
// maxAmplitudeFound 现在是 0
```

本例中, `AudioSample` 被定义为 `UInt16` 的一个别名. 因为它是别名, `AudioSample.min` 实际上是 `UInt16.min`, 所以会给 `maxAmplitudeFound` 赋一个初值 `0`.

## 可选类型 {#optionals}

使用*可选类型 (optionals) *来处理值可能缺失的情况. 可选类型表示两种可能:
或者有值,  你可以解析可选类型访问这个值,  或者根本没有值.

> 注意
>
> C 和 Objective-C 中并没有可选类型这个概念. 最接近的是 Objective-C 中的一个特性, 一个方法要不返回一个对象要不返回 `nil`, `nil` 表示"缺少一个合法的对象". 然而, 这只对对象起作用——对于结构体, 基本的 C 类型或者枚举类型不起作用. 对于这些类型, Objective-C 方法一般会返回一个特殊值 (比如 `NSNotFound`) 来暗示值缺失. 这种方法假设方法的调用者知道并记得对特殊值进行判断. 然而, Swift 的可选类型可以让你暗示*任意类型*的值缺失, 并不需要一个特殊值.

来看一个例子. Swift 的 `Int` 类型有一种构造器, 作用是将一个 `String` 值转换成一个 `Int` 值. 然而, 并不是所有的字符串都可以转换成一个整数. 字符串 `"123"` 可以被转换成数字 `123` , 但是字符串 `"hello, world"` 不行.

下面的例子使用这种构造器来尝试将一个 `String` 转换成 `Int`:

```valkyrie
let possibleNumber = "123"
let convertedNumber = Int(possibleNumber)
// convertedNumber 被推测为类型 "Int?",  或者类型 "optional Int"
```

因为该构造器可能会失败, 所以它返回一个*可选类型* (optional) `Int`, 而不是一个 `Int`. 一个可选的 `Int` 被写作 `Int?` 而不是 `Int`. 问号暗示包含的值是可选类型, 也就是说可能包含 `Int` 值也可能*不包含值*.  (不能包含其他任何值比如 `Bool` 值或者 `String` 值. 只能是 `Int` 或者什么都没有. )

### nil {#nil}

你可以给可选变量赋值为 `nil` 来表示它没有值:

```valkyrie
var serverResponseCode: Int? = 404
// serverResponseCode 包含一个可选的 Int 值 404
serverResponseCode = nil
// serverResponseCode 现在不包含值
```

> 注意
>
> `nil` 不能用于非可选的常量和变量. 如果你的代码中有常量或者变量需要处理值缺失的情况, 请把它们声明成对应的可选类型.

如果你声明一个可选常量或者变量但是没有赋值, 它们会自动被设置为 `nil`:

```valkyrie
var surveyAnswer: String?
// surveyAnswer 被自动设置为 nil
```

> 注意
>
> Swift 的 `nil` 和 Objective-C 中的 `nil` 并不一样. 在 Objective-C 中, `nil` 是一个指向不存在对象的指针. 在 Swift 中, `nil` 不是指针——它是一个确定的值, 用来表示值缺失. 任何类型的可选状态都可以被设置为 `nil`, 不只是对象类型.


NIL

let x:String? = None;

NIL == None  => true
NIL == []    => true
NIL == {}    => true

### 可选绑定 {#optional-binding}

使用*可选绑定 (optional binding) *来判断可选类型是否包含值, 如果包含就把值赋给一个临时常量或者变量. 可选绑定可以用在 `if` 和 `while` 语句中, 这条语句不仅可以用来判断可选类型中是否有值, 同时可以将可选类型中的值赋给一个常量或者变量. `if` 和 `while` 语句, 请参考 [控制流](./05_Control_Flow.md).

像下面这样在 `if` 语句中写一个可选绑定:

```valkyrie
if let constantName = someOptional {
    statements
}
```

你可以像上面这样使用可选绑定来重写 在 [可选类型](./01_The_Basics.md#optionals) 举出的 `possibleNumber` 例子:

```valkyrie
if let actualNumber = Int(possibleNumber) {
    print("\'\(possibleNumber)\' has an integer value of \(actualNumber)")
} else {
    print("\'\(possibleNumber)\' could not be converted to an integer")
}
// 输出"'123' has an integer value of 123"
```

这段代码可以被理解为:

"如果 `Int(possibleNumber)` 返回的可选 `Int` 包含一个值, 创建一个叫做 `actualNumber` 的新常量并将可选包含的值赋给它. "

如果转换成功, `actualNumber` 常量可以在 `if` 语句的第一个分支中使用. 它已经被可选类型 *包含的* 值初始化过, 所以不需要再使用 `!` 后缀来获取它的值. 在这个例子中, `actualNumber` 只被用来输出转换结果.

你可以在可选绑定中使用常量和变量. 如果你想在 `if` 语句的第一个分支中操作 `actualNumber` 的值, 你可以改成 `if var actualNumber`, 这样可选类型包含的值就会被赋给一个变量而非常量.

你可以包含多个可选绑定或多个布尔条件在一个 `if` 语句中, 只要使用逗号分开就行. 只要有任意一个可选绑定的值为 `nil`, 或者任意一个布尔条件为 `false`, 则整个 `if` 条件判断为 `false`. 下面的两个 `if` 语句是等价的:

```valkyrie
if let firstNumber = Int("4"), let secondNumber = Int("42"), firstNumber < secondNumber && secondNumber < 100 {
    print("\(firstNumber) < \(secondNumber) < 100")
}
// 输出"4 < 42 < 100"

if let firstNumber = Int("4") {
    if let secondNumber = Int("42") {
        if firstNumber < secondNumber && secondNumber < 100 {
            print("\(firstNumber) < \(secondNumber) < 100")
        }
    }
}
// 输出"4 < 42 < 100"
```

> 注意
>
> 在 `if` 条件语句中使用常量和变量来创建一个可选绑定, 仅在 `if` 语句的句中 (`body`) 中才能获取到值. 相反, 在 `guard` 语句中使用常量和变量来创建一个可选绑定, 仅在 `guard` 语句外且在语句后才能获取到值, 请参考 [提前退出](./05_Control_Flow.md#early-exit).

### 隐式解析可选类型 {#implicityly-unwrapped-optionals}

如上所述, 可选类型暗示了常量或者变量可以"没有值". 可选可以通过 `if` 语句来判断是否有值, 如果有值的话可以通过可选绑定来解析值.

有时候在程序架构中, 第一次被赋值之后, 可以确定一个可选类型_总会_有值. 在这种情况下, 每次都要判断和解析可选值是非常低效的, 因为可以确定它总会有值.

这种类型的可选状态被定义为隐式解析可选类型 (implicitly unwrapped optionals) . 把想要用作可选的类型的后面的问号 (`String?`) 改成感叹号 (`String!`) 来声明一个隐式解析可选类型. 与其在使用时把感叹号放在可选类型的名称的后面, 你可以在定义它时, 直接把感叹号放在可选类型的后面.

当可选类型被第一次赋值之后就可以确定之后一直有值的时候, 隐式解析可选类型非常有用. 隐式解析可选类型主要被用在 Swift 中类的构造过程中, 请参考 [无主引用以及隐式解析可选属性](./24_Automatic_Reference_Counting.md#unowned-references-and-implicitly-unwrapped-optional-properties).

一个隐式解析可选类型其实就是一个普通的可选类型, 但是可以被当做非可选类型来使用, 并不需要每次都使用解析来获取可选值. 下面的例子展示了可选类型 `String` 和隐式解析可选类型 `String` 之间的区别:

```valkyrie
let possibleString: String? = "An optional string."
let forcedString: String = possibleString! // 需要感叹号来获取值

let assumedString: String! = "An implicitly unwrapped optional string."
let implicitString: String = assumedString  // 不需要感叹号
```

你可以把隐式解析可选类型当做一个可以自动解析的可选类型. 当你使用一个隐式解析可选值时, Swift 首先会把它当作普通的可选值；如果它不能被当成可选类型使用, Swift 会强制解析可选值. 在以上的代码中, 可选值 `assumedString` 在把自己的值赋给 `implicitString` 之前会被强制解析, 原因是 `implicitString` 本身的类型是非可选类型的 `String`. 在下面的代码中, `optionalString` 并没有显式的数据类型. 那么根据类型推断, 它就是一个普通的可选类型.
```valkyrie
let optionalString = assumedString
// optionalString 的类型是 "String?", assumedString 也没有被强制解析.
```

如果你在隐式解析可选类型没有值的时候尝试取值, 会触发运行时错误. 和你在没有值的普通可选类型后面加一个感叹号一样.

你可以把隐式解析可选类型当做普通可选类型来判断它是否包含值:

```valkyrie
if assumedString != nil {
    print(assumedString!)
}
// 输出"An implicitly unwrapped optional string."
```

你也可以在可选绑定中使用隐式解析可选类型来检查并解析它的值:

```valkyrie
if let definiteString = assumedString {
    print(definiteString)
}
// 输出"An implicitly unwrapped optional string."
```

> 注意
>
> 如果一个变量之后可能变成 `nil` 的话请不要使用隐式解析可选类型. 如果你需要在变量的生命周期中判断是否是 `nil` 的话, 请使用普通可选类型.

## 断言和先决条件 {#assertions-and-preconditions}

断言和先决条件是在运行时所做的检查. 你可以用他们来检查在执行后续代码之前是否一个必要的条件已经被满足了. 如果断言或者先决条件中的布尔条件评估的结果为 true (真) , 则代码像往常一样继续执行. 如果布尔条件评估结果为 false (假) , 程序的当前状态是无效的, 则代码执行结束, 应用程序中止.

你使用断言和先决条件来表达你所做的假设和你在编码时候的期望. 你可以将这些包含在你的代码中. 断言帮助你在开发阶段找到错误和不正确的假设, 先决条件帮助你在生产环境中探测到存在的问题.

除了在运行时验证你的期望值, 断言和先决条件也变成了一个在你的代码中的有用的文档形式. 和在上面讨论过的 [错误处理](./17_Error_Handling.md) 不同, 断言和先决条件并不是用来处理可以恢复的或者可预期的错误. 因为一个断言失败表明了程序正处于一个无效的状态, 没有办法去捕获一个失败的断言.

使用断言和先决条件不是一个能够避免出现程序出现无效状态的编码方法. 然而, 如果一个无效状态程序产生了, 断言和先决条件可以强制检查你的数据和程序状态, 使得你的程序可预测的中止 (译者: 不是系统强制的, 被动的中止) , 并帮助使这个问题更容易调试. 一旦探测到无效的状态, 执行则被中止, 防止无效的状态导致的进一步对于系统的伤害.

断言和先决条件的不同点是, 他们什么时候进行状态检测: 断言仅在调试环境运行, 而先决条件则在调试环境和生产环境中运行. 在生产环境中, 断言的条件将不会进行评估. 这个意味着你可以使用很多断言在你的开发阶段, 但是这些断言在生产环境中不会产生任何影响.

### 使用断言进行调试 {#debugging-with-assertions}

你可以调用 Swift 标准库的 `assert(_:_:file:line:)` 函数来写一个断言. 向这个函数传入一个结果为 `true` 或者 `false` 的表达式以及一条信息, 当表达式的结果为 `false` 的时候这条信息会被显示:

```valkyrie
let age = -3
assert(age >= 0, "A person's age cannot be less than zero")
// 因为 age < 0, 所以断言会触发
```

在这个例子中, 只有 `age >= 0` 为 `true` 时, 即 `age` 的值非负的时候, 代码才会继续执行. 如果 `age` 的值是负数, 就像代码中那样, `age >= 0` 为 `false`, 断言被触发, 终止应用.

如果不需要断言信息, 可以就像这样忽略掉:

```valkyrie
assert(age >= 0)
```

如果代码已经检查了条件, 你可以使用 `assertionFailure(_:file:line:)` 函数来表明断言失败了, 例如:

```valkyrie
if age > 10 {
    print("You can ride the roller-coaster or the ferris wheel.")
} else if age > 0 {
    print("You can ride the ferris wheel.")
} else {
    assertionFailure("A person's age can't be less than zero.")
}
```

### 强制执行先决条件 {#enforcing-preconditions}

当一个条件可能为假, 但是继续执行代码要求条件必须为真的时候, 需要使用先决条件. 例如使用先决条件来检查是否下标越界, 或者来检查是否将一个正确的参数传给函数.

你可以使用全局 `precondition(_:_:file:line:)` 函数来写一个先决条件. 向这个函数传入一个结果为 `true` 或者 `false` 的表达式以及一条信息, 当表达式的结果为 `false` 的时候这条信息会被显示:

```valkyrie
// 在一个下标的实现里...
precondition(index > 0, "Index must be greater than zero.")
```

你可以调用　`preconditionFailure(_:file:line:)` 方法来表明出现了一个错误, 例如, switch 进入了 default 分支, 但是所有的有效值应该被任意一个其他分支 (非 default 分支) 处理.

> 注意
>
> 如果你使用 unchecked 模式 (-Ounchecked) 编译代码, 先决条件将不会进行检查. 编译器假设所有的先决条件总是为 true (真) , 他将优化你的代码. 然而, `fatalError(_:file:line:)` 函数总是中断执行, 无论你怎么进行优化设定.
>
> 你能使用 `fatalError(_:file:line:)` 函数在设计原型和早期开发阶段, 这个阶段只有方法的声明, 但是没有具体实现, 你可以在方法体中写上 fatalError("Unimplemented")作为具体实现. 因为 fatalError 不会像断言和先决条件那样被优化掉, 所以你可以确保当代码执行到一个没有被实现的方法时, 程序会被中断.
