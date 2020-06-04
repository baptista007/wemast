var popup, options, viewport, vecLayer1, vecLayer2, store1, store2, south, map, style, grid1, mapPanel, st, modifyControl, url1, layer_win, wfs_capab_store, wms_capab_store ;

Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false,
    paths: {
        GeoExt: "http://127.0.0.1:8080/wemastgeoportal/libs/geoext2-2.1.0/src/GeoExt"
    }
});

Ext.require([
    'GeoExt.tree.OverlayLayerContainer',
    'GeoExt.tree.BaseLayerContainer',
    'GeoExt.data.LayerTreeModel',
    'GeoExt.Action',
    'GeoExt.data.reader.WfsCapabilities',
    'GeoExt.data.WfsCapabilitiesLayerStore',
	'GeoExt.data.WmsCapabilitiesLayerStore',
   'GeoExt.data.reader.WmsCapabilities',
   'GeoExt.data.AttributeStore',
   'GeoExt.data.FeatureStore',
    'GeoExt.grid.column.Symbolizer',
    'GeoExt.selection.FeatureModel',
    'Ext.grid.GridPanel',
    'Ext.layout.container.Border',
	'GeoExt.data.proxy.Protocol',
	'GeoExt.data.reader.Feature',
	'Ext.data.reader.Json',
	'GeoExt.Version',
	'GeoExt.grid.column.Symbolizer',
	'Ext.data.JsonStore',
	 'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json',
		'GeoExt.slider.LayerOpacity',
		'GeoExt.data.reader.WmsCapabilities',
		'GeoExt.data.WmsCapabilitiesLayerModel',
		'GeoExt.data.OwsStore',
		'GeoExt.data.reader.WmsCapabilities',
		'GeoExt.panel.Legend',
		'GeoExt.container.LayerLegend',
		'GeoExt.container.WmsLegend',
    'GeoExt.container.UrlLegend',
    'GeoExt.container.VectorLegend',
    'Ext.chart.*'
]);

