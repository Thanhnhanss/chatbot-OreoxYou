import {
    response
} from "express";
import request from "request";
require("dotenv").config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

const IMAGE_GET_STARTES = 'https://bit.ly/botmain1x1';
const IMAGE_MAIN_MENU_1 = 'https://bit.ly/botmain1';
const IMAGE_MAIN_MENU_2 = 'https://bit.ly/botmian2';
const IMAGE_MAIN_MENU_3 = 'https://bit.ly/botmain3';

const IMAGE_VIEW_APPETIZERS = 'https://bit.ly/botmain4';
const IMAGE_VIEW_BEEF = 'https://bit.ly/botmain5';
const IMAGE_VIEW_MEAT = 'https://bit.ly/botmain6';
const IMAGE_BACK_MAIN_MENU = 'https://bit.ly/botmain7';

const IMAGE_DEATAIL_APPERTIZERS_1 = 'https://bit.ly/botmain8';
const IMAGE_DEATAIL_APPERTIZERS_2 = 'https://bit.ly/botmain9';
const IMAGE_DEATAIL_APPERTIZERS_3 = 'https://bit.ly/botmain10';

const IMAGE_DEATAIL_BEEF_1 = 'https://bit.ly/botmain11';
const IMAGE_DEATAIL_BEEF_2 = 'https://bit.ly/botmain12';
const IMAGE_DEATAIL_BEEF_3 = 'https://bit.ly/botmain13';

const IMAGE_DEATAIL_MEAT_1 = 'https://bit.ly/botmain14x1';
const IMAGE_DEATAIL_MEAT_2 = 'https://bit.ly/botmain15x';
const IMAGE_DEATAIL_MEAT_3 = 'https://bit.ly/botmain16x';

const IMAGE_DETAIL_ROOMS = 'https://bit.ly/botmain17x1';

const IMAGE_GIF_WELCOME = 'https://bit.ly/botmain18';


let callSendAPI = async (sender_psid, response) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Construct the message body
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "message": response
            }

            await sendTypingOn(sender_psid);
            await sendMarkReadMessage(sender_psid);

            // Send the HTTP request to the Messenger Platform
            request({
                "uri": "https://graph.facebook.com/v9.0/me/messages",
                "qs": {
                    "access_token": PAGE_ACCESS_TOKEN
                },
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                console.log('---------------');
                console.log(body);
                console.log('---------------');
                if (!err) {
                    resolve('message sent!')
                    // console.log('message sent!')
                } else {
                    console.error("Unable to send message:" + err);
                }
            });

        } catch (e) {
            reject(e);
        }
    })

}

let sendTypingOn = (sender_psid) => {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "sender_action": "typing_on"
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v9.0/me/messages",
        "qs": {
            "access_token": PAGE_ACCESS_TOKEN
        },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('sendTypingOn sent!')
        } else {
            console.error("Unable to sendTypingOn message:" + err);
        }
    });
}

let sendMarkReadMessage = (sender_psid) => {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "sender_action": "mark_seen"
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v9.0/me/messages",
        "qs": {
            "access_token": PAGE_ACCESS_TOKEN
        },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('sendMarkReadMessage sent!')
        } else {
            console.error("Unable to sendMarkReadMessage message:" + err);
        }
    });
}


