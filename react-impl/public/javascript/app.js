(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("javascript/components/App.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.App = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Menu = require('./Menu.js');

var _Login = require('./Login.js');

var _Page = require('./Page.js');

var _store = require('../store');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = exports.App = (0, _store.store)(_class = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.state = {
            pageView: props.defaultView ? props.defaultView : "content",
            currentPage: "",
            checkedBox: false
        };

        _this.props.store.setData('viewMode', 'view');
        return _this;
    }

    _createClass(App, [{
        key: 'render',
        value: function render() {
            var store = this.props.store;
            var checkedBox = this.state.checkedBox;


            return _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                    'div',
                    { className: 'col col-md-3' },
                    _react2.default.createElement(_Menu.Menu, { items: '{store.dataset().pages}' })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'col col-md-9' },
                    _react2.default.createElement(_Page.Page, { currentPage: store.dataset().currentPage }),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement(_Login.Login, null)
                )
            );
        }
    }, {
        key: 'onCheck',
        value: function onCheck(e) {
            this.setState({
                checkedBox: !this.state.checkedBox
            });
        }
    }, {
        key: 'onAddFavourite',
        value: function onAddFavourite() {
            var store = this.props.store;
            var favouriteSelect = this.state.favouriteSelect;

            store.addFavourite(favouriteSelect);
        }
    }]);

    return App;
}(_react2.default.Component)) || _class;

});

require.register("javascript/components/Login.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Login = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _store = require('../store');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = exports.Login = (0, _store.store)(_class = function (_React$Component) {
    _inherits(Login, _React$Component);

    function Login(props) {
        _classCallCheck(this, Login);

        var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

        _this.state = {
            username: '',
            password: ''
        };
        return _this;
    }

    _createClass(Login, [{
        key: 'updateName',
        value: function updateName(ev) {
            this.setState({ username: ev.target.value });
        }
    }, {
        key: 'updatePass',
        value: function updatePass(ev) {
            this.setState({ password: ev.target.value });
        }
    }, {
        key: 'render',
        value: function render() {
            var store = this.props.store;

            var user = store.getUser();

            if (user.username) {
                return _react2.default.createElement(
                    'a',
                    { href: '#', onClick: this.logout.bind(this) },
                    'Logout ',
                    user.username
                );
            }

            return _react2.default.createElement(
                'form',
                null,
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement('input', { type: 'text', placeholder: 'Username', value: this.state.username, onChange: this.updateName.bind(this) })
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement('input', { type: 'password', placeholder: 'Password', value: this.state.password, onChange: this.updatePass.bind(this) })
                ),
                _react2.default.createElement('input', { type: 'submit', value: 'Login', onClick: this.login.bind(this) })
            );
        }
    }, {
        key: 'login',
        value: function login(ev) {
            ev.preventDefault();
            if (this.state.username == this.state.password) {
                this.props.store.setUser({ username: this.state.username });

                this.setState({
                    username: "",
                    password: ""
                });
            }
        }
    }, {
        key: 'logout',
        value: function logout() {
            this.props.store.setUser({ username: "" });
        }
    }]);

    return Login;
}(_react2.default.Component)) || _class;

});

require.register("javascript/components/Menu.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Menu = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _store = require('../store');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Menu = exports.Menu = (0, _store.store)(_class = function (_React$Component) {
    _inherits(Menu, _React$Component);

    function Menu(props) {
        _classCallCheck(this, Menu);

        return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));
    }

    _createClass(Menu, [{
        key: 'render',
        value: function render() {

            var store = this.props.store;
            var pages = store.getPages();

            var menu = [_react2.default.createElement(
                'div',
                { key: 'menuHeader' },
                'Menu'
            )];

            for (var i in pages) {
                menu.push(_react2.default.createElement(
                    'div',
                    { key: "page-" + i },
                    _react2.default.createElement(
                        'a',
                        { href: '#', onClick: this.selectPage.bind(this, i) },
                        pages[i].title
                    )
                ));
            }

            if (store.getUser() && store.getUser().username) {
                menu.push(_react2.default.createElement(
                    'a',
                    { key: 'newpagelink', href: '#', onClick: this.addNew.bind(this) },
                    'Add page'
                ));
            }

            return _react2.default.createElement(
                'div',
                null,
                menu
            );
        }
    }, {
        key: 'selectPage',
        value: function selectPage(index, ev) {
            var pages = this.props.store.getPages();
            var selectedPage = pages[index];
            if (selectedPage && selectedPage.title) {
                this.props.store.setData('currentPage', selectedPage);
                this.props.store.notify();
            }

            ev.preventDefault();
        }
    }, {
        key: 'addNew',
        value: function addNew(ev) {
            ev.preventDefault();
            this.props.store.setData('viewMode', 'edit');
            this.props.store.setData('currentPage', {
                title: "New page",
                content: ""
            });
            this.props.store.notify();
        }
    }]);

    return Menu;
}(_react2.default.Component)) || _class;

});

