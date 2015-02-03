

$(document).ready(function(){
  $('form').submit(function(event){
    event.preventDefault();
    var zipCode = $("#zipSearchBox").val();
    var url = "https://congress.api.sunlightfoundation.com/legislators/locate?zip="+ zipCode +"&apikey=3c471d6192564914bfe7c7c5f5fa9242"
    $("#legisNames").empty();
    $('#legisInfoBox').empty();
    $('#legisInfoBox').removeClass( "well" );
    $.ajax(url, {dataType: 'json'}).done(function(data){
      for(var i = 0; i < data["results"].length; i++){
        $('#legisNames').append("<p data-bioid ="+'"'+ data["results"][i].bioguide_id +'"'+">"+ data["results"][i].first_name + " " + data["results"][i].last_name + "</p>")
      }
    })
  })
  $('#legisNames').on('click', 'p', function(){
    var legisBioId = $(this).data("bioid")
    var legisInfoUrl = "https://congress.api.sunlightfoundation.com/legislators?bioguide_id="+legisBioId+"&apikey=3c471d6192564914bfe7c7c5f5fa9242"
    $.ajax(legisInfoUrl, {dataType: 'json'}).done(function(data){
      $('#legisInfoBox').empty()
      $('#legisInfoBox').removeClass( "well" ).addClass( "well" );
      $('#legisInfoBox').append('<h4 id=' + "'heading'>" + data["results"][0].first_name +" "+ data["results"][0].last_name +'</h4>')
      if(data["results"][0].chamber == "house"){
        if(data["results"][0].gender == "M"){
        $('#heading').prepend('Congressman ')
        }
        else{
        $('#heading').prepend('Congresswoman ')
        }
      }
      else{
        $('#heading').prepend('Senator ')
      }
      //  crpId = data["results"][0].crp_id
      $('#legisInfoBox').append('<p>' + data["results"][0].phone + '</p>')
      $('#legisInfoBox').append('<p>Twitter: @' + data["results"][0].twitter_id + '</p>')
      $('#heading').append(' (' + data["results"][0].party + ')')
      $('#legisInfoBox').append('<p><img src="assets/' + legisBioId + '.jpg"></p>')
    })
  })

  $(function() {var openUrl = 'http://www.opensecrets.org/api/?method=candContrib&cid=' + crpID + '&cycle=2012&apikey=ac798a3dca773c3f5c3b054f448b5d5b'

    $.ajax(openUrl, {dataType: 'xml'}).done(function(data){

      // Make monochrome colors and set them as default for all pies
      Highcharts.getOptions().plotOptions.pie.colors = (function () {
        var colors = [],
        base = Highcharts.getOptions().colors[0],
        i;

        for (i = 0; i < 10; i += 1) {
          // Start out with a darkened base color (negative brighten), and end
          // up with a much brighter color
          colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
        }
        return colors;
      });

      // Build the chart
      $('#piechart').attr('id', 'legisInfoBox').highcharts({
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false
        },
        title: {
          text: 'Browser market shares at a specific website, 2014'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              style: {
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
              }
            }
          }
        },
        series: [{
          type: 'pie',
          name: 'Browser share',
          data: [
          ['Firefox',   45.0],
          ['IE',       26.8],
        {
          name: 'Chrome',
          y: 12.8,
          sliced: true,
          selected: true
        },
        ['Safari',    8.5],
        ['Opera',     6.2],
        ['Others',   0.7]
        ]
      }]
    });
  });
 })

});
