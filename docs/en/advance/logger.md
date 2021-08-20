
















```vk
singleton class Logger {
    #? The normal log event callbacks.
    event logging(messages: UTF8Text, level: LogLevel) {
        let time = std::time::now().format("%Y-%m-%d %H:%M:%S");
        Self::print("[{time}][{level}] {messages}")
    }
    #? The panic event callback, program must exit after this event.
    event panic(messages: UTF8Text) {
        let mut io = std::io::out();
        write(io, messages);
        std::process::exit(1);
    }
    trace(messages: UTF8Text) { Self::logging(messages, LogLevel::Trace) }
    debug(messages: UTF8Text) { Self::logging(messages, LogLevel::Debug) }
    #? Write messages to the standard output stream.
    print(**messages: UTF8Text, <, >, separator: UTF8Text = '', eos: UTF8Text = '\n') {
        let mut first = true;
        let mut io = std::io::out().lock();
        for s in messages {
            if first {
                first = false;
                write(io, s);
            }
            else {
                write(io, separator);
                write(io, s);
            }
        }
        write(io, eos);
    }
    alert(messages: UTF8Text) { Self::logging(messages, LogLevel::Alert) }
    error(messages: UTF8Text) { Self::logging(messages, LogLevel::Error) }
    fatal(messages: UTF8Text) { Self::logging(messages, LogLevel::Fatal) }
    initialize(self) {}
    reinitialize(self) { self.logging.clear() }
    deinitialize(self) { @compile_error("Logger cannot be deinitialized.") }
}
```
