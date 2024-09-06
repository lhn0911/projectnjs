import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(),"src", "database", "users.json");

    const data = fs.readFileSync(filePath, "utf8");

    const users = JSON.parse(data);

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ message: "Lỗi rồi ní ơi" });
  }
}

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const adminRequest = await request.json();

    const filePath = path.join(process.cwd(),"src", "database", "users.json");

    const users = JSON.parse(fs.readFileSync(filePath, "utf8"));

    users.push(adminRequest);

    fs.writeFileSync(filePath, JSON.stringify(users), "utf8");

    return NextResponse.json({ message: "Thêm mới thành công nha ní" });
  } catch (error) {
    return NextResponse.json({ message: "Lỗi rồi ní ơi" });
  }
}