
案例类


class T(int)


元组类, 结构类

元组类在 Scala 中被称为案例类

case class


````valkyrie
class Nat {
    x: int
}

extends Nat{
    def get(self): Int = self.x
    def isEmpty(self) = self.x < 0
}

extends Nat: Extractor  {
    def unapply(self) -> Nat = Nat { x: self.x }
}

match 5 {
    case Nat(n) => println(s"$n is a natural number")
    case _      => ()
}

??? // automaticaly
````


````valkyrie
class Foo(int);

class Foo {
    inner: int
}



extends Foo: Extractor {
    def unapply(self, x: Integer) -> String? =
        if x == 0 {
            Some("Hello, World")
        }
        else {
            None
        }
    }
}





````
