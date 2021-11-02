const router = require("express").Router();
const stripe = require("stripe")("sk_test_51JiIKUEBhQiQRacKKtQ6ZKwgFDVdyI94PVgCc9ufhI6KkZcP8OMX3GvFNAcChzwKOItJcfFQjUQm8Uz6gKtBVSGE00trlGlFI8")


router.post("/payment", (req, res) => {

    stripe.charges.create({

        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd",
    },
        (stripeErr, stripeRes) => {

            if (stripeErr) {
                res.status(500).json(stripeErr)
            } else {
                res.status(200).json(stripeRes)
            }
        })

})



module.exports = router;