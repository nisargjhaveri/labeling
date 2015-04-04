/*
 * Application to labeling diagrams
 * Created By Nisarg Jhaveri
 * Finalizing date 23 June 2013
 */
var app = module.exports = require('appjs');
var fs = module.exports = require('fs');

app.serveFilesFrom(__dirname + '/content');

var auth='Nisarg Jhaveri';
/*
 * 0 ==> learning
 * 1 ==> practice
 * 2 ==> test
*/
mode=0;
var modeString=new Array();
modeString[0]='Learning Mode';
modeString[1]='Practice Mode';
modeString[2]='Test Mode';

var path;
var pic;
var UtagId;
var UconId;
var lan=1;
var langString=new Array();
langString[0]='English';
langString[1]='Gujarati';
/*
 * 0 ==> English
 * 1 ==> Gujarati
 */

var credit="\n\
<!DOCTYPE html>\n\
<html>\n\
<head>\n\
	<title>Labeling the diagram</title>\n\
</head>\n\
<body style='background:#fffcdd;'>\n\
	<div id='result' style='position:relative;left:25%;z-index:5;top:25px;width:50%;'>\n\
		<br><br><span style='font-size:35px;'>This software is,</span><br>\n\
		<span style='font-size:25px;padding-left:25px;padding-top:5px;'>for teaching or learnig or testing the ability to labeling diagrams</span>\n\
		<br><br><span style='font-size:35px;'>This software is created by</span><br>\n\
		<span style='font-size:25px;padding-left:25px;padding-top:5px;'>me, "+auth+"</span>\n\
		<br><br><span style='font-size:35px;'>I am Gifting it to</span><br>\n\
		<span style='font-size:25px;padding-left:25px;padding-top:5px;'>My School, Jeevanbharti Pravrutti Vidhyalaya</span>\n\
		<br><br><span style='font-size:35px;'>I am Thankful to,</span><br>\n\
		<span style='font-size:25px;padding-left:25px;padding-top:5px;'>Mrs. Mamta Naik for giving me an opportunity and idea to create this software</span>\n\
		<br><br><span style='font-size:35px;'>I have used</span><br>\n\
		<span style='font-size:25px;padding-left:25px;padding-top:5px;'>An open source project, <a href='http://appjs.org/'>AppJS</a> as application framework</span>\n\
	<div id='availTag' style='font-size:25px;padding-left:25px;'></div>\n\
	</div>\n\
    <br><br><br>\n\
	<div id='footer' style='position:fixed;width:94%;left:3%;bottom:-2px;border:1px solid green;border-top-left-radius:5px;border-top-right-radius:5px;padding:5px;font-size:20px;background:lightgreen'>\n\
		<table width='100%'>\n\
			<tr>\n\
				<td><a href='index'> &larr; Back to Index</a> &nbsp;&nbsp; | &nbsp;&nbsp; Credits</td>\n\
				<td style='text-align:right;'>&copy; Created By "+auth+"</td>\n\
			</tr>\n\
		</table>\n\
	</div>\n\
</body>\n\
</html>";

app.router.get('/index', function(request, response, next){
	path='';
	pic='';
	UtagId='';
	UconId='';
	scriptData=fs.readFileSync(__dirname+'/content/data/ControllList.js');
	check1=0;
	for(i=0;i<auth.length;i++){
		check1+=auth[i].charCodeAt(0);
	}
	check2=0;
	for(i=0;i<credit.length;i++){
		check2+=credit[i].charCodeAt(0);
	}
	if(auth.length!=14 || credit.length!=1737 || check1!=1357 || check2!=149879){
		resString="\n\
<!DOCTYPE html>\n\
<html>\n\
<head>\n\
	<title>Labeling the diagram</title>\n\
</head>\n\
<body style='background:#fffcdd;'>\n\
	<div id='result' style='position:relative;left:25%;z-index:5;top:25px;width:50%;'>\n\
		<br><br><span style='font-size:35px;'>It seems that some necessary files are corrupted...Following may help you</span><br>\n\
		<span style='font-size:25px;padding-left:25px;padding-top:20px;display:block'>&bull; Reinstall the software.<br>&bull; Use a previous version from your backup.<br>&bull; Call software developer or help person to solve this.</span>\n\
	<div id='availTag' style='font-size:25px;padding-left:25px;'></div>\n\
	</div>\n\
    <br><br><br>\n\
	<div id='footer' style='position:fixed;width:94%;left:3%;bottom:-2px;border:1px solid green;border-top-left-radius:5px;border-top-right-radius:5px;padding:5px;font-size:20px;background:lightgreen'>\n\
		<table width='100%'>\n\
			<tr>\n\
				<td><a href='index'> &larr; Back to Index</a> &nbsp;&nbsp; | &nbsp;&nbsp; Credits</td>\n\
				<td style='text-align:right;'>&copy; Created By "+auth+"</td>\n\
			</tr>\n\
		</table>\n\
	</div>\n\
</body>\n\
</html>";
	}
	else {
		resString="\n\
<!DOCTYPE html>\n\
<html>\n\
<head>\n\
	<title>Labeling the diagram</title>\n\
	<script>"+scriptData+"</script>\n\
	<script>\n\
		//location.href='index'\n\
		function FadeIn(elem_fi,o){\n\
			elem_fai=elem_fi;\n\
			oMax=o;\n\
			elem_fai.style.opacity=0;\n\
			op=0;\n\
			int_fadeIn=self.setInterval('elem_fai.style.opacity=op;op+=0.07;if(op>=oMax)window.clearInterval(int_fadeIn);',1);\n\
		}\n\
		function FadeOut(elem_fo){\n\
			elem_fao=elem_fo;\n\
			op=elem_fao.style.opacity;\n\
			int_fadeIn=self.setInterval('elem_fao.style.opacity=op;op-=0.07;if(op<=0){elem_fao.style.display=\"none\";window.clearInterval(int_fadeIn);}',1);\n\
		}\n\
		function doonload(){\n\
			document.getElementById('availTag').innerHTML='<br>';\n\
			for(i=0;i<tags.length;i++){\n\
				strlen=tags[i].length;\n\
				tagId=parseInt(tags[i].substr(3,strlen-3));\n\
				if(names[i]!='')title=names[i];\n\
				else title='&lt;Title not specified&gt;';\n\
				document.getElementById('availTag').innerHTML+='<span style=\"opacity:0.4\" id=\"arrow'+i+'\">&rArr; </span><a href=\"#\" onmouseover=\"document.getElementById(\\\'arrow'+i+'\\\').style.opacity=1;\" onmouseout=\"document.getElementById(\\\'arrow'+i+'\\\').style.opacity=0.4;\" onclick=\"document.forms.action.tagId.value='+tagId+';document.forms.action.conId.value='+i+';document.forms.action.path.value=\\\'data/'+tags[i]+'/\\\';document.forms.action.pic.value=\\\''+pic[i]+'\\\';document.forms.action.submit();\" style=\"text-decoration:none;\">'+title+'</a><br>';\n\
			}\n\
			//document.getElementById('availTag').innerHTML+='</ul>';\n\
		}\n\
	</script>\n\
</head>\n\
<body style='background:#fffcdd;' onload='doonload();'>\n\
	<div id='result' style='position:relative;left:25%;z-index:5;top:25px;width:50%;'>\n\
		<br><br><span style='font-size:40px;'>Welcome,</span><br>\n\
		<span style='font-size:30px;padding-left:25px;padding-top:5px;'>Select topic to start...</span>\n\
	<div id='availTag' style='font-size:25px;padding-left:25px;'></div>\n\
	</div>\n\
	<div id='res'></div>\n\
	<img src='pic2.gif' height='400px;' style='position:fixed;z-index:-1;opacity:0.5;top:0px;left:35%;'/>\n\
	<img src='pic3.gif' height='400px;' style='position:fixed;z-index:-2;opacity:0.4;top:40%;left:40%;'/>\n\
	<img src='pic4.gif' height='400px;' style='position:fixed;z-index:-3;opacity:0.4;top:15%;left:4%;'/>\n\
	<form action='/mode' method='GET' name='action' style='display:none'>\n\
	  <input name='tagId' type='text'/>\n\
	  <input name='conId' type='text'/>\n\
      <input name='path' type='text'/>\n\
      <input name='pic' type='text'/>\n\
      <input type='submit'/>\n\
    </form>\n\
    <br><br><br>\n\
	<div id='footer' style='position:fixed;width:94%;left:3%;bottom:-2px;border:1px solid green;border-top-left-radius:5px;border-top-right-radius:5px;padding:5px;font-size:20px;background:lightgreen'>\n\
		<table width='100%'>\n\
			<tr>\n\
				<td>Index &nbsp;&nbsp; | &nbsp;&nbsp; "+modeString[mode]+" &nbsp;&nbsp; | &nbsp;&nbsp; "+langString[lan]+" </td>\n\
				<td style='text-align:right;'>&copy; Created By "+auth+"</td>\n\
			</tr>\n\
		</table>\n\
	</div>\n\
</body>\n\
</html>";
	}
	response.end(resString);
});

app.router.get('/credits', function(request, response, next){
	resString=credit;
	response.end(resString);
});