Ext.onReady(function() {
   	
Ext.QuickTips.init();

var bounds = new OpenLayers.Bounds(
    5.978650, -26.959376, 44.267185, -8.540624
                ); 	

var options = {
				  maxExtent: bounds,
                   // maxResolution:  0.222,
                    projection: "EPSG:4326",
					allOverlays: true,
                    units: 'degrees',
					//center: new OpenLayers.LonLat(23,77),
					zoom: 5,
					//controls:[new OpenLayers.Control.MouseDefaults()]											
                     };
OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";
 map = new OpenLayers.Map('map', options); 

 OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";
 var map2 = new OpenLayers.Map("map-id");
 var OSM = new OpenLayers.Layer.OSM("OpenStreetMap");

var land_cover1994 = new OpenLayers.Layer.WMS(
    "Land cover 1994", "http://127.0.0.1:8080/geoserver/wms",
    {
        LAYERS: 'wemast:land_cover1994',
        STYLES: '',
        format: 'image/png',
        tiled: true,
        transparent: true
      //  tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
    },
    {
//	tileOptions: {maxGetUrlLength: 2048},
    displayInLayerSwitcher: true,
    isBaseLayer: false,
    //singleTile: true,
    transitionEffect: 'resize'
    }
);

var land_cover2000 = new OpenLayers.Layer.WMS(
    "Land cover 2000", "http://127.0.0.1:8080/geoserver/wms",
    {
        LAYERS: 'wemast:land_cover2000',
        STYLES: '',
        format: 'image/png',
        tiled: true,
        transparent: true
      //  tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
    },
    {
//	tileOptions: {maxGetUrlLength: 2048},
    displayInLayerSwitcher: true,
    isBaseLayer: false,
    //singleTile: true,
    transitionEffect: 'resize'
    }
);

var land_cover2006 = new OpenLayers.Layer.WMS(
    "Land cover 2006", "http://127.0.0.1:8080/geoserver/wms",
    {
        LAYERS: 'wemast:land_cover2006',
        STYLES: '',
        format: 'image/png',
        tiled: true,
        transparent: true
      //  tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
    },
    {
//	tileOptions: {maxGetUrlLength: 2048},
    displayInLayerSwitcher: true,
    isBaseLayer: false,
    //singleTile: true,
    transitionEffect: 'resize'
    }
);

var land_cover2012 = new OpenLayers.Layer.WMS(
    "Land cover 2012", "http://127.0.0.1:8080/geoserver/wms",
    {
        LAYERS: 'wemast:land_cover2012',
        STYLES: '',
        format: 'image/png',
        tiled: true,
        transparent: true
      //  tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
    },
    {
//	tileOptions: {maxGetUrlLength: 2048},
    displayInLayerSwitcher: true,
    isBaseLayer: false,
    //singleTile: true,
    transitionEffect: 'resize'
    }
);

var land_cover2018 = new OpenLayers.Layer.WMS(
    "Land cover 2018", "http://127.0.0.1:8080/geoserver/wms",
    {
        LAYERS: 'wemast:land_cover2018',
        STYLES: '',
        format: 'image/png',
        tiled: true,
        transparent: true
      //  tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
    },
    {
//	tileOptions: {maxGetUrlLength: 2048},
    displayInLayerSwitcher: true,
    isBaseLayer: false,
    //singleTile: true,
    transitionEffect: 'resize'
    }
);       
				
var reference_wetlands = new OpenLayers.Layer.WMS(
                    "Reference Wetlands", "http://127.0.0.1:8080/geoserver/wms",
                    {
                        LAYERS: 'wemast:reference_wetlands',
                        STYLES: '',
                        format: 'image/png',
						//cql_filter: 'state_name == "BIHAR"',
                       tiled: true,
						transparent: true
                      //  tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
                    },
					{
				//	tileOptions: {maxGetUrlLength: 2048},
					displayInLayerSwitcher: true,
					isBaseLayer: false,
					//singleTile: true,
					transitionEffect: 'resize'
					}
    );

var barotse_catchment = new OpenLayers.Layer.WMS(
        "Barotse catchment", "http://127.0.0.1:8080/geoserver/wms",
        {
            LAYERS: 'wemast:barotse_catchment',
            STYLES: '',
            format: 'image/png',
            //cql_filter: 'state_name == "BIHAR"',
           tiled: true,
            transparent: true
          //  tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
        },
        {
    //	tileOptions: {maxGetUrlLength: 2048},
        displayInLayerSwitcher: true,
        isBaseLayer: false,
        //singleTile: true,
        transitionEffect: 'resize'
        }
);  

var boteti_river = new OpenLayers.Layer.WMS(
    "Boteti River", "http://127.0.0.1:8080/geoserver/wms",
    {
        LAYERS: 'wemast:boteti_river',
        STYLES: '',
        format: 'image/png',
        //cql_filter: 'state_name == "BIHAR"',
       tiled: true,
        transparent: true
      //  tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
    },
    {
//	tileOptions: {maxGetUrlLength: 2048},
    displayInLayerSwitcher: true,
    isBaseLayer: false,
    //singleTile: true,
    transitionEffect: 'resize'
    }
);

var transboundary_basins = new OpenLayers.Layer.WMS(
    "Transboundary basins", "http://127.0.0.1:8080/geoserver/wms",
            {
                LAYERS: 'wemast:transboundary_basins',
                STYLES: '',
                format: 'image/png',
                tiled: true,
                transparent: true
              //  tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
            },
            {
        //	tileOptions: {maxGetUrlLength: 2048},
            displayInLayerSwitcher: true,
            isBaseLayer: false,
            //singleTile: true,
            transitionEffect: 'resize'
            }
);

var OSM_base = new OpenLayers.Layer.WMS(
        "Base map", "https://ows.terrestris.de/osm/service?",
        {
            LAYERS: 'OSM-WMS', //  tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
        },
        { isBaseLayer: false}
    );    

    var rainfall_monthly = new OpenLayers.Layer.Vector("Rainfall Monthly Data", {
        styleMap: new OpenLayers.StyleMap({
                "default": new OpenLayers.Style({
                    pointRadius: 6,
                    fillColor: "green",
                    strokeColor: '#000000',
                    strokeWidth: 1
                })
            }),
        protocol: new OpenLayers.Protocol.HTTP({
            url: "data/rainfall_monthly.json",
            format: new OpenLayers.Format.GeoJSON()
        }),
        strategies: [new OpenLayers.Strategy.Fixed()],
        isBasiclayer: false,
        displayInLayerSwitcher: true,
        //visibility:false
    });

map.addLayers([
             OSM_base,
             land_cover2000,
             land_cover2006,
             land_cover2012,
             land_cover2018,
             transboundary_basins,
             boteti_river,
             barotse_catchment, 
             reference_wetlands
            ]);
 map2.addLayers([OSM,rainfall_monthly]);
map.zoomToExtent(new OpenLayers.Bounds(
              5.978650, -26.959376, 44.267185, -8.540624
                ));
                
map.addControl(
                new OpenLayers.Control.MousePosition({
                    prefix:'Longitude|Lattitude</a> coordinates: ',
                    separator: ' | ',
                    numDigits: 2,
                    emptyString: 'Mouse is not over map.'
					//displayProjection: new OpenLayers.Projection("EPSG:4326")
                })
            );                

//pan map			
var pan = Ext.create('GeoExt.Action',{
    tooltip: "Pan Map",
// iconCls: "icon-pan",
    //text: "Pan Map",
    icon:"http://127.0.0.1:8080/wemastgeoportal/img/pan.png",
    enableToggle: true,
    pressed: false,
    allowDepress: true,
    control: new OpenLayers.Control.Navigation(),
    map: map,
    toggleGroup: 'tools'
   });
   
var pan_map = Ext.create('Ext.Button', pan);

//Zoomin 
var zoomin = Ext.create('Ext.Button',{
    handler: function(){
        map.zoomIn();
    },
    tooltip: "Zoom In",
    icon: "http://127.0.0.1:8080/wemastgeoportal/img/zoomin.png",
    //text: "Zoom In",
   // toggleGroup: 'tools',
    //allowDepress: false,
    //enableToggle: true,
});

//zoom out
var zoomout = Ext.create('Ext.Button',{
    handler: function(){
        map.zoomOut();
    },
    tooltip: "Zoom In",
    icon: "http://127.0.0.1:8080/wemastgeoportal/img/zoomout.png",
    //text: "Zoom Out"
    //text: "zoom in",
    //toggleGroup: 'tools',
    //allowDepress: false,
    //enableToggle: true,
});

//zoom to full extent
var zoomex = Ext.create('GeoExt.Action',{
                    icon:"http://127.0.0.1:8080/wemastgeoportal/img/zoomtoall.png",
                    control: new OpenLayers.Control.ZoomToMaxExtent(),
                    map: map,
                    //text: "max extent",
					//toggleGroup: 'tools',  // only one tool can be active in a group
                    tooltip: "zoom to full extent",
					//enableToggle: true,
                    pressed: false,
                    allowDepress: false,
                });
				var zoom_ex = Ext.create('Ext.Button', zoomex);
				
// rectangle zoom		
var zoomrec = Ext.create('GeoExt.Action',{
		           // height: 40,
                  //  width: 	40,				
                    icon:"http://127.0.0.1:8080/wemastgeoportal/img/zoomrec.png",
					control: new OpenLayers.Control.ZoomBox(),
					map: map,
					toggleGroup: 'tools',  // only one tool can be active in a group
                    allowDepress: true,
                    pressed: false,
					enableToggle: true,
            
            //allowDepress: false,
                    tooltip: "zoom"
                });
            var zoom_rec = Ext.create('Ext.Button', zoomrec);
            
// previous and next zoom		
var historyControl = new OpenLayers.Control.NavigationHistory();
map.addControl(historyControl);

var navPreviousAction = Ext.create('GeoExt.Action',{
    tooltip: "Zoom to Previous Extent",
    icon:"http://127.0.0.1:8080/wemastgeoportal/img/back_off.png",
    //text:"zoom prev",
    disabled: true,
    enableToggle: true,
    pressed: false,
    allowDepress: false,
    control: historyControl.previous,
    toggleGroup: 'tools'
});
var nav_prev = Ext.create('Ext.Button', navPreviousAction);

var navNextAction = Ext.create('GeoExt.Action',{
    tooltip: "Zoom to Next Extent",
    icon:"http://127.0.0.1:8080/wemastgeoportal/img/fwd_off.png",
    //text:"zoom next",
    disabled: true,
    enableToggle: true,
    pressed: false,
    allowDepress: false,
    control: historyControl.next,
    toggleGroup: 'tools'
});
var nav_nxt = Ext.create('Ext.Button', navNextAction);

//measure length
var measure_len = Ext.create('GeoExt.Action',{
    icon:"http://127.0.0.1:8080/wemastgeoportal/img/measure_over.png",
     text: "Measure Length",
    control: new OpenLayers.Control.Measure(OpenLayers.Handler.Path, {
         geodesic: true,
         eventListeners: {
             measure: function(event) {
               if (event.order == 1) {
                 var win = new Ext.Window({
                     title: "Measure Results",
                     modal: true,
                     width: 180,
                     constrain: true,
                     bodyStyle: {padding: 10},
                     html: event.measure.toFixed(3) + " " + event.units
                 });
                 win.show();}
                 else{
                 var win = new Ext.Window({
                     title: "Measure Results",
                     modal: true,
                     width: 180,
                     constrain: true,
                     bodyStyle: {padding: 10},
                     html: event.measure.toFixed(3) + " " + event.units + "<sup>2</" + "sup>"
                 });
                 win.show();}
             }
         }
     }),
     map: map,
     // button options
     toggleGroup: 'tools',  // only one tool can be active in a group
     allowDepress: true,
     tooltip: "measure distance"
 });

var m_len = Ext.create('Ext.Button', measure_len);

// measure area	
var measure_area = Ext.create('GeoExt.Action',{
    icon:"http://127.0.0.1:8080/wemastgeoportal/img/measure_over.png",
     text: "Measure Area",
    control: new OpenLayers.Control.Measure(OpenLayers.Handler.Polygon, {
         geodesic: true,
         eventListeners: {
             measure: function(event) {
             if (event.order == 1) {
                 var win = new Ext.Window({
                     title: "Measure Results",
                     modal: true,
                     width: 180,
                     constrain: true,
                     bodyStyle: {padding: 10},
                     html: event.measure.toFixed(3) + " " + event.units
                 });
                 win.show();}
                 else{
                 var win = new Ext.Window({
                     title: "Measure Results",
                     modal: true,
                     width: 180,
                     constrain: true,
                     bodyStyle: {padding: 10},
                     html: event.measure.toFixed(3) + " " + event.units + "<sup>2</" + "sup>"
                 });
                 win.show();}
             }
         }
     }),
     map: map,
     // button options
     toggleGroup: 'tools',  // only one tool can be active in a group
     allowDepress: true,
     tooltip: "measure area"
 });
var m_area = Ext.create('Ext.Button', measure_area);

//get feature info			 
var info = Ext.create('GeoExt.Action',{
    tooltip: "Feature Info",
    icon:"http://127.0.0.1:8080/wemastgeoportal/img/identify_off.png",
    text: "GetInfo",
   // iconCls: "icon-pan",
 //  text: "Information",
    //icon:"pan.png",
    enableToggle: true,
    //pressed: true,
    allowDepress: true,
    control: new OpenLayers.Control.WMSGetFeatureInfo({
//autoActivate: true,
  url: "http://127.0.0.1:8080/geoserver/wms",
   title: 'Identify features by clicking',
    queryVisible: true,
    eventListeners: {
        getfeatureinfo: function(event) {
        //if(popup) {map.removePopup(popup);}
         popup = new OpenLayers.Popup.FramedCloud(
                "chicken", 
                map.getLonLatFromPixel(event.xy),
                null,
                event.text,
                null,
                true
            );
            map.addPopup(popup);
        }
    }
}),
    map: map,
    toggleGroup: 'tools'
});
var get_info = Ext.create('Ext.Button', info);

var fields= [{name: 'basin_name', type: 'string'},
{name: 'max1', type: 'float'},
{name: 'min1', type: 'float'},
{name: 'average1', type: 'float'},
{name: 'max2', type: 'float'},
{name: 'min2', type: 'float'},
{name: 'average2', type: 'float'},
{name: 'max3', type: 'float'},
{name: 'min3', type: 'float'},
{name: 'average3', type: 'float'},
{name: 'max4', type: 'float'},
{name: 'min4', type: 'float'},
{name: 'average4', type: 'float'},
{name: 'max5', type: 'float'},
{name: 'min5', type: 'float'},
{name: 'average5', type: 'float'},
{name: 'max6', type: 'float'},
{name: 'min6', type: 'float'},
{name: 'average6', type: 'float'},
{name: 'max7', type: 'float'},
{name: 'min7', type: 'float'},
{name: 'average7', type: 'float'},
{name: 'max8', type: 'float'},
{name: 'min8', type: 'float'},
{name: 'average8', type: 'float'},
{name: 'max9', type: 'float'},
{name: 'min9', type: 'float'},
{name: 'average9', type: 'float'},
{name: 'max10', type: 'float'},
{name: 'min10', type: 'float'},
{name: 'average10', type: 'float'},
{name: 'max11', type: 'float'},
{name: 'min11', type: 'float'},
{name: 'average11', type: 'float'},
{name: 'max12', type: 'float'},
{name: 'min12', type: 'float'},
{name: 'average12', type: 'float'}
];
var store = Ext.create('GeoExt.data.FeatureStore', {
layer: rainfall_monthly,
enablePaging:true,
fields: fields,
autoLoad: true
});



var tips = {
trackMouse: true,
width: 170,
height: 40,
renderer: function(storeItem, item) {
this.setTitle(storeItem.get('basin_name'));
//this.update(storeItem.get('totals'));
this.update(String(item.value[1]));						

}
};
var series = [{
type: 'line',
axis: 'left',
xField: 'basin_name',
highlight: true,
yField:['max1'],
title: 'Jan',
tips: tips
},{
type: 'line',
axis: 'left',
xField: 'basin_name',
highlight: true,
yField:['max2'],
title: 'Fev',
tips: tips
},{
type: 'line',
axis: 'left',
xField: 'basin_name',
highlight: true,
yField:['max3'],
title: 'Mar',
tips: tips
},{
type: 'line',
axis: 'left',
xField: 'basin_name',
highlight: true,
yField:['max4'],
title: 'Abr',
tips: tips
},{
type: 'line',
axis: 'left',
xField: 'basin_name',
highlight: true,
yField:['max5'],
title: 'May',
tips: tips
},{
type: 'line',
axis: 'left',
xField: 'basin_name',
highlight: true,
yField:['max6'],
title: 'Jun',
tips: tips
},{
type: 'line',
axis: 'left',
xField: 'basin_name',
highlight: true,
yField:['max7'],
title: 'Jul',
tips: tips
},
{
type: 'line',
axis: 'left',
xField: 'basin_name',
highlight: true,
yField:['max8'],
title: 'Aug',
tips: tips
},
{
type: 'line',
axis: 'left',
xField: 'basin_name',
highlight: true,
yField:['max9'],
title: 'Sep',
tips: tips
},
{
type: 'line',
axis: 'left',
xField: 'basin_name',
highlight: true,
yField:['max10'],
title: 'Oct',
tips: tips
},
{
type: 'line',
axis: 'left',
xField: 'basin_name',
highlight: true,
yField:['max11'],
title: 'Nov',
tips: tips
},
{
type: 'line',
axis: 'left',
xField: 'basin_name',
highlight: true,
yField:['max12'],
title: 'Dec',
tips: tips
}
];
var axes = [{
type: 'Numeric',
minimum: 0,
position: 'left',
fields:['max1','max2','max3','max4','max5','max6','max7','max8','max9','max10','max11','max12',],
title: 'Values/Amounts',
grid: true,
label: {
renderer: Ext.util.Format.numberRenderer('0,0'),
font: '10px Arial'
}
}, {
type: 'Category',
position: 'bottom',
fields: ['basin_name'],
title: 'WeMAST Basin',
label: {
rotate: {
degrees: 270
}
}
}];
var seriesmin = [{
type: 'line',
axis: 'left',
xField: 'basin_name',
highlight: true,
yField:['min1'],
title: 'Jan',
tips: tips
},{
type: 'line',
axis: 'left',
xField: 'basin_name',
highlight: true,
yField:['min2'],
title: 'Fev',
tips: tips
},{
type: 'line',
axis: 'left',
xField: 'basin_name',
highlight: true,
yField:['min3'],
title: 'Mar',
tips: tips
},{
type: 'line',
axis: 'left',
xField: 'basin_name',
highlight: true,
yField:['min4'],
title: 'Apr',
tips: tips
},{
type: 'line',
axis: 'left',
xField: 'basin_name',
highlight: true,
yField:['min5'],
title: 'May',
tips: tips
},{
type: 'line',
axis: 'left',
xField: 'basin_name',
highlight: true,
yField:['min6'],
title: 'Jun',
tips: tips
},
{
type: 'line',
axis: 'left',
xField: 'basin_name',
highlight: true,
yField:['min7'],
title: 'Jul',
tips: tips
},
{
type: 'line',
axis: 'left',
xField: 'basin_name',
highlight: true,
yField:['min8'],
title: 'Aug',
tips: tips
},
{
type: 'line',
axis: 'left',
xField: 'basin_name',
highlight: true,
yField:['min9'],
title: 'Sep',
tips: tips
},
{
type: 'line',
axis: 'left',
xField: 'basin_name',
highlight: true,
yField:['min10'],
title: 'Oct',
tips: tips
},
{
type: 'line',
axis: 'left',
xField: 'basin_name',
highlight: true,
yField:['min11'],
title: 'Nov',
tips: tips
},
{
type: 'line',
axis: 'left',
xField: 'basin_name',
highlight: true,
yField:['min12'],
title: 'Dec',
tips: tips
}
];
var axesmin = [{
type: 'Numeric',
minimum: 0,
position: 'left',
fields:['min1','min2','min3','min4','min5','min6','min7','min8','min9','min10','min11','min12'],
title: 'Values/Amounts',
grid: true,
label: {
renderer: Ext.util.Format.numberRenderer('0,0'),
font: '10px Arial'
}
}, {
type: 'Category',
position: 'bottom',
fields: ['basin_name'],
title: 'WeMAST Basin',
label: {
rotate: {
degrees: 270
}
}
}];

// Average 
var seriesaver = [{
type: 'line',
axis: 'left',
xField: 'basin_name',
highlight: true,
yField:['average1'],
title: 'Jan',
tips: tips
},{
type: 'line',
axis: 'left',
xField: 'basin_name',
highlight: true,
yField:['average2'],
title: 'Fev',
tips: tips
},{
type: 'line',
axis: 'left',
xField: 'basin_name',
highlight: true,
yField:['average3'],
title: 'Mar',
tips: tips
},{
type: 'line',
axis: 'left',
xField: 'basin_name',
highlight: true,
yField:['average4'],
title: 'Apr',
tips: tips
},{
type: 'line',
axis: 'left',
xField: 'basin_name',
highlight: true,
yField:['average5'],
title: 'May',
tips: tips
},{
type: 'line',
axis: 'left',
xField: 'basin_name',
highlight: true,
yField:['average6'],
title: 'Jun',
tips: tips
},
{
type: 'line',
axis: 'left',
xField: 'basin_name',
highlight: true,
yField:['average7'],
title: 'Jul',
tips: tips
},
{
type: 'line',
axis: 'left',
xField: 'basin_name',
highlight: true,
yField:['average8'],
title: 'Aug',
tips: tips
},
{
type: 'line',
axis: 'left',
xField: 'basin_name',
highlight: true,
yField:['average9'],
title: 'Sep',
tips: tips
},
{
type: 'line',
axis: 'left',
xField: 'basin_name',
highlight: true,
yField:['average10'],
title: 'Oct',
tips: tips
},
{
type: 'line',
axis: 'left',
xField: 'basin_name',
highlight: true,
yField:['average11'],
title: 'Nov',
tips: tips
},
{
type: 'line',
axis: 'left',
xField: 'basin_name',
highlight: true,
yField:['average12'],
title: 'Dec',
tips: tips
}
];
var axesaver = [{
type: 'Numeric',
minimum: 0,
position: 'left',
fields:['average1','average2','average3','average4','average5','average6','average7','average8','average9','average10','average11','average12'],
title: 'Values/Amounts',
grid: true,
label: {
renderer: Ext.util.Format.numberRenderer('0,0'),
font: '10px Arial'
}
}, {
type: 'Category',
position: 'bottom',
fields: ['basin_name'],
title: 'WeMAST Basin',
label: {
rotate: {
degrees: 270
}
}
}];

var maxchart = Ext.create('Ext.chart.Chart',{
animate: true,
store: store,
margin:'20 0 5 5',
//autoHeight:true,
//insetPadding: 30,
legend: {
position: 'top'
},
background: {
gradient: {
id: 'backgroundGradient',
stops: {
0: {
    color: '#ffffff'
},
100: {
    color: '#eaf1f8'
}
}
}
},
axes: axes,
series:series
});
var minchart = Ext.create('Ext.chart.Chart',{
animate: true,
store: store,
margin:'20 0 5 5',
//autoHeight:true,
//insetPadding: 30,
legend: {
position: 'top'
},
background: {
  gradient: {
  id: 'backgroundGradient',
  stops: {
      0: {
          color: '#ffffff'
      },
      100: {
          color: '#eaf1f8'
      }
  }
  }
},
axes: axesmin,
series:seriesmin
});

// Average
var averchart = Ext.create('Ext.chart.Chart',{
animate: true,
store: store,
margin:'20 0 5 5',
//autoHeight:true,
//insetPadding: 30,
legend: {
position: 'top'
},
background: {
gradient: {
id: 'backgroundGradient',
stops: {
0: {
   color: '#ffffff'
},
100: {
   color: '#eaf1f8'
}
}
}
},
axes: axesaver,
series:seriesaver
});

var dataPanel = Ext.create('Ext.tab.Panel', {
activeTab: 0,
//title:'Data Tables',
autoHeight:true,
deferredRender: false,
//layout:'fit',
items: [{
xtype: 'tabpanel',
title: 'Rainfall Monthly Analysis',
layout: 'fit',
items:[{
    xtype: 'panel',
    title: 'Maximum Rainfall per Month',
    layout: 'fit',
    items:[maxchart],
    autoScroll:true,
tbar: [{
text: 'Save Chart',
handler: function() {
Ext.MessageBox.confirm('Confirm Download', 'Would you like to download the chart as an image?', function(choice){
if(choice == 'yes'){
    maxchart.save({
        type: 'image/png'
    });
}
});
}
}],
},{
    xtype: 'panel',
    title: 'Minimum Rainfall per Month',
    layout: 'fit',
    items:[minchart],
    autoScroll:true,
tbar: [{
text: 'Save Chart',
handler: function() {
Ext.MessageBox.confirm('Confirm Download', 'Would you like to download the chart as an image?', function(choice){
if(choice == 'yes'){
    minchart.save({
        type: 'image/png'
    });
}
});
}
}],
},
{
 xtype: 'panel',
 title: 'Average Rainfall per Month',
 layout: 'fit',
 items:[averchart],
 autoScroll:true,
tbar: [{
text: 'Save Chart',
handler: function() {
Ext.MessageBox.confirm('Confirm Download', 'Would you like to download the chart as an image?', function(choice){
if(choice == 'yes'){
 averchart.save({
     type: 'image/png'
 });
}
});
}
}],
}
],
}

],
//renderTo : Ext.getBody()
});  
var visuals = Ext.create('Ext.window.Window', {
width: 1000,
height:600,
closeAction:'hide',
layout:'fit',
title: 'Analysis Charts',
draggable: true,
resizable: true,
minimizable: true,
maximizable: true,
minHeight:400,
minWidth:500,
items: [dataPanel]
}
);
//var records = grid.getStore().getCount();

//var  toolbarItems = [];

var toolbarItems = Ext.create('Ext.button.Button',{
text: 'Charts',
handler: function() {
visuals.show();
}
}
);

//Testing opening of modal dialog
/*var dialogButton = Ext.create('GeoExt.Action',{
    tooltip: "Charts",
    text: "Charts",
    handler: function() {
        $( "#charts-dialog").dialog( "open" );
        //alert("Hi there! I have been clicked");
    }
});
var btn_open_charts = Ext.create('Ext.Button', dialogButton); */

var mapPanel = Ext.create('GeoExt.panel.Map', {
           // title: 'Mappanel',
            map: map,
            region: 'center',
			stateful: true,
           // stateId: 'mappanel',
           tbar:[pan_map, zoomin, zoomout, zoom_ex, zoom_rec, nav_prev, nav_nxt, m_len, m_area, get_info, toolbarItems],
           // tbar:toolbarItems,
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: []
            }]
        });		

