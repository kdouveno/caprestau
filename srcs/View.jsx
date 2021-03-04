'use strict';


class View extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "Affinity",
			display: false
		}
	}

	displayCocktail(name) {
		this.setState({ name: name, display: true});
	}
	hide(){
		$("#view").removeClass("show");
	}
	componentDidUpdate() {
		if (this.state.display)
			$("#view").addClass("show");
	}
	render() {
		var ckt = cocklib[this.state.name];
		var cktag = ckt.tags.map((o) => {
			return [o[0], taglib[o[0]], o[1]];
		});
		var cktingr = cktag.filter(o => o[1].type == 0);
		var graph = [];
		cktingr = cktingr.map(o => {
			var qty = o[2].trim().split(" ");
			var unit = qty.pop();
			if (unit === "ml")
				graph.push(<div key={"graph_" + o[0]} className="graphPiece" style={{ backgroundColor: o[1].color, flex: qty[0] }} />);
			else if (/^trait/i.test(unit))
				graph.push(<div key={"graph_" + o[0]} className="graphPiece" style={{ backgroundColor: o[1].color, height: qty[0] + "px" }} />)

			return <tr key={"tab_"+o[0]}>
				<td><span style={{color: o[1].color}}>-</span></td>
				<td>{o[0]}</td>
				<td>{o[2]}</td>
			</tr>
		});

		var cktdeco = cktag.filter(o => o[1].type == 1);
		cktdeco = cktdeco.map(o => {
			return <tr key={"tab_"+o[0]} >
				<td></td>
				<td>{o[0]}</td>
				<td>{o[2]}</td>
			</tr>
		});

		var cktmatos = cktag.filter(o => o[1].type == 2);
		cktmatos = cktmatos.map(o => {
			return <li key={"mat"+o[0]}>{o[0]}</li>
		});

		var glass = cktag.find(o => o[1].type == 3);
		var glassIcon = taglib[glass[0]].icon;

		var steps = ckt.steps.map((o,i)=>{
			return <li key={"step_" + i} >{o}</li>
		})
		return <div>
			<h1 className="cross" onClick={()=>{this.hide()}}>X</h1><h1>{this.state.name.toUpperCase()}</h1>
			<div id="flex_container" >
				<div id="description" >
					<h2>Origine</h2>
					<p>{ckt.description}</p>
				</div>
				<div id="composition" >
					<h2>Ingrédients et Decoration</h2>
					<div id="ingredients" >
						<div id="graph" >
							<div className="graphPiece" ></div>
							{graph}
						</div>
						<table id="list" >
							<tbody>
								{cktingr}
							</tbody>
							<tbody>
								{cktdeco}
							</tbody>
						</table>

					</div>

				</div>
				<div id="materiel" >
					<h2>Materiel</h2>
					<div>
						<img src={glassIcon} />
						<ul>
							<li>verre: {glass[0]}</li>
							{cktmatos}
						</ul>
					</div>
				</div>
				<div id="steps" >
					<h2>Préparation</h2>
					<ul>
						{steps}
					</ul>
				</div>

			</div>

		</div>;
	}
}

const domContainer = document.querySelector('#view');
var ViewElem = ReactDOM.render(<View />, domContainer);