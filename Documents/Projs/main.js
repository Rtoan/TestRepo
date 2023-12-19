var paralax = Boolean;
paralax = false;

function enableParalax() {
  paralax = true;
  var css = 'image:hover{ background-size: 175%; }';
  var style = document.createElement('style');

if (style.styleSheet) {
    style.styleSheet.cssText = css;
} else {
    style.appendChild(document.createTextNode(css));
}

document.getElementsByTagName('head')[0].appendChild(style);

}

function disableParalax() {
  paralax = false;
  var css = 'image:hover{ background-size: 80%; }';
  var style = document.createElement('style');

if (style.styleSheet) {
    style.styleSheet.cssText = css;
} else {
    style.appendChild(document.createTextNode(css));
}

document.getElementsByTagName('head')[0].appendChild(style);
}

function openNav() {
    document.getElementById("mySidebar").style.width = "375px";
    document.getElementById("popout").style.marginLeft = "375px";
    document.getElementById("popout").style.marginRight = "45%";
    document.getElementById("mySidebar").style.visibility = "visible";
  }
  
  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("mySidebar").style.width = "15px";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("popout").style.marginLeft = "15px";
    document.getElementById("popout").style.marginRight = "70%";
    document.getElementById("mySidebar").style.visibility = "hidden";
    document.getElementById("pt2").style.color = "#111";
  }
  
  function upload() {
 
    img = new Image();
    img = document.getElementById("input").files[0];
    
    if(isFileImage(img)){;
      console.log("Y");
      const objectURL = window.URL.createObjectURL(img);
      console.log(objectURL);
      document.getElementById("hass").style.backgroundImage = "url("+ objectURL +")";
      document.getElementById("pt2").style.color = "#111";
      let x = img.naturalWidth;
      let y = img.naturalHeight;
      console.log("Height is " + y + ", width is " + x);
      document.getElementById("popout").style.aspectRatio = "" + x/y + "";
    } else {
      console.log("N");
      document.getElementById("pt2").style.color = "#FFFFFF";
    }
  }

    function isFileImage(file) {
      return file && file['type'].split('/')[0] === 'image';
  }

  function hideImage() {
    document.getElementById("hass").style.visibility = "hidden";
    document.getElementById("popout").style.visibility = "hidden";

  }

  function showImage() {
    document.getElementById("hass").style.visibility = "visible";
    document.getElementById("popout").style.visibility = "visible";
    document.getElementById("popout").style.width = document.getElementById("hass").style.width;
    document.getElementById("popout").style.height = document.getElementById("hass").style.height;

  }

  function turnX(){
    
    
  }
  
  function turnY(){
  
  }
  
  function turnZ(){
    camera.position.rotateZ(MATH.PI);
    renderer.render(scene, camera);
  }
  