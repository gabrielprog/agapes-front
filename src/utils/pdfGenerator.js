import { formatCNPJ, formatCode } from "./formaters";

const pdfGenerator = (data) => {
    const tableForPrint = `
      <thead>
        <tr>
          <th>Código</th>
          <th>Nome</th>
          <th>CNPJ</th>
        </tr>
      </thead>
      <tbody>
        ${data.map(item => `
          <tr>
            <td>${formatCode(parseInt(item?.id))}</td>
            <td>${item?.name}</td>
            <td>${formatCNPJ(item?.cnpj)}</td>
          </tr>
        `).join("")}
      </tbody>
    `;

    const windowForPrint = window.open("", "", "height=600,width=800");
    windowForPrint.document.write(`
      <html>
        <head>
          <style>
            table {
              border-collapse: collapse;
              width: 100%;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
          </style>
        </head>
        <body>
          <table>
            ${tableForPrint}
          </table>
        </body>
      </html>
    `);
    windowForPrint.document.close();
    windowForPrint.print();
};

export default pdfGenerator;