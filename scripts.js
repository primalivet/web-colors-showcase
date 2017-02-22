const webColors = (function() {

  let _colors

  const _filterSearch = function(e, data) {
    const searchTerm = e.target.value.trim()
    const regex = new RegExp(searchTerm, 'gi')

    const searchResult = data.filter(color => {            
      return color.group.match(regex) || color.name.match(regex)
    })
    _createMarkup(searchResult)
  }

  const _createMarkup = function(data) {
    document.body.querySelector('.cards').innerHTML = data.map((color, index) => {
      return  `
                <div class="card" tabindex="${index + 1}" style="background:${color.name};">
                  <div class="text">
                    <span class="label">${color.name}</span>
                    <span class="value hex">${color.hex}</span>
                    <span class="value rgb">${color.rgb.red},${color.rgb.green},${color.rgb.blue}</span>
                  </div>
                </div>
              `
    }).join('')
  }

  const _bindEventHandlers = function() {
    const search = document.body.querySelector('input[type="search"]')
    search.addEventListener('keyup', function(e) {
      _filterSearch(e, _colors)
    }) 
  }

  const init = function() {
    fetch('colors.json')
      .then(response => response.json())
      .then((data) => {
        _colors = data
        _createMarkup(_colors)
        _bindEventHandlers()             
      })
      .catch(error => {
        if (error) throw error
    })

  }

  return { _colors, init }

})()

webColors.init()