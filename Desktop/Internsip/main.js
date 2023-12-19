function openNav() {
    document.getElementById("mySidebar").style.width = "375px";
    document.getElementById("main").style.marginLeft = "375px";
    document.getElementById("popout").style.marginLeft = "375px";
    document.getElementById("popout").style.marginRight = "25%";
  }
  
  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("mySidebar").style.width = "15px";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("popout").style.marginLeft = "15px";
    document.getElementById("popout").style.marginRight = "50%";
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
    } else {
      console.log("N");
      document.getElementById("pt2").style.color = "#FFFFFF";
    }
  }

    function isFileImage(file) {
      return file && file['type'].split('/')[0] === 'image';
  }