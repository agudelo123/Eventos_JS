document.addEventListener('DOMContentLoaded', function() {
    const cantidadInput = document.getElementById('cantidadInput');
    const monedaOrigenSelect = document.getElementById('monedaOrigenSelect');
    const resultadoOutput = document.getElementById('resultadoOutput');
    const mensajeMoneda = document.getElementById('mensajeMoneda');
  
    const cambioCOPaUSD = 0.00025;
    const cambioUSDaCOP = 4000;
  
    function convertirMoneda() {
      const cantidad = parseFloat(cantidadInput.value.replace(',', '.'));
  
      if (!isNaN(cantidad)) {
        if (monedaOrigenSelect.value === 'cop') {
          mostrarResultado(cantidad * cambioCOPaUSD, 'en pesos colombianos', cantidad);
        } else {
          mostrarResultado(cantidad * cambioUSDaCOP, 'en dólares estadounidenses', cantidad);
        }
      } else {
        resultadoOutput.value = '';
        mensajeMoneda.textContent = 'Ingrese un número válido';
      }
    }
  
    function mostrarResultado(valorConvertido, moneda, cantidadOriginal) {
      resultadoOutput.value = valorConvertido.toLocaleString('es-CO', { maximumFractionDigits: 2 });
      mensajeMoneda.textContent = `Se ingresó una cantidad ${moneda}: ${cantidadOriginal.toLocaleString()}`;
    }
  
    cantidadInput.addEventListener('input', convertirMoneda);
    monedaOrigenSelect.addEventListener('change', convertirMoneda);
  
    convertirMoneda();
  });
  