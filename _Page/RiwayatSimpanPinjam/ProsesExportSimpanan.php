<?php
    require '../../vendor/autoload.php';
    use PhpOffice\PhpSpreadsheet\Spreadsheet;
    use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
    use PhpOffice\PhpSpreadsheet\Style\Fill;
    use PhpOffice\PhpSpreadsheet\Style\Border;
    use PhpOffice\PhpSpreadsheet\Style\Alignment;
    use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
    use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

    // Koneksi dan function global
    include "../../_Config/Connection.php";
    include "../../_Config/GlobalFunction.php";

    // Cek apakah ada data simpanan
    $JumlahDataSimpanan = mysqli_num_rows(mysqli_query($Conn, "SELECT DISTINCT id_anggota FROM simpanan"));

    if ($JumlahDataSimpanan == 0) {
        die('Belum ada data anggota yang melakukan simpanan.');
    }

    // Membuat objek Spreadsheet
    $spreadsheet = new Spreadsheet();
    $sheet = $spreadsheet->getActiveSheet();
    $sheet->setTitle('Data Simpanan');

    // Header Tabel
    $sheet->setCellValue('A1', 'No');
    $sheet->setCellValue('B1', 'Nama Anggota');
    $sheet->setCellValue('C1', 'NIP');
    $sheet->setCellValue('D1', 'Jumlah Simpanan');

    // Styling Header
    $headerStyle = [
        'font' => ['bold' => true, 'size' => 12],
        'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => 'CCCCCC']],
        'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER],
        'borders' => ['allBorders' => ['borderStyle' => Border::BORDER_THIN]]
    ];
    $sheet->getStyle('A1:D1')->applyFromArray($headerStyle);

    // Mengisi data
    $no = 1;
    $row = 2;
    $JumllahTotal = 0;
    $QrySimpanan = mysqli_query($Conn, "SELECT DISTINCT id_anggota FROM simpanan");

    while ($DataSimpanan = mysqli_fetch_array($QrySimpanan)) {
        $id_anggota = $DataSimpanan['id_anggota'];
        $nip = GetDetailData($Conn, 'anggota', 'id_anggota', $id_anggota, 'nip');
        $nama = GetDetailData($Conn, 'anggota', 'id_anggota', $id_anggota, 'nama');

        // Menghitung jumlah simpanan
        $SumSimpanan = mysqli_fetch_array(mysqli_query($Conn, "SELECT SUM(jumlah) AS jumlah FROM simpanan WHERE id_anggota='$id_anggota'"));
        $JumlahSimpanan = $SumSimpanan['jumlah'] ?? 0;
        $JumllahTotal += $JumlahSimpanan;

        // Menulis data ke dalam sheet
        $sheet->setCellValue('A' . $row, $no);
        $sheet->setCellValue('B' . $row, $nama);
        $sheet->setCellValueExplicit('C' . $row, $nip, \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING); // Format NIP sebagai teks agar tidak berubah ke notasi ilmiah
        $sheet->setCellValue('D' . $row, $JumlahSimpanan);

        // Styling border data
        $sheet->getStyle('A' . $row . ':D' . $row)->applyFromArray([
            'borders' => ['allBorders' => ['borderStyle' => Border::BORDER_THIN]]
        ]);

        $no++;
        $row++;
    }

    // Menampilkan total jumlah simpanan
    $sheet->setCellValue('B' . $row, 'JUMLAH TOTAL');
    $sheet->mergeCells('B' . $row . ':C' . $row); // Menggabungkan sel
    $sheet->setCellValue('D' . $row, $JumllahTotal);

    // Styling total jumlah simpanan
    $totalStyle = [
        'font' => ['bold' => true],
        'alignment' => ['horizontal' => Alignment::HORIZONTAL_RIGHT],
        'borders' => ['allBorders' => ['borderStyle' => Border::BORDER_THIN]]
    ];
    $sheet->getStyle('B' . $row . ':D' . $row)->applyFromArray($totalStyle);

    // Format angka di kolom jumlah simpanan agar tetap dalam bentuk angka
    $sheet->getStyle('D2:D' . $row)->getNumberFormat()->setFormatCode(NumberFormat::FORMAT_NUMBER);

    // Atur lebar kolom otomatis
    foreach (range('A', 'D') as $col) {
        $sheet->getColumnDimension($col)->setAutoSize(true);
    }

    // Menyimpan file Excel
    $filename = "Data_Simpanan_" . date("Ymd_His") . ".xlsx";
    header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    header("Content-Disposition: attachment; filename=$filename");
    header('Cache-Control: max-age=0');

    $writer = new Xlsx($spreadsheet);
    $writer->save('php://output');
?>
