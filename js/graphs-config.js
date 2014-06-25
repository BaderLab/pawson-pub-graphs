$(function(){

  var exps = [
    {
      url: 'js/graph-data/cy-exp-scopus.json',
      label: 'All papers until mid-2013 (1546 coauthors, 422 papers)'
    },
    {
      url: 'js/graph-data/cy-exp-5.json',
      label: 'Co-authors who have published at least 5 times with Tony'
    },
    {
      url: 'js/graph-data/cy-exp-10.json',
      label: 'Co-authors who have published at least 10 times with Tony'
    },
    {
      url: 'js/graph-data/cy-exp-15.json',
      label: 'Co-authors who have published at least 15 times with Tony'
    }
  ];

  var style = [
    {
      selector: ':active',
      css: {
        'overlay-color': '#fff'
      }
    },

    {
      selector: 'node',
      css: {
        'background-color': '#C2EAF2',
        'text-outline-color': '#C2EAF2',
        'text-outline-width': 5,
        'text-valign': 'center',
        'color': '#000',
        'content': 'data(Label)',
        'font-weight': 'bold',
        'font-size': '20px',
        'font-family': 'helvetica neue, helvetica, arial, sans-serif',
        'width': 50,
        'height': 50
      }
    },

    {
      selector: 'node#17353', // tony pawson
      css: {
        'width': 100,
        'height': 100,
        'background-color': '#E0F2C2',
        'text-outline-color': '#E0F2C2'
      }
    },

    {
      selector: 'edge',
      css: {
        'line-color': '#fff',
        'opacity': 0.333,
        'width': 'mapData(_of_copubs, 0, 50, 5, 30)'
      }
    },

    {
      selector: ':selected',
      css: {
        'background-color': '#fff',
        'text-outline-color': '#fff',
        'line-color': '#fff',
        'opacity': 1
      }
    },

    {
      selector: 'core',
      css: {
        'active-bg-color': '#fff',
        'active-bg-opacity': 0.5,
        'outside-texture-bg-color': '#fff',
        'outside-texture-bg-opacity': 0.333
      }
    }
  ];

  var largeStyle = style.concat([
    {
      selector: 'edge',
      css: {
        'curve-style': 'haystack'
      }
    }
  ]);

  var cys = [];
  for( var i = 0; i < exps.length; i++ ){ (function(){
    var exp = exps[i];

    var $div = $('<div class="cy loading"></div>');
    var $loader = $('<span class="fa fa-refresh fa-spin"></span>');
    var $label = $('<div class="label">' + exp.label + '</div>');

    $div.append( $loader );
    $div.append( $label );

    $('body').append( $div ); 

    $.get( exp.url, function( json ){
      exp.json = json;

      var elesJson = exp.json.elements;
      var largeGraph = elesJson.edges.length > 1000;

      var cy = cys[i] = cytoscape({
        container: $div[0],
        elements: elesJson,
        style: largeGraph ? largeStyle : style,
        layout: {
          name: 'preset'
        },
        textureOnViewport: true,
        ready: function(){
          $div.removeClass('loading');
        }
      });
    } );

  })(); }

});