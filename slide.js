function Slider(options)
{
	//参数初始化
	var width = options.width;
	var height = options.height;
	var imgs = options.imgs;
	var container = options.container;
	//结构
	var drawpart = {
		util:function(){
			var slider_wrap = document.createElement("div");
			slider_wrap.setAttribute("id","slider_wrap");
			slider_wrap.style.width = width +"px";
			slider_wrap.style.height = height +"px";
			this.drawimgs(slider_wrap);
			document.getElementById(container).appendChild(slider_wrap);
		},
		drawimgs:function(wrap){
			var slider_inner = document.createElement("div");
			slider_inner.setAttribute("id","slider_inner");
			for(var i =0;i<imgs.length;i++)
			{
				var img = document.createElement("img");
				img.src = imgs[i];
				slider_inner.appendChild(img);
				
			}
			wrap.appendChild(slider_inner);
		}
	}
	drawpart.util();
	//加载css
	var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.type='text/css';
    link.rel = 'stylesheet';
    link.href = "slide.css";
    head.appendChild(link);

	var time;
	
	var Distance = slider_wrap.offsetWidth;
	var animate = {
		slider_wrap:document.getElementById("slider_wrap"),
		slider_inner:document.getElementById("slider_inner"),
		index:0,
		auto:function(){
			var start = self.slider_inner.offsetLeft;
			var end = self.index*Distance*(-1);
			var change = end -start;
			console.log(change);
			var timer;
			var t=0;
			var maxT = 30;
			clearInterval(timer);
			timer=setInterval(function(){ 
				t++; 
				if(t>=maxT){
				 	clearInterval(timer);
				 	
				}
				self.slider_inner.style.left=change/maxT*t+start+"px";
				if(self.index==imgs.length&&t>=maxT){ 
				 	slider_inner.style.left=0; 
				 	self.ndex=0;
				 } 
			},17);

		},
		forward:function(){
			
			self.index++;
			console.log(self.index);
            //当图片下标到最后一张把小标换0
            if(self.index>imgs.length){
                self.index=0;
            }
          
            self.auto();
		}
	};
	var self = animate;
	console.log(self);
	time = setInterval(animate.forward,3000); 
}
		
