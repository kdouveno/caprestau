'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Filters = function (_React$Component) {
	_inherits(Filters, _React$Component);

	function Filters(props) {
		var _this$state;

		_classCallCheck(this, Filters);

		var _this = _possibleConstructorReturn(this, (Filters.__proto__ || Object.getPrototypeOf(Filters)).call(this, props));

		_this.state = (_this$state = {}, _defineProperty(_this$state, 0, true), _defineProperty(_this$state, 1, true), _defineProperty(_this$state, 2, true), _defineProperty(_this$state, 3, true), _this$state);
		_this.handleTagClick = _this.handleTagClick.bind(_this);
		return _this;
	}

	_createClass(Filters, [{
		key: "handleClick",
		value: function handleClick(event, check) {
			this.setState(_defineProperty({}, check, event.target.checked));
			this.render();
		}
	}, {
		key: "handeChange",
		value: function handeChange(event) {
			g_query = event.target.value;
			this.setState({ query: event.target.value });
		}
	}, {
		key: "handleSearch",
		value: function handleSearch(event) {
			ResultsElem.forceUpdate();
		}
	}, {
		key: "handleTagClick",
		value: function handleTagClick(key) {
			taglib[key].checked++;
			if (taglib[key].checked > 2) taglib[key].checked = 0;
			this.forceUpdate();
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			var f = Object.entries(taglib);
			f = f.filter(function (o) {
				var query;
				try {
					query = _this2.state.query ? new RegExp(".*" + _this2.state.query + ".*", "i").test(o[0]) : true;
				} catch (o) {
					query = true;
				}
				return _this2.state[o[1].type] && query;
			});
			console.log(f);

			f = f.sort(function (a, b) {
				if (a[1].type != b[1].type) return a[1].type < b[1].type;
				return a[0] < b[0];
			});
			console.log(f);

			var outtags = [[React.createElement(
				"h3",
				null,
				"Ingr\xE9dients"
			)], [React.createElement(
				"h3",
				null,
				"D\xE9corations"
			)], [React.createElement(
				"h3",
				null,
				"Materiel"
			)], [React.createElement(
				"h3",
				null,
				"Verres"
			)]];
			console.log(f);
			f.forEach(function (o, i) {
				var color = o[1].color;
				if (color) {
					color = {
						color: color,
						borderColor: color
					};
				} else color = {};
				outtags[o[1].type].push(React.createElement(
					"div",
					{ key: o[0], onClick: function onClick() {
							return _this2.handleTagClick(o[0]);
						}, style: color, className: "tag type" + o[1].type + " c" + o[1].checked },
					o[0]
				));
			});
			outtags = outtags.filter(function (o) {
				return o.length > 1;
			});

			return React.createElement(
				"div",
				null,
				React.createElement(
					"div",
					null,
					React.createElement("input", { onChange: function onChange(e) {
							return _this2.handeChange(e);
						}, onKeyPress: function onKeyPress(e) {
							if (e.key === "Enter") _this2.handleSearch();
						}, type: "search", placeholder: "Rechercher" })
				),
				React.createElement(
					"button",
					{ onClick: function onClick() {
							_this2.handleSearch();
						} },
					"Rechercher"
				),
				React.createElement(
					"div",
					{ id: "types", className: "hideScrollbar" },
					React.createElement(
						"span",
						null,
						React.createElement("input", { onChange: function onChange(e) {
								return _this2.handleClick(e, "0");
							}, type: "checkbox", defaultChecked: true }),
						"Ingredients"
					),
					React.createElement(
						"span",
						null,
						React.createElement("input", { onChange: function onChange(e) {
								return _this2.handleClick(e, "1");
							}, type: "checkbox", defaultChecked: true }),
						"Verres"
					),
					React.createElement(
						"span",
						null,
						React.createElement("input", { onChange: function onChange(e) {
								return _this2.handleClick(e, "2");
							}, type: "checkbox", defaultChecked: true }),
						"Materiel"
					),
					React.createElement(
						"span",
						null,
						React.createElement("input", { onChange: function onChange(e) {
								return _this2.handleClick(e, "3");
							}, type: "checkbox", defaultChecked: true }),
						"Decoration"
					)
				),
				React.createElement("hr", { className: "hr" }),
				React.createElement(
					"div",
					{ id: "tags" },
					outtags
				)
			);
		}
	}]);

	return Filters;
}(React.Component);

var domContainer = document.querySelector('#filter');
var FiltersElem = ReactDOM.render(React.createElement(Filters, null), domContainer);