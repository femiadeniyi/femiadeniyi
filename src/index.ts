let options = {
    root: null,
    rootMargin: '0px',
    threshold: .5
}

let obUsedByMillions = new IntersectionObserver(
    (entries,b) => {
        entries.forEach(entry => {
            console.log(entry.intersectionRatio)
            if(entry.intersectionRatio>.5){
                $(".used-by-millions").fadeTo(1000,1)

                console.log(3333,entry.intersectionRatio,entry,b)
            }
        })
    },
    options
).observe(document.querySelector('.used-by-millions')!);


const animate = ({
    header1(){
        $(".header1").fadeTo(1000, 1,() => {
            $(".h-title").addClass("animate__animated animate__flash")
        })
    }
})

animate.header1()

const subHeader = [
    {
        title: "Products",
        subTitle: "Take Payment",
        description: "Facilitate taking payment in your app today thanks to Stripe - create online stores and marketplaces.",
    },
    {
        title: "Products",
        subTitle: "Pay only for what you need",
        description: "No need to hire a teams anymore. Use our free powerful templates and upgrade if necessary.",
    },
    {
        title: "Products",
        subTitle: "Enterprise Grade",
        description: "Technology that powers Google - reliable, secure and up to date with modern standards.",
    },
].map(async f => {
    const data = await fetch("tpl/sub-header.html")
    const html = await data.text()
    $(html).find(".card-title").text(f.title).end()
        .find(".card-subtitle").text(f.subTitle).end()
        .find(".card-text").text(f.description).end().appendTo("#sub-header")
})

const circleAnimation = [
    {
        align:"align-self-start",
        color:"#f36aa9"
    },
    {
        align:"align-self-end",
        color:"#7de2d1"
    },
    {
        align:"align-self-start",
        color:"#f36aa9"
    },
    {
        align:"align-self-end",
        color:"#e6ebf2"
    },
].map(async f => {
    const data = await fetch("tpl/circle-animation.html")
    const html = await data.text()
    console.log(html)
    $(html).addClass(f.align)
        .find(".circle").css("background",f.color).end()
        .appendTo("#circle-animation")
})

const content1 = [
    {
        inverse: false,
        author: "Devops Engineer",
        title: "Google Grade Security",
        subTitle: "Powered by Google",
        icon: `<i class="fab fa-google"></i>&nbsp;`,
        css: {paddingTop: "6rem",paddingBottom: "0"},
        testament: "As long as I follow Google standards, I have technical confidence in what I build 100% of the time.",
        description: "Peace of mind - Our stack is based on Google and we closely follow their guidelines to ensure we deliver Google quality applications with ease and efficiency."
    },
    {
        inverse: true,
        author: "Software Engineer",
        title: "Open Source",
        subTitle: "It's Free",
        icon: `<i class="fab fa-github"></i>&nbsp;`,
        css: {paddingTop: "6rem",paddingBottom: "0"},
        testament: "Whenever I have a technical problem, I just google it and I find the answer. This how I became a developer.",
        description: "Our tools are open source which actually helps us deliver better software since we adhere to common practices and standards used by millions of other developers."
    },
    {
        inverse: false,
        author: "Web Developer",
        title: "All Platforms",
        subTitle: "Mobile, Desktop and Web",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: 32px; width: 32px;"><g class="" transform="translate(0,0)" style=""><path d="M318 123.645l-61.5 35.7-61.76-35.7 61.76-35.7zm93.68 54.19l-61.76 35.7 61.76 35.7 61.5-35.7zm-294.39 80.64l61.76 35.7 61.5-35.7-61.5-35.7zm139.52-80.57l-61.76 35.7 61.76 35.7 61.5-35.7zM31 298.365l62 35.69v-71l-62-35.65v71zm373-26l-62 35.69v70.94l62-35.66v-70.97zm-225.11-139.4l-61.76 35.7 61.76 35.7 61.5-35.7zM109 343.305l62 35.69v-70.94l-62-35.69v71zm225.41-120.45l-61.76 35.7 61.76 35.7 61.5-35.7zM249 353.055l-62-35.7v71l62 35.7v-71zm77-35.67l-61 35.67v70.94l61-35.66v-70.95zm8.07-184.5l-61.76 35.7 61.76 35.7 61.5-35.7zm-232.6 44.95l-61.77 35.7 61.76 35.7 61.5-35.7zM481 227.565l-61 35.66v70.94l61-35.66v-70.94zm-286.11 75.93l61.76 35.7 61.5-35.7-61.5-35.7z" fill="#000000" fill-opacity="1"></path></g></svg>&nbsp;`,
        css: {paddingTop: "6rem", paddingBottom: "6rem"},
        testament: "Back in the day, you coded the same site twice for mobile and web. Now we code once and it works everywhere.",
        description: "Our tools allow us to build once for all platforms and enjoy a native experience. This comes for free with all of our templates."
    }
].map(async f => {
    const data = await fetch("tpl/content1.html")
    const html = await data.text()
    $(html).addClass(f.inverse ? "flex-md-row-reverse" : "").css(f.css)
        .find(".first").addClass(`col-md-3 ${f.inverse && "offset-md-1"}`).removeClass("col").end()
        .find(".icon").html(f.icon).end()
        .find(".title").text(f.title).end()
        .find(".second").addClass(`col-md-4 ${!f.inverse && "offset-md-1"}`).end()
        .find(".subtitle").text(f.subTitle).end()
        .find(".description").text(f.description).end()
        .find(".testament").text(f.testament).end()
        .insertAfter("#explore")
})