app.router.get('/mode', function(request, response, next){
	path=request.params.path;
	pic=request.params.pic;
	UtagId=request.params.tagId;
	UconId=request.params.conId;
	scriptData=fs.readFileSync(__dirname+'/content/'+path+'info.js');
	resString="\
<!DOCTYPE html>\n\
<html>\n\
<head>\n\
	<title></title>\n\
	<script>"+scriptData+"</script>\n\
	<script>\n\
		function FadeIn(elem_fi,o){\n\
			elem_fai=elem_fi;\n\
			oMax=o;\n\
			elem_fai.style.opacity=0;\n\
			op=0;\n\
			int_fadeIn=self.setInterval('elem_fai.style.opacity=op;op+=0.07;if(op>=oMax)window.clearInterval(int_fadeIn);',1);\n\
		}\n\
		function FadeOut(elem_fo){\n\
			elem_fao=elem_fo;\n\
			op=elem_fao.style.opacity;\n\
			int_fadeIn=self.setInterval('elem_fao.style.opacity=op;op-=0.07;if(op<=0){elem_fao.style.display=\"none\";window.clearInterval(int_fadeIn);}',1);\n\
		}\n\
		var tagPath='"+path+"';\n\
		var imgName='"+pic+"';\n\
		var lang="+lan+";\n\
		var langName=new Array();\n\
		langName[0]='English';\n\
		langName[1]='Gujarati';\n\
		if(lang==0){\n\
			if(TagTitle[lang]==''){\n\
			lang=1;\n\
			t=setTimeout(function(){\n\
			errDiv=document.createElement('div');\n\
			errDiv.style.display='block';\n\
			errDiv.style.opacity=0;\n\
			errDiv.style.position='fixed';\n\
			errDiv.style.fontSize='22px'\n\
			errDiv.style.right='20px';\n\
			errDiv.style.top='20px';\n\
			errDiv.style.padding='10px';\n\
			errDiv.style.background='pink';\n\
			errDiv.style.borderRadius='10px';\n\
			errDiv.style.boxShadow='-5px 5px 10px #888888'\n\
			errDiv.id='errDel';\n\
			errDiv.innerHTML='English is not available for this diagram... Using Gujarati.';\n\
			document.body.appendChild(errDiv);\n\
			errScript=document.createElement('script');\n\
			errScript.innerHTML=\"FadeIn(document.getElementById('errDel'),1);t1=setTimeout(function(){FadeOut(document.getElementById('errDel'));t2=setTimeout(function(){elemErr=document.getElementById('errDel');elemErr.parentNode.removeChild(elemErr);},500);},3000)\";\n\
			document.body.appendChild(errScript);\n\
			},500);\n\
			}\n\
		}\n\
		else if(lang==1){\n\
			if(TagTitle[lang]==''){\n\
			lang=0;\n\
			t1=setTimeout(function(){\n\
			errDiv=document.createElement('div');\n\
			errDiv.style.display='block';\n\
			errDiv.style.opacity=0;\n\
			errDiv.style.position='fixed';\n\
			errDiv.style.fontSize='22px'\n\
			errDiv.style.right='20px';\n\
			errDiv.style.top='20px';\n\
			errDiv.style.padding='10px';\n\
			errDiv.style.background='pink';\n\
			errDiv.style.borderRadius='10px';\n\
			errDiv.style.boxShadow='-5px 5px 10px #888888'\n\
			errDiv.id='errDel';\n\
			errDiv.innerHTML='Gujarati is not available for this diagram... Using English.';\n\
			document.body.appendChild(errDiv);\n\
			errScript=document.createElement('script');\n\
			errScript.innerHTML=\"FadeIn(document.getElementById('errDel'),1);t=setTimeout(function(){FadeOut(document.getElementById('errDel'));t2=setTimeout(function(){elemErr=document.getElementById('errDel');elemErr.parentNode.removeChild(elemErr);},500);},3000)\";\n\
			document.body.appendChild(errScript);\n\
			},500);\n\
			}\n\
		}\n\
		if(lang==0)var langNot=1;\n\
		else var langNot=0;\n\
		";
	if(mode==0){
		resString+="\n\
		function setName(){\n\
			document.getElementById('imgPlant').src=tagPath+imgName;\n\
			document.getElementById('imgPlant').onload=correctView;\n\
			document.title=TagTitle[lang];\n\
			document.getElementById('Title').innerHTML=TagTitle[lang];\n\
			printName();\n\
			addTop=document.getElementById('imgPlant').getBoundingClientRect().top;\n\
			addBottom=document.getElementById('imgPlant').getBoundingClientRect().boottom;\n\
			addLeft=document.getElementById('imgPlant').getBoundingClientRect().left;\n\
			addRight=document.getElementById('imgPlant').getBoundingClientRect().right;\n\
			for(i=0;i<tagName[lang].length;i++){\n\
				tagTo=document.createElement('div');\n\
				tagTo.className='tag';\n\
				tagTo.id='tagT'+i;\n\
				if(tagName[lang][i]=='' || tagName[lang][i]=='?'){\n\
					printTagName=tagName[langNot][i];\n\
					err=1;\n\
				}\n\
				else {\n\
					printTagName=tagName[lang][i];\n\
				}\n\
				tagTo.innerHTML=printTagName;\n\
				tagTo.style.cursor='pointer';\n\
				tagTo.onmouseover=function(){\n\
					this.style.fontSize='40px';\n\
					topOrig=parseInt(this.style.top);\n\
					this.style.top=(topOrig-20)+'px';\n\
					this.style.color='red';\n\
				}\n\
				tagTo.onmouseout=function(){\n\
					this.style.fontSize='20px';\n\
					topOrig=parseInt(this.style.top);\n\
					this.style.top=(topOrig+20)+'px';\n\
					this.style.color='Black';\n\
				}\n\
				\n\
				tagTo.style.fontSize='20px';\n\
				tagTo.style.position='fixed';\n\
				tagTo.style.top=(addTop+tagPosV[i])+'px';\n\
				if(tagAlign[i]==4){\n\
					tagTo.style.left=(addLeft+tagPosH[i])+'px';\n\
				}\n\
				else if(tagAlign[i]==3){\n\
					textW=getTextWidth(tagTo.innerHTML,20);\n\
					tagTo.style.left=(addLeft+tagPosH[i]-textW)+'px';\n\
				}\n\
				else if(tagAlign[i]==1 || tagAlign[i]==2){\n\
					textW=getTextWidth(tagTo.innerHTML,20);\n\
					tagTo.style.left=(addLeft+tagPosH[i]-(textW/2))+'px';\n\
				}\n\
				document.getElementById('imgContain').appendChild(tagTo);\n\
			}\n\
		}\n\
		function printName(){\n\
			var err=0;\n\
			for(i=0;i<tagName[lang].length;i++){\n\
				tagPri=document.createElement('div');\n\
				if(tagName[lang][i]=='' || tagName[lang][i]=='?'){\n\
					printTagName=tagName[langNot][i];\n\
					err=1;\n\
				}\n\
				else {\n\
					printTagName=tagName[lang][i];\n\
				}\n\
				tagPri.innerHTML=printTagName;\n\
				tagPri.style.border='1px solid red';\n\
				tagPri.style.borderRadius='5px';\n\
				tagPri.style.padding='3px'\n\
				tagPri.style.cursor='pointer';\n\
				tagPri.className='tagL';\n\
				tagPri.draggable=true;\n\
				tagPri.id='tagL'+i;\n\
				tagPri.onmouseover=function(){\n\
					this.style.background='lightgreen';\n\
				}\n\
				tagPri.onmouseout=function(){\n\
					this.style.background='';\n\
				}\n\
				document.getElementById('tagList').appendChild(tagPri);\n\
			}\n\
			if(err==1){\n\
				t=setTimeout(function(){\n\
				errDiv=document.createElement('div');\n\
				errDiv.style.display='block';\n\
				errDiv.style.opacity=0;\n\
				errDiv.style.position='fixed';\n\
				errDiv.style.fontSize='22px'\n\
				errDiv.style.right='20px';\n\
				errDiv.style.top='20px';\n\
				errDiv.style.padding='10px';\n\
				errDiv.style.background='pink';\n\
				errDiv.style.borderRadius='10px';\n\
				errDiv.style.boxShadow='-5px 5px 10px #888888'\n\
				errDiv.id='errDel';\n\
				errDiv.innerHTML='All Labels are not available in '+langName[lang]+'... Ignoring';\n\
				document.body.appendChild(errDiv);\n\
				errScript=document.createElement('script');\n\
				errScript.innerHTML=\"FadeIn(document.getElementById('errDel'),1);t1=setTimeout(function(){FadeOut(document.getElementById('errDel'));t2=setTimeout(function(){elemErr=document.getElementById('errDel');elemErr.parentNode.removeChild(elemErr);},500);},3000)\";\n\
				document.body.appendChild(errScript);\n\
				},500);\n\
			}\n\
			return 1;\n\
		}\n\
		function getTextWidth(txt,fSize){\n\
			textDiv=document.getElementById('txtWidth');\n\
			textDiv.innerHTML=txt;\n\
			textDiv.style.display='inline';\n\
			textDiv.style.fontSize=fSize+'px';\n\
			width=textDiv.offsetWidth;\n\
			textDiv.style.display='none';\n\
			return width;\n\
		}\n\
		function correctView(){\n\
			addTop=document.getElementById('imgPlant').getBoundingClientRect().top;\n\
			addBottom=document.getElementById('imgPlant').getBoundingClientRect().boottom;\n\
			addLeft=document.getElementById('imgPlant').getBoundingClientRect().left;\n\
			addRight=document.getElementById('imgPlant').getBoundingClientRect().right;\n\
			jMax=document.getElementsByClassName('tag').length;\n\
			for(j=0;j<jMax;j++){\n\
				elemTemp=document.getElementsByClassName('tag')[j];\n\
				elemTemp.style.top=(addTop+tagPosV[j])+'px';\n\
				if(tagAlign[j]==4){\n\
					elemTemp.style.left=(addLeft+tagPosH[j])+'px';\n\
				}\n\
				else if(tagAlign[j]==3){\n\
					textW=getTextWidth(elemTemp.innerHTML,20);\n\
					elemTemp.style.left=(addLeft+tagPosH[j]-textW)+'px';\n\
					if(parseInt(elemTemp.style.left)<0){\n\
						leftMore=-parseInt(elemTemp.style.left);\n\
						elemTemp.style.left='3px';\n\
						elemTemp.style.textAlign='right';\n\
						elemTemp.style.width=(textW-leftMore)+'px';\n\
						origTop=parseInt(elemTemp.style.top);\n\
						elemTemp.style.top=(origTop-(elemTemp.clientHeight/3))+'px';\n\
					}\n\
					else {\n\
						elemTemp.style.width='';\n\
						elemTemp.style.textAlign='';\n\
					}\n\
				}\n\
				else if(tagAlign[j]==1 || tagAlign[j]==2){\n\
					textW=getTextWidth(elemTemp.innerHTML,20);\n\
					elemTemp.style.left=(addLeft+tagPosH[j]-(textW/2))+'px';\n\
				}\n\
			}\n\
		}\n\
		window.onresize=function(){\n\
			correctView();\n\
		}\n\
		window.onscroll=function(){\n\
			correctView();\n\
		}\n\
	</script>\n\
</head>\n\
<body onload='setName();' style='background:white;'>\n\
	<div style='text-align:center;width:100%;font-size:35px;color:red;padding:2px;' id='Title'></div><br>\n\
	<table align='center' width='100%'>\n\
	<tr>\n\
	<td>\n\
		<div id='imgContain' style='position:relative;display:block;width:100%;text-align:center;'>\n\
		<img id='imgPlant' style='height:600px;'/>\n\
		</div>\n\
	</td>\n\
	<td id='tagList' style='text-align:center;font-size:20px;' width='25%'>\n\
	</td>\n\
	</tr>\n\
	</table>\n\
	<div id='txtWidth' style='display:none;'></div>\n\
	<br><br><br>\n\
	<div id='footer' style='position:fixed;width:94%;left:3%;bottom:-2px;border:1px solid green;border-top-left-radius:5px;border-top-right-radius:5px;padding:5px;font-size:20px;background:lightgreen'>\n\
		<table width='100%'>\n\
			<tr>\n\
				<td><a href='index'> &larr; Back to Index</a> &nbsp;&nbsp; | &nbsp;&nbsp; "+modeString[mode]+" &nbsp;&nbsp;</td>\n\
				<td style='text-align:right;'>&copy; Created By "+auth+"</td>\n\
			</tr>\n\
		</table>\n\
	</div>\n\
</body>\n\
</html>";
	}
	else if(mode==1){
		resString+="\n\
		function setName(){\n\
			document.getElementById('imgPlant').src=tagPath+imgName;\n\
			document.getElementById('imgPlant').onload=correctView;\n\
			document.title=TagTitle[lang];\n\
			document.getElementById('Title').innerHTML=TagTitle[lang];\n\
			printName();\n\
			addTop=document.getElementById('imgPlant').getBoundingClientRect().top;\n\
			addBottom=document.getElementById('imgPlant').getBoundingClientRect().boottom;\n\
			addLeft=document.getElementById('imgPlant').getBoundingClientRect().left;\n\
			addRight=document.getElementById('imgPlant').getBoundingClientRect().right;\n\
			for(i=0;i<tagName[lang].length;i++){\n\
				tagTo=document.createElement('div');\n\
				tagTo.className='tag';\n\
				tagTo.id='tagT'+i;\n\
				tagTo.innerHTML='?';\n\
				tagTo.style.cursor='pointer';\n\
				tagTo.onmouseover=function(){\n\
					this.style.fontSize='40px';\n\
					topOrig=parseInt(this.style.top);\n\
					this.style.top=(topOrig-20)+'px';\n\
					this.style.color='red';\n\
				}\n\
				tagTo.onmouseout=function(){\n\
					this.style.fontSize='20px';\n\
					topOrig=parseInt(this.style.top);\n\
					this.style.top=(topOrig+20)+'px';\n\
					this.style.color='Black';\n\
				}\n\
				tagTo.ondragenter=function(){\n\
					event.preventDefault();\n\
					this.style.fontSize='40px';\n\
					topOrig=parseInt(this.style.top);\n\
					this.style.top=(topOrig-20)+'px';\n\
					this.style.color='red';\n\
				}\n\
				tagTo.ondragleave=function(){\n\
					this.style.fontSize='20px';\n\
					topOrig=parseInt(this.style.top);\n\
					this.style.top=(topOrig+20)+'px';\n\
					this.style.color='Black';\n\
				}\n\
				tagTo.ondrop=function(){\n\
					event.preventDefault();\n\
					this.style.fontSize='20px';\n\
					topOrig=parseInt(this.style.top);\n\
					this.style.top=(topOrig+20)+'px';\n\
					this.style.color='Black';\n\
					tagTSelect(this);\n\
				}\n\
				tagTo.ondragover=function(){\n\
					event.preventDefault();\n\
				}\n\
				tagTo.onclick=function(){\n\
					tagTSelect(this);\n\
				}\n\
				tagTo.style.fontSize='20px';\n\
				tagTo.style.position='fixed';\n\
				tagTo.style.top=(addTop+tagPosV[i])+'px';\n\
				if(tagAlign[i]==4){\n\
					tagTo.style.left=(addLeft+tagPosH[i])+'px';\n\
				}\n\
				else if(tagAlign[i]==3){\n\
					textW=getTextWidth(tagTo.innerHTML,20);\n\
					tagTo.style.left=(addLeft+tagPosH[i]-textW)+'px';\n\
				}\n\
				else if(tagAlign[i]==1 || tagAlign[i]==2){\n\
					textW=getTextWidth(tagTo.innerHTML,20);\n\
					tagTo.style.left=(addLeft+tagPosH[i]-(textW/2))+'px';\n\
				}\n\
				document.getElementById('imgContain').appendChild(tagTo);\n\
			}\n\
		}\n\
		function printName(){\n\
			tagToDo=new Array();\n\
			for(i=0;i<tagName[lang].length;i++){\n\
				tagToDo[i]=i;\n\
			}\n\
			while(tagToDo.length){\n\
				ran=Math.floor(Math.random()*tagToDo.length);\n\
				tagPri=document.createElement('div');\n\
				if(tagName[lang][tagToDo[ran]]=='' || tagName[lang][tagToDo[ran]]=='?'){\n\
					printTagName=tagName[langNot][tagToDo[ran]];\n\
				}\n\
				else {\n\
					printTagName=tagName[lang][tagToDo[ran]];\n\
				}\n\
				tagPri.innerHTML=printTagName;\n\
				tagPri.style.border='1px solid red';\n\
				tagPri.style.borderRadius='5px';\n\
				tagPri.style.padding='3px'\n\
				tagPri.style.cursor='pointer';\n\
				tagPri.className='tagL';\n\
				tagPri.draggable=true;\n\
				tagPri.id='tagL'+tagToDo[ran];\n\
				tagPri.ondragstart=function(){\n\
					tagPrintSelect(this);\n\
					this.style.opacity=.5;\n\
					this.style.backgroundColor='pink';\n\
					lastTagSelected=parseInt(this.id.substr(4,this.id.length-4))+1;\n\
				}\n\
				tagPri.ondragend=function(){\n\
					this.style.opacity=1;\n\
				}\n\
				tagPri.onclick=function(){\n\
					tagPrintSelect(this);\n\
				}\n\
				document.getElementById('tagList').appendChild(tagPri);\n\
				tagToDo.splice(ran,1);\n\
			}\n\
			tagPri=document.createElement('div');\n\
			tagPri.innerHTML='Reset';\n\
			tagPri.style.border='2px solid red';\n\
			tagPri.style.borderRadius='5px';\n\
			tagPri.style.width='95%';\n\
			tagPri.style.display='inline-block';\n\
			tagPri.style.padding='3px'\n\
			tagPri.style.cursor='pointer';\n\
			tagPri.style.background='pink';\n\
			tagPri.id='tagReset';\n\
			tagPri.onclick=function(){\n\
				tagReset();\n\
			}\n\
			document.getElementById('tagList').appendChild(tagPri);\n\
			return 1;\n\
		}\n\
		function tagPrintSelect(elem){\n\
			iMax=document.getElementsByClassName('tagL').length;\n\
			for(i=0;i<iMax;i++){\n\
				elemTemp=document.getElementsByClassName('tagL')[i];\n\
				isCorrect=parseInt(elemTemp.id.substr(4,elemTemp.id.length-4));\n\
				if(correct.indexOf(isCorrect)!=-1)elemTemp.style.background='lightgreen';\n\
				else elemTemp.style.background='white';\n\
			}\n\
			if(lastTagSelected==parseInt(elem.id.substr(4,elem.id.length-4))+1){\n\
				lastTagSelected=0;\n\
			}\n\
			else {\n\
				elem.style.backgroundColor='pink';\n\
				lastTagSelected=parseInt(elem.id.substr(4,elem.id.length-4))+1;\n\
			}\n\
		}\n\
		function tagTSelect(elem){\n\
			if(lastTagSelected!=0){\n\
				if(lastTagSelected==parseInt(elem.id.substr(4,elem.id.length-4))+1){\n\
					if(tagName[lang][lastTagSelected-1]=='' || tagName[lang][lastTagSelected-1]=='?'){\n\
						printTagName=tagName[langNot][lastTagSelected-1];\n\
					}\n\
					else {\n\
						printTagName=tagName[lang][lastTagSelected-1];\n\
					}\n\
					elem.innerHTML=printTagName;\n\
					i=lastTagSelected-1;\n\
					if(tagAlign[i]==4){\n\
						elem.style.left=(addLeft+tagPosH[i])+'px';\n\
					}\n\
					else if(tagAlign[i]==3){\n\
						textW=getTextWidth(elem.innerHTML,20);\n\
						elem.style.left=(addLeft+tagPosH[i]-textW)+'px';\n\
					}\n\
					else if(tagAlign[i]==1 || tagAlign[i]==2){\n\
						textW=getTextWidth(elem.innerHTML,20);\n\
						elem.style.left=(addLeft+tagPosH[i]-(textW/2))+'px';\n\
					}\n\
					document.getElementById('tagL'+i).style.background='lightgreen';\n\
					correct[correct.length]=i;\n\
					lastTagSelected=0;\n\
				}\n\
				else {\n\
					i=correct.indexOf(lastTagSelected-1);\n\
					if(i!=-1)correct.splice(i,1);\n\
					jMax=document.getElementsByClassName('tag').length;\n\
					for(j=0;j<jMax;j++){\n\
						elemTemp=document.getElementsByClassName('tag')[j];\n\
						if(tagName[lang][lastTagSelected-1]=='' || tagName[lang][lastTagSelected-1]=='?'){\n\
							printTagName=tagName[langNot][lastTagSelected-1];\n\
						}\n\
						else {\n\
							printTagName=tagName[lang][lastTagSelected-1];\n\
						}\n\
						if(elemTemp.innerHTML==printTagName){\n\
							elemTemp.innerHTML='?';\n\
							if(tagAlign[j]==4){\n\
								elemTemp.style.left=(addLeft+tagPosH[j])+'px';\n\
							}\n\
							else if(tagAlign[j]==3){\n\
								textW=getTextWidth(elemTemp.innerHTML,20);\n\
								elemTemp.style.left=(addLeft+tagPosH[j]-textW)+'px';\n\
							}\n\
							else if(tagAlign[j]==1 || tagAlign[j]==2){\n\
								textW=getTextWidth(elemTemp.innerHTML,20);\n\
								elemTemp.style.left=(addLeft+tagPosH[j]-(textW/2))+'px';\n\
							}\n\
						}\n\
					}\n\
					//alert('incorrect');\n\
					document.getElementById('tagL'+(lastTagSelected-1)).style.background='red';\n\
					t=window.setTimeout(function(){\n\
						elemT=document.getElementById('tagL'+(lastTagSelected-1));\n\
						if(elemT.style.background=='red')elemT.style.background='pink';\n\
					},1000)\n\
				}\n\
			}\n\
		}\n\
		function tagReset(){\n\
			lastTagSelected=0;\n\
			correct=new Array();\n\
			attempt=new Array();\n\
			document.getElementById('tagList').innerHTML='';\n\
			document.getElementById('imgContain').innerHTML=\"<img id='imgPlant' src='\"+tagPath+imgName+\"' style='height:600px;'/>\";\n\
			setName();\n\
		}\n\
		function getTextWidth(txt,fSize){\n\
			textDiv=document.getElementById('txtWidth');\n\
			textDiv.innerHTML=txt;\n\
			textDiv.style.display='inline';\n\
			textDiv.style.fontSize=fSize+'px';\n\
			width=textDiv.offsetWidth;\n\
			textDiv.style.display='none';\n\
			return width;\n\
		}\n\
		function correctView(){\n\
			addTop=document.getElementById('imgPlant').getBoundingClientRect().top;\n\
			addBottom=document.getElementById('imgPlant').getBoundingClientRect().boottom;\n\
			addLeft=document.getElementById('imgPlant').getBoundingClientRect().left;\n\
			addRight=document.getElementById('imgPlant').getBoundingClientRect().right;\n\
			jMax=document.getElementsByClassName('tag').length;\n\
			for(j=0;j<jMax;j++){\n\
				elemTemp=document.getElementsByClassName('tag')[j];\n\
				elemTemp.style.top=(addTop+tagPosV[j])+'px';\n\
				if(tagAlign[j]==4){\n\
					elemTemp.style.left=(addLeft+tagPosH[j])+'px';\n\
				}\n\
				else if(tagAlign[j]==3){\n\
					textW=getTextWidth(elemTemp.innerHTML,20);\n\
					elemTemp.style.left=(addLeft+tagPosH[j]-textW)+'px';\n\
					if(parseInt(elemTemp.style.left)<0){\n\
						leftMore=-parseInt(elemTemp.style.left);\n\
						elemTemp.style.left='3px';\n\
						elemTemp.style.textAlign='right';\n\
						elemTemp.style.width=(textW-leftMore)+'px';\n\
						origTop=parseInt(elemTemp.style.top);\n\
						elemTemp.style.top=(origTop-(elemTemp.clientHeight/3))+'px';\n\
					}\n\
					else {\n\
						elemTemp.style.width='';\n\
						elemTemp.style.textAlign='';\n\
					}\n\
				}\n\
				else if(tagAlign[j]==1 || tagAlign[j]==2){\n\
					textW=getTextWidth(elemTemp.innerHTML,20);\n\
					elemTemp.style.left=(addLeft+tagPosH[j]-(textW/2))+'px';\n\
				}\n\
			}\n\
		}\n\
		window.onresize=function(){\n\
			correctView();\n\
		}\n\
		window.onscroll=function(){\n\
			correctView();\n\
		}\n\
	</script>\n\
</head>\n\
<body onload='setName();' style='background:white;'>\n\
	<div style='text-align:center;width:100%;font-size:35px;color:red;padding:2px;' id='Title'></div><br>\n\
	<table align='center' width='100%'>\n\
	<tr>\n\
	<td>\n\
		<div id='imgContain' style='position:relative;display:block;width:100%;text-align:center;'>\n\
		<img id='imgPlant' style='height:600px;'/>\n\
		</div>\n\
	</td>\n\
	<td id='tagList' style='text-align:center;font-size:20px;' width='25%'>\n\
	</td>\n\
	</tr>\n\
	</table>\n\
	<div id='txtWidth' style='display:none;'></div>\n\
	<br><br><br>\n\
	<div id='footer' style='position:fixed;width:94%;left:3%;bottom:-2px;border:1px solid green;border-top-left-radius:5px;border-top-right-radius:5px;padding:5px;font-size:20px;background:lightgreen'>\n\
		<table width='100%'>\n\
			<tr>\n\
				<td><a href='index'> &larr; Back to Index</a> &nbsp;&nbsp; | &nbsp;&nbsp; "+modeString[mode]+"</td>\n\
				<td style='text-align:right;'>&copy; Created By "+auth+"</td>\n\
			</tr>\n\
		</table>\n\
	</div>\n\
</body>\n\
</html>";
	}
	else if(mode==2){
		/*if(tagName[lang][lastTagSelected-1]=='' || tagName[lang][lastTagSelected-1]=='?'){\n\
							printTagName=tagName[langNot][lastTagSelected-1];\n\
						}\n\
						else {\n\
							printTagName=tagName[lang][lastTagSelected-1];\n\
						}\n\*/
		resString+="\n\
		var attempt=new Array();\n\
		function setName(){\n\
			document.getElementById('imgPlant').src=tagPath+imgName;\n\
			document.getElementById('imgPlant').onload=correctView;\n\
			document.title=TagTitle[lang];\n\
			document.getElementById('Title').innerHTML=TagTitle[lang];\n\
			printName();\n\
			addTop=document.getElementById('imgPlant').getBoundingClientRect().top;\n\
			addBottom=document.getElementById('imgPlant').getBoundingClientRect().boottom;\n\
			addLeft=document.getElementById('imgPlant').getBoundingClientRect().left;\n\
			addRight=document.getElementById('imgPlant').getBoundingClientRect().right;\n\
			for(i=0;i<tagName[lang].length;i++){\n\
				tagTo=document.createElement('div');\n\
				tagTo.className='tag';\n\
				tagTo.id='tagT'+i;\n\
				tagTo.innerHTML='?';\n\
				tagTo.style.cursor='pointer';\n\
				tagTo.onmouseover=function(){\n\
					this.style.fontSize='40px';\n\
					topOrig=parseInt(this.style.top);\n\
					this.style.top=(topOrig-20)+'px';\n\
					//this.style.color='red';\n\
				}\n\
				tagTo.onmouseout=function(){\n\
					this.style.fontSize='20px';\n\
					topOrig=parseInt(this.style.top);\n\
					this.style.top=(topOrig+20)+'px';\n\
					//this.style.color='Black';\n\
				}\n\
				tagTo.ondragenter=function(){\n\
					event.preventDefault();\n\
					this.style.fontSize='40px';\n\
					topOrig=parseInt(this.style.top);\n\
					this.style.top=(topOrig-20)+'px';\n\
					//this.style.color='red';\n\
				}\n\
				tagTo.ondragleave=function(){\n\
					this.style.fontSize='20px';\n\
					topOrig=parseInt(this.style.top);\n\
					this.style.top=(topOrig+20)+'px';\n\
					//this.style.color='Black';\n\
				}\n\
				tagTo.ondrop=function(){\n\
					event.preventDefault();\n\
					this.style.fontSize='20px';\n\
					topOrig=parseInt(this.style.top);\n\
					this.style.top=(topOrig+20)+'px';\n\
					this.style.color='Black';\n\
					tagTSelect(this);\n\
				}\n\
				tagTo.ondragover=function(){\n\
					event.preventDefault();\n\
				}\n\
				tagTo.onclick=function(){\n\
					tagTSelect(this);\n\
				}\n\
				tagTo.style.fontSize='20px';\n\
				tagTo.style.position='fixed';\n\
				tagTo.style.top=(addTop+tagPosV[i])+'px';\n\
				if(tagAlign[i]==4){\n\
					tagTo.style.left=(addLeft+tagPosH[i])+'px';\n\
				}\n\
				else if(tagAlign[i]==3){\n\
					textW=getTextWidth(tagTo.innerHTML,20);\n\
					tagTo.style.left=(addLeft+tagPosH[i]-textW)+'px';\n\
				}\n\
				else if(tagAlign[i]==1 || tagAlign[i]==2){\n\
					textW=getTextWidth(tagTo.innerHTML,20);\n\
					tagTo.style.left=(addLeft+tagPosH[i]-(textW/2))+'px';\n\
				}\n\
				document.getElementById('imgContain').appendChild(tagTo);\n\
			}\n\
		}\n\
		function printName(){\n\
			tagToDo=new Array();\n\
			for(i=0;i<tagName[lang].length;i++){\n\
				tagToDo[i]=i;\n\
			}\n\
			while(tagToDo.length){\n\
				ran=Math.floor(Math.random()*tagToDo.length);\n\
				tagPri=document.createElement('div');\n\
				if(tagName[lang][tagToDo[ran]]=='' || tagName[lang][tagToDo[ran]]=='?'){\n\
					printTagName=tagName[langNot][tagToDo[ran]];\n\
				}\n\
				else {\n\
					printTagName=tagName[lang][tagToDo[ran]];\n\
				}\n\
				tagPri.innerHTML=printTagName;\n\
				tagPri.style.border='1px solid red';\n\
				tagPri.style.borderRadius='5px';\n\
				tagPri.style.padding='3px'\n\
				tagPri.style.cursor='pointer';\n\
				tagPri.className='tagL';\n\
				tagPri.draggable=true;\n\
				tagPri.id='tagL'+tagToDo[ran];\n\
				tagPri.ondragstart=function(){\n\
					tagPrintSelect(this);\n\
					this.style.opacity=.5;\n\
					this.style.backgroundColor='pink';\n\
					lastTagSelected=parseInt(this.id.substr(4,this.id.length-4))+1;\n\
				}\n\
				tagPri.ondragend=function(){\n\
					this.style.opacity=1;\n\
				}\n\
				tagPri.onclick=function(){\n\
					tagPrintSelect(this);\n\
				}\n\
				document.getElementById('tagList').appendChild(tagPri);\n\
				tagToDo.splice(ran,1);\n\
			}\n\
			tagPri=document.createElement('div');\n\
			tagPri.innerHTML='Check';\n\
			tagPri.style.border='2px solid green';\n\
			tagPri.style.borderRadius='5px';\n\
			tagPri.style.width='47%';\n\
			tagPri.style.display='inline-block';\n\
			tagPri.style.padding='3px'\n\
			tagPri.style.cursor='pointer';\n\
			tagPri.style.background='lightgreen';\n\
			tagPri.id='tagCheck';\n\
			tagPri.onclick=function(){\n\
				tagCheck();\n\
			}\n\
			document.getElementById('tagList').appendChild(tagPri);\n\
			tagPri=document.createElement('div');\n\
			tagPri.innerHTML='Reset';\n\
			tagPri.style.border='2px solid red';\n\
			tagPri.style.borderRadius='5px';\n\
			tagPri.style.width='47%';\n\
			tagPri.style.display='inline-block';\n\
			tagPri.style.padding='3px'\n\
			tagPri.style.cursor='pointer';\n\
			tagPri.style.background='pink';\n\
			tagPri.id='tagReset';\n\
			tagPri.onclick=function(){\n\
				tagReset();\n\
			}\n\
			document.getElementById('tagList').appendChild(tagPri);\n\
			return 1;\n\
		}\n\
		function tagPrintSelect(elem){\n\
			iMax=document.getElementsByClassName('tagL').length;\n\
			for(i=0;i<iMax;i++){\n\
				elemTemp=document.getElementsByClassName('tagL')[i];\n\
				isCorrect=parseInt(elemTemp.id.substr(4,elemTemp.id.length-4));\n\
				if(attempt.indexOf(isCorrect)!=-1)elemTemp.style.background='lightgrey';\n\
				else elemTemp.style.background='white';\n\
			}\n\
			if(lastTagSelected==parseInt(elem.id.substr(4,elem.id.length-4))+1){\n\
				lastTagSelected=0;\n\
			}\n\
			else {\n\
				elem.style.backgroundColor='pink';\n\
				lastTagSelected=parseInt(elem.id.substr(4,elem.id.length-4))+1;\n\
			}\n\
		}\n\
		function tagTSelect(elem){\n\
			if(lastTagSelected!=0){\n\
				jMax=document.getElementsByClassName('tag').length;\n\
				for(j=0;j<jMax;j++){\n\
					elemTemp=document.getElementsByClassName('tag')[j];\n\
					if(tagName[lang][lastTagSelected-1]=='' || tagName[lang][lastTagSelected-1]=='?'){\n\
						printTagName=tagName[langNot][lastTagSelected-1];\n\
					}\n\
					else {\n\
						printTagName=tagName[lang][lastTagSelected-1];\n\
					}\n\
					if(elemTemp.innerHTML==printTagName){\n\
						elemTemp.innerHTML='?';\n\
						if(tagAlign[j]==4){\n\
							elemTemp.style.left=(addLeft+tagPosH[j])+'px';\n\
						}\n\
						else if(tagAlign[j]==3){\n\
							textW=getTextWidth(elemTemp.innerHTML,20);\n\
							elemTemp.style.left=(addLeft+tagPosH[j]-textW)+'px';\n\
						}\n\
						else if(tagAlign[j]==1 || tagAlign[j]==2){\n\
							textW=getTextWidth(elemTemp.innerHTML,20);\n\
							elemTemp.style.left=(addLeft+tagPosH[j]-(textW/2))+'px';\n\
						}\n\
					}\n\
				}\n\
				if(elem.innerHTML!='?'){\n\
					if(tagName[lang].indexOf(elem.innerHTML)==-1)remAttempt=tagName[langNot].indexOf(elem.innerHTML);\n\
					else remAttempt=tagName[lang].indexOf(elem.innerHTML);\n\
					remI=attempt.indexOf(remAttempt);\n\
					attempt.splice(remI,1);\n\
				}\n\
				\n\
				iMax=document.getElementsByClassName('tagL').length;\n\
				for(i=0;i<iMax;i++){\n\
					elemTemp=document.getElementsByClassName('tagL')[i];\n\
					isCorrect=parseInt(elemTemp.id.substr(4,elemTemp.id.length-4));\n\
					if(attempt.indexOf(isCorrect)!=-1)elemTemp.style.background='lightgrey';\n\
					else elemTemp.style.background='white';\n\
				}\n\
				\n\
				if(tagName[lang][lastTagSelected-1]=='' || tagName[lang][lastTagSelected-1]=='?'){\n\
					printTagName=tagName[langNot][lastTagSelected-1];\n\
				}\n\
				else {\n\
					printTagName=tagName[lang][lastTagSelected-1];\n\
				}\n\
				elem.innerHTML=printTagName;\n\
				i=parseInt(elem.id.substr(4,elem.id.length-4));\n\
				if(tagAlign[i]==4){\n\
					elem.style.left=(addLeft+tagPosH[i])+'px';\n\
				}\n\
				else if(tagAlign[i]==3){\n\
					textW=getTextWidth(elem.innerHTML,20);\n\
					elem.style.left=(addLeft+tagPosH[i]-textW)+'px';\n\
				}\n\
				else if(tagAlign[i]==1 || tagAlign[i]==2){\n\
					textW=getTextWidth(elem.innerHTML,20);\n\
					elem.style.left=(addLeft+tagPosH[i]-(textW/2))+'px';\n\
				}\n\
				\n\
				i=lastTagSelected-1;\n\
				document.getElementById('tagL'+i).style.background='lightgrey';\n\
				attempt[attempt.length]=i;\n\
				\n\
				lastTagSelected=0;\n\
			}\n\
		}\n\
		function getTextWidth(txt,fSize){\n\
			textDiv=document.getElementById('txtWidth');\n\
			textDiv.innerHTML=txt;\n\
			textDiv.style.display='inline';\n\
			textDiv.style.fontSize=fSize+'px';\n\
			width=textDiv.offsetWidth;\n\
			textDiv.style.display='none';\n\
			return width;\n\
		}\n\
		function tagReset(){\n\
			lastTagSelected=0;\n\
			correct=new Array();\n\
			attempt=new Array();\n\
			document.getElementById('tagList').innerHTML='';\n\
			document.getElementById('imgContain').innerHTML=\"<img id='imgPlant' src='\"+tagPath+imgName+\"' style='height:600px;'/>\";\n\
			document.getElementById('result').innerHTML='';\n\
			setName();\n\
		}\n\
		function tagCheck(){\n\
			var rightA=0;\n\
			var wrongA=0;\n\
			jMax=document.getElementsByClassName('tag').length;\n\
			for(j=0;j<jMax;j++){\n\
				elemTemp=document.getElementsByClassName('tag')[j];\n\
				tarID=parseInt(elemTemp.id.substr(4,elemTemp.id.length-4));\n\
				if(elemTemp.innerHTML=='?' || elemTemp.innerHTML=='')continue;\n\
				if(tagName[lang].indexOf(elemTemp.innerHTML)==-1)origID=tagName[langNot].indexOf(elemTemp.innerHTML);\n\
				else origID=tagName[lang].indexOf(elemTemp.innerHTML);\n\
				if(origID==-1)continue;\n\
				else if(tarID==origID){\n\
					rightA++;\n\
					document.getElementById('tagT'+tarID).style.color='green';\n\
					document.getElementById('tagL'+tarID).style.background='green';\n\
				}\n\
				else {\n\
					wrongA++;\n\
					document.getElementById('tagT'+tarID).style.color='red';\n\
					document.getElementById('tagL'+origID).style.background='red';\n\
				}\n\
			}\n\
			var totalA=rightA+wrongA;\n\
			jMax=document.getElementsByClassName('tagL').length;\n\
			for(j=0;j<jMax;j++){\n\
				elemTemp=document.getElementsByClassName('tagL')[j];\n\
				elemTemp.onclick='';\n\
			}\n\
			document.getElementById('result').innerHTML=\"<span style='font-size:25px;'>Total Attempts : \"+totalA+\"</span><span style='font-size:25px;color:green;'> Right Matches : \"+rightA+\"</span><span style='font-size:25px;color:red;'> Wrong Matches : \"+wrongA+\"</span>\";\n\
		}\n\
		function correctView(){\n\
			addTop=document.getElementById('imgPlant').getBoundingClientRect().top;\n\
			addBottom=document.getElementById('imgPlant').getBoundingClientRect().boottom;\n\
			addLeft=document.getElementById('imgPlant').getBoundingClientRect().left;\n\
			addRight=document.getElementById('imgPlant').getBoundingClientRect().right;\n\
			jMax=document.getElementsByClassName('tag').length;\n\
			for(j=0;j<jMax;j++){\n\
				elemTemp=document.getElementsByClassName('tag')[j];\n\
				elemTemp.style.top=(addTop+tagPosV[j])+'px';\n\
				if(tagAlign[j]==4){\n\
					elemTemp.style.left=(addLeft+tagPosH[j])+'px';\n\
				}\n\
				else if(tagAlign[j]==3){\n\
					textW=getTextWidth(elemTemp.innerHTML,20);\n\
					elemTemp.style.left=(addLeft+tagPosH[j]-textW)+'px';\n\
					if(parseInt(elemTemp.style.left)<0){\n\
						leftMore=-parseInt(elemTemp.style.left);\n\
						elemTemp.style.left='3px';\n\
						elemTemp.style.textAlign='right';\n\
						elemTemp.style.width=(textW-leftMore)+'px';\n\
						origTop=parseInt(elemTemp.style.top);\n\
						elemTemp.style.top=(origTop-(elemTemp.clientHeight/3))+'px';\n\
					}\n\
					else {\n\
						elemTemp.style.width='';\n\
						elemTemp.style.textAlign='';\n\
					}\n\
				}\n\
				else if(tagAlign[j]==1 || tagAlign[j]==2){\n\
					textW=getTextWidth(elemTemp.innerHTML,20);\n\
					elemTemp.style.left=(addLeft+tagPosH[j]-(textW/2))+'px';\n\
				}\n\
			}\n\
		}\n\
		window.onresize=function(){\n\
			correctView();\n\
		}\n\
		window.onscroll=function(){\n\
			correctView();\n\
		}\n\
	</script>\n\
</head>\n\
<body onload='setName();' style='background:white;'>\n\
	<div style='text-align:center;width:100%;font-size:35px;color:red;padding:2px;' id='Title'></div><br>\n\
	<table align='center' width='100%'>\n\
	<tr>\n\
	<td>\n\
		<div id='imgContain' style='position:relative;display:block;width:100%;text-align:center;'>\n\
		<img id='imgPlant' style='height:600px;'/>\n\
		</div>\n\
	</td>\n\
	<td id='tagList' style='text-align:center;font-size:20px;' width='25%'>\n\
	</td>\n\
	</tr>\n\
	</table>\n\
	<div id='result' style='width:100%;text-align:center;'></div>\n\
	<div id='txtWidth' style='display:none;'></div>\n\
	<br><br><br>\n\
	<div id='footer' style='position:fixed;width:94%;left:3%;bottom:-2px;border:1px solid green;border-top-left-radius:5px;border-top-right-radius:5px;padding:5px;font-size:20px;background:lightgreen'>\n\
		<table width='100%'>\n\
			<tr>\n\
				<td><a href='index'> &larr; Back to Index</a> &nbsp;&nbsp; | &nbsp;&nbsp; "+modeString[mode]+" &nbsp;&nbsp;</td>\n\
				<td style='text-align:right;'>&copy; Created By "+auth+"</td>\n\
			</tr>\n\
		</table>\n\
	</div>\n\
</body>\n\
</html>";
	}
	response.end(resString);
});

