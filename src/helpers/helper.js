

import { notification } from "antd";

export default class Helper {

}
// Helper.getLocation = () => {

//     return params.pathname;
// }


Helper.getItem = (key) => {
    let value = localStorage.getItem(key);
    if (value) {
        return JSON.parse(value);
    }
    return null;
}

Helper.getUserId = () => {
    let value = localStorage.getItem("user");
    if (value) {
        return JSON.parse(value).id;
    }
    return null;
}



Helper.removeItem = (key) => {
    localStorage.removeItem(key);
}

Helper.setItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}
Helper.sendNotification = (type, message, description) => {
    notification[type]({
        message,
        description,
    });
};
Helper.logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("REFRESH_TOKEN");
    Helper.sendNotification("success", "User logout")
}