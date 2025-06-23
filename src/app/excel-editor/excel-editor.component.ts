import { Component } from '@angular/core';
import Spreadsheet from 'x-data-spreadsheet';
import * as XLSX from 'xlsx';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-excel-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './excel-editor.component.html',
  styleUrls: ['./excel-editor.component.css']
})
export class ExcelEditorComponent {
  ss: any;
  data: any[][] = [];
  sheetDataForExport: any = null;

  onFileDrop(event: DragEvent) {
    console.log('🔥 File dropped!');
    const file = event.dataTransfer?.files[0];
    if (!file) {
      console.warn('⚠️ No file detected in drop.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

      this.data = json;

      const sheetData: {
        name: string;
        rows: Record<number, { cells: Record<number, { text: string }> }>;
      } = {
        name: sheetName,
        rows: {}
      };

      json.forEach((row, rowIndex) => {
        sheetData.rows[rowIndex] = { cells: {} };
        row.forEach((cell, colIndex) => {
          sheetData.rows[rowIndex].cells[colIndex] = { text: String(cell) };
        });
      });

      this.sheetDataForExport = sheetData;

      requestAnimationFrame(() => {
        const el = document.getElementById('excelViewer');
        if (!el) return console.error('❌ #excelViewer element not found');

        this.ss = new Spreadsheet(el)
          .loadData(sheetData)
          .change(() => {
            console.log('📝 Spreadsheet changed');
            this.sheetDataForExport = this.ss.getData();
          });

        console.log('✅ Spreadsheet initialized');
      });
    };

    reader.readAsArrayBuffer(file);
    event.preventDefault();
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  addRow() {
    const columnCount = this.data[0]?.length || 1;
    this.data.push(new Array(columnCount).fill(''));
  }

  addColumn() {
    this.data.forEach(row => row.push(''));
  }

  onCellChange(value: string, row: number, col: number) {
    this.data[row][col] = value;
  }

  openExcelInNewTab() {
    const ws = XLSX.utils.aoa_to_sheet(this.data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' });

    const blob = new Blob([this.base64ToArrayBuffer(wbout)], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });

    const url = window.URL.createObjectURL(blob);
    window.open(url, '_blank');
  }

  base64ToArrayBuffer(base64: string) {
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  highlightRow(index: number) {
    const row = document.getElementById('row-' + index);
    if (row) row.style.backgroundColor = 'yellow';
  }

  highlightColumn(index: number) {
    const cells = document.querySelectorAll('.cell-' + index);
    cells.forEach(cell => (cell as HTMLElement).style.backgroundColor = 'lightblue');
  }
}
