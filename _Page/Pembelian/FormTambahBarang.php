<?php
    //Koneksi
    date_default_timezone_set('Asia/Jakarta');
    include "../../_Config/Connection.php";
    include "../../_Config/GlobalFunction.php";
    include "../../_Config/Session.php";
    //Tangkap id_barang_satuan
    if(empty($_POST['id_barang'])){
        echo '
            <div class="alert alert-danger">
                <small>ID barang Tidak Boleh Kosong!</small>
            </div>
        ';
    }else{
        if(empty($_POST['kategori_transaksi'])){
            echo '
                <div class="alert alert-danger">
                    <small>Kategori Transaksi Tidak Boleh Kosong!</small>
                </div>
            ';
        }else{
            $id_barang=$_POST['id_barang'];
            $kategori_transaksi=$_POST['kategori_transaksi'];
            //Buka data Barang
            $QryBarang = mysqli_query($Conn,"SELECT * FROM barang WHERE id_barang='$id_barang'")or die(mysqli_error($Conn));
            $DataBarang= mysqli_fetch_array($QryBarang);
            if(empty($DataBarang['id_barang'])){
                echo '
                    <div class="alert alert-danger">
                        <small>Data Barang Tidak Ditemukan!</small>
                    </div>
                ';
            }else{
                $id_barang= $DataBarang['id_barang'];
                $nama_barang= $DataBarang['nama_barang'];
                $satuan_barang= $DataBarang['satuan_barang'];
                $konversi= $DataBarang['konversi'];
                $harga_beli= $DataBarang['harga_beli'];
                $harga_beli_rp = "Rp " . number_format($harga_beli,0,',','.');

                //Pembulatan konversi
                $konversi = (float) $konversi; // Konversi ke float
                $konversi = ($konversi == floor($konversi)) ? (int)$konversi : $konversi;
?>
                <input type="hidden" name="id_barang" value="<?php echo $id_barang;?>">
                <input type="hidden" name="kategori_transaksi" value="<?php echo $kategori_transaksi;?>">
                <div class="row mb-3">
                    <div class="col-4">
                        <label for="nama_barang">Nama Barang</label>
                    </div>
                    <div class="col-8">
                        <input type="text" name="nama_barang" id="nama_barang" class="form-control" value="<?php echo "$nama_barang"; ?>">
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-4">
                        <label for="satuan_barang">Satuan</label>
                    </div>
                    <div class="col-8">
                        <select name="id_barang_satuan" id="satuan_barang" class="form-control">
                            <option value=""><?php echo "$satuan_barang ($konversi)"; ?></option>
                            <?php
                                //Buka Multi Satuan
                                $QrySatuanMulti = mysqli_query($Conn, "SELECT * FROM barang_satuan WHERE id_barang='$id_barang' ORDER BY satuan_multi ASC");
                                while ($DataSatuanMulti = mysqli_fetch_array($QrySatuanMulti)) {
                                    $id_barang_satuan= $DataSatuanMulti['id_barang_satuan'];
                                    $satuan_multi= $DataSatuanMulti['satuan_multi'];
                                    $konversi_multi= $DataSatuanMulti['konversi_multi'];
                                    echo '<option value="'.$id_barang_satuan.'">'.$satuan_multi.' ('.$konversi_multi.')</option>';
                                }
                            ?>
                        </select>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-4">
                        <label for="qty">QTY</label>
                    </div>
                    <div class="col-8">
                        <div class="input-group">
                            <span class="input-group-text">.00</span>
                            <input type="text" name="qty" id="qty" class="form-control" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" value="1">
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-4">
                        <label for="kategori_harga">Kategori Harga</label>
                    </div>
                    <div class="col-8">
                        <select name="kategori_harga" id="kategori_harga" class="form-control">
                            <?php
                                echo '<option value="'.$harga_beli.'">Harga Beli ('.$harga_beli_rp.' / '.$satuan_barang.')</option>';
                            ?>
                        </select>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-4">
                        <label for="harga">Harga/<?php echo $satuan_barang; ?></label>
                    </div>
                    <div class="col-8">
                        <div class="input-group">
                            <span class="input-group-text">Rp</span>
                            <input type="text" name="harga" id="harga" class="form-control form-money"  oninput="this.value = this.value.replace(/[^0-9]/g, '');" value="0">
                        </div>
                        
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-4">
                        <label for="ppn">PPN (%)</label>
                    </div>
                    <div class="col-8">
                        <div class="input-group">
                            <span class="input-group-text">.00</span>
                            <input type="text" name="ppn" id="ppn" class="form-control" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" value="0">
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-4">
                        <label for="diskon">Diskon (%)</label>
                    </div>
                    <div class="col-8">
                        <div class="input-group">
                            <span class="input-group-text">.00</span>
                            <input type="text" name="diskon" id="diskon" class="form-control" inputmode="numeric" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" value="0">
                        </div>
                    </div>
                </div>
                
                <script>
                    $(document).ready(function() {
                        //Tangkap kategori harga
                        var kategori_harga = Math.round(parseFloat($('#kategori_harga').val())); 
                        
                        //Tempelkan harga
                        $('#harga').val(kategori_harga);
                        
                        //Format nilai
                        initializeMoneyInputs();

                        //Ketika kategori harga diubah
                        $('#kategori_harga').change(function() {
                            var selected_harga = Math.round(parseFloat($(this).val()));
                            $('#harga').val(selected_harga);
                            initializeMoneyInputs();

                            //Refresh Simulasi
                            HitungSimulasiRincian();
                        });

                        //Menampilkan Simulasi pertama kali
                        HitungSimulasiRincian();

                        //Ketika Satuan Diubah
                        $('#satuan_barang').change(function() {
                            HitungSimulasiRincian();
                        });

                        //Ketika qty Diubah
                        $('#qty').keyup(function() {
                            HitungSimulasiRincian();
                        });

                        //Ketika kategori_harga Diubah
                        $('#kategori_harga').change(function() {
                            HitungSimulasiRincian();
                        });

                        //Ketika harga Diubah
                        $('#harga').keyup(function() {
                            HitungSimulasiRincian();
                        });

                        //Ketika ppn Diubah
                        $('#ppn').keyup(function() {
                            HitungSimulasiRincian();
                        });

                        //Ketika diskon Diubah
                        $('#diskon').keyup(function() {
                            HitungSimulasiRincian();
                        });
                    });
                </script>
<?php 
            } 
        } 
    } 
?>