<?php

class View {
	
	protected $vars;
	protected $helpers;
	protected $template;
	
	public function __construct($vars, $template) {
		$this->vars = $vars;
		$this->helpers = array(
			'e' => function ($val) {
				return htmlspecialchars($val);
			},
			'base' => function () {
				$domain = isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : '';
				return '//'.$domain . BASE_URL;
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
	
	public function __construct($params) {
		$this->params = $params;
	}
	
	public function init() {
		
	}
	
	public function name() {
		return str_replace('Controller', '', get_class($this));
	}
	
	public function render($args, $template) {
		$ctrl = strtolower($this->name());

		$viewPath = ROOT . '/views/' . $ctrl . '/' . $template . '.php';
		
		$view = new View($args, $viewPath);
		$out = $view->render();
		
		// see if there's a master template to use
		$master = ROOT . '/views/' . $this->name() . '.php';
		if (file_exists($master)) {
			$master = new View(array(
				'content'	=> $out,
			), $master);
			$out = $master->render();
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
			$params = array();
			if (isset($bits[2])) {
				for ($i = 2, $c = count($bits); $i < $c; $i += 2) {
					$val = isset($bits[$i+1]) ? $bits[$i+1] : null;
					$params[$bits[$i]] = $val;
				}
			}

			$controller = new $ctrlClass($params);
			$action = $this->action . 'Action';
			return $controller->$action();
		}

		throw new Exception("Invalid request $this->controller :: $this->action");
	}
}

class User {
	public $email;
}