//WFS features        
wfs_capab_store = Ext.create('GeoExt.data.WFSCapabilitiesStore',{
            url: "http://127.0.0.1:8080/geoserver/wfs?service=wfs&version=1.0.0&request=getCapabilities",
        //	url:"http://127.0.0.1:8080/geoserver/wfs?service=wfs&version=1.1.0&request=GetCapabilities",
            autoLoad: true,
             layerOptions: function() {
                return {
                    visibility: false,
                    displayInLayerSwitcher: false,
                    strategies: [new OpenLayers.Strategy.BBOX({ratio: 1})]
                };
            }
            // set as a function that returns a hash of layer options.  This allows
            // to have new objects created upon each new OpenLayers.Layer.Vector
            // object creations.
            
        });
        wfs_capab_store.load();
        
wms_capab_store = Ext.create('GeoExt.data.WMSCapabilitiesStore',{
            url: "http://127.0.0.1:8080/geoserver/wms?request=getCapabilities",
            autoLoad: true
        });
            //wms_capab_store1.load();     
    
//fuctionality to remove and zoom to layer on the left panel            
var menuC = Ext.create('Ext.menu.Menu', {
        //     id: 'contextmenu',
			// itemId: 'contextmenu',
			// xtype: "menu",
            items: [{
                text: "Zoom to Layer Extent",
               // icon: '../images/arrow_out.png',
                handler: function () {
				    var snode = tree.getSelectionModel().getSelection();
					var layer1 = snode[0].get('text');
					//alert(layer1);
					
					/*var wms_capab_store1 = Ext.create('GeoExt.data.WMSCapabilitiesStore',{
        url: "http://127.0.0.1:8081/geoserver/wms?request=getCapabilities",
		autoLoad: true
    });
	wms_capab_store1.load();
					var index1 = wms_capab_store1.findExact( 'name', snode[0].get('text'));
					alert(index1);
					var rec = wms_capab_store.getAt(index);
	    	        var extent = rec.get("llbbox");
					map.zoomToExtent(new OpenLayers.Bounds(extent));*/
					//  alert(tree.getSelectionModel().getSelectedNode().layer.name);
					// alert(map.layers[1].name);
					var wms_store = Ext.create('GeoExt.data.WMSCapabilitiesStore',{
        url: "http://127.0.0.1:8080/geoserver/wms?request=getCapabilities",
		autoLoad: true,
	    listeners : {
        load : function(store) {
           	var index = store.findExact( 'title', snode[0].get('text'));
			//alert(index);
			var rec = store.getAt(index);
	    	var extent = rec.get("llbbox");
	        
                        map.zoomToExtent(new OpenLayers.Bounds(extent));
					//	alert(snode.layer.maxExtent);
                    
	        }
    }
    });
	
	 },
	 scope: this
            },
	{
		 text: 'Remove Layer',
            handler: function(){
			
			var snode = tree.getSelectionModel().getSelection();
					var layer = snode[0].get('layer');
			//var sel_node_index = sel_node.indexOf(0);
			//alert(sel_node.layer);
			mapPanel.map.removeLayer(layer);
			//alert(sel_node.layer);
			  
		 }
		 }
		            ]
        });            

