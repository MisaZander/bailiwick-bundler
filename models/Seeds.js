const About = require("./About");
const Contact = require("./Contact");
const Landing = require("./Landing");
const User = require("./User");
const isEmpty = require("../validation/is-empty");

module.exports = () => {
    console.log("Checking database content...");

    User.find().exec((err, users) => {
        if(err) {
         console.log(err);
        } else {
            //console.log("Users:", users);
            if(isEmpty(users)){
                //console.log("Users empty; Should seed...");
                let adminUser = new User({
                    hash: "$2a$10$nhIe5o4x/a6cpRf5oY2qge5m3WYOZFvwJl0y6.nFwJ0S2wBWWl9im", 
                    name: "Admin",
                    email: "admin@admin.com",
                    userlevel: 2
                });

                adminUser.save((err, admin) => {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("No user. Default admin user with email 'admin@admin.com' and password 'password' created.");
                        console.log("You should login and change these credentials immediately.")
                    }
                })
            } else {
                console.log("Users filled already.");

            }
        }
    });

    About.find({contentName: "about"}).exec((err, about) => {
        if(err) {
            console.log(err);
        } else {
            if(isEmpty(about)) {
                let aboutSeed = new About({
                    contentName: "about",
                    title: "About Me",
                    data: [
                        {
                            key: 1,
                            cattype: "about",
                            texttype: "headline",
                            text: "My Story"
                        },
                        {
                            key: 2,
                            cattype: "about",
                            texttype: "body",
                            text: "Just a small town girl..."
                        },
                        {
                            key: 3,
                            cattype: "about",
                            texttype: "headline",
                            text: "Where I Am Now"
                        },
                        {
                            key: 4,
                            cattype: "about",
                            texttype: "body",
                            text: "LIVIN IN A LONELY WORLD!"
                        }
                    ]
                });

                aboutSeed.save((err, doc) => {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("No existing About content. Some has been generated.")
                    }
                })
            } else {
                console.log("About content already loaded.")
            }

        }
    });

    Contact.find({contentName: "contact"}).exec((err, contact) => {
        if(err) {
            console.log(err);
        } else {
            //console.log("Contact:", contact);
            if(isEmpty(contact)){
                let newContact = new Contact({
                    contentName: "contact",
                    mode: "Calling Card",
                    title: "Contact Me",
                    data: [
                        {
                            key: 1,
                            cattype: "contact",
                            texttype: "name",
                            text: "Para Norman"
                        },
                        {
                            key: 2,
                            cattype: "contact",
                            texttype: "email",
                            text: "123fakestreet@gmail.com"
                        },
                        {
                            key: 3,
                            cattype: "contact",
                            texttype: "phone",
                            text: "(818) JKL-PUZO"
                        },
                        {
                            key: 4,
                            cattype: "contact",
                            texttype: "image",
                            text: "munroe-3a.jpg"
                        }
                    ]
                });

                newContact.save((err, card) => {
                    if(err){
                        console.log(err);
                    } else {
                        console.log("No calling card found. One has been generated.")
                    }
                })
            } else {
                console.log("Calling card was found. Skipping pre-populate.")
            }
        }
    });

    Landing.find({contentName: "landing"}).exec((err, landing) => {
        if(err) {
            console.log(err);
        } else {
            //console.log("Landing:", landing);
            if(isEmpty(landing)){
                let newLanding = new Landing({
                    contentName: "landing",
                    title: "Your New Website is Ready to Serve You!",
                    calltoaction: "I Am a Call to Action",
                    data: [
                        {
                            key: 1,
                            cattype: "blurb",
                            texttype: "title",
                            text: "I Am a Blurb"
                        },
                        {
                            key: 1,
                            cattype: "blurb",
                            texttype: "ahref",
                            text: "/about"
                        },
                        {
                            key: 1,
                            cattype: "blurb",
                            texttype: "aval",
                            text: "See About Page"
                        },
                        {
                            key: 1,
                            cattype: "blurb",
                            texttype: "img",
                            text: "Barber.png"
                        },
                        {
                            key: 1,
                            cattype: "blurb",
                            texttype: "text",
                            text: "I contain a sentence or two to describe another part of your website. You can also customize the below link to point elsewhere."
                        },
                        {
                            key: 2,
                            cattype: "blurb",
                            texttype: "title",
                            text: "I Am Another Blurb"
                        },
                        {
                            key: 2,
                            cattype: "blurb",
                            texttype: "ahref",
                            text: "/contact"
                        },
                        {
                            key: 2,
                            cattype: "blurb",
                            texttype: "aval",
                            text: "View Calling Card"
                        },
                        {
                            key: 2,
                            cattype: "blurb",
                            texttype: "img",
                            text: "facial.png"
                        },
                        {
                            key: 2,
                            cattype: "blurb",
                            texttype: "text",
                            text: "You can have as many of me on this page to suit your needs. I describe the contact page for instance."
                        },
                        {
                            key: 1,
                            cattype: "finisher",
                            texttype: "ahref",
                            text: "/register"
                        },
                        {
                            key: 1,
                            cattype: "finisher",
                            texttype: "aval",
                            text: "Register Now!"
                        },
                        {
                            key: 1,
                            cattype: "finisher",
                            texttype: "text",
                            text: "Wanna register?"
                        },
                        {
                            key: 2,
                            cattype: "finisher",
                            texttype: "ahref",
                            text: "/login"
                        },
                        {
                            key: 2,
                            cattype: "finisher",
                            texttype: "aval",
                            text: "Login"
                        },
                        {
                            key: 2,
                            cattype: "finisher",
                            texttype: "text",
                            text: "Registered already? Log in now."
                        },
                        {
                            key: 3,
                            cattype: "finisher",
                            texttype: "ahref",
                            text: "/gallery"
                        },
                        {
                            key: 3,
                            cattype: "finisher",
                            texttype: "aval",
                            text: "View Gallery"
                        },
                        {
                            key: 3,
                            cattype: "finisher",
                            texttype: "text",
                            text: "Gallery didn't make it in this version, but you can look anyway."
                        }
                    ]
                })

                newLanding.save((err, doc) => {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("No homepage content found. Some has been generated.")
                    }
                })
            } else {
                console.log("Landing found. Skipping pre-fill.");
            }
        }
    })
};