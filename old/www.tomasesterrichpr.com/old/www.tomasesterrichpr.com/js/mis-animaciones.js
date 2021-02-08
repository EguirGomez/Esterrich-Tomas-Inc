jQuery(function($) { 
        $('.h4-nos').waypoint(function() {
            $(this).toggleClass( 'bounceIn animated' );
        },
        {
            offset: '60%',
            triggerOnce: true,
        });


        $('.p-info').waypoint(function() {
            $(this).toggleClass( 'flipInX animated' );
        },
        {
            offset: '50%',
            triggerOnce: true
        });

        $('.h4-box').waypoint(function() {
            $(this).toggleClass( 'bounceIn animated' );
        },
        {
            offset: '70%',
            triggerOnce: true
        });

        $('.p-box').waypoint(function() {
            $(this).toggleClass( 'flipInX animated' );
        },
        {
            offset: '70%',
            triggerOnce: true
        }); 

         $('.icons').waypoint(function() {
            $(this).toggleClass( 'flipInX animated' );
        },
        {
            offset: '70%',
            triggerOnce: true
        });

        $('.li-a').waypoint(function() {
            $(this).toggleClass( 'flipInY animated' );
        },
        {
            offset: '70%',
            triggerOnce: true
        });        
              
    });