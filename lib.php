<?php

class View {
	
	protected $vars;
	protected $helpers;
	protected $template;
	protected $controller;
	
	public function __construct($vars, $template, $controller) {
		$this->vars = $vars;
		$this->controller = $controller;
		
		$this->helpers = array(
			'e' => function ($val) {
				return htmlspecialchars($val);
			},
			'base' => function () {
				$domain = isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : '';
				return '//'.$domain . BASE_URL . '/';
			},
			'url' => function ($ctrl, $action, $params=array()) use ($controller) {
				return $controller->url($ctrl, $action, $params);
			},
			'message' => function () use ($controller) {
				return $controller->message();
			},
			'user'		=> function () use ($controller) {
				return $controller->user;
			}
		);

		$this->template = $template;
	}

	public function render() {
		if (file_exists($this->template)) {
			ob_start();
			include $this->template;
			$rendered = ob_get_clean();
			return $rendered;
		}
		return "No template found for $this->template";
	}

	public function __get($var) {
		if (isset($this->vars[$var])) {
			return $this->vars[$var];
		}
	}

	public function __call($method, $args) {
		if (isset($this->helpers[$method])) {
			$val = call_user_func_array($this->helpers[$method], $args);
			return $val;
		}

		throw new Exception("Invalid call $method");
	}
	
}

class Controller {
	protected $params;
	
	protected $data;
	
	public $user;
	
	public function __construct($params) {
		$this->params = $params;
		$this->init();
	}

	public function init() {
		if (isset($_SESSION['user'])) {
			$this->user = new User($_SESSION['user']);
		}
	}

	public function data() {
		if (!$this->data || !$this->data->id) {
			$id = isset($this->params['id']) ? $this->params['id'] : (isset($_REQUEST['id']) ? $_REQUEST['id'] : 0);
			if ($id) {
				$store = $this->dataStore();
				$this->data = $store->findOne('id', $id);
			}
		}
		
		if (!$this->data || !$this->data->id) {
			$this->data = $this->defaultData();
		}

		return $this->data;
	}

	public function name() {
		return str_replace('Controller', '', get_class($this));
	}
	
	protected function defaultData() {
		return new stdClass();
	}

	public function render($args = array(), $template = null, $wrapped = true) {
		$ctrl = strtolower($this->name());

		if (!$template) {
			$template = $this->params['action'];
		}

		$viewPath = ROOT . '/views/' . $ctrl . '/' . $template . '.php';

		$args = array_merge($this->params, $args);
		if (!isset($args['data'])) {
			$args['data'] = $this->data();
		}

		$view = new View($args, $viewPath, $this);
		$out = $view->render();
		
		if ($wrapped) {
			// see if there's a master template to use
			$master = ROOT . '/views/' . $this->name() . '.php';
			if (file_exists($master)) {
				$args['MasterContent'] = $out;
				$master = new View($args, $master, $this);
				$out = $master->render();
			}
		}
		
		return $out;
	}
	
	public function url($controller, $action, $params=array()) {
		$url = BASE_URL . '/' . $controller . '/' . $action;
		foreach ($params as $key => $value) {
			$url .= '/' . $key . '/' . $value;
		}
		
		return $url;
	}
	
	public function redirect($url) {
		if (!headers_sent()) {
			header('Location: '.$url);
		} else {
			throw new Exception("Invalid redirect");
		}
	}
	
	protected function backUrl() {
		$back = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '';
		return $back;
	}
	
	protected $newMsg = false;
	public function message($msg = null) {
		if (!$msg) {
			return isset($_SESSION[$this->name().'message']) ? $_SESSION[$this->name().'message'] : '';
		} else {
			$this->newMsg = true;
			$_SESSION[$this->name().'message'] = $msg;
		}
	}
	
	public function clearMessage() {
		if (!$this->newMsg) {
			unset($_SESSION[$this->name().'message']);
		}
	}
	
	/**
	 *
	 * @var DataStore
	 */
	protected $store;
	
	/**
	 *
	 * @return DataStore
	 */
	protected function dataStore() {
		if (!$this->store) {
			$this->store = new DataStore($this->name());
		}
		
		return $this->store;
	}

	public function __call($method, $args) {
		if (strpos($method, 'Action')) {
			// try rendering a view directly
			return $this->render(array(), substr($method, 0, strpos($method, 'Action')));
		}
		
		throw new Exception("Invalid call $method");
	}
}

class FrontController {
	
	public function __construct($ctrl = 'index', $action='index') {
		$this->controller = $ctrl;
		$this->action = $action;
	}
	
	public function route($url) {
		$bits = explode('/', $url);
		if (isset($bits[0]) && strlen($bits[0])) {
			$this->controller = $bits[0]; //str_replace('.', '', $bits[0]);
		}
		if (isset($bits[1]) && strlen($bits[1])) {
			$this->action = $bits[1];
		}

		$ctrlClass = ucfirst($this->controller) . 'Controller';
		$ctrlClassFile = realpath(ROOT.'/controllers/'.$ctrlClass .'.php');
		if (strpos($ctrlClassFile, ROOT) !== 0) {
			throw new Exception ("Invalid controller path");
		}

		if (file_exists($ctrlClassFile)) {
			require_once($ctrlClassFile);
		}

		if (class_exists($ctrlClass)) {
			$params = array('action' => $this->action);
			if (isset($bits[2])) {
				for ($i = 2, $c = count($bits); $i < $c; $i += 2) {
					$val = isset($bits[$i+1]) ? $bits[$i+1] : null;
					$params[$bits[$i]] = $val;
				}
			}
			
			$controller = new $ctrlClass($params);
			$action = $this->action . 'Action';
			$out = $controller->$action();
			$controller->clearMessage();
			return $out;
		}
		throw new Exception("Invalid request $this->controller :: $this->action");
	}
}

class User {
	public $email;
	
	public function __construct($email) {
		$this->email = $email;
	}
}




/**
 *
 * @author marcus@symbiote.com.au
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
	
	public function all() {
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
		
		unset($this->store[$item->__store_id]);
	}

	public function save() {
		$this->getStore();
		file_put_contents(dirname(__FILE__) . '/stores/'.$this->name, serialize($this->store));
	}
	
	/**
	 * @return ArrayObject 
	 */
	public function find($key, $value) {
		$store = $this->getStore();
		$results = new ArrayObject();
		
		foreach ($store as $uid => $object) {
			if (isset($object->$key) && $object->$key == $value) {
				$results->append($object);
			}
		}
		
		return $results;
	}
	
	public function findOne($key, $value) {
		$res = $this->find($key, $value);
		if ($res->count()) {
			return $res->offsetGet(0);
		}
	}
}