let getUserName = (sender_psid) => {
    return new Promise((resolve, reject) => {
        request({
            "uri": `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
            "method": "GET",
        }, (err, res, body) => {
            if (!err) {
                body = JSON.parse(body);
                // "first_name": "Peter",
                // "last_name": "Chang",
                let username = `${body.last_name} ${body.first_name}`;
                resolve(username);
            } else {
                console.error("Unable to send message:" + err);
                reject(err);
            }
        });
    })
}

let handleGetStarted = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let username = await getUserName(sender_psid);
            let response = {
                "text": `Hallo! ${username}. C???m ??n b???n ???? ?????n v???i OreoxYou <3`
            };
            // let response2 = getStartedTemplate();

            //send an image
            let response2 = getImageGetStartesTemplate();

            let response3 = getStartedQuickReplyTemplate();




            // send texxt message
            await callSendAPI(sender_psid, response);

            //send generic template message
            //send an image
            await callSendAPI(sender_psid, response2);
            // send quick reply
            await callSendAPI(sender_psid, response3);



            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
}

let getStartedTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "OreoxYou an automation chatbot for you <3 ",
                    "subtitle": "Below are the options",
                    "image_url": IMAGE_GET_STARTES,
                    "buttons": [{
                            "type": "postback",
                            "title": "MENU CH??NH",
                            "payload": "MAIN_MENU",
                        },
                        {
                            "type": "web_url",
                            "url": `${process.env.URL_WEB_VIEW_ORDER}`,
                            "title": "?????T B??N",
                            "webview_height_ratio": "tall",
                            "messenger_extensions": true
                        },
                        {
                            "type": "postback",
                            "title": "H?????NG D???N S??? D???NG BOT",
                            "payload": "GUIDE_TO_USE",
                        }
                    ],
                }]
            }
        }
    }
    return response;
}

let getImageGetStartesTemplate = () => {
    let response = {
        "attachment": {
            "type": "image",
            "payload": {
                "url": IMAGE_GIF_WELCOME,
                "is_reusable": true
            }
        }

    }
    return response;
}

let getStartedQuickReplyTemplate = () => {
    let response = {
        "text": "SAU ????Y L?? C??C L???A CH???N:",
        "quick_replies": [{
                "content_type": "text",
                "title": "MENU CH??NH",
                "payload": "MAIN_MENU",
            },
            {
                "content_type": "text",
                "title": "H?????NG D???N S??? D???NG",
                "payload": "GUIDE_TO_USE",
            },
        ]
    }
    return response;
}

let handleSendMainMenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = getMainMenuTemplate();
            await callSendAPI(sender_psid, response);

            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
}

let getMainMenuTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                        "title": "Menu c???a OreoxYou ",
                        "subtitle": "Ch??ng t??i h??n h???nh mang ?????n cho b???n th???c ????n phong ph?? cho b???a th??a ho???c b???a t???i",
                        "image_url": IMAGE_MAIN_MENU_1,
                        "buttons": [{
                                "type": "postback",
                                "title": "B???A TR??A",
                                "payload": "LUNCH_MENU",
                            },
                            {
                                "type": "postback",
                                "title": "B???A T???I",
                                "payload": "DINNER_MENU",
                            },

                        ],
                    },
                    {
                        "title": "Gi??? m??? c???a ",
                        "subtitle": "TH??? 2 - TH??? 6 10AM - 11PM | TH??? 7 5PM - 10PM | CN 5PM - 11PM",
                        "image_url": IMAGE_MAIN_MENU_2,
                        "buttons": [

                            {
                                "type": "web_url",
                                "url": `${process.env.URL_WEB_VIEW_ORDER}`,
                                "title": "?????T B??N",
                                "webview_height_ratio": "tall",
                                "messenger_extensions": true
                            }
                        ],
                    },
                    {
                        "title": "Kh??ng gian nh?? h??ng",
                        "subtitle": "Nh?? h??ng c?? s???c ch???a k??n ?????n 400 kh??ch v?? ph???c v??? c??c bu???i ti???c l???n",
                        "image_url": IMAGE_MAIN_MENU_3,
                        "buttons": [

                            {
                                "type": "postback",
                                "title": "CHI TI???T",
                                "payload": "SHOW_ROOM",
                            },

                        ],
                    },

                ]
            }
        }
    }
    return response;
}


let handleSendLunchMenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = getLunchMenuTemplate();
            await callSendAPI(sender_psid, response);

            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
}

let getLunchMenuTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                        "title": "M??n tr??ng mi???ng ",
                        "subtitle": "Nh?? h??ng c?? nhi???u m??n tr??ng mi???ng h???p d???n",
                        "image_url": IMAGE_VIEW_APPETIZERS,
                        "buttons": [{
                            "type": "postback",
                            "title": "XEM CHI TI???T",
                            "payload": "VIEW_APPETIZERS",
                        }, ],
                    },
                    {
                        "title": "Th???t b??",
                        "subtitle": "Beefstake v?? ph??? b?? l??m t??? b?? kobe",
                        "image_url": IMAGE_VIEW_BEEF,
                        "buttons": [{
                            "type": "postback",
                            "title": "XEM CHI TI???T",
                            "payload": "VIEW_BEEF",
                        }, ],
                    },
                    {
                        "title": "Th???t hun kh??i",
                        "subtitle": "?????m b???o ch???t l?????ng cao",
                        "image_url": IMAGE_VIEW_MEAT,
                        "buttons": [{
                                "type": "postback",
                                "title": "XEM CHI TI???T",
                                "payload": "VIEW_MEAT",
                            },

                        ],
                    },
                    {
                        "title": "Quay tr??? l???i",
                        "subtitle": "Quay tr??? l???i MENU ch??nh",
                        "image_url": IMAGE_BACK_MAIN_MENU,
                        "buttons": [

                            {
                                "type": "postback",
                                "title": "QUAY TR??? L???I",
                                "payload": "BACK_TO_MAIN_MENU",
                            },

                        ],
                    },

                ]
            }
        }
    }
    return response;
}

let handleSendDinnerMenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = getDinnerMenuTemplate();
            await callSendAPI(sender_psid, response);

            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
}

let getDinnerMenuTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                        "title": "M??n khai v???",
                        "subtitle": "G???i ng?? sen, ch??? gi?? chi??n",
                        "image_url": IMAGE_VIEW_APPETIZERS,
                        "buttons": [{
                            "type": "postback",
                            "title": "XEM CHI TI???T",
                            "payload": "VIEW_APPETIZERS",
                        }, ],
                    },
                    {
                        "title": "M??n ch??nh",
                        "subtitle": "C?? t???m s???t vang",
                        "image_url": IMAGE_VIEW_BEEF,
                        "buttons": [{
                            "type": "postback",
                            "title": "XEM CHI TI???T",
                            "payload": "VIEW_BEEF",
                        }, ],
                    },
                    {
                        "title": "Tr??ng mi???ng",
                        "subtitle": "Nho, cam, qu??t",
                        "image_url": IMAGE_VIEW_MEAT,
                        "buttons": [

                            {
                                "type": "postback",
                                "title": "XEM CHI TI???T",
                                "payload": "VIEW_MEAT",
                            },

                        ],
                    },
                    {
                        "title": "Quay tr??? l???i",
                        "subtitle": "Quay tr??? l???i MENU ch??nh",
                        "image_url": IMAGE_BACK_MAIN_MENU,
                        "buttons": [

                            {
                                "type": "postback",
                                "title": "QUAY TR??? L???I",
                                "payload": "BACK_TO_MAIN_MENU",
                            },

                        ],
                    },

                ]
            }
        }
    }
    return response;
}

let getBacktoMainMenuTemplate = () => {

}

let handleBacktoMainMenu = async (sender_psid) => {
    await handleSendMainMenu(sender_psid);
}

let getDetailViewAppetzersTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                        "title": "D??a h???u Japan",
                        "subtitle": "800.000/kg",
                        "image_url": IMAGE_DEATAIL_APPERTIZERS_1,
                    },
                    {
                        "title": "D???a HongKong",
                        "subtitle": "1.200.000/tr??i",
                        "image_url": IMAGE_DEATAIL_APPERTIZERS_2,
                    },
                    {
                        "title": "Nho kho Malaysia",
                        "subtitle": "330.000/gr",
                        "image_url": IMAGE_DEATAIL_APPERTIZERS_3,
                    },
                    {
                        "title": "Quay tr??? l???i",
                        "subtitle": "Quay tr??? l???i MENU ch??nh",
                        "image_url": IMAGE_BACK_MAIN_MENU,
                        "buttons": [

                            {
                                "type": "postback",
                                "title": "QUAY TR??? L???I",
                                "payload": "BACK_TO_MAIN_MENU",
                            },

                        ],
                    },

                ]
            }
        }
    }
    return response;
}

let handleDetailViewAppetzers = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = getDetailViewAppetzersTemplate();
            await callSendAPI(sender_psid, response);

            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
}


let getDetailViewBeefTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                        "title": "Th???t b?? l??n Campuchia",
                        "subtitle": "1.000.000/set",
                        "image_url": IMAGE_DEATAIL_BEEF_1,
                    },
                    {
                        "title": "Th???t b?? tr???n Thailand",
                        "subtitle": "1.200.000/set",
                        "image_url": IMAGE_DEATAIL_BEEF_2,
                    },
                    {
                        "title": "Th???t b?? hiphop VietNam",
                        "subtitle": "4.500.000/set",
                        "image_url": IMAGE_DEATAIL_BEEF_3,
                    },
                    {
                        "title": "Quay tr??? l???i",
                        "subtitle": "Quay tr??? l???i MENU ch??nh",
                        "image_url": IMAGE_BACK_MAIN_MENU,
                        "buttons": [

                            {
                                "type": "postback",
                                "title": "QUAY TR??? L???I",
                                "payload": "BACK_TO_MAIN_MENU",
                            },

                        ],
                    },

                ]
            }
        }
    }
    return response;
}


let handleDetailViewBeef = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = getDetailViewBeefTemplate();
            await callSendAPI(sender_psid, response);

            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
}

let getDetailViewMeatTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                        "title": "Th???t c???u China",
                        "subtitle": "800.000/set",
                        "image_url": IMAGE_DEATAIL_MEAT_1,
                    },
                    {
                        "title": "Th???t h???i s???n L??o",
                        "subtitle": "1.200.000/set",
                        "image_url": IMAGE_DEATAIL_MEAT_2,
                    },
                    {
                        "title": "Th???t ng?????i USA",
                        "subtitle": "1.000.000.000/set",
                        "image_url": IMAGE_DEATAIL_MEAT_3,
                    },
                    {
                        "title": "Quay tr??? l???i",
                        "subtitle": "Quay tr??? l???i MENU ch??nh",
                        "image_url": IMAGE_BACK_MAIN_MENU,
                        "buttons": [

                            {
                                "type": "postback",
                                "title": "QUAY TR??? L???I",
                                "payload": "BACK_TO_MAIN_MENU",
                            },

                        ],
                    },

                ]
            }
        }
    }
    return response;
}

let handleDetailViewMeat = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = getDetailViewMeatTemplate();
            await callSendAPI(sender_psid, response);

            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
}

let getButtonRoomsTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "OreoxYou c?? th??? ph???c v??? t???i ??a 400 kh??ch",
                "buttons": [{
                        "type": "postback",
                        "title": "MENU CH??NH",
                        "payload": "MAIN_MENU"
                    },
                    {
                        "type": "web_url",
                        "url": `${process.env.URL_WEB_VIEW_ORDER}`,
                        "title": "?????T B??N",
                        "webview_height_ratio": "tall",
                        "messenger_extensions": true
                    }
                ]
            }
        }
    }
    return response;
}

let getImageRoomsTemplate = () => {
    let response = {
        "attachment": {
            "type": "image",
            "payload": {
                "url": IMAGE_DETAIL_ROOMS,
                "is_reusable": true
            }
        }

    }
    return response;
}
let handleShowDetailRooms = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            //send an image 
            let response = getImageRoomsTemplate();
            //send a button template : text, button
            let response2 = getButtonRoomsTemplate();

            await callSendAPI(sender_psid, response);
            await callSendAPI(sender_psid, response2);

            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
}

let handleGuideToUseBot = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            //send text message
            let username = await getUserName(sender_psid);
            let response = {
                "text": `Hello! ${username}, tui l?? bot OreoxYou.\n????? bi???t th??m th??ng tin, b???n vui l??ng xem video b??n d?????i.?????????? `
            };

            //send a media templates : video, buttons
            let response2 = getBotMediaTemplate();

            await callSendAPI(sender_psid, response);
            await callSendAPI(sender_psid, response2);

            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
}

let getBotMediaTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "media",
                "elements": [{
                    "media_type": "video",
                    "url": "https://business.facebook.com/OreoxYou/videos/886818372236943/",

                    "buttons": [{
                            "type": "postback",
                            "title": "MENU CH??NH",
                            "payload": "MAIN_MENU",
                        },
                        {
                            "type": "web_url",
                            "title": "OreoxYou Page",
                            "url": "https://www.facebook.com/OreoxYou/",
                            "webview_height_ratio": "full"
                        }
                    ]
                }]
            }
        }
    };
    return response;
}
module.exports = {
    handleGetStarted: handleGetStarted,
    handleSendMainMenu: handleSendMainMenu,
    handleSendLunchMenu: handleSendLunchMenu,
    handleSendDinnerMenu: handleSendDinnerMenu,
    handleBacktoMainMenu: handleBacktoMainMenu,
    handleDetailViewAppetzers: handleDetailViewAppetzers,
    handleDetailViewBeef: handleDetailViewBeef,
    handleDetailViewMeat: handleDetailViewMeat,
    handleShowDetailRooms: handleShowDetailRooms,
    callSendAPI: callSendAPI,
    getUserName: getUserName,
    handleGuideToUseBot: handleGuideToUseBot,

}