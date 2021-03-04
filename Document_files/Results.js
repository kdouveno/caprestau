'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var g_query = "";

var Results = function (_React$Component) {
	_inherits(Results, _React$Component);

	function Results(props) {
		_classCallCheck(this, Results);

		var _this = _possibleConstructorReturn(this, (Results.__proto__ || Object.getPrototypeOf(Results)).call(this, props));

		_this.state = {};
		return _this;
	}

	_createClass(Results, [{
		key: "update",
		value: function update() {
			this.forceUpdate();
		}
	}, {
		key: "render",
		value: function render() {
			var ckts = Object.entries(cocklib);
			var tg = Object.entries(taglib);
			var activeTags = tg.filter(function (t) {
				return t[1].checked == 1;
			});
			var bannedTags = tg.filter(function (t) {
				return t[1].checked == 2;
			});
			ckts = ckts.filter(function (ckt) {
				var query;
				try {
					query = g_query ? new RegExp(".*" + g_query + ".*", "i").test(ckt[0]) : true;
				} catch (o) {
					query = true;
				}
				// pour chaque tag de chaque cocktail on cherche 
				var allActives = activeTags.every(function (act) {
					return !!ckt[1].tags.find(function (cktag) {
						return act[0] == cktag[0];
					});
				});
				var noBannedTags = !bannedTags.find(function (act) {
					return !!ckt[1].tags.find(function (cktag) {
						return act[0] == cktag[0];
					});
				});
				if (activeTags.length == 0) allActives = true;
				return query && allActives && noBannedTags;
			});
			ckts = ckts.sort(function (a, b) {
				return a[0] < b[0];
			});
			var outctks = ckts.map(function (o) {
				var otags = o[1].tags.map(function (tag) {
					return React.createElement(
						"div",
						{ key: o[o] + "_" + tag[0], className: "tag" },
						tag[0]
					);
				});
				var glass = o[1].tags.find(function (e) {
					console.log(e[0]);
					console.log(taglib[e[0]]);
					return taglib[e[0]].type == 3;
				});
				glass = taglib[glass[0]].icon;
				return React.createElement(
					"div",
					{ key: o[0], className: "ckt", onClick: function onClick() {
							ViewElem.displayCocktail(o[0]);
						} },
					React.createElement(
						"h2",
						null,
						o[0]
					),
					React.createElement("hr", null),
					React.createElement(
						"div",
						{ className: "ckt_info" },
						React.createElement("img", { src: glass }),
						React.createElement(
							"div",
							{ className: "ckt_tags" },
							otags
						),
						React.createElement(
							"div",
							{ className: "ckt_des" },
							o[1].description
						)
					)
				);
			});
			return React.createElement(
				"div",
				null,
				outctks
			);
		}
	}]);

	return Results;
}(React.Component);

var domContainer = document.querySelector('#cocktails');
var ResultsElem = ReactDOM.render(React.createElement(Results, null), domContainer);