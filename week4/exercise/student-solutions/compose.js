function compose(...funcs) {
    return (...funcs_args) => {
        let result = funcs_args;
        for (let i = funcs.length - 1; i >= 0; i--) {
            result = funcs[i](...(i === funcs.length -1 ? result : [result]));
        }
        return result;
    };
}
