module.exports = (req, res, next) => {
    const menu = [
        {
            title: "Home",
            url: "/",
            target: ""
        },
        {
            title: "Pages",
            url: "/pages",
            target: ""
        }
    ];
    
    res.locals.menu = menu;
    next();
};