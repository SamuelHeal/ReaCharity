/*--bx slider--*/

 //using jQuery before running JS code
 $(document).ready(function(){
    //activate bx slider
        $('.bxslider').bxSlider({
           captions: 'false',
           responsive: true,
           pager: true,
           auto: true,
           pause: 3500,
           speed: 900,
           /*autoHover: true,*/
           controls: false,
           infiniteLoop: true
         });
       });
   
   