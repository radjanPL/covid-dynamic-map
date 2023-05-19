    <form action='options.php' method='post'>
        <?php
        settings_fields( 'dcmSettingsPage' );
        do_settings_sections( 'dcmSettingsPage' );
        submit_button();
        ?>
    </form>