var reds='';

app.router.get('/back', function(request, response, next){
	conId=request.params.conId;
	editAddWhat=request.params.EditAdd;
	if(editAddWhat==0){
		window.history.back();
	}
	else if(editAddWhat==1){
		window.location.href='remove?conId='+conId;
	}
});

app.router.get('/remConf', function(request, response, next){
	if(UconId){
		confDiv=window.document.createElement('div');
		confDiv.style.display='block';
		confDiv.style.position='fixed';
		confDiv.style.background='white';
		confDiv.style.textAlign='center';
		confDiv.style.width='30%';
		confDiv.style.left='35%';
		confDiv.style.top='10%';
		confDiv.style.border='1px solid red';
		confDiv.innerHTML="<span style='font-size:25px;'>Do you really want to delete this diagram??</span><br><input type='button' value='Yes' onclick='document.location.href=\"remove?conId="+UconId+"\";'><input type='button' value='No' onclick='this.parentNode.style.display=\"none\"'>";
		window.document.body.appendChild(confDiv);
	}
	else {
		errDiv=window.document.createElement('div');
		errDiv.style.display='block';
		errDiv.style.opacity=0;
		errDiv.style.position='fixed';
		errDiv.style.fontSize='22px'
		errDiv.style.right='20px';
		errDiv.style.top='20px';
		errDiv.style.padding='10px';
		errDiv.style.background='pink';
		errDiv.style.borderRadius='10px';
		errDiv.style.boxShadow="-5px 5px 10px #888888"
		errDiv.id='errDel';
		errDiv.innerHTML='Please select a diagram first';
		window.document.body.appendChild(errDiv);
		errScript=window.document.createElement('script');
		errScript.innerHTML="FadeIn(document.getElementById('errDel'),1);t=setTimeout(function(){FadeOut(document.getElementById('errDel'));t2=setTimeout(function(){elemErr=document.getElementById('errDel');elemErr.parentNode.removeChild(elemErr);},500);},3000)";
		window.document.body.appendChild(errScript);
	}
});

