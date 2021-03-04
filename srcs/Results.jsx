'use strict';

var g_query = "";

class Results extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	update(){
		this.forceUpdate();
	}
	render() {
		var ckts = Object.entries(cocklib);
		var tg = Object.entries(taglib);
		var activeTags = tg.filter(t=>t[1].checked == 1);
		var bannedTags = tg.filter(t=>t[1].checked == 2);
		ckts = ckts.filter(ckt => {
			var query;
			try {
				query = g_query ? new RegExp(".*" + g_query + ".*", "i").test(ckt[0]) : true;
			}
			catch (o){
				query = true;
			}
			// pour chaque tag de chaque cocktail on cherche 
			var allActives = activeTags.every(act=>{
				return !!ckt[1].tags.find(cktag=>{
					return act[0] == cktag[0];
				});
			});
			var noBannedTags = !bannedTags.find(act=>{
				return !!ckt[1].tags.find(cktag=>{
					return act[0] == cktag[0];
				});
			});
			if (activeTags.length == 0)
				allActives = true;
			return query && allActives && noBannedTags;
		});
		ckts = ckts.sort((a, b) => a[0] < b[0]);
		var outctks = ckts.map(o => {
			var otags = o[1].tags.map(tag=>{
				console.log(tag);
				var color = taglib[tag[0]].color;
				if (color){
					color = {
						color: color,
						borderColor: color
					}
				}
				else color = {};
				return <div key={o[o]+"_"+tag[0]} className="tag" style={color} >{tag[0]}</div>
			});
			var glass = o[1].tags.find(e=>{
				console.log(e[0]);
				console.log(taglib[e[0]]);
				return taglib[e[0]].type == 3;
			});
			glass = taglib[glass[0]].icon;
			return	<div key={o[0]} className="ckt" onClick={()=>{ViewElem.displayCocktail(o[0])}} >
						<h2>{o[0]}</h2>
						<hr />
						<div className="ckt_info" >
							<img src={glass} ></img>
							<div className="ckt_tags" >
								{otags}
							</div>
							<div className="ckt_des">{o[1].description}</div>
						</div>
					</div>
		});
		return <div>
			{outctks}
		</div>;
	}
}

const domContainer = document.querySelector('#cocktails');
var ResultsElem = ReactDOM.render(<Results />, domContainer);