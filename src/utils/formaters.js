export function formatCNPJ(cnpj) {
    if (!cnpj || cnpj.length !== 14) {
      return cnpj;
    }
    
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
}

export function formatCode(code) {
    let value = code.toString();
    value = value.replace(/\D/g, "");
    value = value.padStart(4, "0");
    return value;
}