var store = Ext.create('Ext.data.TreeStore', {
            model: 'GeoExt.data.LayerTreeModel',
            root: {
                expanded: true,
                children: [
                    /*{
                        plugins: [{
                            ptype: 'gx_layercontainer',
                            store: mapPanel.layers
                        }],
                        expanded: true
                    }, */
					{
                        plugins: ['gx_overlaylayercontainer'],
                        expanded: true
                    }, 
					{
                        plugins: ['gx_baselayercontainer'],
                        expanded: true,
                        text: "Base Maps"
                    }
                ]
            }
        });
//  var layer;
var tree = Ext.create('GeoExt.tree.Panel', {
            border: true,
            region: "west",
            title: "Layer Panel",
            width: 250,
            split: true,
            collapsible: true,
           // collapseMode: "mini",
            autoScroll: true,
            store: store,
            rootVisible: false,
            lines: false,
			 viewConfig: {
			 plugins: [{
                    ptype: 'treeviewdragdrop',
                    appendOnly: false
                }],
            listeners: {
                itemcontextmenu: function(view, rec, node, index, event) {
                    event.stopEvent(); // stops the default event. i.e. Windows Context Menu
                    menuC.showAt(event.getXY()); // show context menu where user right clicked
                    return false;
                }
            }
        },
			 tbar: [{
            text: 'Available Layers',
            handler: function(){
			/*var wms_capab_store = Ext.create('GeoExt.data.WmsCapabilitiesLayerStore',{
			id: "wms_capab_store1",
        url: "http://127.0.0.1:8081/geoserver/wms?request=getCapabilities",
		autoLoad: true
    });
    // load the store with records derived from the doc at the above url
    wms_capab_store.load();*/	
		   var wms_grid = Ext.create('Ext.grid.GridPanel', {
      //  title: "WMS Capabilities",
       store: wms_capab_store,
	   id: "wms_grid",
	  // selType: 'cellmodel',
        columns: [
            {header: "Title", dataIndex: "title", sortable: true},
            {header: "Name", dataIndex: "name", sortable: true},
            {header: "Queryable", dataIndex: "queryable", sortable: true, width: 70},
            {id: "description", header: "Description", dataIndex: "abstract"}
        ],
    viewConfig: {
     //   forceFit: true,

//      Return CSS class to apply to rows depending upon data values
        getRowClass: function(record, index) {
       //    var c = record.get('name');
		//	 if (! c.match(/karan:*/)) {
		//	   return 'none';
        //       }
            
        }
    },
        autoExpandColumn: "description",
       // renderTo: "capgrid",
        height: 300,
        width: 650,
		selType: 'rowmodel',
		//sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
		 buttons: [{
            text: 'Add to Map',
            handler: function(){
			var record = wms_grid.getSelectionModel().getSelection();
			var layer_name = record[0].get('name');
			var layer_title = record[0].get('title');
			//alert(layer_name);
			//alert(layer_title);
				var layer = new OpenLayers.Layer.WMS(
                    layer_title, "http://127.0.0.1:8080/geoserver/wms",
                    {
                        LAYERS: layer_name,
                        STYLES: '',
                        format: 'image/png',
						tiled: true,
						transparent: true
                      //  tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
                    },
					{
				//	tileOptions: {maxGetUrlLength: 2048},
					displayInLayerSwitcher: true,
					isBaseLayer: false,
					//singleTile: true,
					transitionEffect: 'resize'
					}
                );
			//var layer = record.getLayer().clone();
			map.addLayer(layer);
			map.zoomToExtent(new OpenLayers.Bounds(record[0].get("llbbox")));
			//alert(layer11);
			}
			}]
    });
			
if(layer_win)
	{layer_win.destroy();}
	
layer_win=Ext.create('Ext.Window',{
        title: "Layers Library",
		       // renderTo: 'container',
		//region: 'north',
       // width:800,
       // height:250,
		items: wms_grid,
        layout:'fit'
    }); 
	layer_win.show();	  
		 }
         }],
		 
		 bbar: [{
		 text: 'Remove Layer',
            handler: function(){
			
			var sel_node = tree.getSelectionModel().getSelection();
			//alert(sel_node);
			var layer = sel_node[0].get('layer');
			//alert(layer);
			//var sel_node_index = sel_node.indexOf(0);
			//alert(sel_node.layer);
			mapPanel.map.removeLayer(layer);
			//alert(sel_node.layer);  
		 }
		}
	]		
});

