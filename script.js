function calculateCramer() {
    // Obtener los valores de los inputs
    const a11 = parseFloat(document.getElementById('a11').value);
    const a12 = parseFloat(document.getElementById('a12').value);
    const a13 = parseFloat(document.getElementById('a13').value);
    const a21 = parseFloat(document.getElementById('a21').value);
    const a22 = parseFloat(document.getElementById('a22').value);
    const a23 = parseFloat(document.getElementById('a23').value);
    const a31 = parseFloat(document.getElementById('a31').value);
    const a32 = parseFloat(document.getElementById('a32').value);
    const a33 = parseFloat(document.getElementById('a33').value);
    const b1 = parseFloat(document.getElementById('b1').value);
    const b2 = parseFloat(document.getElementById('b2').value);
    const b3 = parseFloat(document.getElementById('b3').value);

    // Función para calcular el determinante de una matriz 3x3
    function determinant3x3(a, b, c, d, e, f, g, h, i) {
        return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
    }

    // Función para calcular el MCD (Máximo Común Divisor)
    function gcd(a, b) {
        return b === 0 ? a : gcd(b, a % b);
    }

    // Función para simplificar una fracción
    function simplifyFraction(numerator, denominator) {
        const divisor = gcd(numerator, denominator);
        return [numerator / divisor, denominator / divisor];
    }

    // Calcular el determinante principal
    const D = determinant3x3(a11, a12, a13, a21, a22, a23, a31, a32, a33);

    if (D === 0) {
        document.getElementById('result').innerText = 'El sistema no tiene solución única.';
        document.getElementById('process').innerHTML = '';
        return;
    }

    // Calcular los determinantes Dx, Dy, Dz
    const Dx = determinant3x3(b1, a12, a13, b2, a22, a23, b3, a32, a33);
    const Dy = determinant3x3(a11, b1, a13, a21, b2, a23, a31, b3, a33);
    const Dz = determinant3x3(a11, a12, b1, a21, a22, b2, a31, a32, b3);

    // Simplificar las soluciones
    const [xNum, xDen] = simplifyFraction(Dx, D);
    const [yNum, yDen] = simplifyFraction(Dy, D);
    const [zNum, zDen] = simplifyFraction(Dz, D);

    // Mostrar el resultado en fracciones simplificadas
    document.getElementById('result').innerHTML = `
        <p>x = ${xNum}/${xDen}</p>
        <p>y = ${yNum}/${yDen}</p>
        <p>z = ${zNum}/${zDen}</p>
    `;

    // Mostrar el proceso
    document.getElementById('process').innerHTML = `
        <h3>Proceso:</h3>
        <p>Determinante principal (D):</p>
        <p>D = ${a11}(${a22} * ${a33} - ${a23} * ${a32}) - ${a12}(${a21} * ${a33} - ${a23} * ${a31}) + ${a13}(${a21} * ${a32} - ${a22} * ${a31}) = ${D}</p>
        <p>Determinante Dx:</p>
        <p>Dx = ${b1}(${a22} * ${a33} - ${a23} * ${a32}) - ${a12}(${b2} * ${a33} - ${a23} * ${b3}) + ${a13}(${b2} * ${a32} - ${a22} * ${b3}) = ${Dx}</p>
        <p>Determinante Dy:</p>
        <p>Dy = ${a11}(${b2} * ${a33} - ${a23} * ${b3}) - ${b1}(${a21} * ${a33} - ${a23} * ${a31}) + ${a13}(${a21} * ${b3} - ${b2} * ${a31}) = ${Dy}</p>
        <p>Determinante Dz:</p>
        <p>Dz = ${a11}(${a22} * ${b3} - ${b2} * ${a32}) - ${a12}(${a21} * ${b3} - ${b2} * ${a31}) + ${b1}(${a21} * ${a32} - ${a22} * ${a31}) = ${Dz}</p>
        <p>Soluciones:</p>
        <p>x = Dx / D = ${Dx} / ${D} = ${xNum}/${xDen}</p>
        <p>y = Dy / D = ${Dy} / ${D} = ${yNum}/${yDen}</p>
        <p>z = Dz / D = ${Dz} / ${D} = ${zNum}/${zDen}</p>
    `;
}
v