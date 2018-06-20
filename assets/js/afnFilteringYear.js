/**
 * Filter a specific numeric column on the value being between two given
 * numbers. Note that you will likely need to change the id's on the inputs
 * and the column in which the numeric value is given.
 *
 *  @summary Filter the data between two numbers (inclusive)
 *  @name Range filtering (numbers)
 *  @author [Allan Jardine](http://sprymedia.co.uk). Modified by Dat Toan NGUYEN.
 *
 *  @example
 *    $(document).ready(function() {
 *        // Initialise datatables
 *        var table = $('#example').DataTable();
 *
 *        // Add event listeners to the two range filtering inputs
 *        $('#min').keyup( function() { table.draw(); } );
 *        $('#max').keyup( function() { table.draw(); } );
 *    } );
 */

jQuery.fn.dataTableExt.afnFiltering.push(
  function( oSettings, aData, iDataIndex ) {

    //Value of min and max for the peptide sequence
    var iRangeYear = document.getElementById('rangeYear').value *1;


    var iTypeYear = document.getElementById('typeYear').value;


    var colValue;
    if (aData[2] !== undefined){
      colValue = parseInt(aData[2],10);
    }else {
      colValue = 0;
    }



    if (iTypeYear === '<'){
      return iRangeYear === 0 || colValue <= iRangeYear;
    } else if (iTypeYear === '>') {
      return iRangeYear === 0 || colValue >= iRangeYear;
    } else {
      return iRangeYear === 0 || colValue === iRangeYear;
    }
  }
);
