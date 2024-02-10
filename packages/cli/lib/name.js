// import { ToWords } from 'to-words';
const { ToWords } = require('to-words');

// https://github.com/vuejs/vue/blob/0603ff695d2f41286239298210113cbe2b209e28/src/platforms/web/util/element.js
// https://github.com/vuejs/vue/blob/dev/LICENSE
const _isHTMLTag = function (name) {
  let list =
    'html,body,base,head,link,meta,style,title,' +
    'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
    'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
    'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
    's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
    'embed,object,param,source,canvas,script,noscript,del,ins,' +
    'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
    'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
    'output,progress,select,textarea,' +
    'details,dialog,menu,menuitem,summary,' +
    'content,element,shadow,tmplate,blockquote,iframe,tfoot';
  let lowerName = name.replace(/[A-Z]/g, (match) => {
    return match.toLowerCase();
  });
  return list.split(',').indexOf(lowerName) > -1;
};

const _isSVG = function (name) {
  let list =
    'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
    'foreignobject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
    'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view';
  let lowerName = name.replace(/[A-Z]/g, (match) => {
    return match.toLowerCase();
  });
  return list.split(',').indexOf(lowerName) > -1;
};

const isReserved = (name) => {
  return _isSVG(name) || _isHTMLTag(name);
};

const toPascalCase = (str) => {
  return str
    .replace(/^[a-z]|/, (match) => match.toUpperCase())
    .replace(/(?<=-)./g, (match) => match.toUpperCase());
};

const intToWords = (str) => {
  const toWords = new ToWords();
  return str.replace(/^[0-9]+/, (match) => {
    return toWords.convert(match).replace(/\s/g, '');
  });
};

function rename(path, names) {
  let [dir, name] = path
    .split('/')
    .slice(-2)
    .map((str) => str.replace('.svg', ''));

  // Fix icon variants in different dirs w/ the same filename
  // e.g. /solid/name => name-solid ... /outline/name => name-outline
  // TODO: add default name setting so only one gets appende
  let same = names.filter((n) => n === name);
  if (same.length > 1) {
    name += '-' + dir;
  }

  // Apply any regex from settings.
  // This has to go before toWords and pascal
  // if (stripFilename) {
  //   name = name.replace(stripFilename, '');
  // }

  name = intToWords(name);
  name = toPascalCase(name).replace(/-/g, '').replace(/\s/g, '');

  // name is a reserved html/svg word. e.g. Font
  if (isReserved(name)) {
    name += 'Icon';
  }
  return name;
}

// export { rename };
module.exports = {
  rename,
};