require.register("javascript/components/Page.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Page = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _store = require('../store');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Page = exports.Page = (0, _store.store)(_class = function (_React$Component) {
    _inherits(Page, _React$Component);

    function Page(props) {
        _classCallCheck(this, Page);

        var _this = _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this, props));

        if (_this.props.currentPage) {
            _this.state = {
                title: _this.props.currentPage.title,
                content: _this.props.currentPage.content
            };
        }
        return _this;
    }

    _createClass(Page, [{
        key: 'render',
        value: function render() {
            var viewMode = this.props.store.getData('viewMode');
            var page = this.props.currentPage;

            var output = void 0;

            if (viewMode == 'edit') {
                output = _react2.default.createElement(
                    'form',
                    null,
                    _react2.default.createElement('input', { type: 'text', value: this.state.title, placeholder: 'Page title', name: 'title', onChange: this.handleChange.bind(this) }),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement('textarea', { value: this.state.content, placeholder: 'Page content', name: 'content', onChange: this.handleChange.bind(this) }),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement(
                        'button',
                        { onClick: this.savePage.bind(this) },
                        'Save'
                    )
                );
            } else {
                output = _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'h1',
                        null,
                        page.title
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'content' },
                        page.content
                    )
                );
            }

            return output;
        }
    }, {
        key: 'handleChange',
        value: function handleChange(ev) {
            var newState = {};
            newState[ev.target.name] = ev.target.value;
            this.setState(newState);
        }
    }, {
        key: 'savePage',
        value: function savePage(ev) {
            ev.preventDefault();
            var newPage = {
                title: this.state.title,
                content: this.state.content
            };

            this.props.store.setData('currentPage', newPage);
            this.props.store.setData('viewMode', 'view');

            this.props.store.dataset().pages.push(newPage);

            this.props.store.notify();
        }
    }]);

    return Page;
}(_react2.default.Component)) || _class;

});

require.register("javascript/index.js", function(exports, require, module) {
'use strict';

var _App = require('./components/App');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _reactDom.render)(_react2.default.createElement(_App.App, null), document.getElementById('root')); // Project

});

;require.register("javascript/store.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.store = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Using this for guidance:
// https://www.npmjs.com/package/react-global-state
// https://github.com/TimBroddin/react-global-state/blob/master/index.js

var Store = function () {
	function Store() {
		_classCallCheck(this, Store);

		var store = {
			data: {
				pages: [{ title: "Home", content: "Basic page" }, { title: "Other page", content: "More page content" }],
				user: {},
				currentPage: {
					title: "",
					content: ""
				}
			}
		};

		// Disallow editing of 'data' element
		// as the structure should not be changed directly
		Object.freeze(store);

		this.store = store;
		this.subscriptions = [];
	}

	_createClass(Store, [{
		key: "dataset",
		value: function dataset() {
			return this.store.data;
		}
	}, {
		key: "setData",
		value: function setData(key, value) {
			this.store.data[key] = value;
		}
	}, {
		key: "getData",
		value: function getData(key) {
			return this.store.data[key];
		}
	}, {
		key: "getPages",
		value: function getPages() {
			return this.store.data.pages;
		}
	}, {
		key: "getUser",
		value: function getUser() {
			return this.store.data.user;
		}
	}, {
		key: "setUser",
		value: function setUser(user) {
			this.store.data.user = user;
			this._update();
		}

		//
		// Add component to list to re-render when _update() is called
		//

	}, {
		key: "_subscribe",
		value: function _subscribe(callback) {
			this.subscriptions.push(callback);
			return this.subscriptions.lastIndexOf(callback);
		}

		//
		// Remove component from list to re-render when _update() is called
		//

	}, {
		key: "_unsubscribe",
		value: function _unsubscribe(callback) {
			delete this.subscriptions[callback];
		}

		//
		// Re-render all components using @store
		//

	}, {
		key: "_update",
		value: function _update() {
			var subscriptions = this.subscriptions;
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = subscriptions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var callback = _step.value;

					if (!callback) {
						continue;
					}
					callback();
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}
	}, {
		key: "notify",
		value: function notify() {
			this._update();
		}
	}]);

	return Store;
}();

var globalStore = new Store();

var store = function store(ComponentToWrap) {
	return function (_React$Component) {
		_inherits(StoreSubscriber, _React$Component);

		function StoreSubscriber() {
			_classCallCheck(this, StoreSubscriber);

			return _possibleConstructorReturn(this, (StoreSubscriber.__proto__ || Object.getPrototypeOf(StoreSubscriber)).apply(this, arguments));
		}

		_createClass(StoreSubscriber, [{
			key: "componentDidMount",
			value: function componentDidMount() {
				this._subscriptionHandle = globalStore._subscribe(this.handleChange.bind(this));
			}
		}, {
			key: "componentWillUnmount",
			value: function componentWillUnmount() {
				globalStore._unsubscribe(this._subscriptionHandle);
			}
		}, {
			key: "handleChange",
			value: function handleChange() {
				this.setState({
					store: globalStore
				});
			}
		}, {
			key: "render",
			value: function render() {
				return _react2.default.createElement(ComponentToWrap, _extends({}, this.props, { store: globalStore }));
			}
		}]);

		return StoreSubscriber;
	}(_react2.default.Component);
};
exports.store = store;

});

require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window["$"] = require("jquery");
window.jQuery = require("jquery");


});})();require('___globals___');

require('javascript/index.js');
//# sourceMappingURL=app.js.map