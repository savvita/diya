export function calcTax(year, coeffCapacity, coeffEngine, isExclusive) {
    let age = 2023 - year;
    let rateBase;
    let coeffExclusive = isExclusive ? 2 : 1;

    if (age === 0) rateBase = 2.2;
    if (age === 1) rateBase = 1.9;
    if (age === 2) rateBase = 1.65;
    if (age === 3) rateBase = 1.55;
    if (age === 4) rateBase = 1.45;
    if (age === 5) rateBase = 1.35;
    if (age === 6) rateBase = 1;
    if (age === 7) rateBase = 0.9;
    if (age === 8) rateBase = 0.85;
    if (age === 9) rateBase = 0.8;
    if (age === 10) rateBase = 0.75;
    if (age === 11) rateBase = 0.7;
    if (age > 11) rateBase = 0.7;

    let coeff = coeffCapacity * coeffEngine * coeffExclusive;
    let rate = rateBase * coeff;
    let tax = rate / 2;
    let vat = rate * 3.5 * 0.2;

    return {
        "tax": tax,
        "vat": vat,
        "total": tax + vat
    };
}