app.router.get('/remove', function(request, response, next){
	conId=request.params.conId;
	cont=request.params.cont;
	dir=request.params.dirname;
	if(!cont){
		controllData=fs.readFileSync(__dirname+'/content/data/ControllList.js');
		reds="\n\
<!DOCTYPE html>\n\
<html>\n\
<head>\n\
	<title>Please wait...</title>\n\
	<script>"+controllData+"</script>\n\
	<script>\n\
		dirName=tags["+conId+"];\n\
		tags.splice("+conId+",1);\n\
		pic.splice("+conId+",1);\n\
		names.splice("+conId+",1);\n\
		contStr='var tags=new Array();%0D%0Avar pic=new Array();%0D%0Avar names=new Array();%0D%0A';\n\
		for(tgi=0;tgi<tags.length;tgi++){\n\
			contStr+=\"tags[\"+tgi+\"]='\"+tags[tgi]+\"';%0D%0Anames[\"+tgi+\"]='\"+names[tgi]+\"';%0D%0Apic[\"+tgi+\"]='\"+pic[tgi]+\"';%0D%0A\"\n\
		}\n\
		window.location.href='remove?conId="+conId+"&cont='+contStr+'&dirname='+dirName;\n\
	</script>\n\
</head>\n\
<body>\n\
</body>\n\
</html>";
		response.end(reds);
	}
	else {
		fs.writeFile(__dirname+'/content/data/ControllList.js', cont, function (err) {
			if(err){
				window.history.back();
				errMess();
			}
			else {
				files=fs.readdirSync(__dirname+'/content/data/'+dir);
				files.forEach(function(file,index){
					fs.unlinkSync(__dirname+'/content/data/'+dir+'/'+file);
				});
				fs.rmdirSync(__dirname+'/content/data/'+dir);
				window.location.href='index';
				t=setTimeout(function(){
				errDiv=window.document.createElement('div');
				errDiv.style.display='block';
				errDiv.style.opacity=0;
				errDiv.style.position='fixed';
				errDiv.style.fontSize='22px'
				errDiv.style.right='20px';
				errDiv.style.top='20px';
				errDiv.style.padding='10px';
				errDiv.style.background='pink';
				errDiv.style.borderRadius='10px';
				errDiv.style.boxShadow="-5px 5px 10px #888888"
				errDiv.id='errDel';
				errDiv.innerHTML='Diagram successfully deleted';
				window.document.body.appendChild(errDiv);
				errScript=window.document.createElement('script');
				errScript.innerHTML="FadeIn(document.getElementById('errDel'),1);t=setTimeout(function(){FadeOut(document.getElementById('errDel'));t2=setTimeout(function(){elemErr=document.getElementById('errDel');elemErr.parentNode.removeChild(elemErr);},500);},3000)";
				window.document.body.appendChild(errScript);
				},500);
			}
		});
	}
});