/*var layer_store = Ext.create('GeoExt.data.LayerStore', {
		map: map,
	//	layers: mapPanel.layers,
		model: 'GeoExt.data.LayerModel',
		autoLoad: true
		});*/
			
var legend_panel = Ext.create('GeoExt.panel.Legend', {
		   // border: false,
            region: "west",
            title: "Legend",
			defaults: {
            labelCls: 'mylabel',
            style: 'padding:5px'
        },
            width: 250,
			//height: 300,
            split: true,
            collapsible: true,
           // collapseMode: "mini",
            autoScroll: true,
			rootVisible: false,
            lines: false,
			//layerStore: layer_store,
            //store: store,
           // rootVisible: false,
           // lines: false,
		});
		
//layer combo for the layers on the left 
var layer_combo = Ext.create('Ext.form.ComboBox', {
	region: 'east',
        store: wfs_capab_store,
		fieldLabel: 'Layer',
		 //renderTo:'container',
        displayField:'title',
		valueField: 'name',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        emptyText:'Select_Layer',
        selectOnFocus:true,
		listeners: { 
               select: function(combo, records) {
                   // note that records are a array of records to be prepared for multiselection
                   // therefore use records[0] to access the selected record
				  z = combo.getValue();
				//  alert(z);
				//opacitySlider.setLayer(records.get("layer").params.name);
				 //  alert(records.type);
				 //  layer1 = new OpenLayers.Layer(z);
				//   alert(layer1.id);
		   
				     var attribute_store = Ext.create('GeoExt.data.AttributeStore', {
       url: "http://127.0.0.1:8080/geoserver/wfs?service=WFS&request=DescribeFeatureType&version=1.1.0&typeName="+z,
	   autoLoad: true,
	   //autoDestroy: true
 });
  //attribute_store.filter('name', 'the_geom', true, true);
  attribute_combo.bindStore(attribute_store);
  //attribute_combo.enable();
 attribute_store.load();
		//	alert(records.get("layer").params.LAYERS);  
				  }
        }  
    });

