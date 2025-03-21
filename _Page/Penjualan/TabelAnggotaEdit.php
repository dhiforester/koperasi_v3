<?php
    //koneksi dan session
    include "../../_Config/Connection.php";
    include "../../_Config/GlobalFunction.php";
    include "../../_Config/Session.php";
    //inisiasi Variabe;
    $JmlHalaman=0;
    $page=1;
    if(empty($SessionIdAkses)){
        echo '
            <tr>
                <td colspan="7" class="text-center text-danger">
                    Sesi Akses Sudah Berakhir! Silahkan Login Ulang
                </td>
            </tr>
        ';
    }else{
        if(empty($_POST['id_transaksi_jual_beli'])){
            echo '
                <tr>
                    <td colspan="7" class="text-center text-danger">
                        ID Transaksi Tidak Boleh Kosong!
                    </td>
                </tr>
            ';
        }else{
            if(empty($_POST['mode'])){
                echo '
                    <tr>
                        <td colspan="7" class="text-center text-danger">
                            Mode Form Tidak Boleh Kosong!
                        </td>
                    </tr>
                ';
            }else{
                $id_transaksi_jual_beli=$_POST['id_transaksi_jual_beli'];
                $mode=$_POST['mode'];
                //keyword
                if(!empty($_POST['keyword'])){
                    $keyword=$_POST['keyword'];
                }else{
                    $keyword="";
                }
                $batas="10";
                $ShortBy="DESC";
                $OrderBy="id_anggota";
                //Atur Page
                if(!empty($_POST['page'])){
                    $page=$_POST['page'];
                    $posisi = ( $page - 1 ) * $batas;
                }else{
                    $page="1";
                    $posisi = 0;
                }
                if(empty($keyword)){
                    $jml_data = mysqli_num_rows(mysqli_query($Conn, "SELECT id_anggota FROM anggota"));
                }else{
                    $jml_data = mysqli_num_rows(mysqli_query($Conn, "SELECT id_anggota FROM anggota WHERE nama like '%$keyword%' OR nip like '%$keyword%'"));
                }
                if(empty($jml_data)){
                    echo '
                        <tr>
                            <td colspan="4" class="text-center text-danger">
                                Tidak Ada Data Anggota Yang Ditampilkan.
                            </td>
                        </tr>
                    ';
                }else{
                    echo '
                        <tr>
                            <td class="text-end" colspan="4">
                                <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#ModalEditAnggota" data-id="0" data-transaksi="'.$id_transaksi_jual_beli.'" data-mode="'.$mode.'">
                                    Kosongkan Anggota
                                </a>
                            </td>
                        </tr>
                    ';
                    $no = 1+$posisi;
                    //KONDISI PENGATURAN MASING FILTER
                    if(empty($keyword)){
                        $query = mysqli_query($Conn, "SELECT*FROM anggota ORDER BY $OrderBy $ShortBy LIMIT $posisi, $batas");
                    }else{
                        $query = mysqli_query($Conn, "SELECT*FROM anggota WHERE nama like '%$keyword%' OR nip like '%$keyword%' ORDER BY $OrderBy $ShortBy LIMIT $posisi, $batas");
                    }
                    while ($data = mysqli_fetch_array($query)) {
                        $id_anggota= $data['id_anggota'];
                        $nip= $data['nip'];
                        $nama= $data['nama'];
                        echo '
                            <tr>
                                <td><small>'.$no.'</small></td>
                                <td><small>'.$nama.'</small></td>
                                <td><small>'.$nip.'</small></td>
                                <td>
                                    <button type="button" class="btn btn-sm btn-floating btn-primary" data-bs-toggle="modal" data-bs-target="#ModalEditAnggota" data-id="'.$id_anggota.'" data-transaksi="'.$id_transaksi_jual_beli.'" data-mode="'.$mode.'">
                                        <i class="bi bi-check"></i>
                                    </button>
                                </td>
                            </tr>
                        ';
                        $no++;
                    }
                    
                    $JmlHalaman = ceil($jml_data/$batas); 
                }
            }
        }
    }
?>

<script>
    //Creat Javascript Variabel
    var page_count=<?php echo $JmlHalaman; ?>;
    var curent_page=<?php echo $page; ?>;
    
    //Put Into Pagging Element
    $('#page_info_anggota_edit').html('Page '+curent_page+' Of '+page_count+'');
    
    //Set Pagging Button
    if(curent_page==1){
        $('#prev_button_anggota_edit').prop('disabled', true);
    }else{
        $('#prev_button_anggota_edit').prop('disabled', false);
    }
    if(page_count<=curent_page){
        $('#next_button_anggota_edit').prop('disabled', true);
    }else{
        $('#next_button_anggota_edit').prop('disabled', false);
    }

</script>
