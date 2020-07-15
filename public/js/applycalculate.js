function calculateTotal() {
		
    var month= document.myForm.duration.value
    var amount= document.myForm.amount.value
    var r=0.03
    var totalInterest=r*amount*month
    // console.log(typeof(totalInterest))
    var m=parseInt(month)
    var i=parseInt(totalInterest)
    var l=parseInt(amount)
    var paymentPerMonth=[l+i]/m
    // console.log(typeof(l))
    // console.log(typeof(i))
    // console.log(typeof(m))
    // console.log(typeof(paymentPerMonth))
    //var monthlyInterestRatio = (rateOfInterest/100)/12;
    totalReturn = eval(l+i);
    
    document.getElementById("myForm").elements.namedItem("permonthamount").value =paymentPerMonth;
    //var x=parseInt(document.getElementById("myForm").elements.namedItem("permonthamount").value)
    //x=paymentPerMonth
    //console.log(typeof(x))
    //console.log(typeof(document.getElementById("myForm").elements.namedItem("permonthamount").value))
     document.getElementById("myForm").elements.namedItem("returnamount").value=totalReturn;
    //document.getElementById('update').innerHTML = totalR;
}







































// (function($) {

 
// })(jQuery);

// function loancalculate()
// {
//     var loanAmount =$("#pricipal").text();
//     var numberOfMonths =$("#totalyear").text();
//     var rateOfInterest=10;

//     var monthlyInterestRatio = (rateOfInterest/100)/12;

//     var top = Math.pow((1+monthlyInterestRatio),numberOfMonths);
//     var bottom = top -1;
//     var sp = top / bottom;
//     var emi = ((loanAmount * monthlyInterestRatio) * sp);
//     var full = numberOfMonths * emi;
//     var interest = full - loanAmount;
//     var int_pge =  (interest / full) * 100;
//     //$("#tbl_int_pge").html(int_pge.toFixed(2)+" %");
//     //$("#tbl_loan_pge").html((100-int_pge.toFixed(2))+" %");

//     var emi_str = emi.toFixed(2).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//     var loanAmount_str = loanAmount.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//     var full_str = full.toFixed(2).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//     var int_str = interest.toFixed(2).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");


//     $("#emi").html(emi_str);
//     $("#tbl_emi").html(int_str);
//     $("#tbl_la").html(full_str);
// }