var attribute_combo = Ext.create('Ext.form.ComboBox', {
	region: 'east',
    //  store: attribute_store,
		fieldLabel: 'attribute',
		 //renderTo:'container',
        displayField:'name',
		valueField:'name',
		//disabled: true,
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        emptyText:'Select_Layer',
        selectOnFocus:true,		
		listeners: { 
               select: function(combo, record, index) {
                   // note that records are a array of records to be prepared for multiselection
                   // therefore use records[0] to access the selected record
				//  z = combo.getValue();
				
				  },
				  expand: function(combo, record, index) {
                   // note that records are a array of records to be prepared for multiselection
                   // therefore use records[0] to access the selected record
				//  z = combo.getValue();
				//alert(label_attribute_combo.getStore().filter('name','gid'));
				combo.getStore().filter([
				
				{
    fn   : function(record) {
      return record.get('name') != 'the_geom' && record.get('name') != 'geom'
    },
    scope: this
  }
]);
				  }
        }
        
    });

var opeartor_store = Ext.create('Ext.data.Store', {
        fields:['name', 'operator'],
        data: [
            {name:'>=', operator:'>='},
            {name:'<=', operator:'<='},
			{name:'=', operator:'='},
			{name:'Like', operator:'ILike'}
			
			 ],
			 autoLoad: true,
    });
	
	//opeartor_store.load();
var operator_combo = Ext.create('Ext.form.ComboBox', {
	region: 'east',
	id:'operator_combo',
     store: opeartor_store,
		fieldLabel: 'opeartor',
		 //renderTo:'container',
        displayField:'name',
		valueField:'operator',
		//disabled: true,
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        emptyText:'Select_Layer',
        selectOnFocus:true,
		listeners: { 
               select: function(combo, record, index) {
                   // note that records are a array of records to be prepared for multiselection
                   // therefore use records[0] to access the selected record
				  z = combo.getValue();
				//  alert(z);
				  }
        }
});

var query_panel = Ext.create('Ext.form.FormPanel', {
        title: 'Select Features by Attributes',
        frame: true,
		autoScroll: true,
            border: false,
			//split: true,
            autoScroll: true,
			collapsible: true,
        //labelWidth: 110,
     //  width: 320,
		region:'east',
        //renderTo:'form-ct',
       // bodyStyle: 'padding:0 10px 0;',
        items: [
            layer_combo, attribute_combo, operator_combo,
			{
			    xtype: 'textfield',
				id: 'Value',
                fieldLabel: 'Enter Value',
                name: 'Value1'
                //allowBlank:false
            }
        ],
        buttons: [{
            text: 'Query',
            handler: function(){
               if(query_panel.getForm().isValid())
			   {
			    	
	var no_fields = query_panel.getComponent(attribute_combo).getStore().getCount();
						//alert(no_fields);
						k = no_fields - 1;
						var field_name = new Array();
						var field_type = new Array();
						for (i = 0; i <= k; i++){
					//	alert(record.get('name'));
					//	alert(record.get(combo.valueField));
						//alert(record.id);
				//  alert(combo.getStore().getRange());
				  var tttt = query_panel.getComponent(attribute_combo).getStore().getRange()[i];
				//  alert(tttt);
				//  alert(tttt.get('name'));
				  field_name[i] = tttt.get("name");
				  field_type[i] = tttt.get("type");
				//  alert(temp[i]);
				  
				  }
				  //alert(field_type);
 
              //  var lk1 = query_panel.getForm().getValues(true);
				//var kk = Ext.getCmp('operator_combo').getValue();
			//	var kk1 = query_panel.getComponent(layer_combo).getStore().getRange();
				var layer_value = query_panel.getComponent(layer_combo).getValue();
				//alert(layer_value);
				
	//	var index_layer_combo = query_panel.getComponent(layer_combo).getStore().findExact('title', layer_layer_combo);
				//alert(kk3);
		//		var record_layer_combo = query_panel.getComponent(layer_combo).getStore().getRange()[index_layer_combo];
				//alert(kk4);
		//		var layer_value = record_layer_combo.get("layer").params.LAYERS;
			
				var attribute_value = query_panel.getComponent(attribute_combo).getValue();
				var operator_value = query_panel.getComponent(operator_combo).getValue();
				var text_value = Ext.getCmp('Value').getValue();
				//alert(layer_value);
			//	alert(attribute_value);
			//	alert(operator_value);
			//	alert(text_value);
				select_by_att(field_name,no_fields,field_type,layer_value,attribute_value,operator_value,text_value);
				
        }
		 }
    },	
	{
            text: 'Load all Features',
            handler: function(){		   			    	
	var no_fields = query_panel.getComponent(attribute_combo).getStore().getCount();
					//	alert(no_fields);
						k = no_fields - 1;
						var field_name = new Array();
						var field_type = new Array();
						for (i = 0; i <= k; i++){
					//	alert(record.get('name'));
					//	alert(record.get(combo.valueField));
						//alert(record.id);
				//  alert(combo.getStore().getRange());
				  var tttt = query_panel.getComponent(attribute_combo).getStore().getRange()[i];
				//  alert(tttt);
				//  alert(tttt.get('name'));
				  field_name[i] = tttt.get("name");
				  field_type[i] = tttt.get("type");
				//  alert(temp[i]);
				  
				  }
			
				var layer_value = query_panel.getComponent(layer_combo).getValue();
		//alert(layer_value);
				select_all(field_name,no_fields,field_type,layer_value);
		 }
       
        }]
});

