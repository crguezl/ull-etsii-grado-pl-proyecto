<!DOCTYPE html>
<html>


<?php
	include ("head.php");
  ?>

    		 <script type="text/javascript">
	
		  function preview(valor1){
		 /* $('#ee').remove();
		  $('body').load('preview.php');
			*/	
			
		  }
		  

</script>


<header style="text-align:right;">
	<a class="btn btn-large btn-primary" href= "landing.php" type="button" >Logout</a>
</header>

<body class = "body1">

<div id ="ee" class="hero-unit">

<div class ="row">
<div class="span4">
<div class="well" style="padding: 8px 0;">
        <ul class="nav nav-list">
          <li class="nav-header">Dashboard</li>
          <li class="active"><a href="#"><i class="icon-white icon-home"></i> Home</a></li>
          <li><a href="#"><i class="icon-pencil"></i> Tables</a></li>
          <li class="nav-header">Settings</li>
          <li><a href="#"><i class="icon-user"></i> Privacy</a></li>
                    <li class="divider"></li>
          <li><a href="#"><i class="icon-flag"></i> Help</a></li>
        </ul>
      </div>
	  </div>
	  
<div class="span8" >
<table class="table table-bordered table-striped">
        <colgroup>
          <col class="span1">
          <col class="span7">
        </colgroup>
        <thead>
          <tr>
            
            <th>Description</th>
			<th></th>
          </tr>
        </thead>
        <tbody>
        
          <tr>
            <td>
              <code>Partitura de prueba </code>
            </td>
            <td style="text-align:right;">
              
					<button class="btn btn-success"  onclick="show();">View</button>
					<a class="btn btn-primary" href="#">Modify</a>  
					<button class="btn btn-success"  onclick="play();">Play</button>
<button class="btn btn-success"  onclick="parar();" style="background-color:red;">stop</button>							
                     					
		   </td>
          </tr>
          
       
          
          
        </tbody>
      </table>
	  <div style =" text-align:center;">
<button class="btn btn-primary" href="#">Add More "Partituras(trasnalate)"..</button>
						<input type="file" id="fileinput" />
<div id="container">  
  <button class="play" onclick="">Play Music</button>
  <pre id="debug"> </pre>
</div> 
</div>
</div>
</div>



 </div>
</body>

<?php
	include ("footer.php");
  ?>

</html>
