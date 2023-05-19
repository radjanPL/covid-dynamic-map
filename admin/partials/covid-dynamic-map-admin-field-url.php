<?php


    $options = get_option( 'dcm_settings' );
    ?>
    <input type='text' name='dcm_settings[dcm_api_url]' placeholder="https://kaifzva9he.execute-api.us-east-1.amazonaws.com/prod" value='<?php echo $options['dcm_api_url']; ?>'>

