function Slider(options)
{
	//参数初始化
	var width = options.width;
	var height = options.height;
	var imgs = options.imgs;
	var container = options.container;
	var direction = options.direction;
	var page = options.page;
	//结构
	var drawpart = {
		util:function(){
			var slider_wrap = document.createElement("div");
			slider_wrap.setAttribute("id","slider_wrap");
			slider_wrap.style.width = width +"px";
			slider_wrap.style.height = height +"px";

			slider_wrap.style.overflow = 'hidden';//N修改：设置试图容器。

			this.drawimgs(slider_wrap);
			if(page) this.drawpage(slider_wrap);
			document.getElementById(container).appendChild(slider_wrap);
		},
		drawimgs:function(wrap){
			var slider_inner = document.createElement("div");
			slider_inner.setAttribute("id","slider_inner");
			slider_inner.className = slider_inner.className + " "+"clear";
			
			for(var i =0;i<imgs.length;i++)
			{
				var img = document.createElement("img");
				img.src = imgs[i];
				slider_inner.appendChild(img);
				
			}
			if(imgs.length>1)
			{
				var img = document.createElement("img");
				img.src = imgs[0];
				slider_inner.appendChild(img);
			}
			wrap.appendChild(slider_inner);
		},
		drawpage:function(wrap){
			var pagecontainer =  document.createElement("div");
			pagecontainer.setAttribute("class","pagenation");
			pagecontainer.setAttribute("id","pagenation");
			for(var i = 0;i<imgs.length;i++)
			{
				var span = document.createElement("span");
				if(i==0) span.setAttribute("id","selected");
				var text = i+1;
				span.appendChild(document.createTextNode(text.toString()));
				pagecontainer.appendChild(span);
			}
			wrap.appendChild(pagecontainer);
			
		}
	};
	drawpart.util();
	//加载css
	var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.type='text/css';
    link.rel = 'stylesheet';
    link.href = "slide.css";
    head.appendChild(link);

	var time;
	
	var animate = {
		slider_wrap:document.getElementById("slider_wrap"),
		slider_inner:document.getElementById("slider_inner"),
		pagelist:document.getElementById("pagenation").getElementsByTagName("span"),
		index:0,
		dis:width,
		direction:direction==1?1:-1,
		auto:function(){
			var start = self.slider_inner.offsetLeft;
			var end = self.index*self.dis*direction;
			var change = end -start;
			//console.log(change);
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
				 	self.index=0;
				 } 
			},17);

		},
		forward:function(){
			self.index++;
			
			console.log(self.index);
            //当图片下标到最后一张把小标换0

            if(self.index == imgs.length+1){
				//N修改：当标为最后一张时，使滚动容器初始化。利用滚动间隙，使滚动容器秒回第一张，并设置下一张图片为第二张图片
				self.slider_inner.style.left = '0px';
                self.index=1;
            }
            if(self.index<imgs.length)
	        {
	        	if(self.index!=0)
	            	self.pagelist[self.index].previousSibling.removeAttribute("id");
	            else
	            	self.pagelist[imgs.length-1].removeAttribute("id");
	          	self.pagelist[self.index].setAttribute("id","selected");
	            
            	
            }
	        else
	        {
	        	self.pagelist[imgs.length-1].removeAttribute("id");
	        	self.pagelist[0].setAttribute("id","selected");	
	        }
            
            
            self.auto();
		},
		backward:function(){
			console.log(1);
			self.index--;
			if(self.index<0)
			{
				self.index = imgs.length-1;
			}
			self.auto();
		}
	};
	var self = animate;
	console.log(self);
	time = setInterval(animate.forward,3000); 
}
		
