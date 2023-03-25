import NewebPay from 'node-newebpay'
const key = "zqr70wkJiJyXrpjoL1XWAgVDlNNIKnBs"
const iv = "C43Ge3BYGxLl7qmP"
const mid = "MS148427498"

import { json } from "@sveltejs/kit"
import type { RequestHandler } from './$types';
const client = NewebPay(key, iv)

export const GET: RequestHandler = () => {
  const date = Math.floor(Date.now()/1000)
  const trade_info = {
    MerchantID: mid,
    RespondType: 'String',
    TimeStamp: date,
    Version: 2.0,
    MerchantOrderNo: `test_${date}`, 
    Amt: 30,
    ItemDesc: 'test',
    NotifyURL: 'https://us-central1-blog-eff28.cloudfunctions.net/processPayment'
  }
  let trade_info_aes = client.TradeInfo(trade_info).encrypt()
  let trade_sha = client.TradeInfo(trade_info_aes).TradeSha()

	return json({
	  aes: trade_info_aes,
	  sha: trade_sha,
    orderNumber: `test_${date}`
	})
};
