// Products Database
// Each product should have: name, category, price, images (array), description (with cz and en), status
const products = [
    {
        id: 1,
        name: "Racer worldwide hoodie, size M",
        category: "outerwear",
        price: 3999,
        images: ["images/IMG_0326.png", "images/IMG_0327 2.png", "images/IMG_0328.png"],
        description: {
            cz: "Lehce nošená, fituje trochu vetší",
            en: "Lightly worn, fits slightly bigger"
        },
        status: "available"
    },
    {
        id: 2,
        name: "Bape Tee, size M",
        category: "tops",
        price: 2399,
        images: ["images/IMG_0329.png", "images/IMG_0330.png", "images/IMG_0331.png"],
        description: {
            cz: "Víc nošené triko, dá se koupit pouze v Japonsku",
            en: "More worn tee, can only be purchased in Japan"
        },
        status: "available",
        rotate: -90
    },
    {
        id: 3,
        name: "Nike grey joggers, size S",
        category: "bottoms",
        price: 899,
        images: ["images/IMG_0332.png", "images/IMG_0333.png", "images/IMG_0334.png"],
        description: {
            cz: "Dost nošené nike šedé tepláky, kvalitní materiál",
            en: "Well-worn Nike grey joggers, quality material"
        },
        status: "available"
    },
    {
        id: 4,
        name: "Vicinity black hoodie with print, size M",
        category: "outerwear",
        price: 2999,
        images: ["images/IMG_0335.png", "images/IMG_0336.png", "images/IMG_0337.png"],
        description: {
            cz: "Heavy mikina, více nošená",
            en: "Heavy hoodie, more worn"
        },
        status: "available",
        rotate: -90
    },
    {
        id: 5,
        name: "Supreme black graffiti tee, size M",
        category: "tops",
        price: 1499,
        images: ["images/IMG_0338.png", "images/IMG_0339.png", "images/IMG_0340.png"],
        description: {
            cz: "Málo nošené triko, koupené v Londýně",
            en: "Barely worn tee, purchased in London"
        },
        status: "available"
    },
    {
        id: 6,
        name: "CP company hoodie with goggles, size M",
        category: "outerwear",
        price: 6999,
        images: ["images/IMG_0341.png", "images/IMG_0342.png", "images/IMG_0343.png"],
        description: {
            cz: "Vůbec nenošená, lehký materiál ale kvalitní",
            en: "Never worn, lightweight but quality material"
        },
        status: "sold"
    },
    {
        id: 7,
        name: "Evisu yellow pants , size M",
        category: "bottoms",
        price: 3999,
        images: ["images/IMG_0344.png", "images/IMG_0345.png", "images/IMG_0346.png", "images/IMG_0347.png"],
        description: {
            cz: "Žluté evisu kalhoty lehce nošené, ale jinak laces",
            en: "Yellow Evisu pants lightly worn, otherwise pristine"
        },
        status: "sold"
    },
    {
        id: 8,
        name: "Vicinity beige hoodie size L",
        category: "outerwear",
        price: 1999,
        images: ["images/IMG_0348.png", "images/IMG_0349.png", "images/IMG_0350.png"],
        description: {
            cz: "Béžová vicinity hoodie tak 2x nošená jinak gucci bráško",
            en: "Beige Vicinity hoodie worn about 2 times, otherwise perfect bro"
        },
        status: "available"
    },
    {
        id: 9,
        name: "Ralph lauren svetr , size 2xl",
        category: "outerwear",
        price: 2499,
        images: ["images/IMG_0351.png", "images/IMG_0352.png", "images/IMG_0353.png"],
        description: {
            cz: "Ralph lauren modrý svetr je to 2xl takže bacha na to",
            en: "Ralph Lauren blue sweater, it's 2XL so watch out for that"
        },
        status: "available"
    },
    {
        id: 10,
        name: "Nike sport hoodie size S",
        category: "outerwear",
        price: 999,
        images: ["images/IMG_0354.png", "images/IMG_0355.png", "images/IMG_0356.png"],
        description: {
            cz: "Modrá nike sportovní mikina budes v ní možná vypadat jako šmoula ale neva.",
            en: "Blue Nike sport hoodie, you might look like a smurf in it but whatever."
        },
        status: "available"
    },
    {
        id: 11,
        name: "Ralph lauren basic white tee , size L",
        category: "tops",
        price: 1499,
        images: ["images/IMG_0357.png", "images/IMG_0358.png", "images/IMG_0359.png"],
        description: {
            cz: "Ralph lauren obyčejné triko, je celkem oversizes ale comfy asf.",
            en: "Ralph Lauren basic tee, quite oversized but comfy asf."
        },
        status: "sold"
    },
    {
        id: 12,
        name: "Nike airmax 95'tee size M",
        category: "tops",
        price: 799,
        images: ["images/IMG_0363.png", "images/IMG_0364.png", "images/IMG_0365.png"],
        description: {
            cz: "Nike airmax triko párkrát na sobě ale bez žádných vad.",
            en: "Nike Airmax tee worn a few times but without any flaws."
        },
        status: "available"
    },
    {
        id: 13,
        name:  "Named collective target zipup size M",
        category: "outererwear",
        price: 1899,
        images: ["images/IMG_0360.png", "images/IMG_0361.png", "images/IMG_0362.png"],
        description: {
            cz: "Zipup od značky name collective s terčem z kamínků bejby s.o. lejla vaŇko",
            en: "Zipup from Name Collective brand with rhinestone target, shoutout Leila Vanko"
        },
        status: "available"
    },
    {
        id: 14,
        name: "Pleasures x swisha housa Graphic Tee size M",
        category: "tops",
        price: 1699,
        images: ["images/IMG_0366.png", "images/IMG_0367.png", "images/IMG_0368.png"],
        description: {
            cz: "Tohle nádherné tričko s icedout chainem W",
            en: "This beautiful tee with iced-out chain, W"
        },
        status: "available"
    },
    {
        id: 15,
        name: "Fred perry polo longsleave size M ",
        category: "tops",
        price: 1999,
        images: ["images/IMG_0369.png", "images/IMG_0370.png", "images/IMG_0371.png"],
        description: {
            cz: "Fred ferry polo idealní pro hooligans znáš to.",
            en: "Fred Perry polo ideal for hooligans, you know it."
        },
        status: "available"
    },
    {
        id: 16,
        name: "Racer worldwide shorts size M",
        category: "bottoms",
        price: 2499,
        images: ["images/IMG_0375.png", "images/IMG_0376.png", "images/IMG_0377.png"],
        description: {
            cz: "Tyto nádherné kratasy maji díry na zadečku ale to je design.",
            en: "These beautiful shorts have holes on the back but that's the design."
        },
        status: "available"
    },
    {
        id: 17,
        name: "U.S. polo tee size M",
        category: "tops",
        price: 1899,
        images: ["images/IMG_0372.png", "images/IMG_0373.png", "images/IMG_0373.png"],
        description: {
            cz: "Tmavě modré polo tee idealní na nějaký byznys meety.",
            en: "Dark blue polo tee ideal for business meetings."
        },
        status: "sold"
    },
    {
        id: 18,
        name: "Cortiez shorts size M",
        category: "bottoms",
        price: 1499,
        images: ["images/IMG_0378.png", "images/IMG_0379.png", "images/IMG_0380.png"],
        description: {
            cz: "Tyto nádherné kratasy v barvě baby blue rdy na léto.",
            en: "These beautiful shorts in baby blue color ready for summer."
        },
        status: "sold"
    },
    {
        id: 19,
        name: "Inter miami adidas jersey size xl",
        category: "tops",
        price: 2999,
        images: ["images/IMG_0381.png", "images/IMG_0382.png", "images/IMG_0383.png"],
        description: {
            cz: "Dres nejlepšího fotbalisty co kdy existoval myslim že nic víc říkat nemusim.",
            en: "Jersey of the best footballer who ever lived, I think I don't need to say more."
        },
        status: "available"
    },
    {
        id: 20,
        name: "Black sweater, premium wool size M",
        category: "outerwear",
        price: 1999,
        images: ["images/IMG_0388.png", "images/IMG_0389.png", "images/IMG_0390.png"],
        description: {
            cz: "Kvalitní svetr z té nejlepší bavlny, Yeat type shit",
            en: "Quality sweater from the best cotton, Yeat type shit"
        },
        status: "sold"
    },
    {
        id: 21,
        name: "Palace tee size M",
        category: "tops",
        price: 1599,
        images: ["images/IMG_0391.png", "images/IMG_0392.png", "images/IMG_0393.png"],
        description: {
            cz: "Motivační palace tee třeba do gymu supr za me.",
            en: "Motivational Palace tee, great for the gym imo."
        },
        status: "available"
    },
    {
        id: 22,
        name: "Nike tech fleece size M",
        category: "outerwear",
        price: 2299,
        images: ["images/IMG_0394.png", "images/IMG_0395.png", "images/IMG_0396.png"],
        description: {
            cz: "Tuto mikinu noší především lidi černe barvy pleti a jsou gangsteři.",
            en: "This hoodie is mainly worn by people of dark skin color and they're gangsters."
        },
        status: "sold"
    },
    {
        id: 23,
        name: "Carrhart baggy cargo pants size L",
        category: "bottoms",
        price: 1999,
        images: ["images/IMG_0397.png", "images/IMG_0398.png", "images/IMG_0399.png"],
        description: {
            cz: "Tyto supr stylové kalhoty zakryjou že skipuješ leg day v gymu.",
            en: "These super stylish pants will hide that you skip leg day at the gym."
        },
        status: "available"
    },
    {
        id: 24,
        name: "Flare denim jeans size M",
        category: "bottoms",
        price: 899,
        images: ["images/IMG_0400.png", "images/IMG_0401.png", "images/IMG_0402.png"],
        description: {
            cz: "Tyhle kalhoty vám zaručí každou holku co budete chtít.",
            en: "These pants will guarantee you any girl you want."
        },
        status: "available"
    }
];