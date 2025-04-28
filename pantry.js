document.getElementById('ingredientForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('ingredientName').value;
    const qty = document.getElementById('ingredientQty').value;

    const response = await fetch('/meals/ingredients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, quantity: qty })
    });

    const result = await response.json();
    alert(result.message || result.error);
    location.reload();
});
