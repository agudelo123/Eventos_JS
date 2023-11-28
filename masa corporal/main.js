function calculateBMI() {
  let weight = +document.getElementById('weight').value;
  let height = +document.getElementById('height').value / 100;

  if (weight > 0 && height > 0) {
    let bmi = (weight / (height * height)).toFixed(2);
    document.getElementById('result').innerText = bmi;
  } else {
    alert('Por favor, introduce un peso y altura válidos.');
  }
}
