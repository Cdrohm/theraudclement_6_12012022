//Search param key
function query(key) {
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
  }
  
  //First carac Upper 
  function ucfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }