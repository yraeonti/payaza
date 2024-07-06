import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://api.payaza.africa/live/payaza-account/api/v1/mainaccounts/merchant/enquiry/main",
      headers: {
        "X-TenantID": "live",
        Authorization: `Payaza ${process.env.API_KEY_PAYOUT!}`,
      },
    };

    const res = await axios.request(config);

    return NextResponse.json({
      data: res.data,
      status: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong...",
      },
      {
        status: 500,
      }
    );
  }
}
