var data = {}

    var browserInfo = {
        //organise browser info detection into an object
        browser: {
            label: "Your operating system",
            os: {
                label: "Your operating system:",
                value: function() {
                    let OSName="Unknown OS";
                    if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows"
                    if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS"
                    if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX"
                    if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux"

                    return OSName
                }
            },
            label: "Your browser",
            info: {
                label: "Version:",
                value: function(){
                    // from: https://stackoverflow.com/questions/5916900/how-can-you-detect-the-version-of-a-browser
                    var ua= navigator.userAgent, tem, 
                    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []
                    if(/trident/i.test(M[1])){
                        tem=  /\brv[ :]+(\d+)/g.exec(ua) || []
                        return 'IE '+(tem[1] || '')
                    }
                    if(M[1]=== 'Chrome'){
                        tem= ua.match(/\b(OPR|Edge)\/(\d+)/)
                        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera')
                    }
                    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?']
                    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1])
                    return M.join(' ')
                }
            },
            vendor: {
                label: "Vendor:",
                value: function() { return navigator.vendor }
            },
            userAgent: {
                label: "User agent:",
                value: function() { return navigator.userAgent }
            }
        },
        capabilities: {
            label: "Your browser capabilities",
            cookies: {
                label: "Cookies:",
                value: function() { return navigator.cookieEnabled ? 'Enabled'  : 'Disabled' }
            },
            _ActiveX: {
                label: "ActiveX:",
                value: function() { return window.ActiveXObject ? 'Your browser SUPPORTS ActiveX'  : 'Your browser DOES NOT SUPPORT ActiveX controls'}
            }
        },
        computer: {
            label: "Your computer properties",
            deviceRes: {
                label: "Monitor resolution:",
                value: function() { return `${window.screen.width}x${window.screen.height}` }
            },
            colorDepth: {
                label: "Color depth:",
                value: function() { return `${screen.colorDepth} bits per pixel` }
            },
            browserDimensions: {
                label: "Browser dimensions:",
                value: function() { return `${window.screen.availWidth}x${window.screen.availHeight}` }
            },
            memory: {
                label: "Memory:",
                value: function() { return `${navigator.deviceMemory}GB (estimated)` }
            },
            core: {
                label: "CPU core:",
                value: function() { return `${navigator.hardwareConcurrency} (estimated)` }
            },
            jsVersion: {
                label: "Javascript version:",
                value: function() { return jsver }
            },
            java: {
                label: "Java:",
                value: function() { return navigator.javaEnabled() ? 'Enabled'  : 'Disabled' }
            }
        },
        _HTML5: {
            label: "HTML5 capabilities",
            value: {
                canvas: (function() { return Modernizr.canvas ? 'Yes'  : 'No' })(),
                canvas_text: (function() { return Modernizr.canvastext ? 'Yes'  : 'No' })(),
                drag_and_drop: (function() { return 'draggable' in document.createElement('span') ? 'Yes'  : 'No' })(),
                audio: (function() { return Modernizr.audio })(),
                video: (function() { return Modernizr.video })(),
                web_workers: (function() { return Modernizr.webworkers ? 'Yes'  : 'No'  })(),
                web_sockets: (function() { return Modernizr.websockets ? 'Yes'  : 'No'  })(),
                session_storage: (function() { return Modernizr.sessionstorage ? 'Yes'  : 'No' })(),
                web_SQL_database: (function() { return Modernizr.websqldatabase ? 'Yes'  : 'No' })()
            }
        },
        _CSS3: {
            label: "CSS3 capabilities",
            value : (function() {
                let css = {}
                for (let i in Modernizr) {
                    if(i.substring(0, 3) === 'css'){
                        css[i.substring(3, i.length)] = Modernizr[i] ? 'Yes' : 'No'
                    }
                }

                return css
            })()
        },
        inputTypes: {
            label: "Input Types",
            value: (function() {
                let inputTypes = {}
                for (let i in Modernizr.inputtypes) {
                    inputTypes[i] = Modernizr.inputtypes[i] ? 'Yes' : 'No'
                }

                return inputTypes
            })()
        }
    }

    function buildBrowserinfo(data) {
        // extract info from browserInfo object and display it in DOM
        for (let group in data) {
            for (let detail in data[group]) {
                if (typeof data[group][detail] === 'string') {
                    $('.info-wrapper').append(`<h2>${data[group][detail]}</h2>`)
                } else {
                    let html = ''
                    for (let info in data[group][detail]) {
                        let label = info === 'label'? '' : `${info}:`
                        if (typeof data[group][detail][info] === 'string') {
                            html += `<p>${label}${data[group][detail][info]}`
                        } else if (typeof data[group][detail][info] === 'function') {
                            html += `<span><strong>${data[group][detail][info]()}</strong></span></p>`
                        } 
                    }
                    $('.info-wrapper').append(html)
                }
            }
        }
    }

    buildBrowserinfo(browserInfo)