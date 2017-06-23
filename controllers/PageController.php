<?php

/**
 * @author marcus@symbiote.com.au
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
		if (!$this->user) {
			throw new Exception("No session found, please login");
		}
		$page = $this->data();
		if (!$page) {
			$page = new Page;
		}
		
		if (!strlen($_POST['PageName'])) {
			$this->message("Invalid name");
			$this->redirect($this->url('page', 'edit'));
			return;
		}
		
		if ($this->pageNameExists($_POST['PageName'], $page->id)) {
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
	
	public function pageNameExists($name, $existingId) {
		$existing = $this->dataStore()->findOne('PageName', $name);
		if ($existing && !($existing->id == $existingId)) {
			return true;
		}
		return false;
	}

	/**
	 * Checks whether a page exists already or not
	 * 
	 * @param type $name
	 * @param type $existingId
	 * @return type 
	 */
	public function checknameAction() {
		header('Content-type: application/json');
		$name = $_GET['name'];
		$id = $_GET['id'];
		return $this->pageNameExists($name, $id) ? '{"exists": true}' : '{"exists": false}';
	}
}

class Page {
	public $id = 0;
	public $PageName;
	public $IsHome = 0;
	public $Content;
}