var north = Ext.create('Ext.panel.Panel', {
			 title: "<center>WeMAST Geoportal - Wetland Assessment and Monitoring Transboundary Basins</center>",
         	    region: 'north',
    });

 south = Ext.create('Ext.panel.Panel', {
        title: "Feature Atributes",
		border: false,
			split: true,
			frame: true,
            autoScroll: true,
       // layout: 'border',
          layout: "fit",
		 collapsed: true,
		  region: 'south',
        height: 180,
      //  width: 250,
		// frame: true,
		autoScroll: true,
            border: false,
			split: true,
            collapsible: true
        //labelWidth: 110,
      //  items: [tree, legend]
    });  
    
var west = Ext.create('Ext.Panel', {
        title: "Layers",
       // layout: 'border',
         // layout: "fit",
		 collapsed: false,
		 collapsible: true,
          region: 'west',
     //   height: 180,
      //  width: 250,
		// frame: true,
		autoScroll: true,
            border: false,
			split: true,
            //labelWidth: 110,
       items: [tree, legend_panel]
    });
    
var query_editing = Ext.create('Ext.Panel', {
        title: "Feature Query",
       // layout: 'border',
         // layout: "fit",
		 collapsed: true,
		 collapsible: true,
          region: 'east',
     //   height: 180,
      //  width: 250,
		 frame: true,
		autoScroll: true,
            border: false,
			split: true,
            //labelWidth: 110,
       items: [query_panel]
    });    

viewport = Ext.create('Ext.Viewport', {
        layout: "fit",
        hideBorders: true,
        items: {
            layout: "border",
            deferredRender: false,
            items: [mapPanel, north, west, query_editing, south]
        }
    });

map.zoomToExtent(new OpenLayers.Bounds(
              65.9512481689453, 5.96124982833862,
                    101.048751831055, 39.0387496948242
                ));
                
style = new OpenLayers.StyleMap({
                "default": new OpenLayers.Style(null, {
                    rules: [new OpenLayers.Rule({
                        symbolizer: {
                            "Point": {
                                pointRadius: 4,
                               graphicName: "square",
                               fillColor: "blue",
                                fillOpacity: 0.5,
                                strokeWidth: 1,
                                strokeOpacity: 1,
                                strokeColor: "#333333"
                            },
                            "Line": {
                                strokeWidth: 2,
                                strokeOpacity: 1,
                                strokeColor: "#ff9933"
                            },
                            "Polygon": {
                                strokeWidth: 3,
                                strokeOpacity: 1,
                                strokeColor: "#ff6633",
                                fillColor: "blue",
                                fillOpacity: 0
                            }
                        }
                    })]
                })
            });
			
			/*map.zoomToExtent(new OpenLayers.Bounds(
              65.9512481689453, 5.96124982833862,
                    101.048751831055, 39.0387496948242
                ));*/                
});


