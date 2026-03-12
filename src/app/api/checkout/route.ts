import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { amount } = await request.json();

        // In production, this would use the Razorpay SDK:
        // const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID!, key_secret: process.env.RAZORPAY_KEY_SECRET! });
        // const order = await razorpay.orders.create({ amount: amount * 100, currency: "INR", receipt: `receipt_${Date.now()}` });

        // Mock order for development
        const mockOrder = {
            id: `order_${Date.now()}`,
            amount: amount * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
            status: "created",
        };

        return NextResponse.json(mockOrder);
    } catch {
        return NextResponse.json(
            { error: "Order creation failed" },
            { status: 500 }
        );
    }
}
