function curry(f) {
    return function rec(...args) {
        if (args.length == f.length) {
            return f(...args);
        } else {
            return (...after) => rec(...args, ...after)
        }
    };
}
