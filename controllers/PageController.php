<?php

/**
 * @author marcus@silverstripe.com.au
 */
class PageController extends Controller {
	
	
	protected function defaultData() {
		return new Page;
	}
	
	public function indexAction() {
		$page = $this->data();
		if (!$page->id) {
			// find homepage
			$page = $this->dataStore()->findOne('IsHome', 1);
		}

		$data = array(
			'data'		=> $page,
			'allPages'	=> $this->dataStore()->all()
		);
		
		if ($page && $page->id) {
			return $this->render($data);
		} else {
			return $this->render($data, 'notfound');
		}
	}

	public function viewAction() {
		return $this->indexAction();
	}

	public function saveAction() {
		$page = $this->data();
		if (!$page) {
			$page = new Page;
		}
		
		if (!strlen($_POST['PageName'])) {
			$this->message("Invalid name");
			$this->redirect($this->url('page', 'edit'));
			return;
		}
		
		$existing = $this->dataStore()->findOne('PageName', $_POST['PageName']);
		if ($existing && !($existing->id == $page->id)) {
			$this->message("Page already exists");
			$this->redirect($this->backUrl());
			return;
		}

		$page->PageName = $_POST['PageName'];
		$page->Content = $_POST['Content'];
		$page->IsHome = isset($_POST['IsHome']) ? $_POST['IsHome'] : 0;
		if (!$page->id) {
			$page->id = uniqid();
		}
		
		$this->dataStore()->add($page);
		$this->dataStore()->save();
		
		$this->redirect($this->url('page', 'index', array('id' => $page->id)));
	}
}

class Page {
	public $id = 0;
	public $PageName;
	public $IsHome = 0;
	public $Content;
}