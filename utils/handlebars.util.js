export function registerHelpers(hbs) {
    hbs.registerHelper('ternary', (a, b, trueValue, falseValue) => a === b ? trueValue : falseValue);
    hbs.registerHelper('negate', a => !a);
}
