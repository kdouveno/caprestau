taglib = {
		"bitters angostura":        {type: 0, color: "#bd2e1f"},
		"campari":                  {type: 0, color: "#ff3e30"},
		"cognac":                   {type: 0, color: "#c47929"},
		"crème de pêche":           {type: 0, color: "#ff9d00"},
		"eau pétillante":           {type: 0, color: "#468c79"},
		"rhum cubain blanc":        {type: 0, color: "#bdbdc7"},
		"scotch whiskey":           {type: 0, color: "#79441d"},
		"vodka":                    {type: 0, color: "#bdbdc7"},
		"tequila":                  {type: 0, color: "#bdbdc7"},
		"vermouth rouge":           {type: 0, color: "#ef1c1c"},
		"vermouth sec":             {type: 0, color: "#bdbdc7"},
		"triple sec":               {type: 0, color: "#ba873f"},
		"jus de cramberry":         {type: 0, color: "#ff0037"},
		"jus de citron jaune":      {type: 0, color: "#c6cc12"},
		"jus d'orange":             {type: 0, color: "#ff8000"},
		"menthe":                   {type: 0, color: "#29c440"},
		"blanc d'oeuf":             {type: 0, color: "#ffffff"},
		"sirop de sucre":           {type: 0, color: "#ebe7d3"},
		"liqueur de chambord":		{type: 0, color: "#fc031c"},
		
		"zeste de citron jaune" :   {type: 1},
		"tranche de citron jaune" : {type: 1},
		"tranche d'orange" :        {type: 1},
		"cerise confite":           {type: 1},
		"quartier d'orange":		{type: 1},
		
		"shaker" :                  {type: 2},
		"verre à mélange" :         {type: 2},
		"passoire" :                {type: 2},
		"pilon" :                   {type: 2},
		"couteau" :                 {type: 2},
		"presse-agrume" :           {type: 2},
		"blender" :                 {type: 2},
		"cuillère" :                {type: 2},
		"cuillère de bar" :         {type: 2},
		"glace":					{type: 2},
		"cubes de glace":			{type: 2},

		"coupette" :                {type: 3, icon: "./svgs/coupette_glass_s.svg"},
		"cocktail" :                {type: 3, icon: "./svgs/cocktail_glass_2_s.svg"},
		"old fashioned" :           {type: 3, icon: "./svgs/old_fashioned_glass_s.svg"},
		"highball" :				{type: 3, icon: "./svgs/highball_glass_s.svg"},
		"tulipe" :					{type: 3, icon: "./svgs/tulip_glass_s.svg"},		"hurricane" :               {type: 3, icon: "./svgs/old"},
}

Object.values(taglib).forEach(e => {
	e.checked = 0;
});