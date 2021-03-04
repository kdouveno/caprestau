'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var View = function (_React$Component) {
	_inherits(View, _React$Component);

	function View(props) {
		_classCallCheck(this, View);

		var _this = _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).call(this, props));

		_this.state = {
			name: "Affinity",
			display: false
		};
		return _this;
	}

	_createClass(View, [{
		key: "displayCocktail",
		value: function displayCocktail(name) {
			console.log(name);
			this.setState({ name: name, display: true });
		}
	}, {
		key: "hide",
		value: function hide() {
			$("#view").removeClass("show");
		}
	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate() {
			console.log("show bitch");
			if (this.state.display) $("#view").addClass("show");
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			console.log("render");
			var ckt = cocklib[this.state.name];
			var cktag = ckt.tags.map(function (o) {
				return [o[0], taglib[o[0]], o[1]];
			});
			var cktingr = cktag.filter(function (o) {
				return o[1].type == 0;
			});
			var graph = [];
			cktingr = cktingr.map(function (o) {
				var qty = o[2].trim().split(" ");
				var unit = qty.pop();
				if (unit === "ml") graph.push(React.createElement("div", { key: "graph_" + o[0], className: "graphPiece", style: { backgroundColor: o[1].color, flex: qty[0] } }));else if (/^trait/i.test(unit)) graph.push(React.createElement("div", { key: "graph_" + o[0], className: "graphPiece", style: { backgroundColor: o[1].color, height: qty[0] + "px" } }));

				return React.createElement(
					"tr",
					{ key: "tab_" + o[0] },
					React.createElement(
						"td",
						null,
						React.createElement(
							"span",
							{ style: { color: o[1].color } },
							"-"
						)
					),
					React.createElement(
						"td",
						null,
						o[0]
					),
					React.createElement(
						"td",
						null,
						o[2]
					)
				);
			});

			var cktdeco = cktag.filter(function (o) {
				return o[1].type == 1;
			});
			cktdeco = cktdeco.map(function (o) {
				return React.createElement(
					"tr",
					{ key: "tab_" + o[0] },
					React.createElement("td", null),
					React.createElement(
						"td",
						null,
						o[0]
					),
					React.createElement(
						"td",
						null,
						o[2]
					)
				);
			});

			var cktmatos = cktag.filter(function (o) {
				return o[1].type == 2;
			});
			cktmatos = cktmatos.map(function (o) {
				return React.createElement(
					"li",
					{ key: "mat" + o[0] },
					o[0]
				);
			});

			var glass = cktag.find(function (o) {
				return o[1].type == 3;
			});
			glass = taglib[glass[0]].icon;

			var steps = ckt.steps.map(function (o, i) {
				return React.createElement(
					"li",
					{ key: "step_" + i },
					o
				);
			});
			return React.createElement(
				"div",
				null,
				React.createElement(
					"h1",
					{ className: "cross", onClick: function onClick() {
							_this2.hide();
						} },
					"X"
				),
				React.createElement(
					"h1",
					null,
					this.state.name.toUpperCase()
				),
				React.createElement(
					"div",
					{ id: "flex_container" },
					React.createElement(
						"div",
						{ id: "description" },
						React.createElement(
							"h2",
							null,
							"Origine"
						),
						React.createElement(
							"p",
							null,
							ckt.description
						)
					),
					React.createElement(
						"div",
						{ id: "composition" },
						React.createElement(
							"h2",
							null,
							"Ingr\xE9dients et Decoration"
						),
						React.createElement(
							"div",
							{ id: "ingredients" },
							React.createElement(
								"div",
								{ id: "graph" },
								React.createElement("div", { className: "graphPiece" }),
								graph
							),
							React.createElement(
								"table",
								{ id: "list" },
								React.createElement(
									"tbody",
									null,
									cktingr
								),
								React.createElement(
									"tbody",
									null,
									cktdeco
								)
							)
						)
					),
					React.createElement(
						"div",
						{ id: "materiel" },
						React.createElement(
							"h2",
							null,
							"Materiel"
						),
						React.createElement(
							"div",
							null,
							React.createElement("img", { src: glass }),
							React.createElement(
								"ul",
								null,
								cktmatos
							)
						)
					),
					React.createElement(
						"div",
						{ id: "steps" },
						React.createElement(
							"h2",
							null,
							"Pr\xE9paration"
						),
						React.createElement(
							"ul",
							null,
							steps
						)
					)
				)
			);
		}
	}]);

	return View;
}(React.Component);

var domContainer = document.querySelector('#view');
var ViewElem = ReactDOM.render(React.createElement(View, null), domContainer);