function filterAndLoadTable() {
    var ProsesFilter = $('#ProsesFilter').serialize();
    $.ajax({
        type: 'POST',
        url: '_Page/Anggota/TabelAnggota.php',
        data: ProsesFilter,
        success: function(data) {
            $('#MenampilkanTabelAnggota').html(data);
        }
    });
}
$(document).ready(function() {
    filterAndLoadTable();
    //Form Password dan tanggal keluar Untuk Pertama Kali
    $('#form_password').hide();
    $('#form_tanggal_keluar').hide();
    $('#form_alasan_keluar').hide();
});
$('#keyword_by').change(function(){
    var keyword_by = $('#keyword_by').val();
    $('#FormFilter').html('Loading...');
    $.ajax({
        type 	    : 'POST',
        url 	    : '_Page/Anggota/FormFilter.php',
        data 	    :  {keyword_by: keyword_by},
        success     : function(data){
            $('#FormFilter').html(data);
        }
    });
});
$('#ProsesFilter').submit(function(){
    $('#page').val("1");
    filterAndLoadTable();
    $('#ModalFilter').modal('hide');
});
//Validasi Kontak Hanya Boleh Angka
$('#kontak').keypress(function(event) {
    // Hanya mengizinkan angka (0-9) dan tombol kontrol seperti backspace
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
});
//Menampilkan Password
$('#tampilkan_password_anggota').click(function(){
    if($(this).is(':checked')){
        $('#password').attr('type','text');
    }else{
        $('#password').attr('type','password');
    }
});
//Menampilkan Form Password Saat akses_anggota bernilai Ya
$('#akses_anggota').click(function(){
    if($(this).is(':checked')){
        $('#form_password').show();
    }else{
        $('#form_password').hide();
    }
});
//Kondisi Ketika Dipilih Status Anggota
$('#status').change(function(){
    var status = $('#status').val();
    if(status=="Keluar"){
        $('#form_tanggal_keluar').show();
        $('#form_alasan_keluar').show();
    }else{
        $('#form_tanggal_keluar').hide();
        $('#form_alasan_keluar').hide();
    }
});
//Proses Tambah Anggota
$('#ProsesTambahAnggota').submit(function(){
    $('#NotifikasiTambahAnggota').html('<div class="spinner-border text-secondary" role="status"><span class="sr-only"></span></div>');
    var form = $('#ProsesTambahAnggota')[0];
    var data = new FormData(form);
    $.ajax({
        type 	    : 'POST',
        url 	    : '_Page/Anggota/ProsesTambahAnggota.php',
        data 	    :  data,
        cache       : false,
        processData : false,
        contentType : false,
        enctype     : 'multipart/form-data',
        success     : function(data){
            $('#NotifikasiTambahAnggota').html(data);
            var NotifikasiTambahAnggotaBerhasil=$('#NotifikasiTambahAnggotaBerhasil').html();
            if(NotifikasiTambahAnggotaBerhasil=="Success"){
                $('#NotifikasiTambahAnggota').html('');
                $('#page').val("1");
                $("#ProsesFilter")[0].reset();
                $("#ProsesTambahAnggota")[0].reset();
                $('#ModalTambahAnggota').modal('hide');
                Swal.fire(
                    'Success!',
                    'Tambah Anggota Berhasil!',
                    'success'
                )
                //Menampilkan Data
                filterAndLoadTable();
            }
        }
    });
});
//Detail Anggota
$('#ModalDetailAnggota').on('show.bs.modal', function (e) {
    var id_anggota= $(e.relatedTarget).data('id');
    $('#FormDetailAnggota').html("Loading...");
    $.ajax({
        type 	    : 'POST',
        url 	    : '_Page/Anggota/FormDetailAnggota.php',
        data        : {id_anggota: id_anggota},
        success     : function(data){
            $('#FormDetailAnggota').html(data);
        }
    });
});
//Modal Edit Anggota
$('#ModalEditAnggota').on('show.bs.modal', function (e) {
    var id_anggota= $(e.relatedTarget).data('id');
    $('#FormEditAnggota').html("Loading...");
    $.ajax({
        type 	    : 'POST',
        url 	    : '_Page/Anggota/FormEditAnggota.php',
        data        : {id_anggota: id_anggota},
        success     : function(data){
            $('#FormEditAnggota').html(data);
            $('#NotifikasiEditAnggota').html('');
        }
    });
});
//Proses Edit Anggota
$('#ProsesEditAnggota').submit(function(){
    $('#NotifikasiEditAnggota').html('<div class="spinner-border text-secondary" role="status"><span class="sr-only"></span></div>');
    var form = $('#ProsesEditAnggota')[0];
    var data = new FormData(form);
    $.ajax({
        type 	    : 'POST',
        url 	    : '_Page/Anggota/ProsesEditAnggota.php',
        data 	    :  data,
        cache       : false,
        processData : false,
        contentType : false,
        enctype     : 'multipart/form-data',
        success     : function(data){
            $('#NotifikasiEditAnggota').html(data);
            var NotifikasiEditAnggotaBerhasil=$('#NotifikasiEditAnggotaBerhasil').html();
            if(NotifikasiEditAnggotaBerhasil=="Success"){
                $('#NotifikasiEditAnggota').html('');
                $("#ProsesEditAnggota")[0].reset();
                $('#ModalEditAnggota').modal('hide');
                Swal.fire(
                    'Success!',
                    'Edit Anggota Berhasil!',
                    'success'
                )
                //Menampilkan Data
                filterAndLoadTable();
            }
        }
    });
});
//Modal Ubah Foto Anggota
$('#ModalUbahFotoAnggota').on('show.bs.modal', function (e) {
    var id_anggota= $(e.relatedTarget).data('id');
    $('#FormUbahFotoAnggota').html("Loading...");
    $.ajax({
        type 	    : 'POST',
        url 	    : '_Page/Anggota/FormUbahFotoAnggota.php',
        data        : {id_anggota: id_anggota},
        success     : function(data){
            $('#FormUbahFotoAnggota').html(data);
            $('#NotifikasiUbahFotoAnggota').html('');
        }
    });
});
//Proses Ubah Foto Anggota
$('#ProsesUbahFotoAnggota').submit(function(){
    $('#NotifikasiUbahFotoAnggota').html('<div class="spinner-border text-secondary" role="status"><span class="sr-only"></span></div>');
    var form = $('#ProsesUbahFotoAnggota')[0];
    var data = new FormData(form);
    $.ajax({
        type 	    : 'POST',
        url 	    : '_Page/Anggota/ProsesUbahFotoAnggota.php',
        data 	    :  data,
        cache       : false,
        processData : false,
        contentType : false,
        enctype     : 'multipart/form-data',
        success     : function(data){
            $('#NotifikasiUbahFotoAnggota').html(data);
            var NotifikasiUbahFotoAnggotaBerhasil=$('#NotifikasiUbahFotoAnggotaBerhasil').html();
            if(NotifikasiUbahFotoAnggotaBerhasil=="Success"){
                $('#NotifikasiUbahFotoAnggota').html('');
                $('#ModalUbahFotoAnggota').modal('hide');
                Swal.fire(
                    'Success!',
                    'Ubah Foto Anggota Berhasil!',
                    'success'
                )
                //Menampilkan Data
                filterAndLoadTable();
            }
        }
    });
});
//Modal Hapus Anggota
$('#ModalHapusAnggota').on('show.bs.modal', function (e) {
    var id_anggota= $(e.relatedTarget).data('id');
    $('#FormHapusAnggota').html("Loading...");
    $.ajax({
        type 	    : 'POST',
        url 	    : '_Page/Anggota/FormHapusAnggota.php',
        data        : {id_anggota: id_anggota},
        success     : function(data){
            $('#FormHapusAnggota').html(data);
            $('#NotifikasiHapusAnggota').html('');
        }
    });
});
//Proses Hapus Anggota
$('#ProsesHapusAnggota').submit(function(){
    $('#NotifikasiHapusAnggota').html('<div class="spinner-border text-secondary" role="status"><span class="sr-only"></span></div>');
    var form = $('#ProsesHapusAnggota')[0];
    var data = new FormData(form);
    $.ajax({
        type 	    : 'POST',
        url 	    : '_Page/Anggota/ProsesHapusAnggota.php',
        data 	    :  data,
        cache       : false,
        processData : false,
        contentType : false,
        enctype     : 'multipart/form-data',
        success     : function(data){
            $('#NotifikasiHapusAnggota').html(data);
            var NotifikasiHapusAnggotaBerhasil=$('#NotifikasiHapusAnggotaBerhasil').html();
            if(NotifikasiHapusAnggotaBerhasil=="Success"){
                $('#NotifikasiHapusAnggota').html('');
                $('#ModalHapusAnggota').modal('hide');
                Swal.fire(
                    'Success!',
                    'Hapus Anggota Berhasil!',
                    'success'
                )
                //Menampilkan Data
                filterAndLoadTable();
            }
        }
    });
});
//Modal Export Anggota
$('#ModalExport').on('show.bs.modal', function (e) {
    $('#FormExport').html("Loading...");
    $.ajax({
        type 	    : 'POST',
        url 	    : '_Page/Anggota/FormExport.php',
        success     : function(data){
            $('#FormExport').html(data);
        }
    });
});
//Proses Import Data Anggota
$('#ProsesImport').submit(function(){
    $('#NotifikasiImport').html('<div class="spinner-border text-secondary" role="status"><span class="sr-only"></span></div>');
    var form = $('#ProsesImport')[0];
    var data = new FormData(form);
    $.ajax({
        type 	    : 'POST',
        url 	    : '_Page/Anggota/ProsesImport.php',
        data 	    :  data,
        cache       : false,
        processData : false,
        contentType : false,
        enctype     : 'multipart/form-data',
        success     : function(data){
            $('#NotifikasiImport').html(data);
            filterAndLoadTable();
        }
    });
});
//Halaman Detail Lainnya
$('#DashboardAnggota').click(function(){
    var GetIdAnggota=$('#GetIdAnggota').html();
    $('#HalamanDetailLainnya').html('Loading...');
    $.ajax({
        type 	    : 'POST',
        url 	    : '_Page/Anggota/DashboardAnggota.php',
        data 	    :  {id_anggota: GetIdAnggota},
        success     : function(data){
            $('#HalamanDetailLainnya').html(data);
            $('.dropdown-item').removeClass('text-white bg-info');
            $('#DashboardAnggota').addClass('text-white bg-info');
        }
    });
});
// Detail Pembelian Anggota
$('#PembelianAnggota').click(function(){
    var GetIdAnggota=$('#GetIdAnggota').html();
    $('#HalamanDetailLainnya').html('Loading...');
    $.ajax({
        type 	    : 'POST',
        url 	    : '_Page/Anggota/PembelianAnggota.php',
        data 	    :  {id_anggota: GetIdAnggota},
        success     : function(data){
            $('#HalamanDetailLainnya').html(data);
            $('.dropdown-item').removeClass('text-white bg-info');
            $('#PembelianAnggota').addClass('text-white bg-info');
            //Menampilkan Tabel Pembelian
            $('#MenampilkanTabelPembelian').html('Loading...');
            $.ajax({
                type 	    : 'POST',
                url 	    : '_Page/Anggota/TabelPembelianAnggota.php',
                data        : {id_anggota: GetIdAnggota},
                success     : function(data){
                    $('#MenampilkanTabelPembelian').html(data);
                }
            });
            //ketika KeywordByPembelian Diubah
            $('#KeywordByPembelian').change(function() {
                var KeywordByPembelian = $('#KeywordByPembelian').val();
                $('#FormKeywordPembelian').html('Loading...');
                $.ajax({
                    type 	    : 'POST',
                    url 	    : '_Page/Anggota/FormKeywordPembelian.php',
                    data 	    :  {KeywordByPembelian: KeywordByPembelian},
                    success     : function(data){
                        $('#FormKeywordPembelian').html(data);
                    }
                });
            });
            //ketika Pencarian submt
            $('#ProsesBatasPembelian').submit(function() {
                var ProsesBatasPembelian = $('#ProsesBatasPembelian').serialize();
                $('#MenampilkanTabelPembelian').html('Loading...');
                $.ajax({
                    type 	    : 'POST',
                    url 	    : '_Page/Anggota/TabelPembelianAnggota.php',
                    data 	    :  ProsesBatasPembelian,
                    success     : function(data){
                        $('#MenampilkanTabelPembelian').html(data);
                    }
                });
            });
            $('#BatasPembelian').change(function() {
                var ProsesBatasPembelian = $('#ProsesBatasPembelian').serialize();
                $('#MenampilkanTabelPembelian').html('Loading...');
                $.ajax({
                    type 	    : 'POST',
                    url 	    : '_Page/Anggota/TabelPembelianAnggota.php',
                    data 	    :  ProsesBatasPembelian,
                    success     : function(data){
                        $('#MenampilkanTabelPembelian').html(data);
                    }
                });
            });
            $('#ShortByPembelian').change(function() {
                var ProsesBatasPembelian = $('#ProsesBatasPembelian').serialize();
                $('#MenampilkanTabelPembelian').html('Loading...');
                $.ajax({
                    type 	    : 'POST',
                    url 	    : '_Page/Anggota/TabelPembelianAnggota.php',
                    data 	    :  ProsesBatasPembelian,
                    success     : function(data){
                        $('#MenampilkanTabelPembelian').html(data);
                    }
                });
            });
            $('#KeywordByPembelian').change(function() {
                var ProsesBatasPembelian = $('#ProsesBatasPembelian').serialize();
                $('#MenampilkanTabelPembelian').html('Loading...');
                $.ajax({
                    type 	    : 'POST',
                    url 	    : '_Page/Anggota/TabelPembelianAnggota.php',
                    data 	    :  ProsesBatasPembelian,
                    success     : function(data){
                        $('#MenampilkanTabelPembelian').html(data);
                    }
                });
            });
        }
    });
});
//Detail Rincian Anggota
$('#RincianAnggota').click(function(){
    var GetIdAnggota=$('#GetIdAnggota').html();
    $('#HalamanDetailLainnya').html('Loading...');
    $.ajax({
        type 	    : 'POST',
        url 	    : '_Page/Anggota/RinciannAnggota.php',
        data 	    :  {id_anggota: GetIdAnggota},
        success     : function(data){
            $('#HalamanDetailLainnya').html(data);
            $('.dropdown-item').removeClass('text-white bg-info');
            $('#RincianAnggota').addClass('text-white bg-info');
            //Menampilkan tabel rincian
            $('#MenampilkanTabelRincian').html('Loading...');
            $.ajax({
                type 	    : 'POST',
                url 	    : '_Page/Anggota/TabelRincianAnggota.php',
                data        : {id_anggota: GetIdAnggota},
                success     : function(data){
                    $('#MenampilkanTabelRincian').html(data);
                }
            });
            //ketika Pencarian submt
            $('#ProsesBatasRincian').submit(function() {
                var ProsesBatasRincian = $('#ProsesBatasRincian').serialize();
                $('#MenampilkanTabelRincian').html('Loading...');
                $.ajax({
                    type 	    : 'POST',
                    url 	    : '_Page/Anggota/TabelRincianAnggota.php',
                    data 	    :  ProsesBatasRincian,
                    success     : function(data){
                        $('#MenampilkanTabelRincian').html(data);
                    }
                });
            });
            $('#BatasRincian').change(function() {
                var ProsesBatasRincian = $('#ProsesBatasRincian').serialize();
                $('#MenampilkanTabelRincian').html('Loading...');
                $.ajax({
                    type 	    : 'POST',
                    url 	    : '_Page/Anggota/TabelRincianAnggota.php',
                    data 	    :  ProsesBatasRincian,
                    success     : function(data){
                        $('#MenampilkanTabelRincian').html(data);
                    }
                });
            });
            $('#ShortByRincian').change(function() {
                var ProsesBatasRincian = $('#ProsesBatasRincian').serialize();
                $('#MenampilkanTabelRincian').html('Loading...');
                $.ajax({
                    type 	    : 'POST',
                    url 	    : '_Page/Anggota/TabelRincianAnggota.php',
                    data 	    :  ProsesBatasRincian,
                    success     : function(data){
                        $('#MenampilkanTabelRincian').html(data);
                    }
                });
            });
            $('#KeywordByRincian').change(function() {
                var KeywordByRincian = $('#KeywordByRincian').val();
                $('#FormKeywordRincian').html('Loading...');
                $.ajax({
                    type 	    : 'POST',
                    url 	    : '_Page/Anggota/FormKeywordRincian.php',
                    data 	    :  {KeywordByRincian: KeywordByRincian},
                    success     : function(data){
                        $('#FormKeywordRincian').html(data);
                    }
                });
            });
        }
    });
});
//Detail Simpanan Anggota
$('#SimpananAnggota').click(function(){
    var GetIdAnggota=$('#GetIdAnggota').html();
    $('#HalamanDetailLainnya').html('Loading...');
    $.ajax({
        type 	    : 'POST',
        url 	    : '_Page/Anggota/SimpananAnggota.php',
        data 	    :  {id_anggota: GetIdAnggota},
        success     : function(data){
            $('#HalamanDetailLainnya').html(data);
            $('.dropdown-item').removeClass('text-white bg-info');
            $('#SimpananAnggota').addClass('text-white bg-info');
            //menampilkan Tabel Simpanan
            $('#MenampilkanTabelSimpanan').html('Loading...');
            $.ajax({
                type 	    : 'POST',
                url 	    : '_Page/Anggota/TabelSimpananAnggota.php',
                data        : {id_anggota: GetIdAnggota},
                success     : function(data){
                    $('#MenampilkanTabelSimpanan').html(data);
                }
            });
            // //ketika Pencarian submt
            // $('#ProsesBatasSimpanan').submit(function() {
            //     var ProsesBatasSimpanan = $('#ProsesBatasSimpanan').serialize();
            //     $('#MenampilkanTabelSimpanan').html('Loading...');
            //     $.ajax({
            //         type 	    : 'POST',
            //         url 	    : '_Page/Anggota/TabelSimpananAnggota.php',
            //         data 	    :  ProsesBatasSimpanan,
            //         success     : function(data){
            //             $('#MenampilkanTabelSimpanan').html(data);
            //         }
            //     });
            // });
            // $('#BatasSimpanan').change(function() {
            //     var ProsesBatasSimpanan = $('#ProsesBatasSimpanan').serialize();
            //     $('#MenampilkanTabelSimpanan').html('Loading...');
            //     $.ajax({
            //         type 	    : 'POST',
            //         url 	    : '_Page/Anggota/TabelSimpananAnggota.php',
            //         data 	    :  ProsesBatasSimpanan,
            //         success     : function(data){
            //             $('#MenampilkanTabelSimpanan').html(data);
            //         }
            //     });
            // });
            // $('#OrderBySimpanann').change(function() {
            //     var ProsesBatasSimpanan = $('#ProsesBatasSimpanan').serialize();
            //     $('#MenampilkanTabelSimpanan').html('Loading...');
            //     $.ajax({
            //         type 	    : 'POST',
            //         url 	    : '_Page/Anggota/TabelSimpananAnggota.php',
            //         data 	    :  ProsesBatasSimpanan,
            //         success     : function(data){
            //             $('#MenampilkanTabelSimpanan').html(data);
            //         }
            //     });
            // });
            // $('#ShortBySimpanan').change(function() {
            //     var ProsesBatasSimpanan = $('#ProsesBatasSimpanan').serialize();
            //     $('#MenampilkanTabelSimpanan').html('Loading...');
            //     $.ajax({
            //         type 	    : 'POST',
            //         url 	    : '_Page/Anggota/TabelSimpananAnggota.php',
            //         data 	    :  ProsesBatasSimpanan,
            //         success     : function(data){
            //             $('#MenampilkanTabelSimpanan').html(data);
            //         }
            //     });
            // });
            // $('#KeywordBySimpanan').change(function() {
            //     var KeywordBySimpanan = $('#KeywordBySimpanan').val();
            //     $('#FormKeywordSimpanan').html('Loading...');
            //     $.ajax({
            //         type 	    : 'POST',
            //         url 	    : '_Page/Anggota/FormKeywordSimpanan.php',
            //         data 	    :  {KeywordBySimpanan: KeywordBySimpanan},
            //         success     : function(data){
            //             $('#FormKeywordSimpanan').html(data);
            //         }
            //     });
            // });
        }
    });
});
$('#PinjamanAnggota').click(function(){
    var GetIdAnggota=$('#GetIdAnggota').html();
    $('#HalamanDetailLainnya').html('Loading...');
    $.ajax({
        type 	    : 'POST',
        url 	    : '_Page/Anggota/PinjamanAnggota.php',
        data 	    :  {id_anggota: GetIdAnggota},
        success     : function(data){
            $('#HalamanDetailLainnya').html(data);
            $('.dropdown-item').removeClass('text-white bg-info');
            $('#PinjamanAnggota').addClass('text-white bg-info');
            //menampilkan Tabel Pinjaman
            $('#MenampilkanTabelPinjaman').html('Loading...');
            $.ajax({
                type 	    : 'POST',
                url 	    : '_Page/Anggota/TabelPinjamanAnggota.php',
                data        : {id_anggota: GetIdAnggota},
                success     : function(data){
                    $('#MenampilkanTabelPinjaman').html(data);
                }
            });
        }
    });
});
$('#BagiHasilAnggota').click(function(){
    var GetIdAnggota=$('#GetIdAnggota').html();
    $('#HalamanDetailLainnya').html('Loading...');
    $.ajax({
        type 	    : 'POST',
        url 	    : '_Page/Anggota/BagiHasilAnggota.php',
        data 	    :  {id_anggota: GetIdAnggota},
        success     : function(data){
            $('#HalamanDetailLainnya').html(data);
            $('.dropdown-item').removeClass('text-white bg-info');
            $('#BagiHasilAnggota').addClass('text-white bg-info');
            //menampilkan Tabel BagiHasil
            $('#MenampilkanTabelBagiHasil').html('Loading...');
            $.ajax({
                type 	    : 'POST',
                url 	    : '_Page/Anggota/TabelBagiHasil.php',
                data        : {id_anggota: GetIdAnggota},
                success     : function(data){
                    $('#MenampilkanTabelBagiHasil').html(data);
                }
            });
        }
    });
});
//Export Transaksi Anggota
$('#ModalExportPembelian').on('show.bs.modal', function (e) {
    var id_anggota = $(e.relatedTarget).data('id');
    $('#FormExportTransaksi').html("Loading...");
    $.ajax({
        type 	    : 'POST',
        url 	    : '_Page/Anggota/FormExportTransaksi.php',
        data        : {id_anggota: id_anggota},
        success     : function(data){
            $('#FormExportTransaksi').html(data);
        }
    });
});
//Detail Transaksi
$('#ModalDetailTransaksi').on('show.bs.modal', function (e) {
    var id_transaksi = $(e.relatedTarget).data('id');
    $('#FormDetailTransaksi').html("Loading...");
    $.ajax({
        type 	    : 'POST',
        url 	    : '_Page/Transaksi/FormDetailTransaksi.php',
        data        : {id_transaksi: id_transaksi},
        success     : function(data){
            $('#FormDetailTransaksi').html(data);
        }
    });
});
//Export Rincian Anggota
$('#ModalExportRincian').on('show.bs.modal', function (e) {
    var id_anggota = $(e.relatedTarget).data('id');
    $('#FormExportRincian').html("Loading...");
    $.ajax({
        type 	    : 'POST',
        url 	    : '_Page/Anggota/FormExportRincian.php',
        data        : {id_anggota: id_anggota},
        success     : function(data){
            $('#FormExportRincian').html(data);
        }
    });
});
//Export Simpanan Anggota
$('#ModalExportSimpanan').on('show.bs.modal', function (e) {
    var id_anggota = $(e.relatedTarget).data('id');
    $('#FormExportSimpanan').html("Loading...");
    $.ajax({
        type 	    : 'POST',
        url 	    : '_Page/Anggota/FormExportSimpanan.php',
        data        : {id_anggota: id_anggota},
        success     : function(data){
            $('#FormExportSimpanan').html(data);
        }
    });
});

