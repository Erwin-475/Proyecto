document.getElementById('chartSelect').addEventListener('change', function () {
    const selectedChart = this.value;
    const charts = document.querySelectorAll('canvas');
    charts.forEach(chart => {
        chart.style.display = (chart.id === selectedChart) ? 'block' : 'none';
    });
});

document.getElementById('chartSelect').dispatchEvent(new Event('change'));

document.getElementById('downloadPDF').addEventListener('click', function () {
    const selectedChart = document.getElementById('chartSelect').value;
    const chart = Chart.getChart(selectedChart);

    if (chart) {
        const data = chart.data.labels.map((label, index) => {
            return [label, chart.data.datasets[0].data[index]];
        });

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text("Datos de la gráfica: " + chart.options.plugins.title.text, 10, 10);
        doc.autoTable({
            head: [['Información', 'Valor']],
            body: data
        });
        doc.save(selectedChart + "_tabla.pdf");
    } else {
        alert('No se encontró el gráfico seleccionado.');
    }
});

document.getElementById('downloadExcel').addEventListener('click', function () {
    const selectedChart = document.getElementById('chartSelect').value;
    const chart = Chart.getChart(selectedChart);

    if (chart) {
        const data = chart.data.labels.map((label, index) => {
            return [label, chart.data.datasets[0].data[index]];
        });

        const worksheet = XLSX.utils.aoa_to_sheet([["Etiqueta", "Valor"], ...data]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");
        XLSX.writeFile(workbook, selectedChart + "_data.xlsx");
    } else {
        alert('No se encontró el gráfico seleccionado.');
    }
});