const a = [

    {
        scene:1,
        second:.28,
        value:"no wehala",
    },
    {
        scene:3,
        second:.31,
        value:"no wehala",
    },
    {
        scene:1,
        second:.34,
        value:"for me",
    },
    {
        scene:3,
        second:.37,
        value:"bentley",
    },
    {
        scene:1,
        second:.395,
        value:"for me",
    },
    {
        scene:3,
        second:.423,
        value:"bentley",
    },
    {
        scene:1,
        second:.446,
        value:"for me",
    },
    {
        scene:3,
        second:.47,
        value:"bentley",
    },
    {
        scene:1,
        second:.50,
        value:"for me",
    },
    {
        scene:3,
        second:.524,
        value:"bentley",
    },
    {
        scene:1,
        second:.783,
        value:"God",
    },
    {
        scene:2,
        second:.789,
        value:"be",
    },
    {
        scene:3,
        second:.795,
        value:"for me",
    },
    {
        scene:1,
        second:.815,
        value:"brand new",
    },
    {
        scene:2,
        second:.828,
        value:"bentley",
    },
    {
        scene:1,
        second:.89,
        value:"God",
    },
    {
        scene:2,
        second:.898,
        value:"be",
    },
    {
        scene:3,
        second:.903,
        value:"for me",
    },
]

const content2 = [
    {
        inverse: false,
        author: "Devops Engineer",
        title: "Google Grade Security",
        subTitle: "Powered by Google",
        icon: `<i class="fab fa-google"></i>&nbsp;`,
        css: {paddingTop: "6rem",paddingBottom: "0"},
        testament: "As long as I follow Google standards, I have technical confidence in what I build 100% of the time.",
        description: "Peace of mind - Our stack is based on Google and we closely follow their guidelines to ensure we deliver Google quality applications with ease and efficiency."
    },
    {
        inverse: true,
        author: "Software Engineer",
        title: "Open Source",
        subTitle: "It's Free",
        icon: `<i class="fab fa-github"></i>&nbsp;`,
        css: {paddingTop: "6rem",paddingBottom: "0"},
        testament: "Whenever I have a technical problem, I just google it and I find the answer. This how I became a developer.",
        description: "Our tools are open source which actually helps us deliver better software since we adhere to common practices and standards used by millions of other developers."
    },
    {
        inverse: false,
        author: "Web Developer",
        title: "All Platforms",
        subTitle: "Mobile, Desktop and Web",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: 32px; width: 32px;"><g class="" transform="translate(0,0)" style=""><path d="M318 123.645l-61.5 35.7-61.76-35.7 61.76-35.7zm93.68 54.19l-61.76 35.7 61.76 35.7 61.5-35.7zm-294.39 80.64l61.76 35.7 61.5-35.7-61.5-35.7zm139.52-80.57l-61.76 35.7 61.76 35.7 61.5-35.7zM31 298.365l62 35.69v-71l-62-35.65v71zm373-26l-62 35.69v70.94l62-35.66v-70.97zm-225.11-139.4l-61.76 35.7 61.76 35.7 61.5-35.7zM109 343.305l62 35.69v-70.94l-62-35.69v71zm225.41-120.45l-61.76 35.7 61.76 35.7 61.5-35.7zM249 353.055l-62-35.7v71l62 35.7v-71zm77-35.67l-61 35.67v70.94l61-35.66v-70.95zm8.07-184.5l-61.76 35.7 61.76 35.7 61.5-35.7zm-232.6 44.95l-61.77 35.7 61.76 35.7 61.5-35.7zM481 227.565l-61 35.66v70.94l61-35.66v-70.94zm-286.11 75.93l61.76 35.7 61.5-35.7-61.5-35.7z" fill="#000000" fill-opacity="1"></path></g></svg>&nbsp;`,
        css: {paddingTop: "6rem", paddingBottom: "6rem"},
        testament: "Back in the day, you coded the same site twice for mobile and web. Now we code once and it works everywhere.",
        description: "Our tools allow us to build once for all platforms and enjoy a native experience. This comes for free with all of our templates."
    }
].map(async f => {
    const data = await fetch("tpl/content1.html")
    const html = await data.text()
    $(html).addClass(f.inverse ? "flex-md-row-reverse" : "").css(f.css)
        .find(".first").addClass(`col-md-3 ${f.inverse && "offset-md-1"}`).removeClass("col").end()
        .find(".icon").html(f.icon).end()
        .find(".title").text(f.title).end()
        .find(".second").addClass(`col-md-4 ${!f.inverse && "offset-md-1"}`).end()
        .find(".subtitle").text(f.subTitle).end()
        .find(".description").text(f.description).end()
        .find(".testament").text(f.testament).end()
        .insertAfter("#explore")
})