//Hapus Anggota
$('#ModalDeleteAnggota').on('show.bs.modal', function (e) {
    var GetData = $(e.relatedTarget).data('id');
    var pecah = GetData.split(",");
    var id_anggota = pecah[0];
    var keyword = pecah[1];
    var batas = pecah[2];
    var ShortBy = pecah[3];
    var OrderBy = pecah[4];
    var page = pecah[5];
    var posisi = pecah[6];
    var keyword_by = pecah[7];
    $('#FormDeleteAnggota').html("Loading...");
    $.ajax({
        type 	    : 'POST',
        url 	    : '_Page/Anggota/FormDeleteAnggota.php',
        data        : {id_anggota: id_anggota},
        success     : function(data){
            $('#FormDeleteAnggota').html(data);
            //Konfirmasi Hapus Anggota
            $('#KonfirmasiHapusAnggota').click(function(){
                $('#NotifikasiHapusAnggota').html('<div class="spinner-border text-secondary" role="status"><span class="sr-only"></span></div>');
                $.ajax({
                    type 	    : 'POST',
                    url 	    : '_Page/Anggota/ProsesHapusAnggota.php',
                    data        : {id_anggota: id_anggota},
                    success     : function(data){
                        $('#NotifikasiHapusAnggota').html(data);
                        var NotifikasiHapusAnggotaBerhasil=$('#NotifikasiHapusAnggotaBerhasil').html();
                        if(NotifikasiHapusAnggotaBerhasil=="Success"){
                            $.ajax({
                                type 	    : 'POST',
                                url 	    : '_Page/Anggota/TabelAnggota.php',
                                data 	    :  {keyword: keyword, batas: batas, ShortBy: ShortBy, OrderBy: OrderBy, page: page, posisi: posisi, keyword_by: keyword_by},
                                success     : function(data){
                                    $('#MenampilkanTabelAnggota').html(data);
                                    $('#ModalDeleteAnggota').modal('hide');
                                    swal("Good Job!", "Hapus Anggota Berhasil!", "success");
                                }
                            });
                        }
                    }
                });
            });
        }
    });
});
//Edit Anggota 2
$('#ModalEditAnggota2').on('show.bs.modal', function (e) {
    var id_anggota = $(e.relatedTarget).data('id');
    $('#FormEditAnggota2').html("Loading...");
    $.ajax({
        type 	    : 'POST',
        url 	    : '_Page/Anggota/FormEditAnggota.php',
        data        : {id_anggota: id_anggota},
        success     : function(data){
            $('#FormEditAnggota2').html(data);
            //Proses Edit Anggota
            $('#ProsesEditAnggota2').submit(function(){
                $('#NotifikasiEditAnggota').html('<div class="spinner-border text-secondary" role="status"><span class="sr-only"></span></div>');
                var form = $('#ProsesEditAnggota2')[0];
                var data = new FormData(form);
                $.ajax({
                    type 	    : 'POST',
                    url 	    : '_Page/Anggota/ProsesEditAnggota.php',
                    data 	    :  data,
                    cache       : false,
                    processData : false,
                    contentType : false,
                    enctype     : 'multipart/form-data',
                    success     : function(data){
                        $('#NotifikasiEditAnggota').html(data);
                        var NotifikasiEditAnggotaBerhasil=$('#NotifikasiEditAnggotaBerhasil').html();
                        if(NotifikasiEditAnggotaBerhasil=="Success"){
                            location.reload();
                        }
                    }
                });
            });
        }
    });
});
//Modal Tambah Akses Anggota
$('#ModalTambahAksesAnggota').on('show.bs.modal', function (e) {
    $('#FormTambahAksesAnggota').html("Loading...");
    $.ajax({
        type 	    : 'POST',
        url 	    : '_Page/Anggota/FormTambahAksesAnggota.php',
        success     : function(data){
            $('#FormTambahAksesAnggota').html(data);
            //Kondisi saat tampilkan password
            $('.form-check-input').click(function(){
                if($(this).is(':checked')){
                    $('#password1').attr('type','text');
                    $('#password2').attr('type','text');
                }else{
                    $('#password1').attr('type','password');
                    $('#password2').attr('type','password');
                }
            });
        }
    });
});
//Modal Status Akses Anggota
$('#ModalStatusAksesAnggota').on('show.bs.modal', function (e) {
    var GetData = $(e.relatedTarget).data('id');
    var pecah = GetData.split(",");
    var id_akses_anggota = pecah[0];
    var keyword = pecah[1];
    var batas = pecah[2];
    var ShortBy = pecah[3];
    var OrderBy = pecah[4];
    var page = pecah[5];
    var keyword_by = pecah[6];
    $('#FormStatusAksesAnggota').html("Loading...");
    $.ajax({
        type 	    : 'POST',
        url 	    : '_Page/Anggota/FormStatusAksesAnggota.php',
        data        : {id_akses_anggota: id_akses_anggota},
        success     : function(data){
            $('#FormStatusAksesAnggota').html(data);
            $('#TabelPilihAnggota').html(data);
            $.ajax({
                url     : "_Page/Anggota/TabelPilihAnggota.php",
                method  : "POST",
                data 	:  { id_akses_anggota: id_akses_anggota },
                success: function (data) {
                    $('#TabelPilihAnggota').html(data);
                }
            });
            $('#CariPilihAnggota').submit(function(){
                var CariPilihAnggota = $('#CariPilihAnggota').serialize();
                $('#TabelPilihAnggota').html('Loading...');
                $.ajax({
                    type 	    : 'POST',
                    url 	    : '_Page/Anggota/TabelPilihAnggota.php',
                    data 	    :  CariPilihAnggota,
                    success     : function(data){
                        $('#TabelPilihAnggota').html(data);
                    }
                });
            });
            $('#BatasCariAnggota').change(function(){
                var CariPilihAnggota = $('#CariPilihAnggota').serialize();
                $('#TabelPilihAnggota').html('Loading...');
                $.ajax({
                    type 	    : 'POST',
                    url 	    : '_Page/Anggota/TabelPilihAnggota.php',
                    data 	    :  CariPilihAnggota,
                    success     : function(data){
                        $('#TabelPilihAnggota').html(data);
                    }
                });
            });
        }
    });
});
//Hapus Hubungkan Anggota
$('#ModalHubungkanAnggota').on('show.bs.modal', function (e) {
    var GetData = $(e.relatedTarget).data('id');
    var pecah = GetData.split(",");
    var id_anggota = pecah[0];
    var id_akses_anggota = pecah[1];
    $('#FormHubungkanAnggota').html("Loading...");
    $.ajax({
        type 	    : 'POST',
        url 	    : '_Page/Anggota/FormHubungkanAnggota.php',
        data        : {id_anggota: id_anggota, id_akses_anggota: id_akses_anggota},
        success     : function(data){
            $('#FormHubungkanAnggota').html(data);
            //Konfirmasi Hubungkan Anggota
            $('#KonfirmasiHubungkanAnggota').click(function(){
                $('#NotifikasiHubungkanAnggota').html('Loading...');
                $.ajax({
                    type 	    : 'POST',
                    url 	    : '_Page/Anggota/ProsesHubungkanAksesAnggota.php',
                    data        : {id_anggota: id_anggota, id_akses_anggota: id_akses_anggota},
                    success     : function(data){
                        $('#NotifikasiHubungkanAnggota').html(data);
                        var NotifikasiHubungkanAnggotaBerhasil=$('#NotifikasiHubungkanAnggotaBerhasil').html();
                        if(NotifikasiHubungkanAnggotaBerhasil=="Success"){
                            $('#MenampilkanTabelAksesAnggota').html('Loading...');
                            $.ajax({
                                url     : "_Page/Anggota/TabelAksesAnggota.php",
                                method  : "POST",
                                success: function (data) {
                                    $('#MenampilkanTabelAksesAnggota').html(data);
                                    $('#ModalHubungkanAnggota').modal('hide');
                                    swal("Good Job!", "Menghubungkan Akses Anggota Berhasil!", "success");
                                }
                            })
                        }
                    }
                });
            });
        }
    });
});
//Hapus Akses Anggota
$('#ModalDeletePermintaanAksesAnggota').on('show.bs.modal', function (e) {
    var GetData = $(e.relatedTarget).data('id');
    var pecah = GetData.split(",");
    var id_akses_anggota = pecah[0];
    var keyword = pecah[1];
    var batas = pecah[2];
    var ShortBy = pecah[3];
    var OrderBy = pecah[4];
    var page = pecah[5];
    var keyword_by = pecah[6];
    $('#FormDeletePermintaanAksesAnggota').html("Loading...");
    $.ajax({
        type 	    : 'POST',
        url 	    : '_Page/Anggota/FormDeletePermintaanAksesAnggota.php',
        data        : {id_akses_anggota: id_akses_anggota},
        success     : function(data){
            $('#FormDeletePermintaanAksesAnggota').html(data);
            //Konfirmasi Delete Permintaan Akses Anggota
            $('#KonfirmasiDeletePermintaanAksesAnggota').click(function(){
                $('#NotifikasiHapusPermintaanAksesAnggota').html('<div class="spinner-border text-secondary" role="status"><span class="sr-only"></span></div>');
                $.ajax({
                    type 	    : 'POST',
                    url 	    : '_Page/Anggota/ProsesHapusAksesAnggota.php',
                    data        : {id_akses_anggota: id_akses_anggota},
                    success     : function(data){
                        $('#NotifikasiHapusPermintaanAksesAnggota').html(data);
                        var NotifikasiHapusPermintaanAksesAnggotaBerhasil=$('#NotifikasiHapusPermintaanAksesAnggotaBerhasil').html();
                        if(NotifikasiHapusPermintaanAksesAnggotaBerhasil=="Success"){
                            $.ajax({
                                url     : "_Page/Anggota/TabelAksesAnggota.php",
                                method  : "POST",
                                data 	:  { page: page, BatasAksesAnggota: batas, KeywordAksesAnggota: keyword, KeywordByAksesAnggota: keyword_by, OrderByAksesAnggota: OrderBy, ShortByAksesAnggota: ShortBy },
                                success: function (data) {
                                    $('#MenampilkanTabelAksesAnggota').html(data);
                                    $('#ModalDeletePermintaanAksesAnggota').modal('hide');
                                    swal("Good Job!", "Hapus Akses Anggota Berhasil!", "success");
                                }
                            })
                        }
                    }
                });
            });
        }
    });
});
