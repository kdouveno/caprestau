'use strict';

class Filters extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			[0]: true,
			[1]: true,
			[2]: true,
			[3]: true,
		};
		this.handleTagClick = this.handleTagClick.bind(this);
	}

	handleClick(event, check) {
		this.setState({
			[check]: event.target.checked
		});
		this.render();
	}
	handeChange(event) {
		g_query = event.target.value;
		this.setState({ query: event.target.value });
	}
	handleSearch(event){
		ResultsElem.forceUpdate();
	}
	handleTagClick(key) {
		taglib[key].checked++
		if (taglib[key].checked > 2)
			taglib[key].checked = 0;
		this.forceUpdate();
	}
	render() {
		var f = Object.entries(taglib);
		f = f.filter(o => {
			var query;
			try {
				query = this.state.query ? new RegExp(".*" + this.state.query + ".*","i").test(o[0]) : true;
			}
			catch (o){
				query = true;
			}
			return this.state[o[1].type] && query;

		});

		f = f.sort((a, b) => {
			if (a[1].type != b[1].type)
				return a[1].type < b[1].type;
			return a[0] < b[0]
		});

		var outtags = [
			[<h3>Ingrédients</h3>],
			[<h3>Décorations</h3>],
			[<h3>Materiel</h3>],
			[<h3>Verres</h3>]
		];
		f.forEach((o, i) => {
			var color = o[1].color;
			if (color){
				color = {
					color: color,
					borderColor: color
				}
			}
			else color = {};
			outtags[o[1].type].push(<div key={o[0]} onClick={()=>this.handleTagClick(o[0])} style={color} className={"tag type" + o[1].type + " c" + o[1].checked} >{o[0]}</div>)
		});
		outtags = outtags.filter(o=>o.length > 1)

		return <div>
			<div>
				<input onChange={(e) => this.handeChange(e)} onKeyPress={(e)=>{if(e.key === "Enter") this.handleSearch()}} type="search" placeholder="Rechercher" />
			</div>
			<button onClick={()=>{this.handleSearch()}}>Rechercher</button>
			<div id="types" className="hideScrollbar">
					<span><input onChange={(e) => this.handleClick(e, "0")} type="checkbox" defaultChecked />Ingredients</span>
					<span><input onChange={(e) => this.handleClick(e, "1")} type="checkbox" defaultChecked />Verres</span>
					<span><input onChange={(e) => this.handleClick(e, "2")} type="checkbox" defaultChecked />Materiel</span>
					<span><input onChange={(e) => this.handleClick(e, "3")} type="checkbox" defaultChecked />Decoration</span>
				</div>
			<hr className="hr" />
			<div id="tags" >{outtags}</div>
		</div>;
	}
}

const domContainer = document.querySelector('#filter');
var FiltersElem = ReactDOM.render(<Filters />, domContainer);