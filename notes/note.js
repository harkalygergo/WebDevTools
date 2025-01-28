var prices = document.getElementsByClassName("dropdown-options")["4"].getElementsByTagName("li");
let array = [];
// loop through all the li elements and collect innerText into array and copy to clipboard after loop
for (let i = 0; i < prices.length; i++) {
    array.push(prices[i].innerText);
}
copy(array.join("\n"));
// copy to clipboard function
function copy(text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}


const GoogleTackingConfig = {
    debug_mode: false,
    allow_enhanced_conversions: true,
    config_GTM: 'GTM-abc',
    config_AW: "AW-abc",
    config_G: "G-abc",
    location_id: "abc",
    item_brand: "Paper Stories",
    send_to: 'AW-abc/abc-abc'
};
const MetaTrackingConfig = {
    pixelId: 123456789
};
/* DO NOT MODIFY */
// init Google Tag Manager
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!=="dataLayer"?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script', 'dataLayer', GoogleTackingConfig.config_GTM);
consentUpdateAdStorage('granted');
consentUpdateAdUserData('granted');
consentUpdateAdPersonalization('granted');
consentUpdateAnalyticsStorage('granted');
// init checkout Thank you script
window.addEventListener("load", function () {
    GoogleTagManagerShopifyCheckoutTracking(
        GoogleTackingConfig.debug_mode,
        GoogleTackingConfig.allow_enhanced_conversions,
        GoogleTackingConfig.config_AW,
        GoogleTackingConfig.config_G,
        GoogleTackingConfig.location_id,
        GoogleTackingConfig.item_brand,
        GoogleTackingConfig.send_to
    );
    MetaPixelTracking(MetaTrackingConfig.pixelId);
});
function MetaPixelTracking(MetaPixelId)
{
    MetaPixel();
    if (MetaPixelId!==null) {
        fbq('init', MetaPixelId);
        fbq('track', 'Purchase', {
            value: Number(Shopify.checkout.total_price_set.presentment_money.amount),
            currency: Shopify.Checkout.currency,
            content_ids: Shopify.checkout.order_id,
        });
    }
}
function MetaPixel()
{
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
}
function GoogleTagManagerShopifyCheckoutTracking(debug_mode, allow_enhanced_conversions, config_AW, config_G, location_id, item_brand, send_to)
{
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', config_AW, { 'allow_enhanced_conversions': allow_enhanced_conversions, debug_mode: debug_mode });
    const userProvidedData = {
        email: Shopify.checkout.email,
        phone: Shopify.checkout.billing_address.phone !== '' ? Shopify.checkout.billing_address.phone : Shopify.checkout.shipping_address.phone,
        address: {
            first_name: Shopify.checkout.billing_address.first_name !== '' ? Shopify.checkout.billing_address.first_name : Shopify.checkout.shipping_address.first_name,
            last_name: Shopify.checkout.billing_address.last_name !== '' ? Shopify.checkout.billing_address.last_name : Shopify.checkout.shipping_address.last_name,
            street: Shopify.checkout.billing_address.address1 !== '' ? Shopify.checkout.billing_address.address1 : Shopify.checkout.shipping_address.address1,
            city: Shopify.checkout.billing_address.city !== '' ? Shopify.checkout.billing_address.city : Shopify.checkout.shipping_address.city,
            region: Shopify.checkout.billing_address.province_code !== '' ? Shopify.checkout.billing_address.province_code : Shopify.checkout.shipping_address.province_code,
            postal_code: Shopify.checkout.billing_address.zip !== '' ? Shopify.checkout.billing_address.zip : Shopify.checkout.shipping_address.zip,
            country: Shopify.checkout.billing_address.country_code !== '' ? Shopify.checkout.billing_address.country_code : Shopify.checkout.shipping_address.country_code,
        },
    };
    console.log("userProvidedData", userProvidedData);
    gtag('set', 'user_data', userProvidedData);
    gtag('config', config_G);
    console.log("Google Analytics Enhanced Ecommerce Tracking");
    let line_items = [];
    for(var i=0; i<Shopify.checkout.line_items.length; i++) {
        var item_name = '';
        if (Shopify.checkout.line_items[i].variant_title!==null) {
            item_name = Shopify.checkout.line_items[i].title + " " + Shopify.checkout.line_items[i].variant_title;
        } else {
            item_name = Shopify.checkout.line_items[i].title;
        }

        line_items[i] = {
            "item_id": Shopify.checkout.line_items[i].sku,
            "item_name": item_name,
            "item_variant": (Shopify.checkout.line_items[i].variant_title!==null) ? Shopify.checkout.line_items[i].variant_title : '',
            "quantity": Number(Shopify.checkout.line_items[i].quantity),
            "price": Number(Shopify.checkout.line_items[i].line_price),
            "discount": (Shopify.checkout.line_items[i].discount_allocations.length!==0) ? Number(Shopify.checkout.line_items[i].discount_allocations[0].amount) : 0,
            "location_id": location_id,
            "item_brand": item_brand
        };
    }
    let purchaseObject = {
        transaction_id: Shopify.checkout.order_id,
        //value: parseFloat(Shopify.checkout.subtotal_price).toFixed(2),
        value: Number(Shopify.checkout.total_price_set.presentment_money.amount),
        discount: Shopify.checkout.discount == null ? 0 : Shopify.checkout.discount.amount,
        tax: parseInt(Shopify.checkout.subtotal_price - (Shopify.checkout.subtotal_price/1.27)),
        shipping: (Shopify.checkout.shipping_rate!==null) ? Shopify.checkout.shipping_rate.price : 0,
        currency: Shopify.Checkout.currency,
        items: line_items
    };
    if (Shopify.checkout.discount!==null) {
        purchaseObject.coupon = Shopify.checkout.discount;
    }
    console.log("purchaseObject", purchaseObject);
    gtag("event", "purchase", purchaseObject);
    console.log("/Google Analytics Enhanced Ecommerce Tracking");
    // Google Ads Conversion Tracking "Vásárlás"
    console.log("Google Ads Conversion Tracking");
    let conversionObject = {
        'send_to': send_to,
        //'value': parseFloat(Shopify.checkout.subtotal_price).toFixed(2),
        'value': Number(Shopify.checkout.total_price_set.presentment_money.amount),
        'currency': Shopify.Checkout.currency,
        'transaction_id': Shopify.checkout.order_id
    };
    console.log("conversionObject", conversionObject);
    gtag('event', 'conversion', conversionObject);
    console.log("/Google Ads Conversion Tracking");
}
function consentUpdateAdStorage(deniedOrGranted) {
    gtag('consent', 'update', {
        'ad_storage': deniedOrGranted
    });
}
function consentUpdateAdUserData(deniedOrGranted) {
    gtag('consent', 'update', {
        'ad_user_data': deniedOrGranted
    });
}
function consentUpdateAdPersonalization(deniedOrGranted) {
    gtag('consent', 'update', {
        'ad_personalization': deniedOrGranted
    });
}
function consentUpdateAnalyticsStorage(deniedOrGranted) {
    gtag('consent', 'update', {
        'analytics_storage': deniedOrGranted
    });
}














































