const cookieConsentSettings = {
    description: '<h3>Ez a weboldal sütiket használ</h3>\n' +
        '<p>Első féltől és harmadik féltől származó sütik, valamint külső kiadóktól származó más nyomkövetési technológiák használatával biztosítjuk Neked a weboldal teljes körű funkcionalitását, hogy testre szabhassuk a felhasználói élményt, elemzéseket végezhessünk, és személyre szabott hirdetéseket jeleníthessünk meg a weboldalainkon, alkalmazásainkban és a hírleveleinkben az interneten és a közösségi média platformokon keresztül. Ebből a célból információkat gyűjtünk a felhasználókról, a böngészési mintákról és az eszközökről.</p>\n' +
        '<p>Az "Elfogadom" gombra kattintva elfogadod ezt, és beleegyezel abba, hogy megosszuk ezeket az információkat külső felekkel, például hirdetési partnereinkkel. Lehetőséged van kiválasztani azt is, milyen sütiket hagysz jóvá, majd a "Mentés" gombra kattintva menteni ezeket az engedélyeket. Ne feledd azonban, hogy bizonyos típusú sütik letiltása hatással lehet arra, hogyan tudunk személyre szabott tartalmat szolgáltatni, amely tetszhet Neked. A részleges süti-engedélyezéshez kattints a "Beállítások" gombra.</p>\n',
    checkboxes: '<label for="cookiePerformance"><input type="checkbox" id="cookiePerformance"> <h5 style="display:inline-block;">Teljesítmény sütik</h5></label>\n' +
        '<p>Ezek a sütik lehetővé teszik számunkra a látogatások és a forgalom számlálást, hogy bepillantást nyerhessünk például abba, mely oldalak a legnépszerűbbek, és megnézhetjük, hogyan mozognak a látogatók az oldalon. Az ilyen sütik által gyűjtött minden adat összesített, tehát névtelen. Ha nem engedélyezed ezeket a sütiket, nem tudunk személyre szabott élményt nyújtani neked.</p>\n' +
        '<label for="cookieFunctional"><input type="checkbox" id="cookieFunctional"> <h5 style="display:inline-block;">Funkcionális sütik</h5></label>\n' +
        '<p>Ezek a sütik lehetővé teszik a webhely számára, hogy továbbfejlesztett funkciókat és testreszabást biztosítson a felhasználóknak. Ezeket mi állítjuk be, vagy olyan külső szolgáltatók, akiknek szolgáltatásait felvettük az oldalunkra. Ha nem engedélyezed ezeket a sütiket, akkor előfordulhat, hogy ezeknek a szolgáltatásoknak egy része, vagy egyik sem fog megfelelően működni.</p>\n' +
        '<label for="cookieMarketing"><input type="checkbox" id="cookieMarketing"> <h5 style="display:inline-block;">Marketing sütik</h5></label>\n' +
        '<p>Ha elfogadod a marketing sütiket, hozzájárulásodat adod ahhoz, hogy sütiket helyezzünk el az eszközödön annak érdekében, hogy az érdeklődési körödnek megfelelő tartalmakat nyújtsunk.</p>',
    okButton: {
        innerHTML: 'Elfogadom',
        class: 'default-btn-shortcode dt-btn dt-btn-s link-hover-off custom-btn-primary btn-inline-left',
        style: 'margin-bottom: 10px;display:inline-block;',
        id: ''
    },
    settingsButton: {
        innerHTML: 'Beállítások',
        class: 'default-btn-shortcode dt-btn dt-btn-s link-hover-off custom-btn-secondary',
        style: 'float:right;display:inline-block;',
        id: ''
    },
    saveButton: {
        innerHTML: 'Mentés',
        class: 'button',
        style: 'display:none;',
        id: ''
    },
    nokButton: {
        innerHTML: 'Mégsem',
        class: 'default-btn-shortcode dt-btn dt-btn-s link-hover-off custom-btn-secondary',
        style: 'float:right;display:none;',
        id: ''
    },
};