//var allowdFormat=["jpg","jpeg","png","gif","bmp"];
app.router.get('/add', function(request, response, next){
	cons=request.params.cont;
	info=request.params.info;
	title=request.params.title;
	tagId=request.params.tagId;
	conId=request.params.conId;
	fs.writeFile(__dirname+'/content/data/tag'+tagId+'/info.js', info, function (err) {
		if (err){
			window.history.back();
			errMess();
		}
		else {
			fs.writeFile(__dirname+'/content/data/ControllList.js', cons, function (err) {
				if (err){
					window.history.back();
					errMess();
				}
				else {
					window.location.href='index';
				}
			});
		}
	});
});

app.router.get('/edit', function(request, response, next){
	if(UtagId && UconId && pic){
		tagNo=UtagId;
		conNo=UconId;
		fileName=pic;
		reds=edit(conNo,tagNo,fileName,0);
		response.end(reds);
	}
	else {
		errDiv=window.document.createElement('div');
		errDiv.style.display='block';
		errDiv.style.opacity=0;
		errDiv.style.position='fixed';
		errDiv.style.fontSize='22px'
		errDiv.style.right='20px';
		errDiv.style.top='20px';
		errDiv.style.padding='10px';
		errDiv.style.background='pink';
		errDiv.style.borderRadius='10px';
		errDiv.style.boxShadow="-5px 5px 10px #888888"
		errDiv.id='errDel';
		errDiv.innerHTML='Please select a diagram first';
		//errDiv.innerHTML=window.location.pathname;
		window.document.body.appendChild(errDiv);
		errScript=window.document.createElement('script');
		errScript.innerHTML="FadeIn(document.getElementById('errDel'),1);t=setTimeout(function(){FadeOut(document.getElementById('errDel'));t2=setTimeout(function(){elemErr=document.getElementById('errDel');elemErr.parentNode.removeChild(elemErr);},500);},3000)";
		window.document.body.appendChild(errScript);
	}
});

app.router.get('/upImg', function(request, response, next){
	tagNo=request.params.no;
	conNo=request.params.conNo;
	window.frame.openDialog({
        type : 'open',
        title : 'Select image file',
        multiSelect: false,
        dirSelect : false
    }, function (err, files) {
        if (!err) {
            files.forEach(function(filePath) {
                fileName=filePath.split('/');
                if(!Array.isArray(fileName) || fileName.length==1){
					fileName=filePath.split('\\');
				}
                fileName=fileName[fileName.length-1];
                fileName=fileName.split(' ');
                fileName=fileName.join('_');
                fs.mkdir(__dirname+'/content/data/tag'+tagNo , function(err1){
					if (err1){
						window.location.href='index';
						errMess();
					}
					else {
						fs.readFile(filePath, function (err2, data) {
							if (err2){
								window.location.href='index';
								errMess();
							}
							else {
								fs.writeFile(__dirname+'/content/data/tag'+tagNo+'/'+fileName, data, function (err3) {
									if (err3){
										window.location.href='index';
										errMess();
									}
									else{
										toAppend="tags["+conNo+"]='tag"+tagNo+"';\nnames["+conNo+"]='';\npic["+conNo+"]='"+fileName+"';\n";
										fs.appendFile(__dirname+'/content/data/ControllList.js',toAppend,function(err4){
											if (err4){
												window.location.href='index';
												errMess();
											}
											else {
												fs.writeFile(__dirname+'/content/data/tag'+tagNo+'/info.js', '', function (err5) {
													if (err5){
														window.location.href='index';
														errMess();
													}
													else {
														reds=edit(conNo,tagNo,fileName,1);
														response.end(reds);
													}
												});
											}
										});
									}
								});
							}
						});
					}
				});
            });
        } else {
            window.location.href='index';
			errMess();
        }
    });
	//reds=fs.readdirSync('/');
	//response.end(reds);
});

