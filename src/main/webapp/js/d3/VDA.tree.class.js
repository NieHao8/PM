var VDA = VDA || {};
VDA.TreeLayoutClass = function() {
	
return {
  reference: ['https://bl.ocks.org/mbostock/4339083'],
  sample1: function() {
    var data =
    { "type": "parent",
      "name": "M1",
      "count": "50",
      "children": [
        {
          "type": "parent",
          "name": "M21",
          "count": "10"
        },
        {
          "type": "parent",
          "name": "M22",
          "count": "20"
        },
        {
          "type": "child",
          "name": "service account 123"
        },
        {
          "type": "child",
          "name": "service account 456"
        }
      ]
    };
    return data;

  },
  sample_e1: function() {
    var data =
    { "type": "parent",
      "name": "M1",
      "count": "50"
    };
    return data;

  },
  dimension: {
    value: {},
    order: {}
  },
  config: {
    plotDiv: {width: "100%", height: 800},
    margin: {top: 0, right: 0, bottom: 0, left: 10},
    padding: {top: 0, right: 0, bottom: 0, left: 100},

    node: { 
      circle:{fill: {parent: 'steelblue', child: 'white'}, stroke: '#ccc', stroke_w: '1.5px' }, 
      text:{fontfamily: 'aria', fontsize: 12} },
    link: {fill: 'none', stroke: '#ccc', stroke_w: '1.5px'},
    
    tooltip: { background: "#000", width: "100px", height: "60px", padding: "10px", text_align: "center", border_r: "8px",
               font: {size_title: 18, size_text: 12, family: "sans-serif", color: "#FFF"}},
  },
  init: function() {
    var that = this;
    //container
    this.canvasId = this.plotDivId+"_canvas";
    this.canvas = d3.select("#"+this.plotDivId).append("div").append("svg").attr({id: this.canvasId});
    this.svg = this.canvas;
    this.g = this.svg.append("g").attr({class: "VDA_groups"});
    this.tooltip_id = this.plotDivId+"_tooltip";
    this.err_msg_id = this.plotDivId+"_err";
    //id index
    this.maxindex = 0;

    //tooltip
    this.tooltip = d3.select("#"+this.plotDivId).append("div")
                      .attr({class: "VDA_tooltip", id: this.tooltip_id});
    var tooltip_title = this.tooltip.append("div").attr({class: "tooltip_title"})
                            .style({"font-size": this.config.tooltip.font.size_title});
    var tooltip_text = this.tooltip.append("div").attr({class: "tooltip_text"})
                            .style({"font-size": this.config.tooltip.font.size_text});
    //console.log(this.tooltip);
    this.tooltip.style(
      {"position": "absolute",
       "z-index": 1,
       "opacity": 0,
       "width": this.config.tooltip.width,
       //"height": this.config.tooltip.height,
       "padding": this.config.tooltip.padding,
       "text-align": this.config.tooltip.text_align,
       "font-family": this.config.tooltip.font.family,
       "font-size": this.config.tooltip.font.size,
       "color": this.config.tooltip.font.color,
       "background": this.config.tooltip.background,
       "border-radius": this.config.tooltip.border_r,
       "pointer-events": "none"});

    //this.svg.on("mousemove", function() {
    //  if(that.target) { that.target.active = false; }
    //  target = d3.select(d3.event.target).datum();
    //  if(target) target.active = true;
    //  that.target = target;
    //});
  },
  parse: function(parent_node, raw_data) {
    var parsed_data = raw_data;

    var collapse = function(d) {
      if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
      }
    };
    parsed_data.children.forEach(collapse);  //triverse all children to _children  
    if (parent_node!==null){
      parent_node.children = parsed_data.children;
    } else {
      raw_data.x0 = 200; 
      raw_data.y0 = 0;
    }
    // tree sholud be updated
    // console.log(this.root_node);
    return raw_data;
  },
  bind: function(source) {
    var root_node = this.root_node;
    var duration = 750;
    var that = this;
    var diagonal = d3.svg.diagonal().projection(function(d) { return [d.y, d.x]; });
    var circle_fill = function(d){ return d.type==='parent' ? "#ff4d4d" : "#fff"; };
    
    // Compute the new tree layout.
    var tree = this.tree;
    var nodes = tree.nodes(root_node).reverse();
    var links = tree.links(nodes);
    // Normalize for fixed-depth.
    nodes.forEach(function(d) { d.y = d.depth * 240; });
    // Update the nodes…
    var node = this.g.selectAll("g.node")
      .data(nodes, function(d) { return d.id || (d.id = (++that.maxindex)); });
    
    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
      .on("click", that.mouse_func().mouseclick);
    
    //circle
    var circle = nodeEnter.append("circle").attr("r", 1e-6).style("fill", circle_fill);
    var circle_text = nodeEnter.append("text")
      .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
      .attr("dy", ".35em")
      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
      .text(function(d) { return d.type==='parent' ? d.name+' ('+d.count+')' : d.name; })
      .style("fill-opacity", 1e-6);

     // Transition nodes to their new position.
    var nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

    nodeUpdate.select("circle")
        .attr("r", 8)
        .style("fill", circle_fill);

    nodeUpdate.select("text")
        .style("fill-opacity", 1);
    //link
    var link = this.g.selectAll("path.link")
      .data(links, function(d) { return d.target.id; });

    // Enter any new links at the parent's previous position.
    link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("d", function(d) {
        var o = {x: source.x0, y: source.y0};
        return diagonal({source: o, target: o});
      });
    // Transition links to their new position.
    link.transition().duration(duration).attr("d", diagonal);
    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
        .remove();

    nodeExit.select("circle").attr("r", 1e-6);

    nodeExit.select("text").style("fill-opacity", 1e-6);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition()
        .duration(duration)
        .attr("d", function(d) {
          var o = {x: source.x, y: source.y};
          return diagonal({source: o, target: o});
        })
        .remove();

    // Stash the old positions for transition.
    nodes.forEach(function(d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });

    this.circle = circle;
    this.circle_text = circle_text;
    this.link = link;
    this.tree = tree;


      
  },
  render: function() {
    var that = this;
    this.circle.style({stroke: '#800000', 'stroke-width': '1.5px'});
    this.circle_text.style({font: '10px sans-serif'});
    this.link.style({fill: 'none', stroke: '#ccc', 'stroke-width': '1.5px'});
  },
  update: function(source){
    this.bind(source);
    this.render();
  },
  resize: function() {
    var that = this;
    var m = this.config.margin;
    var p = this.config.padding;
    var box = d3.select('#'+this.plotDivId).node().getBoundingClientRect();
    this.config.plotDiv.width =  box.width || this.config.plotDiv.width;
    this.config.plotDiv.height = box.height || this.config.plotDiv.height;
    var innerWidth = this.config.plotDiv.width - m.left - m.right;
    var innerHeight = this.config.plotDiv.height - m.top - m.bottom;
    var w = innerWidth - p.left - p.right;
    var h = innerHeight - p.top - p.bottom;

    d3.select("#"+this.plotDivId).style({
      margin : [m.top, m.right, m.bottom, m.left].join(" ")
    });
    this.svg.attr({
      width: "100%", 
      height: "100%",
      viewBox: [0,0, innerWidth, innerHeight].join(" "),
      preserveAspectRatio: "xMidYMid meet"
    });

    console.log(innerWidth, innerHeight);
    
    this.g.attr("transform", "translate(" + p.left + "," + (p.top) + ")");
    this.tree = d3.layout.tree().size([h, w*0.5]);
    var zoom = function(){
      var translate = d3.event.translate;
      var transX = translate[0];
      var transY = translate[1];
      that.g.attr("transform", "translate(" + [transX, transY] + ")scale(" + d3.event.scale + ")");
    };
    this.zoomListener = d3.behavior.zoom().scaleExtent([0.2, 3]).on("zoom", zoom);    
    this.svg.call(this.zoomListener);

    this.w = w;
    this.h = h;
  },
  centerNode: function(source) {
    scale = this.zoomListener.scale();
    x = -source.y0;
    y = -source.x0;
    x = x * scale + this.w / 2;
    y = y * scale + this.h / 2;
    d3.select('g').transition()
        .duration(700)
        .attr("transform", "translate(" + x + "," + y + ")scale(" + scale + ")");
    this.zoomListener.scale(scale);
    this.zoomListener.translate([x, y]);
  },
  draw: function (plotDivId, raw_data){
    var that = this;
    this.plotDivId = plotDivId;
    this.raw_data = raw_data;

     //remove old chart or err msg
    d3.select("#"+this.plotDivId).selectAll("div").remove();
    d3.select("#"+this.err_msg_id).remove();

    if (!this.valid_data(raw_data)){
        this.show_err();
        return "no valid data";
    }
    this.init();
    //resize canvas
    this.resize();
    //update data
    var root_node = this.parse(null, raw_data);    
    this.root_node = root_node;
    this.update(root_node);
    this.centerNode(root_node);
  },
  query: function(name){
	  
  },
  reload: function(node){
    var name = node.name;
    
    if(!name ){
    	name = "Max Cheng (EVP)";
    }
    console.log("name = " + name);
    var that = this;
    
    var passwordNeverExpires = $('#passwordNeverExpires').val();
    
    $.postData(ctxRoot+"/serviceAccount/findByUser.html", "name="+name+"&passwordNeverExpires="+passwordNeverExpires, function(data){
    	console.log(data);
    	that.parse(node, data);
        var new_tree = that.root_node;
        that.update(new_tree);
        that.centerNode(node);
    	
    	
    });
    
    //var new_leaf = this.query(name);
    
  },
  mouse_func: function (){
    var that = this;
    return {
      mouseclick: function () {
        //console.log(that.tooltip);
        var d = d3.select(this).datum();
        if (d.type!=='parent') {
        	var title = "Service Account - " + d.name;
        	var url = ctxRoot + "/serviceAccount/display.html?account="+ d.name;
        	$.postData(url, "", function(data) {
        		modal.setModal(title, data);
        		modal.showModal();
        		modal.on('hidden.bs.modal', function() {
        		});

        	});
        	
        	
        	return;
        }
        if ('children' in d) {
          d._children = d.children;
          d.children = null;
          that.update(d);
        } 
        else if ('_children' in d) {
          d.children = d._children;
          d._children = null;
          that.update(d);
        }
        else{
          that.reload(d);
          // that.parse(d, new_leaf);
          // var new_tree = that.root_node;
          // that.update(new_tree);
          //that.centerNode(d);
        }
        
      },
      mousemove: function () {
        //console.log(that.tooltip);
        var datum = d3.select(this).datum();
      },
      mouseout: function () {
        var datum = d3.select(this).datum();
      },
      mouseover: function () {
        var datum = d3.select(this).datum();
        var tooltip = that.tooltip;
      }
    };//
  },
  valid_data: function(raw_data){
    var valid = true;
    if(raw_data.type==='parent'){
      valid = ('children' in raw_data) ? valid : false;
    }

    return valid; 
    
  },
  show_err: function(){
    d3.select("#"+this.plotDivId).append("div").attr({class: "VDA_ERR_msg", id: this.err_msg_id})
          .style({width: "100%", height: "100%", "text-align": "center", "line-height": 10})
        .append("span").text("no valid data")
          .style({"font-size": 14, "font-family": "sans-serif",
            "font-style": "italic", "fill": "#BDBDBD", "vertical-align": "middle"});
  }
};//class return end
};