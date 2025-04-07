const redeemTruewallet = require('./api/truewallet');

const voucher_code = 'https://gift.truemoney.com/campaign/?v=3002oloeao';  // Link Voucher Truewallet
const phone_number = '0812345678';  // Phone Number

(async () => {
    const result = await redeemTruewallet(voucher_code, phone_number);
    console.log(result);
})();
