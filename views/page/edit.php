
<form method="POST" action="<?php echo $this->url('page', 'save') ?>" class="pageForm">
	<div><?php echo $this->e($this->message()) ?></div>
	<input type="hidden" name="id" value="<?php echo $this->data->id ?>" />
	<div>
		<label>Page name</label>
		<input type="text" name="PageName" value="<?php echo $this->data->PageName ?>" />
	</div>
	<div>
		<label>Is Homepage</label>
		<input type="checkbox" name="IsHome" value="1" />
	<div>
		<label>Page content</label>
		<textarea name="Content" rows="5" cols="40"><?php echo $this->data->Content ?></textarea>
	</div>
	<input type="submit" value="Save" />
</form>