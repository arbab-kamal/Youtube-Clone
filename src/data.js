/* eslint-disable no-unused-vars */
export const API_KEY = 'AIzaSyCCOILYU7YtSu_1tb9KjEmo-WciYNQ66is'



export const value_converter = (value) => {
    if (value >= 1000000) {
        return Math.floor(value / 1000000) + "M"
    } else if (value >= 1000) {
        return Math.floor(value / 1000) + "M"
    } else {
        return value
    }

}