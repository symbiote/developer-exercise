<?php

/**
 *
 * @author marcus@silverstripe.com.au
 */
class DataStore {
	
	protected $name; 
	
	protected $store;
	
	public function __construct($name) {
		
		if (!preg_match('/[a-z]/', $name)) {
			throw new Exception("Invalid store name");
		}
		$this->name = $name;
		$this->getStore();
	}
	
	protected function getStore() {
		if ($this->store) {
			return $this->store;
		}
		if (!is_dir(dirname(__FILE__) . '/stores')) {
			mkdir(dirname(__FILE__) . '/stores');
		}
		
		$this->store = array();
		if (file_exists(dirname(__FILE__) . '/stores/'.$this->name)) {
			$this->store = unserialize(file_get_contents(dirname(__FILE__) . '/stores/'.$this->name));
		}
		
		return $this->store;
	}
	
	public function add($item) {
		if (!isset($item->__store_id)) {
			$item->__store_id = uniqid();
		}

		$this->store[$item->__store_id] = $item;
	}
	
	public function delete($item) {
		if (!isset($item->__store_id)) {
			return;
		}
		
		unset($this->store($item->__store_id));
	}
	
	public function save() {
		$this->getStore();
		file_put_contents(dirname(__FILE__) . '/stores/'.$this->name, serialize($this->store));
	}
}
