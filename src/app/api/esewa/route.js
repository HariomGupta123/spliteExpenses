import { NextResponse } from "next/server";
import axios from "axios";

const eSewaPaymentUrl = "https://uat.esewa.com.np/epay/main";
const merchantCode = "EPAYTEST";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { amount, productId, successUrl, failureUrl } = body;

    const paymentData = {
      amt: amount,
      psc: 0, // service charge (if any)
      pdc: 0, // delivery charge (if any)
      txAmt: 0, // tax amount (if any)
      tAmt: amount, // total amount
      pid: productId,
      scd: merchantCode,
      su: successUrl, // success URL
      fu: failureUrl, // failure URL
    };

    const redirectUrl = `${eSewaPaymentUrl}?amt=${paymentData.amt}&pdc=${paymentData.pdc}&psc=${paymentData.psc}&txAmt=${paymentData.txAmt}&tAmt=${paymentData.tAmt}&pid=${paymentData.pid}&scd=${paymentData.scd}&su=${paymentData.su}&fu=${paymentData.fu}`;
    return NextResponse.json({ redirectUrl });
  } catch (error) {
    console.error("Error during eSewa payment initialization:", error);
    return NextResponse.json(
      { error: "Failed to redirect to eSewa" },
      { status: 500 }
    );
  }
};

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const rid = searchParams.get("rid");
    const pid = searchParams.get("pid");
    const amt = searchParams.get("amt");

    const verificationUrl = "https://uat.esewa.com.np/epay/transrec";

    const verificationData = {
      amt,
      pid,
      scd: merchantCode,
      rid,
    };

    const response = await axios.post(verificationUrl, null, {
      params: verificationData,
    });

    if (response.data.includes("<response_code>Success</response_code>")) {
      return NextResponse.json({ status: "Payment verified successfully" });
    } else {
      return NextResponse.json(
        { status: "Payment verification failed" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error during eSewa payment verification:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
};
