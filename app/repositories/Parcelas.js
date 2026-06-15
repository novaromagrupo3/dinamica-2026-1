function gerarParcelas(valor, quantidade, data) {
    let parcelas = [];
    let valorParcela = parseFloat((valor / quantidade).toFixed(2));
    let somaTemporaria = 0;
    let dataParcela = new Date(data);

    for (let i = 0; i < quantidade; i++) {
        let valorFinal = valorParcela;
        if (i === quantidade - 1) {
            valorFinal = parseFloat((valor - somaTemporaria).toFixed(2));
        } else {
            somaTemporaria += valorFinal;
        }

        parcelas.push({
            parcela: i + 1,
            valor: valorFinal,
            data: new Date(dataParcela.setMonth(dataParcela.getMonth() + 1)).toISOString().slice(0, 10)
        });
    }

    return parcelas;
}

module.exports = gerarParcelas;