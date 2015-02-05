
$(document).ready(function() {
	$('form').submit(fetchLegislators);
	$('#legisNames').on('click', 'p', legislatorWasClicked);
})

function passId(crpId) {
	var openUrl = 'https://www.opensecrets.org/api/?method=candContrib&cid=' +
	crpId + '&cycle=2012&apikey=dfc23d11b88b4782522cc2cd23c443b6&output=json'
	$.ajax('/api_call', {
		data: {
			api_url: openUrl
		},
		dataType: 'json',
	}).done(function(data) {
		var orgArr = [];
		var totalArr = [];
		for (var i = 0; i < 10; i++) {
			orgArr.push(data["response"]["contributors"]["contributor"][i][
			"@attributes"
			].org_name)
			totalArr.push(parseInt(data["response"]["contributors"][
			"contributor"
			][i][
			"@attributes"
			].total))
		}
		graphIt(orgArr, totalArr)
	})
}

function graphIt(orgArr, totalArr) {
	options = {
		//Boolean - Show a backdrop to the scale label
		scaleShowLabelBackdrop: true,
		//String - The colour of the label backdrop
		scaleBackdropColor: "rgba(255,255,255,0.75)",
		// Boolean - Whether the scale should begin at zero
		scaleBeginAtZero: true,
		//Number - The backdrop padding above & below the label in pixels
		scaleBackdropPaddingY: 2,
		//Number - The backdrop padding to the side of the label in pixels
		scaleBackdropPaddingX: 2,
		//Boolean - Show line for each value in the scale
		scaleShowLine: true,
		//Boolean - Stroke a line around each segment in the chart
		segmentShowStroke: true,
		//String - The colour of the stroke on each segement.
		segmentStrokeColor: "#fff",
		//Number - The width of the stroke value in pixels
		segmentStrokeWidth: 2,
		//Number - Amount of animation steps
		animationSteps: 100,
		//String - Animation easing effect.
		animationEasing: "easeOutBounce",
		//Boolean - Whether to animate the rotation of the chart
		animateRotate: true,
		//Boolean - Whether to animate scaling the chart from the centre
		animateScale: false,
		//String - A legend template
		legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"

	};
	data = [{
		value: totalArr[0],
		color: "#F7464A",
		highlight: "#FF5A5E",
		label: orgArr[0]
	}, {
		value: totalArr[1],
		color: "#46BFBD",
		highlight: "#5AD3D1",
		label: orgArr[1]
	}, {
		value: totalArr[2],
		color: "#FDB45C",
		highlight: "#FFC870",
		label: orgArr[2]
	}, {
		value: totalArr[3],
		color: "#FFA3FF",
		highlight: "#FFB5FF",
		label: orgArr[3]
	}, {
		value: totalArr[4],
		color: "#A3D1FF",
		highlight: "#BFDFFF",
		label: orgArr[4]
	}, {
		value: totalArr[5],
		color: "#A3FFA3",
		highlight: "#ADFFAD",
		label: orgArr[5]
	}, {
		value: totalArr[6],
		color: "#FF85AD",
		highlight: "#FFA3C2",
		label: orgArr[6]
	}, {
		value: totalArr[7],
		color: "#FFCC66",
		highlight: "#FFD175",
		label: orgArr[7]
	}, {
		value: totalArr[8],
		color: "#47A3FF",
		highlight: "#70B8FF",
		label: orgArr[8]
	}, {
		value: totalArr[9],
		color: "#FF1975",
		highlight: "#FF3385",
		label: orgArr[9]
	}];
	$('#rightPanelChart').append('<canvas id="chart" width="300" height="300"></canvas>')
	ctx = $("#chart").get(0).getContext("2d");
	myNewChart = new Chart(ctx).Pie(data, options);
};

