export function exportToCSV(data: any[], filename: string) {
  if (!data || data.length === 0) {
    alert('No data to export');
    return;
  }

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header];
          if (value === null || value === undefined) return '';
          const stringValue = String(value);
          return stringValue.includes(',') ? `"${stringValue}"` : stringValue;
        })
        .join(',')
    ),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportTradesToCSV(trades: any[]) {
  const exportData = trades.map((trade) => ({
    Date: new Date(trade.opened_at).toLocaleString(),
    Pair: trade.pair,
    Direction: trade.direction,
    'Entry Price': trade.entry_price,
    'Exit Price': trade.current_price || trade.entry_price,
    'Lot Size': trade.lot_size,
    Status: trade.status,
    'P&L': trade.pnl,
    'P&L %': trade.pnl_percentage,
    Provider: trade.signal_providers?.name || 'Manual',
    'Closed At': trade.closed_at ? new Date(trade.closed_at).toLocaleString() : '-',
  }));

  const filename = `trades_export_${new Date().toISOString().split('T')[0]}`;
  exportToCSV(exportData, filename);
}

export function exportSignalsToCSV(signals: any[]) {
  const exportData = signals.map((signal) => ({
    Date: new Date(signal.signal_time).toLocaleString(),
    Provider: signal.signal_providers?.name || 'Unknown',
    Pair: signal.pair,
    Direction: signal.direction,
    Entry: signal.entry_price,
    TP1: signal.tp1 || '-',
    TP2: signal.tp2 || '-',
    TP3: signal.tp3 || '-',
    SL: signal.stop_loss || '-',
    Status: signal.status,
  }));

  const filename = `signals_export_${new Date().toISOString().split('T')[0]}`;
  exportToCSV(exportData, filename);
}

export function generateTradePDF(trades: any[]) {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Trading Report</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; }
        .header { text-align: center; margin-bottom: 30px; }
        .header h1 { color: #fbbf24; margin: 0; }
        .summary { display: flex; justify-content: space-around; margin: 30px 0; padding: 20px; background: #f8fafc; border-radius: 8px; }
        .summary-item { text-align: center; }
        .summary-item .label { color: #64748b; font-size: 12px; }
        .summary-item .value { font-size: 24px; font-weight: bold; margin-top: 5px; }
        table { width: 100%; border-collapse: collapse; margin-top: 30px; }
        th { background: #0f172a; color: white; padding: 12px; text-align: left; }
        td { padding: 10px; border-bottom: 1px solid #e5e7eb; }
        tr:nth-child(even) { background: #f8fafc; }
        .positive { color: #10b981; font-weight: bold; }
        .negative { color: #ef4444; font-weight: bold; }
        .footer { margin-top: 40px; text-align: center; color: #64748b; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>IndoTraderXpert</h1>
        <p>Trading Performance Report</p>
        <p style="color: #64748b;">Generated: ${new Date().toLocaleString()}</p>
      </div>

      <div class="summary">
        <div class="summary-item">
          <div class="label">Total Trades</div>
          <div class="value">${trades.length}</div>
        </div>
        <div class="summary-item">
          <div class="label">Total P&L</div>
          <div class="value ${trades.reduce((sum, t) => sum + (t.pnl || 0), 0) >= 0 ? 'positive' : 'negative'}">
            $${trades.reduce((sum, t) => sum + (t.pnl || 0), 0).toFixed(2)}
          </div>
        </div>
        <div class="summary-item">
          <div class="label">Win Rate</div>
          <div class="value">
            ${((trades.filter(t => t.pnl > 0).length / trades.length) * 100).toFixed(1)}%
          </div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Pair</th>
            <th>Direction</th>
            <th>Entry</th>
            <th>Lot</th>
            <th>P&L</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${trades.map(trade => `
            <tr>
              <td>${new Date(trade.opened_at).toLocaleDateString()}</td>
              <td>${trade.pair}</td>
              <td>${trade.direction}</td>
              <td>${trade.entry_price}</td>
              <td>${trade.lot_size}</td>
              <td class="${trade.pnl >= 0 ? 'positive' : 'negative'}">
                ${trade.pnl >= 0 ? '+' : ''}$${trade.pnl?.toFixed(2) || '0.00'}
              </td>
              <td>${trade.status}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="footer">
        <p>IndoTraderXpert - Professional Trading Platform</p>
        <p>This report is for informational purposes only</p>
      </div>
    </body>
    </html>
  `;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
    };
  }
}
