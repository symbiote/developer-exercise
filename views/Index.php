<!DOCTYPE html >
<!--
You're looking are you? 

https://github.com/nyeholt/developer-exercise

-->
<html>
	<head>
		<base href="<?php echo $this->base() ?>"></base>
		<title>Exercise</title>
		<link rel="stylesheet" type="text/css" href="css/style.css" ></link>
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
		<script type="text/javascript" src="js/script.js"></script>
	</head>
	<body>
		<div id="Wrapper">
			<div id="Menu">
				<?php if ($this->allPages): foreach ($this->allPages as $page): ?>
				<p>
					<a href="<?php echo $this->url('page', 'index', array('id' => $page->id)) ?>"><?php echo $this->e($page->PageName) ?></a>
				</p>
				<?php endforeach; endif; ?>
				<p>
				<a href="<?php echo $this->url('page', 'edit') ?>">Add new page</a>
				</p>
			</div>
			<div id="Content"><?php echo $this->MasterContent ?></div>
			
			<div id="LoginForm">
				<?php if (!$this->user()): ?>
				<form method="POST" action="<?php echo $this->url('index', 'login')?>">
					<input type="text" name="email" />
					<input type="submit" value="login" />
				</form>
				<?php else: ?>
				<a href="<?php echo $this->url('index', 'logout') ?>">Logout</a>
				<?php endif; ?>
			</div>

		</div>
	</body>
	</head>
</html>
