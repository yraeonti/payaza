import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import * as uuidv4 from "uuid";

export async function POST(req: NextRequest) {
  const {
    customer_first_name,
    customer_last_name,
    customer_email,
    customer_phone,
    payment_amount,
  } = await req.json();
  try {
    if (
      !customer_email ||
      !customer_first_name ||
      !customer_last_name ||
      !customer_phone ||
      !payment_amount
    ) {
      return NextResponse.json(
        {
          message: "All fields are required",
        },
        {
          status: 400,
        }
      );
    }
    const reference = `REF${uuidv4.v4()}`;

    let data = JSON.stringify({
      service_type: "Account",
      service_payload: {
        request_application: "Payaza",
        application_module: "USER_MODULE",
        application_version: "1.0.0",
        request_class: "MerchantCreateVirtualAccount",
        customer_first_name: customer_first_name,
        customer_last_name: customer_last_name,
        customer_email: customer_email,
        customer_phone: customer_phone,
        virtual_account_provider: "Premiumtrust",
        payment_amount: payment_amount,
        payment_reference: reference.slice(0, 10),
      },
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://router-live.78financials.com/api/request/secure/payloadhandler",
      headers: {
        Authorization: `Payaza ${process.env.API_KEY_PAYOUT}`,
        "Content-Type": "application/json",
      },
      data: data,
    };
    const res = await axios.request(config);

    console.log(res.data);

    return NextResponse.json({
      data: res.data,
      status: true,
    });
  } catch (error) {
    console.log(error);

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
