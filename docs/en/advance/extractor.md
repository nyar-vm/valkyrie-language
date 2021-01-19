# Extractor Pattern



```valkyrie
class Uppercase {

}

extends Uppercase: Extractor {
    overload extract(input: str): String? {
        return Some(input.to_uppercase())
    }
}

"my Function".match {
    case Uppercase(upper):
        print(upper) # "MY FUNCTION"
}
```
