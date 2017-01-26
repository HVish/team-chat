"use strict";

module.exports = {
    index: (req, res) => {
        res.json({
            result: "success",
            data: "Welcome"
        });
    }
};