function initCookieConsentPopup()
{
    let background = document.createElement("div");
    let popup = document.createElement("div");
    let inner = document.createElement("div");
    let buttons = document.createElement("div");

    let okButton = document.createElement("button");
    let saveButton = document.createElement("button");
    let nokButton = document.createElement("button");
    let settingsButton = document.createElement("button");

    background.style = "display:none;position:fixed;background-color:black;opacity:0.95;z-index:1000000000;top:0;left:0;width:100%;height:100%;";
    background.id = "cookie-consent-popup-background";
    //popup.style = "z-index:10000000000;background-color:red;color:white;width:100%;height:100%;position:fixed;top:0;left:0;min-height:100vh;min-width:100vw;";
    popup.style = "position: fixed; top: 5%; padding: 2em; background-color: white; z-index: 1000000000; color: black; width: 90%; max-width: 1000px; left: 50%; transform: translate(-50%, 0); border: 1px dotted lightgray; max-height: 90%;overflow-y: auto;";

    let description = document.createElement('div');
    description.id = "cookie-consent-description";
    description.innerHTML = cookieConsentSettings.description;

    let checkboxes = document.createElement('div');
    checkboxes.id = "cookie-consent-checkboxes";
    checkboxes.style.display = "none";
    checkboxes.innerHTML = cookieConsentSettings.checkboxes;

    okButton.innerText = cookieConsentSettings.okButton.innerHTML;
    okButton.setAttribute("class", cookieConsentSettings.okButton.class);
    okButton.id = "cookie-consent-ok";
    okButton.style = cookieConsentSettings.okButton.style;
    okButton.addEventListener("click", function() {
        document.getElementById("cookiePerformance").checked = true;
        document.getElementById("cookieFunctional").checked = true;
        document.getElementById("cookieMarketing").checked = true;
        setCookieLocalStorageAndClosePopup();
    });

    settingsButton.innerText = cookieConsentSettings.settingsButton.innerHTML;
    settingsButton.setAttribute("class", cookieConsentSettings.settingsButton.class);
    settingsButton.class = cookieConsentSettings.settingsButton.class;
    settingsButton.id = "cookie-consent-settings";
    settingsButton.style = cookieConsentSettings.settingsButton.style;
    settingsButton.addEventListener("click", function() {
        document.getElementById("cookie-consent-ok").style.display = "none";
        document.getElementById("cookie-consent-settings").style.display = "none";
        document.getElementById("cookie-consent-save").style.display = "inline-block";
        document.getElementById("cookie-consent-nok").style.display = "inline-block";
        document.getElementById("cookie-consent-description").style.display = "none";
        document.getElementById("cookie-consent-checkboxes").style.display = "block";
    });

    saveButton.innerText = cookieConsentSettings.saveButton.innerHTML;
    saveButton.setAttribute("class", cookieConsentSettings.saveButton.class);
    saveButton.class = cookieConsentSettings.saveButton.class;
    saveButton.id = "cookie-consent-save";
    saveButton.style = cookieConsentSettings.saveButton.style;
    saveButton.addEventListener("click", function() {
        setCookieLocalStorageAndClosePopup();
    });

    nokButton.innerText = cookieConsentSettings.nokButton.innerHTML;
    nokButton.setAttribute("class", cookieConsentSettings.nokButton.class);
    nokButton.id = "cookie-consent-nok";
    nokButton.style = cookieConsentSettings.nokButton.style;
    nokButton.addEventListener("click", function() {
        hideCookieConsentPopup();
    });

    buttons.appendChild(okButton);
    buttons.appendChild(settingsButton);
    buttons.appendChild(saveButton);
    buttons.appendChild(nokButton);

    inner.appendChild(description);
    inner.appendChild(checkboxes);
    popup.appendChild(inner);
    popup.appendChild(buttons);
    background.appendChild(popup);

    // add created cookie consent to site
    const element = document.getElementsByTagName("body")["0"];
    element.appendChild(background);
}

function hideCookieConsentPopup()
{
    document.getElementById("cookie-consent-checkboxes").style.display = "none";
    document.getElementById("cookie-consent-save").style.display = "none";
    document.getElementById("cookie-consent-nok").style.display = "none";
    document.getElementById("cookie-consent-description").style.display = "block";
    document.getElementById("cookie-consent-ok").style.display = "inline-block";
    document.getElementById("cookie-consent-settings").style.display = "inline-block";
    document.getElementById("cookie-consent-popup-background").style.display = "none";
}

function showCookieConsentPopup()
{
    document.getElementById("cookie-consent-ok").style.display = "inline-block";
    document.getElementById("cookie-consent-settings").style.display = "inline-block";
    document.getElementById("cookie-consent-popup-background").style.display = "block";
}

function setCookieLocalStorageAndClosePopup()
{
    storeCookieLocalStorage();
    hideCookieConsentPopup();
}
function storeCookieLocalStorage()
{
    window.localStorage.setItem('cookieConsent', JSON.stringify({
        cookiePerformance: document.getElementById("cookiePerformance").checked,
        cookieFunctional: document.getElementById("cookieFunctional").checked,
        cookieMarketing: document.getElementById("cookieMarketing").checked
    }));
    console.log(window.localStorage.getItem('cookieConsent'));
}

function setCookieConsentCheckboxes()
{
    var cookieConsentUserSettings = window.localStorage.getItem('cookieConsent');
    if (cookieConsentUserSettings !== null) {
        cookieConsentUserSettings = JSON.parse(cookieConsentUserSettings);
        if (cookieConsentUserSettings.cookiePerformance) {
            document.getElementById("cookiePerformance").checked = true;
        }
        if (cookieConsentUserSettings.cookieFunctional) {
            document.getElementById("cookieFunctional").checked = true;
        }
        if (cookieConsentUserSettings.cookieMarketing) {
            document.getElementById("cookieMarketing").checked = true;
        }
    }
}

function cookieConsentPopup()
{
    if(cookieConsentUserSettings===null) {
        window.onload = function() {
            showCookieConsentPopup();
        }
    }
}

initCookieConsentPopup();
setCookieConsentCheckboxes();
cookieConsentPopup();