//function for the left panel to select query 
function select_by_att(field_name,no_fields,field_type, layer_value, attribute_value, operator_value, text_value)
{
//oooo = map.getLayersBy("name",State_Boundary);
//alert("oooo");
if (vecLayer1)
{
map.removeLayer(vecLayer1);
//south.doLayout(true);
//alert(ww);

//vecLayer1.removeAllFeatures();
///store1.load();
}
if (grid1)
{
grid1.destroy();
}
vecLayer1 = new OpenLayers.Layer.Vector("",{displayInLayerSwitcher: false, styleMap: style});
map.addLayers([vecLayer1]);

fields_name = field_name;
fields_no = no_fields;
fields_type = field_type;	
		
layer_name = layer_value;
attribute_name = attribute_value;
operator_name1 = operator_value;
text_name = text_value;

if (operator_name1 == "ILike")
{
url1 = "http://127.0.0.1:8080/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName="+layer_name+"&CQL_FILTER="+attribute_name+"+"+operator_name1+"+'"+text_name+"%25'&outputFormat=application/json"
}
else{
url1 = "http://127.0.0.1:8080/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName="+layer_name+"&CQL_FILTER="+attribute_name+"+"+operator_name1+"+'"+text_name+"'&outputFormat=application/json"
}

//alert(layer_name);
//alert(attribute_name);
//alert(operator_name1);
//alert(text_name);


/*keys1 = [];
for (i = 0; i<= fields_no-1; i++)
{
keys1.push(fields_name[i]);
}
alert(keys1);*/



columns1 = [];
keys1 = [];
for (i = 0; i<= fields_no-1; i++)
{

if (fields_type[i] == "xsd:int" || fields_type[i] == "xsd:short" || fields_type[i] == "xsd:long"){var type1 = 'int';var type2 = 'numberfield';}
else if (fields_type[i] == "xsd:string" || fields_type[i] == "xsd:dateTime"){var type1 = 'string';var type2 = 'textfield';}
else if (fields_type[i] == "xsd:double" || fields_type[i] == "xsd:decimal"){var type1 = 'float';var type2 = 'numberfield';}
else {var type1 = "string";var type2 = 'textfield';}
//alert(fields_name[i]);
//alert(fields_type[i]);
//alert(type1);
if(fields_name[i]!= "geom" && fields_name[i]!= "the_geom")
{
keys1.push({
                name: fields_name[i],
                type: type1
            });

columns1.push({
                header: fields_name[i],
                dataIndex: fields_name[i]
				//editor: {xtype: type2}
            });
}

}
//alert(keys1);
	
//vecLayer1 = new OpenLayers.Layer.Vector("vector");	
	//map.addLayers([vecLayer1]);
	//map.removeLayer(vecLayer1);
	
 store1 = Ext.create('GeoExt.data.FeatureStore', {
 storeId: "store1",
     //  layer: vecLayer1,
        fields: keys1,
        proxy: Ext.create('GeoExt.data.proxy.Protocol',{
            protocol: new OpenLayers.Protocol.HTTP({
			url: url1,
             //   url: "http://127.0.0.1:8080/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName="+layer_name+"&CQL_FILTER="+attribute_name+"+"+operator_name1+"+'"+text_name+"'&outputFormat=application/json",
			 //  url:"http://127.0.0.1:8080/geoserver/karan/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=karan:ind_districts&maxFeatures=50&outputFormat=application/json",
                format: new OpenLayers.Format.GeoJSON()
            }),
			reader: Ext.create('GeoExt.data.reader.Feature')
        }),
		
        autoLoad: true
	
		//autoDestroy: true
		
    });
		store1.bind(vecLayer1);
		
		store1.on("load", function() {mapPanel.map.zoomToExtent(vecLayer1.getDataExtent())});

/*	colModel1 = new Ext.grid.ColumnModel({});
		colModel1.setConfig(keys1, true);
		for (k = 0; k<= fields_no-1; k++){
	
	//	alert(fields_name[k]);
		colModel1.setColumnHeader(k, fields_name[k]);
		colModel1.setDataIndex(k, fields_name[k]);
	
		}*/
	
    // create grid panel configured with feature store
   /* gridPanel1 = new Ext.grid.GridPanel({
        title: "Feature Grid1",
		ref: "featureGrid",
        //region: "south",
		//layout: "fit",
        store: store1,
		height: 350,
		collapsible: true,
		autoScroll: true,
        //width: 320,
		colModel:colModel1,
        sm: new GeoExt.grid.FeatureSelectionModel() 
    });*/
	
	grid1 = Ext.create('Ext.grid.GridPanel', {
	//xtype: "editorgrid",
   // ref: "featureGrid",
	id: "grid1",
	//layout: "fit",
   // title: layer_name,
  //  region: "south",
    // height: 150,
	store: store1,
	//collapsible: true,
	//colModel:colModel1,
	columns: columns1,
	loadMask: true,
    selType: 'featuremodel',
            });
south.add(grid1);
south.doLayout(true);

south.expand(false); 

//vecLayer1.events.register('loadend', vecLayer1, function(evt){mapPanel.map.zoomToExtent(vecLayer1.getDataExtent())});

	//gridPanel1.reconfigure(store1, colModel1);
//	store1.bind(vecLayer1);
	//gridPanel1.reconfigure(store1, colModel1);
	/*if(win)
	{win.destroy();}
	win=new Ext.Window({
        title: "Attributes",
		       // renderTo: 'container',
		//region: 'north',
        width:800,
        height:250,
		items: gridPanel1
       // layout:'table'
    }); 
	
	win.show();*/
//	store1.bind(vecLayer1);
	//gridPanel1.reconfigure(store1, colModel1);
	//gridPanel1.getSelectionModel();
	
	//store1.reload();
	
	//gridPanel1.bindStore(store1);
	
		//gridPanel1.bindStore(store1);

}

function select_all(field_name,no_fields,field_type, layer_value)
{
//oooo = map.getLayersBy("name",State_Boundary);
//alert(oooo);

if (vecLayer1)
{
map.removeLayer(vecLayer1);

//south.doLayout(true);
//alert(ww);

//vecLayer1.removeAllFeatures();
///store1.load();
}
if (grid1)
{
grid1.destroy();
}

vecLayer1 = new OpenLayers.Layer.Vector("",{displayInLayerSwitcher: false, styleMap: style});
map.addLayers([vecLayer1]);

fields_name2 = field_name;
fields_no2 = no_fields;
fields_type2 = field_type;	
			
layer_name2 = layer_value;
//alert(layer_name2);

//alert(layer_name);
//alert(attribute_name);
//alert(operator_name1);
//alert(text_name);

/*keys1 = [];
for (i = 0; i<= fields_no-1; i++)
{
keys1.push(fields_name[i]);
}
alert(keys1);*/

columns1 = [];
keys1 = [];
for (i = 0; i<= fields_no2-1; i++)
{
//alert(fields_type2[i]);
if (fields_type2[i] == "xsd:int" || fields_type2[i] == "xsd:short" || fields_type2[i] == "xsd:long"){var type1 = 'int';var type2 = 'numberfield';}
else if (fields_type2[i] == "xsd:string" || fields_type2[i] == "xsd:dateTime"){var type1 = 'string';var type2 = 'textfield';}
else if (fields_type2[i] == "xsd:double" || fields_type2[i] == "xsd:decimal"){var type1 = 'float';var type2 = 'numberfield';}
else {var type1 = "string";var type2 = 'textfield';}
//alert(fields_name[i]);
//alert(fields_type[i]);
//alert(type1);
if(fields_name2[i]!= "geom" && fields_name2[i]!= "the_geom")
{
keys1.push({
                name: fields_name2[i],
                type: type1
            });

columns1.push({
                header: fields_name2[i],
                dataIndex: fields_name2[i]
				//editor: {xtype: type2}
            });
}


}
//alert(keys1);
	
//vecLayer1 = new OpenLayers.Layer.Vector("vector");	
	//map.addLayers([vecLayer1]);
	//map.removeLayer(vecLayer1);
	
 store1 = Ext.create('GeoExt.data.FeatureStore', {
 storeId: "store1",
     //  layer: vecLayer1,
        fields: keys1,
        proxy: Ext.create('GeoExt.data.proxy.Protocol',{
            protocol: new OpenLayers.Protocol.HTTP({
			url: "http://127.0.0.1:8080/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName="+layer_name2+"&outputFormat=application/json",
             //   url: "http://127.0.0.1:8080/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName="+layer_name+"&CQL_FILTER="+attribute_name+"+"+operator_name1+"+'"+text_name+"'&outputFormat=application/json",
			 //  url:"http://127.0.0.1:8080/geoserver/karan/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=karan:ind_districts&maxFeatures=50&outputFormat=application/json",
                format: new OpenLayers.Format.GeoJSON()
            }),
			reader: Ext.create('GeoExt.data.reader.Feature')
        }),
		
        autoLoad: true
	
		//autoDestroy: true
		
    });

		store1.bind(vecLayer1);
		
		store1.on("load", function() {mapPanel.map.zoomToExtent(vecLayer1.getDataExtent())});

	grid1 = Ext.create('Ext.grid.GridPanel', {
	//xtype: "editorgrid",
   // ref: "featureGrid",
	id: "grid1",
	//layout: "fit",
   // title: layer_name,
  //  region: "south",
    // height: 150,
	store: store1,
	//collapsible: true,
	//colModel:colModel1,
	columns: columns1,
	loadMask: true,
    selType: 'featuremodel',
            });
south.add(grid1);
south.doLayout(true);

south.expand(false);  
	
	}