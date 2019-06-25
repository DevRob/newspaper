 var slideIndex = 1
    var embla = {}
    var slideData = {}
    fetch('https://api.myjson.com/bins/152ni8')
        .then(res => {
        return res.json()
        })
        .then(loadedData => {
        let data = loadedData
        slideData = loadedData
        buildEmbla(data)
        return [getCategories(data), data.data[0].category] 
        })
        .then(loadedCategories => {
            let categories = loadedCategories[0]
            defaultCategory = loadedCategories[1]
            buildArticleNav(categories)
            const emblaNode = document.querySelector('.embla')

            embla = EmblaCarousel(emblaNode, {
                align: 'center',
                containerSelector: '*',
                slidesToScroll: 1,
                draggable: true,
                dragFree: false,
                loop: true,
                speed: 10,
                startIndex: 0,
                selectedClass: 'is-selected',
                draggableClass: 'is-draggable',
                draggingClass: 'is-dragging',
            }, showArticleInfo())
        })
    
    
    const getCategories = (data) => { 
        let categories = new Set()
    
        for (key in data.data) {
            if (data.data.hasOwnProperty(key)) {
            categories.add(data.data[key].category)
            }
        }
        return categories
    }
    
    
    const buildEmbla = (data) => {
        let slider_html = ""
        let info_html = ""
        data.data.forEach((article)=>{
            slider_html += buildEmblaArticle(article)
            info_html += buildArticle(article)
        })

        $('.embla__container').html(slider_html)
        $('.slider-info').html(info_html)
    }

    const buildArticleNav = (set) => {
        let html = ""
        set.forEach((item) => {
            if(item) {
                html += `<li class="nav-item" data-category="${item.toLowerCase()}">${item}</li>`
            }
        })
    
        $('.article-nav ul').html(html)
    }

    const buildEmblaArticle = (article) => {
        let isActive = article.category.toLowerCase() == "news" ? "active" : ""
        let category = article.category.toLowerCase()
        
        return (`
            <div class="embla__slide embla_filter_target ${category}">\
                <div class="slide-wrapper">\
                    <img class="e_slider-img" src="${article.image}">\
                    <div class="e_image_credit">${article.image_credit}</div>\
                </div>\
            </div>\
        `)
    }

    const buildArticle = (article) => {
        let isActive = article.category.toLowerCase() == "news" ? "active" : ""
        let category = article.category.toLowerCase()
        
        return (`
            <div class="slider-info-item ${category}">\
                <div class="e_title-a">${article.title_a}</div>\
                <div class="e_snippet-wrapper">\
                <p class="e_summary">${article.summary.trim().substring(0, 50).trim()}</p>\
                <a class="e_link_line" href="${article.url}">${article.link_line}</a>\
                </div>\
                <div class="e_image_credit">${article.image_credit}</div>\
            </div>\
        `)
    }

    $('.e_nav').on('click', () => {
        showArticleInfo()
    })

    $('.embla').on('click change', () => {
        showArticleInfo()
    })

    document.getElementById('touchsurface').addEventListener('touchmove', function(e){
        e.preventDefault() // prevent scrolling when inside DIV
        showArticleInfo()
    }, false)
 
    
function showArticleInfo() {
    let slideLength = $('.embla__slide').length
    let slideIndex = $('.embla__slide.embla_filter_target.is-selected').index('.embla__slide')
    let index = slideIndex < 0 ? 0 : slideIndex
    $(`.slider-info-item`).hide()
    $('.e_pagination').hide()
    $(`.slider-info-item:nth-child(${index + 1})`).fadeIn(300)
    $('.e_pagination').text(`${index + 1}/${slideLength}`).fadeIn(300)
}

