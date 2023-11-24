import dbConnect from "@/lib/database";
import Restaurant from "@/lib/models/restaurant";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest) => {
  // init database connection
  dbConnect();

  // find all restaurants
  const restaurants = await Restaurant.find({});

  // return data as json
  return NextResponse.json({ data: restaurants }, { status: 200 });
};

export { handler as GET };
