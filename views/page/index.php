
<div id="PageContent">
	<h1><?php echo $this->e($this->data->PageName) ?></h1>

	<div class="content">
		<?php echo nl2br($this->e($this->data->Content)) ?>
	</div>
	
	<?php if ($this->user()): ?>
	<a href="<?php echo $this->url('page', 'edit', array('id' => $this->data->id))?>">Edit this page </a>
	<?php endif; ?>
</div>