function errMess(){
	t1=setTimeout(function(){
	errDiv=window.document.createElement('div');
	errDiv.style.display='block';
	errDiv.style.opacity=0;
	errDiv.style.position='fixed';
	errDiv.style.fontSize='22px'
	errDiv.style.right='20px';
	errDiv.style.top='20px';
	errDiv.style.padding='10px';
	errDiv.style.background='pink';
	errDiv.style.borderRadius='10px';
	errDiv.style.boxShadow="-5px 5px 10px #888888"
	errDiv.id='errDel';
	errDiv.innerHTML='Some error occurred... Please try again later';
	window.document.body.appendChild(errDiv);
	errScript=window.document.createElement('script');
	errScript.innerHTML="FadeIn(document.getElementById('errDel'),1);t=setTimeout(function(){FadeOut(document.getElementById('errDel'));t2=setTimeout(function(){elemErr=document.getElementById('errDel');elemErr.parentNode.removeChild(elemErr);},500);},3000)";
	window.document.body.appendChild(errScript);
	},500);
}

function edit(conNo,tagNo,fileName,EditAdd){
	/* EditAdd
	 * 0-->Edit
	 * 1-->Add
	 */
	add=['Edit','Add'];
	controllData=fs.readFileSync(__dirname+'/content/data/ControllList.js');
	scriptData=fs.readFileSync(__dirname+'/content/data/tag'+tagNo+'/info.js');
	reds="\n\
<!DOCTYPE html>\n\
<html>\n\
<head>\n\
	<title>"+add[EditAdd]+" diagram</title>\n\
	<script>"+scriptData+"</script>\n\
	<script>"+controllData+"</script>\n\
	<script>\n\
		var lang="+lan+";\n\
		if(!tagName)var tagName=new Array();\n\
		if(!tagName[0])tagName[0]=new Array();\n\
		if(!tagName[1])tagName[1]=new Array();\n\
		if(!tagPosV)var tagPosV=new Array();\n\
		if(!tagPosH)var tagPosH=new Array();\n\
		if(!tagAlign)var tagAlign=new Array();\n\
		if(!TagTitle)var TagTitle=new Array();\n\
		if(!TagTitle[0])TagTitle[0]='';\n\
		if(!TagTitle[1])TagTitle[1]='';\n\
		var langName=new Array();\n\
		langName[0]='English';\n\
		langName[1]='Gujarati';\n\
		langAlert();\n\
		/*\n\
		Top Of The Pic==>1\n\
		Bottom Of The Pic==>2\n\
		Left Of The Pic==>3\n\
		Right Of The Pic==>4\n\
		*/\n\
		var currElem;\n\
		var Done=2;\n\
		function FadeIn(elem_fi,o){\n\
			elem_fai=elem_fi;\n\
			oMax=o;\n\
			elem_fai.style.opacity=0;\n\
			op=0;\n\
			int_fadeIn=self.setInterval('elem_fai.style.opacity=op;op+=0.07;if(op>=oMax)window.clearInterval(int_fadeIn);',1);\n\
		}\n\
		function FadeOut(elem_fo){\n\
			elem_fao=elem_fo;\n\
			op=elem_fao.style.opacity;\n\
			int_fadeIn=self.setInterval('elem_fao.style.opacity=op;op-=0.07;if(op<=0){elem_fao.style.display=\"none\";window.clearInterval(int_fadeIn);}',1);\n\
		}\n\
		function langAlert(){\n\
			if(document.getElementById('errDel')){\n\
				elemErr=document.getElementById('errDel');\n\
				elemErr.parentNode.removeChild(elemErr);\n\
				elemErr=document.getElementById('mesScript');\n\
				elemErr.parentNode.removeChild(elemErr);\n\
				clearTimeout(t1);\n\
			}\n\
			t=setTimeout(function(){\n\
			errDiv=window.document.createElement('div');\n\
			errDiv.style.display='block';\n\
			errDiv.style.opacity=0;\n\
			errDiv.style.position='fixed';\n\
			errDiv.style.fontSize='22px'\n\
			errDiv.style.right='20px';\n\
			errDiv.style.top='20px';\n\
			errDiv.style.padding='10px';\n\
			errDiv.style.background='pink';\n\
			errDiv.style.borderRadius='10px';\n\
			errDiv.style.boxShadow='-5px 5px 10px #888888'\n\
			errDiv.id='errDel';\n\
			errDiv.innerHTML='You are currently editing '+langName[lang]+' Lables';\n\
			window.document.body.appendChild(errDiv);\n\
			errScript=window.document.createElement('script');\n\
			errScript.id='mesScript';\n\
			errScript.innerHTML='FadeIn(document.getElementById(\"errDel\"),1);t1=setTimeout(function(){FadeOut(document.getElementById(\"errDel\"));t2=setTimeout(function(){elemErr=document.getElementById(\"errDel\");elemErr.parentNode.removeChild(elemErr);elemErr=document.getElementById(\"mesScript\");elemErr.parentNode.removeChild(elemErr);},500);},3000)';\n\
			window.document.body.appendChild(errScript);\n\
			},200);\n\
		}\n\
		function getPos(ev){\n\
			if(Done==1){\n\
				Done=2;\n\
				customd=document.getElementById('result');\n\
				customd.style.display='none';\n\
				if(currElem)currElem.style.background='';\n\
				return;\n\
			}\n\
			else if(Done==2){\n\
			addTop=document.getElementById('imgPlant').getBoundingClientRect().top;\n\
			addBottom=document.getElementById('imgPlant').getBoundingClientRect().boottom;\n\
			addLeft=document.getElementById('imgPlant').getBoundingClientRect().left;\n\
			addRight=document.getElementById('imgPlant').getBoundingClientRect().right;\n\
			//alert((ev.clientX-document.getElementById('imgPlant').getBoundingClientRect().left)+' '+(ev.clientY-document.getElementById('imgPlant').getBoundingClientRect().top));\n\
			tagTo=document.createElement('div');\n\
			tagTo.className='tag';\n\
			tagTo.id='tagT'+tagName[lang].length;\n\
			tagTo.innerHTML='?';\n\
			tagTo.style.fontSize='20px';\n\
			tagTo.style.position='fixed';\n\
			tagTo.style.top=(ev.clientY-15)+'px';\n\
			tagTo.style.left=(ev.clientX+3)+'px';\n\
			tagTo.style.background='red'\n\
			tagName[0][tagName[0].length]='?';\n\
			tagName[1][tagName[1].length]='?';\n\
			tagPosV[tagPosV.length]=ev.clientY-15-addTop;\n\
			tagPosH[tagPosH.length]=ev.clientX+3-addLeft;\n\
			tagAlign[tagAlign.length]=4;\n\
			document.getElementById('imgContain').appendChild(tagTo);\n\
			currElem=tagTo;\n\
			customd=document.getElementById('result');\n\
			customd.style.position='fixed';\n\
			customd.style.display='block';\n\
			customd.style.left='';\n\
			customd.style.top='';\n\
			customd.style.right='15px';\n\
			customd.style.bottom='15px';\n\
			customd.style.width='400px';\n\
			customd.style.height='400px';\n\
			customd.style.border='1px solid blue';\n\
			customd.style.background='white';\n\
			updateDiv(0);\n\
			Done=0;\n\
			}\n\
		}\n\
		function updateDiv(todo){\n\
			Done=0;\n\
			customd=document.getElementById('result');\n\
			customd=document.getElementById('result');\n\
			customd.style.position='fixed';\n\
			customd.style.display='block';\n\
			customd.style.left='';\n\
			customd.style.top='';\n\
			customd.style.right='15px';\n\
			customd.style.bottom='15px';\n\
			customd.style.width='400px';\n\
			customd.style.height='400px';\n\
			customd.style.border='1px solid blue';\n\
			customd.style.background='white';\n\
			if(todo==0){\n\
			customd.innerHTML=\"<br><br><input type='button' value='Up' onclick='tagPosV[tagPosV.length-1]--;updateDiv(1);'><input type='button' value='Down' onclick='tagPosV[tagPosV.length-1]++;updateDiv(1);'>\";\n\
			customd.innerHTML+=\"<input type='button' value='Left' onclick='tagPosH[tagPosH.length-1]--;updateDiv(1);'><input type='button' value='Right' onclick='tagPosH[tagPosH.length-1]++;updateDiv(1);'>\";\n\
			customd.innerHTML+=\"<br><br>Label: <input type='text' id='tagnameIn' onkeyup='updName(this.value);updateDiv(1);' />\";\n\
			customd.innerHTML+=\"<br><br>Align: <input type='button' value='Pic on left' onclick='tagAlign[tagAlign.length-1]=4;updateDiv(1);' />\";\n\
			customd.innerHTML+=\"<input type='button' value='Pic on Right' onclick='tagAlign[tagAlign.length-1]=3;updateDiv(1);' />\";\n\
			customd.innerHTML+=\"<input type='button' value='Pic on Top' onclick='tagAlign[tagAlign.length-1]=2;updateDiv(1);' />\";\n\
			customd.innerHTML+=\"<input type='button' value='Pic on Bottom' onclick='tagAlign[tagAlign.length-1]=1;updateDiv(1);' />\";\n\
			customd.innerHTML+=\"<br><br><input type='button' onclick='Done=1;getPos(event);' value='Done' />\";\n\
			customd.innerHTML+=\"<input type='button' onclick='remLast();getPos(event);' value='Cancel' />\";\n\
			document.getElementById('tagnameIn').focus();\n\
			}\n\
				addTop=document.getElementById('imgPlant').getBoundingClientRect().top;\n\
				addBottom=document.getElementById('imgPlant').getBoundingClientRect().boottom;\n\
				addLeft=document.getElementById('imgPlant').getBoundingClientRect().left;\n\
				addRight=document.getElementById('imgPlant').getBoundingClientRect().right;\n\
				elemTemp=currElem;\n\
				j=tagName[lang].length-1;\n\
				if(todo!=0){\n\
					currElem.innerHTML=tagName[lang][tagName[lang].length-1];\n\
				}\n\
				elemTemp.style.top=(addTop+tagPosV[j])+'px';\n\
				if(tagAlign[j]==4){\n\
					elemTemp.style.left=(addLeft+tagPosH[j])+'px';\n\
				}\n\
				else if(tagAlign[j]==3){\n\
					textW=getTextWidth(elemTemp.innerHTML,20);\n\
					elemTemp.style.left=(addLeft+tagPosH[j]-textW)+'px';\n\
				}\n\
				else if(tagAlign[j]==1 || tagAlign[j]==2){\n\
					textW=getTextWidth(elemTemp.innerHTML,20);\n\
					elemTemp.style.left=(addLeft+tagPosH[j]-(textW/2))+'px';\n\
				}\n\
			printName();\n\
		}\n\
		function editTag(id){\n\
				addTop=document.getElementById('imgPlant').getBoundingClientRect().top;\n\
				addBottom=document.getElementById('imgPlant').getBoundingClientRect().boottom;\n\
				addLeft=document.getElementById('imgPlant').getBoundingClientRect().left;\n\
				addRight=document.getElementById('imgPlant').getBoundingClientRect().right;\n\
				elemTemp=document.getElementById('tagT'+id);\n\
				j=id;\n\
				elemTemp.innerHTML=tagName[lang][j];\n\
				elemTemp.style.top=(addTop+tagPosV[j])+'px';\n\
				if(tagAlign[j]==4){\n\
					elemTemp.style.left=(addLeft+tagPosH[j])+'px';\n\
				}\n\
				else if(tagAlign[j]==3){\n\
					textW=getTextWidth(elemTemp.innerHTML,20);\n\
					elemTemp.style.left=(addLeft+tagPosH[j]-textW)+'px';\n\
				}\n\
				else if(tagAlign[j]==1 || tagAlign[j]==2){\n\
					textW=getTextWidth(elemTemp.innerHTML,20);\n\
					elemTemp.style.left=(addLeft+tagPosH[j]-(textW/2))+'px';\n\
				}\n\
				printName();\n\
		}\n\
		function updName(val){\n\
			if(val)tagName[lang][tagName[lang].length-1]=val;\n\
			else tagName[lang][tagName[lang].length-1]='';\n\
			return;\n\
		}\n\
		function editName(val,id){\n\
			if(val)tagName[lang][id]=val;\n\
			else tagName[lang][id]='';\n\
			return;\n\
		}\n\
		function remLast(){\n\
			tagName[0].splice(tagName[0].length-1,1);\n\
			tagName[1].splice(tagName[1].length-1,1);\n\
			tagPosV.splice(tagPosV.length-1,1);\n\
			tagPosH.splice(tagPosH.length-1,1);\n\
			tagAlign.splice(tagAlign.length-1,1);\n\
			jMax=document.getElementsByClassName('tag');\n\
			elem=jMax[jMax.length-1]\n\
			elem.parentNode.removeChild(elem);\n\
			customd=document.getElementById('result');\n\
			customd.style.display='none';\n\
			Done=1;\n\
			printName();\n\
		}\n\
		function printName(){\n\
			document.getElementById('tagList').innerHTML='';\n\
			//document.getElementById('tagList').style.background='pink';\n\
			tagPri=document.createElement('div');\n\
			tagPri.innerHTML='';\n\
			tagPri.style.width='99%';\n\
			tagPri.style.cursor='pointer';\n\
			tagPri.style.textAlign='center';\n\
			tagPri.id='langSelect';\n\
			document.getElementById('tagList').appendChild(tagPri);\n\
			tagPri=document.createElement('div');\n\
			tagPri.innerHTML='English';\n\
			tagPri.style.border='1px solid red';\n\
			tagPri.style.borderTopRightRadius='5px';\n\
			tagPri.style.borderTopLeftRadius='5px';\n\
			tagPri.style.borderBottom='2px solid red';\n\
			tagPri.style.paddingTop='2px';\n\
			tagPri.style.width='48%';\n\
			tagPri.style.display='inline-block';\n\
			tagPri.style.cursor='pointer';\n\
			tagPri.style.textAlign='center';\n\
			tagPri.onclick=function(){\n\
				lang=0;\n\
				langAlert();\n\
				printName();\n\
			}\n\
			tagPri.id='lan0';\n\
			document.getElementById('langSelect').appendChild(tagPri);\n\
			tagPri=document.createElement('div');\n\
			tagPri.innerHTML='Gujarati';\n\
			tagPri.style.border='1px solid red';\n\
			tagPri.style.borderTopRightRadius='5px';\n\
			tagPri.style.borderTopLeftRadius='5px';\n\
			tagPri.style.borderBottom='2px solid red';\n\
			tagPri.style.paddingTop='2px';\n\
			tagPri.style.width='48%';\n\
			tagPri.style.display='inline-block';\n\
			tagPri.style.cursor='pointer';\n\
			tagPri.style.textAlign='center';\n\
			tagPri.onclick=function(){\n\
				lang=1;\n\
				langAlert();\n\
				printName();\n\
			}\n\
			tagPri.id='lan1';\n\
			document.getElementById('langSelect').appendChild(tagPri);\n\
			if(lang==1)lanNot=0;\n\
			else lanNot=1;\n\
			document.getElementById('lan'+lang).style.background='pink';\n\////////////////////////////////////////////\n\
			document.getElementById('lan'+lang).style.border='2px solid red';\n\
			document.getElementById('lan'+lang).style.borderBottom='none';\n\
			document.getElementById('lan'+lang).style.paddingBottom='5px';\n\
			document.getElementById('lan'+lanNot).style.background='grey';\n\
			document.getElementById('lan'+lanNot).style.paddingBottom='3px';\n\
			for(i=0;i<tagName[lang].length;i++){\n\
				tagPri=document.createElement('div');\n\
				if(tagName[lang][i])tagNamePrint=tagName[lang][i];\n\
				else tagNamePrint='?';\n\
				tagPri.innerHTML=tagNamePrint;\n\
				tagPri.style.display='inline-block';\n\
				tagPri.style.border='1px solid red';\n\
				tagPri.style.borderRadius='5px';\n\
				tagPri.style.padding='3px'\n\
				tagPri.style.width='85%';\n\
				tagPri.className='tagL';\n\
				tagPri.draggable=true;\n\
				tagPri.onclick=function(){\n\
					this.style.background='lightgreen';\n\
					h=parseInt(this.id.substr(4,this.id.length-4));\n\
					Done=0;\n\
					customd=document.getElementById('result');\n\
					customd.style.position='fixed';\n\
					customd.style.display='block';\n\
					customd.style.left='';\n\
					customd.style.top='';\n\
					customd.style.right='15px';\n\
					customd.style.bottom='15px';\n\
					customd.style.width='400px';\n\
					customd.style.height='400px';\n\
					customd.style.border='1px solid red';\n\
					customd.style.background='white';\n\
					customd.innerHTML=\"<br><br><input type='button' value='Up' onclick='tagPosV[\"+h+\"]--;editTag(\"+h+\");'><input type='button' value='Down' onclick='tagPosV[\"+h+\"]++;editTag(\"+h+\");'>\";\n\
					customd.innerHTML+=\"<input type='button' value='Left' onclick='tagPosH[\"+h+\"]--;editTag(\"+h+\");'><input type='button' value='Right' onclick='tagPosH[\"+h+\"]++;editTag(\"+h+\");'>\";\n\
					customd.innerHTML+=\"<br><br>Tag: <input type='text' id='tagnameIn' onkeyup='editName(this.value,\"+h+\");editTag(\"+h+\");' />\";\n\
					customd.innerHTML+=\"<br><br>Align: <input type='button' value='Pic on left' onclick='tagAlign[\"+h+\"]=4;editTag(\"+h+\");' />\";\n\
					customd.innerHTML+=\"<input type='button' value='Pic on Right' onclick='tagAlign[\"+h+\"]=3;editTag(\"+h+\");' />\";\n\
					customd.innerHTML+=\"<input type='button' value='Pic on Top' onclick='tagAlign[\"+h+\"]=2;editTag(\"+h+\");' />\";\n\
					customd.innerHTML+=\"<input type='button' value='Pic on Bottom' onclick='tagAlign[\"+h+\"]=1;editTag(\"+h+\");' />\";\n\
					customd.innerHTML+=\"<br><br><input type='button' onclick='document.getElementById(\\\"tagL\"+h+\"\\\").style.background=\\\"\\\";Done=1;getPos(event);' value='Done' />\";\n\
					document.getElementById('tagnameIn').value=tagName[lang][h];\n\
					document.getElementById('tagnameIn').focus();\n\
				}\n\
				tagPri.id='tagL'+i;\n\
				document.getElementById('tagList').appendChild(tagPri);\n\
				tagPri=document.createElement('div');\n\
				tagPri.innerHTML='X';\n\
				tagPri.style.display='inline-block';\n\
				tagPri.style.border='1px solid red';\n\
				tagPri.style.padding='3px'\n\
				tagPri.style.cursor='pointer';\n\
				tagPri.style.width='7%';\n\
				tagPri.className='tagL';\n\
				tagPri.draggable=true;\n\
				tagPri.id='tagX'+i;\n\
				tagPri.onclick=function(){\n\
					h=parseInt(this.id.substr(4,this.id.length-4));\n\
					tagName[0].splice(h,1);\n\
					tagName[1].splice(h,1);\n\
					tagPosV.splice(h,1);\n\
					tagPosH.splice(h,1);\n\
					tagAlign.splice(h,1);\n\
					jMax=document.getElementsByClassName('tag');\n\
					for(j=0;j<jMax.length;j++){\n\
						elem=jMax[j];\n\
						elem.parentNode.removeChild(elem);\n\
						j--;\n\
					}\n\
					setName();\n\
					printName();\n\
				}\n\
				document.getElementById('tagList').appendChild(tagPri);\n\
			}\n\
			tagPri=document.createElement('div');\n\
			tagPri.innerHTML='Clear All Lables';\n\
			tagPri.style.border='2px solid red';\n\
			tagPri.style.borderRadius='5px';\n\
			tagPri.style.width='47%';\n\
			tagPri.style.display='inline-block';\n\
			tagPri.style.padding='3px'\n\
			tagPri.style.cursor='pointer';\n\
			tagPri.style.background='pink';\n\
			tagPri.id='tagReset';\n\
			tagPri.onclick=function(){\n\
				jMax=document.getElementsByClassName('tag');\n\
				for(j=0;j<jMax.length;j++){\n\
					elem=jMax[j];\n\
					elem.parentNode.removeChild(elem);\n\
					j--;\n\
				}\n\
				tagName[0]=new Array();\n\
				tagName[1]=new Array();\n\
				tagPosV=new Array();\n\
				tagPosH=new Array();\n\
				tagAlign=new Array();\n\
				setName();\n\
				printName();\n\
			}\n\
			document.getElementById('tagList').appendChild(tagPri);\n\
			tagPri=document.createElement('div');\n\
			tagPri.innerHTML='Done "+add[EditAdd]+"ing';\n\
			tagPri.style.border='2px solid red';\n\
			tagPri.style.borderRadius='5px';\n\
			tagPri.style.width='47%';\n\
			tagPri.style.display='inline-block';\n\
			tagPri.style.padding='3px'\n\
			tagPri.style.cursor='pointer';\n\
			tagPri.style.background='lightgreen';\n\
			tagPri.id='tagCreate';\n\
			tagPri.onclick=function(){\n\
				if(TagTitle[lang]=='')errTitle=1;\n\
				else errTitle=0;\n\
				if(tagName[lang].length==0)noTag=1;\n\
				else noTag=0;\n\
				if(tagName[0].length!=tagName[1].length || tagName[1].length!=tagPosV.length || tagPosV.length!=tagPosH.length || tagPosH.length!=tagAlign.length)errLen=1;\n\
				else errLen=0;\n\
				customd=document.getElementById('result');\n\
				customd.style.position='fixed';\n\
				customd.style.display='block';\n\
				customd.style.left='35%';\n\
				customd.style.top='10%';\n\
				customd.style.right='';\n\
				customd.style.bottom='';\n\
				customd.style.width='30%';\n\
				customd.style.height='';\n\
				customd.style.border='1px solid blue';\n\
				customd.style.background='white';\n\
				if(errTitle==1 || noTag==1 || errLen==1){\n\
					customd.innerHTML='<br>';\n\
					if(errTitle==1)customd.innerHTML+='Please Enter a valid Title<br>';\n\
					if(noTag==1)customd.innerHTML+='No labels are tagged... You cannot proceed.<br>';\n\
					if(errLen==1)customd.innerHTML+='An internal erron ocuured.<br>';\n\
					customd.innerHTML+=\"<input type='button' value='Ok' onclick='this.parentNode.style.display=\\\"none\\\"'>\";\n\
					customd.innerHTML+='<br> ';\n\
					return;\n\
				}\n\
				finalStr=\"var TagTitle=new Array();\\n\";\n\
				finalStr+=\"TagTitle[0]='\"+TagTitle[0]+\"';\\n\";\n\
				finalStr+=\"TagTitle[1]='\"+TagTitle[1]+\"';\\n\";\n\
				finalStr+=\"var lastTagSelected=0;\\n\";\n\
				finalStr+=\"var correct=new Array();\\n\";\n\
				finalStr+=\"var tagName=new Array();\\n\";\n\
				for(i=0;i<=1;i++){\n\
					finalStr+=\"tagName[\"+i+\"]=new Array();\\n\";\n\
					for(j=0;j<tagName[i].length;j++){\n\
						finalStr+=\"tagName[\"+i+\"][\"+j+\"]='\"+tagName[i][j]+\"';\\n\";\n\
					}\n\
				}\n\
				finalStr+='var tagPosV=new Array();\\n';\n\
				for(j=0;j<tagPosV.length;j++){\n\
					finalStr+='tagPosV['+j+']='+tagPosV[j]+';\\n';\n\
				}\n\
				finalStr+='var tagPosH=new Array();\\n';\n\
				for(j=0;j<tagPosH.length;j++){\n\
					finalStr+='tagPosH['+j+']='+tagPosH[j]+';\\n';\n\
				}\n\
				finalStr+='var tagAlign=new Array();\\n';\n\
				for(j=0;j<tagAlign.length;j++){\n\
					finalStr+='tagAlign['+j+']='+tagAlign[j]+';\\n';\n\
				}\n\
				if(TagTitle[0]==''){\n\
					names["+conNo+"]=TagTitle[1];\n\
				}\n\
				else {\n\
					names["+conNo+"]=TagTitle[0];\n\
				}\n\
				contStr='var tags=new Array();\\nvar pic=new Array();\\nvar names=new Array();\\n';\n\
				for(tgi=0;tgi<tags.length;tgi++){\n\
					contStr+=\"tags[\"+tgi+\"]='\"+tags[tgi]+\"';\\nnames[\"+tgi+\"]='\"+names[tgi]+\"';\\npic[\"+tgi+\"]='\"+pic[tgi]+\"';\\n\"\n\
				}\n\
				document.forms.action.cont.innerHTML=contStr;\n\
				document.forms.action.info.innerHTML=finalStr;\n\
				document.forms.action.title.value=TagTitle[lang];\n\
				customd.innerHTML=\"<span style='font-size:25px;'>Do you really want to "+add[EditAdd]+" this diagram?</span><br>\";\n\
				customd.innerHTML+=\"<input type='button' value='Yes' onclick='document.forms.action.submit();'><input type='button' value='No' onclick='this.parentNode.style.display=\\\"none\\\"'>\";\n\
			}\n\
			document.getElementById('tagList').appendChild(tagPri);\n\
			updTitle(TagTitle[lang]);\n\
			setName();\n\
			return 1;\n\
		}\n\
		function setName(){\n\
			jMax=document.getElementsByClassName('tag');\n\
			for(j=0;j<jMax.length;j++){\n\
				elem=jMax[j];\n\
				elem.parentNode.removeChild(elem);\n\
				j--;\n\
			}\n\
			addTop=document.getElementById('imgPlant').getBoundingClientRect().top;\n\
			addBottom=document.getElementById('imgPlant').getBoundingClientRect().boottom;\n\
			addLeft=document.getElementById('imgPlant').getBoundingClientRect().left;\n\
			addRight=document.getElementById('imgPlant').getBoundingClientRect().right;\n\
			for(i=0;i<tagName[lang].length;i++){\n\
				tagTo=document.createElement('div');\n\
				tagTo.className='tag';\n\
				tagTo.id='tagT'+i;\n\
				if(tagName[lang][i])tagNamePrint=tagName[lang][i];\n\
				else tagNamePrint='?';\n\
				tagTo.innerHTML=tagNamePrint;\n\
				tagTo.style.cursor='pointer';\n\
				tagTo.style.fontSize='20px';\n\
				tagTo.style.position='fixed';\n\
				tagTo.style.top=(addTop+tagPosV[i])+'px';\n\
				if(tagAlign[i]==4){\n\
					tagTo.style.left=(addLeft+tagPosH[i])+'px';\n\
				}\n\
				else if(tagAlign[i]==3){\n\
					textW=getTextWidth(tagTo.innerHTML,20);\n\
					tagTo.style.left=(addLeft+tagPosH[i]-textW)+'px';\n\
				}\n\
				else if(tagAlign[i]==1 || tagAlign[i]==2){\n\
					textW=getTextWidth(tagTo.innerHTML,20);\n\
					tagTo.style.left=(addLeft+tagPosH[i]-(textW/2))+'px';\n\
				}\n\
				document.getElementById('imgContain').appendChild(tagTo);\n\
			}\n\
		}\n\
		function setTitle(){\n\
			Done=0;\n\
			customd=document.getElementById('result');\n\
			customd.style.position='fixed';\n\
			customd.style.display='block';\n\
			customd.style.left='35%';\n\
			customd.style.top='10%';\n\
			customd.style.width='30%';\n\
			customd.style.height='';\n\
			customd.style.border='1px solid blue';\n\
			customd.style.background='white';\n\
			customd.innerHTML=\"Title: <input id='titleUpd' type='text' onkeyup='updTitle(this.value);' />\";\n\
			customd.innerHTML+=\"<br><br><input type='button' onclick='Done=1;getPos(event);' value='Done' />\";\n\
			document.getElementById('titleUpd').value=TagTitle[lang];\n\
			document.getElementById('titleUpd').focus();\n\
		}\n\
		function updTitle(val){\n\
			if(val){\n\
				TagTitle[lang]=val;\n\
				document.getElementById('Title').innerHTML=val;\n\
			}\n\
			else {\n\
				TagTitle[lang]='';\n\
				document.getElementById('Title').innerHTML='&lt;Enter Title&gt;';\n\
			}\n\
			return;\n\
		}\n\
		function getTextWidth(txt,fSize){\n\
			textDiv=document.getElementById('txtWidth');\n\
			textDiv.innerHTML=txt;\n\
			textDiv.style.display='inline';\n\
			textDiv.style.fontSize=fSize+'px';\n\
			width=textDiv.offsetWidth;\n\
			textDiv.style.display='none';\n\
			return width;\n\
		}\n\
		function correctView(){\n\
			addTop=document.getElementById('imgPlant').getBoundingClientRect().top;\n\
			addBottom=document.getElementById('imgPlant').getBoundingClientRect().boottom;\n\
			addLeft=document.getElementById('imgPlant').getBoundingClientRect().left;\n\
			addRight=document.getElementById('imgPlant').getBoundingClientRect().right;\n\
			jMax=document.getElementsByClassName('tag').length;\n\
			for(j=0;j<jMax;j++){\n\
				elemTemp=document.getElementsByClassName('tag')[j];\n\
				elemTemp.style.top=(addTop+tagPosV[j])+'px';\n\
				if(tagAlign[j]==4){\n\
					elemTemp.style.left=(addLeft+tagPosH[j])+'px';\n\
				}\n\
				else if(tagAlign[j]==3){\n\
					textW=getTextWidth(elemTemp.innerHTML,20);\n\
					elemTemp.style.left=(addLeft+tagPosH[j]-textW)+'px';\n\
					if(parseInt(elemTemp.style.left)<0){\n\
						leftMore=-parseInt(elemTemp.style.left);\n\
						elemTemp.style.left='3px';\n\
						elemTemp.style.textAlign='right';\n\
						elemTemp.style.width=(textW-leftMore)+'px';\n\
						origTop=parseInt(elemTemp.style.top);\n\
						elemTemp.style.top=(origTop-(elemTemp.clientHeight/3))+'px';\n\
					}\n\
					else {\n\
						elemTemp.style.width='';\n\
						elemTemp.style.textAlign='';\n\
					}\n\
				}\n\
				else if(tagAlign[j]==1 || tagAlign[j]==2){\n\
					textW=getTextWidth(elemTemp.innerHTML,20);\n\
					elemTemp.style.left=(addLeft+tagPosH[j]-(textW/2))+'px';\n\
				}\n\
			}\n\
		}\n\
		window.onresize=function(){\n\
			correctView();\n\
		}\n\
		window.onscroll=function(){\n\
			correctView();\n\
		}\n\
	</script>\n\
</head>\n\
<body onload='printName();' style='background:white;'>\n\
	<div style='text-align:center;width:100%;font-size:35px;color:red;padding:2px;' id='Title' onclick='setTitle();'>&lt;Enter Title&gt;</div><br>\n\
	<table align='center' width='100%'>\n\
	<tr>\n\
	<td onclick='getPos(event)'>\n\
		<div id='imgContain' style='position:relative;display:block;width:100%;text-align:center;'>\n\
		<img id='imgPlant' src='data/tag"+tagNo+"/"+fileName+"' style='height:600px;'/>\n\
		</div>\n\
	</td>\n\
	<td id='tagList' style='text-align:center;font-size:20px;' width='25%'>\n\
	</td>\n\
	</tr>\n\
	</table>\n\
	<div id='result' style='text-align:center'></div>\n\
	<div id='txtWidth' style='display:none;'></div>\n\
	<form action='add' name='action' method='GET' style='display:none;'>\n\
		<textarea name='info'></textarea>\n\
		<textarea name='cont'></textarea>\n\
		<input type='text' name='title' >\n\
		<input type='text' name='tagId' value="+tagNo+" >\n\
		<input type='text' name='conId' value="+conNo+" >\n\
		<input type='submit'>\n\
	</form>\n\
	<br><br><br>\n\
	<div id='footer' style='position:fixed;width:94%;left:3%;bottom:-2px;border:1px solid green;border-top-left-radius:5px;border-top-right-radius:5px;padding:5px;font-size:20px;background:lightgreen'>\n\
		<table width='100%'>\n\
			<tr>\n\
				<td><a href='back?conId="+conNo+"&EditAdd="+EditAdd+"'> &larr; Exit without saving</a> &nbsp;&nbsp; | &nbsp;&nbsp; "+add[EditAdd]+" diagram</td>\n\
				<td style='text-align:right;'>&copy; Created By "+auth+"</td>\n\
			</tr>\n\
		</table>\n\
	</div>\n\
</body>\n\
</html>";
	return reds;
}