var res = JSON.parse(document.querySelector('meta[name="serialized-graphql"]').getAttribute("content"));
for(let key in res){
    //console.log(res[key]);
    if(res[key].hasOwnProperty('session')) {
        //console.log('The property "session" exists.');
        console.log( res[key].session.negotiate.result.sellerProposal.runningTotal );
    } else {
        //console.log('The property "session" does not exist.');
    }
}




Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString(Shopify.locale+"-"+Shopify.country);
}
var date = new Date();
console.log(date.addDays(14));


// make collapsible content after X character
const dom = document.getElementsByClassName("hero__description")["0"];
const wordLimit = 100;
collapseContent(dom, wordLimit);
function collapseContent(dom, wordLimit = 100)
{
    var isCollapsed = true;
    let firstPart = document.createElement("div");
    let secondPart = document.createElement("div");

    var toggleButton = document.createElement("div");
    toggleButton.textContent = "▼";
    toggleButton.style.cursor = "pointer";
    toggleButton.style.textAlign = "center";

    firstPart.innerHTML = getWords(dom.innerHTML);
    secondPart.innerHTML = document.getElementsByClassName("hero__description")["0"].innerHTML.substring(wordLimit);
    secondPart.style.display = "none";

    dom.innerHTML = '';
    dom.appendChild(firstPart);
    dom.appendChild(toggleButton);
    dom.appendChild(secondPart);

    toggleButton.addEventListener('click', function() {
        if (isCollapsed) {
            secondPart.style.display = "block";
            toggleButton.textContent = "▲";
        } else {
            secondPart.style.display = "none";
            toggleButton.textContent = "▼";
        }
        isCollapsed = !isCollapsed;
    });

    //dom.innerHTML = firstPart + toggleButton + secondPart;
    function getWords(str) {
        return str.split(/\s+/).slice(0,wordLimit).join(" ");
    }
}

getWords(document.getElementsByClassName("hero__description")["0"].innerHTML);


document.getElementsByClassName("hero__description")["0"].innerHTML.substring(wordLimit);


// create a function to make checked all the checkboxes in site
function checkAllCheckboxes() {
	const checkboxes = document.querySelectorAll('input[type="checkbox"]');
	checkboxes.forEach((checkbox) => {
		checkbox.checked = true;
	});
}

const cartForm = document.getElementsByClassName("cart__form")["0"];
cartForm.addEventListener('submit', checkCartItemQuantities);

function checkCartItemQuantities(event) {
    event.preventDefault();

    // Get all the cart item quantity fields
    const cartItemQuantityFields = document.querySelectorAll('input[class="cart__quantity-field"]');
    var i = 1;

    // Check if any cart item quantity is less than the minimum
    for (const cartItemQuantityField of cartItemQuantityFields) {
        const itemId = cartItemQuantityField.getAttribute('data-id');
        const quantity = parseInt(cartItemQuantityField.value);
        const minQuantity = parseInt(cartItemQuantityField.getAttribute('min'));

        if (quantity < minQuantity) {
            alert('ÁLLÍCCS NAGYOBBAT, '+i+ '. terméknél a minimum: '+minQuantity+', a jelenlegi viszont: '+quantity);
            return;
        }
        i++;
    }

    // Submit the form if all cart item quantities are valid
    cartForm.submit();
}
