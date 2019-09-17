<?php 
	header("Access-Control-Allow-Origin: http://localhost");
	ini_set("display_errors", true);
    $Tipo 	= $_POST['Tipo'];
    $P1 	= $_POST['P1'];
    $P2 	= $_POST['P2'];
    $P3 	= $_POST['P3'];
    $P4 	= $_POST['P4'];
    $P5 	= $_POST['P5'];

    switch ($Tipo) {
	    case 'listarClientes':
	        echo listarClientes();
	        break;
	   
	}

	function listarClientes(){
		return '<table id="datatable-clientes" class="table display responsive nowrap">
				      <thead>
				        <tr>
				          <th class="wd-15p">Id</th>
				          <th class="wd-15p">Nombre del Cliente</th>
				          <th class="wd-15p">Dni</th>
				          <th class="wd-20p">Fec. Nac.</th>
				          <th class="wd-15p">Teléfono</th>
				          <th class="wd-10p">Dirección</th>
				          <th class="wd-10p"></th>
				        </tr>
				      </thead>
				      <tbody>
				        '.bodyClientes().'
				      </tbody>
				    </table>';
	}

	function bodyClientes(){
		
		require_once("ConexionBd.php"); 

		$sql = "select * from clientes";

		$stmt = sqlsrv_query($conn, $sql, array(), array( "Scrollable" => 'static' )) or die(print_r(sqlsrv_errors(), true));
		// #$row_count = sqlsrv_num_rows( $stmt );

		$contador = 0;
		$salida='';
		while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
			$id        = $row['id'];
			$dni       = $row['dni'];
			$nombre    = $row['nombre'];
			$fecNac    = $row['fecNac'];
			$telefono  = $row['telefono'];
			$direccion = $row['direccion'];
			$fecNac 		= $fecNac->format('d-m-Y');	
			$contador += 1;

			$salida .= '<tr>	
							<td>'.$id.'</td>
							<td>'.$nombre.'</td>
							<td>'.$dni.'</td>
							<td>'.$fecNac.'</td>
							<td>'.$telefono.'</td>
							<td>'.$direccion.'</td>
							<td></td>
						</tr>';	
		}	
			
		sqlsrv_free_stmt($stmt);

		/* SE DEVUELVE LA SALIDA */
		return $salida;
	
	}

	function listarClientes2(){
		
		require_once("ConexionBd.php"); 

		$sql = "select * from clientes";

		$stmt = sqlsrv_query($conn, $sql, array(), array( "Scrollable" => 'static' )) or die(print_r(sqlsrv_errors(), true));
		// #$row_count = sqlsrv_num_rows( $stmt );
		// 
		$dataSet = array (
				"sEcho" 				=>  0,
				"iTotalRecords"			=>	1,
				"iTotalDisplayRecords" 	=>	1,
				"aaData" 				=>	array () 
		);
		$contador = 0;
		while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
			$id        = $row['id'];
			$dni       = $row['dni'];
			$nombre    = $row['nombre'];
			$fecNac    = $row['fecNac'];
			$telefono  = $row['telefono'];
			$direccion = $row['direccion'];
			
			$contador += 1;

			$dataSet['aaData'][] = array(	
											$id,
											$dni,
											$nombre,
											$fecNac,
											$telefono,
											$direccion,
											''
										);	
		}	
			
		sqlsrv_free_stmt($stmt);

		$salidaDeDataSet = json_encode ($dataSet, JSON_HEX_QUOT);
	
		/* SE DEVUELVE LA SALIDA */
		return $salidaDeDataSet;
	
	}

	
?>

