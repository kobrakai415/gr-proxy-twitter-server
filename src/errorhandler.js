export const forbiddenErrorHandler = (err, req, res, next) => {
    console.log(err)
    if (err.status === 403) {
        res.status(403).send("Forbidden!");
    } else {
        next(err);
    }
};
export const catchAllErrorHandler = (err, req, res, next) => {
    console.log(error)
    res.status(500).send("Generic Server Error");
};