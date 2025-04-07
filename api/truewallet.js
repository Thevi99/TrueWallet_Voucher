const axios = require('axios');

async function redeemTruewallet(voucher_code, phone_number) {
    voucher_code = voucher_code.replace('https://gift.truemoney.com/campaign/?v=', '').trim();

    if (!voucher_code || !phone_number) {
        return {
            status: 'FAIL',
            reason: 'voucher_code and phone_number are required.'
        };
    }

    const data = {
        mobile: phone_number,
        voucher_hash: voucher_code
    };

    try {
        const response = await axios.post(
            `https://gift.truemoney.com/campaign/vouchers/${voucher_code}/redeem`,
            JSON.stringify(data),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'Mozilla/5.0'
                }
            }
        );

        const resjson = response.data;

        if (resjson.status.code === 'SUCCESS') {
            return {
                status: 'SUCCESS',
                amount: parseInt(resjson.data.voucher.redeemed_amount_baht)
            };
        } else {
            return {
                status: 'FAIL',
                reason: resjson.status.message
            };
        }
    } catch (err) {
        return {
            status: 'FAIL',
            reason: err?.response?.data?.status?.message || err.message || 'Unknown error occurred'
        };
    }
}

module.exports = redeemTruewallet;
