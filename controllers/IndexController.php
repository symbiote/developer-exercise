<?php

/**
 * @author marcus@symbiote.com.au
 */
class IndexController extends Controller {
	public function indexAction() {
		include_once dirname(__FILE__).'/PageController.php';
		$ctrl = new PageController($this->params);
		return $ctrl->indexAction();
	}

	public function loginAction() {
		if (isset($_POST['email'])) {
			$_SESSION['user'] = $_POST['email'];
		}
		$back = $this->backUrl();
		$this->redirect($back);
	}
	
	public function logoutAction() {
		unset($_SESSION['user']);
		$back = $this->backUrl();
		$this->redirect($back);
	}
}
