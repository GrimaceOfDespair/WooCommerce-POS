<?php
/**
 * Template for the admin tools
 */
?>

<script id="tmpl-wc-pos-settings-tools" type="text/html">

	<h3><?php /* translators: woocommerce */ _e( 'Tools', 'woocommerce' ); ?></h3>

	<table class="widefat">
		<tbody>
			<tr>
				<th><?php _e( 'Translation Upgrade', 'woocommerce' ); ?></th>
				<td>
					<a href="#" class="button action-translation"><?php _e( 'Force Translation Upgrade', 'woocommerce' ); ?></a>
					<?php _e( '<strong class="red">Note:</strong> This option will force the translation upgrade for your language if a translation is available.', 'woocommerce' ); ?>
				</td>
			</tr>
		</tbody>
	</table>

</script>

<script id="tmpl-translation-update-modal" type="text/html">
	<div class="modal-header">
		<h1><%= title %></h1>
		<i class="dashicons dashicons-no-alt close"></i>
	</div>
	<div class="modal-body">
		<i class="spinner"></i>
	</div>
	<div class="modal-footer" style="display: none;">
		<button type="button" class="button close"><?php /* translators: wordpress */ _e( 'Close' ); ?></button>
	</div>
</script>