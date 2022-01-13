exports.getDate = function() {
    let today = new Date();

    let options = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    }
    console.log(today)
    let day = today.toLocaleDateString("en-US", options);
    return day;
}