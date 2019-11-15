const toINR = amount => {
    const num = parseFloat(amount);

    return num.toLocaleString('en-IN', {
        maximumFractionDigits: 2,
        style: 'currency',
        currency: 'INR'
    });
}

exports.toINR = toINR;