var menubar = app.createMenu([{
  label:'&File',
  submenu:[
    {
      label:'Go to Index',
      action: function(){
        window.location.href='index';
      }
    },{
      label:'Add new diagram',
      action: function(){
        window.location.href='add.html';
      }
    },{
      label:'E&xit',
      action: function(){
        window.close();
      }
    }
  ]
},{
  label:'&Language',
  submenu:[
    {
      label:'English',
      action:function(){
		lan=0;
        if(window.location.pathname!='/upImg' &&  window.location.pathname!='/edit'){
			window.location.reload();
		}
		else {
			lanScript=window.document.createElement('script');
			lanScript.innerHTML="lang=0;printName();t=setTimeout(function(){elemS=document.getElementById('lanChange');elemS.parentNode.removeChild(elemS);langAlert();},100)";
			lanScript.id='lanChange';
			window.document.body.appendChild(lanScript);
		}
      }
    },{
      label:'Gujarati',
      action:function(){
		lan=1;
        if(window.location.pathname!='/upImg' &&  window.location.pathname!='/edit'){
			window.location.reload();
		}
		else {
			lanScript=window.document.createElement('script');
			lanScript.innerHTML="lang=1;printName();t=setTimeout(function(){elemS=document.getElementById('lanChange');elemS.parentNode.removeChild(elemS);langAlert();},100)";
			lanScript.id='lanChange';
			window.document.body.appendChild(lanScript);
		}
      }
    }
  ]
},{
  label:'&Action',
  submenu:[
    {
      label:'Edit diagram',
      action:function(){
		  window.location.href='edit';
      }
    },{
      label:'Delete diagram',
      action:function(){
		  window.location.href='remConf';
      }
    }
  ]
},{
  label:'&Mode',
  submenu:[
    {
      label:'Learning',
      action:function(){
        mode=0;
        if(window.location.pathname!='/upImg' &&  window.location.pathname!='/edit'){
			window.location.reload();
		}
      }
    },{
      label:'Practice',
      action:function(){
        mode=1;
        if(window.location.pathname!='/upImg' &&  window.location.pathname!='/edit'){
			window.location.reload();
		}
      }
    },{
      label:'Test',
      action:function(){
        mode=2;
        if(window.location.pathname!='/upImg' &&  window.location.pathname!='/edit'){
			window.location.reload();
		}
      }
    }
  ]
},{
  label:'&Help',
  submenu:[
    {
      label:'About',
      action:function(){
        window.location.href='credits';
      }
    }
  ]
}]);

menubar.on('select',function(item){
  console.log("menu item "+item.label+" clicked");
});

var window = app.createWindow({
  icons  : __dirname + '/content/icons'
});

window.on('create', function(){
  console.log("Window Created");
  window.frame.show();
  window.frame.center();
  window.frame.setMenuBar(menubar);
  window.frame.maximize();
});

window.on('ready', function(){
  console.log("Window Ready");
  window.require = require;
  window.process = process;
  window.module = module;

  function F12(e){ return e.keyIdentifier === 'F12' }
  function Command_Option_J(e){ return e.keyCode === 74 && e.metaKey && e.altKey }

  window.addEventListener('keydown', function(e){
    if (F12(e) || Command_Option_J(e)) {
      window.frame.openDevTools();
    }
  });
  window.addEventListener('contextmenu', function(e){
	e.preventDefault();
	return false;
  }); 
  window.addEventListener('selectstart', function(e){
	e.preventDefault();
	return false;
  }); 
});

window.on('close', function(){
  console.log("Window Closed");
});