function fetchLegislators(event){
	event.preventDefault();
	var zipCode = $("#zipSearchBox").val();
	var url =
	"https://congress.api.sunlightfoundation.com/legislators/locate?zip=" +
	zipCode + "&apikey=3c471d6192564914bfe7c7c5f5fa9242"
	$("#legisNames").empty();
	$("#billInfoBox").empty();
	$('#legisInfoBox').empty();
	$('#legisInfoBox').removeClass("well");
	$('#billInfoBox').removeClass('well');
	$.ajax(url, {
		dataType: 'json'
	}).done(function(data) {
		$('#legisNames').append('<div id = "Congress"></div>')
		$('#legisNames').append('<div id = "Senate"></div>')
		$('#Congress').append('<h4>Congress</h4>');
		$('#Senate').append('<h4>Senate</h4>');
		for (var i = 0; i < data["results"].length; i++) {
			if (data["results"][i].chamber == "house") {
				$('#Congress').append("<p data-bioid =" + '"' + data["results"][i].bioguide_id +
				'"' + ">" + data["results"][i].first_name + " " + data["results"][i]
				.last_name + "</p>")
			}
			else{
				$('#Senate').append("<p data-bioid =" + '"' + data["results"][i].bioguide_id +
				'"' + ">" + data["results"][i].first_name + " " + data["results"][i]
				.last_name + "</p>")
			}
		}
	});
}

function legislatorWasClicked(event){
	var legisBioId = $(this).data("bioid")
	var legisInfoUrl =
	"https://congress.api.sunlightfoundation.com/legislators?bioguide_id=" +
	legisBioId + "&apikey=3c471d6192564914bfe7c7c5f5fa9242"
	$.getJSON('/json_build', {
		bio_id: legisBioId
	}).done(function(data) {
		$('#legisInfoBox').empty()
		$('#billInfoBox').empty()
		data.bio_id = legisBioId
		addWells(data)
	})
}

	function addWells(data) {
		//LegisInfoBox creation
		$('#legisInfoBox').removeClass("well").addClass("well");
		$('#legisInfoBox').append("<div id= leftPanelInfo class='col-md-6'></div>")
		$('#legisInfoBox').append("<div id= rightPanelChart class='col-md-6'></div>")
		console.log(data)
		$('#leftPanelInfo').append('<h4 id= heading>' + data[0].first_name + ' ' + data[0].last_name + '</h4>')
		if (data[0].chamber == "house") {
			if (data[0].gender == "M") {
				$('#heading').prepend('Congressman ')
			} else {
				$('#heading').prepend('Congresswoman ')
			}
		} else {
			$('#heading').prepend('Senator ')
		}
		crpId = data[0].crp_id
		$('#leftPanelInfo').append('<p>Phone Number: ' + data[0].phone_number + '</p>')
		$('#leftPanelInfo').append('<p>Twitter: <a href="http://www.twitter.com/' + data[0].twitter + '">@' + data[0].twitter + '</a></p>')
		$('#heading').append(' (' + data[0].party + ')')
		$('#leftPanelInfo').append('<p><img src="assets/' + data[0].bio_id +
		'.jpg"></p>')
		$('#rightPanelChart').append('<h4 id= chartHeader>2012-2014 Campaign Donations (Amounts in USD)</h4>')

		//billInfoBox Creation
		$('#billInfoBox').removeClass("well").addClass("well");
		$('#billInfoBox').append('<h4>Sponsored Bills</h4>')
		var bioGuideId= data[0].bio_id
		var	billInfoUrl = "https://congress.api.sunlightfoundation.com/bills/search?sponsor_id="+bioGuideId+"&apikey=3c471d6192564914bfe7c7c5f5fa9242"
		$.ajax(billInfoUrl, {
			dataType: 'json'
		}).done(function(data) {
			for(var i=0; i < 20; i++){
			if(data["results"][i].short_title == null){
				$('#billInfoBox').append('<p>'+ data["results"][i].official_title + '</p>')
				$('#billInfoBox').append('<p><a href="'+ data["results"][i]["last_version"]['urls'].pdf + '">View PDF</a></p>')
			}
			else{
				$('#billInfoBox').append('<p>'+ data["results"][i].short_title + '</p>')
				$('#billInfoBox').append('<p><a href="'+ data["results"][i]["last_version"]['urls'].pdf + '">View PDF</a></p>')
			}
			console.log(data["results"][0])
			}
		});
		passId(crpId)
	}
